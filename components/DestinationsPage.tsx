import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Country, Area } from "@/types/locations";

interface DestinationsPageProps {
  onNavigate?: (page: "search" | "home" | "destinations" | "villa" | "bookings", villaId?: string) => void;
  onSearch: (params: {
    location?: string;
    country?: string;
    area?: string;
    guests: number;
    checkIn: string;
    checkOut: string;
  }) => void;
}

interface DestinationRegion {
  name: string;
  code: string;
  image: string;
}

interface DestinationCountry {
  country: Country;
  regions: DestinationRegion[];
}

// Fallback images for regions
const regionImages: Record<string, string> = {
  default: "https://images.unsplash.com/photo-1758192838598-a1de4da5dcaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHBvb2wlMjBzdW5zZXR8ZW58MXx8fHwxNzYzOTMyOTUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "Costa del Sol": "https://images.unsplash.com/photo-1711091692742-fd965be43bce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFuaXNoJTIwdmlsbGElMjBjb2FzdGxpbmV8ZW58MXx8fHwxNzYzOTMyOTUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  "Mallorca": "https://images.unsplash.com/photo-1629199159634-28a88785cee5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGVycmFuZWFuJTIwdmlsbGElMjBleHRlcmlvcnxlbnwxfHx8fDE3NjM5MzI5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "Tuscany": "https://images.unsplash.com/photo-1699394631060-a643e09d4780?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwdmlsbGElMjB0dXNjYW55fGVufDF8fHx8MTc2MzkzMjk1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  "Provence": "https://images.unsplash.com/photo-1763505901553-7f9700215b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjB2aWxsYSUyMHByb3ZlbmNlfGVufDF8fHx8MTc2MzkzMjk1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  "French Riviera": "https://images.unsplash.com/photo-1729605412044-81f6acce4370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwb29sJTIwb2NlYW4lMjB2aWV3fGVufDF8fHx8MTc2MzkzMjk1NHww&ixlib=rb-4.1.0&q=80&w=1080",
};

export function DestinationsPage({ onSearch }: DestinationsPageProps) {
  const [destinations, setDestinations] = useState<DestinationCountry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDestinations() {
      try {
        setLoading(true);

        // Fetch all countries
        const countriesResponse = await fetch('/api/locations/countries');
        if (!countriesResponse.ok) {
          throw new Error('Failed to fetch countries');
        }
        const countries: Country[] = await countriesResponse.json();

        // Fetch areas for each country
        const destinationsData: DestinationCountry[] = await Promise.all(
          countries.map(async (country) => {
            try {
              const areasResponse = await fetch(`/api/locations/areas/${country.id}`);
              if (!areasResponse.ok) {
                console.error(`Failed to fetch areas for country ${country.name}`);
                return { country, regions: [] };
              }

              const areas: Area[] = await areasResponse.json();

              const regions: DestinationRegion[] = areas.map(area => ({
                name: area.displayName || area.name,
                code: area.code,
                image: regionImages[area.displayName || area.name] || regionImages.default,
              }));

              return { country, regions };
            } catch (err) {
              console.error(`Error fetching areas for ${country.name}:`, err);
              return { country, regions: [] };
            }
          })
        );

        // Filter out countries with no regions
        const filteredDestinations = destinationsData.filter(d => d.regions.length > 0);
        setDestinations(filteredDestinations);
        setError(null);
      } catch (err) {
        console.error('Error fetching destinations:', err);
        setError('Failed to load destinations. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchDestinations();
  }, []);

  const handleRegionClick = (regionName: string) => {
    onSearch({
      area: regionName,
      guests: 2,
      checkIn: "",
      checkOut: "",
    });
  };

  return (
    <div className="md:mt-20">
      {/* Header */}
      <div className="bg-orange-500 bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl mb-4">Explore the Finest Destinations in Europe</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Discover luxury villas across the most beautiful regions in Europe
          </p>
        </div>
      </div>

      {/* Destinations Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-orange-500" />
            <span className="ml-3 text-gray-600">Loading destinations...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Destinations by Country */}
        {!loading && !error && (
          <div className="space-y-12">
            {destinations.map((destination, countryIndex) => (
              <motion.div
                key={destination.country.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: countryIndex * 0.1 }}
              >
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl mb-2">
                    {destination.country.displayName || destination.country.name}
                  </h2>
                  <p className="text-gray-600">
                    {destination.regions.length} {destination.regions.length === 1 ? 'region' : 'regions'} available
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {destination.regions.map((region, regionIndex) => (
                    <motion.div
                      key={region.code}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: regionIndex * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      className="relative h-64 rounded-xl overflow-hidden cursor-pointer group"
                      onClick={() => handleRegionClick(region.name)}
                    >
                      <ImageWithFallback
                        src={region.image}
                        alt={region.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl md:text-2xl mb-2">{region.name}</h3>
                        <p className="text-white/90 text-sm">
                          Explore villas
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 py-12 md:py-16 mt-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl mb-4">Cannot find what you are looking for?</h2>
          <p className="text-gray-600 mb-6">
            Our team of villa experts can help you find the perfect property for your needs.
          </p>
          <button className="bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg shadow-[0_12px_30px_-12px_rgba(255,107,53,0.55)] hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-12px_rgba(255,107,53,0.65)] transition-all">
            Contact Our Experts
          </button>
        </div>
      </div>
    </div>
  );
}
