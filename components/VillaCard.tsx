import { Heart } from 'lucide-react';

export default function VillaCard({ name, price, image, scarcity }) {
  return (
    <div className="bg-white dark:bg-navy rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-heading">{name}</h3>
        <p>£{price}/night · {scarcity}</p>
        <Heart className="absolute top-2 right-2 cursor-pointer" />
      </div>
    </div>
  );
}