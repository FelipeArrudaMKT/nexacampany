
import React from 'react';

interface HeroProps {
  onOrderClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick }) => {
  return (
    <section id="inicio" className="relative pt-20 pb-32 overflow-hidden">
      {/* Background Image/Overlay Mockup */}
      <div className="absolute inset-0 bg-[#1a1033] z-0">
        <img 
           src="https://picsum.photos/id/449/1920/1080?grayscale&blur=5" 
           className="w-full h-full object-cover opacity-30 mix-blend-overlay"
           alt="Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1033]/80"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full border border-emerald-500/30 mb-8 animate-pulse">
          <span className="text-sm font-bold">⭐ 🔥 Queima Gordura 5X Mais Rápido</span>
        </div>

        <h1 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">
          O atalho <span className="text-emerald-400">mais rápido</span> pra secar a barriga <span className="text-white">sem mudar a rotina</span>
        </h1>

        <p className="text-lg md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Tecnologia efeito sauna: <span className="text-emerald-400 font-bold">elimine a gordura</span> até em repouso
        </p>

        <div className="flex flex-col items-center gap-8">
           <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-xl backdrop-blur-sm">
             <p className="text-gray-200 text-sm font-medium flex items-center gap-2">
                🕒 Agende Agora e pague só quando receber em mãos
             </p>
           </div>

           <button 
             onClick={onOrderClick}
             className="w-full max-w-md py-6 bg-emerald-600 hover:bg-emerald-500 text-white text-xl font-black rounded-2xl shadow-[0_20px_50px_rgba(5,150,105,0.4)] transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3"
           >
             🔥 AGENDAR AGORA MESMO
           </button>
        </div>
      </div>
    </section>
  );
};
