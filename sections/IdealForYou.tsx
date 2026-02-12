
import React from 'react';

const CARDS = [
  {
    title: 'Cansados da Barriga que Transborda',
    desc: 'Estão cansados da barriga que transborda e das roupas apertadas.',
    bg: 'bg-red-50'
  },
  {
    title: 'Querem Queimar Gordura Sem Esforço',
    desc: 'Querem queimar gordura de forma acelerada sem esforço físico.',
    bg: 'bg-yellow-50'
  },
  {
    title: 'Sentem Vergonha do Próprio Corpo',
    desc: 'Sentem vergonha de tirar a camisa em público.',
    bg: 'bg-blue-50'
  },
  {
    title: 'Já Tentaram Treinos ou Dietas',
    desc: 'Já tentaram treinos ou dietas e não obtiveram resultado.',
    bg: 'bg-indigo-50'
  },
  {
    title: 'Querem Acelerar Resultados',
    desc: 'Querem acelerar resultados de treinos sem depender apenas de esforço extremo.',
    bg: 'bg-emerald-50'
  },
  {
    title: 'Desejam Recuperar a Confiança',
    desc: 'Desejam recuperar a confiança, a autoestima e o respeito próprio.',
    bg: 'bg-purple-50'
  }
];

export const IdealForYou: React.FC<{onOrderClick: () => void}> = ({onOrderClick}) => {
  return (
    <section className="bg-[#111827] py-24">
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <span className="bg-gray-800 text-gray-400 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">Ideal para você</span>
        <h2 className="text-3xl md:text-5xl font-black text-white mt-4">
          A Regata Sauna X5 foi feita para <span className="text-purple-400">homens e mulheres que:</span>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {CARDS.map((card, i) => (
          <div key={i} className={`${card.bg} p-8 rounded-3xl border border-white/5 shadow-xl`}>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{card.title}</h3>
            <p className="text-gray-600 leading-relaxed">{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-purple-600 rounded-3xl p-10 text-center relative overflow-hidden shadow-2xl">
           {/* Background dots pattern */}
           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
           
           <h3 className="text-2xl md:text-4xl font-black text-white mb-4 relative z-10">Se Identificou com Algum Perfil?</h3>
           <p className="text-purple-100 text-lg mb-8 relative z-10">Então a Regata Sauna X5 foi feita especialmente para você. Experimente a diferença da queima de gordura acelerada!</p>
           
           <button 
             onClick={onOrderClick}
             className="relative z-10 bg-white text-purple-600 font-black px-10 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform"
           >
             🔥 Agendar Agora Mesmo!
           </button>
        </div>
      </div>
    </section>
  );
};
