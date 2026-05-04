import React from 'react';
import { HISTORY_CHAIRMEN, HISTORY_CAPTAINS, HONOURS, SOCIAL_LINKS } from '../constants';
import { Users, Trophy, Clock, HeartHandshake } from 'lucide-react';

const History: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr] mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 uppercase mb-4">Club Heritage</h1>
            <p className="text-gray-600 max-w-3xl">
              Founded in 1951, Kenya Harlequins has a deep heritage of leadership, captains, champions and innovation in Kenyan rugby. Explore the people and moments that shaped the club.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-900 text-white p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <Trophy size={24} className="text-quins-magenta" />
              <div>
                <p className="text-sm uppercase tracking-widest text-gray-300">Honours</p>
                <p className="font-bold text-2xl">Legendary titles</p>
              </div>
            </div>
            <p className="text-sm leading-7 text-gray-300">
              Celebrating decades of success across Kenya Cup, Enterprise Cup, Sevens tournaments and community rugby programs.
            </p>
          </div>
        </div>

        <section className="grid gap-8 md:grid-cols-2 mb-12">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Chairmen Since Inception</h2>
            <div className="space-y-4">
              {HISTORY_CHAIRMEN.map((chair, index) => (
                <div key={chair.name} className="rounded-3xl bg-slate-50 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-slate-900">{chair.name}</p>
                      <p className="text-sm text-gray-500">{chair.period}</p>
                    </div>
                    <span className="text-xs uppercase tracking-wide text-quins-magenta font-bold">Chairman {index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Captains & Club Legends</h2>
            <div className="space-y-4">
              {HISTORY_CAPTAINS.map((captain) => (
                <div key={captain.name} className="rounded-3xl bg-slate-50 p-5">
                  <p className="font-semibold text-slate-900">{captain.name}</p>
                  <p className="text-sm text-gray-500">{captain.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Club Honours</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {HONOURS.map((honour) => (
              <div key={honour.title} className="rounded-3xl bg-slate-50 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <HeartHandshake size={24} className="text-quins-blue" />
                  <div>
                    <p className="text-lg font-bold text-slate-900">{honour.title}</p>
                    <p className="text-sm text-gray-500">{honour.subtitle}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                  {honour.years.map((year) => (
                    <span key={year} className="bg-white px-3 py-1 rounded-full border border-slate-200">{year}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-quins-blue/5 border border-quins-blue p-8">
          <div className="flex items-center gap-4 mb-6">
            <Users size={28} className="text-quins-blue" />
            <div>
              <h3 className="text-xl font-bold text-slate-900">Connect with Quins</h3>
              <p className="text-sm text-gray-600">Follow our matchday coverage across social media and stay up to date with every event.</p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-3xl bg-white p-5 border border-slate-200 text-center hover:bg-quins-blue hover:text-white transition"
              >
                <div className="text-3xl mb-4">{link.icon}</div>
                <p className="font-bold">{link.label}</p>
                <p className="text-sm text-gray-500">{link.subtitle}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default History;
