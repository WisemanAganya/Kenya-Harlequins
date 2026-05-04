import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Trophy, Users } from 'lucide-react';
import { MATCHES, NEWS, PARTNERS } from '../constants';

const Home: React.FC = () => {
  const nextMatch = MATCHES.find(m => m.status === 'upcoming') || MATCHES[0];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/1920/1080?random=100" 
            alt="Quins Action" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start pt-20">
          <div className="inline-block px-3 py-1 bg-quins-magenta text-white text-xs font-bold uppercase tracking-wider mb-4 rounded-sm">
            Est. 1951
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            SURE.<br/>
            <span className="text-quins-blue">STRONG.</span><br/>
            SUPERIOR.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-xl">
            Welcome to the home of Kenya Harlequins RFC. Join the legacy of champions at the RFUEA Ground.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/fixtures" className="px-8 py-3 bg-quins-blue hover:bg-sky-600 text-white font-bold rounded-md transition text-center">
              View Fixtures
            </Link>
            <Link to="/membership" className="px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-slate-900 text-white font-bold rounded-md transition text-center">
              Become a Member
            </Link>
          </div>
        </div>
      </section>

      {/* Next Match Ticker */}
      <div className="bg-quins-magenta text-white py-6">
        <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="font-bold uppercase tracking-widest text-sm bg-white/20 px-2 py-1 rounded">Next Match</span>
                    <span className="text-sm opacity-90">{nextMatch.competition}</span>
                </div>
                <div className="flex items-center gap-8 font-bold text-xl md:text-2xl">
                    <span className="text-right">{nextMatch.homeTeam}</span>
                    <span className="px-3 py-1 bg-slate-900 rounded text-base">VS</span>
                    <span className="text-left">{nextMatch.awayTeam}</span>
                </div>
                <div className="flex flex-col md:items-end text-sm">
                    <div className="flex items-center gap-2"><Calendar size={14}/> {nextMatch.date} - {nextMatch.time}</div>
                    <div className="flex items-center gap-2"><MapPin size={14}/> {nextMatch.venue}</div>
                </div>
                <Link to="/tickets" className="hidden md:block px-4 py-2 bg-slate-900 hover:bg-slate-800 rounded text-xs font-bold uppercase transition">
                    Buy Tickets
                </Link>
            </div>
        </div>
      </div>

      {/* Latest News */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 uppercase mb-2">Latest News</h2>
              <div className="h-1 w-20 bg-quins-blue"></div>
            </div>
            <Link to="/news" className="text-quins-blue font-bold flex items-center gap-2 hover:underline">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWS.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4 shadow-md">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-quins-chocolate text-white text-xs font-bold px-3 py-1 rounded uppercase">
                    {item.category}
                  </div>
                </div>
                <div className="text-sm text-gray-500 mb-2">{item.date}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-quins-blue transition">{item.title}</h3>
                <p className="text-gray-600 line-clamp-2">{item.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Banner */}
      <section className="py-16 bg-slate-100">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-400 mb-12">Club Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-quins-blue text-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                        <Trophy size={32} />
                    </div>
                    <h3 className="text-2xl font-black uppercase text-slate-900 mb-2">Sure</h3>
                    <p className="text-gray-600 max-w-xs">Reliability and consistency. Dependable performance on and off the field.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-quins-magenta text-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                        <Users size={32} />
                    </div>
                    <h3 className="text-2xl font-black uppercase text-slate-900 mb-2">Strong</h3>
                    <p className="text-gray-600 max-w-xs">Physical and mental fortitude. Unity and strength in team cohesion.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-quins-chocolate text-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                        <Trophy size={32} />
                    </div>
                    <h3 className="text-2xl font-black uppercase text-slate-900 mb-2">Superior</h3>
                    <p className="text-gray-600 max-w-xs">Excellence in all endeavors. Pursuit of the highest standards in rugby.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-quins-magenta opacity-10 skew-x-12 transform translate-x-20"></div>
          <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                  <h2 className="text-4xl font-bold mb-4">Be Part of the Legacy</h2>
                  <p className="text-gray-300 text-lg mb-8">
                      Join Kenya Harlequins RFC today. Enjoy exclusive benefits, match access, and support the growth of rugby in Kenya.
                  </p>
                  <Link to="/membership" className="inline-block px-8 py-4 bg-white text-slate-900 font-bold rounded hover:bg-gray-200 transition">
                      View Membership Packages
                  </Link>
              </div>
              <div className="md:w-1/2 flex justify-center">
                   {/* Abstract graphic representing community */}
                   <div className="grid grid-cols-2 gap-4 opacity-80">
                      <div className="w-32 h-32 bg-quins-blue rounded-lg"></div>
                      <div className="w-32 h-32 bg-quins-green rounded-lg mt-8"></div>
                      <div className="w-32 h-32 bg-quins-chocolate rounded-lg -mt-8"></div>
                      <div className="w-32 h-32 bg-white rounded-lg"></div>
                   </div>
              </div>
          </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 mb-4">Our Partners & Sponsors</h2>
            <div className="h-1 w-12 bg-quins-magenta mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-items-center opacity-70 hover:opacity-100 transition-opacity duration-500">
            {PARTNERS.map((partner) => (
              <a 
                key={partner.name} 
                href={partner.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex flex-col items-center gap-4 transition-transform hover:scale-110"
                title={partner.name}
              >
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  className="h-16 md:h-20 w-auto object-contain filter grayscale group-hover:grayscale-0 transition duration-300"
                  onError={(e) => {
                    // Fallback to text if logo fails to load
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <span className="hidden text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-quins-magenta transition text-center">
                  {partner.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;