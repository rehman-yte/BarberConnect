
export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  avatar?: string;
}

export interface PortfolioItem {
  id: string;
  url: string;
  category: string;
}

export interface Barber {
  id: string;
  name: string;
  shopName: string;
  rating: number;
  reviewCount: number;
  image: string;
  address: string;
  distance: string;
  services: Service[];
  reviews: Review[];
  bio: string;
  isVIP: boolean;
  isVerified: boolean;
  portfolio: PortfolioItem[];
  tags: string[];
  priceRange: '$$' | '$$$' | '$$$$';
}

export interface Booking {
  id: string;
  barberId: string;
  barberName: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: number;
  specialRequests?: string;
  userId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export enum UserRole {
  Customer = 'customer',
  Professional = 'professional',
  Admin = 'admin'
}

export enum Page {
  Home = 'home',
  Discovery = 'discovery',
  BarberDetails = 'barber-details',
  Bookings = 'bookings',
  AIStyle = 'ai-style',
  Dashboard = 'dashboard',
  AdminPanel = 'admin-panel',
  Privacy = 'privacy',
  Terms = 'terms',
  About = 'about',
  Contact = 'contact',
  FAQ = 'faq',
  BecomePartner = 'become-partner',
  Wallet = 'wallet',
  Profile = 'profile',
  NotFound = 'not-found'
}
