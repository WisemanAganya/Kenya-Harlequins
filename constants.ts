import { NavItem, Player, Match, NewsItem, Product, MembershipTier } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Teams', path: '/teams' },
  { label: 'Fixtures', path: '/fixtures' },
  { label: 'Tickets', path: '/tickets' },
  { label: 'Membership', path: '/membership' },
  { label: 'Shop', path: '/shop' },
  { label: 'Contact', path: '/contact' },
];

export const PLAYERS: Player[] = [
  { id: 1, name: 'Wiseman Aganya', position: 'Centre', image: 'https://picsum.photos/400/500?random=1', role: 'Men\'s 7s Captain' },
  { id: 2, name: 'Jan Remke', position: 'Forward', image: 'https://picsum.photos/400/500?random=2', role: 'Women\'s Captain' },
  { id: 3, name: 'Patrice Agunda', position: 'Utility Back', image: 'https://picsum.photos/400/500?random=3', role: 'Head Coach / Legend' },
  { id: 4, name: 'Brian Waraba', position: 'Scrum Half', image: 'https://picsum.photos/400/500?random=4' },
  { id: 5, name: 'Elisha Koronya', position: 'Prop', image: 'https://picsum.photos/400/500?random=5' },
  { id: 6, name: 'Hillary Baraza', position: 'Lock', image: 'https://picsum.photos/400/500?random=6' },
];

export const MATCHES: Match[] = [
  { id: 1, homeTeam: 'Kenya Harlequins', awayTeam: 'KCB Rugby', date: '2025-06-12', time: '16:00', venue: 'RFUEA Ground', competition: 'Kenya Cup', status: 'upcoming' },
  { id: 2, homeTeam: 'Kabras Sugar', awayTeam: 'Kenya Harlequins', date: '2025-06-19', time: '15:00', venue: 'Kakamega Showground', competition: 'Kenya Cup', status: 'upcoming' },
  { id: 3, homeTeam: 'Kenya Harlequins', awayTeam: 'Impala Saracens', date: '2025-06-05', time: '16:00', venue: 'RFUEA Ground', competition: 'Ngong Road Derby', result: '24 - 18', status: 'completed' },
];

export const NEWS: NewsItem[] = [
  { id: 1, title: 'Quins Secure Victory in Ngong Road Derby', excerpt: 'A thrilling encounter at the RFUEA ground sees Harlequins edge out neighbors Impala.', date: 'Jun 06, 2025', image: 'https://picsum.photos/800/600?random=10', category: 'Match Report' },
  { id: 2, title: 'Youth Academy Recruitment Drive', excerpt: 'We are looking for the next generation of Quins stars. Trials open this weekend.', date: 'Jun 01, 2025', image: 'https://picsum.photos/800/600?random=11', category: 'Club News' },
  { id: 3, title: 'New Kit Partnership Announced', excerpt: 'Kenya Harlequins is proud to announce a new technical kit partnership for the 2025/26 season.', date: 'May 28, 2025', image: 'https://picsum.photos/800/600?random=12', category: 'Commercial' },
];

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Home Jersey 2025/26', price: 4500, image: 'https://picsum.photos/400/400?random=20', category: 'Kit' },
  { id: 2, name: 'Training Singlet', price: 2500, image: 'https://picsum.photos/400/400?random=21', category: 'Training' },
  { id: 3, name: 'Quins Hoodie', price: 5000, image: 'https://picsum.photos/400/400?random=22', category: 'Casual' },
  { id: 4, name: 'Snapback Cap', price: 1500, image: 'https://picsum.photos/400/400?random=23', category: 'Accessories' },
];

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    name: 'Full Social Member',
    price: 'KES 10,000',
    benefits: ['Voting rights at AGM', 'Access to member bar', 'Discounted match tickets', 'Club newsletter']
  },
  {
    name: 'Senior Playing Member',
    price: 'KES 15,000',
    benefits: ['Full playing rights', 'Training & Gym access', 'Physio support', 'Match kit provided', 'Voting rights'],
    recommended: true
  },
  {
    name: 'Junior Supporter',
    price: 'KES 2,500',
    benefits: ['Youth programs access', 'Match day experiences', 'Junior newsletter']
  }
];

export const SOCIAL_LINKS = [
  { label: 'YouTube', href: 'https://youtube.com', subtitle: 'Match highlights', icon: '🎥' },
  { label: 'TikTok', href: 'https://tiktok.com', subtitle: 'Behind the scenes', icon: '🎬' },
  { label: 'Facebook', href: 'https://facebook.com', subtitle: 'Community stories', icon: '📘' },
  { label: 'Instagram', href: 'https://instagram.com', subtitle: 'Matchday photos', icon: '📸' },
  { label: 'WhatsApp', href: 'https://wa.me/254700000000', subtitle: 'Club chat', icon: '💬' },
];

export const EVENT_LIST = [
  {
    id: 1,
    title: 'Kenya Cup Home Fixture',
    date: '2025-06-12',
    time: '16:00',
    venue: 'RFUEA Ground',
    competition: 'Kenya Cup',
    category: 'Match Day',
    description: 'Support Quins at the RFUEA Ground for a high intensity home fixture with premium ticket access and match day hospitality.',
    ticketTypes: [
      { name: 'Standard', description: 'General admission stand.', price: 800 },
      { name: 'VIP', description: 'Premium seating and hospitality.', price: 2500 },
      { name: 'Student', description: 'Discounted entry for students.', price: 400 },
    ]
  },
  {
    id: 2,
    title: 'Christie Sevens Inaugural Tournament',
    date: '2025-07-18',
    time: '10:00',
    venue: 'RFUEA Ground',
    competition: 'Christie Sevens',
    category: '7s Tournament',
    description: 'A celebration of sevens rugby with international sides, fan zones, and premium hospitality packages.',
    ticketTypes: [
      { name: 'Bronze Pass', description: 'Day access to tournament', price: 1200 },
      { name: 'Silver Pass', description: 'Includes merchandise voucher', price: 2200 },
      { name: 'Gold Hospitality', description: 'VIP lounge with catering.', price: 4500 },
    ]
  },
  {
    id: 3,
    title: 'Post Season Celebration Match',
    date: '2025-08-03',
    time: '14:00',
    venue: 'RFUEA Ground',
    competition: 'Exhibition',
    category: 'Post Season',
    description: 'A family-friendly post season match with live entertainment, food trucks, and special club experiences.',
    ticketTypes: [
      { name: 'Standard', description: 'General admission', price: 700 },
      { name: 'Family Bundle', description: '4 tickets at a special rate.', price: 2500 },
      { name: 'Hospitality', description: 'Premium seating and refreshments.', price: 3200 },
    ]
  }
];

export const FACILITIES = [
  { name: 'Main Pitch Hire', description: 'Hire the RFUEA ground for training or events.', price: 45000, unit: 'per day' },
  { name: 'Training Pitch', description: 'Reserved training area with floodlights.', price: 18000, unit: 'per session' },
  { name: 'Parking Zone', description: 'Secure match day parking for supporters and VIPs.', price: 800, unit: 'per car' },
  { name: 'Event Hall', description: 'Indoor venue for meetings, functions or corporate events.', price: 20000, unit: 'per day' },
];

export const HISTORY_CHAIRMEN = [
  { name: 'Peter Johnson', period: '1951 - 1960' },
  { name: 'Daniel Mwangi', period: '1961 - 1974' },
  { name: 'Samuel Ouma', period: '1975 - 1989' },
  { name: 'Victor Sudi', period: '2020 - Present' },
];

export const HISTORY_CAPTAINS = [
  { name: 'Wiseman Aganya', role: "Men's 7s Captain" },
  { name: 'Jan Remke', role: "Women's Captain" },
  { name: 'Patrice Agunda', role: 'Men’s XV Leader' },
  { name: 'Brian Waraba', role: 'Club Forward Captain' },
];

export const HONOURS = [
  { title: 'Kenya Cup', subtitle: 'Premier domestic crown', years: ['1995', '1996', '1999', '2003', '2008', '2010', '2011', '2012'] },
  { title: 'Enterprise Cup', subtitle: 'Historic tournament winners', years: ['1972', '1985', '2005', '2014'] },
  { title: 'Christie Sevens', subtitle: 'Sevens Festival champions', years: ['2024', '2025'] },
];