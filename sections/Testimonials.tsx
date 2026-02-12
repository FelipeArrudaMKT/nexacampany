
import React from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';

const STATS = [
  { label: 'Corpos Transformados', value: '6000+' },
  { label: 'Avaliação Média', value: '4.9/5' },
  { label: 'Dos Clientes Satisfeitos', value: '99,4%' },
  { label: 'Entrega Rápida', value: '24h' },
];

export const Testimonials: React.FC = () => {
  return (
    <section id="depoimentos" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black mb-4">
          O Que Nossos <span className="text-purple-600">Clientes Dizem</span>
        </h2>
        <p className="text-gray-500 text-lg">Mais de 6000 clientes já transformaram o corpo e a autoestima! Veja alguns depoimentos reais.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {[1, 2].map((i) => (
          <div key={i} className="bg-emerald-50 rounded-2xl p-6 flex items-center gap-4 border border-emerald-100">
             <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0 cursor-pointer">
               <Play size={20} fill="currentColor" />
             </div>
             <div className="flex-1">
               <div className="flex gap-0.5 mb-1">
                 {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(dot => (
                   <div key={dot} className="w-1 h-6 bg-emerald-300 rounded-full"></div>
                 ))}
               </div>
               <div className="flex justify-between text-[10px] text-emerald-600 font-bold">
                 <span>0:00</span>
                 <span>1:11</span>
               </div>
             </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
        {STATS.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl md:text-5xl font-black text-purple-600 mb-2 tracking-tighter">{stat.value}</div>
            <div className="text-xs md:text-sm text-gray-500 font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="max-w-xl mx-auto px-4 relative">
        <div className="bg-gray-100 rounded-[3rem] p-6 shadow-2xl border border-gray-200">
          <img 
            src="https://picsum.photos/id/1/600/1000" 
            className="w-full rounded-[2.5rem] shadow-inner"
            alt="WhatsApp Chat"
          />
        </div>

        <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400">
          <ChevronLeft size={24} />
        </button>
        <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400">
          <ChevronRight size={24} />
        </button>
        
        <div className="flex justify-center gap-2 mt-8">
           <div className="w-2 h-2 rounded-full bg-gray-300"></div>
           <div className="w-2 h-2 rounded-full bg-gray-300"></div>
           <div className="w-2 h-2 rounded-full bg-purple-600"></div>
           <div className="w-2 h-2 rounded-full bg-gray-300"></div>
           <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </section>
  );
};
