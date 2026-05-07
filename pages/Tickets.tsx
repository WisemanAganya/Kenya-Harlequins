import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Ticket } from 'lucide-react';
import { addDays } from 'date-fns';
import { EVENT_LIST } from '../constants';
import { useCart } from '../CartContext';
import { Event } from '../types';
import { supabase, hasSupabaseConfig } from '../supabase';

const Tickets: React.FC = () => {
  const [events, setEvents] = useState<Event[]>(EVENT_LIST);
  const [loading, setLoading] = useState(false);
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

  const handleAddTicket = (eventId: number, ticketName: string, price: number) => {
    addToCart({
      id: `ticket-${eventId}-${ticketName}`,
      type: 'ticket',
      name: `${ticketName} - ${events.find((event) => event.id === eventId)?.title ?? 'Ticket'}`,
      category: 'Match Ticket',
      price,
      quantity: 1,
    });
  };

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-10">
              <h1 className="text-4xl font-extrabold text-slate-900 uppercase mb-3">Ticketing & Events</h1>
              <p className="text-gray-500 max-w-3xl">
                Buy tickets for Kenya Harlequins matches, Christie Sevens, facility bookings and parking passes. Manage your cart and checkout with M-Pesa or local payment options.
              </p>
            </div>

            {loading ? (
              <div className="text-center py-20 text-gray-500">Loading events...</div>
            ) : (
              <div className="space-y-8">
                {events.map((event) => (
                  <article key={event.id} className="border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition">
                    <div className="bg-slate-900 text-white p-6">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h2 className="text-2xl font-bold uppercase">{event.title}</h2>
                          <p className="text-sm text-slate-300 mt-2">{event.venue}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm uppercase tracking-wide text-quins-magenta">{event.category}</p>
                          <p className="text-xl font-bold">{new Date(event.date).toLocaleDateString('en-GB')} • {event.time}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 grid gap-6 md:grid-cols-[3fr_1fr]">
                      <div>
                        <p className="text-gray-600 mb-4">{event.description}</p>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                          <span className="inline-flex items-center gap-2"><Calendar size={16} /> {event.date}</span>
                          <span className="inline-flex items-center gap-2"><MapPin size={16} /> {event.venue}</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {(event.ticket_types || []).map((ticket) => (
                          <div key={ticket.name} className="border rounded-2xl p-4 bg-slate-50">
                            <div className="flex items-center justify-between gap-4">
                              <div>
                                <p className="font-semibold text-slate-900">{ticket.name}</p>
                                <p className="text-sm text-gray-500">{ticket.description}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-quins-blue">KES {ticket.price.toLocaleString()}</p>
                                <button
                                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-quins-magenta text-white rounded-full text-sm font-bold hover:bg-pink-700 transition"
                                  onClick={() => handleAddTicket(event.id, ticket.name, ticket.price)}
                                >
                                  <Ticket size={16} /> Add Ticket
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Need a Venue?</h3>
              <p className="text-gray-600 mb-6">Book the RFUEA Ground, training pitches, or parking for your event. We support corporate events, sports days and conference bookings.</p>
              <Link to="/facilities" className="inline-flex items-center justify-center w-full rounded-full bg-quins-blue px-6 py-3 text-white font-bold hover:bg-sky-600 transition">
                Book Facilities
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Payment Options</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>• M-Pesa Lipa na M-Pesa</li>
                <li>• Paybill</li>
                <li>• Till Number</li>
                <li>• Pochi Biashara</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
