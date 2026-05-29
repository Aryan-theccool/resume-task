'use client';
import React, { useState } from 'react';
import UploadSection from '@/components/UploadSection';
import ResultsTable from '@/components/ResultsTable';
import LandingPage from '@/components/landing/page';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function HomePage() {
  const [showScreener, setShowScreener] = useState(false);
  const [analysisCount, setAnalysisCount] = useState(0);

  if (!showScreener) {
    return <LandingPage onLaunch={() => setShowScreener(true)} />;
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen selection:bg-blue-500/30 selection:text-blue-300 overflow-x-hidden">
      {/* Sleek top navbar banner (Synced with Landing) */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowScreener(false)}
              className="p-2 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors mr-1"
              title="Back to Home"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-blue-500/10">
              RS
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white">
              Resume<span className="text-blue-400">Screener</span>
            </span>
          </div>

          <div className="text-xs text-slate-500 font-mono bg-slate-900 border border-slate-800/80 px-3 py-1.5 rounded-full">
            v1.0.0 Beta
          </div>
        </div>
      </header>

      <main className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
        <UploadSection onAnalysisComplete={() => setAnalysisCount(c => c + 1)} />

        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-lg font-extrabold tracking-tight text-slate-200">Ranked Candidates</h2>
          <ResultsTable key={analysisCount} refresh={() => setAnalysisCount(c => c + 1)} />
        </div>
      </main>

      {/* Modern minimal footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-6 text-center text-xs text-slate-700 font-mono">
        &copy; {new Date().getFullYear()} AI Resume Screener & Candidate Ranking System. All rights reserved.
      </footer>
    </div>
  );
}
