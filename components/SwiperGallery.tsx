import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function SwiperGallery({ images }) {
  return (
    <Swiper spaceBetween={0} slidesPerView={1}>
      {images.map((img, i) => (
        <SwiperSlide key={i}><img src={img} alt="" className="w-full h-64 object-cover" /></SwiperSlide>
      ))}
    </Swiper>
  );
}