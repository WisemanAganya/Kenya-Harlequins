import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import { X, Minus, Plus, Trash2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, subtotal, removeFromCart, updateQuantity } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
      <div className="w-full md:w-[420px] bg-white h-full shadow-2xl overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold">Your Cart</h2>
            <p className="text-sm text-gray-500">{items.length} item{items.length !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-slate-600 hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center text-gray-500">
              Your cart is empty.
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="border rounded-2xl p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-bold text-slate-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="text-sm text-slate-900 mt-2">KES {item.price.toLocaleString()}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-slate-500 hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="inline-flex items-center rounded-full border border-slate-200 overflow-hidden">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-2 text-slate-600 hover:bg-slate-100">
                      <Minus size={14} />
                    </button>
                    <span className="px-3 py-2 font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-2 text-slate-600 hover:bg-slate-100">
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="text-sm text-gray-500">Total: KES {(item.price * item.quantity).toLocaleString()}</div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">Subtotal</span>
            <span className="text-lg font-bold">KES {subtotal.toLocaleString()}</span>
          </div>
          <Link to="/checkout" onClick={onClose} className="block w-full text-center bg-quins-blue text-white py-3 rounded-full font-bold hover:bg-sky-600 transition">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
