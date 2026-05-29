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

export default function Features() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Everything you need to screen</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We've built a professional-grade pipeline to handle the most tedious part of hiring.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((f, i) => (
                        <div key={i} className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                            <div className={`w-12 h-12 ${f.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
