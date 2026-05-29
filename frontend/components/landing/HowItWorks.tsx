'use client';
import React from 'react';
import { UploadCloud, FileEdit, Award } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Batch Upload Resumes",
      desc: "Drag & drop multiple PDF or DOCX candidate resumes directly into our workspace. The engine automatically parses raw text from them.",
      icon: <UploadCloud className="w-8 h-8 text-blue-400" />
    },
    {
      step: "02",
      title: "Provide Job Specs",
      desc: "Type or upload the target Job Description (JD). List any technical parameters in a comma-separated format for dynamic skill discovery.",
      icon: <FileEdit className="w-8 h-8 text-indigo-400" />
    },
    {
      step: "03",
      title: "Analyze & Rank",
      desc: "Hit analyze. See scoring breakups, matching skills, missing skills, and instantly download a complete CSV report to share with your team.",
      icon: <Award className="w-8 h-8 text-purple-400" />
    }
  ];

  return (
    <section id="how-it-works" className="bg-slate-950 py-24 px-6 border-t border-slate-900 pb-32">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            How Simple Hiring Can Be
          </h2>
          <p className="text-slate-400">
            A linear, high-efficiency workflow designed to save recruiters up to 90% of manual review time.
          </p>
        </div>

        <div className="relative flex flex-col lg:flex-row gap-12 justify-between items-stretch">
          {/* Connector lines for large screens */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 z-0" />

          {steps.map((item, index) => (
            <div 
              key={index}
              className="relative flex-1 bg-slate-900/10 border border-slate-900/60 rounded-2xl p-8 flex flex-col items-center text-center z-10 hover:border-slate-800 transition-all"
            >
              {/* Step bubble */}
              <div className="absolute -top-4 left-6 px-3 py-1 bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-indigo-400 rounded-full">
                Step {item.step}
              </div>

              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl w-fit mb-6 shadow-lg shadow-black/40">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
