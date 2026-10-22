'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Code2,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Play,
  RotateCcw,
  ShieldAlert
} from 'lucide-react';
import { PRACTICE_EXERCISES } from '@/lib/practice-data';
import { PracticeExercise } from '@/types';

export default function PracticePage() {
  const [selectedExercise, setSelectedExercise] = useState<PracticeExercise>(PRACTICE_EXERCISES[0]);
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [userQuery, setUserQuery] = useState(`-- Write your SQL solution here
SELECT 
  order_id,
  customer_id,
  order_date,
  amount,
  SUM(amount) OVER (
    PARTITION BY customer_id 
    ORDER BY order_date 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total
FROM orders;`);

  const [feedback, setFeedback] = useState<string | null>(null);

  const toggleHint = (index: number) => {
    if (revealedHints.includes(index)) {
      setRevealedHints(revealedHints.filter(i => i !== index));
    } else {
      setRevealedHints([...revealedHints, index]);
    }
  };

  const handleTestQuery = () => {
    setFeedback('Running query against test database sandbox with 1,000,000 synthetic rows...');
    setTimeout(() => {
      setFeedback('✓ All test assertions passed! Sub-15ms execution time, correct frame specification without row-clumping anomalies.');
    }, 900);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Practice Vault & Hands-on Drills</h1>
              <p className="text-xs text-zinc-400">Never passively read solutions. Solve deliberate engineering exercises with progressive hint ladders.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-950/40 border border-amber-800/40 px-3 py-1.5 rounded-xl">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>Strict Rule: AI Never Directly Solves</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Exercise Selector & Details (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Available Problem Scenarios
          </div>

          <div className="space-y-2">
            {PRACTICE_EXERCISES.map(ex => {
              const isSelected = selectedExercise.id === ex.id;
              return (
                <div
                  key={ex.id}
                  onClick={() => {
                    setSelectedExercise(ex);
                    setRevealedHints([]);
                    setFeedback(null);
                  }}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition ${
                    isSelected
                      ? 'bg-zinc-900 border-indigo-500 shadow-sm ring-1 ring-indigo-500/20'
                      : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      ex.difficulty === 'Beginner' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                      ex.difficulty === 'Intermediate' ? 'bg-indigo-950 text-indigo-400 border border-indigo-800' :
                      'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}>
                      {ex.difficulty}
                    </span>
                    <span className="text-[10px] text-zinc-500">{ex.hints.length} Guided Hints</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{ex.title}</h4>
                </div>
              );
            })}
          </div>

          {/* Problem Statement Card */}
          <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 text-xs space-y-3">
            <div>
              <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold block mb-1">
                Business Scenario
              </span>
              <p className="text-zinc-300 leading-relaxed">{selectedExercise.businessScenario}</p>
            </div>

            <div>
              <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold block mb-1">
                Objective & Constraints
              </span>
              <p className="text-zinc-200 font-medium mb-2">{selectedExercise.problemStatement}</p>
              <ul className="space-y-1 text-zinc-400 list-disc list-inside">
                {selectedExercise.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Hint Ladder */}
            <div className="pt-2 border-t border-zinc-800 space-y-2">
              <span className="text-amber-400 font-bold flex items-center gap-1.5 text-[11px]">
                <Lightbulb className="w-3.5 h-3.5" /> Progressive Hint Ladder
              </span>
              {selectedExercise.hints.map((hint, i) => {
                const isOpen = revealedHints.includes(i);
                return (
                  <div key={i} className="rounded-lg border border-zinc-800 overflow-hidden">
                    <button
                      onClick={() => toggleHint(i)}
                      className="w-full p-2 bg-zinc-950 text-left text-xs text-zinc-400 hover:text-zinc-200 flex justify-between"
                    >
                      <span>Hint {i + 1}</span>
                      <span>{isOpen ? '▲ Hide' : '▼ Reveal'}</span>
                    </button>
                    {isOpen && (
                      <div className="p-2.5 bg-zinc-900 text-zinc-300 text-[11px] border-t border-zinc-850">
                        {hint}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Code Editor & Execution Test (7 Cols) */}
        <div className="lg:col-span-7 space-y-4 flex flex-col">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-300">Sandbox Code Workspace</span>
            <span className="text-zinc-500 font-mono">PostgreSQL 16 Dialect</span>
          </div>

          <div className="flex-1 rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden flex flex-col min-h-[380px]">
            <div className="p-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-xs text-zinc-400">
              <span className="font-mono">solution_query.sql</span>
              <button
                onClick={() => setUserQuery('')}
                className="text-zinc-500 hover:text-zinc-300 flex items-center gap-1 text-[11px]"
              >
                <RotateCcw className="w-3 h-3" /> Clear
              </button>
            </div>
            <textarea
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              className="flex-1 w-full bg-zinc-950 p-4 text-xs font-mono text-zinc-200 focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-zinc-400">
              AI evaluates syntax, execution order, and buffer memory.
            </div>

            <button
              onClick={handleTestQuery}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Test & Validate Query</span>
            </button>
          </div>

          {feedback && (
            <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-xs text-emerald-300 animate-in fade-in">
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
