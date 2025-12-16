import { Shield, Star, Tag, Heart } from "lucide-react";
import { motion } from "framer-motion";

export function TrustRow() {
  const trustItems = [
    {
      icon: Shield,
      text: "100% Secure Payment",
      color: "text-green-600"
    },
    {
      icon: Star,
      text: "50,000+ verified reviews",
      color: "text-yellow-600"
    },
    {
      icon: Tag,
      text: "Lowest Price Guarantee",
      color: "text-orange-600"
    },
    {
      icon: Heart,
      text: "24/7 Guest Support",
      color: "text-red-600"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-4 my-6">
      <h4 className="text-center text-sm font-medium text-gray-700 mb-4">
        Why book with TrustedVillas?
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {trustItems.map((item, index) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center text-center gap-2"
          >
            <div className={`w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center ${item.color}`}>
              <item.icon className="w-6 h-6" />
            </div>
            <p className="text-xs text-gray-700 leading-tight">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
