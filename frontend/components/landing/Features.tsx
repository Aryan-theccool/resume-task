'use client';
import React from 'react';
import { CheckCircle, Zap, Shield, BarChart3, FileText, Search } from 'lucide-react';

const features = [
    {
        title: 'AI-Powered Scoring',
        desc: 'Uses advanced TF-IDF and Cosine Similarity to match resumes with precision.',
        icon: <Zap className="w-6 h-6 text-blue-600" />,
        color: 'bg-blue-50',
    },
    {
        title: 'Instant Ranking',
        desc: 'Automatically sort candidates from highest to lowest fit in real-time.',
        icon: <BarChart3 className="w-6 h-6 text-indigo-600" />,
        color: 'bg-indigo-50',
    },
    {
        title: 'Skill Gap Analysis',
        desc: 'Immediately identify which required skills are missing from a candidate.',
        icon: <Search className="w-6 h-6 text-purple-600" />,
        color: 'bg-purple-50',
    },
    {
        title: 'Enterprise Formats',
        desc: 'Full support for PDF and DOCX formats with intelligent text normalization.',
        icon: <FileText className="w-6 h-6 text-emerald-600" />,
        color: 'bg-emerald-50',
    },
    {
        title: 'Secure Processing',
        desc: 'Your data is processed securely and efficiently with a modern backend.',
        icon: <Shield className="w-6 h-6 text-orange-600" />,
        color: 'bg-orange-50',
    },
    {
        title: 'CSV Export',
        desc: 'Export your ranked candidate list for further review in Excel or Google Sheets.',
        icon: <CheckCircle className="w-6 h-6 text-pink-600" />,
        color: 'bg-pink-50',
    },
];

export default function Features({ darkMode }: { darkMode: boolean }) {
    return (
        <section className={`py-24 transition-colors duration-300 ${
          darkMode ? 'bg-slate-950 border-t border-b border-slate-900/50' : 'bg-gray-50'
        }`}>
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <h2 className={`text-3xl md:text-4xl font-bold transition-colors duration-300 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>Everything you need to screen</h2>
                    <p className={`max-w-2xl mx-auto transition-colors duration-300 ${
                      darkMode ? 'text-slate-400' : 'text-gray-600'
                    }`}>
                        We've built a professional-grade pipeline to handle the most tedious part of hiring.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className={`p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 group ${
                          darkMode 
                            ? 'bg-slate-900/40 border-slate-850 hover:border-slate-800 hover:bg-slate-900/70' 
                            : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
                        }`}>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
                              darkMode ? 'bg-slate-950 border border-slate-800/80 text-blue-400' : f.color
                            }`}>
                                {React.cloneElement(f.icon as React.ReactElement, {
                                  className: `w-6 h-6 ${(f.icon as React.ReactElement).props.className} ${
                                    darkMode ? 'text-blue-400' : ''
                                  }`
                                })}
                            </div>
                            <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                              darkMode ? 'text-slate-200' : 'text-gray-900'
                            }`}>{f.title}</h3>
                            <p className={`leading-relaxed transition-colors duration-300 ${
                              darkMode ? 'text-slate-400' : 'text-gray-600'
                            }`}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
