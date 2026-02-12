
import React, { useState, useEffect } from 'react';
import { LogOut, Search, Filter, Download, MessageSquare, Edit, Trash2, Eye } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { getOrders, updateOrderStatus, deleteOrder } from '../services/db';

export const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      o.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.whatsapp.includes(searchTerm) ||
      o.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: string, newStatus: OrderStatus) => {
    await updateOrderStatus(id, newStatus);
    fetchOrders();
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este pedido?')) {
      await deleteOrder(id);
      fetchOrders();
      setSelectedOrder(null);
    }
  };

  const copyToWhatsApp = (order: Order) => {
    const text = `*Pedido Nexa Regata*%0A%0A` +
      `*Cliente:* ${order.fullName}%0A` +
      `*WhatsApp:* ${order.whatsapp}%0A` +
      `*Pacote:* ${order.packageName}%0A` +
      `*Tamanho:* ${order.size}%0A` +
      `*Entrega:* ${order.deliveryDate}%0A` +
      `*Endereço:* ${order.street}, ${order.number} - ${order.city}`;
    window.open(`https://wa.me/55${order.whatsapp.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  const exportCSV = () => {
    const headers = ['Data', 'Nome', 'WhatsApp', 'Pacote', 'Tamanho', 'Cidade', 'Status'];
    const rows = filteredOrders.map(o => [
      new Date(o.createdAt).toLocaleDateString(),
      o.fullName,
      o.whatsapp,
      o.packageName,
      o.size,
      o.city,
      o.status
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + 
      headers.join(",") + "\n" + 
      rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "pedidos_nexa.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center text-white font-black text-sm">N</div>
          <span className="font-black text-gray-900 tracking-tight">NEXA ADMIN</span>
        </div>
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors text-sm font-bold"
        >
          <LogOut size={18} />
          Sair
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar / Filters */}
        <aside className="w-64 bg-white border-r border-gray-200 p-6 overflow-y-auto hidden lg:block">
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Filtros</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">Busca</label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                <input 
                  placeholder="Nome, zap..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">Status</label>
              <select 
                className="w-full p-2 text-sm border border-gray-200 rounded-lg outline-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Todos</option>
                {Object.values(OrderStatus).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={exportCSV}
              className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors"
            >
              <Download size={16} />
              Exportar CSV
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6 flex justify-between items-center">
             <h1 className="text-2xl font-black text-gray-900">Listagem de Pedidos</h1>
             <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">
               {filteredOrders.length} Pedidos
             </span>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">Data/Hora</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">WhatsApp</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">Pacote/Tam</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">Cidade</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-wider text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-xs text-gray-500">{new Date(order.createdAt).toLocaleString('pt-BR')}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{order.fullName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.whatsapp}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="block font-medium">{order.packageName}</span>
                      <span className="text-[10px] text-gray-400 uppercase">Tam: {order.size}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.city}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${
                        order.status === OrderStatus.NEW ? 'bg-blue-100 text-blue-700' :
                        order.status === OrderStatus.COMPLETED ? 'bg-emerald-100 text-emerald-700' :
                        order.status === OrderStatus.CANCELLED ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                         <button 
                           onClick={() => setSelectedOrder(order)}
                           className="p-1.5 text-gray-400 hover:text-purple-600 transition-colors"
                         >
                           <Eye size={18} />
                         </button>
                         <button 
                           onClick={() => copyToWhatsApp(order)}
                           className="p-1.5 text-gray-400 hover:text-emerald-600 transition-colors"
                         >
                           <MessageSquare size={18} />
                         </button>
                         <button 
                           onClick={() => handleDelete(order.id!)}
                           className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                         >
                           <Trash2 size={18} />
                         </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedOrder(null)}></div>
          <div className="relative bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
             <div className="bg-purple-600 p-6 text-white flex justify-between items-center">
                <h2 className="text-xl font-black">Detalhes do Pedido</h2>
                <button onClick={() => setSelectedOrder(null)}><LogOut size={20} className="rotate-180" /></button>
             </div>
             <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4 text-sm">
                   <div>
                      <p className="text-[10px] text-gray-400 uppercase font-black">Cliente</p>
                      <p className="font-bold">{selectedOrder.fullName}</p>
                   </div>
                   <div>
                      <p className="text-[10px] text-gray-400 uppercase font-black">WhatsApp</p>
                      <p className="font-bold">{selectedOrder.whatsapp}</p>
                   </div>
                   <div>
                      <p className="text-[10px] text-gray-400 uppercase font-black">Pacote</p>
                      <p className="font-bold">{selectedOrder.packageName}</p>
                   </div>
                   <div>
                      <p className="text-[10px] text-gray-400 uppercase font-black">Tamanho</p>
                      <p className="font-bold">{selectedOrder.size}</p>
                   </div>
                   <div className="col-span-2">
                      <p className="text-[10px] text-gray-400 uppercase font-black">Endereço</p>
                      <p className="font-bold leading-tight">
                        {selectedOrder.street}, {selectedOrder.number} {selectedOrder.complement}<br/>
                        {selectedOrder.neighborhood}, {selectedOrder.city} - CEP: {selectedOrder.cep}
                      </p>
                   </div>
                   <div className="col-span-2">
                      <p className="text-[10px] text-gray-400 uppercase font-black">Observações Cliente</p>
                      <p className="italic text-gray-600">{selectedOrder.observations || 'Nenhuma'}</p>
                   </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <label className="block text-xs font-black text-gray-400 uppercase mb-2">Alterar Status</label>
                  <select 
                    className="w-full p-3 border border-gray-200 rounded-xl outline-none"
                    value={selectedOrder.status}
                    onChange={(e) => handleStatusChange(selectedOrder.id!, e.target.value as OrderStatus)}
                  >
                    {Object.values(OrderStatus).map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
