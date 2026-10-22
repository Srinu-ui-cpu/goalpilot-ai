'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, Check, Sparkles, Award } from 'lucide-react';
import { getStoredActiveGoal, saveStoredActiveGoal, getStoredUserProfile } from '@/lib/storage';

interface CommitmentContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSigned: () => void;
  goalTitle: string;
}

export default function CommitmentContractModal({
  isOpen,
  onClose,
  onSigned,
  goalTitle,
}: CommitmentContractModalProps) {
  const profile = getStoredUserProfile();
  const [signatureName, setSignatureName] = useState(profile.name || 'Srinu Reddy');
  const [hasAgreed, setHasAgreed] = useState(false);

  if (!isOpen) return null;

  const handleSignContract = () => {
    const goal = getStoredActiveGoal();
    const updated = {
      ...goal,
      commitmentAcceptedAt: new Date().toISOString(),
      commitmentSignature: signatureName.trim(),
    };
    saveStoredActiveGoal(updated);
    onSigned();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Glow */}
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="text-center pb-4 border-b border-zinc-800">
          <div className="inline-flex p-3 rounded-2xl bg-amber-950/40 border border-amber-800/50 text-amber-400 mb-2">
            <Award className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-white tracking-tight">The GoalPilot Commitment Contract</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Execution begins with an inviolable promise to yourself.
          </p>
        </div>

        {/* Contract Parchment */}
        <div className="mt-5 p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs text-zinc-300 space-y-3 leading-relaxed">
          <p className="font-serif italic text-zinc-200 text-sm">
            "I, <span className="text-amber-300 font-bold underline">{signatureName || 'Learner'}</span>, hereby commit to completing my objective:
            <span className="block font-bold text-white mt-1 text-sm not-italic">
              &ldquo;{goalTitle}&rdquo;
            </span>
          </p>
          <p>
            I acknowledge that passively watching tutorials creates the illusion of competence. Real skill requires deliberate reps, struggling through errors, and facing technical assessments without shortcuts.
          </p>
          <p>
            When motivation fades, I will rely on discipline. I authorize my AI Accountability Coach to hold me to the schedule I have established.
          </p>
          <div className="pt-2 flex items-center justify-between text-[11px] text-zinc-400 border-t border-zinc-800">
            <span>Platform KPI: <strong>100% Goal Completion</strong></span>
            <span>Date: {new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Signature & Agreement */}
        <div className="mt-5 space-y-3">
          <div>
            <label className="text-xs font-semibold text-zinc-300 block mb-1">
              Digital Signature (Full Legal or Preferred Name)
            </label>
            <input
              type="text"
              value={signatureName}
              onChange={(e) => setSignatureName(e.target.value)}
              placeholder="e.g. Srinu Reddy"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500 font-serif"
            />
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={hasAgreed}
              onChange={(e) => setHasAgreed(e.target.checked)}
              className="mt-1 rounded bg-zinc-900 border-zinc-800 text-indigo-600 focus:ring-0"
            />
            <span className="text-xs text-zinc-300">
              I accept this commitment contract and pledge to show up for today’s scheduled mission.
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-zinc-200"
          >
            Review Later
          </button>
          <button
            disabled={!hasAgreed || !signatureName.trim()}
            onClick={handleSignContract}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold shadow-lg shadow-amber-600/25 transition flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Sign & Lock In Goal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
