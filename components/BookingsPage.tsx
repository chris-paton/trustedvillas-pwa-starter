import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Mail, Phone, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";

interface BookingsPageProps {
  onNavigate: (page: "villa" | "home" | "search" | "destinations" | "bookings", villaId?: string) => void;
}

const mockBookings = [
  {
    id: 1,
    villaId: "1",
    villaName: "Villa Sunset Paradise",
    location: "Costa del Sol, Spain",
    image: "https://images.unsplash.com/photo-1758192838598-a1de4da5dcaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHBvb2wlMjBzdW5zZXR8ZW58MXx8fHwxNzYzOTMyOTUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    checkIn: "2024-12-15",
    checkOut: "2024-12-22",
    guests: 6,
    status: "upcoming",
    reference: "TV-2024-001234",
    total: 1995,
  },
  {
    id: 2,
    villaId: "2",
    villaName: "Tuscan Hillside Retreat",
    location: "Tuscany, Italy",
    image: "https://images.unsplash.com/photo-1699394631060-a643e09d4780?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwdmlsbGElMjB0dXNjYW55fGVufDF8fHx8MTc2MzkzMjk1M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    checkIn: "2024-08-10",
    checkOut: "2024-08-17",
    guests: 4,
    status: "completed",
    reference: "TV-2024-000987",
    total: 2240,
  },
];

export function BookingsPage({ onNavigate }: BookingsPageProps) {
  const upcomingBookings = mockBookings.filter((b) => b.status === "upcoming");
  const pastBookings = mockBookings.filter((b) => b.status === "completed");

  return (
    <div className="md:mt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl md:text-4xl mb-2">My Bookings</h1>
          <p className="text-white/90">Manage your villa reservations</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* No Bookings State */}
        {mockBookings.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl mb-2">No Bookings Yet</h2>
            <p className="text-gray-600 mb-6">
              Start planning your dream European getaway!
            </p>
            <Button
              onClick={() => onNavigate("search")}
              className="bg-orange-500 hover:bg-orange-600"
            >
              Explore Villas
            </Button>
          </div>
        )}

        {/* Upcoming Bookings */}
        {upcomingBookings.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl mb-6">Upcoming Trips</h2>
            <div className="space-y-6">
              {upcomingBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row">
                    <div
                      className="w-full md:w-64 h-48 md:h-auto cursor-pointer"
                      onClick={() => onNavigate("villa", booking.villaId)}
                    >
                      <ImageWithFallback
                        src={booking.image}
                        alt={booking.villaName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <Badge className="mb-2 bg-green-100 text-green-700 border-0">
                            Confirmed
                          </Badge>
                          <h3 className="text-xl mb-1">{booking.villaName}</h3>
                          <div className="flex items-center gap-1 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{booking.location}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          Ref: {booking.reference}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Check-in</p>
                          <p className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.checkIn).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Check-out</p>
                          <p className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.checkOut).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Guests</p>
                          <p className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {booking.guests} guests
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button
                          onClick={() => onNavigate("villa", booking.villaId)}
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download Voucher
                        </Button>
                        <Button
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <Mail className="w-4 h-4" />
                          Contact Host
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Past Bookings */}
        {pastBookings.length > 0 && (
          <div>
            <h2 className="text-2xl mb-6">Past Trips</h2>
            <div className="space-y-6">
              {pastBookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow opacity-90"
                >
                  <div className="flex flex-col md:flex-row">
                    <div
                      className="w-full md:w-64 h-48 md:h-auto cursor-pointer"
                      onClick={() => onNavigate("villa", booking.villaId)}
                    >
                      <ImageWithFallback
                        src={booking.image}
                        alt={booking.villaName}
                        className="w-full h-full object-cover grayscale-[30%]"
                      />
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <Badge className="mb-2 bg-gray-100 text-gray-700 border-0">
                            Completed
                          </Badge>
                          <h3 className="text-xl mb-1">{booking.villaName}</h3>
                          <div className="flex items-center gap-1 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{booking.location}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          Ref: {booking.reference}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Check-in</p>
                          <p className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.checkIn).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Check-out</p>
                          <p className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.checkOut).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Guests</p>
                          <p className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {booking.guests} guests
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button
                          onClick={() => onNavigate("villa", booking.villaId)}
                          className="bg-orange-500 hover:bg-orange-600"
                        >
                          Book Again
                        </Button>
                        <Button variant="outline">Leave a Review</Button>
                        <Button variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Receipt
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-6">
              Our customer service team is available 24/7 to assist you with your bookings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600">
                <Phone className="w-4 h-4" />
                Call Us: +44 20 1234 5678
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
