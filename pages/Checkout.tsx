import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { supabase, hasSupabaseConfig } from '../supabase';

const PAYMENT_METHODS = [
  { value: 'mpesa', label: 'Lipa na M-Pesa' },
  { value: 'paybill', label: 'Paybill' },
  { value: 'till', label: 'Till Number' },
  { value: 'pochi', label: 'Pochi Biashara' },
];

const Checkout: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOrder = async () => {
    if (!phone) {
      setMessage('Please enter your phone number so we can confirm payment instructions.');
      return;
    }

    setLoading(true);
    setMessage('');

    if (hasSupabaseConfig) {
      const { data, error } = await supabase.from('orders').insert([
        {
          phone,
          payment_method: paymentMethod,
          subtotal,
          items,
          status: 'pending',
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        setMessage('Unable to complete checkout at this time. Please try again later.');
      } else {
        clearCart();
        navigate('/tickets');
        setMessage('Your order has been saved. Please follow the payment instructions sent to your phone.');
      }
    } else {
      setMessage('Checkout will work once Supabase settings are configured. Use .env.local with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-10">
            <h1 className="text-4xl font-extrabold text-slate-900 uppercase mb-4">Checkout</h1>
            <p className="text-gray-500 mb-6">Complete your cart and choose the payment option that works best for you.</p>

            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-200 p-6 bg-slate-50">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center gap-4">
                      <div>
                        <p className="font-semibold text-slate-900">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.quantity} x KES {item.price.toLocaleString()}</p>
                      </div>
                      <p className="font-bold text-slate-900">KES {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-between text-sm uppercase tracking-wider text-slate-600">
                  <span>Subtotal</span>
                  <span>KES {subtotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 p-6 bg-white">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Payment Method</h2>
                <div className="grid gap-3">
                  {PAYMENT_METHODS.map((option) => (
                    <label key={option.value} className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-4 hover:border-quins-blue transition cursor-pointer">
                      <input
                        name="payment"
                        type="radio"
                        value={option.value}
                        checked={paymentMethod === option.value}
                        onChange={() => setPaymentMethod(option.value)}
                        className="accent-quins-blue"
                      />
                      <span className="font-semibold text-slate-900">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 p-6 bg-slate-50">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Phone for M-Pesa</h2>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="2547XXXXXXXX"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-quins-blue focus:ring-quins-blue/20 outline-none"
                />
                <p className="mt-3 text-sm text-gray-500">
                  We will use this number to send payment instructions and confirm your order.
                </p>
              </div>

              <button
                onClick={handleOrder}
                disabled={loading || items.length === 0}
                className="w-full rounded-full bg-quins-magenta text-white py-4 font-bold text-lg shadow-lg hover:bg-pink-700 transition disabled:opacity-60"
              >
                {loading ? 'Processing...' : items.length === 0 ? 'Add Items to Cart' : 'Place Order'}
              </button>
              {message && <p className="text-sm text-gray-700">{message}</p>}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Payment Instructions</h2>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li>• Choose Lipa na M-Pesa for convenient mobile payment.</li>
                <li>• Use our Paybill or Till number when prompted.</li>
                <li>• Save order ID and phone number for support.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-sm text-gray-600">
              <p className="font-semibold text-slate-900 mb-3">Sample Payment Flow</p>
              <p className="mb-3">Open M-Pesa &gt; Lipa na M-Pesa &gt; Enter Paybill/Till &gt; Use your phone number &gt; Confirm amount.</p>
              <p>Once payment is complete, our team will issue your match tickets and booking confirmation.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
