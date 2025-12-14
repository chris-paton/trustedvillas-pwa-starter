import { Heart } from 'lucide-react';

interface VillaCardProps {
  name: string;
  price: number;
  image: string;
  scarcity: string;
  rating?: number;
}

export default function VillaCard({ name, price, image, scarcity, rating = 4.9 }: VillaCardProps) {
  return (
    <div className="bg-white dark:bg-navy-dark rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full">
          <Heart className="w-5 h-5 text-orange" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-heading text-lg">{name}</h3>
        <p className="text-sm text-gray-600">
          £{price}/night · {scarcity}
        </p>
        {rating && <p className="text-sm">⭐ {rating}</p>}
      </div>
    </div>
  );
}