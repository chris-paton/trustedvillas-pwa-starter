import { Heart, MapPin, Star, Sparkles } from 'lucide-react';

interface VillaCardProps {
  name: string;
  location: string;
  pricePerNight: number;
  image: string;
  tag?: string;
  rating?: number;
  meta?: string;
  perks?: string[];
}

export default function VillaCard({
  name,
  location,
  pricePerNight,
  image,
  tag = 'Private concierge',
  rating = 4.9,
  meta = '',
  perks = [],
}: VillaCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white/95 text-navy shadow-lg ring-1 ring-white/40 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl dark:bg-navy-dark dark:text-cream">
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy shadow-sm">
          {tag}
        </div>
        <button
          aria-label="Save villa"
          className="absolute top-3 right-3 rounded-full bg-white/90 p-2 text-navy shadow-sm transition hover:scale-110"
        >
          <Heart className="h-5 w-5" />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          <Star className="h-4 w-4 text-gold" />
          <span>{rating} guest rating</span>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="space-y-1">
          <h3 className="font-heading text-lg leading-tight">{name}</h3>
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <MapPin className="h-4 w-4 text-teal" />
            <span>{location}</span>
          </div>
        </div>

        {meta && (
          <div className="flex items-center gap-2 rounded-full bg-cream px-3 py-1 text-xs font-semibold text-navy dark:bg-navy dark:text-cream">
            <Sparkles className="h-4 w-4 text-orange" />
            <span>{meta}</span>
          </div>
        )}

        {perks.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {perks.map((perk) => (
              <span
                key={perk}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-white/5 dark:text-cream"
              >
                {perk}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-sm text-slate-500 dark:text-slate-300">from</span>{' '}
            <span className="font-heading text-xl">€{pricePerNight}</span>
            <span className="text-sm text-slate-500 dark:text-slate-300"> /night</span>
          </div>
          <button className="rounded-lg bg-navy px-3 py-2 text-sm font-semibold text-cream shadow-sm transition hover:bg-teal dark:bg-teal dark:hover:bg-orange">
            View villa
          </button>
        </div>
      </div>
    </article>
  );
}
