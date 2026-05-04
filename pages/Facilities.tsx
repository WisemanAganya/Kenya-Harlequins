import React, { useState } from 'react';
import { FACILITIES } from '../constants';
import { supabase, hasSupabaseConfig } from '../supabase';
import { BookingRequest } from '../types';

const Facilities: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [facility, setFacility] = useState(FACILITIES[0]?.name || '');
  const [eventDate, setEventDate] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setMessage('');
    setLoading(true);

    const request: BookingRequest = {
      name,
      email,
      phone,
      facility,
      event_date: eventDate,
      notes,
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    if (hasSupabaseConfig) {
      const { error } = await supabase.from('facility_bookings').insert([request]);
      if (error) {
        setMessage('There was a problem submitting your booking. Please try again later.');
      } else {
        setMessage('Your facility booking request has been submitted successfully. Our events team will contact you.');
        setName('');
        setEmail('');
        setPhone('');
        setEventDate('');
        setNotes('');
      }
    } else {
      setMessage('Facility booking feature is available once Supabase credentials are configured in .env.local.');
    }

    setLoading(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] items-start">
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10">
              <h1 className="text-4xl font-extrabold text-slate-900 uppercase mb-4">Book Facilities & Parking</h1>
              <p className="text-gray-600 max-w-2xl">
                Hire the club pitch, event hall, training facilities or reserve match day parking. We support booking for regular matches, post-season events and the Christie Sevens series.
              </p>
            </div>

            <div className="space-y-6">
              {FACILITIES.map((item) => (
                <div key={item.name} className="border border-slate-200 rounded-3xl p-6 bg-white shadow-sm">
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{item.name}</h2>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-quins-magenta font-bold text-lg">KES {item.price.toLocaleString()}</p>
                      <p className="text-xs uppercase tracking-wide text-gray-400">{item.unit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Booking Request</h2>
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Full Name</span>
                <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-quins-blue focus:ring-quins-blue/20 outline-none" />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Email Address</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-quins-blue focus:ring-quins-blue/20 outline-none" />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Phone Number</span>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-quins-blue focus:ring-quins-blue/20 outline-none" />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Facility</span>
                <select value={facility} onChange={(e) => setFacility(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-quins-blue focus:ring-quins-blue/20 outline-none">
                  {FACILITIES.map((item) => (
                    <option key={item.name} value={item.name}>{item.name}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Event Date</span>
                <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-quins-blue focus:ring-quins-blue/20 outline-none" />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700">Additional Notes</span>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4} className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 focus:border-quins-blue focus:ring-quins-blue/20 outline-none" />
              </label>
              <button onClick={handleSubmit} disabled={loading} className="w-full rounded-full bg-quins-magenta text-white py-3 font-bold shadow-sm hover:bg-pink-700 transition disabled:opacity-60">
                {loading ? 'Submitting...' : 'Submit Booking Request'}
              </button>
              {message && <p className="text-sm text-gray-700">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facilities;
