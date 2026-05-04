import React from 'react';
import { NEWS } from '../constants';
import { ArrowRight } from 'lucide-react';

const News: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 uppercase">Latest Club News</h1>
            <p className="text-gray-500 mt-3 max-w-2xl">Stay up to date with Kenya Harlequins results, events, announcements and community stories.</p>
          </div>
          <div className="flex items-center gap-2 text-quins-blue font-bold uppercase tracking-wider">
            Explore updates <ArrowRight size={18} />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {NEWS.map((item) => (
            <article key={item.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition">
              <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
              <div className="p-6">
                <div className="text-xs uppercase text-quins-magenta font-bold mb-3">{item.category}</div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">{item.title}</h2>
                <p className="text-sm text-gray-600 mb-6">{item.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400 uppercase tracking-wide">
                  <span>{item.date}</span>
                  <span>Read more</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
