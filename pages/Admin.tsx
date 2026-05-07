import React, { useEffect, useState } from 'react';
import { supabase, hasSupabaseConfig } from '../supabase';
import { Event, Product, Facility, BookingRequest, NewsItem, Order, Player } from '../types';
import { LayoutDashboard, Newspaper, Calendar, ShoppingBag, ClipboardList, LogOut, Plus, Trash2, Edit3, CheckCircle, XCircle, Users, FileText, PieChart, BarChart, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

type AdminTab = 'dashboard' | 'news' | 'events' | 'shop' | 'bookings' | 'teams' | 'reports';

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
  const [players, setPlayers] = useState<Player[]>([]);

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

    const [ordersRes, newsRes, eventsRes, shopRes, bookingsRes, playersRes] = await Promise.all([
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
      supabase.from('news').select('*').order('published_at', { ascending: false }),
      supabase.from('events').select('*').order('date', { ascending: false }),
      supabase.from('products').select('*'),
      supabase.from('facility_bookings').select('*').order('created_at', { ascending: false }),
      supabase.from('players').select('*').order('id', { ascending: true }),
    ]);

    if (!ordersRes.error) setOrders(ordersRes.data || []);
    if (!newsRes.error) setNews(newsRes.data || []);
    if (!eventsRes.error) setEvents(eventsRes.data || []);
    if (!shopRes.error) setProducts(shopRes.data || []);
    if (!bookingsRes.error) setFacilityBookings(bookingsRes.data || []);
    if (!playersRes.error) setPlayers(playersRes.data || []);

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
          <button onClick={() => setActiveTab('teams')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-bold text-sm uppercase ${activeTab === 'teams' ? 'bg-quins-magenta text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <Users size={18} /> Team Management
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
          <button onClick={() => setActiveTab('reports')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-bold text-sm uppercase ${activeTab === 'reports' ? 'bg-quins-magenta text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <FileText size={18} /> Financial Reports
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

            {activeTab === 'teams' && (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-xs font-black uppercase text-slate-400">Player</th>
                      <th className="px-6 py-4 text-xs font-black uppercase text-slate-400">Position</th>
                      <th className="px-6 py-4 text-xs font-black uppercase text-slate-400">Category</th>
                      <th className="px-6 py-4 text-xs font-black uppercase text-slate-400 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {players.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-4 flex items-center gap-3">
                          <img src={p.image} className="w-10 h-10 rounded-full object-cover" />
                          <div>
                            <p className="font-bold text-slate-900">{p.name}</p>
                            {p.role && <p className="text-[10px] font-black uppercase text-quins-magenta">{p.role}</p>}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-bold text-slate-600 uppercase">{p.position}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[10px] font-black uppercase px-2 py-1 bg-slate-100 rounded text-slate-500">{p.category}</span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button className="p-2 text-slate-400 hover:text-quins-blue transition"><Edit3 size={16} /></button>
                          <button onClick={() => deleteItem('players', p.id)} className="p-2 text-slate-400 hover:text-red-500 transition"><Trash2 size={16} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
            {activeTab === 'reports' && (
              <div className="space-y-8 pb-20">
                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-green-100 text-green-600 rounded-2xl"><DollarSign size={24}/></div>
                      <span className="text-xs font-bold text-green-500 flex items-center gap-1"><TrendingUp size={12}/> +12%</span>
                    </div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Total Revenue</p>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">KES 4,850,000</h3>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-red-100 text-red-600 rounded-2xl"><TrendingDown size={24}/></div>
                      <span className="text-xs font-bold text-red-500 flex items-center gap-1"><TrendingUp size={12}/> +5%</span>
                    </div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Total Expenses</p>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">KES 1,240,000</h3>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl"><PieChart size={24}/></div>
                      <span className="text-xs font-bold text-blue-500">Target: 85%</span>
                    </div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Net Profit</p>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">KES 3,610,000</h3>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm border-l-4 border-l-quins-magenta">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-pink-100 text-quins-magenta rounded-2xl"><Star size={24}/></div>
                    </div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Christie 7s ROI</p>
                    <h3 className="text-2xl font-black text-slate-900 mt-1">285%</h3>
                  </div>
                </div>

                {/* Christie Sevens Specifics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-black text-xl uppercase tracking-tighter">Christie Sevens Breakdown</h3>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold uppercase">Day 1</span>
                        <span className="px-3 py-1 bg-quins-magenta text-white rounded-full text-[10px] font-bold uppercase">Day 2</span>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div><span className="text-xs font-black uppercase inline-block text-slate-600">Regular Tickets</span></div>
                          <div className="text-right"><span className="text-xs font-black inline-block text-slate-900">KES 1,450,000</span></div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-slate-100">
                          <div style={{ width: "65%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-quins-blue"></div>
                        </div>
                      </div>
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div><span className="text-xs font-black uppercase inline-block text-slate-600">VIP & Hospitality</span></div>
                          <div className="text-right"><span className="text-xs font-black inline-block text-slate-900">KES 2,100,000</span></div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-slate-100">
                          <div style={{ width: "85%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-quins-magenta"></div>
                        </div>
                      </div>
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div><span className="text-xs font-black uppercase inline-block text-slate-600">Merchandise Sales</span></div>
                          <div className="text-right"><span className="text-xs font-black inline-block text-slate-900">KES 840,000</span></div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-slate-100">
                          <div style={{ width: "40%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-quins-chocolate"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-quins-blue opacity-10 blur-3xl"></div>
                    <h3 className="font-black text-xl uppercase tracking-tighter mb-6">Regular vs Post Season</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Regular Season</p>
                        <p className="text-xl font-black">KES 12.4M</p>
                        <div className="mt-2 text-[10px] text-green-400 font-bold">+18.2% vs Last Year</div>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Post Season</p>
                        <p className="text-xl font-black">KES 5.8M</p>
                        <div className="mt-2 text-[10px] text-quins-blue font-bold">Projected +25%</div>
                      </div>
                      <div className="col-span-2 p-4 bg-quins-magenta/20 rounded-2xl border border-quins-magenta/30">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-1">Combined Growth</p>
                            <p className="text-2xl font-black">22.4%</p>
                          </div>
                          <BarChart size={40} className="text-white/20" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audit & Balance Sheet */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-black text-lg uppercase tracking-tighter">Audit Reports & Transaction Ledger</h3>
                    <button className="text-xs font-bold text-quins-blue hover:underline">Download full PDF</button>
                  </div>
                  <table className="w-full text-left">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Transaction ID</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Category</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Description</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">Amount</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { id: 'TXN-9021', cat: 'Tickets', desc: 'Christie 7s Day 2 VIP Bulk', amt: 'KES 240,000', status: 'Balanced' },
                        { id: 'TXN-9022', cat: 'Sponsorship', desc: 'Minet Diamond Tier Instalment', amt: 'KES 500,000', status: 'Balanced' },
                        { id: 'TXN-9023', cat: 'Facility', desc: 'RFUEA Ground Maintenance', amt: '-KES 45,000', status: 'Audited' },
                        { id: 'TXN-9024', cat: 'Merch', desc: 'Replica Jersey Batch A', amt: 'KES 185,000', status: 'Balanced' },
                      ].map(row => (
                        <tr key={row.id} className="hover:bg-slate-50 transition">
                          <td className="px-6 py-4 font-mono text-[10px] font-bold text-slate-400">{row.id}</td>
                          <td className="px-6 py-4"><span className="text-[10px] font-black uppercase px-2 py-1 bg-slate-100 rounded text-slate-500">{row.cat}</span></td>
                          <td className="px-6 py-4 text-xs font-bold text-slate-900">{row.desc}</td>
                          <td className={`px-6 py-4 text-xs font-black ${row.amt.startsWith('-') ? 'text-red-500' : 'text-slate-900'}`}>{row.amt}</td>
                          <td className="px-6 py-4 text-right"><span className="text-[10px] font-black text-green-500">{row.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
