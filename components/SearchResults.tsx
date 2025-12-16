import { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, MapIcon, LayoutGrid, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { VillaCard } from "./VillaCard";
import { FilterSidebar } from "./FilterSidebar";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface SearchResultsProps {
  searchParams: {
    location: string;
    guests: number;
    checkIn: string;
    checkOut: string;
  };
  onViewVilla: (id: number) => void;
  onNavigate: (page: "home") => void;
}

const mockVillas = [
  {
    id: 1,
    name: "Villa Sunset Paradise",
    location: "Costa del Sol, Spain",
    image: "https://images.unsplash.com/photo-1758192838598-a1de4da5dcaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHBvb2wlMjBzdW5zZXR8ZW58MXx8fHwxNzYzOTMyOTUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    sleeps: 8,
    bedrooms: 4,
    bathrooms: 3,
    price: 285,
    originalPrice: 425,
    rating: 4.9,
    reviews: 127,
    features: ["Pool", "WiFi", "Sea View", "Air Con"],
    leftInStock: 2,
    discount: 33,
  },
  {
    id: 2,
    name: "Tuscan Hillside Retreat",
    location: "Tuscany, Italy",
    image: "https://images.unsplash.com/photo-1699394631060-a643e09d4780?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwdmlsbGElMjB0dXNjYW55fGVufDF8fHx8MTc2MzkzMjk1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    sleeps: 6,
    bedrooms: 3,
    bathrooms: 2,
    price: 320,
    originalPrice: 460,
    rating: 5.0,
    reviews: 89,
    features: ["Pool", "WiFi", "Garden", "BBQ"],
    leftInStock: 1,
    discount: 30,
  },
  {
    id: 3,
    name: "Provence Lavender Estate",
    location: "Provence, France",
    image: "https://images.unsplash.com/photo-1763505901553-7f9700215b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjB2aWxsYSUyMHByb3ZlbmNlfGVufDF8fHx8MTc2MzkzMjk1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    sleeps: 10,
    bedrooms: 5,
    bathrooms: 4,
    price: 445,
    originalPrice: 650,
    rating: 4.8,
    reviews: 156,
    features: ["Pool", "WiFi", "Hot Tub", "Tennis Court"],
    leftInStock: 3,
    discount: 32,
  },
  {
    id: 4,
    name: "Ocean View Villa Deluxe",
    location: "Algarve, Portugal",
    image: "https://images.unsplash.com/photo-1729605412044-81f6acce4370?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwb29sJTIwb2NlYW4lMjB2aWV3fGVufDF8fHx8MTc2MzkzMjk1NHww&ixlib=rb-4.1.0&q=80&w=1080",
    sleeps: 12,
    bedrooms: 6,
    bathrooms: 5,
    price: 520,
    originalPrice: 775,
    rating: 4.9,
    reviews: 203,
    features: ["Pool", "WiFi", "Sea View", "Gym"],
    leftInStock: 2,
    discount: 33,
  },
  {
    id: 5,
    name: "Mediterranean Pearl",
    location: "Mallorca, Spain",
    image: "https://images.unsplash.com/photo-1629199159634-28a88785cee5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGVycmFuZWFuJTIwdmlsbGElMjBleHRlcmlvcnxlbnwxfHx8fDE3NjM5MzI5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    sleeps: 8,
    bedrooms: 4,
    bathrooms: 3,
    price: 395,
    originalPrice: 560,
    rating: 4.7,
    reviews: 92,
    features: ["Pool", "WiFi", "Beach Access", "Air Con"],
    leftInStock: 4,
    discount: 29,
  },
  {
    id: 6,
    name: "Luxury Villa Horizonte",
    location: "Costa del Sol, Spain",
    image: "https://images.unsplash.com/photo-1757262798623-a215e869d708?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMGludGVyaW9uJTIwbGl2aW5nfGVufDF8fHx8MTc2MzkzMjk1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    sleeps: 6,
    bedrooms: 3,
    bathrooms: 2,
    price: 275,
    originalPrice: 390,
    rating: 4.8,
    reviews: 145,
    features: ["Pool", "WiFi", "Mountain View", "BBQ"],
    leftInStock: 5,
    discount: 29,
  },
];

export function SearchResults({ searchParams, onViewVilla, onNavigate }: SearchResultsProps) {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [sortBy, setSortBy] = useState("recommended");
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    amenities: [] as string[],
    bedrooms: 0,
  });

  return (
    <div className="md:mt-20">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl md:text-2xl">
                {searchParams.location || "All Destinations"}
              </h1>
              <p className="text-sm text-gray-600">
                {mockVillas.length} villas available
                {searchParams.guests > 0 && ` • ${searchParams.guests} guests`}
              </p>
            </div>
            <button
              onClick={() => onNavigate("home")}
              className="text-orange-500 text-sm hover:text-orange-600"
            >
              Edit Search
            </button>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {/* Filter Button - Mobile */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <FilterSidebar filters={filters} onFiltersChange={setFilters} />
              </SheetContent>
            </Sheet>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>

            {/* View Toggle */}
            <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid" ? "bg-white shadow-sm" : ""
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`p-2 rounded ${
                  viewMode === "map" ? "bg-white shadow-sm" : ""
                }`}
              >
                <MapIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-32">
              <FilterSidebar filters={filters} onFiltersChange={setFilters} />
            </div>
          </aside>

          {/* Villa Grid */}
          <div className="flex-1">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockVillas.map((villa, index) => (
                  <motion.div
                    key={villa.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <VillaCard villa={villa} onViewDetails={() => onViewVilla(villa.id)} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg h-[600px] flex items-center justify-center">
                <div className="text-center">
                  <MapIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">Map view coming soon</p>
                  <p className="text-sm text-gray-500">Interactive map with villa pins</p>
                </div>
              </div>
            )}

            {/* Load More */}
            {viewMode === "grid" && (
              <div className="text-center mt-8">
                <Button variant="outline" className="px-8">
                  Load More Villas
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Personalized Recommendation Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-xl mb-2">Based on your search, you might also like...</h3>
          <p className="text-gray-600 mb-4">Villas for {searchParams.guests} guests in {searchParams.location || "Europe"}</p>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {mockVillas.slice(0, 3).map((villa) => (
              <div
                key={villa.id}
                onClick={() => onViewVilla(villa.id)}
                className="flex-shrink-0 w-64 bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              >
                <ImageWithFallback
                  src={villa.image}
                  alt={villa.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <h4 className="text-sm mb-1 truncate">{villa.name}</h4>
                  <p className="text-orange-500">£{villa.price}/night</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
