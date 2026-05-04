import React from 'react';
import { MATCHES } from '../constants';
import { Calendar, MapPin, Clock } from 'lucide-react';

const Fixtures: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-extrabold text-slate-900 uppercase mb-8 border-l-8 border-quins-blue pl-4">Fixtures & Results</h1>

        <div className="bg-white rounded-xl shadow overflow-hidden">
           {/* Table Header for Desktop */}
           <div className="hidden md:grid grid-cols-12 bg-slate-100 p-4 font-bold text-slate-600 text-sm uppercase tracking-wider border-b">
              <div className="col-span-2">Date</div>
              <div className="col-span-4 text-center">Match</div>
              <div className="col-span-3 text-center">Competition</div>
              <div className="col-span-3 text-right">Venue</div>
           </div>

           {/* Matches List */}
           <div className="divide-y divide-gray-100">
             {MATCHES.map((match) => (
               <div key={match.id} className="p-6 md:p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center hover:bg-slate-50 transition">
                  {/* Date Mobile/Desktop */}
                  <div className="col-span-1 md:col-span-2 flex md:flex-col items-center md:items-start gap-2 md:gap-0">
                      <div className="font-bold text-slate-900">{new Date(match.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1"><Clock size={12}/> {match.time}</div>
                  </div>

                  {/* Match Teams */}
                  <div className="col-span-1 md:col-span-4 flex justify-between md:justify-center items-center gap-4">
                      <span className={`flex-1 text-right font-bold ${match.homeTeam.includes('Harlequins') ? 'text-slate-900' : 'text-gray-500'}`}>{match.homeTeam}</span>
                      
                      {match.status === 'completed' ? (
                          <span className="bg-slate-900 text-white px-3 py-1 rounded font-mono font-bold text-sm min-w-[80px] text-center">{match.result}</span>
                      ) : (
                          <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded text-xs font-bold uppercase min-w-[80px] text-center">VS</span>
                      )}
                      
                      <span className={`flex-1 text-left font-bold ${match.awayTeam.includes('Harlequins') ? 'text-slate-900' : 'text-gray-500'}`}>{match.awayTeam}</span>
                  </div>

                  {/* Competition */}
                  <div className="col-span-1 md:col-span-3 text-center">
                      <span className="inline-block px-2 py-1 bg-quins-magenta/10 text-quins-magenta text-xs font-bold rounded uppercase">
                          {match.competition}
                      </span>
                  </div>

                  {/* Venue */}
                  <div className="col-span-1 md:col-span-3 md:text-right text-gray-500 text-sm flex md:justify-end items-center gap-1">
                      <MapPin size={14} /> {match.venue}
                  </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Fixtures;