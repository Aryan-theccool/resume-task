'use client';
import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import LandingHero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import UploadSection from '@/components/UploadSection';
import ResultsTable from '@/components/ResultsTable';

export default function HomePage() {
    const [showDemo, setShowDemo] = useState(false);

    const scrollToDemo = () => {
        setShowDemo(true);
        setTimeout(() => {
            document.getElementById('demo-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    return (
        <main className="min-h-screen bg-white">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl text-gray-900">
                        <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <span>ResumeAI</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                        <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
                        <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a>
                        <button
                            onClick={scrollToDemo}
                            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all"
                        >
                            Launch App
                        </button>
                    </div>
                </div>
            </nav>

            {/* Landing Page Sections */}
            <div className="pt-16">
                <LandingHero onStart={scrollToDemo} />

                <section id="features">
                    <Features />
                </section>

                <section id="how-it-works">
                    <HowItWorks />
                </section>

                {/* Interactive Demo Section */}
                <section id="demo-section" className={`py-24 transition-all duration-1000 ${showDemo ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="max-w-6xl mx-auto px-4 space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl font-bold text-gray-900">Live Interactive Demo</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Experience the power of AI screening. Upload your files and watch the magic happen.
                            </p>
                        </div>

                        <div className="relative p-1 rounded-3xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 shadow-2xl">
                            <div className="bg-white rounded-[22px] overflow-hidden p-4 md:p-8">
                                <UploadSection onAnalysisComplete={() => { }} />
                                <div className="mt-12">
                                    <ResultsTable refresh={() => { }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 font-bold text-white">
                        <ShieldCheck className="w-6 h-6 text-blue-500" />
                        <span>ResumeAI</span>
                    </div>
                    <p className="text-sm">© 2026 ResumeAI. Built for the future of hiring.</p>
                    <div className="flex gap-6 text-sm">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                    </div>
                </div>
            </footer>
        </main>
    );
}
