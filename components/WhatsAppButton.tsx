
import React from 'react';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const phoneNumber = "5567998348381";
  const message = encodeURIComponent("Olá! Gostaria de saber mais sobre a Regata Sauna.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[90] bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-[0_10px_25px_rgba(16,185,129,0.4)] transition-all transform hover:scale-110 active:scale-95 group"
      aria-label="Falar no WhatsApp"
    >
      <div className="absolute -top-12 right-0 bg-white text-gray-800 text-xs font-bold py-2 px-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
        Dúvidas? Fale conosco!
        <div className="absolute bottom-[-6px] right-5 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45"></div>
      </div>
      <MessageCircle size={32} fill="currentColor" className="text-white" />
      <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20 pointer-events-none"></span>
    </a>
  );
};
