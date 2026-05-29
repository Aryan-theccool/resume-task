'use client';
import React from 'react';
import { Zap, Target } from 'lucide-react';

export default function LandingHero({ onStart }: { onStart: () => void }) {
    return (
        <section className="relative pt-20 pb-32 overflow-hidden">
            {/* Background Gradient Orbs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-[120px]" />
            </div>

            <div className="max-w-6xl mx-auto px-4 text-center space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium border border-blue-100 animate-bounce">
                    <Zap className="w-3 h-3" />
                    <span>Next-Gen AI Recruitment</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1]">
                    Stop Scrolling, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                        Start Hiring
                    </span>
                </h1>

                <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed">
                    Our AI-powered resume screener analyzes thousands of data points to rank candidates
                    instantly. No more manual reviews—just the best talent, delivered in seconds.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <button
                        onClick={onStart}
                        className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 hover:scale-105 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
                    >
                        Try the Live Demo <Target className="w-5 h-5" />
                    </button>
                    <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all">
                        View Documentation
                    </button>
                </div>

                <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
                    {['FastAPI', 'Next.js', 'Scikit-Learn', 'Tailwind'].map((tech) => (
                        <div key={tech} className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                            {tech}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
