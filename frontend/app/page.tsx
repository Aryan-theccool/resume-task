'use client';
import React, { useState } from 'react';
import UploadSection from '@/components/UploadSection';
import ResultsTable from '@/components/ResultsTable';
import LandingPage from '@/components/landing/page';
import { ArrowLeft, Sun, Moon } from 'lucide-react';

export default function HomePage() {
  const [showScreener, setShowScreener] = useState(false);
  const [analysisCount, setAnalysisCount] = useState(0);
  const [darkMode, setDarkMode] = useState(true);

  if (!showScreener) {
    return <LandingPage onLaunch={() => setShowScreener(true)} darkMode={darkMode} setDarkMode={setDarkMode} />;
  }

  return (
    <div className={`${
      darkMode 
        ? 'bg-slate-950 text-white selection:bg-blue-500/30 selection:text-blue-300' 
        : 'bg-slate-50 text-slate-900 selection:bg-blue-100 selection:text-blue-700'
    } min-h-screen overflow-x-hidden transition-colors duration-300`}>
      {/* Sleek top navbar banner (Synced with Landing) */}
      <header className={`${
        darkMode 
          ? 'border-slate-900 bg-slate-950/80 text-white' 
          : 'border-slate-200 bg-white/80 text-slate-800'
      } border-b backdrop-blur-md sticky top-0 z-50 px-6 py-4 transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowScreener(false)}
              className={`p-2 rounded-lg transition-colors mr-1 ${
                darkMode 
                  ? 'hover:bg-slate-900 text-slate-400 hover:text-white' 
                  : 'hover:bg-slate-100 text-slate-500 hover:text-slate-800'
              }`}
              title="Back to Home"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md shadow-blue-500/10">
              RS
            </div>
            <span className={`font-extrabold text-lg tracking-tight ${darkMode ? 'text-white' : 'text-slate-800'}`}>
              Resume<span className="text-blue-400">Screener</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl border transition-all active:scale-[0.9] ${
                darkMode
                  ? 'border-slate-850 bg-slate-900 hover:bg-slate-850 text-amber-400 hover:text-amber-300'
                  : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-indigo-600 hover:text-indigo-700'
              }`}
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <div className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-colors duration-300 ${
              darkMode 
                ? 'text-slate-500 bg-slate-900 border-slate-800/80' 
                : 'text-slate-500 bg-slate-150 border-slate-200'
            }`}>
              v1.0.0 Beta
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
        <UploadSection darkMode={darkMode} onAnalysisComplete={() => setAnalysisCount(c => c + 1)} />

        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className={`text-lg font-extrabold tracking-tight ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
            Ranked Candidates
          </h2>
          <ResultsTable darkMode={darkMode} key={analysisCount} refresh={() => setAnalysisCount(c => c + 1)} />
        </div>
      </main>

      {/* Modern minimal footer */}
      <footer className={`${
        darkMode 
          ? 'border-slate-900 bg-slate-950 text-slate-700' 
          : 'border-slate-200 bg-slate-100 text-slate-500'
      } border-t py-8 px-6 text-center text-xs font-mono transition-colors duration-300`}>
        &copy; {new Date().getFullYear()} AI Resume Screener & Candidate Ranking System. All rights reserved.
      </footer>
    </div>
  );
}
