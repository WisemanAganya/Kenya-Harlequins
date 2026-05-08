import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../CartContext';
import { supabase, hasSupabaseConfig } from '../supabase';
import { Smartphone, CreditCard, ShieldCheck, CheckCircle, ArrowRight, Wallet, Receipt, Info, Ticket as TicketIcon } from 'lucide-react';

const PAYMENT_METHODS = [
  { value: 'mpesa', label: 'Lipa na M-Pesa', icon: Smartphone, color: 'text-green-600', bg: 'bg-green-50' },
  { value: 'paybill', label: 'Paybill', icon: Receipt, color: 'text-quins-blue', bg: 'bg-sky-50' },
  { value: 'till', label: 'Till Number', icon: Wallet, color: 'text-quins-magenta', bg: 'bg-pink-50' },
  { value: 'pochi', label: 'Pochi Biashara', icon: CreditCard, color: 'text-quins-chocolate', bg: 'bg-amber-50' },
];

const Checkout: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOrder = async () => {
    if (!phone || phone.length < 10) {
      setMessage('Please enter a valid phone number (e.g., 0712345678).');
      return;
    }

    setLoading(true);
    setMessage('');

    // Simulate STK Push for M-Pesa
    if (paymentMethod === 'mpesa') {
      setMessage('Sending M-Pesa STK Push to your phone... Please check your handset.');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    if (hasSupabaseConfig) {
      // Prepare tickets for bulk insertion via RPC
      const ticketItems = items.filter(i => i.type === 'ticket');
      const ticketsToCreate = [];

      for (const item of ticketItems) {
        for (let q = 0; q < item.quantity; q++) {
          ticketsToCreate.push({
            ticket_type: item.name.split(' - ')[0],
            event_title: item.name.split(' - ')[1] || 'Match Ticket',
            full_name: 'Quins Supporter',
            qr_hash: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
          });
        }
      }

      // Use atomic RPC function to create order and tickets in one transaction
      const { data: orderId, error: orderError } = await supabase.rpc('create_order_with_tickets', {
        p_phone: phone,
        p_payment_method: paymentMethod,
        p_subtotal: subtotal,
        p_items: items,
        p_tickets: ticketsToCreate
      });

      if (orderError) {
        setMessage('Transaction Failed: ' + orderError.message);
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          clearCart();
          navigate('/tickets');
        }, 4000);
      }
    } else {
      // Demo mode success
      setIsSuccess(true);
      setTimeout(() => {
        clearCart();
        navigate('/tickets');
      }, 4000);
    }

    setLoading(false);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-100">
            <CheckCircle size={48} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-4">Order Placed!</h1>
          <p className="text-gray-500 mb-10">
            Your transaction is being processed. You will receive a confirmation message and your digital tickets shortly.
          </p>
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-left mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-xs font-bold uppercase text-gray-400">Reference</span>
              <span className="text-xs font-black text-slate-900">#KQ-{Math.floor(Math.random() * 100000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs font-bold uppercase text-gray-400">Phone</span>
              <span className="text-xs font-black text-slate-900">{phone}</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 italic">Redirecting you back to events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] min-h-screen py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <header className="mb-12">
          <button onClick={() => navigate(-1)} className="text-sm font-bold text-gray-400 hover:text-slate-900 flex items-center gap-2 mb-4 transition">
            <ArrowRight size={16} className="rotate-180" /> Back to Cart
          </button>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">Checkout</h1>
          <p className="text-gray-500 mt-2">Securely complete your purchase with M-Pesa or local options.</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-8">
            {/* Payment Methods */}
            <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center"><Wallet size={20}/></div>
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Payment Method</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PAYMENT_METHODS.map((option) => (
                  <label 
                    key={option.value} 
                    className={`relative flex items-center gap-4 rounded-3xl border-2 p-6 transition cursor-pointer group ${paymentMethod === option.value ? 'border-quins-magenta bg-pink-50/30' : 'border-slate-100 hover:border-slate-300 bg-white'}`}
                  >
                    <input
                      name="payment"
                      type="radio"
                      value={option.value}
                      checked={paymentMethod === option.value}
                      onChange={() => setPaymentMethod(option.value)}
                      className="hidden"
                    />
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${option.bg} ${option.color} group-hover:scale-110 transition duration-300`}>
                      <option.icon size={24} />
                    </div>
                    <div>
                      <p className="font-black text-slate-900 uppercase text-sm tracking-tight">{option.label}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Instant Confirmation</p>
                    </div>
                    {paymentMethod === option.value && (
                      <div className="absolute top-4 right-4 text-quins-magenta">
                        <CheckCircle size={20} />
                      </div>
                    )}
                  </label>
                ))}
              </div>

              <div className="mt-10">
                <label className="block text-xs font-black uppercase text-gray-400 tracking-widest mb-3">Phone Number for Transaction</label>
                <div className="relative">
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-slate-400">+254</span>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="7XXXXXXXX"
                    className="w-full rounded-2xl bg-slate-50 border-2 border-slate-100 px-16 py-5 font-black text-lg focus:border-quins-magenta focus:bg-white outline-none transition"
                  />
                </div>
                <div className="flex items-start gap-3 mt-4 p-4 bg-blue-50 rounded-2xl text-blue-700 text-xs">
                  <Info size={16} className="shrink-0" />
                  <p>For M-Pesa, an STK push will be sent to this number. Please have your phone unlocked and ready to enter your PIN.</p>
                </div>
              </div>
            </section>

            {/* Order Details */}
            <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center"><Receipt size={20}/></div>
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Order Details</h2>
              </div>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-6 p-4 rounded-3xl bg-slate-50 border border-slate-100 group">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm text-slate-400">
                      {item.type === 'ticket' ? <TicketIcon size={24} /> : <Receipt size={24} />}
                    </div>
                    <div className="flex-grow">
                      <p className="font-black text-slate-900 uppercase text-sm tracking-tight">{item.name}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.category} • Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-slate-900">KES {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar - Sticky Summary */}
          <aside className="space-y-6">
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200 sticky top-10">
              <h3 className="text-xl font-black uppercase tracking-widest mb-8 text-center border-b border-white/10 pb-6">Payment Summary</h3>
              
              <div className="space-y-4 mb-10">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-bold uppercase tracking-widest">Subtotal</span>
                  <span className="font-black">KES {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 font-bold uppercase tracking-widest">Processing Fee</span>
                  <span className="font-black text-green-400">FREE</span>
                </div>
                <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                  <span className="text-lg font-black uppercase tracking-tighter">Total Due</span>
                  <span className="text-3xl font-black text-quins-magenta">KES {subtotal.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleOrder}
                disabled={loading || items.length === 0}
                className="w-full bg-white text-slate-900 py-6 rounded-full font-black uppercase tracking-widest hover:bg-quins-magenta hover:text-white transition shadow-xl shadow-black/20 flex items-center justify-center gap-3 group disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                    Processing
                  </>
                ) : (
                  <>
                    Place Order <ArrowRight size={20} className="group-hover:translate-x-2 transition" />
                  </>
                )}
              </button>

              <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <div className="flex justify-center gap-4 opacity-50 mb-4">
                  <ShieldCheck size={20} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Secure Checkout SSL</p>
                </div>
              </div>
              
              {message && (
                <div className={`mt-6 p-4 rounded-2xl text-xs font-bold text-center ${message.includes('M-Pesa') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {message}
                </div>
              )}
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-200 p-8 text-center">
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Need Support?</p>
              <p className="text-sm font-bold text-slate-900 underline underline-offset-4 cursor-pointer">tickets@kenyaharlequins.com</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
