'use client';
import React, { useState, useEffect } from 'react';
import { Download, Search, Trash2 } from 'lucide-react';
import { api } from '@/lib/api';

interface Candidate {
  id: number;
  name: string;
  filename: string;
  score: number;
  rank: number;
  matching_skills: string[];
  missing_skills: string[];
}

export default function ResultsTable({ refresh, darkMode }: { refresh: () => void; darkMode: boolean }) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    setLoading(true);
    try {
      const data = await api.getCandidates();
      setCandidates(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    // Directly trigger the file download from the backend FileResponse
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
    window.open(`${apiBaseUrl}/export`, '_blank');
  };

  const handleClear = async () => {
    if (confirm('Clear all candidates and results?')) {
      try {
        await api.clearData();
        setCandidates([]);
      } catch (error) {
        alert('Clear failed');
      }
    }
  };

  const filteredCandidates = candidates.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.matching_skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={`border transition-all duration-300 overflow-hidden rounded-2xl ${
      darkMode 
        ? 'bg-slate-900/60 border-slate-800/80 shadow-2xl backdrop-blur-md' 
        : 'bg-white border-gray-200/80 shadow-md'
    }`}>
      <div className={`p-4 border-b flex flex-wrap items-center justify-between gap-4 transition-colors duration-300 ${
        darkMode ? 'border-slate-800/80 bg-slate-950/40' : 'border-gray-250 bg-gray-50/50'
      }`}>
        <div className="relative flex-1 max-w-md">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
            darkMode ? 'text-slate-500' : 'text-gray-400'
          }`} />
          <input 
            type="text" 
            placeholder="Search by name or skill..." 
            className={`w-full pl-10 pr-4 py-2 border rounded-xl outline-none text-sm transition-all ${
              darkMode 
                ? 'bg-slate-950/60 border-slate-850 text-slate-200 placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60' 
                : 'bg-white border-gray-200 text-slate-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500'
            }`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={loadCandidates}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
              darkMode 
                ? 'text-slate-300 hover:text-white hover:bg-slate-800' 
                : 'text-gray-600 hover:text-slate-950 hover:bg-gray-100'
            }`}
          >
            Refresh
          </button>
          <button 
            onClick={handleExport}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border rounded-lg transition-all ${
              darkMode 
                ? 'text-green-400 bg-green-500/5 hover:bg-green-500/10 border-green-500/20' 
                : 'text-green-700 bg-green-50 hover:bg-green-100/50 border-green-200'
            }`}
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
          <button 
            onClick={handleClear}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold border rounded-lg transition-all ${
              darkMode 
                ? 'text-red-400 bg-red-500/5 hover:bg-red-500/10 border-red-500/20' 
                : 'text-red-700 bg-red-50 hover:bg-red-100/50 border-red-200'
            }`}
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className={`text-xs uppercase font-mono font-bold border-b transition-colors ${
            darkMode ? 'bg-slate-950/60 text-slate-400 border-slate-850' : 'bg-gray-100 text-gray-500 border-gray-200'
          }`}>
            <tr>
              <th className="px-6 py-4">Rank</th>
              <th className="px-6 py-4">Candidate</th>
              <th className="px-6 py-4">Score</th>
              <th className="px-6 py-4">Matching Skills</th>
              <th className="px-6 py-4">Missing Skills</th>
            </tr>
          </thead>
          <tbody className={`divide-y text-sm transition-colors ${
            darkMode ? 'divide-slate-850/60' : 'divide-gray-150'
          }`}>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                  </div>
                </td>
              </tr>
            ) : filteredCandidates.length > 0 ? (
              filteredCandidates.map((c) => (
                <tr key={c.id} className={`transition-colors ${
                  darkMode ? 'hover:bg-slate-850/20' : 'hover:bg-gray-50/50'
                }`}>
                  <td className={`px-6 py-4 font-mono font-bold ${
                    darkMode ? 'text-slate-400' : 'text-gray-500'
                  }`}>#{c.rank}</td>
                  <td className="px-6 py-4">
                    <div className={`font-bold ${darkMode ? 'text-slate-200' : 'text-gray-900'}`}>{c.name}</div>
                    <div className={`text-xs font-mono mt-0.5 ${darkMode ? 'text-slate-500' : 'text-gray-400'}`}>{c.filename}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono border ${
                      c.score >= 60 ? 'bg-green-500/10 text-green-400 border-green-500/25' : 
                      c.score >= 35 ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/25' : 'bg-red-500/10 text-red-400 border-red-500/25'
                    }`}>
                      {c.score}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-[280px]">
                      {c.matching_skills.map((s, i) => (
                        <span key={i} className={`px-2 py-0.5 border rounded text-[10px] font-bold font-mono transition-colors ${
                          darkMode ? 'bg-blue-500/5 text-blue-400 border-blue-500/15' : 'bg-blue-50 text-blue-600 border-blue-100'
                        }`}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1 max-w-[280px]">
                      {c.missing_skills.map((s, i) => (
                        <span key={i} className={`px-2 py-0.5 border rounded text-[10px] font-bold font-mono transition-colors ${
                          darkMode ? 'bg-slate-950 text-slate-500 border-slate-850' : 'bg-gray-50 text-gray-400 border-gray-200'
                        }`}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className={`px-6 py-12 text-center text-sm transition-colors ${
                  darkMode ? 'text-slate-500' : 'text-gray-400'
                }`}>
                  No candidates found. Upload some resumes and analyze to see results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
