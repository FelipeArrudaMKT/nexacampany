
import React from 'react';
import { PACKAGES } from '../constants';

export const Packages: React.FC<{onOrderClick: () => void}> = ({onOrderClick}) => {
  return (
    <section id="pacotes" className="py-24 bg-[#111827]">
      <div className="max-w-4xl mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
          Pacotes <span className="text-purple-400">Disponíveis</span>
        </h2>
        <p className="text-gray-400 text-lg">Ofertas especiais por tempo limitado! Quanto mais peças, maior o desconto. Escolha o pacote do seu interesse.</p>
      </div>

      {/* Container de Oferta Principal - Expandido para max-w-7xl para maior impacto */}
      <div className="max-w-7xl mx-auto px-4 mb-20">
        <div className="bg-purple-700 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_40px_120px_rgba(126,34,206,0.6)] border border-purple-500/30">
           {/* Headline de Impacto - Mantendo a força e o estilo solicitado */}
           <div className="bg-purple-600 py-10 md:py-16 px-6 text-center border-b border-purple-500/20">
              <h3 className="text-4xl md:text-8xl font-black text-emerald-400 leading-none italic mb-4 uppercase tracking-tighter drop-shadow-2xl">
                PAGAMENTO SÓ NA ENTREGA
              </h3>
              <h4 className="text-3xl md:text-6xl font-black text-white tracking-widest uppercase opacity-95">
                FRETE GRÁTIS
              </h4>
           </div>
           
           {/* Container da Imagem - 100% Width e Zero Padding para eliminar espaço morto */}
           <div className="p-0 m-0 flex justify-center items-center bg-purple-700">
              <div className="relative w-full overflow-hidden">
                {/* Overlay sutil para acabamento premium */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none z-10"></div>
                
                <img 
                  src="https://otxafqxfpqiffltyjjii.supabase.co/storage/v1/object/public/videos%20sauna/Design%20sem%20nome.png" 
                  className="w-full h-auto block object-cover transform transition-transform duration-1000 hover:scale-[1.01]" 
                  alt="Oferta Especial Nexa" 
                />
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {PACKAGES.map((pkg, i) => (
          <button 
            key={i} 
            onClick={onOrderClick}
            className={`p-6 rounded-2xl text-center transition-all transform hover:-translate-y-2 border-2 ${
              i === 3 ? 'bg-amber-500 border-amber-400 shadow-[0_10px_30px_rgba(245,158,11,0.3)]' : 
              i === 2 ? 'bg-blue-600 border-blue-500' :
              i === 1 ? 'bg-emerald-600 border-emerald-500 shadow-[0_10px_30px_rgba(16,185,129,0.2)]' :
              'bg-purple-600 border-purple-500'
            }`}
          >
            {i === 3 && <div className="text-[10px] font-black text-amber-900 uppercase mb-2">Pacote Exclusivo</div>}
            <div className="text-sm font-black text-white uppercase mb-2">Agendar {pkg.name}</div>
            <div className="text-2xl font-black text-white">R${pkg.price.toFixed(2).replace('.', ',')}</div>
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-red-600/10 border border-red-500/20 rounded-3xl p-10 text-center">
           <div className="flex items-center justify-center gap-2 text-red-500 mb-6">
              <span className="text-2xl">⚡</span>
              <h3 className="text-3xl font-black">Oferta Por Tempo Limitado!</h3>
           </div>
           <p className="text-gray-300 mb-8 max-w-lg mx-auto">
             Descontos de até 44% OFF válidos apenas esta semana. Não perca a chance de transformar seu físico com preço especial!
           </p>
           <button 
             onClick={onOrderClick}
             className="bg-purple-600 hover:bg-purple-500 text-white font-black px-12 py-4 rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95"
           >
             APROVEITAR OFERTA AGORA
           </button>
        </div>
      </div>
    </section>
  );
};
