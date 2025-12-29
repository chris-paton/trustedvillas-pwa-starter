import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  Users,
  Bed,
  Bath,
  Wifi,
  Droplets,
  Wind,
  Car,
  ChevronLeft,
  Heart,
  Share2,
  Check,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { BookingForm } from "./BookingForm";
import { CountdownTimer } from "./CountdownTimer";

interface VillaDetailsProps {
  villaId?: number | string | null;
  onNavigate: (page: "search" | "home" | "destinations" | "villa" | "bookings") => void;
}

type Amenity = { icon?: typeof Wifi; name: string; included: boolean };
type VillaRule = { text: string; allowed: boolean };

type VillaDetailsData = {
  id: number | string;
  code: string;
  name: string;
  location: string;
  coordinates?: string;
  lat?: number;
  lon?: number;
  images: string[];
  sleeps: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  discount: number;
  leftInStock: number;
  description: string;
  amenities: Amenity[];
  rules: VillaRule[];
};

type ApiAmenity = { name?: string; included?: boolean } | string;
type ApiRule = { text?: string; allowed?: boolean } | string;
type ApiVillaResponse = Partial<{
  id: number | string;
  accommodationCode: string;
  code: string;
  name: string;
  title: string;
  location: string;
  coordinates: string;
  geo: string;
  images: string[];
  sleeps: number | string;
  maxOccupancy: number | string;
  bedrooms: number | string;
  bedroomCount: number | string;
  bathrooms: number | string;
  bathroomCount: number | string;
  bathRooms?: { number?: number | string };
  bedRooms?: { number?: number | string };
  rooms?: { number?: number | string };
  toilets?: { number?: number | string };
  pax?: number | string;
  paxByValidity?: { item?: { value?: number | string }[] };
  babiesByValidity?: { item?: { value?: number | string }[] };
  price: number | string;
  nightlyRate: number | string;
  originalPrice: number | string;
  original_rate: number | string;
  averageRating: number | string;
  reviews: number | string;
  reviewsCount: number | string;
  ratingDetails?: { overAllRating?: number | string; nbrOfReviews?: number | string };
  rating?: { overAllRating?: number | string; nbrOfReviews?: number | string } | number | string;
  discount: number | string;
  leftInStock: number | string;
  availability: number | string;
  description: string;
  summary: string;
  descriptions?: { description?: { type?: string; language?: string; value?: string }[] };
  country?: { language?: string; content?: string }[];
  region?: { language?: string; content?: string }[];
  place?: { language?: string; content?: string }[];
  address?: string | { latitude?: string; longitude?: string; postalCode?: string };
  media?: { mediaItem?: { uri?: string; format?: string; main?: boolean; sortOrder?: number }[] };
  attributes?: { attribute?: { name?: string; value?: string | null }[] };
  amenities: ApiAmenity[];
  rules: ApiRule[];
}>;

const API_BASE = (process.env.NEXT_PUBLIC_ACCOMMODATION_API_BASE ?? "https://localhost:7214").replace(
  /\/$/,
  ""
);

const villaCodeLookup: Record<number | string, string> = {
  1: "FI1250.1304.1",
};

const fallbackVilla: VillaDetailsData = {
  id: 1,
  code: "FI1250.1304.1",
  name: "Villa Sunset Paradise",
  location: "Costa del Sol, Spain",
  coordinates: "36.7213 N, 4.4214 W",
  images: [
    "https://images.unsplash.com/photo-1758192838598-a1de4da5dcaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHBvb2wlMjBzdW5zZXR8ZW58MXx8fHwxNzYzOTMyOTUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1757262798623-a215e869d708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmllb3IyMmxpdmluZ3xlbnwxfHx8fDE3NjM5MzI5NTMw&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1601221998768-c0cdf463a393?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWxsYSUyMGJlZHJvb20lMjBsdXh1cnl8ZW58MXx8fHwxNzYzOTMyOTU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1729605412044-81f6acce4370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwb29sJTIwb2NlYW4lMjB2aWV3fGVufDF8fHx8MTc2MzkzMjk1NHww&ixlib=rb-4.1.0&q=80&w=1080",
  ],
  sleeps: 8,
  bedrooms: 4,
  bathrooms: 3,
  price: 285,
  originalPrice: 425,
  rating: 4.9,
  reviews: 127,
  discount: 33,
  leftInStock: 2,
  description:
    "Stunning luxury villa perched on the hillside with breathtaking sea views. This spacious property features a private infinity pool, modern interiors, and direct access to a secluded beach. Perfect for families or groups seeking an unforgettable Mediterranean escape.",
  amenities: [
    { icon: Wifi, name: "High-speed WiFi", included: true },
    { icon: Droplets, name: "Private Pool", included: true },
    { icon: Wind, name: "Air Conditioning", included: true },
    { icon: Car, name: "Free Parking", included: true },
    { name: "Sea View", included: true },
    { name: "BBQ Area", included: true },
    { name: "Outdoor Dining", included: true },
    { name: "Smart TV", included: true },
    { name: "Dishwasher", included: true },
    { name: "Washing Machine", included: true },
    { name: "Beach Towels", included: true },
    { name: "Hair Dryer", included: true },
  ],
  rules: [
    { text: "Check-in: 4:00 PM - 10:00 PM", allowed: true },
    { text: "Check-out: 11:00 AM", allowed: true },
    { text: "No smoking inside", allowed: false },
    { text: "No pets allowed", allowed: false },
    { text: "No parties or events", allowed: false },
  ],
};

const toNumber = (value: number | string | null | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const parseLatLonFromString = (coords?: string | null): { lat: number; lon: number } | null => {
  if (!coords) return null;
  const matches = coords.match(/-?\d+(\.\d+)?/g);
  if (!matches || matches.length < 2) return null;
  let [lat, lon] = matches.map((v) => parseFloat(v));
  const lower = coords.toLowerCase();
  if (lower.includes("s")) lat = -Math.abs(lat);
  if (lower.includes("w")) lon = -Math.abs(lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
  return { lat, lon };
};

const pickFirstLocalized = (
  entries: { language?: string; content?: string }[] | undefined,
  lang: string
): string | undefined => {
  if (!entries || entries.length === 0) return undefined;
  const byLang = entries.find((item) => item.language?.toLowerCase() === lang.toLowerCase());
  return (byLang ?? entries[0])?.content ?? undefined;
};

const cleanName = (value: string) =>
  value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();

const normalizeVillaData = (
  data: ApiVillaResponse | null | undefined,
  fallback: VillaDetailsData,
  fallbackCode: string,
  fallbackId: number | string
): VillaDetailsData => {
  const sleepsFromPax =
    toNumber(
      data?.pax ??
        data?.paxByValidity?.item?.[0]?.value ??
        data?.babiesByValidity?.item?.[0]?.value,
      fallback.sleeps
    ) || fallback.sleeps;

  const bedroomsFromApi = toNumber(
    data?.bedRooms?.number ?? data?.bedrooms ?? data?.bedroomCount ?? data?.rooms?.number,
    fallback.bedrooms
  );

  const bathroomsFromApi = toNumber(
    data?.bathRooms?.number ?? data?.bathrooms ?? data?.bathroomCount ?? data?.toilets?.number,
    fallback.bathrooms
  );

  const imagesFromApi =
    data?.media?.mediaItem
      ?.filter((item) => item.format === "image" && item.uri)
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((item) => item.uri as string) ?? [];

  const descriptionFromApi =
    data?.descriptions?.description?.find((d) => d.language?.toLowerCase() === "en")?.value ??
    data?.descriptions?.description?.[0]?.value ??
    data?.description;

  const locationFromApi = [
    pickFirstLocalized(data?.place, "EN"),
    pickFirstLocalized(data?.region, "EN"),
    pickFirstLocalized(data?.country, "EN"),
  ]
    .filter(Boolean)
    .join(", ");

  const addressString = typeof data?.address === "string" ? data.address : undefined;
  const addressCoords =
    data?.address && typeof data.address === "object"
      ? { lat: data.address.latitude, lon: data.address.longitude }
      : null;

  const coords =
    addressCoords?.lat && addressCoords?.lon
      ? `${addressCoords.lat}, ${addressCoords.lon}`
      : data?.geo ?? fallback.coordinates;

  const latLonFromString = coords ? parseLatLonFromString(coords) : null;
  const latLon =
    (addressCoords?.lat && addressCoords?.lon
      ? { lat: Number(addressCoords.lat), lon: Number(addressCoords.lon) }
      : null) ??
    latLonFromString;

  const ratingValue =
    typeof data?.rating === "object"
      ? data.rating?.overAllRating
      : data?.rating ?? data?.ratingDetails?.overAllRating ?? data?.averageRating;

  const reviewsValue =
    typeof data?.rating === "object"
      ? data.rating?.nbrOfReviews
      : data?.ratingDetails?.nbrOfReviews ?? data?.reviews ?? data?.reviewsCount;

  const amenitiesFromAttributes =
    data?.attributes?.attribute?.map((attr) => ({
      name: cleanName(attr.name ?? "Amenity"),
      included: true,
    })) ?? null;

  const amenitiesFromApi =
    Array.isArray(data?.amenities) && data.amenities.length > 0
      ? data.amenities
          .map((amenity: ApiAmenity) => ({
            name: typeof amenity === "string" ? amenity : amenity?.name ?? "",
            included: typeof amenity === "string" ? true : amenity?.included ?? true,
          }))
          .filter((amenity: Amenity) => amenity.name)
      : amenitiesFromAttributes;

  const rulesFromApi =
    Array.isArray(data?.rules) && data.rules.length > 0
      ? data.rules
          .map((rule: ApiRule) => ({
            text: typeof rule === "string" ? rule : rule?.text ?? "",
            allowed: typeof rule === "string" ? true : rule?.allowed ?? true,
          }))
          .filter((rule: VillaRule) => rule.text)
      : null;

  return {
    id: data?.id ?? fallbackId,
    code: data?.code ?? data?.accommodationCode ?? fallbackCode,
    name: data?.name ?? data?.title ?? fallback.name,
    location: (locationFromApi || data?.location || addressString) ?? fallback.location,
    coordinates: coords ?? fallback.coordinates,
    lat: latLon?.lat ?? fallback.lat,
    lon: latLon?.lon ?? fallback.lon,
    images:
      (Array.isArray(data?.images) && data.images.length > 0 ? data.images : imagesFromApi) ??
      fallback.images,
    sleeps: toNumber(data?.sleeps ?? data?.maxOccupancy ?? sleepsFromPax, fallback.sleeps),
    bedrooms: bedroomsFromApi,
    bathrooms: bathroomsFromApi,
    price: toNumber(data?.price ?? data?.nightlyRate, fallback.price),
    originalPrice: toNumber(
      data?.originalPrice ?? data?.original_rate ?? data?.price,
      fallback.originalPrice
    ),
    rating: toNumber(ratingValue, fallback.rating),
    reviews: toNumber(reviewsValue, fallback.reviews),
    discount: toNumber(data?.discount, fallback.discount),
    leftInStock: toNumber(data?.leftInStock ?? data?.availability, fallback.leftInStock),
    description: descriptionFromApi ?? data?.description ?? data?.summary ?? fallback.description,
    amenities: amenitiesFromApi ?? fallback.amenities,
    rules: rulesFromApi ?? fallback.rules,
  };
};

export function VillaDetails({ villaId, onNavigate }: VillaDetailsProps) {
  const fallbackCode = villaId
    ? villaCodeLookup[villaId as keyof typeof villaCodeLookup] ?? String(villaId)
    : fallbackVilla.code;
  const [villa, setVilla] = useState<VillaDetailsData>(() => ({
    ...fallbackVilla,
    id: villaId ?? fallbackVilla.id,
    code: fallbackCode,
  }));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setVilla({
      ...fallbackVilla,
      id: villaId ?? fallbackVilla.id,
      code: fallbackCode,
    });
    setCurrentImageIndex(0);
  }, [villaId, fallbackCode]);

  useEffect(() => {
    const controller = new AbortController();

    const loadVilla = async () => {
      if (!fallbackCode) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${API_BASE}/api/AccommodationDetails/${encodeURIComponent(fallbackCode)}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setVilla(
          normalizeVillaData(payload, fallbackVilla, fallbackCode, villaId ?? fallbackVilla.id)
        );
        setCurrentImageIndex(0);
      } catch (fetchError) {
        if (controller.signal.aborted) return;
        console.error("Failed to load villa details", fetchError);
        setError("Could not load the latest villa details. Showing fallback information instead.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadVilla();

    return () => controller.abort();
  }, [fallbackCode, villaId]);

  const reviews = [
    {
      name: "Sarah Johnson",
      date: "October 2024",
      rating: 5,
      text: "Absolutely perfect! The villa exceeded all our expectations. The pool area is stunning and the views are breathtaking. Would definitely come back!",
      helpful: 24,
    },
    {
      name: "Mark Thompson",
      date: "September 2024",
      rating: 5,
      text: "Amazing property with fantastic amenities. The location is ideal - close to beaches and restaurants but still private and peaceful. Highly recommend!",
      helpful: 18,
    },
    {
      name: "Emma Davis",
      date: "August 2024",
      rating: 4,
      text: "Beautiful villa with everything you need for a relaxing holiday. Only minor issue was WiFi was a bit slow, but otherwise perfect.",
      helpful: 12,
    },
  ];

  const images = villa.images && villa.images.length > 0 ? villa.images : fallbackVilla.images;

  return (
    <div className="md:mt-20 pb-20 md:pb-0">
      {/* Back Button */}
      <div className="sticky top-0 md:top-20 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => onNavigate("search")}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to results</span>
          </button>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {(isLoading || error) && (
        <div className="max-w-7xl mx-auto px-4 mt-4 space-y-2">
          {isLoading && (
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700">
              Loading villa details...
            </div>
          )}
          {error && (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-yellow-800">
              {error}
            </div>
          )}
        </div>
      )}

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
          <div className="md:col-span-2 md:row-span-2">
            <div className="relative h-64 md:h-full rounded-xl overflow-hidden group cursor-pointer">
              <ImageWithFallback
                src={images[currentImageIndex]}
                alt={villa.name}
                className="w-full h-full object-cover"
              />
              {villa.discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white border-0">
                  {villa.discount}% OFF TODAY
                </Badge>
              )}
            </div>
          </div>
          {images.slice(1, 5).map((img, idx) => (
            <div
              key={idx}
              className="hidden md:block h-48 rounded-xl overflow-hidden cursor-pointer group"
              onClick={() => setCurrentImageIndex(idx + 1)}
            >
              <ImageWithFallback
                src={img}
                alt={`${villa.name} - Image ${idx + 2}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Mobile Image Indicators */}
        <div className="flex justify-center gap-2 mt-3 md:hidden">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentImageIndex ? "bg-orange-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-3xl mb-2">{villa.name}</h1>
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{villa.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-orange-50 px-3 py-2 rounded-lg">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg">{villa.rating}</span>
                  <span className="text-gray-600">({villa.reviews} reviews)</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 text-gray-700">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>Sleeps {villa.sleeps}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5" />
                  <span>{villa.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-5 h-5" />
                  <span>{villa.bathrooms} Bathrooms</span>
                </div>
              </div>
            </div>

            {/* Urgency Banner */}
            {villa.leftInStock <= 3 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6"
              >
                <p className="text-orange-700">
                  🔥 <strong>High demand!</strong> Only {villa.leftInStock} booking{villa.leftInStock > 1 ? "s" : ""} left for this month. Book now to secure your dates!
                </p>
              </motion.div>
            )}

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl mb-4">About this villa</h2>
              <p className="text-gray-700 leading-relaxed">{villa.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-2xl mb-4">Amenities</h2>
              <div className="grid grid-cols-2 gap-4">
                {villa.amenities.map((amenity, idx) => {
                  const Icon = amenity.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3">
                      {Icon && <Icon className="w-5 h-5 text-gray-600" />}
                      <span className="text-gray-700">{amenity.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* House Rules */}
            <div className="mb-8">
              <h2 className="text-2xl mb-4">House Rules</h2>
              <div className="space-y-3">
                {villa.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    {rule.allowed ? (
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                    )}
                    <span className="text-gray-700">{rule.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="mb-8">
              <h2 className="text-2xl mb-4">Location</h2>
              <div className="bg-gray-100 rounded-lg h-64 overflow-hidden flex items-center justify-center">
                {villa.lat !== undefined && villa.lon !== undefined ? (
                  <iframe
                    title={`Map of ${villa.location}`}
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${(
                      villa.lon - 0.02
                    ).toFixed(4)}%2C${(villa.lat - 0.02).toFixed(4)}%2C${(
                      villa.lon + 0.02
                    ).toFixed(4)}%2C${(villa.lat + 0.02).toFixed(4)}&layer=mapnik&marker=${villa.lat.toFixed(
                      5
                    )}%2C${villa.lon.toFixed(5)}`}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="text-center text-gray-600 px-4">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <p>{villa.location}</p>
                    <p className="text-sm">{villa.coordinates}</p>
                    <p className="text-xs mt-2">Map preview unavailable for this villa</p>
                  </div>
                )}
              </div>
              {villa.lat !== undefined && villa.lon !== undefined && (
                <div className="text-xs text-gray-600 mt-2 flex items-center gap-2">
                  <span>Map data © OpenStreetMap contributors</span>
                  <a
                    href={`https://www.openstreetmap.org/?mlat=${villa.lat.toFixed(
                      5
                    )}&mlon=${villa.lon.toFixed(5)}#map=14/${villa.lat.toFixed(5)}/${villa.lon.toFixed(5)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-orange-600 hover:underline"
                  >
                    View on OpenStreetMap
                  </a>
                </div>
              )}
            </div>

            {/* Reviews */}
            <div className="mb-8">
              <h2 className="text-2xl mb-4">Guest Reviews</h2>
              <div className="space-y-6">
                {reviews.map((review, idx) => (
                  <div key={idx} className="border-b border-gray-200 pb-6 last:border-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium">{review.name}</p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{review.text}</p>
                    <button className="text-sm text-gray-500 hover:text-gray-700">
                      Helpful ({review.helpful})
                    </button>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Show all {villa.reviews} reviews
              </Button>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                {/* NEW: Countdown Timer */}
                <CountdownTimer />

                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl text-orange-500">£{villa.price}</span>
                    {villa.originalPrice > villa.price && (
                      <span className="text-lg text-gray-500 line-through">£{villa.originalPrice}</span>
                    )}
                  </div>
                  <span className="text-gray-600">per night</span>
                  <div className="mt-2 text-sm text-green-600">
                    💰 You save £{villa.originalPrice - villa.price} per night
                  </div>
                </div>

                <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-6 text-lg mb-4 shadow-[0_14px_36px_-14px_rgba(255,107,53,0.65)] hover:shadow-[0_16px_38px_-14px_rgba(255,107,53,0.75)] transition-all hover:-translate-y-0.5"
                      style={{
                        backgroundImage: "linear-gradient(90deg, #ff6b35 0%, #ff6b35 50%, #ff5a2d 100%)",
                        backgroundColor: "#ff6b35",
                        color: "#fff",
                      }}
                    >
                      Book Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <BookingForm villa={villa} onClose={() => setShowBookingForm(false)} />
                  </DialogContent>
                </Dialog>

                <p className="text-center text-sm text-gray-500 mb-4">
                  You will not be charged yet
                </p>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-4 h-4" />
                    <span>Free cancellation up to 48h</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-4 h-4" />
                    <span>Instant booking confirmation</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-4 h-4" />
                    <span>Lowest price guaranteed</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Limited Time Offer:</p>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <p className="text-sm text-orange-700">
                      Book within 2 hours and get an extra 5% off with code <strong>FAST5</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Similar Villas */}
              <div className="mt-6">
                <h3 className="text-lg mb-3">Similar Villas</h3>
                <div className="space-y-3">
                  {[
                    {
                      name: "Mediterranean Escape",
                      price: 295,
                      image: "https://images.unsplash.com/photo-1629199159634-28a88785cee5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGVycmFuZWFuJTIwdmlsbGElMjBleHRlcmlvcnxlbnwxfHx8fDE3NjM5MzI5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
                    },
                    {
                      name: "Coastal Paradise",
                      price: 310,
                      image: "https://images.unsplash.com/photo-1711091692742-fd965be43bce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFuaXNoJTIwdmlsbGElMjBjb2FzdGxpbmV8ZW58MXx8fHwxNzYzOTMyOTUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
                    },
                  ].map((similar, idx) => (
                    <div
                      key={idx}
                      className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                    >
                      <ImageWithFallback
                        src={similar.image}
                        alt={similar.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm mb-1">{similar.name}</p>
                        <p className="text-orange-500">£{similar.price}/night</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

