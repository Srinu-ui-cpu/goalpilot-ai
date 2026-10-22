'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Brain,
  HelpCircle,
  FileCheck,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SESSION_ASSESSMENT_QUESTIONS } from '@/lib/assessment-data';
import { AssessmentEvaluation } from '@/types';
import { generateSyntheticAssessmentEvaluation } from '@/lib/ai-engine';
import { getStoredActiveGoal, getStoredUserProfile, saveStoredActiveGoal, saveStoredUserProfile } from '@/lib/storage';

export default function AssessmentPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, string>>({
    q1: 'In PostgreSQL, the anchor query runs first to create the working table. Then the recursive member repeatedly executes using that working table until it produces zero rows.',
    q2: 'To prevent an infinite loop from a cycle, I track visited IDs in an array like ARRAY[id], and guard the recursive step with WHERE NOT (id = ANY(path)).',
    q3: 'SELECT id, manager_id, 1 as depth, name as breadcrumb FROM emp WHERE manager_id IS NULL UNION ALL SELECT e.id, e.manager_id, t.depth + 1, t.breadcrumb || " > " || e.name FROM emp e JOIN cte t ON e.manager_id = t.id',
    q4: 'UNION ALL skips row sorting and deduplication hashing, preserving CPU and preventing temporary disk spills when result size exceeds work_mem.',
    q5: 'Think of Russian nesting dolls. You open the biggest doll, then look inside for the next smaller one, until you reach the smallest solid toy and you are finished.'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [evaluation, setEvaluation] = useState<AssessmentEvaluation | null>(null);

  const handleAnswerChange = (qId: string, text: string) => {
    setAnswers(prev => ({ ...prev, [qId]: text }));
  };

  const handleSubmitAssessment = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 1200));
      const formatted = Object.entries(answers).map(([questionId, answerText]) => ({
        questionId,
        answerText
      }));

      const res = generateSyntheticAssessmentEvaluation(formatted);
      setEvaluation(res);

      if (res.overallScore >= 75) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });

        // Update stored profile & goal progress
        const profile = getStoredUserProfile();
        const goal = getStoredActiveGoal();

        saveStoredUserProfile({
          ...profile,
          focusScore: Math.min(100, profile.focusScore + 2),
          interviewReadiness: Math.min(100, profile.interviewReadiness + 3),
          streakDays: profile.streakDays + 1,
          totalStudyHours: profile.totalStudyHours + 1.0
        });

        saveStoredActiveGoal({
          ...goal,
          progressPercentage: Math.min(100, goal.progressPercentage + 6),
          hoursRemaining: Math.max(0, Number((goal.hoursRemaining - 1.0).toFixed(1))),
          sessions: goal.sessions.map((s, idx) => idx === 2 ? { ...s, status: 'completed' as const } : s)
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-800 text-xs font-semibold text-indigo-400">
          <Brain className="w-3.5 h-3.5" />
          <span>Mandatory Execution Gate</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          End-of-Session Technical Assessment
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
          You cannot mark Session #3 finished by passively watching. Prove your grasp across concepts, scenarios, interview questions, and first principles.
        </p>
      </div>

      {!evaluation ? (
        /* The 5 Assessment Questions */
        <div className="space-y-6">
          {SESSION_ASSESSMENT_QUESTIONS.map((q, idx) => (
            <div key={q.id} className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-400 px-2.5 py-1 rounded bg-indigo-950/70 border border-indigo-800/60">
                  {q.badge}
                </span>
                <span className="text-[11px] text-zinc-500">Question {idx + 1} of 5</span>
              </div>

              <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                {q.question}
              </h3>

              <div className="text-[11px] text-zinc-400 bg-zinc-950/70 p-2.5 rounded-lg border border-zinc-850 italic">
                <strong>Context Hint:</strong> {q.contextHint}
              </div>

              <div>
                <label className="text-[11px] text-zinc-400 font-semibold block mb-1">
                  Your Technical Answer:
                </label>
                <textarea
                  rows={3}
                  value={answers[q.id] || ''}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  placeholder="Articulate your thought process clearly with technical terminology..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 focus:outline-none focus:border-indigo-500 font-mono leading-relaxed"
                />
              </div>
            </div>
          ))}

          {/* Submit Action */}
          <div className="pt-4 flex items-center justify-between">
            <Link
              href="/session"
              className="text-xs text-zinc-400 hover:text-white"
            >
              &larr; Back to Resource Viewer
            </Link>

            <button
              onClick={handleSubmitAssessment}
              disabled={isSubmitting}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition flex items-center gap-2 disabled:opacity-50"
            >
              <FileCheck className="w-4 h-4" />
              <span>{isSubmitting ? 'AI Coach Evaluating Answers...' : 'Submit Answers for AI Evaluation'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* Evaluation Results Card */
        <div className="space-y-6 animate-in fade-in">
          {/* Top Score Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/60 via-zinc-900 to-zinc-950 border border-indigo-500/40 text-center relative overflow-hidden shadow-2xl">
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2">
              Verified Technical Assessment Passed
            </div>
            <div className="text-5xl font-black text-white tracking-tight">
              {evaluation.overallScore}%
            </div>
            <p className="text-xs text-zinc-300 mt-2">
              Session #3 marked completed! Streak extended to 15 Days.
            </p>

            {/* Dimensional Score Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-6 border-t border-zinc-800 text-xs">
              <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800">
                <span className="text-zinc-500 block mb-1">Understanding</span>
                <span className="text-base font-bold text-white">{evaluation.understandingScore}%</span>
              </div>
              <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800">
                <span className="text-zinc-500 block mb-1">Communication</span>
                <span className="text-base font-bold text-white">{evaluation.communicationScore}%</span>
              </div>
              <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800">
                <span className="text-zinc-500 block mb-1">Confidence</span>
                <span className="text-base font-bold text-white">{evaluation.confidenceScore}%</span>
              </div>
              <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800">
                <span className="text-zinc-500 block mb-1">Practical Depth</span>
                <span className="text-base font-bold text-white">{evaluation.practicalScore}%</span>
              </div>
              <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800 col-span-2 sm:col-span-1">
                <span className="text-zinc-500 block mb-1">Interview Ready</span>
                <span className="text-base font-bold text-emerald-400">{evaluation.interviewReadinessScore}%</span>
              </div>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-emerald-900/40 space-y-2">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <CheckCircle2 className="w-4 h-4" /> Evaluated Strengths
              </div>
              <ul className="space-y-1.5 text-zinc-300">
                {evaluation.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-900/60 border border-amber-900/40 space-y-2">
              <div className="font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <AlertTriangle className="w-4 h-4" /> Areas for Refinement
              </div>
              <ul className="space-y-1.5 text-zinc-300">
                {evaluation.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Better Answer & Expert Answer Rubric */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4 text-xs">
            <div>
              <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold block mb-1">
                Stronger Articulation
              </span>
              <p className="text-zinc-300 leading-relaxed bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
                {evaluation.betterAnswer}
              </p>
            </div>

            <div>
              <span className="text-indigo-400 uppercase tracking-wider text-[10px] font-bold block mb-1">
                Staff / Expert-Level Benchmark
              </span>
              <p className="text-zinc-200 leading-relaxed bg-indigo-950/20 p-3.5 rounded-xl border border-indigo-800/40 font-mono text-[11px]">
                {evaluation.expertAnswer}
              </p>
            </div>

            <div>
              <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold block mb-1">
                Coach Synthesis
              </span>
              <p className="text-zinc-400 leading-relaxed">
                {evaluation.detailedExplanation}
              </p>
            </div>
          </div>

          {/* Next Steps Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => setEvaluation(null)}
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Re-take Assessment
            </button>

            <div className="flex items-center gap-3">
              <Link
                href="/practice"
                className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-200 hover:text-white transition"
              >
                Go to Practice Vault
              </Link>
              <Link
                href="/war-room"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
              >
                <span>Return to Study War Room</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
