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
  // Men's XV Squad
  { id: 1, name: 'Nathaniel Mwangi', position: 'Loosehead Prop', image: 'https://picsum.photos/400/500?random=1', category: 'men' },
  { id: 2, name: 'Jaika Adams', position: 'Loosehead Prop', image: 'https://picsum.photos/400/500?random=2', category: 'men' },
  { id: 3, name: 'George Otieno', position: 'Hooker', image: 'https://picsum.photos/400/500?random=3', category: 'men' },
  { id: 4, name: 'Jeffrey Kiragu', position: 'Hooker', image: 'https://picsum.photos/400/500?random=4', category: 'men', role: 'Captain' },
  { id: 5, name: 'Winston Odhiambo', position: 'Tighthead Prop', image: 'https://picsum.photos/400/500?random=5', category: 'men', role: 'Vice-Captain' },
  { id: 6, name: 'Andrew Ogallo', position: 'Tighthead Prop', image: 'https://picsum.photos/400/500?random=6', category: 'men' },
  { id: 7, name: 'Alex Otieno', position: 'Lock', image: 'https://picsum.photos/400/500?random=7', category: 'men' },
  { id: 8, name: 'Paul Matani', position: 'Lock', image: 'https://picsum.photos/400/500?random=8', category: 'men' },
  { id: 9, name: 'Bradley Odero', position: 'Lock', image: 'https://picsum.photos/400/500?random=9', category: 'men' },
  { id: 10, name: 'Tim Wesoloh', position: 'Lock', image: 'https://picsum.photos/400/500?random=10', category: 'men' },
  { id: 11, name: 'Edward Shitanda', position: 'Blindside Flanker', image: 'https://picsum.photos/400/500?random=11', category: 'men' },
  { id: 12, name: 'Victor Gichana', position: 'Blindside Flanker', image: 'https://picsum.photos/400/500?random=12', category: 'men' },
  { id: 13, name: 'Albert Alela', position: 'Openside Flanker', image: 'https://picsum.photos/400/500?random=13', category: 'men' },
  { id: 14, name: 'Willy Tino', position: 'Openside Flanker', image: 'https://picsum.photos/400/500?random=14', category: 'men' },
  { id: 15, name: 'Wycliff Ratemo', position: 'Number Eight', image: 'https://picsum.photos/400/500?random=15', category: 'men' },
  { id: 16, name: 'Newton Partet', position: 'Number Eight', image: 'https://picsum.photos/400/500?random=16', category: 'men' },
  { id: 17, name: 'Derrick Shimenga', position: 'Scrum-half', image: 'https://picsum.photos/400/500?random=17', category: 'men' },
  { id: 18, name: 'Shakur Nyongesa', position: 'Scrum-half', image: 'https://picsum.photos/400/500?random=18', category: 'men' },
  { id: 19, name: 'Farhan Juma', position: 'Fly-half', image: 'https://picsum.photos/400/500?random=19', category: 'men', role: 'Captain' },
  { id: 20, name: 'Simon Ochieng', position: 'Fly-half', image: 'https://picsum.photos/400/500?random=20', category: 'men' },
  { id: 21, name: 'Mathew Ouma', position: 'Left Wing', image: 'https://picsum.photos/400/500?random=21', category: 'men' },
  { id: 22, name: 'Joshua Okello', position: 'Left Wing', image: 'https://picsum.photos/400/500?random=22', category: 'men' },
  { id: 23, name: 'Douglas Kahuri', position: 'Inside Centre', image: 'https://picsum.photos/400/500?random=23', category: 'men' },
  { id: 24, name: 'Franklin Mukaisi', position: 'Inside Centre', image: 'https://picsum.photos/400/500?random=24', category: 'men', role: 'Vice-Captain' },
  { id: 25, name: 'David Mwangi', position: 'Outside Centre', image: 'https://picsum.photos/400/500?random=25', category: 'men' },
  { id: 26, name: 'John Okwatch', position: 'Outside Centre', image: 'https://picsum.photos/400/500?random=26', category: 'men' },
  { id: 27, name: 'Ramadhan Masete', position: 'Right Wing', image: 'https://picsum.photos/400/500?random=27', category: 'men' },
  { id: 28, name: 'Cornelios Ambaka', position: 'Right Wing', image: 'https://picsum.photos/400/500?random=28', category: 'men' },
  { id: 29, name: 'Collins Bett', position: 'Fullback', image: 'https://picsum.photos/400/500?random=29', category: 'men' },
  { id: 30, name: 'Felix Ochieng', position: 'Fullback', image: 'https://picsum.photos/400/500?random=30', category: 'men' },
  
  // New Additions - Men's XV
  { id: 31, name: 'Hillary Ashivila', position: 'Backrow', image: 'https://picsum.photos/400/500?random=31', category: 'men' },
  { id: 32, name: 'Patrick Wainaina', position: 'Scrum-half', image: 'https://picsum.photos/400/500?random=32', category: 'men' },
  { id: 33, name: 'Michael Ochieng Jnr', position: 'Wing', image: 'https://picsum.photos/400/500?random=33', category: 'men' },
  { id: 34, name: 'Jeff Ngugi', position: 'Forward', image: 'https://picsum.photos/400/500?random=34', category: 'men' },
  { id: 35, name: 'Eriya Lubanga', position: 'Forward', image: 'https://picsum.photos/400/500?random=35', category: 'men' },
  { id: 36, name: 'Denzel Odando', position: 'Forward', image: 'https://picsum.photos/400/500?random=36', category: 'men' },
  { id: 37, name: 'Roogers Odundo', position: 'Backrow', image: 'https://picsum.photos/400/500?random=37', category: 'men' },
  { id: 38, name: 'Isaac Omondi', position: 'Backrow', image: 'https://picsum.photos/400/500?random=38', category: 'men' },
  { id: 39, name: 'William Wagala', position: 'Wing', image: 'https://picsum.photos/400/500?random=39', category: 'men' },
  { id: 40, name: 'Mike Ochieng Snr', position: 'Fly-half', image: 'https://picsum.photos/400/500?random=40', category: 'men' },
  
  // Women's Team
  { id: 101, name: 'Nelly Munavi', position: 'Loosehead Prop', image: 'https://picsum.photos/400/500?random=101', category: 'women' },
  { id: 102, name: 'Naomi Muhanji', position: 'Loosehead Prop', image: 'https://picsum.photos/400/500?random=102', category: 'women' },
  { id: 103, name: 'Felistus Amunga', position: 'Loosehead Prop', image: 'https://picsum.photos/400/500?random=103', category: 'women' },
  { id: 104, name: 'Nura Annisa', position: 'Hooker', image: 'https://picsum.photos/400/500?random=104', category: 'women' },
  { id: 105, name: 'Maria Gorreti', position: 'Hooker', image: 'https://picsum.photos/400/500?random=105', category: 'women' },
  { id: 106, name: 'Melody Kamau', position: 'Tighthead Prop', image: 'https://picsum.photos/400/500?random=106', category: 'women' },
  { id: 107, name: 'Sharon Bosibori', position: 'Tighthead Prop', image: 'https://picsum.photos/400/500?random=107', category: 'women' },
  { id: 108, name: 'Pamela Muriuki', position: 'Tighthead Prop', image: 'https://picsum.photos/400/500?random=108', category: 'women' },
  { id: 109, name: 'Miriam Sanau', position: 'Tighthead Prop', image: 'https://picsum.photos/400/500?random=109', category: 'women' },
  { id: 110, name: 'Tracy Khan', position: 'Lock', image: 'https://picsum.photos/400/500?random=110', category: 'women' },
  { id: 111, name: 'Sandra Oduor', position: 'Lock', image: 'https://picsum.photos/400/500?random=111', category: 'women' },
  { id: 112, name: 'Janet Oyare', position: 'Lock', image: 'https://picsum.photos/400/500?random=112', category: 'women' },
  { id: 113, name: 'Gloria Kifano', position: 'Lock', image: 'https://picsum.photos/400/500?random=113', category: 'women' },
  { id: 114, name: 'Lucy Atieno', position: 'Lock', image: 'https://picsum.photos/400/500?random=114', category: 'women' },
  { id: 115, name: 'Monica Nguono Atieno', position: 'Lock', image: 'https://picsum.photos/400/500?random=115', category: 'women' },
  { id: 116, name: 'Belvin Khavere', position: 'Blindside Flanker', image: 'https://picsum.photos/400/500?random=116', category: 'women' },
  { id: 117, name: 'Mercy Kemunto', position: 'Blindside Flanker', image: 'https://picsum.photos/400/500?random=117', category: 'women' },
  { id: 118, name: 'Phoebe Akinyi', position: 'Blindside Flanker', image: 'https://picsum.photos/400/500?random=118', category: 'women' },
  { id: 119, name: 'Zain Mohammed', position: 'Openside Flanker', image: 'https://picsum.photos/400/500?random=119', category: 'women' },
  { id: 120, name: 'Dorris Kimani', position: 'Number Eight', image: 'https://picsum.photos/400/500?random=120', category: 'women' },
  { id: 121, name: 'Hellen Wanjiru', position: 'Number Eight', image: 'https://picsum.photos/400/500?random=121', category: 'women' },
  { id: 122, name: 'Zuhura Asman', position: 'Scrum-half', image: 'https://picsum.photos/400/500?random=122', category: 'women' },
  { id: 123, name: 'Mariam Edna', position: 'Scrum-half', image: 'https://picsum.photos/400/500?random=123', category: 'women' },
  { id: 124, name: 'Lavencer Owaga Vallary', position: 'Scrum-half', image: 'https://picsum.photos/400/500?random=124', category: 'women' },
  { id: 125, name: 'Mary Muthoni', position: 'Scrum-half', image: 'https://picsum.photos/400/500?random=125', category: 'women' },
  { id: 126, name: 'Milkah Chitechi', position: 'Fly-half', image: 'https://picsum.photos/400/500?random=126', category: 'women' },
  { id: 127, name: 'Loving Mijere', position: 'Fly-half', image: 'https://picsum.photos/400/500?random=127', category: 'women' },
  { id: 128, name: 'Sheril Owaga', position: 'Fly-half', image: 'https://picsum.photos/400/500?random=128', category: 'women' },
  { id: 129, name: 'Sharllyne Atieno', position: 'Fly-half', image: 'https://picsum.photos/400/500?random=129', category: 'women' },
  { id: 130, name: 'Sharllyne Ingaso', position: 'Fly-half', image: 'https://picsum.photos/400/500?random=130', category: 'women' },
  { id: 131, name: 'Deleon Indombo', position: 'Left Wing', image: 'https://picsum.photos/400/500?random=131', category: 'women' },
  { id: 132, name: 'Friza Asiko', position: 'Left Wing', image: 'https://picsum.photos/400/500?random=132', category: 'women' },
  { id: 133, name: 'Belinda Oriaso', position: 'Left Wing', image: 'https://picsum.photos/400/500?random=133', category: 'women' },
  { id: 134, name: 'Yvette Oketch', position: 'Left Wing', image: 'https://picsum.photos/400/500?random=134', category: 'women' },
  { id: 135, name: 'Angel Salamba', position: 'Inside Centre', image: 'https://picsum.photos/400/500?random=135', category: 'women' },
  { id: 136, name: 'Maureen Muritu', position: 'Outside Centre', image: 'https://picsum.photos/400/500?random=136', category: 'women' },
  { id: 137, name: 'Cynthia Mwai', position: 'Right Wing', image: 'https://picsum.photos/400/500?random=137', category: 'women' },
  { id: 138, name: 'Refa Ochando', position: 'Right Wing', image: 'https://picsum.photos/400/500?random=138', category: 'women' },
  { id: 139, name: 'Maxine Abuga', position: 'Right Wing', image: 'https://picsum.photos/400/500?random=139', category: 'women' },
  { id: 140, name: 'Catherine Elizabeth', position: 'Right Wing', image: 'https://picsum.photos/400/500?random=140', category: 'women' },
  { id: 141, name: 'Getrude Ambeyi', position: 'Fullback', image: 'https://picsum.photos/400/500?random=141', category: 'women' },
  { id: 142, name: 'Sophie Nabwire', position: 'Squad Member', image: 'https://picsum.photos/400/500?random=142', category: 'women' },
  { id: 143, name: 'Joy Makena', position: 'Squad Member', image: 'https://picsum.photos/400/500?random=143', category: 'women' },
  { id: 144, name: 'Dorothy Mulela', position: 'Squad Member', image: 'https://picsum.photos/400/500?random=144', category: 'women' },
  { id: 145, name: 'Cynthia Nekesa', position: 'Squad Member', image: 'https://picsum.photos/400/500?random=145', category: 'women' },
  { id: 146, name: 'Joy Loreah Apondi', position: 'Squad Member', image: 'https://picsum.photos/400/500?random=146', category: 'women' },
  { id: 147, name: 'Faith Adhiambo', position: 'Squad Member', image: 'https://picsum.photos/400/500?random=147', category: 'women' },
  { id: 148, name: 'Rose Waithera', position: 'Squad Member', image: 'https://picsum.photos/400/500?random=148', category: 'women' },
  { id: 149, name: 'Joyce Kamau', position: 'Squad Member', image: 'https://picsum.photos/400/500?random=149', category: 'women' },
  { id: 150, name: 'Diana Nyambura', position: 'Squad Member', image: 'https://picsum.photos/400/500?random=150', category: 'women' },
  
  // Sevens Provisional Squad
  { id: 301, name: 'Mario Abungu', position: 'Forward', image: 'https://picsum.photos/400/500?random=301', category: 'sevens' },
  { id: 302, name: 'Albert Alela', position: 'Forward', image: 'https://picsum.photos/400/500?random=302', category: 'sevens' },
  { id: 303, name: 'Vincent Omondi', position: 'Forward', image: 'https://picsum.photos/400/500?random=303', category: 'sevens' },
  { id: 304, name: 'Patrick Wainaina', position: 'Scrum-half', image: 'https://picsum.photos/400/500?random=304', category: 'sevens' },
  { id: 305, name: 'Faran Juma', position: 'Fly-half', image: 'https://picsum.photos/400/500?random=305', category: 'sevens' },
  { id: 306, name: 'Ramadhan Masetti', position: 'Wing', image: 'https://picsum.photos/400/500?random=306', category: 'sevens' },
  { id: 307, name: 'Alvin Mutachi', position: 'Back', image: 'https://picsum.photos/400/500?random=307', category: 'sevens' },
  { id: 308, name: 'Dave MWANGI', position: 'Centre', image: 'https://picsum.photos/400/500?random=308', category: 'sevens' },
  { id: 309, name: 'Brighton Omondi', position: 'Forward', image: 'https://picsum.photos/400/500?random=309', category: 'sevens' },
  { id: 310, name: 'Collins Bett', position: 'Fullback', image: 'https://picsum.photos/400/500?random=310', category: 'sevens' },
  { id: 311, name: 'Victor GICHANA', position: 'Forward', image: 'https://picsum.photos/400/500?random=311', category: 'sevens' },
  { id: 312, name: 'Matthew Ouma', position: 'Wing', image: 'https://picsum.photos/400/500?random=312', category: 'sevens' },
  { id: 313, name: 'Derrick SHIMENGA', position: 'Scrum-half', image: 'https://picsum.photos/400/500?random=313', category: 'sevens' },
  { id: 314, name: 'Lawrence Ndu\'ngu', position: 'Forward', image: 'https://picsum.photos/400/500?random=314', category: 'sevens' },
  { id: 315, name: 'Mukaisi Frankh', position: 'Centre', image: 'https://picsum.photos/400/500?random=315', category: 'sevens' },
  { id: 316, name: 'Smith Ouma', position: 'Back', image: 'https://picsum.photos/400/500?random=316', category: 'sevens' },
  { id: 317, name: 'Simon ochieng', position: 'Fly-half', image: 'https://picsum.photos/400/500?random=317', category: 'sevens' },
  { id: 318, name: 'Micheal Ochieng', position: 'Wing', image: 'https://picsum.photos/400/500?random=318', category: 'sevens' },
  { id: 319, name: 'Marcus Garvey', position: 'Forward', image: 'https://picsum.photos/400/500?random=319', category: 'sevens' },
  { id: 320, name: 'willy Tino', position: 'Forward', image: 'https://picsum.photos/400/500?random=320', category: 'sevens' },
  { id: 321, name: 'Jeremy Kibe', position: 'Back', image: 'https://picsum.photos/400/500?random=321', category: 'sevens' },
  { id: 322, name: 'Brighton Opiyo', position: 'Back', image: 'https://picsum.photos/400/500?random=322', category: 'sevens' },
  { id: 323, name: 'Owen', position: 'Forward', image: 'https://picsum.photos/400/500?random=323', category: 'sevens' },
  { id: 324, name: 'Kahuri', position: 'Centre', image: 'https://picsum.photos/400/500?random=324', category: 'sevens' },
  { id: 325, name: 'Jan Remke', position: 'Back', image: 'https://picsum.photos/400/500?random=325', category: 'sevens' },
  { id: 326, name: 'Academy boys', position: 'Development', image: 'https://picsum.photos/400/500?random=326', category: 'sevens' },
];

export const TECHNICAL_BENCH = [
  { name: 'Patrice Agunda', role: 'Head Coach/ 15s Coach', image: 'https://picsum.photos/400/500?random=301' },
  { name: 'Simon Odongo', role: 'Deputy Head Coach / Head of 7s/ 15s defense coach', image: 'https://picsum.photos/400/500?random=302' },
  { name: 'Sheila Chajira', role: 'Women’s Team Coach', image: 'https://picsum.photos/400/500?random=303' },
  { name: 'Eden Agero', role: 'Assistant Coach Skills and Attack', image: 'https://picsum.photos/400/500?random=304' },
  { name: 'Brian Onyiego', role: 'Assistant Coach, Development & Women', image: 'https://picsum.photos/400/500?random=305' },
  { name: 'Willy Ambaka', role: 'Head of Department Strength & Conditioning', image: 'https://picsum.photos/400/500?random=306' },
  { name: 'Edward Shitanda', role: 'Strength & Conditioning coach', image: 'https://picsum.photos/400/500?random=307' },
  { name: 'Gerald Omondi', role: 'Head of Department, Physiotherapy', image: 'https://picsum.photos/400/500?random=308' },
  { name: 'Kennedy Barua', role: 'Physiotherapist', image: 'https://picsum.photos/400/500?random=309' },
  { name: 'Wayne Mungei', role: 'General Team Manager', image: 'https://picsum.photos/400/500?random=310' },
];

export const EXECUTIVE_COMMITTEE = [
  { name: 'Victor Sudi', role: 'Chairman', image: 'https://picsum.photos/400/500?random=401' },
  { name: 'Terrence Adembesa', role: 'Vice Chairman', image: 'https://picsum.photos/400/500?random=402' },
  { name: 'Nekesa Were', role: 'Hon Secretary', image: 'https://picsum.photos/400/500?random=403' },
  { name: 'Peris Mukoko', role: 'Hon Treasurer', image: 'https://picsum.photos/400/500?random=404' },
  { name: 'Dennis Begisen', role: 'Grounds Director', image: 'https://picsum.photos/400/500?random=405' },
  { name: 'Joel Ng’ang’a', role: 'Director of Rugby', image: 'https://picsum.photos/400/500?random=406' },
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

export const PARTNERS = [
  { name: 'Rohto Mentholatum', url: 'https://www.rohto.co.ke/', logo: 'https://logo.clearbit.com/rohto.co.ke' },
  { name: 'Crown Paints', url: 'https://www.crownpaints.co.ke/', logo: 'https://logo.clearbit.com/crownpaints.co.ke' },
  { name: 'Sportpesa', url: 'https://www.ke.sportpesa.com/', logo: 'https://logo.clearbit.com/sportpesa.com' },
  { name: 'Eveready EA', url: 'https://sameer-group.co.ke/energy-power/eveready-ea-plc/', logo: 'https://logo.clearbit.com/sameer-group.co.ke' },
];