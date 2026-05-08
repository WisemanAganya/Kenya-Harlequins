import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const History = lazy(() => import('./pages/History'));
const Teams = lazy(() => import('./pages/Teams'));
const Fixtures = lazy(() => import('./pages/Fixtures'));
const Tickets = lazy(() => import('./pages/Tickets'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Facilities = lazy(() => import('./pages/Facilities'));
const Membership = lazy(() => import('./pages/Membership'));
const Shop = lazy(() => import('./pages/Shop'));
const News = lazy(() => import('./pages/News'));
const Reports = lazy(() => import('./pages/Reports'));
const Admin = lazy(() => import('./pages/Admin'));
const Contact = lazy(() => import('./pages/Contact'));
const Christie7s = lazy(() => import('./pages/Christie7s'));
const VerifyTicket = lazy(() => import('./pages/VerifyTicket'));
const Auth = lazy(() => import('./pages/Auth'));
const MemberDashboard = lazy(() => import('./pages/MemberDashboard'));

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-quins-magenta border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  
  if (!session) return <Navigate to="/auth" replace />;
  
  return <>{children}</>;
};

const LoadingFallback = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-quins-magenta border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/history" element={<History />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/christie-7s" element={<Christie7s />} />
            <Route path="/fixtures" element={<Fixtures />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/news" element={<News />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <MemberDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/verify/:hash" element={<VerifyTicket />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </Layout>
    </HashRouter>
  );
};

export default App;
