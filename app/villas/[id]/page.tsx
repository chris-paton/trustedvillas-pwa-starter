import SwiperGallery from '../../../components/SwiperGallery';
import CountdownTimer from '../../../components/CountdownTimer';

export default function VillaDetails() {
  return (
    <div>
      <SwiperGallery images={['/img1.jpg', '/img2.jpg']} />
      <CountdownTimer />
      {/* Amenities, Map, Reviews */}
      <button className="fixed bottom-0 bg-orange text-white py-4 w-full rounded-t-lg">Reserve This Villa</button>
    </div>
  );
}
