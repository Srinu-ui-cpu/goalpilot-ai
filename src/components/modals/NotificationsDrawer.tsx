'use client';

import React, { useState } from 'react';
import { X, Bell, CheckCheck, Clock, AlertTriangle, Sparkles, Send } from 'lucide-react';
import { getStoredNotifications, saveStoredNotifications } from '@/lib/storage';
import { NotificationItem } from '@/types';
import Link from 'next/link';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsDrawer({ isOpen, onClose }: NotificationsDrawerProps) {
  const [notifs, setNotifs] = useState<NotificationItem[]>(getStoredNotifications());
  const [testSent, setTestSent] = useState(false);

  if (!isOpen) return null;

  const handleMarkAllRead = () => {
    const updated = notifs.map(n => ({ ...n, read: true }));
    setNotifs(updated);
    saveStoredNotifications(updated);
  };

  const handleTriggerTestReminder = () => {
    // Request browser notification permission if available
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('GoalPilot AI: Session Starting in 15 Minutes', {
          body: 'Completing today’s SQL Recursive CTEs mission moves you closer to your Senior Data Engineer target at Netflix.',
          icon: '/favicon.ico'
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission();
      }
    }

    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      timestamp: 'Just now',
      type: 'reminder',
      title: 'T-Minus 15 Minutes: Session #3 Begins',
      message: 'Completing today’s SQL Recursive CTEs mission moves you closer to your Senior Data Engineer target at Netflix.',
      read: false,
      actionUrl: '/session',
    };

    const updated = [newNotif, ...notifs];
    setNotifs(updated);
    saveStoredNotifications(updated);
    setTestSent(true);
    setTimeout(() => setTestSent(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-md bg-zinc-950 border-l border-zinc-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-indigo-400" />
            <h3 className="font-bold text-sm text-white">Reminder & Accountability Center</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-zinc-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reminder Sequence Banner */}
        <div className="p-3 bg-zinc-900/60 border-b border-zinc-800/80 text-xs text-zinc-400">
          <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-300 uppercase mb-1.5">
            <span>Adaptive Reminder Sequence</span>
            <span className="text-emerald-400">PWA & Browser Active</span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono py-1 px-2 rounded bg-zinc-950 border border-zinc-800/80">
            <span>-15m</span>
            <span>-10m</span>
            <span>-5m</span>
            <span className="text-indigo-400 font-bold">START</span>
            <span className="text-amber-400">+10mLate</span>
            <span className="text-red-400">+30m</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="p-3 border-b border-zinc-800 flex items-center justify-between bg-zinc-950">
          <button
            onClick={handleTriggerTestReminder}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium shadow-sm transition"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{testSent ? 'Alert Dispatched!' : 'Simulate 15m Reminder'}</span>
          </button>
          <button
            onClick={handleMarkAllRead}
            className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" /> Mark All Read
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifs.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 text-xs">
              No notifications yet. You are completely up to date!
            </div>
          ) : (
            notifs.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  item.read
                    ? 'bg-zinc-900/30 border-zinc-800/60 opacity-80'
                    : 'bg-zinc-900/80 border-indigo-500/40 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                  <span className="font-semibold text-zinc-300 flex items-center gap-1">
                    {item.type === 'reminder' && <Clock className="w-3 h-3 text-indigo-400" />}
                    {item.type === 'accountability' && <AlertTriangle className="w-3 h-3 text-amber-400" />}
                    {item.type === 'milestone' && <Sparkles className="w-3 h-3 text-emerald-400" />}
                    {item.title}
                  </span>
                  <span>{item.timestamp}</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">{item.message}</p>
                {item.actionUrl && (
                  <div className="mt-2.5">
                    <Link
                      href={item.actionUrl}
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 hover:underline"
                    >
                      Enter War Room &rarr;
                    </Link>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
