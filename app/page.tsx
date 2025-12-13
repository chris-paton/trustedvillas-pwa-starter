'use client';
import { useState } from 'react';
import VillaCard from '../components/VillaCard';
import BottomTabBar from '../components/BottomTabBar';
import { Search, Calendar, Users } from 'lucide-react';

export default function Home() {
  const [location, setLocation] = useState('');
  const [guests, setGuests] = useState(2);
  const [dates, setDates] = useState(''); // e.g., "Jun 1-7, 2026"

  const deals = [
    { 
      id: 1, 
      name: 'Sunset Mallorca Retreat', 
      price: 320, 
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80', 
      scarcity: 'Booked 9× this week',
      rating: 4.9
    },
    { 
      id: 2, 
      name: 'Tuscan Hills Villa', 
      price: 450, 
      image: 'https://images.unsplash.com/photo-1578631617126-0bb9ee4e46f0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 
      scarcity: 'Only 2 dates left',
      rating: 4.8
    },
    // Add 2 more for the carousel
  ];

  const handleSearch = () => {
    // In real app: Navigate to /search with query params
    console.log('Searching:', { location, guests, dates });
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-navy-dark">
      {/* Hero Header */}
      <header className="p-4 bg-gradient-to-r from-navy to-teal text-white">
        <h1 className="font-heading text-3xl md:text-4xl mb-2">Your Dream Villa Awaits – Save up to 33% Before It’s Gone</h1>
        
        {/* Search Bar */}
        <div className="bg-white dark:bg-navy rounded-lg p-4 shadow-lg">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal w-5 h-5" />
              <input
                type="text"
                placeholder="Where to? (e.g., Mallorca)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-teal rounded focus:outline-none focus:ring-2 focus:ring-orange"
              />
            </div>
            <div className="flex-1 relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal w-5 h-5" />
              <input
                type="text"
                placeholder="Dates"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-teal rounded focus:outline-none focus:ring-2 focus:ring-orange"
              />
            </div>
            <div className="flex-1 relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal w-5 h-5" />
              <input
                type="number"
                placeholder="Guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-teal rounded focus:outline-none focus:ring-2 focus:ring-orange"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-orange text-white px-6 py-2 rounded-lg font-semibold hover:bg-gold transition"
            >
              Find My Villa
            </button>
          </div>
        </div>
      </header>

      {/* Hot Deals */}
      <section className="p-4">
        <h2 className="font-heading text-2xl mb-4 text-navy dark:text-cream">Hot Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {deals.map((deal) => (
            <VillaCard key={deal.id} {...deal} />
          ))}
        </div>
      </section>

      <BottomTabBar />
    </div>
  );
}