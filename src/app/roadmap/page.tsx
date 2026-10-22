'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  CheckCircle2,
  Lock,
  Sparkles,
  Award,
  ChevronRight,
  Briefcase,
  DollarSign,
  Layers,
  ArrowRight
} from 'lucide-react';
import { CAREER_PATHS, CareerPathTrack, RoadmapNode } from '@/lib/career-roadmap';

export default function RoadmapPage() {
  const [selectedTrack, setSelectedTrack] = useState<CareerPathTrack>(CAREER_PATHS[0]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-950 border border-indigo-800 text-indigo-400">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Career Progression Roadmap</h1>
            <p className="text-xs text-zinc-400">Long-term trajectory from single courses to high-compensation staff engineering roles.</p>
          </div>
        </div>

        {/* Track Selector */}
        <div className="flex items-center gap-2">
          {CAREER_PATHS.map(track => (
            <button
              key={track.id}
              onClick={() => setSelectedTrack(track)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedTrack.id === track.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {track.roleTitle}
            </button>
          ))}
        </div>
      </div>

      {/* Track Target Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-indigo-950/40 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-mono uppercase font-bold text-indigo-400">Target Role Trajectory</span>
          <h2 className="text-2xl font-black text-white mt-0.5">{selectedTrack.roleTitle}</h2>
          <p className="text-xs text-zinc-300 mt-1 max-w-2xl">{selectedTrack.description}</p>
        </div>

        <div className="flex items-center gap-6 bg-zinc-950/80 p-4 rounded-2xl border border-zinc-800/80 shrink-0">
          <div>
            <span className="text-[10px] text-zinc-500 uppercase block">Salary Benchmark</span>
            <span className="text-base font-bold text-emerald-400">{selectedTrack.avgSalaryRange}</span>
          </div>
          <div className="h-8 w-px bg-zinc-800" />
          <div>
            <span className="text-[10px] text-zinc-500 uppercase block">Current Match</span>
            <span className="text-base font-bold text-indigo-400">{selectedTrack.currentMatchPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Interactive Node Roadmap Tree */}
      <div className="space-y-4">
        <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
          Curriculum Nodes & Milestones
        </div>

        <div className="space-y-4">
          {selectedTrack.nodes.map((node, idx) => {
            return (
              <div
                key={node.id}
                className={`p-6 rounded-2xl border transition-all ${
                  node.status === 'in_progress'
                    ? 'bg-zinc-900 border-indigo-500 ring-1 ring-indigo-500/20 shadow-xl'
                    : node.status === 'completed'
                    ? 'bg-zinc-900/40 border-emerald-800/60'
                    : 'bg-zinc-900/30 border-zinc-800/80 opacity-80'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-800/80 gap-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold ${
                      node.status === 'completed'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : node.status === 'in_progress'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-zinc-800 text-zinc-500'
                    }`}>
                      {node.status === 'completed' ? '✓' : node.status === 'locked' ? <Lock className="w-3.5 h-3.5" /> : idx + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">{node.category}</span>
                        {node.status === 'in_progress' && (
                          <span className="px-2 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-semibold">
                            Currently Active
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-white">{node.title}</h3>
                    </div>
                  </div>

                  <div className="text-xs text-zinc-400">
                    Est. Study: <strong>{node.estimatedHours} Hours</strong>
                  </div>
                </div>

                <p className="mt-3 text-xs text-zinc-300 leading-relaxed">{node.description}</p>

                {/* Skills Chips */}
                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  {node.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Suggested Project & Certification */}
                {(node.suggestedProject || node.recommendedCertifications) && (
                  <div className="mt-4 pt-3 border-t border-zinc-800/60 flex flex-wrap items-center justify-between text-xs gap-3">
                    {node.suggestedProject && (
                      <div className="flex items-center gap-1.5 text-zinc-300">
                        <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                        <span>Capstone: <strong>{node.suggestedProject}</strong></span>
                      </div>
                    )}

                    {node.recommendedCertifications && (
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <Award className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Recommended Cert: {node.recommendedCertifications.join(', ')}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
