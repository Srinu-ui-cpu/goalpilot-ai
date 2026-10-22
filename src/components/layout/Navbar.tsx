'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Compass,
  Flame,
  KeyRound,
  Bell,
  Sparkles,
  BarChart3,
  Briefcase,
  Layers,
  BookOpen,
  Code2,
  CheckCircle2,
  User,
  Menu,
  X
} from 'lucide-react';
import { getStoredActiveGoal, getStoredBYOKConfig, getStoredNotifications, getStoredUserProfile } from '@/lib/storage';
import { AI_COACHES } from '@/lib/constants';
import { AICoachType } from '@/types';
import BYOKModal from '@/components/modals/BYOKModal';
import CoachSwitcherModal from '@/components/modals/CoachSwitcherModal';
import NotificationsDrawer from '@/components/modals/NotificationsDrawer';

export default function Navbar() {
  const pathname = usePathname();
  const [profile, setProfile] = useState(getStoredUserProfile());
  const [goal, setGoal] = useState(getStoredActiveGoal());
  const [byok, setByok] = useState(getStoredBYOKConfig());
  const [notifs, setNotifs] = useState(getStoredNotifications());
  const [isBYOKOpen, setIsBYOKOpen] = useState(false);
  const [isCoachOpen, setIsCoachOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setProfile(getStoredUserProfile());
      setGoal(getStoredActiveGoal());
      setByok(getStoredBYOKConfig());
      setNotifs(getStoredNotifications());
    };
    window.addEventListener('goalpilot_profile_updated', handleUpdate);
    window.addEventListener('goalpilot_goal_updated', handleUpdate);
    window.addEventListener('goalpilot_byok_updated', handleUpdate);
    window.addEventListener('goalpilot_notifs_updated', handleUpdate);
    return () => {
      window.removeEventListener('goalpilot_profile_updated', handleUpdate);
      window.removeEventListener('goalpilot_goal_updated', handleUpdate);
      window.removeEventListener('goalpilot_byok_updated', handleUpdate);
      window.removeEventListener('goalpilot_notifs_updated', handleUpdate);
    };
  }, []);

  const activeCoach = AI_COACHES.find(c => c.id === (goal.selectedCoach || profile.preferredAICoach)) || AI_COACHES[3];
  const unreadNotifs = notifs.filter(n => !n.read).length;
  const hasKeys = !!(byok.geminiKey || byok.openaiKey || byok.claudeKey || byok.openrouterKey || byok.deepseekKey);

  const navLinks = [
    { label: 'War Room', href: '/war-room', icon: Compass },
    { label: 'Session Room', href: '/session', icon: Sparkles, badge: 'Live' },
    { label: 'Goals', href: '/goals', icon: Layers },
    { label: 'Practice Vault', href: '/practice', icon: Code2 },
    { label: 'Interview Prep', href: '/interview', icon: BookOpen },
    { label: 'Projects Lab', href: '/projects', icon: Briefcase },
    { label: 'Roadmap', href: '/roadmap', icon: CheckCircle2 },
    { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                <span className="text-white text-lg font-black tracking-tight">GP</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                  GoalPilot <span className="text-indigo-400 font-mono text-xs font-semibold px-1.5 py-0.5 rounded bg-indigo-950/60 border border-indigo-800/50">AI</span>
                </span>
                <span className="text-[10px] text-zinc-400 hidden sm:inline -mt-0.5">Execution &gt; Passive Watching</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-zinc-800 text-white shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Icons & Modals */}
          <div className="flex items-center gap-2.5">
            {/* Streak Counter */}
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-red-400 text-xs font-semibold" title="Consecutive Execution Streak">
              <Flame className="w-4 h-4 text-red-500 animate-pulse" />
              <span>{profile.streakDays}d Streak</span>
            </div>

            {/* Coach Switcher Button */}
            <button
              onClick={() => setIsCoachOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 transition-colors"
              title="Click to Switch AI Coach Personality"
            >
              <span className="text-sm">{activeCoach.avatar}</span>
              <span className="hidden sm:inline font-medium">{activeCoach.name}</span>
            </button>

            {/* BYOK Button */}
            <button
              onClick={() => setIsBYOKOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                hasKeys
                  ? 'bg-emerald-950/50 border border-emerald-800/60 text-emerald-400 hover:bg-emerald-900/40'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
              }`}
              title="Bring Your Own AI Keys (Gemini, OpenAI, Claude, OpenRouter, DeepSeek)"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{hasKeys ? 'BYOK Connected' : 'BYOK Keys'}</span>
            </button>

            {/* Notifications Bell */}
            <button
              onClick={() => setIsNotifOpen(true)}
              className="relative p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title="Notifications & Accountability Reminders"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadNotifs}
                </span>
              )}
            </button>

            {/* Profile Avatar */}
            <Link
              href="/profile"
              className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-indigo-500 text-zinc-300 transition-colors"
              title="User Routine & Profile Settings"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-zinc-800 bg-zinc-950 p-4 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-zinc-300 hover:bg-zinc-900"
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Modals & Drawers */}
      <BYOKModal isOpen={isBYOKOpen} onClose={() => setIsBYOKOpen(false)} />
      <CoachSwitcherModal isOpen={isCoachOpen} onClose={() => setIsCoachOpen(false)} />
      <NotificationsDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
}
