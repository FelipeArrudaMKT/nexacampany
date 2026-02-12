
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_DATA } from '../constants';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black mb-4">
          Perguntas <span className="text-purple-600">Frequentes</span>
        </h2>
        <p className="text-gray-500 text-lg">Tire todas as suas dúvidas sobre nosso serviço. Se não encontrar a resposta, entre em contato conosco!</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 space-y-4">
        {FAQ_DATA.map((item, i) => (
          <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <span className="font-bold text-gray-800 pr-8">{item.question}</span>
              {openIndex === i ? (
                <Minus size={20} className="text-purple-600 shrink-0" />
              ) : (
                <Plus size={20} className="text-purple-600 shrink-0" />
              )}
            </button>
            {openIndex === i && (
              <div className="p-6 pt-0 text-gray-500 leading-relaxed border-t border-gray-50 bg-gray-50/50">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
