import React, { useState } from 'react';
import { PLAYERS } from '../constants';
import { Player } from '../types';

const Teams: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'men' | 'women' | 'sevens'>('men');

  const filteredPlayers = PLAYERS; // In a real app, filter by category

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-slate-900 py-16 text-center text-white">
        <h1 className="text-4xl font-extrabold uppercase tracking-tight mb-2">The Squads</h1>
        <p className="text-gray-400">Meet the warriors defending the Quins badge.</p>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-lg shadow-lg p-2 inline-flex mb-12">
           <button 
             onClick={() => setActiveTab('men')}
             className={`px-6 py-2 rounded-md font-bold text-sm uppercase transition ${activeTab === 'men' ? 'bg-quins-magenta text-white' : 'text-slate-600 hover:bg-gray-100'}`}
           >
             Men's XV
           </button>
           <button 
             onClick={() => setActiveTab('sevens')}
             className={`px-6 py-2 rounded-md font-bold text-sm uppercase transition ${activeTab === 'sevens' ? 'bg-quins-blue text-white' : 'text-slate-600 hover:bg-gray-100'}`}
           >
             Sevens
           </button>
           <button 
             onClick={() => setActiveTab('women')}
             className={`px-6 py-2 rounded-md font-bold text-sm uppercase transition ${activeTab === 'women' ? 'bg-quins-chocolate text-white' : 'text-slate-600 hover:bg-gray-100'}`}
           >
             Women
           </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
           {filteredPlayers.map((player) => (
             <div key={player.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group">
                <div className="relative h-80 overflow-hidden">
                   <img src={player.image} alt={player.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500" />
                   <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900 to-transparent opacity-80"></div>
                   <div className="absolute bottom-4 left-4 text-white">
                      {player.role && (
                          <span className="bg-quins-blue text-xs font-bold px-2 py-1 rounded uppercase mb-2 inline-block">{player.role}</span>
                      )}
                      <h3 className="text-xl font-bold leading-none">{player.name}</h3>
                      <p className="text-gray-300 text-sm mt-1">{player.position}</p>
                   </div>
                </div>
                <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                    <span>Height: 1.88m</span>
                    <span>Weight: 105kg</span>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Teams;