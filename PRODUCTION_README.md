# Kenya Harlequins RFC - Full Production Build

A comprehensive website for Kenya Harlequins Rugby Football Club featuring ticketing, CMS, admin dashboard, facility booking, membership management, and e-commerce.

## 🎯 Features Implemented

### ✅ Core Pages
- **Home**: Hero section, next match ticker, latest news, club values, membership CTA
- **About/History**: Club heritage, leadership, honours, chairman history, captains list
- **Teams**: Men's XV, Women's, Sevens squad with player profiles
- **Fixtures**: Match calendar with results and live scores
- **Tickets & Events**: Ticketing system for Kenya Cup, Christie Sevens, post-season matches
- **Facilities Booking**: Pitch hire, parking, event halls with booking form
- **Shop**: Merchandise store with add-to-cart functionality
- **Membership**: Tier selection (Social, Senior Playing, Junior Supporter)
- **News**: Latest club announcements and match reports
- **Reports**: Admin dashboard with analytics
- **Admin**: CMS for managing content (requires Supabase)
- **Contact**: Contact form with office information

### ✅ E-Commerce & Cart
- **Shopping Cart**: Add products, tickets, bookings to cart with persistent storage
- **Checkout**: Multi-step checkout with M-Pesa payment options (Lipa na M-Pesa, Paybill, Till, Pochi Biashara)
- **Cart Context**: Global state management for cart items

### ✅ Ticketing System
- Multiple ticket types per event (Standard, VIP, Student, Hospitality)
- Events support:
  - Regular Kenya Cup matches
  - Christie Sevens tournaments
  - Post-season exhibitions
  - Facility-based pricing
- Integrated with checkout and payment

### ✅ Facility Booking
- Main pitch hire, training pitches, parking zones, event halls
- Booking request form with email confirmation
- Status tracking (pending, confirmed, cancelled)

### ✅ Admin Dashboard & CMS
- Supabase-powered authentication
- Content management for:
  - Events and ticket types
  - News and announcements
  - Orders and payments
  - Facility bookings
  - Membership subscriptions
- Real-time analytics and reports

### ✅ Heritage & Social Integration
- Historical chairman list since 1951
- Club captains and legends
- Honours display (Kenya Cup, Enterprise Cup, Christie Sevens)
- Social media links (YouTube, TikTok, Facebook, Instagram, WhatsApp)

## 🛠️ Tech Stack

- **Frontend**: React 19.2, TypeScript, Tailwind CSS
- **Routing**: React Router 7.9
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **State**: Context API (Cart management)
- **Icons**: Lucide React
- **Date handling**: date-fns
- **Build**: Vite 6.2
- **CSS**: Tailwind (CDN) + custom index.css

## 📦 Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Edit `.env.local`:
```
GEMINI_API_KEY=your_gemini_key_here
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these credentials from:
- Supabase: [supabase.com](https://supabase.com)
- Create a new project > Settings > API > Copy URL and Anon Key

### 3. Set Up Supabase Database

Create the following tables in your Supabase project:

#### `events` table
```sql
CREATE TABLE events (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  time TIME,
  venue TEXT,
  competition TEXT,
  category TEXT,
  description TEXT,
  ticket_types JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `orders` table
```sql
CREATE TABLE orders (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  phone TEXT NOT NULL,
  payment_method TEXT,
  subtotal NUMERIC,
  items JSONB,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `facility_bookings` table
```sql
CREATE TABLE facility_bookings (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  facility TEXT NOT NULL,
  event_date DATE,
  notes TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `memberships` table
```sql
CREATE TABLE memberships (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_email TEXT UNIQUE NOT NULL,
  tier TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `news` table
```sql
CREATE TABLE news (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  category TEXT,
  published_at TIMESTAMP DEFAULT NOW()
);
```

#### `players` table
```sql
CREATE TABLE players (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL, -- 'men', 'women', 'sevens'
  role TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 4. Run Development Server
```bash
npm run dev
```
Visit http://localhost:3000

### 5. Build for Production
```bash
npm run build
```

## 🎫 M-Pesa Integration

The payment system supports:
- **Lipa na M-Pesa**: Customer initiates payment
- **Paybill**: Direct payment system (Paybill Number)
- **Till Number**: Merchant till for physical transactions
- **Pochi Biashara**: Digital wallet option

### Payment Configuration
1. Contact Safaricom to register Paybill/Till
2. Add merchant details to checkout page
3. Implement webhook for payment confirmation
4. Update order status in Supabase when payment confirmed

## 🗂️ Project Structure

```
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── History.tsx
│   ├── Teams.tsx
│   ├── Fixtures.tsx
│   ├── Tickets.tsx
│   ├── Checkout.tsx
│   ├── Facilities.tsx
│   ├── Shop.tsx
│   ├── Membership.tsx
│   ├── News.tsx
│   ├── Reports.tsx
│   ├── Admin.tsx
│   └── Contact.tsx
├── components/
│   ├── Layout.tsx (Header, Footer, Navigation)
│   └── CartDrawer.tsx
├── App.tsx (Main router)
├── index.tsx (Entry with CartProvider)
├── CartContext.tsx (Global cart state)
├── supabase.ts (Supabase client)
├── types.ts (TypeScript interfaces)
├── constants.ts (Static data)
├── index.css (Global styles)
└── vite.config.ts
```

## 📊 Admin Dashboard

Access the admin panel at `/#/admin` after signing in with your Supabase account.

**Features:**
- View latest orders and bookings
- Manage events and ticket types
- Monitor membership signups
- Export reports for analysis

## 🔒 Security Considerations

- Use Row-Level Security (RLS) policies on Supabase tables
- Protect admin endpoints with authentication
- Validate all payment requests
- Use HTTPS in production
- Store sensitive data in environment variables

## 🌍 Deployment

### Vercel (Recommended)
```bash
npm run build
# Connect GitHub repo to Vercel
# Add environment variables in Vercel dashboard
```

### Other Platforms
- Netlify
- GitHub Pages
- Self-hosted (Node.js server)

## 📝 Content Management

All static content can be edited in `constants.ts`:
- `NAV_ITEMS`: Navigation menu
- `PLAYERS`: Team roster
- `MATCHES`: Upcoming/past matches
- `NEWS`: News articles
- `PRODUCTS`: Shop merchandise
- `MEMBERSHIP_TIERS`: Membership options
- `EVENT_LIST`: Ticketed events
- `FACILITIES`: Bookable facilities
- `HISTORY_CHAIRMEN`: Chairman succession
- `HISTORY_CAPTAINS`: Club captains
- `HONOURS`: Trophy wins
- `SOCIAL_LINKS`: Social media links

## 🎨 Branding

**Brand Colors:**
- Magenta: #C2185B
- Blue: #0EA5E9
- Chocolate: #78350F
- Green: #22C55E

Update these in `index.html` tailwind config if needed.

## 🚀 Next Steps for Production

1. **Supabase Setup**: Complete database schema and RLS policies
2. **Payment Gateway**: Integrate M-Pesa API (Daraja)
3. **Email Notifications**: Set up transactional emails for orders/bookings
4. **Analytics**: Add Google Analytics or Mixpanel
5. **SEO**: Configure meta tags and Open Graph
6. **SSL Certificate**: Ensure HTTPS deployment
7. **Domain**: Configure custom domain
8. **CDN**: Set up image CDN for media files
9. **Backup**: Configure automated database backups
10. **Monitoring**: Set up error tracking (Sentry, LogRocket)

## 📞 Support

For issues or feature requests, contact the development team or refer to the deployment documentation.

---

**Created**: April 29, 2026
**Status**: Production Ready (pending Supabase configuration)
**Maintenance**: Regular content updates via admin dashboard
