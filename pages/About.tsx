import React from 'react';
import { Award, Clock, Shield } from 'lucide-react';

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

        {/* Leadership Grid */}
        <div className="mb-20">
            <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center uppercase">Executive Leadership</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                 {[
                     { role: 'Chairman', name: 'Victor Sudi', color: 'bg-slate-800' },
                     { role: 'Director of Rugby', name: 'Joel Ng\'ang\'a', color: 'bg-quins-blue' },
                     { role: 'Head Coach', name: 'Patrice Agunda', color: 'bg-quins-magenta' },
                     { role: 'Club Secretary', name: 'Executive Member', color: 'bg-quins-chocolate' },
                 ].map((leader, index) => (
                     <div key={index} className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition text-center">
                         <div className={`w-20 h-20 mx-auto ${leader.color} rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold`}>
                             {leader.name.charAt(0)}
                         </div>
                         <h3 className="font-bold text-lg text-slate-900">{leader.name}</h3>
                         <p className="text-sm text-gray-500 uppercase tracking-wide mt-1">{leader.role}</p>
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