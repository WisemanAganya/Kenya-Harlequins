import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { 
  User, ShieldCheck, CreditCard, Calendar, FileText, Bell, 
  Settings, LogOut, Ticket, ChevronRight, Download, 
  AlertCircle, CheckCircle2, Info, ArrowUpRight, MessageSquare 
} from 'lucide-react';
import { Profile, MembershipRecord, PaymentRecord, Communication, Meeting, Notification, TicketInstance } from '../types';

const MemberDashboard: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [membership, setMembership] = useState<MembershipRecord | null>(null);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [communications, setCommunications] = useState<Communication[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [tickets, setTickets] = useState<TicketInstance[]>([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }

      setLoading(true);
      const userId = session.user.id;

      // Fetch all dashboard data concurrently
      const [
        profileRes, 
        membershipRes, 
        paymentsRes, 
        commsRes, 
        meetingsRes, 
        notifsRes, 
        ticketsRes
      ] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).single(),
        supabase.from('memberships').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(1),
        supabase.from('payments').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
        supabase.from('communications').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('meetings').select('*').eq('status', 'upcoming').order('date', { ascending: true }),
        supabase.from('notifications').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(10),
        supabase.from('tickets').select('*').eq('order_id', userId).order('created_at', { ascending: false }) // Simplified for demo
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (membershipRes.data?.length) setMembership(membershipRes.data[0]);
      if (paymentsRes.data) setPayments(paymentsRes.data);
      if (commsRes.data) setCommunications(commsRes.data);
      if (meetingsRes.data) setMeetings(meetingsRes.data);
      if (notifsRes.data) setNotifications(notifsRes.data);
      
      setLoading(false);
    };

    fetchData();

    // Enable Realtime Subscriptions
    const notifChannel = supabase
      .channel('member-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications' }, (payload) => {
        setNotifications(prev => [payload.new as Notification, ...prev]);
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'communications' }, () => {
        // Reload communications if changed
      })
      .subscribe();

    return () => {
      supabase.removeChannel(notifChannel);
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-quins-magenta border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-80 bg-slate-900 text-white shrink-0 sticky top-0 md:h-screen p-8 flex flex-col">
        <div className="mb-12 flex items-center gap-4">
          <div className="w-12 h-12 bg-quins-magenta rounded-2xl flex items-center justify-center shadow-lg shadow-quins-magenta/20">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter">Quins Portal</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Member ID: #{profile?.id.substring(0, 8)}</p>
          </div>
        </div>

        <nav className="flex-grow space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'membership', label: 'Membership', icon: ShieldCheck },
            { id: 'finance', label: 'Finance & Payments', icon: CreditCard },
            { id: 'events', label: 'Events & Tickets', icon: Ticket },
            { id: 'comms', label: 'Memos & Alerts', icon: MessageSquare },
            { id: 'settings', label: 'Account Settings', icon: Settings },
          ].map((item) => (
            <button 
              key={item.id}
              className="w-full flex items-center justify-between group px-4 py-4 rounded-2xl hover:bg-white/5 transition text-left"
            >
              <div className="flex items-center gap-4">
                 <item.icon size={20} className="text-slate-500 group-hover:text-quins-magenta transition" />
                 <span className="text-sm font-bold uppercase tracking-widest group-hover:text-white transition">{item.label}</span>
              </div>
              <ChevronRight size={16} className="text-slate-700 opacity-0 group-hover:opacity-100 transition" />
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-red-400 hover:bg-red-400/10 transition font-black uppercase text-xs tracking-widest"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter mb-2">Jambo, {profile?.full_name.split(' ')[0]}!</h1>
            <p className="text-gray-500 font-medium">Welcome back to your member command center.</p>
          </div>
          <div className="flex gap-4">
             <button className="relative w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-quins-magenta hover:border-quins-magenta/30 transition shadow-sm">
                <Bell size={20} />
                {notifications.some(n => !n.is_read) && (
                   <span className="absolute top-3 right-3 w-2 h-2 bg-quins-magenta rounded-full"></span>
                )}
             </button>
             <div className="w-12 h-12 rounded-2xl bg-slate-900 overflow-hidden border-2 border-white shadow-lg">
                <img 
                  src={profile?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${profile?.full_name}`} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-8">
            {/* Membership Status Card */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-quins-magenta/5 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>
               <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div>
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4 block">Current Status</span>
                    <div className="flex items-center gap-4 mb-4">
                       <h3 className="text-3xl font-black uppercase tracking-tighter text-slate-900">{profile?.membership_tier || 'Supporter'}</h3>
                       <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${profile?.membership_status === 'active' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                         {profile?.membership_status}
                       </span>
                    </div>
                    {membership && (
                      <p className="text-sm font-bold text-gray-500">Valid until {new Date(membership.expiry_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    )}
                  </div>
                  <div className="flex gap-4">
                     <button className="px-6 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-quins-magenta transition shadow-lg flex items-center gap-2">
                        Renew Now <ArrowUpRight size={14} />
                     </button>
                     <button className="w-14 h-14 border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 hover:text-quins-blue hover:border-quins-blue transition">
                        <Download size={20} />
                     </button>
                  </div>
               </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-6">
                  <div className="w-16 h-16 bg-blue-50 text-quins-blue rounded-3xl flex items-center justify-center shrink-0">
                     <Ticket size={28} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">Active Tickets</p>
                    <p className="text-3xl font-black text-slate-900">{tickets.length}</p>
                  </div>
               </div>
               <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-6">
                  <div className="w-16 h-16 bg-pink-50 text-quins-magenta rounded-3xl flex items-center justify-center shrink-0">
                     <CreditCard size={28} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase text-slate-400 tracking-widest mb-1">Total Spent</p>
                    <p className="text-3xl font-black text-slate-900">KES {payments.reduce((acc, p) => acc + (p.status === 'completed' ? p.amount : 0), 0).toLocaleString()}</p>
                  </div>
               </div>
            </div>

            {/* Recent Payments Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900">Finance & History</h3>
                  <button className="text-xs font-black uppercase tracking-widest text-quins-blue hover:underline">View All</button>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">
                       <tr>
                         <th className="px-8 py-5">Reference</th>
                         <th className="px-8 py-5">Date</th>
                         <th className="px-8 py-5">Purpose</th>
                         <th className="px-8 py-5">Amount</th>
                         <th className="px-8 py-5 text-right">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                       {payments.slice(0, 5).map((payment) => (
                         <tr key={payment.id} className="hover:bg-slate-50 transition group">
                            <td className="px-8 py-6 font-black text-slate-900 text-xs">#{payment.reference.substring(0, 10)}</td>
                            <td className="px-8 py-6 text-sm text-gray-500 font-bold">{new Date(payment.created_at).toLocaleDateString()}</td>
                            <td className="px-8 py-6 font-bold uppercase text-[10px] tracking-widest text-slate-600">{payment.purpose}</td>
                            <td className="px-8 py-6 font-black text-slate-900">KES {payment.amount.toLocaleString()}</td>
                            <td className="px-8 py-6 text-right">
                               <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${payment.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                                 {payment.status}
                               </span>
                            </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
               </div>
            </div>
          </div>

          <aside className="space-y-8">
            {/* Announcements & Memos */}
            <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
               <div className="absolute bottom-0 right-0 w-48 h-48 bg-quins-magenta opacity-10 blur-[80px]"></div>
               <div className="relative z-10">
                  <div className="flex justify-between items-center mb-8">
                     <h3 className="text-xl font-black uppercase tracking-tighter">Memos & Alerts</h3>
                     <span className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center text-quins-magenta font-black text-xs">{communications.length}</span>
                  </div>
                  <div className="space-y-6">
                    {communications.map((comm) => (
                      <div key={comm.id} className="group cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                           <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${comm.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-quins-blue/20 text-quins-blue'}`}>{comm.type}</span>
                           <span className="text-[10px] font-bold text-slate-500">{new Date(comm.created_at).toLocaleDateString()}</span>
                        </div>
                        <h4 className="font-bold text-sm group-hover:text-quins-magenta transition line-clamp-1">{comm.title}</h4>
                        <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">{comm.content}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-10 py-4 border border-white/10 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/5 transition">
                     Official Document Center
                  </button>
               </div>
            </div>

            {/* Upcoming Meetings & AGMs */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
               <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900 mb-8">Meetings & Programs</h3>
               <div className="space-y-8">
                  {meetings.length > 0 ? meetings.map((meeting) => (
                    <div key={meeting.id} className="flex gap-6">
                       <div className="w-14 h-14 bg-slate-50 rounded-2xl flex flex-col items-center justify-center shrink-0 border border-slate-100">
                          <span className="text-xs font-black text-quins-magenta uppercase">{new Date(meeting.date).toLocaleString('default', { month: 'short' })}</span>
                          <span className="text-lg font-black text-slate-900">{new Date(meeting.date).getDate()}</span>
                       </div>
                       <div>
                          <h4 className="font-bold text-slate-900 mb-1">{meeting.title}</h4>
                          <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                             <span className="flex items-center gap-1"><Calendar size={12}/> {meeting.time}</span>
                             <span className="flex items-center gap-1"><MapPin size={12}/> {meeting.location}</span>
                          </div>
                          {meeting.program_url && (
                            <button className="mt-3 text-xs font-black text-quins-blue hover:underline flex items-center gap-1 uppercase tracking-widest">
                               View Program <ArrowUpRight size={12}/>
                            </button>
                          )}
                       </div>
                    </div>
                  )) : (
                    <div className="text-center py-6 text-slate-400 italic text-sm">No upcoming meetings scheduled.</div>
                  )}
               </div>
            </div>

            {/* Support Quick Link */}
            <div className="bg-quins-blue/5 border border-quins-blue/10 rounded-[2rem] p-8">
               <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-quins-blue text-white rounded-2xl flex items-center justify-center shadow-lg shadow-quins-blue/20">
                     <Info size={24} />
                  </div>
                  <h4 className="font-black uppercase tracking-tight text-slate-900 text-lg">Member Support</h4>
               </div>
               <p className="text-sm text-slate-600 mb-6 leading-relaxed">Need help with your membership or account? Our support team is here for you.</p>
               <button className="w-full py-4 bg-white text-quins-blue border border-quins-blue/20 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-quins-blue hover:text-white transition">
                  Contact Support
               </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

// Re-using types for inline components or sub-sections
const LayoutDashboard = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="7" height="9" />
    <rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" />
    <rect x="3" y="16" width="7" height="5" />
  </svg>
);

export default MemberDashboard;
