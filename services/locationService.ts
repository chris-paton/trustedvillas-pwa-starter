import { Country, Area, Location } from '@/types/locations';

/**
 * Location Service - Manages location data with caching
 */
class LocationService {
  private countries: Country[] | null = null;
  private areas: Area[] | null = null;
  private locations: Location[] | null = null;
  private countriesByName: Map<string, Country> = new Map();
  private areasByName: Map<string, Area> = new Map();
  private locationsByName: Map<string, Location> = new Map();
  private initialized = false;

  /**
   * Initialize the service by fetching all location data
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      // Fetch all countries
      const countriesResponse = await fetch('/api/locations/countries');
      if (countriesResponse.ok) {
        this.countries = await countriesResponse.json();

        // Build lookup map
        if (this.countries) {
          this.countries.forEach(country => {
            if (!country || (!country.displayName && !country.name) || !country.code) return;
            const name = (country.displayName || country.name).toLowerCase();
            this.countriesByName.set(name, country);
            // Also add by code
            this.countriesByName.set(country.code.toLowerCase(), country);
          });
        }
      }

      // Fetch all areas (we'll get them by country if needed)
      // For now, we'll load them on-demand

      this.initialized = true;
      console.log('LocationService initialized with', this.countries?.length || 0, 'countries');
    } catch (error) {
      console.error('Failed to initialize LocationService:', error);
      // Don't throw - allow fallback to work
    }
  }

  /**
   * Find country by name (case-insensitive, partial match)
   */
  async findCountry(searchTerm: string): Promise<Country | null> {
    await this.initialize();

    if (!this.countries) return null;

    const term = searchTerm.toLowerCase().trim();

    // Exact match first
    if (this.countriesByName.has(term)) {
      return this.countriesByName.get(term)!;
    }

    // Partial match
    for (const country of this.countries) {
      if (!country || (!country.displayName && !country.name)) continue;
      const name = (country.displayName || country.name).toLowerCase();
      if (name.includes(term) || term.includes(name)) {
        return country;
      }
    }

    return null;
  }

  /**
   * Find area by name (case-insensitive, partial match)
   * Optionally filter by country
   */
  async findArea(searchTerm: string, countryId?: number): Promise<Area | null> {
    await this.initialize();

    try {
      // Fetch areas for the country if specified, otherwise all areas
      const url = countryId
        ? `/api/locations/areas/${countryId}`
        : '/api/locations/by-area';

      const response = await fetch(url);
      if (!response.ok) return null;

      const data = await response.json();
      const areas: Area[] = Array.isArray(data) ? data : Object.values(data).flatMap((item: any) => item.areas || []);

      const term = searchTerm.toLowerCase().trim();

      // Exact match first
      const exactMatch = areas.find(area => {
        if (!area || (!area.displayName && !area.name)) return false;
        return (area.displayName || area.name).toLowerCase() === term;
      });
      if (exactMatch) return exactMatch;

      // Partial match
      const partialMatch = areas.find(area => {
        if (!area || (!area.displayName && !area.name)) return false;
        const name = (area.displayName || area.name).toLowerCase();
        return name.includes(term) || term.includes(name);
      });

      return partialMatch || null;
    } catch (error) {
      console.error('Failed to find area:', error);
      return null;
    }
  }

  /**
   * Find location (city/place) by name
   */
  async findLocation(searchTerm: string, countryId?: number, areaId?: number): Promise<Location | null> {
    await this.initialize();

    try {
      // Build query params
      const params = new URLSearchParams();
      if (countryId) params.append('countryId', countryId.toString());
      if (areaId) params.append('areaId', areaId.toString());

      const url = `/api/locations${params.toString() ? `?${params.toString()}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) return null;

      const locations: Location[] = await response.json();

      const term = searchTerm.toLowerCase().trim();

      // Exact match first
      const exactMatch = locations.find(location => {
        if (!location || (!location.displayName && !location.name)) return false;
        return (location.displayName || location.name).toLowerCase() === term;
      });
      if (exactMatch) return exactMatch;

      // Partial match
      const partialMatch = locations.find(location => {
        if (!location || (!location.displayName && !location.name)) return false;
        const name = (location.displayName || location.name).toLowerCase();
        return name.includes(term) || term.includes(name);
      });

      return partialMatch || null;
    } catch (error) {
      console.error('Failed to find location:', error);
      return null;
    }
  }

  /**
   * Parse a location string and determine its type (country, area, or location)
   */
  async parseLocation(searchTerm: string): Promise<{
    type: 'country' | 'area' | 'location' | 'unknown';
    country?: Country;
    area?: Area;
    location?: Location;
  }> {
    await this.initialize();

    // Try to find as country first
    const country = await this.findCountry(searchTerm);
    if (country) {
      return { type: 'country', country };
    }

    // Try to find as area
    const area = await this.findArea(searchTerm);
    if (area) {
      // Get the country for this area
      const areaCountry = this.countries?.find(c => c.id === area.countryId);
      return { type: 'area', area, country: areaCountry };
    }

    // Try to find as specific location
    const location = await this.findLocation(searchTerm);
    if (location) {
      // Get the country and area for this location
      const locCountry = this.countries?.find(c => c.id === location.countryId);
      const locArea = await this.findAreaById(location.areaId);
      return { type: 'location', location, country: locCountry, area: locArea || undefined };
    }

    return { type: 'unknown' };
  }

  /**
   * Find area by ID
   */
  private async findAreaById(areaId: number): Promise<Area | null> {
    try {
      const response = await fetch(`/api/locations?areaId=${areaId}`);
      if (!response.ok) return null;

      const data = await response.json();
      // The API might return the area info - this depends on the actual API structure
      return null; // Will need to adjust based on actual API response
    } catch (error) {
      return null;
    }
  }

  /**
   * Get all countries
   */
  async getCountries(): Promise<Country[]> {
    await this.initialize();
    return this.countries || [];
  }
}

// Export singleton instance
export const locationService = new LocationService();
