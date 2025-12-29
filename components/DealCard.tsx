import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Users, Bed, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

interface Deal {
  id: number;
  name: string;
  location: string;
  image: string;
  sleeps: number;
  bedrooms: number;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  leftInStock: number;
  discount: number;
}

interface DealCardProps {
  deal: Deal;
  onViewDetails: () => void;
}

export function DealCard({ deal, onViewDetails }: DealCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
      onClick={onViewDetails}
    >
      <div className="relative">
        <ImageWithFallback
          src={deal.image}
          alt={deal.name}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-red-500 text-white border-0">
            {deal.discount}% OFF
          </Badge>
        </div>

        {/* Urgency Indicator */}
        {deal.leftInStock <= 3 && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-orange-500 text-white border-0 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Only {deal.leftInStock} left!
            </Badge>
          </div>
        )}

        {/* Rating */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm">
            {deal.rating}
          </span>
          <span className="text-xs text-gray-500">({deal.reviews})</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg mb-1 truncate">{deal.name}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{deal.location}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>Sleeps {deal.sleeps}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bed className="w-4 h-4" />
            <span>{deal.bedrooms} bed</span>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl text-orange-500">£{deal.price}</span>
              <span className="text-sm text-gray-500 line-through">£{deal.originalPrice}</span>
            </div>
            <span className="text-xs text-gray-500">per night</span>
          </div>
          <Link
            href={`/accommodation/${deal.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
            className="bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg text-sm shadow-[0_10px_28px_-12px_rgba(255,107,53,0.6)] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-12px_rgba(255,107,53,0.7)] transition-all"
            style={{
              backgroundImage: "linear-gradient(90deg, #ff6b35 0%, #ff6b35 50%, #ff5a2d 100%)",
              backgroundColor: "#ff6b35",
              color: "#fff",
            }}
          >
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
