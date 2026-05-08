import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Ticket, Plus, Minus, Info } from 'lucide-react';
import { EVENT_LIST } from '../constants';
import { useCart } from '../CartContext';
import { Event, TicketType } from '../types';
import { supabase, hasSupabaseConfig } from '../supabase';

const Tickets: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(EVENT_LIST);
  const [loading, setLoading] = useState(false);
  const [selectedDay, setSelectedDay] = useState<'All' | 'Saturday' | 'Sunday'>('All');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { addToCart } = useCart();

  useEffect(() => {
    if (!hasSupabaseConfig) return;

    setLoading(true);
    const fetchEvents = async () => {
      const { data } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });
      
      if (data?.length) {
        setEvents(data.map((event: any) => ({ ...event, ticket_types: event.ticket_types || [] })));
      }
      setLoading(false);
    };
    fetchEvents();
  }, []);

  const handleQuantityChange = (ticketId: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [ticketId]: Math.max(0, (prev[ticketId] || 0) + delta)
    }));
  };

  const handleAddTicketsToCart = (event: Event, ticket: TicketType) => {
    const qty = quantities[`${event.id}-${ticket.name}`] || 1;
    if (qty <= 0) return;

    addToCart({
      id: `ticket-${event.id}-${ticket.name}`,
      type: 'ticket',
      name: `${ticket.name} - ${event.title}`,
      category: 'Match Ticket',
      price: ticket.price,
      quantity: qty,
    });
    
    // Reset quantity after adding
    setQuantities(prev => ({ ...prev, [`${event.id}-${ticket.name}`]: 0 }));
  };

  const filteredTickets = (event: Event) => {
    if (selectedDay === 'All') return event.ticket_types;
    return event.ticket_types.filter(t => t.day === selectedDay || t.day === 'Both');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-5xl font-black text-slate-900 uppercase tracking-tighter mb-4">Ticketing & Events</h1>
          <p className="text-gray-500 max-w-2xl text-lg">
            Buy tickets for Kenya Harlequins matches, Christie Sevens, and more. Manage your cart and checkout with M-Pesa.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-grow space-y-12">
            {/* Day Filter */}
            <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm w-fit">
              {(['All', 'Saturday', 'Sunday'] as const).map(day => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-6 py-2 rounded-xl font-bold uppercase text-xs tracking-widest transition ${
                    selectedDay === day 
                    ? 'bg-quins-magenta text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-24">
                <div className="w-12 h-12 border-4 border-quins-magenta border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              events.map(event => (
                <div key={event.id} className="bg-white rounded-[2rem] border border-slate-200 shadow-xl overflow-hidden">
                  <div className="bg-slate-900 text-white p-8 md:p-10 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-quins-magenta/10 blur-3xl -mr-32 -mt-32"></div>
                     <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                           <div>
                              <span className="text-xs font-black uppercase tracking-[0.3em] text-quins-magenta mb-2 block">{event.category}</span>
                              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">{event.title}</h2>
                              <div className="flex flex-wrap gap-6 text-slate-400 font-bold uppercase text-xs tracking-widest">
                                 <span className="flex items-center gap-2"><Calendar size={16} className="text-quins-magenta" /> {new Date(event.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                 <span className="flex items-center gap-2"><MapPin size={16} className="text-quins-magenta" /> {event.venue}</span>
                              </div>
                           </div>
                           <div className="hidden md:block text-right">
                              <p className="text-4xl font-black text-white">{event.time}</p>
                              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">Kick-off Time</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="p-8 md:p-10">
                    <div className="mb-8">
                       <h3 className="text-xl font-black uppercase tracking-widest text-slate-900 inline-block border-b-4 border-quins-magenta pb-1">Tickets Available</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredTickets(event).map((ticket, idx) => {
                        const ticketId = `${event.id}-${ticket.name}`;
                        const qty = quantities[ticketId] || 0;
                        const isClosed = ticket.status === 'Closed' || (ticket.expires_at && new Date(ticket.expires_at) < new Date());

                        return (
                          <div 
                            key={idx} 
                            className={`group relative flex border border-slate-200 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-quins-magenta/30 ${isClosed ? 'opacity-75 grayscale' : ''}`}
                          >
                            <div className="flex-grow p-6 flex flex-col justify-between">
                              <div>
                                <h4 className="font-black text-lg uppercase leading-tight text-slate-900 group-hover:text-quins-magenta transition">{ticket.name}</h4>
                                <p className="text-xl font-black text-slate-700 mt-1">KES {ticket.price.toLocaleString()}</p>
                              </div>
                              
                              <div className="mt-6">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Validity</p>
                                <p className="text-xs font-bold text-slate-600 line-clamp-2">{ticket.description}</p>
                              </div>

                              {isClosed ? (
                                <div className="mt-4 text-red-500 font-black uppercase text-xs tracking-widest italic">Ticket Closed</div>
                              ) : (
                                <button
                                  onClick={() => handleAddTicketsToCart(event, ticket)}
                                  className="mt-6 w-full py-3 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-quins-magenta transition shadow-lg flex items-center justify-center gap-2"
                                >
                                  <Ticket size={14} /> Buy Now
                                </button>
                              )}
                            </div>

                            <div className="w-14 bg-slate-50 border-l border-slate-200 flex flex-col items-center justify-between py-4">
                              <button 
                                onClick={() => handleQuantityChange(ticketId, 1)}
                                disabled={isClosed}
                                className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-quins-magenta hover:bg-white rounded-full transition disabled:opacity-30"
                              >
                                <Plus size={18} />
                              </button>
                              <span className="font-black text-lg text-slate-900">{qty}</span>
                              <button 
                                onClick={() => handleQuantityChange(ticketId, -1)}
                                disabled={isClosed || qty === 0}
                                className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-white rounded-full transition disabled:opacity-30"
                              >
                                <Minus size={18} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <aside className="w-full lg:w-96 space-y-8">
            <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-xl">
               <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 text-slate-900">Event Info</h3>
               <div className="space-y-6">
                  <div className="flex gap-4">
                     <div className="w-10 h-10 bg-sky-50 text-quins-blue rounded-xl flex items-center justify-center shrink-0">
                        <Info size={20} />
                     </div>
                     <div>
                        <p className="font-bold text-slate-900 uppercase text-xs tracking-widest">Entry Policy</p>
                        <p className="text-sm text-gray-500 mt-1">Tickets are non-refundable. Children under 12 enter free with a guardian.</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <div className="w-10 h-10 bg-pink-50 text-quins-magenta rounded-xl flex items-center justify-center shrink-0">
                        <Calendar size={20} />
                     </div>
                     <div>
                        <p className="font-bold text-slate-900 uppercase text-xs tracking-widest">Flash Sales</p>
                        <p className="text-sm text-gray-500 mt-1">Keep an eye out for limited time flash sales on match days!</p>
                     </div>
                  </div>
               </div>
               <div className="mt-10 pt-10 border-t border-slate-100">
                  <h4 className="font-black uppercase text-xs tracking-widest text-slate-400 mb-4">Payment Methods</h4>
                  <div className="flex flex-wrap gap-3">
                     {['M-Pesa', 'Visa', 'Mastercard'].map(p => (
                        <span key={p} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-black uppercase text-slate-500">{p}</span>
                     ))}
                  </div>
               </div>
            </div>

            <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
               <div className="absolute bottom-0 right-0 w-32 h-32 bg-quins-magenta opacity-20 blur-3xl"></div>
               <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Venue Booking</h3>
               <p className="text-slate-400 text-sm mb-8 leading-relaxed">Planning a corporate event or sports day? Book the RFUEA Ground today.</p>
               <Link to="/facilities" className="inline-flex items-center justify-center w-full bg-white text-slate-900 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-quins-magenta hover:text-white transition">
                  Book Now
               </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
