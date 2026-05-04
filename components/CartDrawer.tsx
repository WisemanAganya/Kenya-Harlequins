import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';

const CartDrawer: React.FC = () => {
  const { items, removeFromCart, updateQuantity, subtotal, totalItems, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500 ease-in-out"
        onClick={() => setIsCartOpen(false)}
      ></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md transform transition duration-500 ease-in-out">
          <div className="h-full flex flex-col bg-white shadow-2xl">
            {/* Header */}
            <div className="px-6 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingBag size={24} className="text-quins-magenta" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-white text-slate-900 text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                      {totalItems}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-black uppercase tracking-tight">Your Cart</h2>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-gray-300">
                    <ShoppingBag size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="px-8 py-3 bg-quins-blue text-white font-bold rounded-full hover:bg-sky-600 transition"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-20 h-20 bg-slate-100 rounded-2xl flex-shrink-0 flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-200 uppercase tracking-tighter">
                        {item.type === 'ticket' ? 'Ticket' : 'Item'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-slate-900 text-sm truncate uppercase tracking-tight">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mb-3 uppercase tracking-widest">{item.category}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-slate-200 rounded-full p-1 bg-slate-50">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 hover:text-quins-magenta transition"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="px-3 text-sm font-black text-slate-900 w-8 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 hover:text-quins-blue transition"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <div className="text-sm font-black text-slate-900">
                            KES {(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-8 border-t border-slate-100 bg-slate-50 rounded-t-3xl shadow-inner">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Total Amount</p>
                    <p className="text-sm text-gray-500">Includes all taxes and fees</p>
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    <span className="text-xs mr-1">KES</span>
                    {subtotal.toLocaleString()}
                  </div>
                </div>
                <Link 
                  to="/checkout" 
                  onClick={() => setIsCartOpen(false)}
                  className="flex items-center justify-center gap-3 w-full bg-quins-magenta text-white py-4 rounded-full font-bold text-lg shadow-xl hover:bg-pink-700 transition transform hover:scale-[1.02] active:scale-95 duration-200"
                >
                  Proceed to Checkout <ArrowRight size={20} />
                </Link>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="w-full mt-4 text-center text-sm font-bold text-slate-400 hover:text-slate-600 transition"
                >
                  Close & Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
