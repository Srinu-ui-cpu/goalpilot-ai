'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Compass,
  Flame,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Play,
  ArrowRight,
  Sparkles,
  BookOpen,
  Code2,
  Briefcase,
  Layers,
  ShieldCheck,
  RefreshCw,
  Plus,
  Award
} from 'lucide-react';
import { getStoredActiveGoal, getStoredUserProfile, getStoredSpacedRepetition, saveStoredActiveGoal } from '@/lib/storage';
import { AI_COACHES } from '@/lib/constants';
import PreStudyChecklistModal from '@/components/modals/PreStudyChecklistModal';
import CommitmentContractModal from '@/components/modals/CommitmentContractModal';

export default function WarRoomPage() {
  const router = useRouter();
  const [profile, setProfile] = useState(getStoredUserProfile());
  const [goal, setGoal] = useState(getStoredActiveGoal());
  const [cards, setCards] = useState(getStoredSpacedRepetition());
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [isCommitmentOpen, setIsCommitmentOpen] = useState(false);
  const [recoveredBanner, setRecoveredBanner] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setProfile(getStoredUserProfile());
      setGoal(getStoredActiveGoal());
      setCards(getStoredSpacedRepetition());
    };
    window.addEventListener('goalpilot_profile_updated', handleUpdate);
    window.addEventListener('goalpilot_goal_updated', handleUpdate);
    return () => {
      window.removeEventListener('goalpilot_profile_updated', handleUpdate);
      window.removeEventListener('goalpilot_goal_updated', handleUpdate);
    };
  }, []);

  const currentCoach = AI_COACHES.find(c => c.id === (goal.selectedCoach || profile.preferredAICoach)) || AI_COACHES[3];
  const nextSession = goal.sessions?.find(s => s.status === 'in_progress' || s.status === 'upcoming') || goal.sessions?.[2];

  const handleTriggerRecovery = () => {
    setRecoveredBanner(true);
    const updated = {
      ...goal,
      sessions: goal.sessions.map((s, idx) => {
        if (s.status === 'missed') {
          return { ...s, status: 'recovered' as const };
        }
        return s;
      }),
    };
    setGoal(updated);
    saveStoredActiveGoal(updated);
    setTimeout(() => setRecoveredBanner(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Top Banner: Coach Directive */}
      <div className="relative p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-indigo-950/40 border border-zinc-800 shadow-xl overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="text-4xl p-2.5 rounded-2xl bg-zinc-800 border border-zinc-700/60 shrink-0">
            {currentCoach.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">{currentCoach.name} (Live Accountability)</h2>
              <span className="text-[10px] text-indigo-400 px-2 py-0.5 rounded-full bg-indigo-950/80 border border-indigo-800">Active</span>
            </div>
            <p className="text-sm sm:text-base text-zinc-200 mt-1 font-medium italic">
              &ldquo;{currentCoach.sampleQuote}&rdquo;
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {!goal.commitmentAcceptedAt && (
            <button
              onClick={() => setIsCommitmentOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition shadow-md flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Sign Commitment
            </button>
          )}
          <button
            onClick={handleTriggerRecovery}
            className="px-3.5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition flex items-center gap-1.5"
            title="Auto-adjust missed deadlines without breaking your schedule"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Adaptive Recovery
          </button>
        </div>
      </div>

      {recoveredBanner && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-medium flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Adaptive Recovery Plan Activated: Missed topics safely distributed to upcoming buffer days. Streak preserved!</span>
        </div>
      )}

      {/* Primary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 text-left">
        <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-[11px] text-zinc-500 block">Goal Progress</span>
          <span className="text-xl font-black text-indigo-400">{goal.progressPercentage}%</span>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-[11px] text-zinc-500 block">Hours Left</span>
          <span className="text-xl font-black text-white">{goal.hoursRemaining}h</span>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-[11px] text-zinc-500 block">Days Left</span>
          <span className="text-xl font-black text-white">{goal.daysRemaining}d</span>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-[11px] text-zinc-500 block">Streak</span>
          <span className="text-xl font-black text-red-400 flex items-center gap-1">
            <Flame className="w-4 h-4 fill-red-500" /> {profile.streakDays}d
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-[11px] text-zinc-500 block">Focus Score</span>
          <span className="text-xl font-black text-emerald-400">{profile.focusScore}%</span>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-[11px] text-zinc-500 block">Interview Ready</span>
          <span className="text-xl font-black text-amber-400">{profile.interviewReadiness}%</span>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-[11px] text-zinc-500 block">Project Ready</span>
          <span className="text-xl font-black text-cyan-400">{profile.projectReadiness}%</span>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-[11px] text-zinc-500 block">Probability</span>
          <span className="text-xl font-black text-indigo-400">94%</span>
        </div>
      </div>

      {/* MISSION CONTROL: START TODAY'S MISSION (Primary Hero Action) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-indigo-950/40 via-zinc-900/90 to-zinc-950 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold">
                SESSION #{nextSession?.sessionNumber || 3}
              </span>
              <span className="text-xs text-zinc-400">Scheduled for Today • {nextSession?.durationMinutes || 50} Minutes Focus</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {nextSession?.title || "Today's Mission: Recursive CTEs & Tree Traversal"}
            </h1>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              {nextSession?.description || "Construct recursive queries for employee manager hierarchies, category trees, and breadcrumb navigation with cycle prevention."}
            </p>

            {/* Checklist of Tasks */}
            <div className="pt-2 space-y-1.5">
              {nextSession?.tasks?.map((t) => (
                <div key={t.id} className="flex items-center gap-2 text-xs text-zinc-400">
                  <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border ${t.completed ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-zinc-700 bg-zinc-950'}`}>
                    {t.completed && <CheckCircle2 className="w-3 h-3" />}
                  </div>
                  <span className={t.completed ? 'line-through text-zinc-500' : 'text-zinc-300'}>{t.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Big CTA Button */}
          <div className="flex flex-col items-center lg:items-end gap-3 shrink-0">
            <button
              onClick={() => setIsChecklistOpen(true)}
              className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-lg shadow-2xl shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
            >
              <Play className="w-6 h-6 fill-white text-white group-hover:scale-110 transition-transform" />
              <span>START TODAY'S MISSION</span>
            </button>
            <span className="text-[11px] text-zinc-400">
              ⚡ Pre-study checklist unlocks full focus session
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Goal & Sessions + Spaced Repetition Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Session Roadmap */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <h3 className="font-bold text-sm text-white">Active Curriculum Roadmap</h3>
            </div>
            <Link href="/goals" className="text-xs text-indigo-400 hover:underline flex items-center gap-1">
              Goal Details &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {goal.sessions?.map((sess) => {
              const isCurrent = sess.id === nextSession?.id;
              return (
                <div
                  key={sess.id}
                  className={`p-4 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-zinc-900 border-indigo-500/80 shadow-md ring-1 ring-indigo-500/30'
                      : sess.status === 'completed'
                      ? 'bg-zinc-900/30 border-zinc-800/60 opacity-80'
                      : 'bg-zinc-900/50 border-zinc-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                        sess.status === 'completed'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : isCurrent
                          ? 'bg-indigo-600 text-white'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}>
                        {sess.status === 'completed' ? '✓' : sess.sessionNumber}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          {sess.title}
                          {isCurrent && (
                            <span className="text-[10px] font-semibold text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded-full border border-indigo-800">
                              Active Today
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-zinc-400">{sess.description}</p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs text-zinc-400 block">{sess.durationMinutes} mins</span>
                      {isCurrent ? (
                        <button
                          onClick={() => setIsChecklistOpen(true)}
                          className="mt-1 px-3 py-1 rounded-md bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition"
                        >
                          Launch
                        </button>
                      ) : sess.status === 'completed' ? (
                        <span className="text-[11px] text-emerald-400 font-medium">Completed</span>
                      ) : (
                        <span className="text-[11px] text-zinc-500">Upcoming</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Spaced Repetition Queue & Quick Links */}
        <div className="space-y-6">
          {/* Spaced Repetition Box */}
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-200">Spaced Repetition (Due Today)</h3>
              </div>
              <span className="text-xs font-bold text-amber-400">{cards.length} Cards</span>
            </div>

            <p className="text-xs text-zinc-400 mb-4">
              Neuroscience intervals (1d, 3d, 7d, 14d, 30d) scheduled automatically to prevent learning decay.
            </p>

            <div className="space-y-3">
              {cards.map(c => (
                <div key={c.id} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs">
                  <div className="flex items-center justify-between text-zinc-500 text-[10px] mb-1 font-mono">
                    <span>{c.topic}</span>
                    <span className="text-amber-400 font-bold">{c.intervalDays}d Interval</span>
                  </div>
                  <div className="font-medium text-zinc-200 mb-1">{c.question}</div>
                  <div className="text-zinc-400 text-[11px] italic bg-zinc-900/60 p-2 rounded border border-zinc-800/40">
                    {c.answer}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/practice"
              className="mt-4 block text-center py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition"
            >
              Review All Flashcards
            </Link>
          </div>

          {/* Quick Hub Navigation */}
          <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-2.5 text-xs">
            <div className="font-bold text-zinc-200 text-xs uppercase tracking-wider mb-2">Outcome Hubs</div>
            <Link href="/practice" className="flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-800/60 text-zinc-300">
              <span className="flex items-center gap-2"><Code2 className="w-4 h-4 text-indigo-400" /> Practice Vault (Hands-on Code)</span>
              <span>&rarr;</span>
            </Link>
            <Link href="/interview" className="flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-800/60 text-zinc-300">
              <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-purple-400" /> Interview Question Engine</span>
              <span>&rarr;</span>
            </Link>
            <Link href="/projects" className="flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-800/60 text-zinc-300">
              <span className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-emerald-400" /> Capstone Project Lab & Reviewer</span>
              <span>&rarr;</span>
            </Link>
            <Link href="/portfolio" className="flex items-center justify-between p-2.5 rounded-lg hover:bg-zinc-800/60 text-zinc-300">
              <span className="flex items-center gap-2"><Award className="w-4 h-4 text-amber-400" /> Portfolio & LinkedIn Case Studies</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PreStudyChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
        onProceedToFocus={() => {
          setIsChecklistOpen(false);
          router.push('/session');
        }}
        sessionTitle={nextSession?.title || "Today's Study Mission"}
      />

      <CommitmentContractModal
        isOpen={isCommitmentOpen}
        onClose={() => setIsCommitmentOpen(false)}
        onSigned={() => {
          setGoal(getStoredActiveGoal());
        }}
        goalTitle={goal.title}
      />
    </div>
  );
}
