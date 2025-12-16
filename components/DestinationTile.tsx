import { motion } from "framer-motion";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DestinationTileProps {
  destination: {
    name: string;
    count: number;
    image: string;
  };
  onClick: () => void;
}

export function DestinationTile({ destination, onClick }: DestinationTileProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative h-64 md:h-80 rounded-xl overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      <ImageWithFallback
        src={destination.image}
        alt={destination.name}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl md:text-3xl mb-2">{destination.name}</h3>
        <p className="text-white/90">{destination.count.toLocaleString()} villas available</p>
      </div>
    </motion.div>
  );
}
