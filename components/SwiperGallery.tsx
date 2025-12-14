'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image'; // Optional: for better optimization

interface SwiperGalleryProps {
  images: string[]; // Array of image URLs
}

export default function SwiperGallery({ images }: SwiperGalleryProps) {
  return (
    <Swiper spaceBetween={0} slidesPerView={1} loop={true} pagination={{ clickable: true }}>
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          {/* Using Next.js Image for optimization – fallback to img if you prefer */}
          <div className="relative w-full h-96">
            <Image
              src={src}
              alt={`Villa image ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
          {/* Or simple <img> if you don't want Next/Image */}
          {/* <img src={src} alt={`Villa ${index + 1}`} className="w-full h-96 object-cover" /> */}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}