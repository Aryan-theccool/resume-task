'use client';
import React from 'react';
import { ArrowRight, Sparkles, FileText, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onLaunch: () => void;
}

export default function Hero({ onLaunch }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-white min-h-[85vh] flex items-center justify-center py-20 px-6">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-700" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />

      <div className="relative max-w-5xl mx-auto text-center z-10 flex flex-col items-center">
        {/* Sparkle badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-blue-400 mb-8 animate-bounce">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Generation Resume Screening</span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 leading-tight md:leading-none max-w-4xl mb-8">
          Screen & Rank Resumes <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            With High Precision NLP
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          An intelligent candidate screening engine that automatically extracts technical skills, maps complex synonyms, and ranks matching talent in seconds.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <button
            onClick={onLaunch}
            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl text-base font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] transition-all"
          >
            Launch Screener Dashboard
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="#how-it-works"
            className="flex items-center justify-center px-8 py-4 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-xl text-base font-bold transition-all"
          >
            How It Works
          </a>
        </div>

        {/* Floating Metrics Mockup */}
        <div className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md p-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-4">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-xs text-slate-500 font-mono">candidate-ranking-system.v1</div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 text-left">
            <div className="flex-1 p-4 rounded-xl bg-slate-950/50 border border-slate-850 flex items-start gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-200">1. Upload Resumes</h3>
                <p className="text-xs text-slate-500 mt-1">Batch upload PDF/DOCX profiles securely.</p>
              </div>
            </div>

            <div className="flex-1 p-4 rounded-xl bg-slate-950/50 border border-slate-850 flex items-start gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-200">2. Match Skills</h3>
                <p className="text-xs text-slate-500 mt-1">Extract exact and complex synonyms instantly.</p>
              </div>
            </div>

            <div className="flex-1 p-4 rounded-xl bg-slate-950/50 border border-slate-850 flex items-start gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg text-green-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-200">3. Rank & Export</h3>
                <p className="text-xs text-slate-500 mt-1">Download perfectly structured CSV reports.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
