'use client';
import React from 'react';
import { ShieldCheck } from 'lucide-react';
import LandingHero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';

export default function HomePage({ onLaunch }: { onLaunch: () => void }) {
    return (
        <main className="min-h-screen bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-700">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl text-gray-900">
                        <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <span className="font-extrabold tracking-tight">
                          Resume<span className="text-blue-600">Screener</span>
                        </span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                        <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a>
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
                <LandingHero onStart={onLaunch} />

                <section id="features">
                    <Features />
                </section>

                <section id="how-it-works">
                    <HowItWorks />
                </section>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
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
