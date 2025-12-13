import { Shield, Star, Tag, Heart } from 'lucide-react';

export default function TrustRow() {
  return (
    <div className="flex justify-around py-4">
      <div><Shield /> Secure Payment</div>
      <div><Star /> 50k+ Reviews</div>
      <div><Tag /> Lowest Price</div>
      <div><Heart /> 24/7 Support</div>
    </div>
  );
}