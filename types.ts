export interface NavItem {
  label: string;
  path: string;
}

export interface Player {
  id: number;
  name: string;
  position: string;
  image: string;
  category: 'men' | 'women' | 'sevens';
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
  category?: 'Regular' | 'VIP' | 'Tailgate' | 'Flash Sale';
  day?: 'Saturday' | 'Sunday' | 'Both';
  status?: 'Open' | 'Closed' | 'Sold Out';
  expires_at?: string;
  quantity_available?: number;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  competition: string;
  category: 'Tournament' | 'Regular Season' | 'Post Season' | 'Match Day';
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

export interface TicketInstance {
  id: number;
  order_id: number;
  ticket_type: string;
  full_name: string;
  status: 'valid' | 'checked_in' | 'cancelled';
  qr_hash: string;
  created_at: string;
  checked_in_at?: string;
  event_title: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  membership_status: 'active' | 'inactive' | 'pending';
  membership_tier?: string;
  avatar_url?: string;
  created_at: string;
}

export interface MembershipRecord {
  id: number;
  user_id: string;
  tier: string;
  status: 'active' | 'inactive';
  start_date: string;
  expiry_date: string;
  amount_paid: number;
}

export interface PaymentRecord {
  id: number;
  user_id: string;
  amount: number;
  payment_method: string;
  purpose: 'membership' | 'ticket' | 'shop' | 'donation';
  status: 'completed' | 'pending' | 'failed';
  reference: string;
  created_at: string;
}

export interface Communication {
  id: number;
  title: string;
  content: string;
  type: 'announcement' | 'memo' | 'agm_notice';
  priority: 'low' | 'medium' | 'high';
  file_url?: string;
  created_at: string;
  author: string;
}

export interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  program_url?: string;
  type: 'AGM' | 'Meeting' | 'Activity';
  status: 'upcoming' | 'past' | 'cancelled';
}

export interface Notification {
  id: number;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}