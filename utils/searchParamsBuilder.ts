import { locationService } from '@/services/locationService';

/**
 * Builds API query parameters from search form data
 * Maps UI search parameters to API query parameters
 */
export interface SearchParams {
  location?: string;
  country?: string;
  area?: string;
  guests: number;
  checkIn: string;
  checkOut: string;
}

export interface APIQueryParams {
  country?: string;
  area?: string;
  location?: string;
  sleeps?: number;
}

/**
 * Parses location string using the Locations API
 * Determines if it's a country, area, or specific location
 *
 * IMPORTANT: Returns ONLY ONE parameter type per the API rules:
 * - If country: returns { country: "France" }
 * - If area: returns { area: "Provence" }
 * - If location: returns { location: "Paris" }
 *
 * Never returns multiple location parameters (e.g., never country + location together)
 */
async function parseLocation(locationStr: string): Promise<Pick<APIQueryParams, 'country' | 'area' | 'location'>> {
  if (!locationStr || !locationStr.trim()) return {};

  try {
    const result = await locationService.parseLocation(locationStr);

    switch (result.type) {
      case 'country':
        // Country-level search - use ONLY country parameter
        return { country: result.country?.displayName || result.country?.name || locationStr };

      case 'area':
        // Area/region-level search - use ONLY area parameter
        return { area: result.area?.displayName || result.area?.name || locationStr };

      case 'location':
        // City/location-level search - use ONLY location parameter (no country)
        return { location: result.location?.displayName || result.location?.name || locationStr };

      case 'unknown':
      default:
        // Fallback: treat as specific location (city)
        return { location: locationStr };
    }
  } catch (error) {
    console.error('Error parsing location:', error);
    // Fallback: treat as specific location
    return { location: locationStr };
  }
}

/**
 * Builds API query parameters from search form parameters
 *
 * Ensures API rules are followed:
 * - Only ONE of: country, area, or location is set (never multiple)
 * - Sleeps parameter is optional
 */
export async function buildAPIQueryParams(searchParams: SearchParams): Promise<APIQueryParams> {
  console.log('buildAPIQueryParams received:', searchParams);
  const apiParams: APIQueryParams = {};

  // If specific country/area/location is provided, use it directly
  if (searchParams.country) {
    console.log('→ Using country from searchParams:', searchParams.country);
    apiParams.country = searchParams.country;
  } else if (searchParams.area) {
    console.log('→ Using area from searchParams:', searchParams.area);
    apiParams.area = searchParams.area;
  } else if (searchParams.location) {
    console.log('→ Parsing location from searchParams:', searchParams.location);
    // Only parse if we have a generic location string (old behavior for backwards compatibility)
    const locationParams = await parseLocation(searchParams.location);
    Object.assign(apiParams, locationParams);

    // Validate: ensure only one location parameter is set
    const locationParamCount = [locationParams.country, locationParams.area, locationParams.location]
      .filter(param => param !== undefined).length;

    if (locationParamCount > 1) {
      console.error('ERROR: Multiple location parameters detected! This violates API rules.', locationParams);
      // Keep only the most specific one (location > area > country)
      if (locationParams.location) {
        delete apiParams.country;
        delete apiParams.area;
      } else if (locationParams.area) {
        delete apiParams.country;
      }
    }
  }

  // Add sleeps parameter (guests)
  if (searchParams.guests && searchParams.guests > 0) {
    apiParams.sleeps = searchParams.guests;
  }

  // Note: checkIn and checkOut dates are not supported by the current API
  // They would need to be handled via an availability API endpoint

  console.log('Built API query params:', apiParams);

  return apiParams;
}

/**
 * Converts API query parameters to URL query string
 *
 * Validates that only ONE location parameter is present
 */
export function buildQueryString(params: APIQueryParams): string {
  const searchParams = new URLSearchParams();

  // Count location parameters to ensure compliance
  const locationParams = [params.country, params.area, params.location].filter(p => p);
  if (locationParams.length > 1) {
    console.warn('WARNING: Multiple location parameters detected in buildQueryString!', {
      country: params.country,
      area: params.area,
      location: params.location,
    });
  }

  // Add location parameters (only one should be set)
  if (params.country) {
    searchParams.append('country', params.country);
    console.log('→ Using country parameter:', params.country);
  }
  if (params.area) {
    searchParams.append('area', params.area);
    console.log('→ Using area parameter:', params.area);
  }
  if (params.location) {
    searchParams.append('location', params.location);
    console.log('→ Using location parameter:', params.location);
  }

  // Add sleeps parameter
  if (params.sleeps && params.sleeps > 0) {
    searchParams.append('sleeps', params.sleeps.toString());
    console.log('→ Using sleeps parameter:', params.sleeps);
  }

  const queryString = searchParams.toString();
  console.log('Final query string:', queryString || '(empty)');

  return queryString;
}
