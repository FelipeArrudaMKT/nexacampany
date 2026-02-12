
import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111827] text-white pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
        <div>
          <h3 className="text-xl font-black text-purple-400 mb-6 tracking-tight uppercase">Regata Sauna</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            Transformamos suas roupas básicas em peças premium com acabamento profissional e qualidade excepcional.
          </p>
          <div className="space-y-4 text-sm text-gray-400">
             <div className="flex items-start gap-3">
                <MapPin size={18} className="text-purple-400 mt-1" />
                <span>São Paulo, SP - Brasil</span>
             </div>
             <div className="flex items-start gap-3">
                <Phone size={18} className="text-purple-400 mt-1" />
                <span>(88) 9 9690-5380</span>
             </div>
             <div className="flex items-start gap-3">
                <Mail size={18} className="text-purple-400 mt-1" />
                <span>suporte@nexaregata.com</span>
             </div>
             <div className="flex items-start gap-3">
                <Clock size={18} className="text-purple-400 mt-1" />
                <span>Entrega Seg-Sab: 8h às 18h</span>
             </div>
          </div>
        </div>

        <div>
           <h3 className="text-xl font-black mb-6">Links Rápidos</h3>
           <ul className="space-y-4 text-sm text-gray-400">
             <li><a href="#inicio" className="hover:text-purple-400 transition-colors">Início</a></li>
             <li><a href="#beneficios" className="hover:text-purple-400 transition-colors">Benefícios</a></li>
             <li><a href="#antes-depois" className="hover:text-purple-400 transition-colors">Antes & Depois</a></li>
             <li><a href="#depoimentos" className="hover:text-purple-400 transition-colors">Depoimentos</a></li>
             <li><a href="#pacotes" className="hover:text-purple-400 transition-colors">Pacotes</a></li>
             <li><a href="#faq" className="hover:text-purple-400 transition-colors">FAQ</a></li>
           </ul>
        </div>

        <div>
           <h3 className="text-xl font-black mb-6">Nossos Serviços</h3>
           <ul className="space-y-4 text-sm text-gray-400">
             <li>Transformação de Regatas</li>
             <li>Acabamento Premium</li>
             <li>Entrega Expressa</li>
             <li>Consultoria Personalizada</li>
             <li>Garantia de Qualidade</li>
             <li>Suporte 24/7</li>
           </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-bold tracking-widest uppercase">
         <p>© 2024 Nexa Regata Sauna. Todos os direitos reservados.</p>
         <div className="flex gap-6">
           <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
           <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
           <a href="#" className="hover:text-white transition-colors">Cookies</a>
         </div>
      </div>
    </footer>
  );
};
