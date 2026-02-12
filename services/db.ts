
import { createClient } from "@supabase/supabase-js";
import { Order, OrderStatus } from "../types";

/**
 * Safely get environment variables to prevent "Cannot read properties of undefined" errors.
 * In some environments, import.meta.env might not be defined.
 */
const getEnvVar = (key: string): string => {
  try {
    // @ts-ignore - import.meta.env might be undefined in some runtimes
    return (import.meta.env && import.meta.env[key]) || "";
  } catch {
    return "";
  }
};

const supabaseUrl = getEnvVar("VITE_SUPABASE_URL");
const supabaseAnonKey = getEnvVar("VITE_SUPABASE_ANON_KEY");

// Persistent local storage key as fallback
const LOCAL_STORAGE_KEY = 'nexa_orders_backup';

/**
 * Supabase client instance.
 * We only initialize it if the required configuration is present.
 */
export const supabase = (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http'))
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper to get local data
const getLocalData = (): Order[] => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// Helper to save local data
const saveLocalData = (orders: Order[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error("Failed to save to localStorage", e);
  }
};

export const saveOrder = async (
  order: Order
): Promise<{ success: boolean; error?: string }> => {
  const payload = {
    ...order,
    status: order.status || OrderStatus.NEW,
    createdAt: order.createdAt || new Date().toISOString()
  };

  // Try Supabase first if available
  if (supabase) {
    try {
      const { error } = await supabase.from("orders").insert([payload]);
      if (!error) return { success: true };
      console.warn("Supabase insert failed, falling back to local storage:", error.message);
    } catch (err: any) {
      console.warn("Supabase connection failed, falling back to local storage.");
    }
  }

  // Local Storage Fallback (Always works offline/unconfigured)
  try {
    const orders = getLocalData();
    const newOrder = { ...payload, id: (payload as any).id || crypto.randomUUID() };
    orders.push(newOrder);
    saveLocalData(orders);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: "Falha ao salvar pedido localmente." };
  }
};

export const getOrders = async (): Promise<Order[]> => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) return data as Order[];
    } catch (err) {
      console.warn("Could not fetch from Supabase, using local data.");
    }
  }

  return getLocalData().sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

export const updateOrderStatus = async (
  id: string,
  status: OrderStatus,
  adminNotes?: string
): Promise<boolean> => {
  if (supabase) {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status, admin_notes: adminNotes })
        .eq("id", id);

      if (!error) return true;
    } catch (err) {
      console.warn("Could not update Supabase, updating locally.");
    }
  }

  const orders = getLocalData();
  const index = orders.findIndex(o => o.id === id);
  if (index !== -1) {
    orders[index].status = status;
    if (adminNotes !== undefined) orders[index].adminNotes = adminNotes;
    saveLocalData(orders);
    return true;
  }
  return false;
};

export const deleteOrder = async (id: string): Promise<boolean> => {
  if (supabase) {
    try {
      const { error } = await supabase.from("orders").delete().eq("id", id);
      if (!error) return true;
    } catch (err) {
      console.warn("Could not delete from Supabase, deleting locally.");
    }
  }

  const orders = getLocalData();
  const filtered = orders.filter(o => o.id !== id);
  saveLocalData(filtered);
  return true;
};
