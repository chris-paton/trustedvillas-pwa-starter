import { useState } from "react";
import { Search, MapPin, Users, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";

interface SearchBarProps {
  onSearch: (params: {
    location: string;
    guests: number;
    checkIn: string;
    checkOut: string;
  }) => void;
  defaultValues?: {
    location?: string;
    guests?: number;
    checkIn?: string;
    checkOut?: string;
  };
}

const popularLocations = [
  "Costa del Sol, Spain",
  "Tuscany, Italy",
  "Provence, France",
  "Algarve, Portugal",
  "Mallorca, Spain",
  "Amalfi Coast, Italy",
  "French Riviera, France",
  "Ibiza, Spain",
];

export function SearchBar({ onSearch, defaultValues }: SearchBarProps) {
  const [location, setLocation] = useState(defaultValues?.location || "");
  const [guests, setGuests] = useState(defaultValues?.guests || 2);
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [showGuestsPicker, setShowGuestsPicker] = useState(false);

  const filteredLocations = popularLocations.filter((loc) =>
    loc.toLowerCase().includes(location.toLowerCase())
  );

  const handleSearch = () => {
    onSearch({
      location,
      guests,
      checkIn: checkIn?.toISOString() || "",
      checkOut: checkOut?.toISOString() || "",
    });
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-3 md:p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4">
        {/* Location */}
        <div className="relative md:col-span-2">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setShowLocationSuggestions(true);
              }}
              onFocus={() => setShowLocationSuggestions(true)}
              className="w-full pl-10 pr-4 py-3 md:py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Location Suggestions */}
          {showLocationSuggestions && location && filteredLocations.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {filteredLocations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setLocation(loc);
                    setShowLocationSuggestions(false);
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{loc}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dates */}
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex-1 flex items-center gap-2 px-3 py-3 md:py-4 border border-gray-200 rounded-lg hover:border-orange-500 transition-colors text-left">
                <CalendarIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Check-in</p>
                  <p className="text-sm truncate">
                    {checkIn ? checkIn.toLocaleDateString() : "Add date"}
                  </p>
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={(date: Date | undefined) => (date ? date < new Date() : false)}
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <button className="flex-1 flex items-center gap-2 px-3 py-3 md:py-4 border border-gray-200 rounded-lg hover:border-orange-500 transition-colors text-left">
                <CalendarIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">Check-out</p>
                  <p className="text-sm truncate">
                    {checkOut ? checkOut.toLocaleDateString() : "Add date"}
                  </p>
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date: Date | undefined) =>
                  date ? date < (checkIn || new Date()) : false
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="relative">
          <Popover open={showGuestsPicker} onOpenChange={setShowGuestsPicker}>
            <PopoverTrigger asChild>
              <button className="w-full flex items-center gap-2 px-3 py-3 md:py-4 border border-gray-200 rounded-lg hover:border-orange-500 transition-colors text-left">
                <Users className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500">Guests</p>
                  <p className="text-sm">{guests} {guests === 1 ? "guest" : "guests"}</p>
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64" align="start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Guests</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 hover:border-orange-500 transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{guests}</span>
                    <button
                      onClick={() => setGuests(Math.min(20, guests + 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 hover:border-orange-500 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                <Button
                  onClick={() => setShowGuestsPicker(false)}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  Done
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Search Button */}
      <Button
        onClick={handleSearch}
        className="w-full mt-3 md:mt-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 md:py-4 rounded-lg flex items-center justify-center gap-2"
      >
        <Search className="w-5 h-5" />
        <span>Search Villas</span>
      </Button>
    </div>
  );
}
