import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Users, Bed, Bath, MapPin, Heart, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

interface Villa {
  id: string;
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

interface VillaCardProps {
  villa: Villa;
  onViewDetails: () => void;
}

// Urgency badge variants
const urgencyVariants = [
  "Booked 7× this week",
  "Only 2 dates left", 
  "Last booked 3 hrs ago",
  "Price rises in 24h",
  "Trending now",
  "Booked 12× this month"
];

export function VillaCard({ villa, onViewDetails }: VillaCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  // Select urgency message based on villa id for consistency
  // Use a simple hash of the ID (convert to string first to handle both string and number IDs)
  const idString = String(villa.id);
  const hashCode = idString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const urgencyMessage = urgencyVariants[hashCode % urgencyVariants.length];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
      onClick={onViewDetails}
    >
      <div className="relative">
        <ImageWithFallback
          src={villa.image}
          alt={villa.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Wishlist Heart - Now functional */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsSaved(!isSaved);
          }}
          className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all hover:scale-110"
        >
          <Heart 
            className={`w-5 h-5 transition-all ${
              isSaved 
                ? "fill-orange-500 text-orange-500" 
                : "text-gray-700"
            }`} 
          />
        </button>

        {/* Discount Badge */}
        {villa.discount && villa.discount > 0 && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-red-500 text-white border-0">
              {villa.discount}% OFF
            </Badge>
          </div>
        )}

        {/* NEW: Dynamic Urgency Badge */}
        <div className="absolute bottom-3 left-3">
          <Badge className="bg-[#ff6b35] text-white border-0 flex items-center gap-1.5 shadow-lg">
            <TrendingUp className="w-3 h-3" />
            {urgencyMessage}
          </Badge>
        </div>

        {/* Rating - Only show if rating exists and is greater than 0 */}
        {villa.rating > 0 && (
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">
              {villa.rating}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg mb-1 truncate">{villa.name}</h3>
        <div className="flex items-center gap-1 mb-3">
          <MapPin className="w-4 h-4 flex-shrink-0 text-gray-500" />
          <span className="text-xs text-gray-500 truncate">
            {[villa.place, villa.area, villa.country].filter(Boolean).join(', ')}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{villa.sleeps}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{villa.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{villa.bathrooms}</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-3">
          {villa.features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
            >
              {feature}
            </span>
          ))}
          {villa.features.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              +{villa.features.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-end justify-between pt-3 border-t border-gray-100">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl text-orange-500">£{villa.price}</span>
              {villa.originalPrice && villa.originalPrice > villa.price && (
                <span className="text-sm text-gray-500 line-through">£{villa.originalPrice}</span>
              )}
            </div>
            <span className="text-xs text-gray-500">per night</span>
          </div>
          <Link
            href={`/accommodation/${villa.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
            className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition-all text-sm hover:shadow-lg hover:shadow-orange-500/30"
            style={{
              backgroundImage: "linear-gradient(90deg, #ff6b35 0%, #ff6b35 50%, #ff5a2d 100%)",
              backgroundColor: "#ff6b35",
              color: "#fff",
            }}
          >
            View & Book
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
