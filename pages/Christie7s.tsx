import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Music, Utensils, Users, ArrowRight, ShieldCheck, Star, Zap } from 'lucide-react';

const Christie7s: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mens' | 'womens' | 'age' | 'veterans'>('mens');

  const tournaments = {
    mens: {
      title: "Men’s Tournament – Div 1 and Div 2",
      description: "The top men’s team in the country battle for the crown. Div 1 teams play for the Christie 7s 2025 championship. Div 2 teams play for promotion to Div 1 as part of the player pathway strategy for rugby 7s.",
      stats: [
        { label: "36 Teams", icon: <Users size={16} /> },
        { label: "2 pitches", icon: <ShieldCheck size={16} /> },
        { label: "256 players", icon: <Users size={16} /> },
        { label: "2 days", icon: <Zap size={16} /> }
      ],
      image: "/assets/kh/Hero/H1.jpg"
    },
    womens: {
      title: "Women’s Tournament",
      description: "Women’s 7s rugby is experiencing significant growth globally, with increased participation, investment, and media attention. Kenya Harlequin is actively investing in the sport’s development, including a high level Christie 7s tournament and initiatives to grow the women’s game.",
      stats: [
        { label: "8 teams", icon: <Users size={16} /> },
        { label: "2 pitches", icon: <ShieldCheck size={16} /> },
        { label: "96 players", icon: <Users size={16} /> },
        { label: "2 days", icon: <Zap size={16} /> }
      ],
      image: "/assets/kh/Hero/H2.PNG"
    },
    age: {
      title: "Under 16s tournament",
      description: "Age grade rugby is crucial for the long-term development and enjoyment of the sport. It prioritises player-centered development, ensuring a safe, fun, and inclusive environment for young players to learn and grow, both as individuals and as rugby players.",
      stats: [
        { label: "16 Teams", icon: <Users size={16} /> },
        { label: "1 pitch", icon: <ShieldCheck size={16} /> },
        { label: "192 players", icon: <Users size={16} /> },
        { label: "1 day", icon: <Zap size={16} /> }
      ],
      image: "/assets/kh/Hero/H3.PNG"
    },
    veterans: {
      title: "Golden Oldies",
      description: "We’re rolling back the years with the Christie 7s veterans’ tournament. Featuring players over the age of 35 this tournament is a high quality competition featuring the stars that dazzled the world and the country. All profits go towards supporting the age grade tournament.",
      stats: [
        { label: "8 teams", icon: <Users size={16} /> },
        { label: "Over 35s", icon: <Star size={16} /> },
        { label: "96 players", icon: <Users size={16} /> },
        { label: "Young at heart", icon: <Zap size={16} /> }
      ],
      image: "/assets/kh/Hero/H4.PNG"
    }
  };

  return (
    <div className="bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/assets/kh/Hero/H5.jpg" 
            alt="Christie 7s Action" 
            className="w-full h-full object-cover opacity-50 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent"></div>
        </div>
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="max-w-3xl border-l-4 border-quins-blue pl-8">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 leading-none">
              This One <br/>Is <span className="text-quins-blue">Ours!</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-8 italic">
              "Christie 7s is more than a tournament. It’s tradition. It’s community. It’s passion. It’s pride. It’s panache. This isn’t about one player, one team, one moment. It’s about all of us."
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/tickets" className="px-8 py-4 bg-quins-blue hover:bg-sky-600 text-white font-bold rounded uppercase transition tracking-widest shadow-xl">
                Buy Tickets
              </Link>
              <a href="#history" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded uppercase transition backdrop-blur-md">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section id="history" className="py-24 bg-slate-900 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-quins-magenta text-white text-xs font-black uppercase tracking-[0.3em] mb-6">
                EST. 1964
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-8 leading-tight">
                Africa's Premier <br/>Rugby 7s Tournament
              </h2>
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  First played in 1964, the Christie 7s is Kenya’s and Africa’s premier rugby 7s club tournament. It is amongst the oldest and most prestigious rugby 7s tournaments in the world.
                </p>
                <p>
                  Owned and delivered by Kenya Harlequins Football Club, the 60th edition in 2025 will feature four distinct tournaments in one massive festival of rugby.
                </p>
                <p>
                  Quins remains one of the most successful, admired, and respected sports clubs in Africa, and Christie 7s is our flagship event that brings the world to the RFUEA Ground.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-quins-blue opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-quins-magenta opacity-20 blur-3xl"></div>
              <img 
                src="/assets/kh/Hero/H6.jpg" 
                alt="Historical Quins" 
                className="rounded-lg shadow-2xl relative z-10 border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tournament Tabs */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl font-black uppercase mb-4 tracking-widest">Four Tournaments, One Crown</h2>
          <div className="h-1.5 w-24 bg-quins-blue mx-auto"></div>
        </div>

        <div className="container mx-auto px-4">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {(Object.keys(tournaments) as Array<keyof typeof tournaments>).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 ${
                  activeTab === key 
                  ? 'bg-quins-blue text-white shadow-lg scale-105' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {key === 'mens' ? 'Men’s' : key === 'womens' ? 'Women’s' : key === 'age' ? 'Age Grade' : 'Veterans'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/5 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 md:p-16 flex flex-col justify-center">
                <h3 className="text-3xl font-black uppercase mb-6 text-white tracking-tight leading-tight">
                  {tournaments[activeTab].title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-10">
                  {tournaments[activeTab].description}
                </p>
                <div className="grid grid-cols-2 gap-6 mb-10">
                  {tournaments[activeTab].stats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                      <div className="text-quins-blue bg-quins-blue/10 p-2 rounded-lg">
                        {stat.icon}
                      </div>
                      <span className="text-sm font-bold uppercase tracking-widest text-gray-300">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div>
                  <Link 
                    to="/tickets" 
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-950 font-black uppercase rounded-lg hover:bg-gray-200 transition tracking-widest shadow-xl"
                  >
                    Buy Tickets <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
              <div className="h-[400px] lg:h-auto relative">
                <img 
                  src={tournaments[activeTab].image} 
                  alt={tournaments[activeTab].title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent lg:hidden"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Festival Experience */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-quins-magenta opacity-5 blur-[100px] -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-quins-blue opacity-5 blur-[100px] translate-y-1/2"></div>

        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">The Greatest Show in Town</h2>
            <p className="text-gray-400 text-xl font-light">More than just rugby – it's an unforgettable experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Festival Vibe */}
            <div className="group bg-slate-950/50 p-8 rounded-2xl border border-white/5 hover:border-quins-blue transition duration-500">
              <div className="w-16 h-16 bg-quins-blue/10 rounded-2xl flex items-center justify-center text-quins-blue mb-8 group-hover:scale-110 transition duration-500">
                <Music size={32} />
              </div>
              <h4 className="text-2xl font-bold uppercase mb-4 tracking-tight">Festival Vibe</h4>
              <p className="text-gray-400 leading-relaxed">
                Music and DJs, face painting and costumes encouraged! The party starts with the first whistle and goes on all day.
              </p>
            </div>

            {/* Food and Drink */}
            <div className="group bg-slate-950/50 p-8 rounded-2xl border border-white/5 hover:border-quins-magenta transition duration-500">
              <div className="w-16 h-16 bg-quins-magenta/10 rounded-2xl flex items-center justify-center text-quins-magenta mb-8 group-hover:scale-110 transition duration-500">
                <Utensils size={32} />
              </div>
              <h4 className="text-2xl font-bold uppercase mb-4 tracking-tight">Food & Drink</h4>
              <p className="text-gray-400 leading-relaxed">
                From street food to traditional fan favourites, we cater to all dietary needs with something delicious for everyone.
              </p>
            </div>

            {/* Family Zone */}
            <div className="group bg-slate-950/50 p-8 rounded-2xl border border-white/5 hover:border-quins-chocolate transition duration-500">
              <div className="w-16 h-16 bg-quins-chocolate/10 rounded-2xl flex items-center justify-center text-quins-chocolate mb-8 group-hover:scale-110 transition duration-500">
                <Users size={32} />
              </div>
              <h4 className="text-2xl font-bold uppercase mb-4 tracking-tight">Family Zone</h4>
              <p className="text-gray-400 leading-relaxed">
                Designed with families in mind, a section bursting with fun activities for all ages to enjoy the electric atmosphere.
              </p>
            </div>

            {/* Executive Lounge */}
            <div className="group bg-slate-950/50 p-8 rounded-2xl border border-white/5 hover:border-quins-green transition duration-500">
              <div className="w-16 h-16 bg-quins-green/10 rounded-2xl flex items-center justify-center text-quins-green mb-8 group-hover:scale-110 transition duration-500">
                <Trophy size={32} />
              </div>
              <h4 className="text-2xl font-bold uppercase mb-4 tracking-tight">Executive Lounge</h4>
              <p className="text-gray-400 leading-relaxed">
                Open to VIP ticket holders, providing a relaxing, hospitality-focused space in a calm and reassuring atmosphere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tickets Section */}
      <section className="py-24 bg-slate-950 border-t border-white/5">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">Feel The Rhythm, Feel The Ride</h2>
          <p className="text-gray-400 text-xl">The Greatest Rugby Festival In Town</p>
        </div>

        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
          {/* Regular */}
          <div className="bg-green-700/20 border border-green-500/30 p-10 rounded-3xl flex flex-col items-center group hover:bg-green-700/30 transition duration-500">
            <h3 className="text-2xl font-black uppercase mb-2 text-green-400">Regular</h3>
            <p className="text-gray-400 mb-8 italic">"Rugby, festival, good vibes!"</p>
            <div className="text-5xl font-black mb-8 text-white">KES 450</div>
            <ul className="space-y-4 mb-10 text-left w-full">
              <li className="flex items-center gap-3 text-gray-300 font-bold"><ShieldCheck className="text-green-500" size={18} /> KES 450 – Early Bird</li>
              <li className="flex items-center gap-3 text-gray-300 font-bold"><ShieldCheck className="text-green-500" size={18} /> KES 650 – Advance</li>
              <li className="flex items-center gap-3 text-gray-300 font-bold"><ShieldCheck className="text-green-500" size={18} /> KES 800 – Gate</li>
            </ul>
            <Link to="/tickets" className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase rounded-xl transition text-center tracking-widest border border-white/10">
              Buy Now
            </Link>
          </div>

          {/* VIP */}
          <div className="bg-sky-700/20 border border-sky-500/30 p-10 rounded-3xl flex flex-col items-center group hover:bg-sky-700/30 transition duration-500 scale-105 shadow-2xl">
            <h3 className="text-2xl font-black uppercase mb-2 text-sky-400">VIP</h3>
            <p className="text-gray-400 mb-8 italic">"Enjoy our executive hospitality."</p>
            <div className="text-5xl font-black mb-8 text-white">KES 2500</div>
            <ul className="space-y-4 mb-10 text-left w-full">
              <li className="flex items-center gap-3 text-gray-300 font-bold"><ShieldCheck className="text-sky-500" size={18} /> KES 2,500 – Early Bird</li>
              <li className="flex items-center gap-3 text-gray-300 font-bold"><ShieldCheck className="text-sky-500" size={18} /> KES 3,000 – Advance</li>
              <li className="flex items-center gap-3 text-gray-300 font-bold"><ShieldCheck className="text-sky-500" size={18} /> KES 4,000 – Gate</li>
            </ul>
            <Link to="/tickets" className="w-full py-4 bg-quins-blue hover:bg-sky-600 text-white font-black uppercase rounded-xl transition text-center tracking-widest shadow-lg">
              Buy Now
            </Link>
          </div>

          {/* Tailgate */}
          <div className="bg-slate-800/40 border border-white/10 p-10 rounded-3xl flex flex-col items-center group hover:bg-slate-800/60 transition duration-500">
            <h3 className="text-2xl font-black uppercase mb-2 text-gray-300">Tailgate</h3>
            <p className="text-gray-400 mb-8 italic">"Upgrade your game day."</p>
            <div className="text-5xl font-black mb-8 text-white">KES 5000</div>
            <ul className="space-y-4 mb-10 text-left w-full">
              <li className="flex items-center gap-3 text-gray-300 font-bold"><ShieldCheck className="text-white" size={18} /> KES 5,000 solo pass</li>
              <li className="flex items-center gap-3 text-gray-300 font-bold"><ShieldCheck className="text-white" size={18} /> KES 14,250 squad of three</li>
              <li className="flex items-center gap-3 text-gray-300 font-bold"><ShieldCheck className="text-white" size={18} /> KES 22,500 squad of five</li>
            </ul>
            <Link to="/tickets" className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-black uppercase rounded-xl transition text-center tracking-widest border border-white/10">
              Buy Now
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          {/* Diamond Sponsors */}
          <div className="mb-24 text-center">
            <h3 className="text-3xl font-black uppercase mb-12 tracking-[0.4em] text-white">Diamond Sponsors</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center justify-items-center">
              {['Minet', 'CHLORIDE EXIDE', 'SportPesa', 'TUSKER'].map(s => (
                <div key={s} className="group relative w-full aspect-square bg-white rounded-2xl flex items-center justify-center p-8 transition-transform hover:scale-105 duration-500 shadow-[0_0_40px_rgba(255,255,255,0.05)]">
                   <div className="text-xl font-black uppercase tracking-tighter text-slate-900 text-center">
                     {s}
                   </div>
                   <div className="absolute inset-0 border-4 border-transparent group-hover:border-white/20 rounded-2xl transition duration-500"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Gold Sponsors */}
          <div className="mb-20">
            <h3 className="text-2xl font-black uppercase mb-12 text-center tracking-[0.3em] text-gray-400">Gold Sponsors</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-70">
              {['ROHTO', 'NATION MEDIA', 'ABSA', 'PROTEL STUDIOS', 'AS SPORTS', 'CROWN'].map(s => (
                <div key={s} className="text-sm font-black uppercase tracking-widest text-white p-4 border border-white/5 rounded-lg w-full text-center hover:opacity-100 transition">
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Silver Sponsors */}
          <div className="mb-20">
            <h3 className="text-2xl font-black uppercase mb-12 text-center tracking-[0.3em] text-gray-400">Silver Sponsors</h3>
            <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
              {['Agulu Lounge', 'QONA', 'SANLOO'].map(s => (
                <div key={s} className="text-lg font-black uppercase tracking-widest text-white px-8 py-4 border border-white/5 rounded-lg hover:opacity-100 transition">
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Bronze Sponsors */}
          <div className="mb-20">
            <h3 className="text-2xl font-black uppercase mb-12 text-center tracking-[0.3em] text-gray-400">Bronze Sponsors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-50">
              {['AMARA', 'WELLS FARGO', 'mookh.', 'Eco can'].map(s => (
                <div key={s} className="text-sm font-black uppercase tracking-widest text-white hover:opacity-100 transition">
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Tournament Partners */}
          <div>
            <h3 className="text-2xl font-black uppercase mb-12 text-center tracking-[0.3em] text-gray-400">Tournament Partners</h3>
            <div className="flex flex-wrap justify-center gap-12 items-center opacity-40">
              {['TISINI', 'BiJON', 'African Women\'s Rugby', 'BASERCAP', 'Archtron', 'G4', 'Crying Stone Media'].map(s => (
                <div key={s} className="text-xs font-black uppercase tracking-[0.2em] text-white hover:opacity-100 transition">
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ticket CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-quins-blue opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 tracking-tighter">
            Don’t Miss the <span className="text-quins-blue">Magic</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12">
            Be part of the 60th edition of Christie 7s. Tickets are moving fast. Secure yours now and join the legacy.
          </p>
          <Link 
            to="/tickets" 
            className="inline-block px-12 py-5 bg-white text-slate-950 font-black uppercase text-xl rounded hover:bg-gray-200 transition shadow-[0_0_50px_rgba(255,255,255,0.2)] tracking-[0.2em]"
          >
            Get Your Tickets Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Christie7s;
