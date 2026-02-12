
import React from 'react';

const FEATURES = [
  { icon: '🔥', text: 'Barriga menor no primeiro uso' },
  { icon: '⚡', text: 'Queima 5x mais rápida' },
  { icon: '💪', text: 'Suor explosivo' },
  { icon: '💧', text: 'Discreta e poderosa' },
  { icon: '💎', text: 'Autoestima renovada' },
  { icon: '✅', text: 'Risco zero: pague só na entrega' },
];

export const Benefits: React.FC<{onOrderClick: () => void}> = ({onOrderClick}) => {
  return (
    <section id="beneficios" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-black mb-4">
          <span className="text-purple-600">Benefícios</span> Surreais
        </h2>
        <p className="text-gray-500 text-lg">Descubra por que milhares de clientes tiveram resultados surpreendentes!</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 mb-16">
        <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl relative group">
           <img 
             src="https://picsum.photos/id/102/1200/675" 
             className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
             alt="Benefit Video Preview" 
           />
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-xl cursor-pointer hover:scale-110 transition-all">
                <div className="border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-2"></div>
             </div>
           </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
        {FEATURES.map((feat, i) => (
          <div key={i} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow">
            <span className="text-4xl block mb-4">{feat.icon}</span>
            <span className="text-xl font-bold text-gray-800">{feat.text}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button 
          onClick={onOrderClick}
          className="bg-purple-600 text-white font-black text-xl px-12 py-5 rounded-2xl shadow-2xl hover:bg-purple-500 transition-all transform active:scale-95"
        >
          Experimente Agora Mesmo!
        </button>
      </div>
    </section>
  );
};
