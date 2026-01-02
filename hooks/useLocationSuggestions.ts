import { useState, useEffect } from 'react';
import { Country, Area } from '@/types/locations';

export interface LocationSuggestion {
  id: string;
  displayName: string;
  type: 'country' | 'area' | 'location';
  fullName: string;
  countryId?: number;
  areaId?: number;
}

/**
 * Hook to fetch and manage location suggestions from the Locations API
 */
export function useLocationSuggestions() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch countries and all areas on mount
  useEffect(() => {
    async function fetchLocations() {
      try {
        setLoading(true);
        setError(null);

        // Fetch all countries
        const countriesResponse = await fetch('/api/locations/countries');
        if (!countriesResponse.ok) {
          throw new Error('Failed to fetch countries');
        }

        const countriesData: Country[] = await countriesResponse.json();
        setCountries(countriesData);

        // Fetch areas for all countries
        const allAreas: Area[] = [];

        // Fetch areas from each country
        for (const country of countriesData) {
          if (!country || !country.id) continue;

          try {
            const areasResponse = await fetch(`/api/locations/areas/${country.id}`);
            if (areasResponse.ok) {
              const countryAreas = await areasResponse.json();
              if (Array.isArray(countryAreas)) {
                allAreas.push(...countryAreas.filter((area): area is Area => !!area));
              }
            }
          } catch (err) {
            console.error(`Failed to fetch areas for country ${country.id}:`, err);
            // Continue with other countries
          }
        }

        console.log(`Loaded ${allAreas.length} areas from ${countriesData.length} countries`);
        setAreas(allAreas);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching location suggestions:', err);
        setError(err instanceof Error ? err.message : 'Failed to load locations');
        setLoading(false);
      }
    }

    fetchLocations();
  }, []);

  /**
   * Get popular location suggestions (mix of countries and areas)
   */
  function getPopularSuggestions(limit = 8): LocationSuggestion[] {
    const suggestions: LocationSuggestion[] = [];

    // Return empty if data not loaded
    if (!countries || countries.length === 0) {
      return [];
    }

    // Add some popular countries - with null checks
    const popularCountryCodes = ['ES', 'FR', 'IT', 'PT', 'GR'];
    const popularCountries = countries.filter(c =>
      c && c.code && popularCountryCodes.includes(c.code)
    ).slice(0, 3);

    popularCountries.forEach(country => {
      if (country && country.id && (country.displayName || country.name)) {
        suggestions.push({
          id: `country-${country.id}`,
          displayName: country.displayName || country.name,
          type: 'country',
          fullName: country.displayName || country.name,
        });
      }
    });

    // Add some popular areas - with null checks
    const popularAreaNames = ['Provence', 'Tuscany', 'Algarve', 'Costa del Sol', 'Mallorca'];
    const popularAreas = areas.filter(area => {
      if (!area || !area.displayName && !area.name) return false;
      return popularAreaNames.some(name =>
        (area.displayName || area.name || '').toLowerCase().includes(name.toLowerCase())
      );
    }).slice(0, limit - suggestions.length);

    popularAreas.forEach(area => {
      if (area && area.id && (area.displayName || area.name)) {
        const countryName = countries.find(c => c && c.id === area.countryId)?.name || '';
        suggestions.push({
          id: `area-${area.id}`,
          displayName: area.displayName || area.name,
          type: 'area',
          fullName: countryName ? `${area.displayName || area.name}, ${countryName}` : (area.displayName || area.name),
        });
      }
    });

    return suggestions.slice(0, limit);
  }

  /**
   * Search for locations matching a query string (client-side search)
   */
  function searchLocations(query: string, limit = 10): LocationSuggestion[] {
    // Return empty array if data is still loading
    if (!countries || countries.length === 0) {
      return [];
    }

    // Return popular suggestions for short/empty queries
    if (!query || query.length < 2) {
      return getPopularSuggestions(limit);
    }

    const queryLower = query.toLowerCase();
    const suggestions: LocationSuggestion[] = [];

    // Search countries - with null checks
    const matchingCountries = countries.filter(country => {
      if (!country) return false;
      const name = (country.displayName || country.name || '').toLowerCase();
      const code = (country.code || '').toLowerCase();
      return name.includes(queryLower) || code === queryLower;
    });

    matchingCountries.forEach(country => {
      if (country && country.id && (country.displayName || country.name)) {
        suggestions.push({
          id: `country-${country.id}`,
          displayName: country.displayName || country.name,
          type: 'country',
          fullName: country.displayName || country.name,
          countryId: country.id,
        });
      }
    });

    // Search areas - with null checks
    const matchingAreas = areas.filter(area => {
      if (!area) return false;
      const name = (area.displayName || area.name || '').toLowerCase();
      return name.includes(queryLower);
    });

    matchingAreas.forEach(area => {
      if (area && area.id && (area.displayName || area.name)) {
        const countryName = countries.find(c => c && c.id === area.countryId)?.name || '';
        suggestions.push({
          id: `area-${area.id}`,
          displayName: area.displayName || area.name,
          type: 'area',
          fullName: countryName ? `${area.displayName || area.name}, ${countryName}` : (area.displayName || area.name),
          countryId: area.countryId,
          areaId: area.id,
        });
      }
    });

    // Sort by relevance (exact matches first, then starts with, then contains)
    return suggestions
      .sort((a, b) => {
        const aName = (a.displayName || '').toLowerCase();
        const bName = (b.displayName || '').toLowerCase();

        // Exact match
        if (aName === queryLower && bName !== queryLower) return -1;
        if (bName === queryLower && aName !== queryLower) return 1;

        // Starts with
        if (aName.startsWith(queryLower) && !bName.startsWith(queryLower)) return -1;
        if (bName.startsWith(queryLower) && !aName.startsWith(queryLower)) return 1;

        // Alphabetical
        return aName.localeCompare(bName);
      })
      .slice(0, limit);
  }

  /**
   * Search for locations using the API (includes countries, areas, and specific locations)
   */
  async function searchLocationsFromAPI(query: string): Promise<LocationSuggestion[]> {
    if (!query || query.length < 2) {
      return getPopularSuggestions();
    }

    try {
      const response = await fetch(`/api/locations?search=${encodeURIComponent(query)}`);
      if (!response.ok) {
        console.error('Failed to search locations from API');
        // Fallback to client-side search
        return searchLocations(query);
      }

      const data = await response.json();
      const suggestions: LocationSuggestion[] = [];

      // Handle different response formats
      if (Array.isArray(data)) {
        data.forEach((item: any) => {
          if (!item) return;

          // Determine type based on the structure
          let type: 'country' | 'area' | 'location' = 'location';
          let displayName = '';
          let fullName = '';
          let id = '';
          let countryId: number | undefined;
          let areaId: number | undefined;

          if (item.countries || item.code) {
            // This is a country
            type = 'country';
            displayName = item.displayName || item.name || '';
            fullName = displayName;
            id = `country-${item.id}`;
            countryId = item.id;
          } else if (item.areas || item.countryId) {
            // This is an area
            type = 'area';
            displayName = item.displayName || item.name || '';
            const country = countries.find(c => c.id === item.countryId);
            fullName = country ? `${displayName}, ${country.name}` : displayName;
            id = `area-${item.id}`;
            countryId = item.countryId;
            areaId = item.id;
          } else {
            // This is a specific location
            type = 'location';
            displayName = item.displayName || item.name || '';
            fullName = displayName;
            id = `location-${item.id}`;
            countryId = item.countryId;
            areaId = item.areaId;
          }

          if (displayName) {
            suggestions.push({
              id,
              displayName,
              type,
              fullName,
              countryId,
              areaId,
            });
          }
        });
      }

      return suggestions.slice(0, 10);
    } catch (error) {
      console.error('Error searching locations from API:', error);
      // Fallback to client-side search
      return searchLocations(query);
    }
  }

  return {
    loading,
    error,
    countries,
    areas,
    getPopularSuggestions,
    searchLocations,
    searchLocationsFromAPI,
  };
}
