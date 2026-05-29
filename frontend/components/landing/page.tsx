'use client';
import React from 'react';
import Hero from './Hero';
import Features from './Features';
import HowItWorks from './HowItWorks';

interface LandingPageProps {
  onLaunch: () => void;
}

export default function LandingPage({ onLaunch }: LandingPageProps) {
  return (
    <div className="bg-slate-950 min-h-screen selection:bg-blue-500/30 selection:text-blue-300 overflow-x-hidden">
      {/* Sleek top navbar banner */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-blue-500/10">
              RS
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white">
              Resume<span className="text-blue-400">Screener</span>
            </span>
          </div>

          <button
            onClick={onLaunch}
            className="px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg hover:shadow-md hover:shadow-blue-500/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Launch App
          </button>
        </div>
      </header>

      <Hero onLaunch={onLaunch} />
      <Features />
      <HowItWorks />

      {/* Modern minimal footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-6 text-center text-xs text-slate-600 font-mono">
        &copy; {new Date().getFullYear()} AI Resume Screener & Candidate Ranking System. All rights reserved.
      </footer>
    </div>
  );
}
