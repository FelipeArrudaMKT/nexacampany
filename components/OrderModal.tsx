
import React, { useState } from 'react';
import { X, CheckCircle, ShieldAlert, Calendar } from 'lucide-react';
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
  const [formData, setFormData] = useState<Partial<Order>>({
    packageName: PACKAGES[0].name,
    packagePrice: PACKAGES[0].price,
    size: SIZES[0].label,
    status: OrderStatus.NEW,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await saveOrder(formData as Order);
    setLoading(false);
    if (result.success) {
      setStep('success');
    } else {
      alert(result.error);
    }
  };

  const handlePackageChange = (pkg: typeof PACKAGES[0]) => {
    setFormData({ ...formData, packageName: pkg.name, packagePrice: pkg.price });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {step === 'form' ? (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-1">Agendar Pedido</h2>
            <p className="text-gray-500 text-sm mb-6">Preencha os dados para agendar a entrega da sua encomenda</p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex gap-3 shadow-sm">
              <ShieldAlert className="text-amber-500 shrink-0" size={24} />
              <div>
                <p className="text-amber-800 text-sm font-bold">NÃO SOLICITAMOS dados sensíveis ou de pagamento</p>
                <p className="text-emerald-700 text-sm font-bold">Entrega rápida em até 24 horas</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Pacote */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold mb-4">
                  <span className="bg-gray-100 p-1 rounded">📦</span> Selecione seu Pacote
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PACKAGES.map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => handlePackageChange(pkg)}
                      className={`flex justify-between items-center p-4 rounded-xl border-2 transition-all ${
                        formData.packageName === pkg.name 
                        ? 'border-purple-600 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="font-bold text-gray-700">{pkg.name}</span>
                      <span className="font-black text-purple-700">R${pkg.price.toFixed(2).replace('.', ',')}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tamanho */}
              <div>
                <label className="text-sm font-bold mb-4 block">Selecione o Tamanho</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {SIZES.map((size) => (
                    <button
                      key={size.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, size: size.label })}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        formData.size === size.label 
                        ? 'border-purple-600 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-bold text-gray-800">{size.label}</div>
                      <div className="text-[10px] text-gray-500 uppercase mt-1">Recomendado para {size.weight}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Info Pessoal */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-bold">
                   <span className="bg-gray-100 p-1 rounded">👤</span> Informações Pessoais
                </label>
                <input
                  required
                  placeholder="Nome Completo *"
                  className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none"
                  value={formData.fullName || ''}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                />
                <div className="relative">
                  <input
                    required
                    placeholder="WhatsApp *"
                    className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none"
                    value={formData.whatsapp || ''}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  />
                  <span className="text-[10px] text-red-500 font-medium block mt-1">(Insira o número com atenção, as atualizações do pedido serão enviadas via WhatsApp)</span>
                </div>
                <input
                  type="email"
                  placeholder="Email (Opcional)"
                  className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              {/* Entrega */}
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-bold">
                   <span className="bg-gray-100 p-1 rounded">📍</span> Endereço para Entrega
                </label>
                <div className="relative">
                  <input
                    required
                    type="date"
                    className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none appearance-none"
                    value={formData.deliveryDate || ''}
                    onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                  />
                  <Calendar className="absolute right-4 top-4 text-gray-400 pointer-events-none" size={20} />
                  <span className="text-[10px] text-gray-500 font-medium block mt-1">Dia para receber a Entrega *</span>
                </div>
                
                <input
                  placeholder="CEP (Opcional)"
                  className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none"
                  value={formData.cep || ''}
                  onChange={(e) => setFormData({...formData, cep: e.target.value})}
                />
                
                <input
                  required
                  placeholder="Rua, Avenida... *"
                  className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none"
                  value={formData.street || ''}
                  onChange={(e) => setFormData({...formData, street: e.target.value})}
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    required
                    placeholder="Número *"
                    className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none"
                    value={formData.number || ''}
                    onChange={(e) => setFormData({...formData, number: e.target.value})}
                  />
                  <input
                    placeholder="Complemento (Opcional)"
                    className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none"
                    value={formData.complement || ''}
                    onChange={(e) => setFormData({...formData, complement: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    required
                    placeholder="Bairro *"
                    className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none"
                    value={formData.neighborhood || ''}
                    onChange={(e) => setFormData({...formData, neighborhood: e.target.value})}
                  />
                  <input
                    required
                    placeholder="Cidade *"
                    className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none"
                    value={formData.city || ''}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                  />
                </div>

                <textarea
                  placeholder="Observações (Opcional)"
                  rows={3}
                  className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-600 outline-none resize-none"
                  value={formData.observations || ''}
                  onChange={(e) => setFormData({...formData, observations: e.target.value})}
                ></textarea>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full py-4 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-black text-lg rounded-xl shadow-xl transition-all transform active:scale-95"
              >
                {loading ? 'Salvando...' : 'Confirmar Agendamento'}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-12 text-center">
            <CheckCircle className="text-emerald-500 mx-auto mb-6" size={80} />
            <h2 className="text-3xl font-black text-gray-900 mb-2">Agendamento Realizado!</h2>
            <p className="text-gray-600 mb-8 max-w-sm mx-auto">
              Seu pedido de agendamento foi recebido. Nossa equipe entrará em contato via WhatsApp para confirmar a entrega.
            </p>
            <button
              onClick={onClose}
              className="bg-purple-600 text-white px-10 py-3 rounded-xl font-bold shadow-lg hover:bg-purple-500 transition-all"
            >
              Entendido
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
