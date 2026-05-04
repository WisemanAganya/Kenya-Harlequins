# Quick Setup & Deployment Checklist

## ✅ Pre-Launch Checklist

### Frontend Setup
- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Update `.env.local` with credentials
- [ ] Test all pages load without errors
- [ ] Test cart functionality (add/remove items)
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Check all links and navigation

### Backend Setup (Supabase)
- [ ] Create Supabase account
- [ ] Create project
- [ ] Copy URL and Anon Key to `.env.local`
- [ ] Create all 6 database tables
- [ ] Enable Row-Level Security policies
- [ ] Set up authentication
- [ ] Create admin account
- [ ] Test data insertion/retrieval

### Content Configuration
- [ ] Update club contact info in Layout.tsx
- [ ] Update social media links in constants.ts
- [ ] Upload hero images (if not using placeholders)
- [ ] Customize team roster with actual players
- [ ] Update upcoming match schedule
- [ ] Configure payment details (Paybill/Till)

### Testing
- [ ] Test checkout flow end-to-end
- [ ] Test facility booking form
- [ ] Test membership signup
- [ ] Test admin login
- [ ] Test responsive design on actual devices
- [ ] Performance test (Lighthouse)
- [ ] Security audit (check for vulnerabilities)

## 🚀 Deployment Steps

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Import GitHub repository
4. Configure build settings:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. Click Deploy

### Option 2: Netlify

1. Connect GitHub repository
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Add environment variables
4. Deploy

### Option 3: Self-Hosted (Ubuntu/Digital Ocean)

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone your-repo-url
cd kenya-harlequins-rfc

# Install dependencies
npm install

# Build
npm run build

# Install PM2 for process management
sudo npm install -g pm2

# Start application
pm2 start "npm run preview" --name quins

# Set up Nginx reverse proxy
sudo apt-get install nginx

# Configure Nginx to proxy to port 4173
sudo nano /etc/nginx/sites-available/default

# Enable SSL with Let's Encrypt
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 📊 Post-Launch Checklist

- [ ] Monitor uptime
- [ ] Check error logs
- [ ] Verify email notifications working
- [ ] Test payment flow with test account
- [ ] Monitor database performance
- [ ] Track user analytics
- [ ] Get user feedback
- [ ] Plan content calendar
- [ ] Schedule regular backups

## 🔐 Security Hardening

```bash
# Add security headers
# In Vite config or web server:
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# X-XSS-Protection: 1; mode=block
# Content-Security-Policy: default-src 'self'
```

## 📈 Scaling Considerations

- Use Supabase connection pooling for high traffic
- Enable caching with Cloudflare
- Optimize images with CDN
- Monitor database query performance
- Consider read replicas for scaling reads
- Implement background jobs for heavy processing

## 💰 Estimated Costs (Monthly)

- **Supabase**: $25-100 (paid tier)
- **Vercel/Netlify**: $0-20 (paid tier)
- **Domain**: $12-15
- **CDN**: $0-50 (if using Cloudflare)
- **Email Service**: $10-50 (SendGrid, etc.)

**Total**: ~$100-250/month for production

## 🆘 Support Resources

- Supabase Docs: https://supabase.io/docs
- React Docs: https://react.dev
- Vite Docs: https://vitejs.dev
- Tailwind Docs: https://tailwindcss.com
- React Router: https://reactrouter.com

---

**Ready to launch?** Follow the checklist above and you'll be live in hours!
