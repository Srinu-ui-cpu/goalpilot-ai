'use client';

import React, { useState } from 'react';
import { X, Check, CheckSquare, Square, Lock, Sparkles } from 'lucide-react';
import { PreStudyChecklistState } from '@/types';

interface PreStudyChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToFocus: () => void;
  sessionTitle: string;
}

export default function PreStudyChecklistModal({
  isOpen,
  onClose,
  onProceedToFocus,
  sessionTitle,
}: PreStudyChecklistModalProps) {
  const [checklist, setChecklist] = useState<PreStudyChecklistState>({
    waterBottle: true,
    notebook: true,
    pen: true,
    laptopCharger: false,
    washroomBreak: false,
    phoneSilent: false,
    deskPrepared: false,
  });

  if (!isOpen) return null;

  const items: { key: keyof PreStudyChecklistState; label: string; desc: string; icon: string }[] = [
    { key: 'waterBottle', label: 'Hydration Ready', desc: 'Water bottle at your desk', icon: '💧' },
    { key: 'notebook', label: 'Notebook Opened', desc: 'Physical or digital note workspace open', icon: '📓' },
    { key: 'pen', label: 'Pen / Stylus in Hand', desc: 'Active recall writing implement', icon: '🖊️' },
    { key: 'laptopCharger', label: 'Charger Plugged In', desc: 'Zero battery anxiety during focus block', icon: '🔌' },
    { key: 'washroomBreak', label: 'Bio / Washroom Break', desc: 'No physiological interruptions for 45 mins', icon: '🚪' },
    { key: 'phoneSilent', label: 'Phone on Do Not Disturb', desc: 'Facedown or outside arm reach', icon: '🔕' },
    { key: 'deskPrepared', label: 'Desk Cleared & Prepared', desc: 'Only mission-critical tabs and tools active', icon: '🧹' },
  ];

  const allChecked = Object.values(checklist).every(Boolean);

  const toggle = (key: keyof PreStudyChecklistState) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectAll = () => {
    setChecklist({
      waterBottle: true,
      notebook: true,
      pen: true,
      laptopCharger: true,
      washroomBreak: true,
      phoneSilent: true,
      deskPrepared: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🛡️</span>
              <h3 className="text-base font-bold text-white">Pre-Study Protocol Checklist</h3>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Lock in your environment before starting: <span className="text-indigo-400 font-medium">{sessionTitle}</span>
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checklist */}
        <div className="mt-4 space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
          {items.map(item => {
            const isChecked = checklist[item.key];
            return (
              <div
                key={item.key}
                onClick={() => toggle(item.key)}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-indigo-950/20 border-indigo-500/50 text-white'
                    : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <div className="text-xs font-semibold text-zinc-200">{item.label}</div>
                    <div className="text-[11px] text-zinc-400">{item.desc}</div>
                  </div>
                </div>
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-indigo-400 shrink-0" />
                ) : (
                  <Square className="w-5 h-5 text-zinc-600 shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between">
          <button
            onClick={handleSelectAll}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Mark All Ready
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-zinc-200"
            >
              Cancel
            </button>
            <button
              disabled={!allChecked}
              onClick={onProceedToFocus}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Enter Focus Mode</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
