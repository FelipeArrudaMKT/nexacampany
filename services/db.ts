
// Mock implementation to ensure no "white screen" if envs are missing.
// In a real Vercel environment, these would be process.env.VITE_SUPABASE_URL and process.env.VITE_SUPABASE_ANON_KEY

import { Order, OrderStatus } from '../types';

// Simple LocalStorage persistence as fallback/mock for this demo environment
// to avoid crashes. In production, replace with @supabase/supabase-js
const DB_KEY = 'nexa_orders_db';

export const saveOrder = async (order: Order): Promise<{ success: boolean; error?: string }> => {
  try {
    const ordersStr = localStorage.getItem(DB_KEY);
    const orders: Order[] = ordersStr ? JSON.parse(ordersStr) : [];
    const newOrder = { ...order, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    orders.push(newOrder);
    localStorage.setItem(DB_KEY, JSON.stringify(orders));
    return { success: true };
  } catch (err) {
    console.error("Error saving order:", err);
    return { success: false, error: "Falha ao salvar pedido." };
  }
};

export const getOrders = async (): Promise<Order[]> => {
  const ordersStr = localStorage.getItem(DB_KEY);
  if (!ordersStr) return [];
  const orders: Order[] = JSON.parse(ordersStr);
  return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const updateOrderStatus = async (id: string, status: OrderStatus, adminNotes?: string): Promise<boolean> => {
  const orders = await getOrders();
  const index = orders.findIndex(o => o.id === id);
  if (index !== -1) {
    orders[index].status = status;
    if (adminNotes !== undefined) orders[index].adminNotes = adminNotes;
    localStorage.setItem(DB_KEY, JSON.stringify(orders));
    return true;
  }
  return false;
};

export const deleteOrder = async (id: string): Promise<boolean> => {
  const orders = await getOrders();
  const filtered = orders.filter(o => o.id !== id);
  localStorage.setItem(DB_KEY, JSON.stringify(filtered));
  return true;
};
