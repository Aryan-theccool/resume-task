'use client';
import React from 'react';
import { Zap, Target } from 'lucide-react';

export default function LandingHero({ onStart, darkMode }: { onStart: () => void; darkMode: boolean }) {
    return (
        <section className="relative pt-20 pb-32 overflow-hidden">
            {/* Background Gradient Orbs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-300 ${
                  darkMode ? 'bg-blue-900/10' : 'bg-blue-100/50'
                }`} />
                <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] transition-colors duration-300 ${
                  darkMode ? 'bg-indigo-900/10' : 'bg-indigo-100/50'
                }`} />
            </div>

            <div className="max-w-6xl mx-auto px-4 text-center space-y-8">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border animate-bounce transition-colors duration-300 ${
                  darkMode 
                    ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                    : 'bg-blue-50 text-blue-600 border-blue-100'
                }`}>
                    <Zap className="w-3 h-3" />
                    <span>Next-Gen AI Recruitment</span>
                </div>

                <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] transition-colors duration-300 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                    Stop Scrolling, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        Start Hiring
                    </span>
                </h1>

                <p className={`max-w-2xl mx-auto text-lg md:text-xl leading-relaxed transition-colors duration-300 ${
                  darkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                    Our AI-powered resume screener analyzes thousands of data points to rank candidates
                    instantly. No more manual reviews—just the best talent, delivered in seconds.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <button
                        onClick={onStart}
                        className={`px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 hover:scale-105 active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg ${
                          darkMode ? 'shadow-blue-950/40' : 'shadow-blue-200'
                        }`}
                    >
                        Try the Live Demo <Target className="w-5 h-5" />
                    </button>
                    <button className={`px-8 py-4 border rounded-full font-semibold text-lg transition-all ${
                      darkMode 
                        ? 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white' 
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}>
                        View Documentation
                    </button>
                </div>

                <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
                    {['FastAPI', 'Next.js', 'Scikit-Learn', 'Tailwind'].map((tech) => (
                        <div key={tech} className={`text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${
                          darkMode ? 'text-slate-600' : 'text-gray-400'
                        }`}>
                            {tech}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
