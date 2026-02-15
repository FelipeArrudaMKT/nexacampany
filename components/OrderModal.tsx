
import React, { useState, useEffect, useMemo } from 'react';
import { X, ShieldCheck, ChevronLeft, ChevronRight, MapPin, Truck, CreditCard, Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';
import { PACKAGES, SIZES } from '../constants';
import { Order, OrderStatus } from '../types';
import { saveOrder } from '../services/db';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  
  // States do formulário
  const [selectedPackage, setSelectedPackage] = useState<typeof PACKAGES[0] | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [address, setAddress] = useState({
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: ''
  });
  const [observations, setObservations] = useState('');

  // Estados do Calendário
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // Lógica do Calendário (Hooks useMemo devem vir antes de retornos condicionais)
  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const days = [];
    const firstDay = firstDayOfMonth(year, month);
    const totalDays = daysInMonth(year, month);

    // Espaços vazios do início
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Dias do mês
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  }, [currentMonth]);

  // CORREÇÃO ERRO #310: O retorno condicional deve vir APÓS todos os hooks
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPackage || !selectedSize || !deliveryDate || !fullName || !whatsapp || !address.cep || !address.street || !address.number || !address.neighborhood || !address.city) {
      alert("Por favor, preencha todos os campos obrigatórios, escolha um pacote, tamanho e data de entrega.");
      return;
    }

    setLoading(true);
    
    const orderData: Order = {
      createdAt: new Date().toISOString(),
      packageName: selectedPackage.name,
      packagePrice: selectedPackage.price,
      size: selectedSize,
      fullName,
      whatsapp,
      email,
      deliveryDate: deliveryDate.toISOString().split('T')[0],
      cep: address.cep,
      street: address.street,
      number: address.number,
      complement: address.complement,
      neighborhood: address.neighborhood,
      city: address.city,
      observations,
      status: OrderStatus.NEW
    };

    console.log("Gerando Agendamento (JSON):", JSON.stringify(orderData, null, 2));

    const result = await saveOrder(orderData);
    setLoading(false);
    
    if (result.success) {
      setStep('success');
    } else {
      alert(result.error || "Ocorreu um erro ao processar seu agendamento.");
    }
  };

  const isDateDisabled = (date: Date | null) => {
    if (!date) return true;
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate <= today; // Bloqueia passadas e HOJE
  };

  const isSelectedDate = (date: Date | null) => {
    if (!date || !deliveryDate) return false;
    return date.toDateString() === deliveryDate.toDateString();
  };

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
      {/* Barra Superior */}
      <header className="sticky top-0 z-[110] bg-[#7c3aed] text-white py-4 px-6 flex justify-between items-center shadow-md">
        <button onClick={onClose} className="flex items-center gap-2 font-bold text-sm hover:opacity-80 transition-opacity">
          <ArrowLeft size={20} />
          Voltar
        </button>
        <div className="flex items-center gap-2 text-sm font-bold opacity-90">
          <ShieldCheck size={18} />
          Ambiente seguro
        </div>
      </header>

      {step === 'form' ? (
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Coluna Esquerda: Formulário */}
            <div className="flex-1 space-y-12">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-[#111827] mb-2 uppercase tracking-tight">REALIZAR AGENDAMENTO GRATUITO</h1>
                <p className="text-gray-500 font-medium">Escolha seu pacote e preencha seus dados para entrega.</p>
              </div>

              {/* Aviso Legal */}
              <div className="bg-[#fff7ed] border border-[#ffedd5] rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#f97316]"></div>
                <div className="flex gap-4">
                  <div className="p-2 h-fit bg-white rounded-lg shadow-sm border border-amber-100">
                    <ShieldCheck className="text-[#f97316]" size={20} />
                  </div>
                  <div className="text-sm leading-relaxed">
                    <p className="text-[#9a3412] font-black mb-2 uppercase">Atenção: Não cobramos nenhum valor antecipado, o pagamento é somente na entrega!</p>
                    <p className="text-[#9a3412] font-medium mb-2">Ao agendar, você assume compromisso legal a estar disponível para recebimento do produto na data informada.</p>
                    <p className="text-[#9a3412] text-xs font-bold opacity-80 uppercase">A ausência caracteriza inadimplemento contratual, conforme arts. 394, 395, 422 e 427 do Código Civil.</p>
                  </div>
                </div>
              </div>

              {/* Imagem de Destaque */}
              <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                <img 
                  src="https://otxafqxfpqiffltyjjii.supabase.co/storage/v1/object/public/videos%20sauna/Design%20sem%20nome.png" 
                  className="w-full object-cover" 
                  alt="Promoção Pagamento na Entrega" 
                />
              </div>

              {/* Seção: Escolha do Produto */}
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-[#7c3aed] flex items-center gap-3">
                    Escolha do produto
                  </h2>
                  <span className="bg-[#ecfdf5] text-[#059669] px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1">
                    <Truck size={12} /> Entrega rápida
                  </span>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {PACKAGES.map((pkg) => (
                    <div 
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`relative flex flex-col md:flex-row items-center justify-between p-6 rounded-2xl border-2 transition-all cursor-pointer group ${
                        selectedPackage?.id === pkg.id 
                        ? 'border-[#7c3aed] bg-[#f5f3ff] shadow-lg scale-[1.01]' 
                        : 'border-gray-100 hover:border-purple-200'
                      }`}
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-gray-100 rounded-xl flex flex-col items-center justify-center border border-gray-200 font-black">
                          <span className="text-xl leading-none">{pkg.pieces}</span>
                          <span className="text-[10px] uppercase opacity-60">peças</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                             <h3 className="font-black text-lg text-gray-900 uppercase">Pacote {pkg.name}</h3>
                             {pkg.pieces === 4 && <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[10px] font-black">Mais vendido</span>}
                             {pkg.pieces === 3 && <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-black">Melhor custo-benefício</span>}
                          </div>
                          <p className="text-xs text-gray-400 font-bold uppercase mt-1">Pagamento na entrega • Sem taxas ocultas • Frete Grátis</p>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-2xl font-black text-[#111827]">R${pkg.price.toFixed(2).replace('.', ',')}</div>
                          <div className="text-[10px] text-gray-400 font-bold uppercase">R${(pkg.price / pkg.pieces).toFixed(2).replace('.', ',')} / peça</div>
                        </div>
                        <button className={`px-6 py-3 rounded-xl font-black text-sm uppercase transition-all ${
                           selectedPackage?.id === pkg.id 
                           ? 'bg-black text-white' 
                           : 'bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                        }`}>
                          {selectedPackage?.id === pkg.id ? 'Selecionado' : 'Selecionar'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Seção: Tamanho */}
              <section className="space-y-6">
                <h2 className="text-xl font-black text-[#7c3aed] flex items-center gap-3">
                  <span className="bg-purple-100 p-2 rounded-lg"><Truck size={18} /></span>
                  Escolha o tamanho
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {SIZES.map((size) => (
                    <button
                      key={size.label}
                      type="button"
                      onClick={() => setSelectedSize(size.label)}
                      className={`p-6 rounded-2xl border-2 text-center transition-all ${
                        selectedSize === size.label 
                        ? 'border-[#7c3aed] bg-[#f5f3ff] shadow-md' 
                        : 'border-gray-100 hover:border-purple-200'
                      }`}
                    >
                      <div className="text-xl font-black text-gray-900 mb-1">{size.label}</div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-tight">Recomendado para {size.weight}</div>
                    </button>
                  ))}
                </div>
              </section>

              {/* Seção: Contato */}
              <section className="space-y-6">
                <h2 className="text-xl font-black text-[#7c3aed] uppercase tracking-tight">Dados para contato</h2>
                <div className="space-y-5">
                   <div>
                      <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">Nome completo *</label>
                      <input 
                        required
                        type="text"
                        placeholder="Seu nome completo"
                        className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-[#7c3aed] outline-none transition-all font-medium text-gray-800"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">
                          WhatsApp * <span className="text-red-500 font-bold lowercase text-[11px]">(Atualizações do pedido via WhatsApp)</span>
                        </label>
                        <input 
                          required
                          type="tel"
                          placeholder="11988888888 ou (11) 98888-8888"
                          className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-[#7c3aed] outline-none transition-all font-medium text-gray-800"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">Email (opcional)</label>
                        <input 
                          type="email"
                          placeholder="seu@email.com"
                          className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-[#7c3aed] outline-none transition-all font-medium text-gray-800"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                   </div>
                </div>
              </section>

              {/* Seção: Entrega (Calendário) */}
              <section className="space-y-6">
                <h2 className="text-xl font-black text-[#7c3aed] uppercase tracking-tight">Entrega</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-black text-gray-700 uppercase tracking-wide">
                    <CalendarIcon size={18} /> Dia para receber a entrega *
                  </div>
                  <p className="text-gray-400 text-xs font-bold uppercase">Escolha uma data futura (segunda a sábado).</p>
                  
                  {/* Calendário Customizado */}
                  <div className="w-full max-w-[450px] bg-white border-2 border-gray-100 rounded-[2.5rem] p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-8">
                       <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft size={20} /></button>
                       <span className="font-black text-gray-800 uppercase tracking-widest">
                         {currentMonth.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
                       </span>
                       <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronRight size={20} /></button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
                        <div key={d} className="text-center text-[10px] font-black text-gray-400 uppercase py-2">{d}</div>
                      ))}
                      {calendarDays.map((day, i) => {
                        const disabled = isDateDisabled(day);
                        const selected = isSelectedDate(day);
                        
                        return (
                          <div key={i} className="aspect-square flex items-center justify-center p-0.5">
                            {day ? (
                              <button
                                type="button"
                                disabled={disabled}
                                onClick={() => day && setDeliveryDate(day)}
                                className={`w-full h-full rounded-2xl flex items-center justify-center text-sm font-bold transition-all ${
                                  selected 
                                  ? 'bg-[#7c3aed] text-white shadow-lg scale-110 z-10' 
                                  : disabled 
                                    ? 'text-red-300 bg-red-50/30 cursor-not-allowed border border-red-100/30' 
                                    : 'text-gray-800 hover:bg-purple-100 hover:text-[#7c3aed]'
                                }`}
                              >
                                {day.getDate()}
                              </button>
                            ) : (
                              <div className="w-full h-full" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="pt-4 border-t border-gray-50 text-[9px] text-gray-400 font-bold uppercase text-center leading-relaxed">
                      Agendamentos: Segunda a Sábado, com pelo menos 1 dia de antecedência
                    </div>
                  </div>
                </div>
              </section>

              {/* Seção: Endereço */}
              <section className="space-y-6">
                <h2 className="text-xl font-black text-[#7c3aed] flex items-center gap-3">
                   <MapPin size={20} /> Endereço para entrega
                </h2>
                <div className="space-y-5">
                   <div>
                      <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">CEP</label>
                      <input 
                        required
                        type="text"
                        placeholder="00000-000"
                        className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-[#7c3aed] outline-none transition-all font-medium"
                        value={address.cep}
                        onChange={(e) => setAddress({...address, cep: e.target.value})}
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">Rua *</label>
                      <input 
                        required
                        type="text"
                        placeholder="Rua, Avenida..."
                        className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-[#7c3aed] outline-none transition-all font-medium"
                        value={address.street}
                        onChange={(e) => setAddress({...address, street: e.target.value})}
                      />
                   </div>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="md:col-span-1">
                        <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">Número *</label>
                        <input 
                          required
                          type="text"
                          placeholder="123"
                          className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-[#7c3aed] outline-none transition-all font-medium"
                          value={address.number}
                          onChange={(e) => setAddress({...address, number: e.target.value})}
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide text-xs">Complemento <span className="opacity-50">(opcional)</span></label>
                        <input 
                          type="text"
                          placeholder="Apto, Bloco..."
                          className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-[#7c3aed] outline-none transition-all font-medium"
                          value={address.complement}
                          onChange={(e) => setAddress({...address, complement: e.target.value})}
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">Bairro *</label>
                        <input 
                          required
                          type="text"
                          placeholder="Nome do bairro"
                          className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-[#7c3aed] outline-none transition-all font-medium"
                          value={address.neighborhood}
                          onChange={(e) => setAddress({...address, neighborhood: e.target.value})}
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">Cidade *</label>
                        <input 
                          required
                          type="text"
                          placeholder="Nome da cidade"
                          className="w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-[#7c3aed] outline-none transition-all font-medium"
                          value={address.city}
                          onChange={(e) => setAddress({...address, city: e.target.value})}
                        />
                      </div>
                   </div>
                </div>
              </section>

              {/* Seção: Observações */}
              <section className="space-y-6">
                <h2 className="text-xl font-black text-[#7c3aed] uppercase tracking-tight">Observações</h2>
                <div className="p-8 border-2 border-gray-100 rounded-3xl bg-white shadow-sm">
                   <textarea 
                    placeholder="Informações adicionais (opcional)"
                    rows={4}
                    className="w-full bg-transparent outline-none resize-none font-medium text-gray-700 placeholder:text-gray-300"
                    value={observations}
                    onChange={(e) => setObservations(e.target.value)}
                   />
                </div>
              </section>

              {/* Botão Final e Disclaimer */}
              <div className="space-y-6 pt-10">
                 <button 
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-6 bg-[#a78bfa] hover:bg-[#7c3aed] text-white font-black text-xl rounded-2xl shadow-[0_20px_40px_rgba(167,139,250,0.3)] transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 uppercase tracking-wider"
                 >
                   {loading ? 'Processando...' : 'Confirmar agendamento'}
                 </button>
                 <div className="bg-[#fffbeb] border border-[#fef3c7] rounded-xl p-4 text-center">
                    <p className="text-[#92400e] text-xs font-bold leading-relaxed">
                       Ao clicar em Confirmar Agendamento você assume compromisso legal de receber o produto na data informada.
                    </p>
                 </div>
              </div>

            </div>

            {/* Coluna Direita: Carrinho (Sticky) */}
            <div className="lg:w-[400px]">
               <div className="sticky top-28 bg-white border-2 border-gray-50 rounded-[2.5rem] p-8 shadow-2xl space-y-8">
                  <h3 className="text-[#7c3aed] text-2xl font-black uppercase tracking-tight">Seu carrinho</h3>
                  
                  <div className="space-y-6 pb-8 border-b border-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Produto</p>
                         <p className="font-black text-gray-900 leading-tight uppercase">
                           {selectedPackage ? `Pacote ${selectedPackage.name}` : 'Selecione um pacote'}
                         </p>
                         <p className="text-[11px] font-bold text-gray-500 mt-1">Tamanho: {selectedSize || 'Selecione'}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Valor</p>
                         <p className="font-black text-gray-900 text-lg">
                           {selectedPackage ? `R$${selectedPackage.price.toFixed(2).replace('.', ',')}` : '—'}
                         </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-center justify-between text-sm">
                       <div className="flex items-center gap-3 text-gray-500 font-bold">
                          <Truck size={18} className="text-[#059669]" />
                          Entrega
                       </div>
                       <div className="font-black text-gray-900 uppercase">Agendada</div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                       <div className="flex items-center gap-3 text-gray-500 font-bold">
                          <CreditCard size={18} className="text-[#7c3aed]" />
                          Pagamento
                       </div>
                       <div className="font-black text-gray-900 uppercase">Na entrega</div>
                    </div>
                  </div>

                  {deliveryDate && (
                    <div className="pt-6 border-t border-gray-50">
                       <div className="bg-purple-50 rounded-2xl p-4 flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#7c3aed] shadow-sm">
                             <CalendarIcon size={20} />
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Data Escolhida</p>
                             <p className="font-black text-purple-900">
                               {deliveryDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                             </p>
                          </div>
                       </div>
                    </div>
                  )}
               </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] flex items-center justify-center p-6">
          <div className="text-center max-w-lg space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto shadow-inner">
               <ShieldCheck size={64} />
            </div>
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Agendamento confirmado!</h2>
              <p className="text-gray-500 font-medium">Seu pedido foi processado com sucesso. Nossa equipe entrará em contato via WhatsApp para confirmar a entrega.</p>
            </div>
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 space-y-4">
               <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-bold uppercase tracking-wider">Cliente</span>
                  <span className="text-gray-900 font-black">{fullName}</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-bold uppercase tracking-wider">Data Entrega</span>
                  <span className="text-gray-900 font-black">{deliveryDate?.toLocaleDateString('pt-BR')}</span>
               </div>
               <div className="flex justify-between text-sm">
                  <span className="text-gray-400 font-bold uppercase tracking-wider">Total</span>
                  <span className="text-[#7c3aed] font-black text-xl">R${selectedPackage?.price.toFixed(2).replace('.', ',')}</span>
               </div>
            </div>
            <button
              onClick={onClose}
              className="bg-black text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:opacity-80 transition-all"
            >
              Concluir
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
