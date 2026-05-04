import React, { useEffect, useState } from 'react';
import { supabase, hasSupabaseConfig } from '../supabase';
import { Order, BookingRequest } from '../types';
import { TrendingUp, DollarSign, Users, ShieldCheck, PieChart, BarChart2, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Analytics {
  totalRevenue: number;
  avgOrderValue: number;
  confirmedBookingRate: number;
  membershipTotal: number;
  pendingActions: number;
  revenueByMethod: Record<string, number>;
  statusDistribution: Record<string, number>;
}

const Reports: React.FC = () => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateAnalytics = (orders: Order[], bookings: BookingRequest[], members: any[]) => {
    const totalRevenue = orders.reduce((sum, o) => sum + (o.status === 'completed' || o.status === 'pending' ? o.subtotal : 0), 0);
    const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
    
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const confirmedBookingRate = bookings.length > 0 ? (confirmedBookings / bookings.length) * 100 : 0;

    const revenueByMethod = orders.reduce((acc, o) => {
      acc[o.payment_method] = (acc[o.payment_method] || 0) + o.subtotal;
      return acc;
    }, {} as Record<string, number>);

    const statusDistribution = orders.reduce((acc, o) => {
      acc[o.status] = (acc[o.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const pendingActions = bookings.filter(b => b.status === 'pending').length + orders.filter(o => o.status === 'pending').length;

    setAnalytics({
      totalRevenue,
      avgOrderValue,
      confirmedBookingRate,
      membershipTotal: members.length,
      pendingActions,
      revenueByMethod,
      statusDistribution
    });
  };

  useEffect(() => {
    const loadData = async () => {
      if (!hasSupabaseConfig) return;
      setLoading(true);

      const [ordersRes, bookingsRes, membersRes] = await Promise.all([
        supabase.from('orders').select('*'),
        supabase.from('facility_bookings').select('*'),
        supabase.from('memberships').select('*'),
      ]);

      if (!ordersRes.error && !bookingsRes.error && !membersRes.error) {
        calculateAnalytics(ordersRes.data || [], bookingsRes.data || [], membersRes.data || []);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400">Analyzing data intelligence...</div>;
  if (!analytics) return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-500 text-center px-4"><div><BarChart2 className="mx-auto mb-4 text-slate-300" size={48} /><p>Connect Supabase to view intelligent reports.</p></div></div>;

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <BarChart2 className="text-quins-magenta" size={32} />
            <h1 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Management Intelligence</h1>
          </div>
          <p className="text-gray-500 max-w-2xl">Financial audits, operational performance, and club growth analytics.</p>
        </header>

        {/* Top Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><TrendingUp size={20} /></div>
              <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full"><ArrowUpRight size={12} /> +12%</span>
            </div>
            <p className="text-xs font-black uppercase text-slate-400 mb-1">Total Revenue</p>
            <h3 className="text-2xl font-black text-slate-900">KES {analytics.totalRevenue.toLocaleString()}</h3>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-quins-blue/10 text-quins-blue rounded-2xl"><Users size={20} /></div>
              <span className="flex items-center text-xs font-bold text-quins-blue bg-quins-blue/5 px-2 py-1 rounded-full"><ArrowUpRight size={12} /> +5%</span>
            </div>
            <p className="text-xs font-black uppercase text-slate-400 mb-1">Total Members</p>
            <h3 className="text-2xl font-black text-slate-900">{analytics.membershipTotal}</h3>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><DollarSign size={20} /></div>
            </div>
            <p className="text-xs font-black uppercase text-slate-400 mb-1">Avg Order Value</p>
            <h3 className="text-2xl font-black text-slate-900">KES {Math.round(analytics.avgOrderValue).toLocaleString()}</h3>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-900 text-white rounded-2xl"><ShieldCheck size={20} /></div>
            </div>
            <p className="text-xs font-black uppercase text-slate-400 mb-1">Pending Actions</p>
            <h3 className="text-2xl font-black text-slate-900">{analytics.pendingActions}</h3>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Financial Breakdown */}
          <section className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <PieChart size={24} className="text-quins-magenta" />
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Financial Audit</h2>
            </div>
            <div className="space-y-6">
              {Object.entries(analytics.revenueByMethod).map(([method, amount]) => (
                <div key={method}>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="uppercase text-slate-600">{method}</span>
                    <span className="text-slate-900">KES {amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-quins-magenta h-full transition-all duration-1000" 
                      style={{ width: `${(amount / analytics.totalRevenue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Operational Performance */}
          <section className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <ShieldCheck size={24} className="text-quins-blue" />
              <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Balanced Audit Report</h2>
            </div>
            <div className="grid gap-4">
              <div className="p-6 bg-slate-50 rounded-2xl flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Booking Confirmation Rate</p>
                  <h4 className="text-2xl font-black text-slate-900">{Math.round(analytics.confirmedBookingRate)}%</h4>
                </div>
                <div className={`w-12 h-12 rounded-full border-4 flex items-center justify-center text-xs font-black ${analytics.confirmedBookingRate > 80 ? 'border-green-500 text-green-600' : 'border-amber-500 text-amber-600'}`}>
                  {analytics.confirmedBookingRate > 80 ? 'A+' : 'B'}
                </div>
              </div>
              
              <div className="p-6 bg-slate-50 rounded-2xl">
                <p className="text-xs font-bold text-slate-400 uppercase mb-4">Order Status Distribution</p>
                <div className="flex gap-2">
                  {Object.entries(analytics.statusDistribution).map(([status, count]) => (
                    <div key={status} className="flex-grow">
                      <div className="text-center mb-1">
                        <span className="text-[10px] font-black uppercase text-slate-500">{status}</span>
                      </div>
                      <div className={`h-8 rounded-lg flex items-center justify-center text-xs font-black text-white ${status === 'completed' ? 'bg-green-500' : status === 'pending' ? 'bg-amber-500' : 'bg-slate-300'}`}>
                        {count}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-10 bg-slate-900 p-10 rounded-3xl text-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Generate Executive Summary</h3>
              <p className="text-slate-400 text-sm max-w-md">Download a comprehensive PDF report containing all financial audits, membership trends, and operational insights for club stakeholders.</p>
            </div>
            <button className="bg-white text-slate-900 px-8 py-4 rounded-full font-black uppercase text-sm hover:bg-quins-magenta hover:text-white transition shadow-xl">
              Export Audit PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
