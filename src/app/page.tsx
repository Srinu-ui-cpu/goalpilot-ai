'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  Sparkles,
  Flame,
  CheckCircle2,
  ShieldCheck,
  Zap,
  BookOpen,
  Code2,
  Award,
  Layers,
  ChevronRight,
  Users,
  Clock,
  Play,
  Cpu,
  HelpCircle
} from 'lucide-react';
import { AI_COACHES } from '@/lib/constants';
import { AICoachType } from '@/types';

export default function LandingPage() {
  const [selectedCoach, setSelectedCoach] = useState<AICoachType>('david_goggins');
  const activeCoach = AI_COACHES.find(c => c.id === selectedCoach) || AI_COACHES[3];

  return (
    <div className="relative overflow-hidden">
      {/* Background radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-indigo-600/20 via-purple-600/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 mb-8 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">GoalPilot AI is NOT an AI Chatbot</span>
          <span className="text-zinc-500">•</span>
          <span className="text-indigo-400 font-semibold">It is an AI Learning Execution Platform</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.1]">
          Turn Learning Goals Into{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Completed Outcomes
          </span>
        </h1>

        {/* Tagline & Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          The only platform engineered with one primary KPI: <strong className="text-zinc-200">Goal Completion Rate</strong>. 
          From YouTube playlists to PDFs, we turn open tabs into an adaptive schedule, relentless accountability, mandatory assessments, and verifiable portfolio projects.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/war-room"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-base shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Start Free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white font-medium text-base transition-all flex items-center justify-center gap-2"
          >
            <span>See How It Works</span>
          </a>
        </div>

        {/* Micro Guarantee */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Bring Your Own AI Keys (Gemini, Claude, OpenAI)</span>
          <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-indigo-400" /> Adaptive Schedules That Never Guilt-Trip</span>
          <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-amber-400" /> Mandatory End-Of-Session Assessments</span>
        </div>

        {/* Interactive Hero War Room Preview Card */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-6 shadow-2xl backdrop-blur-xl text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-zinc-800 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-950 border border-indigo-800 text-indigo-400 flex items-center justify-center font-bold">
                SQL
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Active Mission: Recursive CTEs & Graph Traversal</h3>
                <p className="text-xs text-zinc-400">PostgreSQL Advanced Query Engineering • Session #3 of 16</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs font-semibold">
                94% Completion Probability
              </span>
              <Link
                href="/session"
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition"
              >
                Enter Session Room
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-2 text-xs">
            <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800/80">
              <span className="text-zinc-500 block mb-1">Execution Streak</span>
              <span className="text-lg font-bold text-red-400 flex items-center gap-1">
                <Flame className="w-4 h-4 fill-red-500 text-red-500" /> 14 Days
              </span>
            </div>
            <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800/80">
              <span className="text-zinc-500 block mb-1">Hours Invested</span>
              <span className="text-lg font-bold text-white">48.5 hrs</span>
            </div>
            <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800/80">
              <span className="text-zinc-500 block mb-1">Interview Readiness</span>
              <span className="text-lg font-bold text-indigo-400">76% L5 Caliber</span>
            </div>
            <div className="bg-zinc-950/70 p-3 rounded-xl border border-zinc-800/80">
              <span className="text-zinc-500 block mb-1">Capstone Status</span>
              <span className="text-lg font-bold text-amber-400">Ledger Engine (M2)</span>
            </div>
          </div>
        </div>
      </section>

      {/* CORE KPI: EXECUTION OVER ILLUSION */}
      <section className="py-16 bg-zinc-950 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">The Brutal Truth</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Online courses have a <span className="text-red-400">96% dropout rate</span>. Watching videos is not learning.
              </h2>
              <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                Most platforms profit when you buy courses, not when you finish them. You bookmark 10 YouTube tutorials, download 5 PDFs, and 3 weeks later you are back at square one.
              </p>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed">
                GoalPilot AI exists to fix this failure mode. We replace endless passive binge-watching with an <strong>Execution Pipeline</strong>:
              </p>

              <div className="mt-6 space-y-2.5 text-xs text-zinc-300 font-mono">
                <div className="flex items-center gap-2 text-indigo-300">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Goal &rarr; AI Planning Interview &rarr; Adaptive Schedule</span>
                </div>
                <div className="flex items-center gap-2 text-purple-300">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Accountability Coach &rarr; Deep Focus &rarr; Mandatory Assessment</span>
                </div>
                <div className="flex items-center gap-2 text-pink-300">
                  <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
                  <span>Spaced Repetition &rarr; Production Capstone &rarr; Verified Portfolio</span>
                </div>
              </div>
            </div>

            {/* Comparison Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 text-left">
                <div className="text-3xl font-black text-zinc-500 mb-1">4.2%</div>
                <div className="text-sm font-semibold text-zinc-300">Average MOOC Completion</div>
                <p className="text-xs text-zinc-500 mt-2">
                  No scheduling accountability, no verified assessments, high cognitive overwhelm.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-500/40 text-left relative overflow-hidden">
                <div className="text-3xl font-black text-emerald-400 mb-1">94.1%</div>
                <div className="text-sm font-semibold text-white">GoalPilot AI Completion</div>
                <p className="text-xs text-zinc-400 mt-2">
                  Energy-aware schedules, relentless coach reminders, and active practice requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE COACH SHOWCASE */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Accountability Engine</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Meet Your AI Accountability Coach
          </h2>
          <p className="mt-3 text-sm text-zinc-400">
            Different learners need different stimuli. Pick the coach personality that drives your focus, and switch anytime.
          </p>
        </div>

        {/* Coach Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {AI_COACHES.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCoach(c.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCoach === c.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <span>{c.avatar}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>

        {/* Active Coach Interactive Card */}
        <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-zinc-900/70 border border-zinc-800 relative overflow-hidden text-left">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="text-4xl p-3 rounded-2xl bg-zinc-800 border border-zinc-700/60">
                {activeCoach.avatar}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {activeCoach.name}
                  <span className="text-xs font-normal text-indigo-400 px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-800">
                    {activeCoach.title}
                  </span>
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">{activeCoach.tone}</p>
              </div>
            </div>
            <Link
              href="/session"
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-white transition flex items-center gap-1.5"
            >
              <span>Study With {activeCoach.name.split(' ')[0]}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            <div className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Live War Room Directive:</div>
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 text-sm text-zinc-200 font-medium italic leading-relaxed">
              &ldquo;{activeCoach.sampleQuote}&rdquo;
            </div>
            <p className="text-xs text-zinc-400">
              <strong>Accountability Guarantee:</strong> Your coach tracks your late starts, fires goal-anchored reminders, and prevents you from marking a session complete until you pass the mandatory technical assessment.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-zinc-950/60 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">The Six-Stage Journey</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              From Ingestion to Career-Ready Proof
            </h2>
            <p className="mt-3 text-sm text-zinc-400">
              How GoalPilot AI guarantees you finish what you start.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Ingest Any Material',
                desc: 'Paste a YouTube playlist, drop a 300-page PDF, connect LeetCode, or import GitHub repos. Our engine chunks it into semantic units.',
                icon: Layers,
              },
              {
                step: '02',
                title: 'AI Planning Interview',
                desc: 'AI interviews your daily life: wake-up time, commute, gym, peak focus windows. We never divide content into blind equal slices.',
                icon: Clock,
              },
              {
                step: '03',
                title: 'Commitment Contract',
                desc: 'Formally sign your digital commitment before day one. Sets psychological lock-in and accountability parameters.',
                icon: ShieldCheck,
              },
              {
                step: '04',
                title: 'War Room Deep Work',
                desc: 'Pre-study checklist (water, phone silent, desk cleared) + built-in Pomodoro + synchronized resource viewer.',
                icon: Zap,
              },
              {
                step: '05',
                title: 'Mandatory Assessment',
                desc: 'Cannot mark session complete without answering concept, scenario, practical, interview, and ELI10 questions.',
                icon: BookOpen,
              },
              {
                step: '06',
                title: 'Capstone & Portfolio',
                desc: 'AI generates a production capstone specification, acts as code reviewer (never writes code for you), and drafts your case study.',
                icon: Award,
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.step} className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 text-left hover:border-zinc-700 transition">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-indigo-400 px-2.5 py-1 rounded-md bg-indigo-950/60 border border-indigo-800/40">
                      STEP {card.step}
                    </span>
                    <Icon className="w-5 h-5 text-zinc-400" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2">Simple Transparent Access</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Bring Your Own Keys. Pay \$0 for Token Markups.
          </h2>
          <p className="mt-3 text-sm text-zinc-400">
            We believe learners shouldn't be charged 5x markups on API tokens. Enter your own Gemini, OpenAI, Claude, or DeepSeek key.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          {/* Free BYOK Tier */}
          <div className="p-7 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">Self-Starter (BYOK)</div>
              <div className="text-3xl font-extrabold text-white mb-2">$0 <span className="text-xs font-normal text-zinc-500">/ forever</span></div>
              <p className="text-xs text-zinc-400 mb-6">Use your own AI provider keys. Complete execution engine unlocked.</p>
              <ul className="space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> All 6 AI Coaches Unlocked</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited Resource Ingestions</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Mandatory Assessment Grading</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Browser Extension Companion</li>
              </ul>
            </div>
            <Link href="/war-room" className="mt-8 block text-center py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition">
              Get Started Free
            </Link>
          </div>

          {/* Pro Hosted Tier */}
          <div className="p-7 rounded-2xl bg-gradient-to-b from-indigo-950/60 to-zinc-900 border border-indigo-500/50 flex flex-col justify-between relative shadow-xl shadow-indigo-600/10">
            <span className="absolute top-4 right-4 text-[10px] font-bold text-indigo-300 bg-indigo-500/20 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
              POPULAR
            </span>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">GoalPilot Pro</div>
              <div className="text-3xl font-extrabold text-white mb-2">$19 <span className="text-xs font-normal text-zinc-400">/ month</span></div>
              <p className="text-xs text-zinc-300 mb-6">No API key required. High-speed Gemini 1.5 Pro & Claude Sonnet included.</p>
              <ul className="space-y-2.5 text-xs text-zinc-200">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Hosted Unlimited AI Inference</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> SMS & WhatsApp Accountability Reminders</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Live Project Code Architecture Reviews</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Automated Resume & LinkedIn Case Studies</li>
              </ul>
            </div>
            <Link href="/war-room" className="mt-8 block text-center py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-lg transition">
              Start 14-Day Free Trial
            </Link>
          </div>

          {/* Lifetime Career Tier */}
          <div className="p-7 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">Career Pass</div>
              <div className="text-3xl font-extrabold text-white mb-2">$149 <span className="text-xs font-normal text-zinc-500">/ one-time</span></div>
              <p className="text-xs text-zinc-400 mb-6">Lifetime access for serious engineers targeting promotion or career pivots.</p>
              <ul className="space-y-2.5 text-xs text-zinc-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Lifetime Updates & Roadmap Access</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unlimited Capstone Project Specs</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Mock Technical Interview Simulator</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Priority Feature Access</li>
              </ul>
            </div>
            <Link href="/war-room" className="mt-8 block text-center py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition">
              Get Lifetime Access
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-zinc-400 mt-1">Everything you need to know about execution-first learning.</p>
          </div>

          <div className="space-y-4 text-xs">
            {[
              {
                q: 'How is GoalPilot AI different from ChatGPT or Claude?',
                a: 'ChatGPT is a conversational chatbot where you ask questions. GoalPilot AI is an execution operating system. It ingests your learning resources, interviews your life routine, builds difficulty-weighted schedules, sends personalized reminders, locks you into focus mode, and enforces mandatory technical assessments before you can mark progress.'
              },
              {
                q: 'Can I bring my own Gemini or OpenAI API keys?',
                a: 'Yes! GoalPilot AI is BYOK-first. You can input your Google Gemini, OpenAI, Claude, OpenRouter, or DeepSeek API key. Your keys are stored client-side and never touched by third parties.'
              },
              {
                q: 'What happens if I miss a scheduled study session?',
                a: 'We never guilt-trip you or reset your progress. The Smart Scheduling Engine automatically triggers a recovery plan, shifting non-critical review sessions to your upcoming buffer days without overloading your work routine.'
              },
              {
                q: 'Will the AI write code for my capstone projects?',
                a: 'Never. GoalPilot AI enforces the Strict Project Rule: AI acts as an architect, mentor, and code reviewer, but never outputs complete solutions. You must write the code yourself to build real neural pathways and career confidence.'
              }
            ].map((faq, i) => (
              <div key={i} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <div className="font-bold text-zinc-100 text-sm mb-1">{faq.q}</div>
                <div className="text-zinc-400 leading-relaxed">{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
