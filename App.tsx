"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Home, Search, Map, Heart, User, Moon, Sun } from "lucide-react";
import { HomePage } from "./components/HomePage";
import { SearchResults } from "./components/SearchResults";
import { VillaDetails } from "./components/VillaDetails";
import { DestinationsPage } from "./components/DestinationsPage";
import { BookingsPage } from "./components/BookingsPage";

type Page = "home" | "search" | "villa" | "destinations" | "bookings";

type AppProps = {
  initialPage?: Page;
  initialVillaId?: string | null;
  initialSearchParams?: {
    location?: string;
    country?: string;
    area?: string;
    guests?: number;
    checkIn?: string;
    checkOut?: string;
  };
};

export default function App({
  initialPage = "home",
  initialVillaId = null,
  initialSearchParams,
}: AppProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<Page>(initialPage);
  const [selectedVilla, setSelectedVilla] = useState<string | null>(initialVillaId);
  const [darkMode, setDarkMode] = useState(false);
  const [wishlistCount] = useState(3); // Mock wishlist count
  const [searchParams, setSearchParams] = useState<{
    location?: string;
    country?: string;
    area?: string;
    guests: number;
    checkIn: string;
    checkOut: string;
  }>({
    location: initialSearchParams?.location,
    country: initialSearchParams?.country,
    area: initialSearchParams?.area,
    guests: initialSearchParams?.guests ?? 2,
    checkIn: initialSearchParams?.checkIn ?? "",
    checkOut: initialSearchParams?.checkOut ?? "",
  });

  const buildSearchUrl = (params: typeof searchParams) => {
    const query = new URLSearchParams();
    // Prioritize specific location types
    if (params.country) query.set("country", params.country);
    if (params.area) query.set("area", params.area);
    if (params.location) query.set("location", params.location);
    if (params.guests) query.set("guests", String(params.guests));
    if (params.checkIn) query.set("checkIn", params.checkIn);
    if (params.checkOut) query.set("checkOut", params.checkOut);
    return query.toString() ? `/search?${query.toString()}` : "/search";
  };

  const pathForPage = (page: Page, villaId?: string | null) => {
    switch (page) {
      case "home":
        return "/";
      case "search":
        return buildSearchUrl(searchParams);
      case "destinations":
        return "/destinations";
      case "villa": {
        const idToUse = villaId ?? selectedVilla ?? "1";
        return `/accommodation/${idToUse}`;
      }
      case "bookings":
        return "/bookings";
    }
  };

  const navigateTo = (page: Page, villaId?: string) => {
    if (villaId !== undefined) {
      setSelectedVilla(villaId);
    }

    setCurrentPage(page);

    router.push(pathForPage(page, villaId));
  };

  const handleSearch = (params: typeof searchParams) => {
    setSearchParams(params);
    setCurrentPage("search");
    router.push(buildSearchUrl(params));
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
          <Link
            href={pathForPage("home")}
            onClick={() => setCurrentPage("home")}
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
          </Link>
          
          <Link
            href={pathForPage("search")}
            onClick={() => setCurrentPage("search")}
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
          </Link>
          
          <Link
            href={pathForPage("destinations")}
            onClick={() => setCurrentPage("destinations")}
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
          </Link>
          
          <Link
            href="#wishlist"
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
          </Link>
          
          <Link
            href={pathForPage("bookings")}
            onClick={() => setCurrentPage("bookings")}
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
          </Link>
        </div>
      </nav>

      {/* Desktop Navigation */}
      <nav className={`hidden md:block fixed top-0 left-0 right-0 ${darkMode ? 'bg-[#16283a] border-[#2a3f54]' : 'bg-white border-gray-200'} border-b z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* NEW Logo */}
            <Link
              href={pathForPage("home")}
              onClick={() => setCurrentPage("home")}
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
            </Link>

            <div className="flex items-center gap-8">
              <Link
                href={pathForPage("home")}
                onClick={() => setCurrentPage("home")}
                className={currentPage === "home" ? "text-[#ff6b35]" : darkMode ? "text-gray-300" : "text-gray-700"}
              >
                Home
              </Link>
              <Link
                href={pathForPage("search")}
                onClick={() => setCurrentPage("search")}
                className={currentPage === "search" ? "text-[#ff6b35]" : darkMode ? "text-gray-300" : "text-gray-700"}
              >
                Search Villas
              </Link>
              <Link
                href={pathForPage("destinations")}
                onClick={() => setCurrentPage("destinations")}
                className={currentPage === "destinations" ? "text-[#ff6b35]" : darkMode ? "text-gray-300" : "text-gray-700"}
              >
                Destinations
              </Link>
              <Link
                href={pathForPage("bookings")}
                onClick={() => setCurrentPage("bookings")}
                className={currentPage === "bookings" ? "text-[#ff6b35]" : darkMode ? "text-gray-300" : "text-gray-700"}
              >
                My Bookings
              </Link>
              
              {/* Wishlist with counter */}
              <Link href="#wishlist" className={`relative ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#ff6b35] text-white text-xs rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              
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
