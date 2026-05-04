import React, { useState } from 'react';
import { PRODUCTS } from '../constants';
import { ShoppingBag, Search, Filter } from 'lucide-react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';

const CATEGORIES = ['All', 'Playing Kit', 'Training Gear', 'Equipment'];

const Shop: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart, totalItems } = useCart();

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 uppercase tracking-tight mb-2">Club Shop</h1>
            <p className="text-gray-500">Official Kenya Harlequins gear, playing kits, and equipment.</p>
          </div>
          <Link 
            to="/checkout" 
            className="flex items-center gap-3 bg-white border border-slate-200 px-6 py-3 rounded-full shadow-sm hover:border-quins-magenta transition group"
          >
            <div className="relative">
              <ShoppingBag className="text-slate-900 group-hover:text-quins-magenta transition" size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-quins-magenta text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                  {totalItems}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase text-gray-400 leading-none">Your Cart</span>
              <span className="text-sm font-bold text-slate-900 leading-none mt-1">View Checkout</span>
            </div>
          </Link>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 mb-12 shadow-sm">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Filter size={18} className="text-gray-400 mr-2" />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-bold transition ${
                    activeCategory === cat
                      ? 'bg-slate-900 text-white shadow-lg'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-full pl-12 pr-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-quins-blue/20 focus:border-quins-blue transition"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group bg-white rounded-3xl border border-slate-200 p-4 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative overflow-hidden bg-slate-50 rounded-2xl mb-6 aspect-square">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700" 
                />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
                   <button 
                    onClick={() => addToCart({
                      id: `prod-${product.id}`,
                      type: 'product',
                      name: product.name,
                      category: product.category,
                      price: product.price,
                      quantity: 1
                    })}
                    className="bg-white text-slate-900 w-full py-3 rounded-full font-bold text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition duration-500 hover:bg-quins-magenta hover:text-white"
                   >
                     Quick Add
                   </button>
                </div>
                <div className="absolute top-4 left-4">
                   <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                     {product.category}
                   </span>
                </div>
              </div>
              <div className="px-2">
                <h3 className="font-bold text-slate-900 text-lg mb-2 line-clamp-1 group-hover:text-quins-blue transition">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-black text-slate-900">
                    <span className="text-xs font-bold text-gray-400 mr-1">KES</span>
                    {product.price.toLocaleString()}
                  </div>
                  <button 
                    onClick={() => addToCart({
                      id: `prod-${product.id}`,
                      type: 'product',
                      name: product.name,
                      category: product.category,
                      price: product.price,
                      quantity: 1
                    })}
                    className="w-10 h-10 bg-slate-50 text-slate-900 rounded-full flex items-center justify-center hover:bg-quins-magenta hover:text-white transition shadow-sm border border-slate-100"
                  >
                    <ShoppingBag size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-32">
             <div className="text-gray-300 mb-4">
                <Search size={64} className="mx-auto" />
             </div>
             <h2 className="text-2xl font-bold text-slate-900 mb-2">No items found</h2>
             <p className="text-gray-500">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;