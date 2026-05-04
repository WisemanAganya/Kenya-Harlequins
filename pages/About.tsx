import React from 'react';
import { Award, Clock, Shield } from 'lucide-react';
import { EXECUTIVE_COMMITTEE, TECHNICAL_BENCH } from '../constants';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Club Heritage</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            "Nunquam Dormio" - I Never Sleep
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
            <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6 uppercase border-l-4 border-quins-magenta pl-4">Our History</h2>
                <div className="prose text-gray-600 space-y-4">
                    <p>
                        Established in 1951, Kenya Harlequin Football Club (Kenya Harlequins RFC) has stood as a pillar of Kenyan rugby for over seven decades. 
                        Located along Ngong Road, Nairobi, at the iconic RFUEA Ground, the club has a rich tradition of excellence.
                    </p>
                    <p>
                        We maintain a proud affiliation with the global Harlequins family, a relationship that began in 1952 with London Harlequins FC. 
                        Our motto, <span className="font-bold text-slate-900">"Sure, Strong, Superior"</span> (#SSS), guides our conduct both on and off the pitch.
                    </p>
                    <p>
                        Over the years, Quins has produced numerous international players for the Kenya Simbas (15s) and Shujaa (7s), contributing significantly to the growth of rugby in East Africa.
                    </p>
                </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                 <img src="https://picsum.photos/800/800?random=50" alt="Historic Quins Team" className="absolute inset-0 w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                     <span className="text-white font-bold text-lg">RFUEA Ground - Our Fortress</span>
                 </div>
            </div>
        </div>

        {/* Executive Leadership */}
        <div className="mb-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center uppercase tracking-tight">Executive Committee</h2>
            <p className="text-center text-gray-500 max-w-4xl mx-auto mb-12">
                Joining Sudi on the Executive Committee are newly elected members Mr. Terrence Adembesa, Vice Chairman, Ms. Nekesa Were, Hon Secretary, Ms. Peris Mukoko, Hon Treasurer, and Mr. Dennis Begisen who was re-elected as Grounds Director and Mr. Joel Ng’ang’a who continues as Director of Rugby.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                 {EXECUTIVE_COMMITTEE.map((leader, index) => (
                     <div key={index} className="bg-white group">
                         <div className="relative h-64 rounded-2xl overflow-hidden mb-4 shadow-sm border border-gray-100">
                             <img src={leader.image} alt={leader.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500" />
                             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                         </div>
                         <h3 className="font-bold text-slate-900 text-sm">{leader.name}</h3>
                         <p className="text-[10px] font-black uppercase text-quins-magenta tracking-widest mt-1">{leader.role}</p>
                     </div>
                 ))}
            </div>
        </div>

        {/* Technical Bench */}
        <div className="mb-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center uppercase tracking-tight">Technical Bench</h2>
            <p className="text-center text-gray-500 mb-12 uppercase text-xs font-bold tracking-widest">2024/25 Kenya Harlequin Staff</p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                 {TECHNICAL_BENCH.map((staff, index) => (
                     <div key={index} className="bg-white group">
                         <div className="relative h-72 rounded-2xl overflow-hidden mb-4 shadow-sm border border-gray-100">
                             <img src={staff.image} alt={staff.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                             <div className="absolute bottom-4 left-4 right-4">
                                 <p className="text-[10px] font-black uppercase text-white tracking-widest leading-tight">{staff.role}</p>
                             </div>
                         </div>
                         <h3 className="font-bold text-slate-900">{staff.name}</h3>
                     </div>
                 ))}
            </div>
        </div>

        {/* Honours */}
        <div className="bg-slate-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center uppercase">Club Honours</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                <div className="p-6 bg-white rounded-xl shadow-sm">
                    <Award size={40} className="mx-auto text-quins-magenta mb-4" />
                    <h3 className="font-bold text-xl mb-2">Kenya Cup</h3>
                    <p className="text-gray-500 text-sm mb-4">Champions</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {['1995', '1996', '1999', '2003', '2008', '2010', '2011', '2012'].map(year => (
                            <span key={year} className="bg-slate-100 px-2 py-1 rounded text-xs font-semibold text-slate-600">{year}</span>
                        ))}
                    </div>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm">
                    <Shield size={40} className="mx-auto text-quins-blue mb-4" />
                    <h3 className="font-bold text-xl mb-2">Enterprise Cup</h3>
                    <p className="text-gray-500 text-sm mb-4">Winners</p>
                    <div className="flex flex-wrap justify-center gap-2">
                         <span className="text-xs text-gray-400">Multiple Titles</span>
                    </div>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm">
                    <Clock size={40} className="mx-auto text-quins-green mb-4" />
                    <h3 className="font-bold text-xl mb-2">Eric Shirley Shield</h3>
                    <p className="text-gray-500 text-sm mb-4">Winners</p>
                    <div className="flex flex-wrap justify-center gap-2">
                         {['1996', '2009'].map(year => (
                            <span key={year} className="bg-slate-100 px-2 py-1 rounded text-xs font-semibold text-slate-600">{year}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;