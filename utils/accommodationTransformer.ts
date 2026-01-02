import { Accommodation } from "@/types/accommodation";

export interface Villa {
  id: string;
  code: string;
  name: string;
  location: string;
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

  // Get main image
  const mainImage = accommodation.media?.mediaItem?.find((item) => item.main) || accommodation.media?.mediaItem?.[0];
  const imageUrl = mainImage?.uri || "https://images.unsplash.com/photo-1758192838598-a1de4da5dcaf";

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

  // Build location string
  const place = getLocalizedContent(accommodation.place || []);
  const country = getLocalizedContent(accommodation.country || []);
  const location = `${place}${place && country ? ", " : ""}${country}`;

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
