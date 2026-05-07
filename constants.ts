import { NavItem, Player, Match, NewsItem, Product, MembershipTier } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Teams', path: '/teams' },
  { label: 'Christie 7s', path: '/christie-7s' },
  { label: 'Fixtures', path: '/fixtures' },
  { label: 'Tickets', path: '/tickets' },
  { label: 'Membership', path: '/membership' },
  { label: 'Shop', path: '/shop' },
  { label: 'Contact', path: '/contact' },
];

export const PLAYERS: Player[] = [
  // Men's XV Squad
  { id: 1, name: 'Nathaniel Mwangi', position: 'Loosehead Prop', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 2, name: 'Jaika Adams', position: 'Loosehead Prop', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 3, name: 'George Otieno', position: 'Hooker', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 4, name: 'Jeffrey Kiragu', position: 'Hooker', image: '/assets/kh/Team.PNG', category: 'men', role: 'Captain' },
  { id: 5, name: 'Winston Odhiambo', position: 'Tighthead Prop', image: '/assets/kh/Team.PNG', category: 'men', role: 'Vice-Captain' },
  { id: 6, name: 'Andrew Ogallo', position: 'Tighthead Prop', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 7, name: 'Alex Otieno', position: 'Lock', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 8, name: 'Paul Matani', position: 'Lock', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 9, name: 'Bradley Odero', position: 'Lock', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 10, name: 'Tim Wesoloh', position: 'Lock', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 11, name: 'Edward Shitanda', position: 'Blindside Flanker', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 12, name: 'Victor Gichana', position: 'Blindside Flanker', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 13, name: 'Albert Alela', position: 'Openside Flanker', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 14, name: 'Willy Tino', position: 'Openside Flanker', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 15, name: 'Wycliff Ratemo', position: 'Number Eight', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 16, name: 'Newton Partet', position: 'Number Eight', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 17, name: 'Derrick Shimenga', position: 'Scrum-half', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 18, name: 'Shakur Nyongesa', position: 'Scrum-half', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 19, name: 'Farhan Juma', position: 'Fly-half', image: '/assets/kh/Team.PNG', category: 'men', role: 'Captain' },
  { id: 20, name: 'Simon Ochieng', position: 'Fly-half', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 21, name: 'Mathew Ouma', position: 'Left Wing', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 22, name: 'Joshua Okello', position: 'Left Wing', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 23, name: 'Douglas Kahuri', position: 'Inside Centre', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 24, name: 'Franklin Mukaisi', position: 'Inside Centre', image: '/assets/kh/Team.PNG', category: 'men', role: 'Vice-Captain' },
  { id: 25, name: 'David Mwangi', position: 'Outside Centre', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 26, name: 'John Okwatch', position: 'Outside Centre', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 27, name: 'Ramadhan Masete', position: 'Right Wing', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 28, name: 'Cornelios Ambaka', position: 'Right Wing', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 29, name: 'Collins Bett', position: 'Fullback', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 30, name: 'Felix Ochieng', position: 'Fullback', image: '/assets/kh/Team.PNG', category: 'men' },
  
  // New Additions - Men's XV
  { id: 31, name: 'Hillary Ashivila', position: 'Backrow', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 32, name: 'Patrick Wainaina', position: 'Scrum-half', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 33, name: 'Michael Ochieng Jnr', position: 'Wing', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 34, name: 'Jeff Ngugi', position: 'Forward', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 35, name: 'Eriya Lubanga', position: 'Forward', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 36, name: 'Denzel Odando', position: 'Forward', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 37, name: 'Roogers Odundo', position: 'Backrow', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 38, name: 'Isaac Omondi', position: 'Backrow', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 39, name: 'William Wagala', position: 'Wing', image: '/assets/kh/Team.PNG', category: 'men' },
  { id: 40, name: 'Mike Ochieng Snr', position: 'Fly-half', image: '/assets/kh/Team.PNG', category: 'men' },
  
  // Women's Team
  { id: 101, name: 'Nelly Munavi', position: 'Loosehead Prop', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 102, name: 'Naomi Muhanji', position: 'Loosehead Prop', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 103, name: 'Felistus Amunga', position: 'Loosehead Prop', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 104, name: 'Nura Annisa', position: 'Hooker', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 105, name: 'Maria Gorreti', position: 'Hooker', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 106, name: 'Melody Kamau', position: 'Tighthead Prop', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 107, name: 'Sharon Bosibori', position: 'Tighthead Prop', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 108, name: 'Pamela Muriuki', position: 'Tighthead Prop', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 109, name: 'Miriam Sanau', position: 'Tighthead Prop', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 110, name: 'Tracy Khan', position: 'Lock', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 111, name: 'Sandra Oduor', position: 'Lock', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 112, name: 'Janet Oyare', position: 'Lock', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 113, name: 'Gloria Kifano', position: 'Lock', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 114, name: 'Lucy Atieno', position: 'Lock', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 115, name: 'Monica Nguono Atieno', position: 'Lock', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 116, name: 'Belvin Khavere', position: 'Blindside Flanker', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 117, name: 'Mercy Kemunto', position: 'Blindside Flanker', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 118, name: 'Phoebe Akinyi', position: 'Blindside Flanker', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 119, name: 'Zain Mohammed', position: 'Openside Flanker', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 120, name: 'Dorris Kimani', position: 'Number Eight', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 121, name: 'Hellen Wanjiru', position: 'Number Eight', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 122, name: 'Zuhura Asman', position: 'Scrum-half', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 123, name: 'Mariam Edna', position: 'Scrum-half', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 124, name: 'Lavencer Owaga Vallary', position: 'Scrum-half', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 125, name: 'Mary Muthoni', position: 'Scrum-half', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 126, name: 'Milkah Chitechi', position: 'Fly-half', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 127, name: 'Loving Mijere', position: 'Fly-half', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 128, name: 'Sheril Owaga', position: 'Fly-half', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 129, name: 'Sharllyne Atieno', position: 'Fly-half', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 130, name: 'Sharllyne Ingaso', position: 'Fly-half', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 131, name: 'Deleon Indombo', position: 'Left Wing', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 132, name: 'Friza Asiko', position: 'Left Wing', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 133, name: 'Belinda Oriaso', position: 'Left Wing', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 134, name: 'Yvette Oketch', position: 'Left Wing', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 135, name: 'Angel Salamba', position: 'Inside Centre', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 136, name: 'Maureen Muritu', position: 'Outside Centre', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 137, name: 'Cynthia Mwai', position: 'Right Wing', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 138, name: 'Refa Ochando', position: 'Right Wing', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 139, name: 'Maxine Abuga', position: 'Right Wing', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 140, name: 'Catherine Elizabeth', position: 'Right Wing', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 141, name: 'Getrude Ambeyi', position: 'Fullback', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 142, name: 'Sophie Nabwire', position: 'Squad Member', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 143, name: 'Joy Makena', position: 'Squad Member', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 144, name: 'Dorothy Mulela', position: 'Squad Member', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 145, name: 'Cynthia Nekesa', position: 'Squad Member', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 146, name: 'Joy Loreah Apondi', position: 'Squad Member', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 147, name: 'Faith Adhiambo', position: 'Squad Member', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 148, name: 'Rose Waithera', position: 'Squad Member', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 149, name: 'Joyce Kamau', position: 'Squad Member', image: '/assets/kh/Team.PNG', category: 'women' },
  { id: 150, name: 'Diana Nyambura', position: 'Squad Member', image: '/assets/kh/Team.PNG', category: 'women' },
  
  // Sevens Provisional Squad
  { id: 301, name: 'Mario Abungu', position: 'Forward', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 302, name: 'Albert Alela', position: 'Forward', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 303, name: 'Vincent Omondi', position: 'Forward', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 304, name: 'Patrick Wainaina', position: 'Scrum-half', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 305, name: 'Faran Juma', position: 'Fly-half', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 306, name: 'Ramadhan Masetti', position: 'Wing', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 307, name: 'Alvin Mutachi', position: 'Back', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 308, name: 'Dave MWANGI', position: 'Centre', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 309, name: 'Brighton Omondi', position: 'Forward', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 310, name: 'Collins Bett', position: 'Fullback', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 311, name: 'Victor GICHANA', position: 'Forward', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 312, name: 'Matthew Ouma', position: 'Wing', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 313, name: 'Derrick SHIMENGA', position: 'Scrum-half', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 314, name: 'Lawrence Ndu\'ngu', position: 'Forward', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 315, name: 'Mukaisi Frankh', position: 'Centre', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 316, name: 'Smith Ouma', position: 'Back', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 317, name: 'Simon ochieng', position: 'Fly-half', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 318, name: 'Micheal Ochieng', position: 'Wing', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 319, name: 'Marcus Garvey', position: 'Forward', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 320, name: 'willy Tino', position: 'Forward', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 321, name: 'Jeremy Kibe', position: 'Back', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 322, name: 'Brighton Opiyo', position: 'Back', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 323, name: 'Owen', position: 'Forward', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 324, name: 'Kahuri', position: 'Centre', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 325, name: 'Jan Remke', position: 'Back', image: '/assets/kh/Team.PNG', category: 'sevens' },
  { id: 326, name: 'Academy boys', position: 'Development', image: '/assets/kh/Team.PNG', category: 'sevens' },
];

export const TECHNICAL_BENCH = [
  { name: 'Patrice Agunda', role: 'Head Coach/ 15s Coach', image: '/assets/kh/Tech/Patrice Agunda.PNG' },
  { name: 'Simon Odongo', role: 'Deputy Head Coach / Head of 7s/ 15s defense coach', image: '/assets/kh/Tech/Simon Odongo.PNG' },
  { name: 'Sheila Chajira', role: 'Women’s Team Coach', image: '/assets/kh/Tech/Sheila Chajira.PNG' },
  { name: 'Eden Agero', role: 'Assistant Coach Skills and Attack', image: '/assets/kh/Tech/Eden Agero.PNG' },
  { name: 'Brian Onyiego', role: 'Assistant Coach, Development & Women', image: '/assets/kh/Tech/Brian onyiego.PNG' },
  { name: 'Willy Ambaka', role: 'Head of Department Strength & Conditioning', image: '/assets/kh/Tech/willy ambaka.PNG' },
  { name: 'Edward Shitanda', role: 'Strength & Conditioning coach', image: '/assets/kh/Tech/Edward shitanda.PNG' },
  { name: 'Gerald Omondi', role: 'Head of Department, Physiotherapy', image: '/assets/kh/Tech/Gerald Omondi.PNG' },
  { name: 'Kennedy Barua', role: 'Physiotherapist', image: '/assets/kh/Tech/ken barua.PNG' },
  { name: 'Wayne Mungei', role: 'General Team Manager', image: '/assets/kh/Tech/Wayne.jpg' },
];

export const EXECUTIVE_COMMITTEE = [
  { name: 'Victor Sudi', role: 'Chairman', image: '/assets/kh/exco/Victor Sudi.jpeg' },
  { name: 'Terrence Adembesa', role: 'Vice Chairman', image: '/assets/kh/exco/Terrence Adembesa.PNG' },
  { name: 'Nekesa Were', role: 'Hon Secretary', image: '/assets/kh/exco/Nekesa Were.jpg' },
  { name: 'Peris Mukoko', role: 'Hon Treasurer', image: '/assets/kh/exco/Peris Mukoko.PNG' },
  { name: 'Dennis Begisen', role: 'Grounds Director', image: '/assets/kh/exco/Dennis Begisen.jpg' },
  { name: 'Joel Ng’ang’a', role: 'Director of Rugby', image: "/assets/kh/exco/Joel Ng'anga.jpg" },
];

export const MATCHES: Match[] = [
  { id: 1, homeTeam: 'Kenya Harlequins', awayTeam: 'KCB Rugby', date: '2025-06-12', time: '16:00', venue: 'RFUEA Ground', competition: 'Kenya Cup', status: 'upcoming' },
  { id: 2, homeTeam: 'Kabras Sugar', awayTeam: 'Kenya Harlequins', date: '2025-06-19', time: '15:00', venue: 'Kakamega Showground', competition: 'Kenya Cup', status: 'upcoming' },
  { id: 3, homeTeam: 'Kenya Harlequins', awayTeam: 'Impala Saracens', date: '2025-06-05', time: '16:00', venue: 'RFUEA Ground', competition: 'Ngong Road Derby', result: '24 - 18', status: 'completed' },
];

export const NEWS: NewsItem[] = [
  { id: 1, title: 'Quins Secure Victory in Ngong Road Derby', excerpt: 'A thrilling encounter at the RFUEA ground sees Harlequins edge out neighbors Impala.', date: 'Jun 06, 2025', image: '/assets/kh/Latest news/Match report.jpg', category: 'Match Report' },
  { id: 2, title: 'Youth Academy Recruitment Drive', excerpt: 'We are looking for the next generation of Quins stars. Trials open this weekend.', date: 'Jun 01, 2025', image: '/assets/kh/Latest news/club news.PNG', category: 'Club News' },
  { id: 3, title: 'New Kit Partnership Announced', excerpt: 'Kenya Harlequins is proud to announce a new technical kit partnership for the 2025/26 season.', date: 'May 28, 2025', image: '/assets/kh/Latest news/Commercial.PNG', category: 'Commercial' },
];

export const PRODUCTS: Product[] = [
  // Playing Kit
  { id: 1, name: 'Official Match Jersey', price: 4500, image: '/assets/kh/Merch/Playing Jersey.PNG', category: 'Playing Kit' },
  { id: 2, name: 'Playing Shorts', price: 2000, image: '/assets/kh/Merch/Playing Shorts.PNG', category: 'Playing Kit' },
  { id: 3, name: 'Team Socks', price: 800, image: '/assets/kh/Merch/Team Socks.PNG', category: 'Playing Kit' },
  { id: 4, name: 'Rugby Boots (Cleats)', price: 8500, image: '/assets/kh/Merch/Rugby Boots (Cleats).PNG', category: 'Playing Kit' },
  { id: 5, name: 'Professional Mouthguard', price: 1200, image: '/assets/kh/Merch/Professional Mouthguard.PNG', category: 'Playing Kit' },
  { id: 6, name: 'Soft Scrum Cap', price: 3500, image: '/assets/kh/Merch/Soft Scrum Cap.PNG', category: 'Playing Kit' },
  
  // Training Gear
  { id: 7, name: 'Training Shirt / Bib', price: 2500, image: '/assets/kh/Merch/Training Shirt  Bib.PNG', category: 'Training Gear' },
  { id: 8, name: 'Performance Gym Shorts', price: 1800, image: '/assets/kh/Merch/Performance Gym Shorts.PNG', category: 'Training Gear' },
  { id: 9, name: 'Conditioning Running Shoes', price: 7500, image: '/assets/kh/Merch/Warm Up Singlet.PNG', category: 'Training Gear' },
  { id: 10, name: 'Club Tracksuit (Warm-up)', price: 6500, image: '/assets/kh/Merch/Club Tracksuit (Warm-up).PNG', category: 'Training Gear' },
  
  // Team Equipment
  { id: 11, name: 'Captain\'s Armband', price: 500, image: '/assets/kh/Merch/Captain\'s Armband.PNG', category: 'Equipment' },
  { id: 12, name: 'Professional Kicking Tee', price: 1500, image: '/assets/kh/Merch/Professional Kicking Tee.PNG', category: 'Equipment' },
  { id: 13, name: 'Substitution Bibs (Set)', price: 2400, image: '/assets/kh/Merch/Substitution Bibs (Set).PNG', category: 'Equipment' },
  { id: 14, name: 'Referee Whistle', price: 400, image: '/assets/kh/Merch/Referee Whistle.PNG', category: 'Equipment' },
  { id: 15, name: 'Player Kit Bag', price: 3500, image: '/assets/kh/Merch/Player kit bag.PNG', category: 'Equipment' },
  { id: 16, name: 'Rugby Shoulder Pads', price: 4500, image: '/assets/kh/Merch/Rugby Shoulder Pads.PNG', category: 'Equipment' },
  { id: 17, name: 'Strapping Tape (Roll)', price: 600, image: '/assets/kh/Merch/Strapping Tape (Roll).PNG', category: 'Equipment' },
  { id: 18, name: 'Compression Base Layer', price: 2500, image: '/assets/kh/Merch/Compression Base Layer.PNG', category: 'Equipment' },
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
    title: 'Christie Sevens 2025 - 60th Edition',
    date: '2025-07-18',
    time: '08:00',
    venue: 'RFUEA Ground',
    competition: 'Christie Sevens',
    category: '7s Tournament',
    ticketTypes: [
      { name: 'Regular Pass', description: 'Early Bird: 450 | Advance: 650 | Gate: 800', price: 450 },
      { name: 'VIP Pass', description: 'Early Bird: 2500 | Advance: 3000 | Gate: 4000', price: 2500 },
      { name: 'Tailgate Pass', description: 'Solo: 5000 | Squad of 3: 14250 | Squad of 5: 22500', price: 5000 },
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

export const PARTNERS = [
  { name: 'Rohto Mentholatum', url: 'https://www.rohto.co.ke/', logo: 'https://logo.clearbit.com/rohto.co.ke' },
  { name: 'Crown Paints', url: 'https://www.crownpaints.co.ke/', logo: 'https://logo.clearbit.com/crownpaints.co.ke' },
  { name: 'Sportpesa', url: 'https://www.ke.sportpesa.com/', logo: 'https://logo.clearbit.com/sportpesa.com' },
  { name: 'Eveready EA', url: 'https://sameer-group.co.ke/energy-power/eveready-ea-plc/', logo: 'https://logo.clearbit.com/sameer-group.co.ke' },
];