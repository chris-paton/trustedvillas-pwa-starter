// TypeScript interfaces for the Locations API

export interface Country {
  id: number;
  code: string;
  name: string;
  displayName?: string;
}

export interface Area {
  id: number;
  countryId: number;
  code: string;
  name: string;
  displayName?: string;
}

export interface Location {
  id: number;
  countryId: number;
  areaId: number;
  code: string;
  name: string;
  displayName?: string;
}

export interface LocationHierarchy {
  country: Country;
  area: Area;
  location: Location;
}

export interface CountriesResponse extends Array<Country> {}
export interface AreasResponse extends Array<Area> {}
export interface LocationsResponse extends Array<Location> {}

export interface LocationsByCountryResponse {
  [countryId: string]: {
    country: Country;
    areas: Area[];
  };
}

export interface LocationsByAreaResponse {
  [areaId: string]: {
    area: Area;
    locations: Location[];
  };
}
