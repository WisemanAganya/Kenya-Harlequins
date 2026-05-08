import React from 'react';
import { Link } from 'react-router-dom';
import { MEMBERSHIP_TIERS } from '../constants';
import { Check } from 'lucide-react';

const Membership: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
       {/* Hero */}
       <div className="bg-slate-900 text-white py-20 text-center">
           <div className="container mx-auto px-4">
               <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Join the Quins Family</h1>
               <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                   Become a member of Kenya Harlequins RFC and enjoy exclusive benefits while supporting the development of rugby.
               </p>
           </div>
       </div>

       {/* Pricing */}
       <div className="container mx-auto px-4 -mt-16 pb-20">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {MEMBERSHIP_TIERS.map((tier, idx) => (
                   <div key={idx} className={`bg-white rounded-2xl shadow-xl overflow-hidden border-t-8 flex flex-col ${tier.recommended ? 'border-quins-magenta transform md:-translate-y-4' : 'border-slate-200'}`}>
                       {tier.recommended && (
                           <div className="bg-quins-magenta text-white text-center text-xs font-bold uppercase py-1">
                               Most Popular
                           </div>
                       )}
                       <div className="p-8 text-center flex-grow">
                           <h3 className="text-2xl font-bold text-slate-900 mb-2">{tier.name}</h3>
                           <div className="text-4xl font-extrabold text-quins-blue mb-6">{tier.price}<span className="text-base text-gray-400 font-normal">/year</span></div>
                           <ul className="space-y-4 text-left mb-8">
                               {tier.benefits.map((benefit, i) => (
                                   <li key={i} className="flex items-start gap-3">
                                       <div className="bg-green-100 text-green-600 rounded-full p-1 mt-0.5">
                                           <Check size={14} />
                                       </div>
                                       <span className="text-gray-600 text-sm">{benefit}</span>
                                   </li>
                               ))}
                           </ul>
                       </div>
                        <div className="p-8 bg-gray-50 mt-auto">
                            <Link to="/auth" className={`block w-full py-3 rounded-lg font-bold transition shadow-sm text-center ${tier.recommended ? 'bg-quins-magenta text-white hover:bg-pink-700' : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-400'}`}>
                                Register Now
                            </Link>
                        </div>
                   </div>
               ))}
           </div>
       </div>

       {/* Benefits Info */}
       <div className="container mx-auto px-4 py-16 text-center">
           <h2 className="text-2xl font-bold mb-8">Why Join?</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               <div className="p-6">
                   <div className="font-bold text-lg mb-2">Community</div>
                   <p className="text-gray-500 text-sm">Be part of a historic community and network with fellow rugby enthusiasts.</p>
               </div>
               <div className="p-6">
                   <div className="font-bold text-lg mb-2">Facilities</div>
                   <p className="text-gray-500 text-sm">Access to world-class training facilities and member-only social areas.</p>
               </div>
               <div className="p-6">
                   <div className="font-bold text-lg mb-2">Voting Rights</div>
                   <p className="text-gray-500 text-sm">Have your say in the club's future at our Annual General Meetings.</p>
               </div>
               <div className="p-6">
                   <div className="font-bold text-lg mb-2">Discounts</div>
                   <p className="text-gray-500 text-sm">Enjoy discounts on match tickets, merchandise, and partner services.</p>
               </div>
           </div>
       </div>
    </div>
  );
};

export default Membership;