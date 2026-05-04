import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ShoppingCart } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { useCart } from '../CartContext';
import CartDrawer from './CartDrawer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-gray-50">
      <CartDrawer />
      {/* Top Bar */}
      <div className="bg-slate-900 text-white text-xs py-2 px-4 hidden md:flex justify-between items-center">
        <div className="flex space-x-4">
          <span className="flex items-center gap-1"><Mail size={12} /> info@quins.co.ke</span>
          <span className="flex items-center gap-1"><Phone size={12} /> +254 700 000 000</span>
        </div>
        <div className="flex space-x-4 text-gray-400">
           <span className="uppercase font-bold tracking-tighter">Follow the Quins</span>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-quins-blue transition"><Facebook size={14} /></a>
          <a href="#" className="hover:text-quins-magenta transition"><Twitter size={14} /></a>
          <a href="#" className="hover:text-quins-chocolate transition"><Instagram size={14} /></a>
          <a href="#" className="hover:text-red-600 transition"><Youtube size={14} /></a>
        </div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-quins-magenta">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo Area */}
            <NavLink to="/" className="flex items-center gap-3 group">
               <div className="w-12 h-12 bg-slate-900 text-white flex items-center justify-center font-bold text-xl rounded-lg group-hover:bg-quins-magenta transition-colors duration-300">
                 KH
               </div>
               <div className="flex flex-col">
                 <span className="font-bold text-xl uppercase tracking-tighter leading-none text-slate-900">Kenya Harlequins</span>
                 <span className="text-xs font-semibold text-quins-magenta uppercase tracking-widest">#SSS</span>
               </div>
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md text-sm font-bold uppercase transition-colors duration-200 ${
                      isActive
                        ? 'bg-slate-100 text-quins-magenta'
                        : 'text-slate-600 hover:text-quins-blue hover:bg-slate-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              
              <div className="h-8 w-px bg-gray-200 mx-2"></div>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-slate-600 hover:text-quins-magenta transition group"
              >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-quins-magenta text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-lg transform translate-x-1 -translate-y-1">
                    {totalItems}
                  </span>
                )}
              </button>

              <NavLink to="/membership" className="ml-4 px-5 py-2 bg-quins-blue text-white rounded-md text-sm font-bold uppercase hover:bg-sky-600 transition shadow-sm">
                Join Us
              </NavLink>
            </div>

            {/* Mobile Menu Actions */}
            <div className="flex items-center gap-4 md:hidden">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-slate-600"
              >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-quins-magenta text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button className="p-2 text-slate-600" onClick={toggleMenu}>
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-3 rounded-md text-base font-medium ${
                      isActive
                        ? 'bg-slate-100 text-quins-magenta'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
               <NavLink to="/membership" onClick={() => setIsMenuOpen(false)} className="block mt-4 px-3 py-3 bg-quins-blue text-white text-center rounded-md font-bold uppercase">
                Join Us
              </NavLink>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-300 pt-16 pb-8 border-t-8 border-quins-blue">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-white text-lg font-bold uppercase mb-4 border-l-4 border-quins-magenta pl-3">Kenya Harlequins</h3>
              <p className="mb-4 text-sm leading-relaxed">
                Founded in 1951, we are one of Kenya's premier rugby clubs. Dedicated to excellence on the pitch and integrity off it.
              </p>
              <div className="text-sm font-bold text-white mb-2">Motto:</div>
              <p className="italic text-quins-blue">"Sure, Strong, Superior"</p>
            </div>

            <div>
              <h3 className="text-white text-lg font-bold uppercase mb-4 border-l-4 border-quins-blue pl-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><NavLink to="/teams" className="hover:text-white transition">First XV</NavLink></li>
                <li><NavLink to="/fixtures" className="hover:text-white transition">Fixtures</NavLink></li>
                <li><NavLink to="/membership" className="hover:text-white transition">Membership</NavLink></li>
                <li><NavLink to="/shop" className="hover:text-white transition">Club Shop</NavLink></li>
                <li><NavLink to="/about" className="hover:text-white transition">History</NavLink></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-lg font-bold uppercase mb-4 border-l-4 border-quins-chocolate pl-3">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-quins-blue mt-0.5" />
                  <span>RFUEA Ground,<br/>Ngong Road, Nairobi</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={18} className="text-quins-blue" />
                  <span>+254 700 000 000</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={18} className="text-quins-blue" />
                  <span>info@quins.co.ke</span>
                </li>
              </ul>
            </div>

            <div>
               <h3 className="text-white text-lg font-bold uppercase mb-4 border-l-4 border-quins-green pl-3">Newsletter</h3>
               <p className="text-sm mb-4">Subscribe for the latest news and match updates.</p>
               <div className="flex">
                 <input type="email" placeholder="Your email" className="bg-slate-800 text-white px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-quins-blue" />
                 <button className="bg-quins-blue text-white px-4 py-2 rounded-r-md font-bold hover:bg-sky-600 transition">GO</button>
               </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} Kenya Harlequin Football Club. All Rights Reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
               <a href="#" className="hover:text-white">Privacy Policy</a>
               <a href="#" className="hover:text-white">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;