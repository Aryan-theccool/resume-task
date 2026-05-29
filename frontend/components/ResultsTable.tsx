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

export default function ResultsTable({ refresh }: { refresh: () => void }) {
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
    window.open('http://localhost:8000/export', '_blank');
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name or skill..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={loadCandidates}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Refresh
          </button>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button 
            onClick={handleClear}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Clear
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase font-semibold">
            <tr>
              <th className="px-6 py-4 border-b">Rank</th>
              <th className="px-6 py-4 border-b">Candidate</th>
              <th className="px-6 py-4 border-b">Score</th>
              <th className="px-6 py-4 border-b">Matching Skills</th>
              <th className="px-6 py-4 border-b">Missing Skills</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">Loading...</td>
              </tr>
            ) : filteredCandidates.length > 0 ? (
              filteredCandidates.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium">#{c.rank}</td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{c.name}</div>
                    <div className="text-xs text-gray-500">{c.filename}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      c.score >= 60 ? 'bg-green-100 text-green-700' : 
                      c.score >= 35 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {c.score}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {c.matching_skills.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {c.missing_skills.map((s, i) => (
                        <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
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
