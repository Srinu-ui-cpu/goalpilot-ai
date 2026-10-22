import React from 'react';
import Link from 'next/link';
import { Compass, ShieldCheck, Zap, Github, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800/80 bg-zinc-950/80 text-zinc-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              GP
            </div>
            <span className="font-bold text-white text-base">GoalPilot AI</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            The AI Learning Execution Platform engineered with one KPI: <strong>Goal Completion Rate</strong>. Move from passive video consumption to verified career readiness.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Zero Data Lock-in (BYOK Ready)</span>
          </div>
        </div>

        {/* Execution Engine */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider mb-3">Execution Engine</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/war-room" className="hover:text-white transition">Study War Room</Link></li>
            <li><Link href="/session" className="hover:text-white transition">Session Focus Mode</Link></li>
            <li><Link href="/goals" className="hover:text-white transition">AI Planning Interview</Link></li>
            <li><Link href="/goals" className="hover:text-white transition">Resource Ingestion Engine</Link></li>
            <li><Link href="/practice" className="hover:text-white transition">Practice Vault</Link></li>
          </ul>
        </div>

        {/* Career & Assessment */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider mb-3">Outcomes & Career</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/assessment" className="hover:text-white transition">Mandatory Assessment</Link></li>
            <li><Link href="/interview" className="hover:text-white transition">Interview Readiness Engine</Link></li>
            <li><Link href="/projects" className="hover:text-white transition">Capstone Project Generator</Link></li>
            <li><Link href="/portfolio" className="hover:text-white transition">Portfolio Case Study Builder</Link></li>
            <li><Link href="/roadmap" className="hover:text-white transition">Career Roadmaps</Link></li>
          </ul>
        </div>

        {/* BYOK & Extensions */}
        <div>
          <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider mb-3">Ecosystem</h4>
          <ul className="space-y-2 text-xs">
            <li><span className="text-zinc-500">Google Gemini 1.5 Pro/Flash</span></li>
            <li><span className="text-zinc-500">OpenAI GPT-4o / GPT-4o-mini</span></li>
            <li><span className="text-zinc-500">Anthropic Claude 3.5 Sonnet</span></li>
            <li><span className="text-zinc-500">DeepSeek V3 / R1</span></li>
            <li><span className="text-zinc-500">Chrome & Edge Extension (Manifest V3)</span></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-zinc-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
        <div>&copy; {new Date().getFullYear()} GoalPilot AI. Turn Learning Goals Into Completed Outcomes.</div>
        <div className="flex items-center gap-4">
          <Link href="/auth" className="hover:text-zinc-300">Sign In</Link>
          <a href="https://github.com/Srinu-ui-cpu/goalpilot-ai" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-zinc-300">
            <Github className="w-3.5 h-3.5" /> GitHub
          </a>
          <span>Production Ready SaaS</span>
        </div>
      </div>
    </footer>
  );
}
