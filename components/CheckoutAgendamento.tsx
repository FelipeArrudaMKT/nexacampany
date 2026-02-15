
import React, { useState, useEffect, useMemo } from 'react';

/**
 * COMPONENTE: CheckoutAgendamento
 * Descrição: Módulo completo de checkout para agendamento gratuito.
 * Isolado, sem dependências de arquivos externos para facilidade de "copiar e colar".
 */

const PACKAGES = [
  { id: '1pc', name: '1 peça', pieces: 1, price: 119.90 },
  { id: '2pcs', name: '2 peças', pieces: 2, price: 169.90 },
  { id: '3pcs', name: '3 peças', pieces: 3, price: 219.90 },
  { id: '4pcs', name: '4 peças', pieces: 4, price: 259.90 },
];

const SIZES = [
  { label: 'M', weight: '60 a 74kg' },
  { label: 'G', weight: '75 a 94kg' },
  { label: 'GG (2XG)', weight: '95 a 135kg' },
];

export const CheckoutAgendamento: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  // --- Estados ---
  const [selectedPackage, setSelectedPackage] = useState<typeof PACKAGES[0] | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const [form, setForm] = useState({
    fullName: '',
    whatsapp: '',
    email: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    observations: ''
  });

  // --- Hooks Memorizados ---
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const days = [];
    const firstDay = firstDayOfMonth(year, month);
    const totalDays = daysInMonth(year, month);

    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= totalDays; i++) days.push(new Date(year, month, i));
    
    return days;
  }, [currentMonth]);

  const isFormValid = useMemo(() => {
    return (
      selectedPackage &&
      selectedSize &&
      deliveryDate &&
      form.fullName.trim().length > 3 &&
      form.whatsapp.length >= 10 &&
      form.cep.trim() !== '' &&
      form.street.trim() !== '' &&
      form.number.trim() !== '' &&
      form.neighborhood.trim() !== '' &&
      form.city.trim() !== ''
    );
  }, [selectedPackage, selectedSize, deliveryDate, form]);

  // --- Funções Auxiliares ---
  const isDateDisabled = (date: Date | null) => {
    if (!date) return true;
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate <= today;
  };

  const isSelectedDate = (date: Date | null) => {
    if (!date || !deliveryDate) return false;
    return date.toDateString() === deliveryDate.toDateString();
  };

  const changeMonth = (offset: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1));
  };

  const handleConfirm = () => {
    if (!isFormValid) {
      alert("Por favor, preencha todos os campos obrigatórios e escolha pacote/tamanho/data.");
      return;
    }

    const payload = {
      order: {
        package: selectedPackage?.name,
        price: selectedPackage?.price,
        size: selectedSize,
        deliveryDate: deliveryDate?.toISOString().split('T')[0],
      },
      contact: form,
      timestamp: new Date().toISOString()
    };

    console.log("AGENDAMENTO_CONFIRMADO:", payload);
    alert("Agendamento confirmado com sucesso!");
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Barra Superior */}
      <header className="sticky top-0 z-[100] bg-[#7c3aed] text-white py-4 px-6 flex justify-between items-center shadow-md">
        <button onClick={onBack} className="flex items-center gap-2 font-bold text-sm hover:opacity-80 transition-opacity">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Voltar
        </button>
        <div className="flex items-center gap-2 text-sm font-bold">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Ambiente seguro
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Coluna Esquerda */}
          <div className="flex-1 space-y-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-black mb-2 uppercase tracking-tight">REALIZAR AGENDAMENTO GRATUITO</h1>
              <p className="text-gray-500 font-medium text-lg">Escolha seu pacote e preencha seus dados para entrega.</p>
            </div>

            {/* Aviso Arts Código Civil */}
            <div className="bg-[#fff7ed] border border-[#ffedd5] rounded-3xl p-6 md:p-8 flex gap-5 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#f97316]"></div>
              <div className="text-[#9a3412] text-sm leading-relaxed">
                <p className="font-black mb-2 text-base uppercase">Atenção: Não cobramos nenhum valor antecipado, o pagamento é somente na entrega!</p>
                <p className="font-bold mb-2">Ao agendar, você assume compromisso legal a estar disponível para recebimento do produto na data informada.</p>
                <p className="font-bold opacity-70 uppercase text-[11px]">A ausência caracteriza inadimplemento contratual, conforme arts. 394, 395, 422 e 427 do Código Civil.</p>
              </div>
            </div>

            {/* Banner Oferta */}
            <div className="rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100">
              <img 
                src="https://otxafqxfpqiffltyjjii.supabase.co/storage/v1/object/public/videos%20sauna/Design%20sem%20nome.png" 
                className="w-full h-auto" 
                alt="Pagamento Só na Entrega" 
              />
            </div>

            {/* Escolha do Produto */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black uppercase">Escolha do produto</h2>
                <div className="bg-[#ecfdf5] text-[#059669] px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 border border-emerald-100">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18h6a1 1 0 0 0 1-1V8.5l-3-3H15Z"/><path d="M16 18a2 2 0 1 1-4 0"/><path d="M21 18a2 2 0 1 1-4 0"/></svg>
                  Entrega rápida
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                {PACKAGES.map((pkg) => (
                  <div 
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`flex flex-col md:flex-row items-center justify-between p-6 rounded-[2rem] border-2 transition-all cursor-pointer ${
                      selectedPackage?.id === pkg.id ? 'border-[#7c3aed] bg-[#f5f3ff] shadow-lg scale-[1.01]' : 'border-gray-100 hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex flex-col items-center justify-center font-black">
                        <span className="text-2xl">{pkg.pieces}</span>
                        <span className="text-[10px] uppercase opacity-40">peças</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                           <h3 className="font-black text-xl uppercase">Pacote {pkg.name}</h3>
                           {pkg.pieces === 4 && <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase">Mais vendido</span>}
                           {pkg.pieces === 3 && <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase">Melhor custo</span>}
                        </div>
                        <p className="text-xs text-gray-400 font-bold uppercase mt-1">Pagamento na entrega • Sem taxas ocultas • Frete Grátis</p>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center gap-8">
                      <div className="text-right">
                        <div className="text-2xl font-black">R${pkg.price.toFixed(2).replace('.', ',')}</div>
                        <div className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">R${(pkg.price / pkg.pieces).toFixed(2).replace('.', ',')} / peça</div>
                      </div>
                      <button className={`px-8 py-3 rounded-2xl font-black text-sm uppercase transition-all ${
                         selectedPackage?.id === pkg.id ? 'bg-black text-white' : 'bg-gray-900 text-white'
                      }`}>
                        {selectedPackage?.id === pkg.id ? 'Selecionado' : 'Selecionar'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Escolha o Tamanho */}
            <section className="space-y-6">
              <h2 className="text-xl font-black text-[#7c3aed] uppercase flex items-center gap-3">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="16" height="16" x="4" y="4" rx="2"/><path d="M10 10V6"/><path d="M14 10V6"/><path d="M18 10V6"/><path d="M6 10v4"/><path d="M6 14v4"/><path d="M6 18h4"/></svg>
                 Escolha o tamanho
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {SIZES.map((size) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size.label)}
                    className={`p-6 rounded-[1.5rem] border-2 text-center transition-all ${
                      selectedSize === size.label ? 'border-[#7c3aed] bg-[#f5f3ff] shadow-md' : 'border-gray-100 hover:border-purple-100'
                    }`}
                  >
                    <div className="text-2xl font-black mb-1">{size.label}</div>
                    <div className="text-[11px] text-gray-400 font-bold uppercase tracking-widest leading-tight">Recomendado para {size.weight}</div>
                  </button>
                ))}
              </div>
            </section>

            {/* Dados para Contato */}
            <section className="space-y-8">
              <h2 className="text-2xl font-black uppercase">Dados para contato</h2>
              <div className="space-y-6">
                 <div>
                    <label className="block text-[11px] font-black text-gray-400 mb-2 uppercase tracking-widest">Nome completo *</label>
                    <input 
                      type="text"
                      placeholder="Seu nome completo"
                      className="w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-[1.25rem] focus:border-[#7c3aed] outline-none transition-all font-bold"
                      value={form.fullName}
                      onChange={e => setForm({...form, fullName: e.target.value})}
                    />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-black text-gray-400 mb-2 uppercase tracking-widest">
                        WhatsApp * <span className="text-red-500 font-bold lowercase text-[10px] ml-1">(Atualizações via WhatsApp)</span>
                      </label>
                      <input 
                        type="tel"
                        placeholder="11988888888 ou (11) 98888-8888"
                        className="w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-[1.25rem] focus:border-[#7c3aed] outline-none transition-all font-bold"
                        value={form.whatsapp}
                        onChange={e => setForm({...form, whatsapp: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-black text-gray-400 mb-2 uppercase tracking-widest">Email (opcional)</label>
                      <input 
                        type="email"
                        placeholder="seu@email.com"
                        className="w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-[1.25rem] focus:border-[#7c3aed] outline-none transition-all font-bold"
                        value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                      />
                    </div>
                 </div>
              </div>
            </section>

            {/* Entrega */}
            <section className="space-y-8">
              <h2 className="text-2xl font-black uppercase">Entrega</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-black text-gray-700 uppercase tracking-widest">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                  Dia para receber a entrega *
                </div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Escolha uma data futura (segunda a sábado).</p>
                
                {/* Calendário Construído do Zero */}
                <div className="w-full max-w-[480px] bg-white border-2 border-gray-100 rounded-[2.5rem] p-8 shadow-xl">
                  <div className="flex items-center justify-between mb-8">
                     <button onClick={() => changeMonth(-1)} className="p-3 hover:bg-gray-100 rounded-full transition-all active:scale-90"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m15 18-6-6 6-6"/></svg></button>
                     <span className="font-black text-gray-800 uppercase tracking-widest text-base">
                       {currentMonth.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
                     </span>
                     <button onClick={() => changeMonth(1)} className="p-3 hover:bg-gray-100 rounded-full transition-all active:scale-90"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m9 18 6-6-6-6"/></svg></button>
                  </div>

                  <div className="grid grid-cols-7 gap-2 mb-6">
                    {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                      <div key={d} className="text-[10px] font-black text-gray-300 uppercase tracking-widest text-center py-2">{d}</div>
                    ))}
                    {calendarDays.map((day, i) => {
                      const disabled = isDateDisabled(day);
                      const selected = isSelectedDate(day);
                      return (
                        <div key={i} className="aspect-square flex items-center justify-center">
                          {day ? (
                            <button
                              disabled={disabled}
                              onClick={() => setDeliveryDate(day)}
                              className={`w-full h-full rounded-[1.25rem] flex items-center justify-center text-sm font-black transition-all ${
                                selected ? 'bg-[#7c3aed] text-white shadow-lg scale-110' : 
                                disabled ? 'text-red-200 opacity-40 cursor-not-allowed' : 'text-gray-700 hover:bg-purple-100 hover:text-[#7c3aed]'
                              }`}
                            >
                              {day.getDate()}
                            </button>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                  <div className="pt-6 border-t border-gray-50 text-[10px] text-gray-300 font-bold uppercase text-center tracking-widest">
                    Segunda a Sábado, com pelo menos 1 dia de antecedência
                  </div>
                </div>
              </div>
            </section>

            {/* Endereço */}
            <section className="space-y-8">
              <h2 className="text-2xl font-black text-[#7c3aed] flex items-center gap-4 uppercase">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                 Endereço para entrega
              </h2>
              <div className="space-y-6">
                 <div>
                    <label className="block text-[11px] font-black text-gray-400 mb-2 uppercase tracking-widest">CEP *</label>
                    <input 
                      placeholder="00000-000"
                      className="w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-[1.25rem] focus:border-[#7c3aed] outline-none transition-all font-bold"
                      value={form.cep}
                      onChange={e => setForm({...form, cep: e.target.value})}
                    />
                 </div>
                 <div>
                    <label className="block text-[11px] font-black text-gray-400 mb-2 uppercase tracking-widest">Rua *</label>
                    <input 
                      placeholder="Rua, Avenida..."
                      className="w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-[1.25rem] focus:border-[#7c3aed] outline-none transition-all font-bold"
                      value={form.street}
                      onChange={e => setForm({...form, street: e.target.value})}
                    />
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="col-span-1">
                      <label className="block text-[11px] font-black text-gray-400 mb-2 uppercase tracking-widest">Número *</label>
                      <input 
                        placeholder="123"
                        className="w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-[1.25rem] focus:border-[#7c3aed] outline-none transition-all font-bold"
                        value={form.number}
                        onChange={e => setForm({...form, number: e.target.value})}
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-[11px] font-black text-gray-400 mb-2 uppercase tracking-widest">Complemento <span className="opacity-40">(opcional)</span></label>
                      <input 
                        placeholder="Apto, Bloco..."
                        className="w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-[1.25rem] focus:border-[#7c3aed] outline-none transition-all font-bold"
                        value={form.complement}
                        onChange={e => setForm({...form, complement: e.target.value})}
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-[11px] font-black text-gray-400 mb-2 uppercase tracking-widest">Bairro *</label>
                      <input 
                        placeholder="Bairro"
                        className="w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-[1.25rem] focus:border-[#7c3aed] outline-none transition-all font-bold"
                        value={form.neighborhood}
                        onChange={e => setForm({...form, neighborhood: e.target.value})}
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-[11px] font-black text-gray-400 mb-2 uppercase tracking-widest">Cidade *</label>
                      <input 
                        placeholder="Cidade"
                        className="w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-[1.25rem] focus:border-[#7c3aed] outline-none transition-all font-bold"
                        value={form.city}
                        onChange={e => setForm({...form, city: e.target.value})}
                      />
                    </div>
                 </div>
              </div>
            </section>

            {/* Observações */}
            <section className="space-y-6">
              <h2 className="text-2xl font-black uppercase">Observações</h2>
              <div className="p-8 border-2 border-gray-100 rounded-[2.5rem] bg-white">
                 <textarea 
                  placeholder="Informações adicionais (opcional)"
                  rows={4}
                  className="w-full bg-transparent outline-none resize-none font-bold text-gray-800 placeholder:text-gray-200"
                  value={form.observations}
                  onChange={e => setForm({...form, observations: e.target.value})}
                 />
              </div>
            </section>

            {/* Finalização */}
            <div className="space-y-6 pt-10 pb-20">
               <button 
                onClick={handleConfirm}
                className={`w-full py-6 rounded-3xl font-black text-2xl uppercase transition-all shadow-2xl active:scale-95 ${
                  isFormValid ? 'bg-[#a78bfa] hover:bg-[#7c3aed] text-white' : 'bg-gray-100 text-gray-300 cursor-not-allowed'
                }`}
               >
                 Confirmar agendamento
               </button>
               <div className="bg-[#fffbeb] border border-[#fef3c7] rounded-2xl p-6 text-center">
                  <p className="text-[#92400e] text-sm font-bold leading-relaxed px-4">
                     Ao clicar em Confirmar Agendamento você assume compromisso legal de receber o produto na data informada.
                  </p>
               </div>
            </div>

          </div>

          {/* Sidebar: Seu Carrinho */}
          <div className="lg:w-[420px]">
             <div className="sticky top-28 bg-white border-2 border-gray-100 rounded-[3.5rem] p-10 shadow-2xl space-y-10">
                <h3 className="text-[#7c3aed] text-3xl font-black uppercase tracking-tight">Seu carrinho</h3>
                
                <div className="space-y-8 pb-10 border-b border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                       <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">Produto</p>
                       <p className="font-black text-gray-900 text-xl leading-tight uppercase">
                         {selectedPackage ? `Pacote ${selectedPackage.name}` : 'Selecione um pacote'}
                       </p>
                       <p className="text-sm font-bold text-gray-400 mt-2">Tamanho: {selectedSize || 'Selecione'}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">Valor</p>
                       <p className="font-black text-gray-900 text-2xl tracking-tighter">
                         {selectedPackage ? `R$${selectedPackage.price.toFixed(2).replace('.', ',')}` : '—'}
                       </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4 text-gray-400 font-black text-[12px] uppercase tracking-widest">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18h6a1 1 0 0 0 1-1V8.5l-3-3H15Z"/><path d="M16 18a2 2 0 1 1-4 0"/><path d="M21 18a2 2 0 1 1-4 0"/></svg>
                        Entrega
                     </div>
                     <div className="font-black text-gray-900 uppercase text-sm">Agendada</div>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4 text-gray-400 font-black text-[12px] uppercase tracking-widest">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="3"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                        Pagamento
                     </div>
                     <div className="font-black text-gray-900 uppercase text-sm">Na entrega</div>
                  </div>
                </div>

                {deliveryDate && (
                  <div className="pt-8 border-t border-gray-100">
                     <div className="bg-[#f5f3ff] rounded-3xl p-6 flex items-center gap-5 border border-purple-50">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#7c3aed] shadow-sm">
                           <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">Agendado para</p>
                           <p className="font-black text-[#7c3aed] text-base">
                             {deliveryDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                           </p>
                        </div>
                     </div>
                  </div>
                )}
             </div>
          </div>

        </div>
      </main>
    </div>
  );
};
