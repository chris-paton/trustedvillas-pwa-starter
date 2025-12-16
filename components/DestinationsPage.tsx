import { motion } from "framer-motion";
import { MapPin, TrendingUp } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface DestinationsPageProps {
  onNavigate?: (page: "search") => void;
  onSearch: (params: {
    location: string;
    guests: number;
    checkIn: string;
    checkOut: string;
  }) => void;
}

const destinations = [
  {
    country: "Spain",
    regions: [
      {
        name: "Costa del Sol",
        villas: 3421,
        image: "https://images.unsplash.com/photo-1711091692742-fd965be43bce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFuaXNoJTIwdmlsbGElMjBjb2FzdGxpbmV8ZW58MXx8fHwxNzYzOTMyOTUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        popular: true,
      },
      {
        name: "Mallorca",
        villas: 2845,
        image: "https://images.unsplash.com/photo-1629199159634-28a88785cee5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGVycmFuZWFuJTIwdmlsbGElMjBleHRlcmlvcnxlbnwxfHx8fDE3NjM5MzI5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
        popular: true,
      },
      {
        name: "Ibiza",
        villas: 1923,
        image: "https://images.unsplash.com/photo-1758192838598-a1de4da5dcaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHBvb2wlMjBzdW5zZXR8ZW58MXx8fHwxNzYzOTMyOTUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
        popular: false,
      },
      {
        name: "Costa Brava",
        villas: 1658,
        image: "https://images.unsplash.com/photo-1729605412044-81f6acce4370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwb29sJTIwb2NlYW4lMjB2aWV3fGVufDF8fHx8MTc2MzkzMjk1NHww&ixlib=rb-4.1.0&q=80&w=1080",
        popular: false,
      },
    ],
  },
  {
    country: "Italy",
    regions: [
      {
        name: "Tuscany",
        villas: 3156,
        image: "https://images.unsplash.com/photo-1699394631060-a643e09d4780?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwdmlsbGElMjB0dXNjYW55fGVufDF8fHx8MTc2MzkzMjk1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        popular: true,
      },
      {
        name: "Amalfi Coast",
        villas: 2234,
        image: "https://images.unsplash.com/photo-1757262798623-a215e869d708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMGludGVyaW9yJTIwbGl2aW5nfGVufDF8fHx8MTc2MzkzMjk1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
        popular: true,
      },
      {
        name: "Lake Como",
        villas: 1544,
        image: "https://images.unsplash.com/photo-1601221998768-c0cdf463a393?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWxsYSUyMGJlZHJvb20lMjBsdXh1cnl8ZW58MXx8fHwxNzYzOTMyOTU0fDA&ixlib=rb-4.1.0&q=80&w=1080",
        popular: false,
      },
    ],
  },
  {
    country: "France",
    regions: [
      {
        name: "Provence",
        villas: 2567,
        image: "https://images.unsplash.com/photo-1763505901553-7f9700215b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjB2aWxsYSUyMHByb3ZlbmNlfGVufDF8fHx8MTc2MzkzMjk1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        popular: true,
      },
      {
        name: "French Riviera",
        villas: 2198,
        image: "https://images.unsplash.com/photo-1729605412044-81f6acce4370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwb29sJTIwb2NlYW4lMjB2aWV3fGVufDF8fHx8MTc2MzkzMjk1NHww&ixlib=rb-4.1.0&q=80&w=1080",
        popular: true,
      },
      {
        name: "Dordogne",
        villas: 1456,
        image: "https://images.unsplash.com/photo-1699394631060-a643e09d4780?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwdmlsbGElMjB0dXNjYW55fGVufDF8fHx8MTc2MzkzMjk1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        popular: false,
      },
    ],
  },
  {
    country: "Portugal",
    regions: [
      {
        name: "Algarve",
        villas: 1834,
        image: "https://images.unsplash.com/photo-1758192838598-a1de4da5dcaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHBvb2wlMjBzdW5zZXR8ZW58MXx8fHwxNzYzOTMyOTUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
        popular: true,
      },
      {
        name: "Lisbon Coast",
        villas: 1267,
        image: "https://images.unsplash.com/photo-1711091692742-fd965be43bce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFuaXNoJTIwdmlsbGElMjBjb2FzdGxpbmV8ZW58MXx8fHwxNzYzOTMyOTUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
        popular: false,
      },
    ],
  },
];

export function DestinationsPage({ onSearch }: DestinationsPageProps) {
  const handleRegionClick = (regionName: string) => {
    onSearch({
      location: regionName,
      guests: 2,
      checkIn: "",
      checkOut: "",
    });
  };

  return (
    <div className="md:mt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl mb-4">Explore the Finest Destinations in Europe</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Discover 47,000+ luxury villas across the most beautiful regions in Europe
          </p>
        </div>
      </div>

      {/* Interactive Map Placeholder */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-gray-100 rounded-xl h-64 md:h-96 flex items-center justify-center mb-12">
          <div className="text-center text-gray-600">
            <MapPin className="w-16 h-16 mx-auto mb-4" />
            <p className="text-lg">Interactive Map</p>
            <p className="text-sm">Click on regions to explore villas</p>
          </div>
        </div>

        {/* Destinations by Country */}
        <div className="space-y-12">
          {destinations.map((country, countryIndex) => (
            <motion.div
              key={country.country}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: countryIndex * 0.1 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl mb-2">{country.country}</h2>
                <p className="text-gray-600">
                  {country.regions.reduce((sum, region) => sum + region.villas, 0).toLocaleString()} villas available
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {country.regions.map((region, regionIndex) => (
                  <motion.div
                    key={region.name}
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

                    {region.popular && (
                      <div className="absolute top-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        Popular
                      </div>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl md:text-2xl mb-2">{region.name}</h3>
                      <p className="text-white/90 text-sm">
                        {region.villas.toLocaleString()} villas
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
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
