import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, MapIcon, LayoutGrid, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { VillaCard } from "./VillaCard";
import { FilterSidebar } from "./FilterSidebar";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { transformAccommodations, Villa } from "@/utils/accommodationTransformer";
import { AccommodationListResponse } from "@/types/accommodation";
import { buildAPIQueryParams, buildQueryString } from "@/utils/searchParamsBuilder";

interface SearchResultsProps {
  searchParams: {
    location?: string;
    country?: string;
    area?: string;
    guests: number;
    checkIn: string;
    checkOut: string;
  };
  onViewVilla: (id: string) => void;
  onNavigate: (page: "home" | "search" | "destinations" | "villa" | "bookings") => void;
}

export function SearchResults({ searchParams, onViewVilla, onNavigate }: SearchResultsProps) {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [sortBy, setSortBy] = useState("recommended");
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    amenities: [] as string[],
    bedrooms: 0,
  });
  const [villas, setVillas] = useState<Villa[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch accommodations from API
  useEffect(() => {
    async function fetchAccommodations() {
      try {
        setLoading(true);
        setError(null);

        // Build API query parameters from search params (now async)
        const apiParams = await buildAPIQueryParams(searchParams);
        const queryString = buildQueryString(apiParams);
        const apiUrl = `/api/accommodation-list${queryString ? `?${queryString}` : ''}`;

        console.log('Fetching with params:', apiParams);
        console.log('API URL:', apiUrl);

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error('Failed to fetch accommodations');
        }

        const data: AccommodationListResponse = await response.json();
        const transformedVillas = transformAccommodations(data);
        setVillas(transformedVillas);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching accommodations:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchAccommodations();
  }, [searchParams]);

  return (
    <div className="md:mt-20">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 md:top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl md:text-2xl">
                {searchParams.area || searchParams.country || searchParams.location || "All Destinations"}
              </h1>
              <p className="text-sm text-gray-600">
                {loading ? "Loading..." : `${villas.length} villas available`}
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
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <Loader2 className="w-12 h-12 mx-auto mb-4 text-orange-500 animate-spin" />
                  <p className="text-gray-600">Loading villas...</p>
                </div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
                <p className="text-red-600 mb-2">Failed to load accommodations</p>
                <p className="text-sm text-gray-600 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()} variant="outline">
                  Try Again
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {villas.map((villa, index) => (
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
            {viewMode === "grid" && !loading && !error && villas.length > 0 && (
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
            {!loading && villas.slice(0, 3).map((villa) => (
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
