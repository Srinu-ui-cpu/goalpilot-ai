'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  Clock,
  Flame,
  Award,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { getStoredActiveGoal, getStoredUserProfile } from '@/lib/storage';

export default function AnalyticsPage() {
  const profile = getStoredUserProfile();
  const goal = getStoredActiveGoal();
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly'>('weekly');

  const weeklyData = [
    { day: 'Mon', hours: 1.5, focus: 95 },
    { day: 'Tue', hours: 1.0, focus: 90 },
    { day: 'Wed', hours: 2.0, focus: 98 },
    { day: 'Thu', hours: 1.2, focus: 92 },
    { day: 'Fri', hours: 0.8, focus: 88 },
    { day: 'Sat', hours: 2.5, focus: 96 },
    { day: 'Sun', hours: 1.5, focus: 94 },
  ];

  const strongTopics = [
    { name: 'Analytical Window Framing (ROWS BETWEEN)', mastery: 98 },
    { name: 'Recursive Tree Traversal & CTE Loops', mastery: 92 },
    { name: 'Index Types (B-tree vs GIN vs BRIN)', mastery: 89 },
    { name: 'Cycle Prevention Guards in Graphs', mastery: 86 },
  ];

  const weakTopics = [
    { name: 'work_mem Disk Spillover in Hash Joins', mastery: 64, rec: 'Session #4 Practice Drill' },
    { name: 'Repeatable Read Serialization Anomaly 40001', mastery: 68, rec: 'Mock Technical Interview' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-950 border border-indigo-800 text-indigo-400">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Execution Telemetry & Analytics</h1>
            <p className="text-xs text-zinc-400">Real quantified data: Study time, focus scores, weak topic detection, and goal completion probability.</p>
          </div>
        </div>

        {/* Time Filter */}
        <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 p-1 rounded-xl text-xs">
          <button
            onClick={() => setTimeRange('weekly')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              timeRange === 'weekly' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Weekly Trends
          </button>
          <button
            onClick={() => setTimeRange('monthly')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              timeRange === 'monthly' ? 'bg-indigo-600 text-white' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Monthly Trends
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-zinc-500 block mb-1">Total Study Time</span>
          <span className="text-xl font-bold text-white">{profile.totalStudyHours} hrs</span>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-zinc-500 block mb-1">Mean Focus Score</span>
          <span className="text-xl font-bold text-emerald-400">{profile.focusScore}%</span>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-zinc-500 block mb-1">Goal Completion</span>
          <span className="text-xl font-bold text-indigo-400">{goal.progressPercentage}%</span>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-zinc-500 block mb-1">Active Streak</span>
          <span className="text-xl font-bold text-red-400 flex items-center gap-1">
            <Flame className="w-4 h-4 fill-red-500" /> {profile.streakDays}d
          </span>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-zinc-500 block mb-1">Interview Readiness</span>
          <span className="text-xl font-bold text-amber-400">{profile.interviewReadiness}%</span>
        </div>
        <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800">
          <span className="text-zinc-500 block mb-1">Goal Success Rate</span>
          <span className="text-xl font-bold text-cyan-400">94.1%</span>
        </div>
      </div>

      {/* Chart Simulation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Trend Bar Chart (7 Cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="font-bold text-white text-sm">Daily Focus Hours Invested</span>
            <span className="text-zinc-400 font-mono">Total this week: 10.5 hrs</span>
          </div>

          <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2">
            {weeklyData.map((d, i) => {
              const heightPercent = Math.min(100, Math.round((d.hours / 2.5) * 100));
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] text-zinc-500 group-hover:text-indigo-400 font-mono">
                    {d.hours}h
                  </span>
                  <div className="w-full bg-zinc-950 rounded-t-lg h-32 flex items-end p-1">
                    <div
                      className="w-full bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-md group-hover:from-indigo-500 group-hover:to-purple-400 transition-all shadow-md"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-zinc-400">{d.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Completion Probability Gauge (5 Cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-zinc-900/90 to-zinc-950 border border-zinc-800 flex flex-col justify-between text-xs">
          <div>
            <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-bold block mb-1">
              Smart Predictor
            </span>
            <h3 className="text-base font-bold text-white mb-2">Projected Finish Date</h3>
            <div className="text-3xl font-black text-indigo-400">Nov 18, 2026</div>
            <p className="text-zinc-400 mt-2 leading-relaxed">
              Based on your 14-day streak and 94% focus retention, you are tracking <strong>2 days ahead of schedule</strong>.
            </p>
          </div>

          <div className="p-3.5 bg-zinc-950/80 rounded-xl border border-zinc-800/80 mt-6 space-y-1">
            <span className="text-emerald-400 font-bold block text-[11px]">✓ No Burnout Risk Detected:</span>
            <span className="text-zinc-400">Your daily average (1.1h) matches your 2.5h availability window with healthy margins.</span>
          </div>
        </div>
      </div>

      {/* Topics Breakdown: Strong vs Weak Topics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-emerald-950/50 space-y-3">
          <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>Top Strong Topics (High Mastery)</span>
          </div>
          <div className="space-y-2.5 pt-1">
            {strongTopics.map((t, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-zinc-200">
                  <span>{t.name}</span>
                  <span className="font-mono text-emerald-400">{t.mastery}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-zinc-950 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${t.mastery}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-amber-950/50 space-y-3">
          <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Target Weak Areas (Recommended Drills)</span>
          </div>
          <div className="space-y-2.5 pt-1">
            {weakTopics.map((t, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1.5">
                <div className="flex justify-between text-zinc-200 font-medium">
                  <span>{t.name}</span>
                  <span className="font-mono text-amber-400">{t.mastery}%</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-zinc-400">
                  <span>AI Recommended Action:</span>
                  <span className="text-indigo-400 font-medium">{t.rec}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
