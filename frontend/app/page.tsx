'use client';
import React, { useState } from 'react';
import UploadSection from '@/components/UploadSection';
import ResultsTable from '@/components/ResultsTable';
import { ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const [analysisCount, setAnalysisCount] = useState(0);

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">AI Resume Screener</h1>
            <p className="text-gray-500 text-sm">Automated Candidate Ranking System</p>
          </div>
        </div>
        <div className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
          v1.0.0 Beta
        </div>
      </header>

      <UploadSection onAnalysisComplete={() => setAnalysisCount(c => c + 1)} />

      {analysisCount > 0 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-xl font-bold text-gray-800">Ranked Candidates</h2>
          <ResultsTable key={analysisCount} refresh={() => setAnalysisCount(c => c + 1)} />
        </div>
      )}
    </main>
  );
}
