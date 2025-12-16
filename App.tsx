import { useState } from "react";
import { Home, Search, Map, Heart, User, Moon, Sun } from "lucide-react";
import { HomePage } from "./components/HomePage";
import { SearchResults } from "./components/SearchResults";
import { VillaDetails } from "./components/VillaDetails";
import { DestinationsPage } from "./components/DestinationsPage";
import { BookingsPage } from "./components/BookingsPage";

type Page = "home" | "search" | "villa" | "destinations" | "bookings";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedVilla, setSelectedVilla] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [wishlistCount] = useState(3); // Mock wishlist count
  const [searchParams, setSearchParams] = useState({
    location: "",
    guests: 2,
    checkIn: "",
    checkOut: "",
  });

  const navigateTo = (page: Page, villaId?: number) => {
    setCurrentPage(page);
    if (villaId !== undefined) {
      setSelectedVilla(villaId);
    }
  };

  const handleSearch = (params: typeof searchParams) => {
    setSearchParams(params);
    setCurrentPage("search");
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#08121e] text-[#e8ecef]' : 'bg-white'}`}>
      {/* Page Content */}
      <main className="pb-16 md:pb-0">
        {currentPage === "home" && (
          <HomePage onSearch={handleSearch} onNavigate={navigateTo} />
        )}
        {currentPage === "search" && (
          <SearchResults
            searchParams={searchParams}
            onViewVilla={(id) => navigateTo("villa", id)}
            onNavigate={navigateTo}
          />
        )}
        {currentPage === "villa" && selectedVilla !== null && (
          <VillaDetails villaId={selectedVilla} onNavigate={navigateTo} />
        )}
        {currentPage === "destinations" && (
          <DestinationsPage onNavigate={navigateTo} onSearch={handleSearch} />
        )}
        {currentPage === "bookings" && (
          <BookingsPage onNavigate={navigateTo} />
        )}
      </main>

      {/* Mobile Bottom Tab Navigation - NEW DESIGN */}
      <nav className={`fixed bottom-0 left-0 right-0 ${darkMode ? 'bg-[#16283a] border-[#2a3f54]' : 'bg-white border-gray-200'} border-t md:hidden z-50 safe-area-bottom`}>
        <div className="flex justify-around items-center h-16 px-2">
          <button
            onClick={() => navigateTo("home")}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all ${
              currentPage === "home" 
                ? "text-[#ff6b35]" 
                : darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <Home 
              className={`w-6 h-6 ${currentPage === "home" ? "fill-current" : ""}`} 
            />
            <span className="text-xs font-medium">Home</span>
          </button>
          
          <button
            onClick={() => navigateTo("search")}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all ${
              currentPage === "search" 
                ? "text-[#ff6b35]" 
                : darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <Search 
              className={`w-6 h-6 ${currentPage === "search" ? "fill-current" : ""}`} 
            />
            <span className="text-xs font-medium">Search</span>
          </button>
          
          <button
            onClick={() => navigateTo("destinations")}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all ${
              currentPage === "destinations" 
                ? "text-[#ff6b35]" 
                : darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <Map 
              className={`w-6 h-6 ${currentPage === "destinations" ? "fill-current" : ""}`} 
            />
            <span className="text-xs font-medium">Map</span>
          </button>
          
          <button
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all relative ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <div className="relative">
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ff6b35] text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="text-xs font-medium">Wishlist</span>
          </button>
          
          <button
            onClick={() => navigateTo("bookings")}
            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all ${
              currentPage === "bookings" 
                ? "text-[#ff6b35]" 
                : darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <User 
              className={`w-6 h-6 ${currentPage === "bookings" ? "fill-current" : ""}`} 
            />
            <span className="text-xs font-medium">Profile</span>
          </button>
        </div>
      </nav>

      {/* Desktop Navigation */}
      <nav className={`hidden md:block fixed top-0 left-0 right-0 ${darkMode ? 'bg-[#16283a] border-[#2a3f54]' : 'bg-white border-gray-200'} border-b z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* NEW Logo */}
            <button
              onClick={() => navigateTo("home")}
              className="flex items-center gap-3"
            >
              <div className="relative w-12 h-12">
                {/* Negative space villa roof "V" logo */}
                <svg viewBox="0 0 48 48" className="w-full h-full">
                  <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0b2d4e" />
                      <stop offset="100%" stopColor="#d4a017" />
                    </linearGradient>
                  </defs>
                  <rect width="48" height="48" rx="10" fill="url(#logoGradient)" />
                  <path 
                    d="M 12 32 L 24 16 L 36 32 L 33 32 L 24 20 L 15 32 Z" 
                    fill="white" 
                  />
                  <rect x="22" y="28" width="4" height="8" fill="white" />
                </svg>
              </div>
              <span className={`text-xl font-medium ${darkMode ? 'text-[#e8ecef]' : 'text-gray-900'}`}>
                TrustedVillas
              </span>
            </button>

            <div className="flex items-center gap-8">
              <button
                onClick={() => navigateTo("home")}
                className={currentPage === "home" ? "text-[#ff6b35]" : darkMode ? "text-gray-300" : "text-gray-700"}
              >
                Home
              </button>
              <button
                onClick={() => navigateTo("search")}
                className={currentPage === "search" ? "text-[#ff6b35]" : darkMode ? "text-gray-300" : "text-gray-700"}
              >
                Search Villas
              </button>
              <button
                onClick={() => navigateTo("destinations")}
                className={currentPage === "destinations" ? "text-[#ff6b35]" : darkMode ? "text-gray-300" : "text-gray-700"}
              >
                Destinations
              </button>
              <button
                onClick={() => navigateTo("bookings")}
                className={currentPage === "bookings" ? "text-[#ff6b35]" : darkMode ? "text-gray-300" : "text-gray-700"}
              >
                My Bookings
              </button>
              
              {/* Wishlist with counter */}
              <button className={`relative ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#ff6b35] text-white text-xs rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
              
              {/* Dark Mode Toggle */}
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? 'bg-[#2a3f54] text-[#d4a017]' : 'bg-gray-100 text-gray-700'} hover:scale-110 transition-transform`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button className={darkMode ? "text-gray-300" : "text-gray-700"}>Sign In</button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}