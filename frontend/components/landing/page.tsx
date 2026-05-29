'use client';
import React from 'react';
import { ShieldCheck, Sun, Moon } from 'lucide-react';
import LandingHero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';

export default function HomePage({ 
  onLaunch, 
  darkMode, 
  setDarkMode 
}: { 
  onLaunch: () => void; 
  darkMode: boolean; 
  setDarkMode: (d: boolean) => void 
}) {
    return (
        <main className={`${
          darkMode 
            ? 'bg-slate-950 text-white selection:bg-blue-500/30 selection:text-blue-300' 
            : 'bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-700'
        } min-h-screen transition-colors duration-300`}>
            {/* Navbar */}
            <nav className={`${
              darkMode 
                ? 'bg-slate-950/85 border-slate-900 text-white' 
                : 'bg-white/80 border-gray-100 text-gray-900'
            } fixed top-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-300`}>
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <span className={`font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Resume<span className="text-blue-600">Screener</span>
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <a href="#features" className={`hover:text-blue-600 transition-colors ${darkMode ? 'text-slate-400 hover:text-white' : 'text-gray-600'}`}>Features</a>
                        <a href="#how-it-works" className={`hover:text-blue-600 transition-colors ${darkMode ? 'text-slate-400 hover:text-white' : 'text-gray-600'}`}>How it Works</a>
                        
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className={`p-2 rounded-xl border transition-all active:scale-[0.9] ${
                                darkMode
                                    ? 'border-slate-850 bg-slate-900 hover:bg-slate-800 text-amber-400 hover:text-amber-300'
                                    : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-indigo-600 hover:text-indigo-700'
                            }`}
                            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        <button
                            onClick={onLaunch}
                            className="px-5 py-2 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md shadow-blue-500/10"
                        >
                            Launch App
                        </button>
                    </div>
                </div>
            </nav>

            {/* Landing Page Sections */}
            <div className="pt-16">
                <LandingHero onStart={onLaunch} darkMode={darkMode} />

                <section id="features">
                    <Features darkMode={darkMode} />
                </section>

                <section id="how-it-works">
                    <HowItWorks darkMode={darkMode} />
                </section>
            </div>

            {/* Footer */}
            <footer className={`${
              darkMode 
                ? 'bg-slate-950 text-slate-500 border-slate-900' 
                : 'bg-gray-900 text-gray-400 border-gray-800'
            } py-12 border-t transition-colors duration-300`}>
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 font-bold text-white">
                        <ShieldCheck className="w-6 h-6 text-blue-500" />
                        <span>ResumeScreener</span>
                    </div>
                    <p className="text-sm">© {new Date().getFullYear()} ResumeScreener. Built for the future of hiring.</p>
                    <div className="flex gap-6 text-sm">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </main>
    );
}
