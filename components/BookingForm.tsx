import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Users, CreditCard, Lock, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { TrustRow } from "./TrustRow";

interface BookingFormProps {
  villa: {
    name: string;
    price: number;
    originalPrice: number;
  };
  onClose: () => void;
}

export function BookingForm({ villa, onClose }: BookingFormProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests] = useState(2);
  const [bookingComplete, setBookingComplete] = useState(false);

  const nights =
    checkIn && checkOut
      ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      : 0;
  const subtotal = nights * villa.price;
  const serviceFee = subtotal * 0.12;
  const total = subtotal + serviceFee;

  const handleComplete = () => {
    setBookingComplete(true);
  };

  if (bookingComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600 mb-6">
          Your reservation at {villa.name} has been confirmed.
        </p>
        <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
          <h3 className="mb-4">Booking Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Check-in:</span>
              <span>{checkIn?.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Check-out:</span>
              <span>{checkOut?.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Guests:</span>
              <span>{guests}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Nights:</span>
              <span>{nights}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span>Total Paid:</span>
              <span className="text-lg">£{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-6">
          A confirmation email has been sent to your inbox with your booking reference and villa details.
        </p>
        <div className="space-y-3">
          <Button className="w-full bg-orange-500 hover:bg-orange-600" onClick={onClose}>
            Done
          </Button>
          <Button variant="outline" className="w-full">
            View My Bookings
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="py-4">
      <h2 className="text-2xl mb-6">Complete Your Booking</h2>

      {/* Progress Steps */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((num) => (
          <div key={num} className="flex items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                step >= num
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {num}
            </div>
            {num < 3 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  step > num ? "bg-orange-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Dates & Guests */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <Label className="mb-2 block">Select Dates</Label>
            <div className="grid grid-cols-2 gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:border-orange-500 transition-colors text-left">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Check-in</p>
                      <p className="text-sm">
                        {checkIn ? checkIn.toLocaleDateString() : "Add date"}
                      </p>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    disabled={(date: Date | undefined) =>
                      date ? date < new Date() : false
                    }
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:border-orange-500 transition-colors text-left">
                    <CalendarIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Check-out</p>
                      <p className="text-sm">
                        {checkOut ? checkOut.toLocaleDateString() : "Add date"}
                      </p>
                    </div>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
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
          </div>

          <div>
            <Label className="mb-2 block">Number of Guests</Label>
            <div className="flex items-center gap-4">
              <Users className="w-5 h-5 text-gray-400" />
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 hover:border-orange-500 transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center text-lg">{guests}</span>
                <button
                  onClick={() => setGuests(Math.min(20, guests + 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 hover:border-orange-500 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {checkIn && checkOut && nights > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="mb-3">Price Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    £{villa.price} x {nights} nights
                  </span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service fee</span>
                  <span>£{serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-lg">£{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={() => setStep(2)}
            disabled={!checkIn || !checkOut || nights <= 0}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            Continue to Guest Details
          </Button>
        </motion.div>
      )}

      {/* Step 2: Guest Details */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* NEW: Trust Row */}
          <TrustRow />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="mb-2 block">
                First Name
              </Label>
              <Input id="firstName" placeholder="John" />
            </div>
            <div>
              <Label htmlFor="lastName" className="mb-2 block">
                Last Name
              </Label>
              <Input id="lastName" placeholder="Doe" />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="mb-2 block">
              Email Address
            </Label>
            <Input id="email" type="email" placeholder="john.doe@example.com" />
          </div>

          <div>
            <Label htmlFor="phone" className="mb-2 block">
              Phone Number
            </Label>
            <Input id="phone" type="tel" placeholder="+44 7700 900000" />
          </div>

          <div>
            <Label htmlFor="requests" className="mb-2 block">
              Special Requests (Optional)
            </Label>
            <textarea
              id="requests"
              placeholder="Early check-in, late check-out, etc."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows={3}
            />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
              Back
            </Button>
            <Button onClick={() => setStep(3)} className="flex-1 bg-orange-500 hover:bg-orange-600">
              Continue to Payment
            </Button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Payment */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-blue-900 mb-1">Secure Payment</p>
              <p className="text-blue-700">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>
          </div>

          <div>
            <Label htmlFor="cardName" className="mb-2 block">
              Cardholder Name
            </Label>
            <Input id="cardName" placeholder="John Doe" />
          </div>

          <div>
            <Label htmlFor="cardNumber" className="mb-2 block">
              Card Number
            </Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry" className="mb-2 block">
                Expiry Date
              </Label>
              <Input id="expiry" placeholder="MM/YY" />
            </div>
            <div>
              <Label htmlFor="cvv" className="mb-2 block">
                CVV
              </Label>
              <Input id="cvv" placeholder="123" type="password" maxLength={3} />
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="mb-3">Final Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service fee</span>
                <span>£{serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 text-lg">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-600">
            By completing this booking, you agree to our{" "}
            <button className="text-orange-500 hover:underline">Terms of Service</button>{" "}
            and{" "}
            <button className="text-orange-500 hover:underline">Privacy Policy</button>.
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
              Back
            </Button>
            <Button
              onClick={handleComplete}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
            >
              Complete Booking - £{total.toFixed(2)}
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
