import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

interface FilterSidebarProps {
  filters: {
    priceRange: number[];
    amenities: string[];
    bedrooms: number;
  };
  onFiltersChange: (filters: FilterSidebarProps["filters"]) => void;
}

const amenitiesList = [
  "Pool",
  "WiFi",
  "Air Con",
  "Sea View",
  "Beach Access",
  "Hot Tub",
  "BBQ",
  "Garden",
  "Gym",
  "Tennis Court",
  "Parking",
  "Pet Friendly",
];

export function FilterSidebar({ filters, onFiltersChange }: FilterSidebarProps) {
  const toggleAmenity = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((a) => a !== amenity)
      : [...filters.amenities, amenity];
    onFiltersChange({ ...filters, amenities: newAmenities });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg mb-4">Filters</h3>
        <Button
          variant="ghost"
          onClick={() =>
            onFiltersChange({
              priceRange: [0, 1000],
              amenities: [],
              bedrooms: 0,
            })
          }
          className="text-orange-500 text-sm p-0 h-auto"
        >
          Clear All
        </Button>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="mb-3">Price Range</h4>
        <div className="space-y-4">
          <Slider
            value={filters.priceRange}
            onValueChange={(value: number[]) =>
              onFiltersChange({ ...filters, priceRange: value })
            }
            max={1000}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>£{filters.priceRange[0]}</span>
            <span>£{filters.priceRange[1]}+</span>
          </div>
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <h4 className="mb-3">Bedrooms</h4>
        <div className="flex flex-wrap gap-2">
          {[0, 1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => onFiltersChange({ ...filters, bedrooms: num })}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                filters.bedrooms === num
                  ? "bg-orange-500 text-white border-orange-500"
                  : "border-gray-300 hover:border-orange-500"
              }`}
            >
              {num === 0 ? "Any" : num === 6 ? "6+" : num}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h4 className="mb-3">Amenities</h4>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {amenitiesList.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                id={amenity}
                checked={filters.amenities.includes(amenity)}
                onCheckedChange={() => toggleAmenity(amenity)}
              />
              <Label
                htmlFor={amenity}
                className="text-sm cursor-pointer"
              >
                {amenity}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Button - Mobile */}
      <div className="md:hidden pt-4">
        <Button className="w-full bg-orange-500 hover:bg-orange-600">
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
