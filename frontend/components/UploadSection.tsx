'use client';
import React, { useState } from 'react';
import { Upload, FileText, Send } from 'lucide-react';
import { api } from '@/lib/api';

interface UploadSectionProps {
  onAnalysisComplete: () => void;
}

export default function UploadSection({ onAnalysisComplete }: UploadSectionProps) {
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

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Resume Upload */}
        <div className="space-y-4">
          <label className="text-lg font-semibold flex items-center gap-2">
            <Upload className="w-5 h-5" /> Upload Resumes
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors relative">
            <input 
              type="file" 
              multiple 
              accept=".pdf,.docx" 
              onChange={handleResumeChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="text-gray-500">
              <FileText className="w-10 h-10 mx-auto mb-2 text-gray-400" />
              <p>Click or drag and drop PDF/DOCX resumes</p>
              <p className="text-xs mt-1">{resumes.length} files selected</p>
            </div>
          </div>
        </div>

        {/* JD Input */}
        <div className="space-y-4">
          <label className="text-lg font-semibold flex items-center gap-2">
            <FileText className="w-5 h-5" /> Job Description
          </label>
          <div className="space-y-3">
            <textarea 
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Paste the job description here..."
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            />
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Or upload JD:</span>
              <input 
                type="file" 
                accept=".pdf,.docx" 
                onChange={handleJdFileChange}
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <p className={`text-sm ${status.includes('Error') ? 'text-red-500' : 'text-gray-600'}`}>
          {status}
        </p>
        <button 
          onClick={handleStartProcess}
          disabled={loading || (!resumes.length && !jdText && !jdFile)}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
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
