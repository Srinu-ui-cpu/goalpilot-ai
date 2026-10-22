'use client';

import React from 'react';
import { X, Check, Sparkles, Volume2 } from 'lucide-react';
import { AI_COACHES } from '@/lib/constants';
import { AICoachType } from '@/types';
import { getStoredActiveGoal, getStoredUserProfile, saveStoredActiveGoal, saveStoredUserProfile } from '@/lib/storage';

interface CoachSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CoachSwitcherModal({ isOpen, onClose }: CoachSwitcherModalProps) {
  if (!isOpen) return null;

  const profile = getStoredUserProfile();
  const goal = getStoredActiveGoal();
  const currentCoachId = goal.selectedCoach || profile.preferredAICoach;

  const handleSelect = (coachId: AICoachType) => {
    saveStoredUserProfile({ ...profile, preferredAICoach: coachId });
    saveStoredActiveGoal({ ...goal, selectedCoach: coachId });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🎙️</span>
              <h3 className="text-lg font-bold text-white">Choose Your AI Accountability Coach</h3>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Switch your coach anytime. Your coach dictates reminder tone, live war room interventions, and assessment grading style.
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Coaches Grid */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[62vh] overflow-y-auto pr-1">
          {AI_COACHES.map((coach) => {
            const isSelected = currentCoachId === coach.id;
            return (
              <div
                key={coach.id}
                onClick={() => handleSelect(coach.id)}
                className={`relative p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-zinc-900/90 border-indigo-500 ring-1 ring-indigo-500 shadow-lg shadow-indigo-500/10'
                    : 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/70'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-3 right-3 flex items-center gap-1 text-[11px] font-semibold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-800">
                    <Check className="w-3 h-3" /> Active
                  </span>
                )}

                <div className="flex items-start gap-3">
                  <div className="text-3xl p-2 rounded-xl bg-zinc-800/80 border border-zinc-700/50">
                    {coach.avatar}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      {coach.name}
                      <span className="text-[11px] font-normal text-zinc-400">({coach.title})</span>
                    </h4>
                    <p className="text-xs text-indigo-300 font-medium mt-0.5 italic">
                      "{coach.tagline}"
                    </p>
                  </div>
                </div>

                <div className="mt-3 text-xs text-zinc-400 leading-relaxed border-t border-zinc-800/60 pt-2.5">
                  <span className="text-zinc-500 font-semibold block mb-0.5">Tone & Protocol:</span>
                  {coach.tone}
                </div>

                <div className="mt-2 text-xs bg-zinc-950/70 p-2.5 rounded-lg border border-zinc-800/60 text-zinc-300">
                  <span className="text-[10px] text-zinc-500 font-mono uppercase block mb-1">Sample Directive:</span>
                  "{coach.sampleQuote}"
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
