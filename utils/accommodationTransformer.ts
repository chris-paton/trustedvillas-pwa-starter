import { Accommodation } from "@/types/accommodation";

export interface Villa {
  id: string;
  code: string;
  name: string;
  location: string;
  place: string;
  area: string;
  country: string;
  image: string;
  sleeps: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  features: string[];
  leftInStock?: number;
  discount?: number;
}

/**
 * Transforms accommodation API data to Villa format for VillaCard component
 */
export function transformAccommodationToVilla(accommodation: Accommodation, index: number): Villa {
  // Use the ID field from the API as the primary identifier
  // The API returns accommodations with an 'id' field which should be used for routing
  // Convert to string to ensure consistency across the app
  const villaId = accommodation.id ? String(accommodation.id) : accommodation.code;

  if (!villaId) {
    console.warn(`Accommodation at index ${index} is missing both id and code:`, accommodation.name);
  }
  // Get localized content (prefer English)
  const getLocalizedContent = (items: Array<{ language: string; content: string }>) => {
    const english = items.find((item) => item.language === "EN");
    return english?.content || items[0]?.content || "";
  };

  // Get main image - prioritize mainImage field from API, then fall back to media items
  let imageUrl: string;
  if (accommodation.mainImage) {
    // Use the mainImage thumbnail provided by the API
    imageUrl = accommodation.mainImage;
    console.log(`Using mainImage for ${accommodation.name}:`, imageUrl);
  } else {
    // Fallback to media items
    const mainImage = accommodation.media?.mediaItem?.find((item) => item.main) || accommodation.media?.mediaItem?.[0];
    imageUrl = mainImage?.uri || "https://images.unsplash.com/photo-1758192838598-a1de4da5dcaf";
    console.log(`Using fallback image for ${accommodation.name}:`, imageUrl);
    console.log('Media items:', accommodation.media?.mediaItem);
  }

  // Extract features from attributes
  const features: string[] = [];
  const attributeMap: { [key: string]: string } = {
    pool: "Pool",
    dishwasher: "Dishwasher",
    microwave: "Microwave",
    pets: "Pet Friendly",
    washingmachine: "Washing Machine",
    fridge: "Fridge",
    internet: "Internet",
    wlan: "WiFi",
    tv: "TV",
    nonsmoking: "Non-Smoking",
  };

  accommodation.attributes?.attribute?.forEach((attr) => {
    const featureName = attributeMap[attr.name];
    if (featureName && !features.includes(featureName)) {
      features.push(featureName);
    }
  });

  // Limit to top 4 features
  const topFeatures = features.slice(0, 4);

  // Build location strings - handle both string and localized content formats
  const place = typeof accommodation.place === 'string'
    ? accommodation.place
    : getLocalizedContent(accommodation.place || []);
  const area = accommodation.area || (typeof accommodation.region === 'string'
    ? accommodation.region
    : getLocalizedContent(accommodation.region || []));
  const country = typeof accommodation.country === 'string'
    ? accommodation.country
    : getLocalizedContent(accommodation.country || []);

  // Use location field from API if available, otherwise build from parts
  const location = accommodation.location || `${place}${place && country ? ", " : ""}${country}`;

  // Parse rating
  const rating = parseFloat(accommodation.rating?.overAllRating || "0");
  const reviews = accommodation.rating?.nbrOfReviews || 0;

  // Calculate price (mock for now - would come from availability API)
  // For demo purposes, generate a price based on accommodation size
  const basePrice = Math.floor(
    (accommodation.bedRooms?.number || 1) * 80 + (accommodation.pax || 2) * 15 + (accommodation.livingSpace || 50)
  );

  return {
    id: villaId || `MISSING-ID-${index}`,
    code: accommodation.code || (accommodation.id ? String(accommodation.id) : `MISSING-CODE-${index}`),
    name: accommodation.name,
    location,
    place,
    area,
    country,
    image: imageUrl,
    sleeps: accommodation.pax || 0,
    bedrooms: accommodation.bedRooms?.number || 0,
    bathrooms: accommodation.bathRooms?.number || 0,
    price: basePrice,
    rating: rating || 0,
    reviews,
    features: topFeatures,
  };
}

/**
 * Transforms array of accommodations to Villa array
 */
export function transformAccommodations(accommodations: Accommodation[]): Villa[] {
  return accommodations.map((accommodation, index) => transformAccommodationToVilla(accommodation, index));
}
