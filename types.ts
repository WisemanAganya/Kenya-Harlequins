export interface NavItem {
  label: string;
  path: string;
}

export interface Player {
  id: number;
  name: string;
  position: string;
  image: string;
  caps?: number;
  role?: string;
}

export interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  competition: string;
  result?: string;
  status: 'upcoming' | 'completed';
}

export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface TicketType {
  name: string;
  description: string;
  price: number;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  competition: string;
  category: string;
  description: string;
  ticket_types: TicketType[];
}

export interface Facility {
  name: string;
  description: string;
  price: number;
  unit: string;
}

export interface CartItem {
  id: string;
  type: 'product' | 'ticket' | 'membership' | 'booking';
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export interface BookingRequest {
  id?: number;
  name: string;
  email: string;
  phone: string;
  facility: string;
  event_date: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

export interface MembershipTier {
  name: string;
  price: string;
  benefits: string[];
  recommended?: boolean;
}

export interface Order {
  id: number;
  phone: string;
  payment_method: string;
  subtotal: number;
  items: CartItem[];
  status: 'pending' | 'completed' | 'cancelled';
  created_at: string;
}