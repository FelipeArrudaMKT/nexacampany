
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BEFORE_AFTER_IMAGES = [
  'https://otxafqxfpqiffltyjjii.supabase.co/storage/v1/object/public/videos%20sauna/antes%20e%20depois.jpg',
  'https://otxafqxfpqiffltyjjii.supabase.co/storage/v1/object/public/videos%20sauna/Antes%20x%20Depois%20(1).png',
  'https://otxafqxfpqiffltyjjii.supabase.co/storage/v1/object/public/videos%20sauna/Antes%20x%20Depois.png',
  'https://otxafqxfpqiffltyjjii.supabase.co/storage/v1/object/public/videos%20sauna/antesdepois.jpg'
];

export const BeforeAfter: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % BEFORE_AFTER_IMAGES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + BEFORE_AFTER_IMAGES.length) % BEFORE_AFTER_IMAGES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section id="antes-depois" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-purple-600 mb-4 tracking-tighter">Antes & Depois</h2>
        <p className="text-gray-500 text-lg">Veja a transformação incrível que a Regata Sauna proporciona em poucos dias!</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative">
        <div className="bg-white rounded-[40px] p-4 shadow-xl border border-gray-100 overflow-hidden relative aspect-[4/3] sm:aspect-video">
          {BEFORE_AFTER_IMAGES.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-4 transition-all duration-700 ease-in-out transform ${
                index === currentIndex 
                  ? 'opacity-100 scale-100 translate-x-0' 
                  : index < currentIndex 
                    ? 'opacity-0 scale-95 -translate-x-full' 
                    : 'opacity-0 scale-95 translate-x-full'
              }`}
            >
              <img 
                src={img} 
                className="w-full h-full rounded-[32px] object-contain bg-gray-50"
                alt={`Resultado Real ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Carousel Buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center text-gray-400 hover:text-purple-600 transition-all hover:scale-110 active:scale-90 z-20"
        >
          <ChevronLeft size={28} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-14 h-14 bg-white rounded-full shadow-2xl flex items-center justify-center text-gray-400 hover:text-purple-600 transition-all hover:scale-110 active:scale-90 z-20"
        >
          <ChevronRight size={28} />
        </button>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {BEFORE_AFTER_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'bg-purple-600 w-8' : 'bg-gray-300 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
