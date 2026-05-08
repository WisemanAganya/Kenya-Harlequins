import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase, hasSupabaseConfig } from '../supabase';
import { TicketInstance } from '../types';
import { CheckCircle, XCircle, AlertCircle, ShieldCheck, User, Calendar, MapPin, Ticket as TicketIcon, LogOut, ArrowRight } from 'lucide-react';

const VerifyTicket: React.FC = () => {
  const { hash } = useParams<{ hash: string }>();
  const [ticket, setTicket] = useState<TicketInstance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [session, setSession] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
  }, []);

  useEffect(() => {
    if (!hasSupabaseConfig || !hash) return;

    // Enable Realtime Subscription
    const channel = supabase
      .channel('ticket-updates')
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'tickets', 
        filter: `qr_hash=eq.${hash}` 
      }, (payload) => {
        setTicket(payload.new as TicketInstance);
      })
      .subscribe();

    const fetchTicket = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('qr_hash', hash)
        .single();

      if (error) {
        setError('Ticket not found or invalid QR code.');
      } else {
        setTicket(data);
      }
      setLoading(false);
    };

    fetchTicket();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [hash]);

  const handleCheckIn = async () => {
    if (!ticket || !session) return;

    setLoading(true);
    // Use the optimized RPC function for atomic check-in
    const { data, error } = await supabase.rpc('check_in_ticket', { 
      p_qr_hash: hash 
    });

    if (error) {
      alert('Network Error: ' + error.message);
    } else if (data && !data.success) {
      alert('Check-in failed: ' + data.message);
      // Refresh ticket status if it failed due to already checked in
      if (data.message.includes('already')) {
         const { data: updated } = await supabase.from('tickets').select('*').eq('qr_hash', hash).single();
         if (updated) setTicket(updated);
      }
    } else {
      // Success is handled by Realtime subscription or local state update
      setTicket({ ...ticket, status: 'checked_in', checked_in_at: new Date().toISOString() });
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-quins-magenta border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck size={32} className="text-quins-magenta" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Ticket Validator</h1>
          <p className="text-slate-400 text-sm mt-2">Authorized entry verification system</p>
        </div>

        {error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-[2.5rem] p-10 text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-500/20">
              <AlertCircle size={40} />
            </div>
            <h2 className="text-2xl font-black uppercase mb-4">Access Denied</h2>
            <p className="text-red-200/70 font-medium leading-relaxed">{error}</p>
            <button onClick={() => navigate('/')} className="mt-8 px-8 py-3 bg-white text-slate-900 rounded-full font-black uppercase text-xs tracking-widest hover:bg-red-500 hover:text-white transition">Back to Home</button>
          </div>
        ) : ticket && (
          <div className={`rounded-[2.5rem] border overflow-hidden transition-all duration-500 ${ticket.status === 'checked_in' ? 'bg-amber-500/5 border-amber-500/20' : 'bg-green-500/5 border-green-500/20'}`}>
            <div className={`p-8 text-center ${ticket.status === 'checked_in' ? 'bg-amber-500' : 'bg-green-500'}`}>
              <div className="w-20 h-20 bg-white text-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                {ticket.status === 'checked_in' ? <XCircle size={40} className="text-amber-500" /> : <CheckCircle size={40} className="text-green-500" />}
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight">
                {ticket.status === 'checked_in' ? 'Already Used' : 'Valid Ticket'}
              </h2>
              <p className="text-white/80 text-xs font-bold uppercase tracking-widest mt-1">
                {ticket.status === 'checked_in' ? `Checked in at ${new Date(ticket.checked_in_at!).toLocaleTimeString()}` : 'Permit Entry'}
              </p>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400"><User size={20}/></div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Ticket Holder</p>
                    <p className="font-black text-lg">{ticket.full_name}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400"><TicketIcon size={20}/></div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Category</p>
                    <p className="font-black text-lg text-quins-magenta uppercase">{ticket.ticket_type}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400"><MapPin size={20}/></div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Event</p>
                    <p className="font-bold text-slate-300">{ticket.event_title}</p>
                  </div>
                </div>
              </div>

              {!session ? (
                <div className="mt-8 p-6 bg-white/5 rounded-3xl border border-white/10 text-center">
                  <p className="text-xs text-slate-400 font-bold mb-4">Admin authentication required to perform check-in.</p>
                  <Link to="/admin" className="inline-flex items-center gap-2 text-quins-magenta font-black uppercase text-xs tracking-widest hover:underline">
                    Staff Sign In <ArrowRight size={14}/>
                  </Link>
                </div>
              ) : ticket.status !== 'checked_in' && (
                <button
                  onClick={handleCheckIn}
                  className="w-full bg-white text-slate-900 py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-quins-magenta hover:text-white transition shadow-xl"
                >
                  Confirm Entry
                </button>
              )}
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-[10px] font-black uppercase text-slate-600 tracking-[0.3em]">Kenya Harlequins Digital Infrastructure</p>
        </div>
      </div>
    </div>
  );
};

export default VerifyTicket;
