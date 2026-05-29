'use client';
import React from 'react';
import { Target, Zap, Download, Compass, ShieldAlert, Cpu } from 'lucide-react';

export default function Features() {
  const list = [
    {
      title: "TF-IDF Semantic Engine",
      desc: "Goes beyond strict spelling matches to capture the underlying context and semantic intent of job specifications.",
      icon: <Cpu className="w-6 h-6 text-blue-400" />
    },
    {
      title: "Dynamic Synonym Mapping",
      desc: "Perfectly resolves complex aliases. Maps abbreviations like 'DSA' directly to 'Data Structures & Algorithms' and compound terms instantly.",
      icon: <Target className="w-6 h-6 text-indigo-400" />
    },
    {
      title: "Real-time Candidate Ranking",
      desc: "Instantly score and arrange thousands of candidate applications descending by pure skill-weight and analytical accuracy.",
      icon: <Zap className="w-6 h-6 text-purple-400" />
    },
    {
      title: "No-Card Free Deployments",
      desc: "Fully prepped for zero-cost, card-free server setups on Render and Vercel, utilising optimized SQLite local storage.",
      icon: <Compass className="w-6 h-6 text-teal-400" />
    },
    {
      title: "Private & Secure Local Parsing",
      desc: "All resume documents are parsed locally inside the app context, maintaining absolute privacy and security for applicant data.",
      icon: <ShieldAlert className="w-6 h-6 text-pink-400" />
    },
    {
      title: "Seamless CSV Export",
      desc: "One-click downloads of complete, clean candidate rankings, score breakups, matching and missing skills formatted perfectly.",
      icon: <Download className="w-6 h-6 text-green-400" />
    }
  ];

  return (
    <section className="bg-slate-950 py-24 px-6 border-t border-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Engineered For Modern Hiring
          </h2>
          <p className="text-slate-400">
            A high-performance feature set designed to completely streamline the screening process and discover best-fitting candidates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((feat, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl border border-slate-900 bg-slate-900/30 hover:bg-slate-900/50 hover:border-slate-800 transition-all hover:scale-[1.01] hover:shadow-xl hover:shadow-blue-500/[0.02]"
            >
              <div className="p-4 bg-slate-950/80 border border-slate-850 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
                {feat.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
