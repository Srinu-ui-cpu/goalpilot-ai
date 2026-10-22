'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FileCode,
  FolderTree,
  Terminal,
  Database,
  Layers,
  Award,
  Send,
  AlertTriangle,
  UploadCloud,
  Check,
  ChevronDown
} from 'lucide-react';
import { CAPSTONE_PROJECTS, evaluateStudentProjectSubmission, AIReviewResult } from '@/lib/project-generator';
import { CapstoneProjectSpec } from '@/types';
import { getStoredUserProfile, saveStoredUserProfile } from '@/lib/storage';

export default function ProjectsPage() {
  const [project, setProject] = useState<CapstoneProjectSpec>(CAPSTONE_PROJECTS['industry_data_platform']);
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'database' | 'milestones' | 'reviewer'>('overview');
  const [submissionCode, setSubmissionCode] = useState(`-- Financial Ledger Transfer & Reconciliation Script
BEGIN TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- 1. Acquire row lock in deterministic order to prevent deadlocks
SELECT balance FROM accounts 
WHERE id IN ('acc_source_101', 'acc_dest_202') 
ORDER BY id 
FOR UPDATE;

-- 2. Verify debit normal account has sufficient funds
UPDATE accounts 
SET balance = balance - 500.00, updated_at = NOW() 
WHERE id = 'acc_source_101' AND balance >= 500.00;

-- 3. Credit destination
UPDATE accounts 
SET balance = balance + 500.00, updated_at = NOW() 
WHERE id = 'acc_dest_202';

-- 4. Insert immutable audit ledger entries
INSERT INTO ledger_entries (account_id, amount, direction, created_at)
VALUES 
  ('acc_source_101', 500.00, 'DEBIT', NOW()),
  ('acc_dest_202', 500.00, 'CREDIT', NOW());

COMMIT;`);

  const [reviewResult, setReviewResult] = useState<AIReviewResult | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);

  const handleReviewCode = () => {
    setIsReviewing(true);
    setTimeout(() => {
      const result = evaluateStudentProjectSubmission(submissionCode);
      setReviewResult(result);
      setIsReviewing(false);

      const profile = getStoredUserProfile();
      saveStoredUserProfile({
        ...profile,
        projectReadiness: Math.min(100, profile.projectReadiness + 4)
      });
    }, 1000);
  };

  const toggleMilestone = (index: number) => {
    setProject({
      ...project,
      milestones: project.milestones.map((m, i) => i === index ? { ...m, done: !m.done } : m)
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-950 border border-indigo-800 text-indigo-400">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">Capstone Project Lab & AI Reviewer</h1>
              <span className="text-[10px] font-mono font-bold text-indigo-300 px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-800">
                {project.level}
              </span>
            </div>
            <p className="text-xs text-zinc-400">Transform acquired syntax into verified enterprise software you can defend in technical interviews.</p>
          </div>
        </div>

        {/* Strict Project Rule Badge */}
        <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800/50 text-amber-300 text-xs flex items-center gap-2 shrink-0">
          <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
          <span><strong>Strict Rule:</strong> AI acts as Architect & Reviewer. You code yourself.</span>
        </div>
      </div>

      {/* Project Selector & Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-2 text-xs overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview & Business Context' },
          { id: 'architecture', label: 'Architecture & System Structure' },
          { id: 'database', label: 'Database & API Specifications' },
          { id: 'milestones', label: 'Milestones & Deliverables' },
          { id: 'reviewer', label: 'AI Code Reviewer & Evaluator' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-xl font-medium whitespace-nowrap transition ${
              activeTab === tab.id ? 'bg-indigo-600 text-white shadow-sm' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'overview' && (
        <div className="space-y-6 text-xs">
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <h2 className="text-lg font-bold text-white">{project.title}</h2>
            <div>
              <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold block mb-1">
                Problem Statement
              </span>
              <p className="text-zinc-200 leading-relaxed text-sm">{project.problemStatement}</p>
            </div>
            <div>
              <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold block mb-1">
                Business Context & Stakes
              </span>
              <p className="text-zinc-400 leading-relaxed">{project.businessContext}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-2">
              <span className="font-bold text-zinc-300 uppercase tracking-wider text-[11px] block">
                Required Tech Stack & Software
              </span>
              <ul className="space-y-1.5 text-zinc-300">
                {project.requiredSoftware.map((sw, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{sw}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-2">
              <span className="font-bold text-zinc-300 uppercase tracking-wider text-[11px] block">
                Success Criteria
              </span>
              <ul className="space-y-1.5 text-zinc-300">
                {project.successCriteria.map((sc, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{sc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'architecture' && (
        <div className="space-y-6 text-xs">
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold block">
              Architectural Summary
            </span>
            <p className="text-zinc-200 leading-relaxed font-mono">{project.architectureSummary}</p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="flex items-center justify-between text-zinc-400 font-mono text-xs border-b border-zinc-850 pb-2">
              <span className="flex items-center gap-1.5"><FolderTree className="w-4 h-4 text-indigo-400" /> Folder Structure Blueprint</span>
              <span>Production Layout</span>
            </div>
            <pre className="p-3 text-zinc-300 font-mono text-[11px] leading-relaxed overflow-x-auto">
              {project.folderStructure}
            </pre>
          </div>
        </div>
      )}

      {activeTab === 'database' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <Database className="w-4 h-4 text-indigo-400" />
              <span>Database Architecture Requirements</span>
            </div>
            <ul className="space-y-2 text-zinc-300">
              {project.databaseRequirements.map((req, i) => (
                <li key={i} className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-850">
                  {req}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <div className="flex items-center gap-2 font-bold text-white text-sm">
              <Layers className="w-4 h-4 text-purple-400" />
              <span>API Endpoints & Contracts</span>
            </div>
            <ul className="space-y-2 text-zinc-300 font-mono text-[11px]">
              {project.apiRequirements.map((req, i) => (
                <li key={i} className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-850">
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'milestones' && (
        <div className="space-y-4 text-xs">
          <div className="text-zinc-400">
            Track your capstone milestones. Ticking milestones updates your Project Readiness index on the dashboard.
          </div>
          <div className="space-y-2.5">
            {project.milestones.map((m, i) => (
              <div
                key={i}
                onClick={() => toggleMilestone(i)}
                className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                  m.done ? 'bg-indigo-950/20 border-indigo-500/50 text-white' : 'bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-white">{m.title}</h4>
                  <p className="text-[11px] text-zinc-400 mt-0.5">{m.desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                  m.done ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-zinc-700'
                }`}>
                  {m.done && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            <Link
              href="/portfolio"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition"
            >
              Export Capstone to Portfolio Builder &rarr;
            </Link>
          </div>
        </div>
      )}

      {activeTab === 'reviewer' && (
        <div className="space-y-6 text-xs">
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">AI Project Architecture Reviewer</h3>
              <p className="text-zinc-400">
                Paste your SQL scripts, schema migrations, concurrency locks, or API code below. The AI evaluates code quality, concurrency safety, buffer hits, and scalability.
              </p>
            </div>

            <textarea
              rows={8}
              value={submissionCode}
              onChange={(e) => setSubmissionCode(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs font-mono text-zinc-200 focus:outline-none focus:border-indigo-500 leading-relaxed"
            />

            <div className="flex justify-end">
              <button
                onClick={handleReviewCode}
                disabled={isReviewing}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isReviewing ? 'AI Reviewer Analyzing Systems Architecture...' : 'Submit Code for AI Review'}</span>
              </button>
            </div>
          </div>

          {/* AI Review Results */}
          {reviewResult && (
            <div className="p-6 rounded-2xl bg-zinc-900 border border-indigo-500/40 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-400">Architecture Evaluation</span>
                  <div className="text-xl font-black text-white">Score: {reviewResult.score}%</div>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 text-xs font-bold">
                    {reviewResult.architectureRating}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-emerald-400 font-bold block mb-1">Critical Strengths:</span>
                  <ul className="space-y-1 text-zinc-300 list-disc list-inside">
                    {reviewResult.criticalStrengths.map((str, idx) => (
                      <li key={idx}>{str}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-amber-400 font-bold block mb-1">Vulnerabilities & Optimization Gaps:</span>
                  <ul className="space-y-1 text-zinc-300 list-disc list-inside">
                    {reviewResult.vulnerabilitiesOrGaps.map((gap, idx) => (
                      <li key={idx}>{gap}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800">
                  <span className="text-zinc-500 uppercase font-bold text-[10px] block mb-1">Scalability Advice:</span>
                  <p className="text-zinc-300 leading-relaxed">{reviewResult.scalabilityAdvice}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
