
import { Barber } from './types';

export const MOCK_BARBERS: Barber[] = [
  {
    id: 'vip-1',
    name: 'Julian "The Blade" Rossi',
    shopName: 'Gentlemen\'s Quarters • Atelier',
    rating: 4.98,
    reviewCount: 420,
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=1200',
    address: 'Upper East Side, Manhattan, NY',
    distance: '0.4 miles',
    isVIP: true,
    isVerified: true,
    priceRange: '$$$$',
    tags: ['Master Barber', 'Traditional Shave', 'VIP Only'],
    bio: 'Julian Rossi is a generational master barber whose clients include CEOs, athletes, and world leaders. His Atelier provides a sanctuary of precision and luxury, where grooming is elevated to a high art form.',
    portfolio: [
      { id: 'p1', url: 'https://images.unsplash.com/photo-1532710093739-9470acff878f?auto=format&fit=crop&q=80&w=400', category: 'Cut' },
      { id: 'p2', url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=400', category: 'Shave' },
      { id: 'p3', url: 'https://images.unsplash.com/photo-1503910321337-32992a51f423?auto=format&fit=crop&q=80&w=400', category: 'Style' }
    ],
    services: [
      { id: 's1', name: 'The Signature Bespoke Cut', description: 'Comprehensive consultation, custom cut, and hot towel aromatherapy finish.', price: 125, duration: 60 },
      { id: 's2', name: 'Royal Straight Razor Shave', description: 'Traditional multi-step shave with premium oils and cold press closure.', price: 95, duration: 45 },
      { id: 's3', name: 'The Director\'s Package', description: 'Full grooming suite including cut, beard sculpting, and mini-facial.', price: 250, duration: 120 }
    ],
    reviews: [
      { id: 'r1', userName: 'Alexander V.', rating: 5, comment: 'Unequivocal perfection. The attention to detail is something I haven\'t seen since Savile Row.', date: 'Oct 2024' }
    ]
  },
  {
    id: 'vip-2',
    name: 'Sarah "The Sharp" Kim',
    shopName: 'Diamond Edge Parlour',
    rating: 5.0,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=1200',
    address: 'SoHo, Manhattan, NY',
    distance: '1.2 miles',
    isVIP: true,
    isVerified: true,
    priceRange: '$$$$',
    tags: ['Skin Fade Expert', 'Celebrity Stylist'],
    bio: 'Specializing in ultra-modern skin fades and creative color. Sarah brings a contemporary, high-fashion edge to precision grooming.',
    portfolio: [],
    services: [
      { id: 's9', name: 'Modern Architecture Fade', description: 'Precision fading with architectural symmetry.', price: 95, duration: 45 }
    ],
    reviews: []
  },
  {
    id: '3',
    name: 'Elias Thorne',
    shopName: 'Heritage Barbering Co.',
    rating: 4.8,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1521446704128-ac36184af5ee?auto=format&fit=crop&q=80&w=1200',
    address: 'Gramercy Park, NY',
    distance: '2.1 miles',
    isVIP: false,
    isVerified: true,
    priceRange: '$$$',
    tags: ['Classic', 'Beard Specialist'],
    bio: 'Preserving the heritage of the traditional barbershop experience.',
    portfolio: [],
    services: [
      { id: 's10', name: 'Classic Gentlemen\'s Cut', description: 'Timeless scissor work.', price: 75, duration: 45 }
    ],
    reviews: []
  }
];
