import { useState } from "react";
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
  villaId: number;
  onNavigate: (page: "search") => void;
}

const villaData = {
  1: {
    id: 1,
    name: "Villa Sunset Paradise",
    location: "Costa del Sol, Spain",
    coordinates: "36.7213° N, 4.4214° W",
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
  },
};

export function VillaDetails({ villaId, onNavigate }: VillaDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const villa = villaData[villaId as keyof typeof villaData] || villaData[1];

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

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4">
          <div className="md:col-span-2 md:row-span-2">
            <div className="relative h-64 md:h-full rounded-xl overflow-hidden group cursor-pointer">
              <ImageWithFallback
                src={villa.images[currentImageIndex]}
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
          {villa.images.slice(1, 5).map((img, idx) => (
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
          {villa.images.map((_, idx) => (
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
              <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>{villa.location}</p>
                  <p className="text-sm">{villa.coordinates}</p>
                  <p className="text-xs mt-2">Interactive map would load here</p>
                </div>
              </div>
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
