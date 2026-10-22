'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Clock,
  Briefcase,
  Dumbbell,
  Bell,
  Sparkles,
  Check,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { getStoredUserProfile, saveStoredUserProfile } from '@/lib/storage';
import { UserProfile, AICoachType } from '@/types';
import { AI_COACHES } from '@/lib/constants';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(getStoredUserProfile());
  const [savedBanner, setSavedBanner] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredUserProfile(profile);
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
        <div className="p-2.5 rounded-2xl bg-indigo-950 border border-indigo-800 text-indigo-400">
          <User className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Learner Profile & Routine Settings</h1>
          <p className="text-xs text-zinc-400">These parameters feed the Smart Scheduling and Adaptive Reminder Engines.</p>
        </div>
      </div>

      {savedBanner && (
        <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Profile routine and coach preferences successfully saved!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Personal & Career Target */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-400" />
            <span>Identity & Career Target</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-zinc-300 font-semibold block mb-1">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-zinc-300 font-semibold block mb-1">Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-zinc-300 font-semibold block mb-1">Target Career Goal</label>
              <input
                type="text"
                value={profile.careerGoal}
                onChange={(e) => setProfile({ ...profile, careerGoal: e.target.value })}
                placeholder="e.g. Senior Data Platform Engineer"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="text-zinc-300 font-semibold block mb-1">Current Role</label>
              <input
                type="text"
                value={profile.currentRole}
                onChange={(e) => setProfile({ ...profile, currentRole: e.target.value })}
                placeholder="e.g. Software Developer"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Daily Routine Parameters */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" />
            <span>Circadian Rhythm & Daily Availability</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-zinc-300 font-semibold block mb-1">Wake-Up Time</label>
              <input
                type="time"
                value={profile.wakeUpTime}
                onChange={(e) => setProfile({ ...profile, wakeUpTime: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white"
              />
            </div>
            <div>
              <label className="text-zinc-300 font-semibold block mb-1">Sleep Time</label>
              <input
                type="time"
                value={profile.sleepTime}
                onChange={(e) => setProfile({ ...profile, sleepTime: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-zinc-300 font-semibold block mb-1">Work Timings</label>
              <input
                type="text"
                value={profile.workTimings}
                onChange={(e) => setProfile({ ...profile, workTimings: e.target.value })}
                placeholder="e.g. 09:00 - 18:00"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white"
              />
            </div>
            <div>
              <label className="text-zinc-300 font-semibold block mb-1">Gym / Fitness Routine</label>
              <input
                type="text"
                value={profile.gymSchedule}
                onChange={(e) => setProfile({ ...profile, gymSchedule: e.target.value })}
                placeholder="e.g. 07:00 - 08:00 (Mon, Wed, Fri)"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-zinc-300 font-semibold block mb-1">Daily Availability (Hours)</label>
              <input
                type="number"
                step="0.5"
                value={profile.availabilityHours}
                onChange={(e) => setProfile({ ...profile, availabilityHours: parseFloat(e.target.value) || 2 })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white"
              />
            </div>
            <div>
              <label className="text-zinc-300 font-semibold block mb-1">Preferred Focus Duration</label>
              <select
                value={profile.preferredStudyDuration}
                onChange={(e) => setProfile({ ...profile, preferredStudyDuration: parseInt(e.target.value) })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white"
              >
                <option value={25}>25 Minutes (Short Sprint)</option>
                <option value={45}>45 Minutes (Balanced Block)</option>
                <option value={60}>60 Minutes (Standard Deep Work)</option>
                <option value={90}>90 Minutes (Ultradian Cycle)</option>
              </select>
            </div>
            <div>
              <label className="text-zinc-300 font-semibold block mb-1">Timezone</label>
              <input
                type="text"
                value={profile.timezone}
                onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white"
              />
            </div>
          </div>
        </div>

        {/* Coach & Reminder Preferences */}
        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-400" />
            <span>AI Coach & Notification Channel</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-zinc-300 font-semibold block mb-1">Preferred AI Coach</label>
              <select
                value={profile.preferredAICoach}
                onChange={(e) => setProfile({ ...profile, preferredAICoach: e.target.value as AICoachType })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white"
              >
                {AI_COACHES.map(c => (
                  <option key={c.id} value={c.id}>{c.name} ({c.title})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-zinc-300 font-semibold block mb-1">Reminder Channels</label>
              <select
                value={profile.preferredReminderType}
                onChange={(e) => setProfile({ ...profile, preferredReminderType: e.target.value as any })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-white"
              >
                <option value="all">All Channels (Browser, Push, Email)</option>
                <option value="browser">Browser Only</option>
                <option value="push">Push & PWA Notifications</option>
                <option value="email">Email Only</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Save Profile & Calibrate Scheduler</span>
          </button>
        </div>
      </form>
    </div>
  );
}
