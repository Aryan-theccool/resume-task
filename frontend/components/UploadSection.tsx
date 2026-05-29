'use client';
import React, { useState } from 'react';
import { Upload, FileText, Send } from 'lucide-react';
import { api } from '@/lib/api';

interface UploadSectionProps {
  onAnalysisComplete: () => void;
}

export default function UploadSection({ onAnalysisComplete, darkMode }: { onAnalysisComplete: () => void; darkMode: boolean }) {
  const [resumes, setResumes] = useState<File[]>([]);
  const [jdText, setJdText] = useState('');
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setResumes(Array.from(e.target.files));
    }
  };

  const handleJdFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setJdFile(e.target.files[0]);
    }
  };

  const handleStartProcess = async () => {
    setLoading(true);
    setStatus('Uploading resumes...');
    try {
      if (resumes.length > 0) {
        await api.uploadResumes(resumes);
      }
      
      setStatus('Analyzing candidates...');
      await api.analyze(jdText, jdFile);
      
      setStatus('Analysis complete!');
      onAnalysisComplete();
    } catch (error: any) {
      console.error(error);
      setStatus(`Error: ${error.response?.data?.detail || 'Something went wrong'}`);
    } finally {
      setLoading(false);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 ${
      darkMode 
        ? 'bg-slate-900/60 border-slate-800/80 shadow-2xl backdrop-blur-md' 
        : 'bg-white border-gray-200/80 shadow-md'
    } space-y-6`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Resume Upload */}
        <div className="space-y-4">
          <label className={`text-base font-bold flex items-center gap-2 transition-colors duration-300 ${
            darkMode ? 'text-slate-200' : 'text-slate-800'
          }`}>
            <Upload className="w-5 h-5 text-blue-400" /> Upload Resumes
          </label>
          <div className={`border-2 border-dashed rounded-2xl p-6 min-h-[160px] flex items-center justify-center transition-all relative group cursor-pointer ${
            darkMode 
              ? 'border-slate-800/80 bg-slate-950/30 hover:bg-slate-950/50 hover:border-blue-500/60' 
              : 'border-gray-200 bg-gray-50/50 hover:bg-gray-100/30 hover:border-blue-500/60'
          }`}>
            <input 
              type="file" 
              multiple 
              accept=".pdf,.docx" 
              onChange={handleResumeChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            {resumes.length === 0 ? (
              <div className={`text-center pointer-events-none z-10 transition-colors duration-300 ${
                darkMode ? 'text-slate-400 group-hover:text-slate-200' : 'text-slate-500 group-hover:text-slate-800'
              }`}>
                <FileText className={`w-12 h-12 mx-auto mb-3 transition-colors animate-pulse ${
                  darkMode ? 'text-slate-500 group-hover:text-blue-400' : 'text-slate-400 group-hover:text-blue-500'
                }`} />
                <p className="font-semibold text-sm">Click or drag and drop PDF/DOCX resumes</p>
                <p className={`text-xs mt-1.5 font-mono ${darkMode ? 'text-slate-500' : 'text-gray-400'}`}>0 files selected</p>
              </div>
            ) : (
              <div className="w-full text-left space-y-2.5 pointer-events-none z-10">
                <div className={`flex items-center justify-between border-b pb-2 ${
                  darkMode ? 'border-slate-800/60' : 'border-gray-200'
                }`}>
                  <p className="text-[10px] font-bold text-blue-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
                    Staged Resumes ({resumes.length})
                  </p>
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-colors ${
                    darkMode ? 'text-slate-500 bg-slate-900 border-slate-800/50' : 'text-gray-500 bg-gray-150 border-gray-200'
                  }`}>Click to change</span>
                </div>
                <div className="space-y-1.5 max-h-[105px] overflow-y-auto pr-1">
                  {resumes.slice(0, 3).map((file, idx) => (
                    <div key={idx} className={`flex items-center justify-between text-xs p-2 rounded-lg border transition-colors ${
                      darkMode ? 'text-slate-300 bg-slate-900/60 border-slate-800/50' : 'text-slate-700 bg-white border-gray-200'
                    }`}>
                      <div className="flex items-center gap-2 truncate pr-4">
                        <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span className={`truncate font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{file.name}</span>
                      </div>
                      <span className={`font-mono text-[9px] shrink-0 px-2 py-0.5 rounded transition-colors ${
                        darkMode ? 'text-slate-500 bg-slate-950' : 'text-gray-500 bg-gray-100'
                      }`}>{formatBytes(file.size)}</span>
                    </div>
                  ))}
                  {resumes.length > 3 && (
                    <div className="text-center text-[10px] text-slate-500 font-mono pt-1">
                      + {resumes.length - 3} more files...
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* JD Input */}
        <div className="space-y-4">
          <label className={`text-base font-bold flex items-center gap-2 transition-colors duration-300 ${
            darkMode ? 'text-slate-200' : 'text-slate-800'
          }`}>
            <FileText className="w-5 h-5 text-indigo-400" /> Job Description
          </label>
          <div className="space-y-4">
            <textarea 
              className={`w-full h-32 p-3 border rounded-xl focus:ring-2 outline-none text-sm transition-all ${
                darkMode 
                  ? 'bg-slate-950/50 border-slate-850 focus:ring-blue-500/40 focus:border-blue-500/80 text-slate-200 placeholder:text-slate-600' 
                  : 'bg-white border-gray-200 focus:ring-blue-500/30 focus:border-blue-500 text-gray-800 placeholder:text-gray-400'
              }`}
              placeholder="Paste the job description here (Required)..."
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            />
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold ${darkMode ? 'text-slate-500' : 'text-gray-500'}`}>Or upload JD:</span>
                <input 
                  type="file" 
                  accept=".pdf,.docx" 
                  onChange={handleJdFileChange}
                  className={`text-xs file:mr-4 file:py-1.5 file:px-3.5 file:rounded-lg file:border-0 file:text-xs file:font-semibold transition-all cursor-pointer ${
                    darkMode 
                      ? 'text-slate-400 file:bg-slate-950 file:text-blue-400 hover:file:bg-slate-850 hover:file:text-blue-300' 
                      : 'text-gray-500 file:bg-gray-100 file:text-blue-600 hover:file:bg-gray-200 hover:file:text-blue-750'
                  }`}
                />
              </div>
              {jdFile && (
                <span className={`text-[10px] font-mono px-2 py-1 rounded border truncate max-w-[120px] transition-colors ${
                  darkMode ? 'text-green-400 bg-green-500/5 border-green-500/20' : 'text-green-700 bg-green-50 border-green-200'
                }`} title={jdFile.name}>
                  ✓ {jdFile.name}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`flex items-center justify-between pt-5 border-t ${
        darkMode ? 'border-slate-800/60' : 'border-gray-200'
      }`}>
        <p className={`text-xs font-semibold ${status.includes('Error') ? 'text-red-400' : (darkMode ? 'text-slate-400' : 'text-gray-500')}`}>
          {status}
        </p>
        <button 
          onClick={handleStartProcess}
          disabled={loading || resumes.length === 0 || (!jdText.trim() && !jdFile)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-40 disabled:bg-slate-800 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 disabled:shadow-none disabled:pointer-events-none"
        >
          {loading ? 'Processing...' : (
            <>
              Analyze Candidates <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
