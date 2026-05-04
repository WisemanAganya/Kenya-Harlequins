import React, { useEffect, useState } from 'react';
import { supabase, hasSupabaseConfig } from '../supabase';
import { Event, Product, Facility, BookingRequest, NewsItem, Order } from '../types';
import { LayoutDashboard, Newspaper, Calendar, ShoppingBag, ClipboardList, LogOut, Plus, Trash2, Edit3, CheckCircle, XCircle } from 'lucide-react';

type AdminTab = 'dashboard' | 'news' | 'events' | 'shop' | 'bookings';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState(null as any);
  const [userMessage, setUserMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Data states
  const [orders, setOrders] = useState<Order[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [facilityBookings, setFacilityBookings] = useState<BookingRequest[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setUserMessage('');
    if (!hasSupabaseConfig) {
      setUserMessage('Supabase credentials required in .env.local');
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setUserMessage(error.message);
  };

  const handleSignOut = () => supabase.auth.signOut();

  const loadData = async () => {
    if (!hasSupabaseConfig || !session) return;
    setLoading(true);

    const [ordersRes, newsRes, eventsRes, shopRes, bookingsRes] = await Promise.all([
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
      supabase.from('news').select('*').order('published_at', { ascending: false }),
      supabase.from('events').select('*').order('date', { ascending: false }),
      supabase.from('products').select('*'),
      supabase.from('facility_bookings').select('*').order('created_at', { ascending: false }),
    ]);

    if (!ordersRes.error) setOrders(ordersRes.data || []);
    if (!newsRes.error) setNews(newsRes.data || []);
    if (!eventsRes.error) setEvents(eventsRes.data || []);
    if (!shopRes.error) setProducts(shopRes.data || []);
    if (!bookingsRes.error) setFacilityBookings(bookingsRes.data || []);

    setLoading(false);
  };

  useEffect(() => {
    if (session) loadData();
  }, [session, activeTab]);

  const updateBookingStatus = async (id: number, status: string) => {
    const { error } = await supabase.from('facility_bookings').update({ status }).eq('id', id);
    if (!error) loadData();
  };

  const deleteItem = async (table: string, id: number) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (!error) loadData();
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-10">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-quins-magenta text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-2xl shadow-lg">KH</div>
            <h1 className="text-2xl font-black text-slate-900 uppercase">Admin Access</h1>
            <p className="text-gray-500 text-sm mt-2">Sign in to manage club content and operations.</p>
          </div>
          <div className="space-y-4">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-quins-magenta outline-none transition" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-quins-magenta outline-none transition" />
            <button onClick={handleSignIn} className="w-full bg-slate-900 text-white py-3 rounded-full font-bold hover:bg-quins-magenta transition shadow-lg">Sign In</button>
            {userMessage && <p className="text-center text-red-500 text-sm font-medium">{userMessage}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-white p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-quins-magenta rounded-lg flex items-center justify-center font-bold">KH</div>
          <span className="font-black text-lg uppercase tracking-tighter">Admin Portal</span>
        </div>

        <nav className="flex-grow space-y-2">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-bold text-sm uppercase ${activeTab === 'dashboard' ? 'bg-quins-magenta text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button onClick={() => setActiveTab('news')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-bold text-sm uppercase ${activeTab === 'news' ? 'bg-quins-magenta text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <Newspaper size={18} /> News & CMS
          </button>
          <button onClick={() => setActiveTab('events')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-bold text-sm uppercase ${activeTab === 'events' ? 'bg-quins-magenta text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <Calendar size={18} /> Match Fixtures
          </button>
          <button onClick={() => setActiveTab('shop')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-bold text-sm uppercase ${activeTab === 'shop' ? 'bg-quins-magenta text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <ShoppingBag size={18} /> Shop Inventory
          </button>
          <button onClick={() => setActiveTab('bookings')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-bold text-sm uppercase ${activeTab === 'bookings' ? 'bg-quins-magenta text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <ClipboardList size={18} /> Bookings
          </button>
        </nav>

        <button onClick={handleSignOut} className="mt-10 flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 transition font-bold text-sm uppercase">
          <LogOut size={18} /> Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{activeTab}</h2>
            <p className="text-gray-500">Manage your application content and processes.</p>
          </div>
          {activeTab !== 'dashboard' && activeTab !== 'bookings' && (
            <button className="flex items-center gap-2 bg-quins-magenta text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-pink-700 transition">
              <Plus size={18} /> Add New
            </button>
          )}
        </header>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400">Loading resources...</div>
        ) : (
          <div className="animate-in fade-in duration-500">
            {activeTab === 'dashboard' && (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-lg mb-4 text-slate-900">Latest Orders</h3>
                  <div className="space-y-4">
                    {orders.slice(0, 5).map(o => (
                      <div key={o.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                        <div>
                          <p className="font-bold">Order #{o.id}</p>
                          <p className="text-xs text-gray-500">{o.payment_method} • {o.phone}</p>
                        </div>
                        <span className="font-black text-quins-magenta">KES {o.subtotal.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-lg mb-4 text-slate-900">Recent Bookings</h3>
                  <div className="space-y-4">
                    {facilityBookings.slice(0, 5).map(b => (
                      <div key={b.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                        <div>
                          <p className="font-bold">{b.facility}</p>
                          <p className="text-xs text-gray-500">{b.name} • {b.event_date}</p>
                        </div>
                        <span className={`text-[10px] uppercase font-black px-3 py-1 rounded-full ${b.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>{b.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'news' && (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-xs font-black uppercase text-slate-400">Article</th>
                      <th className="px-6 py-4 text-xs font-black uppercase text-slate-400">Category</th>
                      <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {news.map(n => (
                      <tr key={n.id} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-4">
                          <p className="font-bold text-slate-900">{n.title}</p>
                          <p className="text-xs text-gray-500 truncate max-w-xs">{n.excerpt}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-bold px-2 py-1 bg-slate-100 rounded text-slate-600">{n.category}</span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button className="p-2 text-slate-400 hover:text-quins-blue transition"><Edit3 size={16} /></button>
                          <button onClick={() => deleteItem('news', n.id)} className="p-2 text-slate-400 hover:text-red-500 transition"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map(e => (
                  <div key={e.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-quins-magenta">{e.competition}</span>
                      <div className="flex gap-2">
                        <button className="text-slate-400 hover:text-quins-blue"><Edit3 size={14} /></button>
                        <button onClick={() => deleteItem('events', e.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                      </div>
                    </div>
                    <h4 className="font-black text-lg text-slate-900 uppercase leading-tight mb-2">{e.title}</h4>
                    <p className="text-xs text-gray-500 mb-4">{e.date} • {e.venue}</p>
                    <div className="pt-4 border-t border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase">Tickets</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {e.ticket_types.map(t => (
                          <span key={t.name} className="text-[10px] font-bold bg-slate-50 px-2 py-1 rounded text-slate-600">{t.name}: {t.price}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'shop' && (
              <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-4">
                {products.map(p => (
                  <div key={p.id} className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
                    <img src={p.image} className="w-full h-40 object-cover rounded-2xl mb-4" />
                    <div className="flex-grow">
                      <h4 className="font-bold text-slate-900">{p.name}</h4>
                      <p className="text-xs text-gray-500 mb-2">{p.category}</p>
                      <p className="font-black text-quins-magenta">KES {p.price.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-100">
                      <button className="p-2 text-slate-400 hover:text-quins-blue"><Edit3 size={16} /></button>
                      <button onClick={() => deleteItem('products', p.id)} className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-4">
                {facilityBookings.map(b => (
                  <div key={b.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black text-xs text-center p-2 uppercase">
                        {b.facility.split(' ')[0]}
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 uppercase tracking-tighter">{b.name}</h4>
                        <p className="text-sm text-gray-500">{b.email} • {b.phone}</p>
                        <div className="flex gap-4 mt-1">
                           <span className="text-[10px] font-bold uppercase text-quins-magenta">Date: {b.event_date}</span>
                           <span className="text-[10px] font-bold uppercase text-quins-blue">Facility: {b.facility}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {b.status === 'pending' ? (
                        <>
                          <button onClick={() => updateBookingStatus(b.id!, 'confirmed')} className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-green-600 transition">
                            <CheckCircle size={14} /> Confirm
                          </button>
                          <button onClick={() => updateBookingStatus(b.id!, 'cancelled')} className="flex items-center gap-2 bg-slate-200 text-slate-600 px-4 py-2 rounded-full text-xs font-bold hover:bg-slate-300 transition">
                            <XCircle size={14} /> Reject
                          </button>
                        </>
                      ) : (
                        <span className={`text-xs font-black uppercase px-4 py-2 rounded-full ${b.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                          {b.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
