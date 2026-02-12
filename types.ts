
export enum OrderStatus {
  NEW = 'Novo',
  CONTACTED = 'Em contato',
  SCHEDULED = 'Agendado',
  SHIPPED = 'Enviado',
  COMPLETED = 'Concluído',
  CANCELLED = 'Cancelado'
}

export interface Order {
  id?: string;
  createdAt: string;
  packageName: string;
  packagePrice: number;
  size: string;
  fullName: string;
  whatsapp: string;
  email?: string;
  deliveryDate: string;
  cep?: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  observations?: string;
  adminNotes?: string;
  status: OrderStatus;
}

export interface Package {
  id: string;
  name: string;
  pieces: number;
  price: number;
}
