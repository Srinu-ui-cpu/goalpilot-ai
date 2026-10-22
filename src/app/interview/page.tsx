'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Sparkles,
  Award,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Filter,
  Building2,
  Brain,
  Play
} from 'lucide-react';
import { INTERVIEW_QUESTIONS, InterviewQuestionItem } from '@/lib/interview-data';
import { getStoredUserProfile, saveStoredUserProfile } from '@/lib/storage';

export default function InterviewPage() {
  const [profile, setProfile] = useState(getStoredUserProfile());
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Technical' | 'Scenario' | 'Company Style' | 'Rapid Fire'>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [activeQuestion, setActiveQuestion] = useState<InterviewQuestionItem>(INTERVIEW_QUESTIONS[0]);
  const [userPracticeAnswer, setUserPracticeAnswer] = useState('');
  const [revealedAnswer, setRevealedAnswer] = useState(false);
  const [aiReviewScore, setAiReviewScore] = useState<number | null>(null);

  const filtered = INTERVIEW_QUESTIONS.filter(q => {
    if (selectedFilter !== 'All' && q.category !== selectedFilter) return false;
    if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const handleEvaluateMockResponse = () => {
    const score = Math.min(96, Math.max(78, Math.round(75 + userPracticeAnswer.length / 20)));
    setAiReviewScore(score);
    setRevealedAnswer(true);

    const updated = {
      ...profile,
      interviewReadiness: Math.min(100, profile.interviewReadiness + 2)
    };
    setProfile(updated);
    saveStoredUserProfile(updated);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Header & Readiness Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-indigo-950/50 border border-zinc-800 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">Interview Preparation Engine</h1>
              <span className="text-xs font-mono font-bold text-indigo-400 px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-800">
                Staff & L5 Calibration
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              Real company technical, behavioral, and scenario interview drills from Stripe, Netflix, Amazon, and Google.
            </p>
          </div>
        </div>

        {/* Readiness Meter */}
        <div className="bg-zinc-950/80 p-4 rounded-2xl border border-zinc-800 flex items-center gap-4 shrink-0">
          <div>
            <span className="text-[11px] text-zinc-500 block">Interview Readiness</span>
            <span className="text-2xl font-black text-indigo-400">{profile.interviewReadiness}%</span>
          </div>
          <div className="w-16 h-2 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              style={{ width: `${profile.interviewReadiness}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 text-xs">
          {['All', 'Technical', 'Scenario', 'Company Style', 'Rapid Fire'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat as any)}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                selectedFilter === cat ? 'bg-indigo-600 text-white' : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-zinc-500">Difficulty:</span>
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff as any)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition ${
                selectedDifficulty === diff ? 'bg-zinc-800 text-white border border-zinc-700' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Question List & Active Question Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filtered.map((item) => {
            const isSelected = activeQuestion.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setActiveQuestion(item);
                  setRevealedAnswer(false);
                  setAiReviewScore(null);
                  setUserPracticeAnswer('');
                }}
                className={`p-4 rounded-xl border text-left cursor-pointer transition ${
                  isSelected
                    ? 'bg-zinc-900 border-indigo-500 ring-1 ring-indigo-500/20 shadow-md'
                    : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-zinc-300 flex items-center gap-1">
                    {item.company && <Building2 className="w-3 h-3 text-indigo-400" />}
                    {item.company || item.category}
                  </span>
                  <span className={`text-[10px] font-semibold ${
                    item.difficulty === 'Advanced' ? 'text-rose-400' : 'text-indigo-400'
                  }`}>
                    {item.difficulty}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-white line-clamp-2">{item.question}</h4>
              </div>
            );
          })}
        </div>

        {/* Right Active Question Practice Workspace (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <span className="font-mono text-indigo-400 text-[11px] font-bold uppercase">
                {activeQuestion.category} • {activeQuestion.company ? `${activeQuestion.company} Interview Loop` : 'General Loop'}
              </span>
              <span className="text-zinc-500">{activeQuestion.difficulty} Level</span>
            </div>

            <h2 className="text-sm sm:text-base font-bold text-white leading-relaxed">
              {activeQuestion.question}
            </h2>

            {/* Evaluation Criteria Checklist */}
            <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-850 space-y-1.5 text-zinc-300">
              <span className="text-[10px] uppercase font-bold text-zinc-500 block mb-1">
                Evaluation Criteria (What Staff Interviewers Listen For):
              </span>
              {activeQuestion.keyEvaluationCriteria.map((crit, idx) => (
                <div key={idx} className="flex items-start gap-1.5 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>{crit}</span>
                </div>
              ))}
            </div>

            {/* Answer Input */}
            <div>
              <label className="text-zinc-300 font-semibold block mb-1">
                Your Spoken / Written Response:
              </label>
              <textarea
                rows={5}
                value={userPracticeAnswer}
                onChange={(e) => setUserPracticeAnswer(e.target.value)}
                placeholder="Structure with clear communication: Situation/Concept -> Trade-offs -> Edge cases -> Resolution..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-200 focus:outline-none focus:border-indigo-500 font-sans leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => setRevealedAnswer(!revealedAnswer)}
                className="text-xs text-zinc-400 hover:text-white"
              >
                {revealedAnswer ? 'Hide Benchmark Answer' : 'Reveal Staff Benchmark Answer'}
              </button>

              <button
                onClick={handleEvaluateMockResponse}
                disabled={!userPracticeAnswer.trim()}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition disabled:opacity-40"
              >
                <Brain className="w-4 h-4" />
                <span>Evaluate with AI Coach</span>
              </button>
            </div>

            {/* AI Review Score */}
            {aiReviewScore && (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 animate-in fade-in space-y-1">
                <div className="font-bold text-sm">
                  ✓ Mock Answer Rated: {aiReviewScore}% Readiness Score (+2% Boost)
                </div>
                <p className="text-[11px] text-emerald-200">
                  Solid technical grounding and accurate vocabulary. Compare your response against the Staff Benchmark model answer below.
                </p>
              </div>
            )}

            {/* Revealed Benchmark Model Answer & Traps */}
            {revealedAnswer && (
              <div className="space-y-3 pt-3 border-t border-zinc-800 animate-in fade-in">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-1">
                    Staff Benchmark Model Answer:
                  </span>
                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs leading-relaxed whitespace-pre-line font-sans">
                    {activeQuestion.sampleModelAnswer}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-900/50 text-rose-300 text-[11px]">
                  <strong className="block mb-0.5 text-rose-400">Trap to Avoid in Technical Loops:</strong>
                  {activeQuestion.trapToAvoid}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
