
import React from 'react';
import { Phone } from 'lucide-react';

interface NavbarProps {
  onOrderClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOrderClick }) => {
  const menuItems = [
    { label: 'Início', href: '#inicio' },
    { label: 'Benefícios', href: '#beneficios' },
    { label: 'Antes & Depois', href: '#antes-depois' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Pacotes', href: '#pacotes' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-purple-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white rounded-lg">
               <span className="text-purple-700 font-black text-xl tracking-tighter">NEXA</span>
            </div>
            <div className="hidden md:block">
              <span className="text-xs font-bold block leading-none">REGATA SAUNA</span>
              <span className="text-[10px] block leading-none opacity-80 uppercase tracking-widest">Company</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium hover:text-purple-200 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            onClick={onOrderClick}
            className="flex items-center gap-2 bg-purple-500 hover:bg-purple-400 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md"
          >
            <Phone size={18} />
            Agendar Pedido
          </button>
        </div>
      </div>
    </nav>
  );
};
