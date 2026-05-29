'use client';
import React from 'react';
import { Upload, Cpu, Trophy } from 'lucide-react';

const steps = [
    {
        title: 'Upload Resumes',
        desc: 'Drop your candidates\' PDF or DOCX files into the system.',
        icon: <Upload className="w-6 h-6" />,
    },
    {
        title: 'Define the Role',
        desc: 'Paste the Job Description or upload a JD document.',
        icon: <Cpu className="w-6 h-6" />,
    },
    {
        title: 'Hire the Best',
        desc: 'Get a ranked list of candidates based on skill match.',
        icon: <Trophy className="w-6 h-6" />,
    },
];

export default function HowItWorks({ darkMode }: { darkMode: boolean }) {
    return (
        <section className={`py-24 transition-colors duration-300 ${
          darkMode ? 'bg-slate-950 text-white' : 'bg-white text-gray-900'
        }`}>
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16 space-y-4">
                    <h2 className={`text-3xl md:text-4xl font-bold transition-colors duration-300 ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>How it works</h2>
                    <p className={`max-w-2xl mx-auto transition-colors duration-300 ${
                      darkMode ? 'text-slate-400' : 'text-gray-600'
                    }`}>
                        Three simple steps to find your next star employee.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className={`hidden md:block absolute top-1/2 left-0 w-full h-0.5 -z-10 transition-colors duration-300 ${
                      darkMode ? 'bg-slate-800' : 'bg-gray-200'
                    }`} />

                    {steps.map((s, i) => (
                        <div key={i} className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl relative z-10">
                                {s.icon}
                            </div>
                            <h3 className={`text-xl font-bold transition-colors duration-300 ${
                              darkMode ? 'text-slate-200' : 'text-gray-900'
                            }`}>{s.title}</h3>
                            <p className={`max-w-xs transition-colors duration-300 ${
                              darkMode ? 'text-slate-400' : 'text-gray-600'
                            }`}>{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
