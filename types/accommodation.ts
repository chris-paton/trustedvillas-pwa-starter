// TypeScript interfaces for the Accommodation API response

export interface LocalizedContent {
  language: string;
  content: string;
}

export interface ValidityItem {
  value: number;
  validFrom: string;
  validTo: string;
}

export interface Address {
  postalCode: string;
  longitude: string;
  latitude: string;
  accuracy: string;
}

export interface Evaluation {
  stars: string;
  location: string | null;
  outdoorArea: string | null;
  interior: string | null;
  tranquility: string | null;
  kitchen: string | null;
  accessRoad: string | null;
}

export interface Attribute {
  type: string;
  name: string;
  value: string | null;
}

export interface Distance {
  type: string;
  name: string | null;
  value: string;
  assignment: string | null;
}

export interface Description {
  type: string;
  language: string;
  value: string;
  validFrom: string;
  validTo: string;
}

export interface MediaItem {
  main: boolean;
  season: string;
  uri: string;
  fileName: string;
  format: string;
  type: string;
  caption: Array<{ content: string }>;
  lastModified: string;
  sortOrder: number;
  sortOrderW: number;
}

export interface ArrivalTimeData {
  weekdayFrom: number;
  weekdayTo: number;
  onAppointment: boolean;
  timeFrom: string;
  timeTo: string;
  type: string;
}

export interface ArrivalTime {
  data: ArrivalTimeData[];
  validFrom: string;
  validTo: string;
}

export interface Rating {
  overAllRating: string;
  nbrOfReviews: number;
}

export interface Rooms {
  number: number;
  room: any | null;
}

export interface BedRooms {
  number: number;
  bedRoom: any | null;
}

export interface BathRooms {
  number: number;
  bathRoom: any | null;
}

export interface Toilets {
  number: number;
}

export interface PaxByValidity {
  item: ValidityItem[];
}

export interface BabiesByValidity {
  item: ValidityItem[];
}

export interface Attributes {
  attribute: Attribute[];
}

export interface Distances {
  distance: Distance[];
}

export interface Themes {
  theme: string[];
}

export interface Descriptions {
  description: Description[];
}

export interface Media {
  mediaItem: MediaItem[];
}

export interface ArrivalTimes {
  arrivalTime: ArrivalTime[];
}

export interface Accommodation {
  id?: string | number;
  code: string;
  name: string;
  location?: string;
  area?: string | null;
  countryCode: string;
  country: LocalizedContent[] | string;
  regionCode: string;
  region: LocalizedContent[] | string;
  placeCode: string;
  place: LocalizedContent[] | string;
  floor: string | null;
  type: string;
  detailType: string;
  livingSpace: number;
  rooms: Rooms;
  bedRooms: BedRooms;
  bathRooms: BathRooms;
  toilets: Toilets;
  pax: number;
  paxByValidity: PaxByValidity;
  babiesByValidity: BabiesByValidity;
  address: Address;
  evaluation: Evaluation;
  attributes: Attributes;
  distances: Distances;
  themes: Themes;
  descriptions: Descriptions;
  media: Media;
  mainImage?: string;
  arrivalTimes: ArrivalTimes;
  creationDate: string;
  lastModified: string;
  rating: Rating;
  brand: string;
  buyingOfficeCode: string | null;
  domesticCurrency: string;
  attributeXmllist: string | null;
  qualityRating?: string;
  sleeps?: number;
  bedrooms?: number;
}

export type AccommodationListResponse = Accommodation[];
