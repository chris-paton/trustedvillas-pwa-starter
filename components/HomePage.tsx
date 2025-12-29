import { motion } from "framer-motion";
import { SearchBar } from "@/components/SearchBar";
import { DealCard } from "@/components/DealCard";
import { TrustBadges } from "@/components/TrustBadges";
import { DestinationTile } from "@/components/DestinationTile";
import { Star, Award, Shield } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";

interface HomePageProps {
  onSearch: (params: { location: string; guests: number; checkIn: string; checkOut: string }) => void;
  onNavigate: (page: "search" | "destinations" | "villa" | "home" | "bookings", villaId?: number) => void;
}

const topDeals = [
  {
    id: 1,
    name: "Villa Sunset Paradise",
    location: "Costa del Sol, Spain",
    image: "https://images.unsplash.com/photo-1758192838598-a1de4da5dcaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHBvb2wlMjBzdW5zZXR8ZW58MXx8fHwxNzYzOTMyOTUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    sleeps: 8,
    bedrooms: 4,
    price: 285,
    originalPrice: 425,
    rating: 4.9,
    reviews: 127,
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
    price: 320,
    originalPrice: 460,
    rating: 5.0,
    reviews: 89,
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
    price: 445,
    originalPrice: 650,
    rating: 4.8,
    reviews: 156,
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
    price: 520,
    originalPrice: 775,
    rating: 4.9,
    reviews: 203,
    leftInStock: 2,
    discount: 33,
  },
];

const destinations = [
  {
    name: "Spain",
    count: 12847,
    image: "https://images.unsplash.com/photo-1711091692742-fd965be43bce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFuaXNoJTIwdmlsbGElMjBjb2FzdGxpbmV8ZW58MXx8fHwxNzYzOTMyOTUzfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Italy",
    count: 8934,
    image: "https://images.unsplash.com/photo-1699394631060-a643e09d4780?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwdmlsbGElMjB0dXNjYW55fGVufDF8fHx8MTc2MzkzMjk1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "France",
    count: 7521,
    image: "https://images.unsplash.com/photo-1763505901553-7f9700215b35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjB2aWxsYSUyMHByb3ZlbmNlfGVufDF8fHx8MTc2MzkzMjk1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function HomePage({ onSearch, onNavigate }: HomePageProps) {
  return (
    <div className="md:mt-20">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1758192838598-a1de4da5dcaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHBvb2wlMjBzdW5zZXR8ZW58MXx8fHwxNzYzOTMyOTUyfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Luxury villa with pool at sunset"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-white text-4xl md:text-6xl mb-4 md:mb-6">
              Escape to Luxury:<br />
              <span className="text-orange-400">47,000+ Villas in Europe</span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl mb-8 md:mb-12">
              Book Now & Save Up to 33% on Your Dream Holiday
            </p>

            {/* Search Bar */}
            <SearchBar onSearch={onSearch} />

            {/* Trust Indicators */}
            <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-4 md:gap-6 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>30+ Years Trusted</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>4.8/5 from 50,000+ Reviews</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>100% Secure Booking</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Flash Deal Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-orange-500 via-orange-500 to-orange-600 text-white py-3 px-4 text-center shadow-[0_12px_30px_-12px_rgba(255,107,53,0.55)]"
        style={{
          backgroundImage: "linear-gradient(90deg, #ff6b35 0%, #ff6b35 50%, #ff5a2d 100%)",
          backgroundColor: "#ff6b35",
          color: "#fff",
        }}
      >
        <p className="text-sm md:text-base">
          🔥 <strong>Flash Sale:</strong> Book within 24 hours and get an extra 10% off! Use code: <strong>FLASH10</strong>
        </p>
      </motion.div>

      {/* Top Deals Section */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl mb-2">Top Deals Today</h2>
            <p className="text-gray-600">Limited availability – Book before they are gone!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topDeals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <DealCard deal={deal} onViewDetails={() => onNavigate("villa", deal.id)} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl text-center mb-8 md:mb-12">
            Book with Confidence
          </h2>
          <TrustBadges />
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl mb-2">Explore Popular Destinations</h2>
          <p className="text-gray-600">Discover your perfect European getaway</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <DestinationTile
                destination={dest}
                onClick={() => {
                  onSearch({ location: dest.name, guests: 2, checkIn: "", checkOut: "" });
                }}
              />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => onNavigate("destinations")}
            className="text-orange-500 hover:text-orange-600"
          >
            View All Destinations →
          </button>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl text-center mb-8 md:mb-12">
            What Our Guests Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah M.",
                location: "London, UK",
                rating: 5,
                text: "Absolutely stunning villa in Spain! The booking process was seamless and the property exceeded our expectations. Will definitely book again!",
                date: "2 weeks ago",
              },
              {
                name: "James T.",
                location: "Dublin, Ireland",
                rating: 5,
                text: "Best holiday we have ever had. The villa was spotless, the location perfect, and the customer service was outstanding. Highly recommend!",
                date: "1 month ago",
              },
              {
                name: "Emma R.",
                location: "Manchester, UK",
                rating: 5,
                text: "Great value for money! Saved 30% with their deals and got a luxurious villa with a private pool. The kids loved it!",
                date: "3 weeks ago",
              },
            ].map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{review.text}</p>
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <p className="text-gray-500">{review.name}</p>
                    <p className="text-gray-400 text-xs">{review.location}</p>
                  </div>
                  <p className="text-gray-400 text-xs">{review.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl mb-4">Get Exclusive Deals</h2>
          <p className="mb-6 md:mb-8 text-white/90">
            Subscribe to our newsletter and get first access to flash sales, new villas, and exclusive discounts up to 40% off!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <button className="bg-white text-orange-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-white/70 mt-3">
            Join 100,000+ subscribers. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Exit Intent Popup (Demo) */}
      <ExitIntentPopup />
    </div>
  );
}
