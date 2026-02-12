import { createClient } from "@supabase/supabase-js";
import { Order, OrderStatus } from "../types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const saveOrder = async (
  order: Order
): Promise<{ success: boolean; error?: string }> => {
  try {
    const payload = {
      ...order,
      status: (order as any).status ?? "novo",
    };

    const { error } = await supabase.from("orders").insert([payload]);
    if (error) throw error;

    return { success: true };
  } catch (err: any) {
    console.error("Supabase saveOrder error:", err);
    return { success: false, error: err?.message ?? "Falha ao salvar pedido." };
  }
};

export const getOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase getOrders error:", error);
    return [];
  }

  return (data ?? []) as Order[];
};

export const updateOrderStatus = async (
  id: string,
  status: OrderStatus,
  adminNotes?: string
): Promise<boolean> => {
  const { error } = await supabase
    .from("orders")
    .update({ status, admin_notes: adminNotes })
    .eq("id", id);

  if (error) {
    console.error("Supabase updateOrderStatus error:", error);
    return false;
  }

  return true;
};

export const deleteOrder = async (id: string): Promise<boolean> => {
  const { error } = await supabase.from("orders").delete().eq("id", id);

  if (error) {
    console.error("Supabase deleteOrder error:", error);
    return false;
  }

  return true;
};
