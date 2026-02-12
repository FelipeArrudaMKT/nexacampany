
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const BeforeAfter: React.FC = () => {
  return (
    <section id="antes-depois" className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-purple-600 mb-4">Antes & Depois</h2>
        <p className="text-gray-500 text-lg">Veja a transformação incrível que a Regata Sauna proporciona à quem usa em poucos dias!</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative">
        <div className="bg-white rounded-[40px] p-4 shadow-xl border border-gray-100 overflow-hidden">
          <img 
            src="https://picsum.photos/id/64/800/600" 
            className="w-full h-auto rounded-[32px] object-cover"
            alt="Resultados Reais"
          />
        </div>

        {/* Carousel Buttons */}
        <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-purple-600 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-purple-600 transition-colors">
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};
