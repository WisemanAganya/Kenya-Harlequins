import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import History from './pages/History';
import Teams from './pages/Teams';
import Fixtures from './pages/Fixtures';
import Tickets from './pages/Tickets';
import Checkout from './pages/Checkout';
import Facilities from './pages/Facilities';
import Membership from './pages/Membership';
import Shop from './pages/Shop';
import News from './pages/News';
import Reports from './pages/Reports';
import Admin from './pages/Admin';
import Contact from './pages/Contact';
import Christie7s from './pages/Christie7s';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
