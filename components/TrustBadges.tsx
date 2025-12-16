import { Shield, CreditCard, Award, Clock, CheckCircle, Phone } from "lucide-react";

export function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: "100% Secure Payments",
      description: "Bank-level encryption protects your data",
    },
    {
      icon: Award,
      title: "Lowest Price Guarantee",
      description: "Find it cheaper? We'll refund the difference",
    },
    {
      icon: CheckCircle,
      title: "Quality Verified",
      description: "Every villa inspected by our team",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Expert help whenever you need it",
    },
    {
      icon: CreditCard,
      title: "Flexible Payments",
      description: "Pay now or later, your choice",
    },
    {
      icon: Phone,
      title: "Instant Confirmation",
      description: "Get your booking confirmed immediately",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <div key={index} className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 bg-orange-100 rounded-full flex items-center justify-center">
              <Icon className="w-8 h-8 text-orange-500" />
            </div>
            <h4 className="text-sm mb-1">{badge.title}</h4>
            <p className="text-xs text-gray-500">{badge.description}</p>
          </div>
        );
      })}
    </div>
  );
}
