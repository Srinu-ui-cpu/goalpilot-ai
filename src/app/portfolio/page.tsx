'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  Sparkles,
  Copy,
  Check,
  Share2,
  FileText,
  Linkedin,
  ExternalLink,
  Code2,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { generatePortfolioArtifacts } from '@/lib/portfolio-data';
import { PortfolioExport } from '@/types';
import { getStoredActiveGoal, getStoredUserProfile } from '@/lib/storage';

export default function PortfolioPage() {
  const goal = getStoredActiveGoal();
  const profile = getStoredUserProfile();

  const [portfolioData, setPortfolioData] = useState<PortfolioExport>(
    generatePortfolioArtifacts(goal.title, 'High-Throughput Financial Ledger & Analytics Engine', profile.careerGoal)
  );

  const [activeTab, setActiveTab] = useState<'case_study' | 'resume' | 'linkedin' | 'public_page'>('case_study');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-950 border border-amber-800 text-amber-400">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Career Portfolio & Proof of Work Builder</h1>
            <p className="text-xs text-zinc-400">Turn your capstone project into verifiable hiring assets: Case Study, Resume Bullets, and LinkedIn announcements.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 rounded-xl font-semibold">
            Ready to Publish
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 text-xs overflow-x-auto">
        {[
          { id: 'case_study', label: 'Technical Case Study', icon: FileText },
          { id: 'resume', label: 'Resume Bullet Points', icon: Code2 },
          { id: 'linkedin', label: 'LinkedIn Post Announcement', icon: Linkedin },
          { id: 'public_page', label: 'Public Portfolio Page View', icon: ExternalLink },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-medium whitespace-nowrap transition ${
                activeTab === tab.id ? 'bg-indigo-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      {activeTab === 'case_study' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-400">Markdown format ready for GitHub README or engineering blog.</span>
            <button
              onClick={() => handleCopy(portfolioData.caseStudy, 'case_study')}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white flex items-center gap-1.5"
            >
              {copiedKey === 'case_study' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'case_study' ? 'Copied Markdown!' : 'Copy Markdown'}</span>
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs font-mono text-zinc-200 leading-relaxed whitespace-pre-line overflow-x-auto">
            {portfolioData.caseStudy}
          </div>
        </div>
      )}

      {activeTab === 'resume' && (
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Quantified, action-verb bullet points optimized for Applicant Tracking Systems (ATS).</span>
            <button
              onClick={() => handleCopy(portfolioData.resumeBulletPoints.join('\n'), 'resume')}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white flex items-center gap-1.5"
            >
              {copiedKey === 'resume' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'resume' ? 'Copied Bullets!' : 'Copy All Bullets'}</span>
            </button>
          </div>

          <div className="space-y-3">
            {portfolioData.resumeBulletPoints.map((bullet, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-200 leading-relaxed flex items-start justify-between gap-3">
                <span className="flex-1">{bullet}</span>
                <button
                  onClick={() => handleCopy(bullet, `b_${idx}`)}
                  className="text-zinc-500 hover:text-zinc-300 shrink-0"
                >
                  {copiedKey === `b_${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'linkedin' && (
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">High-engagement announcement post highlighting engineering breakthroughs.</span>
            <button
              onClick={() => handleCopy(portfolioData.linkedInPost, 'linkedin')}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white flex items-center gap-1.5"
            >
              {copiedKey === 'linkedin' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'linkedin' ? 'Copied LinkedIn Post!' : 'Copy Post'}</span>
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-zinc-200 whitespace-pre-line leading-relaxed font-sans">
            {portfolioData.linkedInPost}
          </div>
        </div>
      )}

      {activeTab === 'public_page' && (
        <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl space-y-6 text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-indigo-400 font-mono">Verified Project Showcase</span>
              <h2 className="text-xl font-bold text-white mt-0.5">{portfolioData.projectTitle}</h2>
              <span className="text-zinc-400 text-xs">By {profile.name} • {profile.careerGoal}</span>
            </div>
            <a
              href={portfolioData.githubRepoUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white font-medium flex items-center gap-1.5"
            >
              <span>View GitHub Code</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-850 space-y-1">
            <span className="text-zinc-500 font-bold uppercase text-[10px] block">Architecture Stack:</span>
            <span className="text-zinc-300 font-mono text-[11px]">{portfolioData.architectureSummary}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">Benchmark Throughput</span>
              <span className="text-base font-bold text-white">100k tx/min</span>
            </div>
            <div className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">P95 Query Latency</span>
              <span className="text-base font-bold text-emerald-400">28ms</span>
            </div>
            <div className="p-3 bg-zinc-900/40 rounded-xl border border-zinc-800">
              <span className="text-zinc-500 block text-[10px]">Balance Concurrency Drift</span>
              <span className="text-base font-bold text-indigo-400">0.00%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
