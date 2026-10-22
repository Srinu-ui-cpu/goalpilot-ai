'use client';

import { BYOKConfig, Goal, NotificationItem, SpacedRepetitionCard, UserProfile } from '@/types';
import { INITIAL_GOAL, INITIAL_SPACED_REPETITION_CARDS, INITIAL_USER_PROFILE } from './constants';

const KEYS = {
  USER_PROFILE: 'goalpilot_user_profile',
  ACTIVE_GOAL: 'goalpilot_active_goal',
  ALL_GOALS: 'goalpilot_all_goals',
  BYOK_CONFIG: 'goalpilot_byok_config',
  NOTIFICATIONS: 'goalpilot_notifications',
  SPACED_REPETITION: 'goalpilot_spaced_repetition',
  SESSION_NOTES: 'goalpilot_session_notes',
  DARK_MODE: 'goalpilot_dark_mode',
};

const DEFAULT_BYOK: BYOKConfig = {
  activeProvider: 'gemini',
  activeModel: 'gemini-1.5-pro',
};

export function getStoredUserProfile(): UserProfile {
  if (typeof window === 'undefined') return INITIAL_USER_PROFILE;
  try {
    const data = localStorage.getItem(KEYS.USER_PROFILE);
    return data ? JSON.parse(data) : INITIAL_USER_PROFILE;
  } catch (e) {
    console.error('Failed reading user profile', e);
    return INITIAL_USER_PROFILE;
  }
}

export function saveStoredUserProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(profile));
  window.dispatchEvent(new Event('goalpilot_profile_updated'));
}

export function getStoredActiveGoal(): Goal {
  if (typeof window === 'undefined') return INITIAL_GOAL;
  try {
    const data = localStorage.getItem(KEYS.ACTIVE_GOAL);
    return data ? JSON.parse(data) : INITIAL_GOAL;
  } catch (e) {
    console.error('Failed reading active goal', e);
    return INITIAL_GOAL;
  }
}

export function saveStoredActiveGoal(goal: Goal): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.ACTIVE_GOAL, JSON.stringify(goal));
  window.dispatchEvent(new Event('goalpilot_goal_updated'));
}

export function getStoredBYOKConfig(): BYOKConfig {
  if (typeof window === 'undefined') return DEFAULT_BYOK;
  try {
    const data = localStorage.getItem(KEYS.BYOK_CONFIG);
    return data ? JSON.parse(data) : DEFAULT_BYOK;
  } catch (e) {
    return DEFAULT_BYOK;
  }
}

export function saveStoredBYOKConfig(config: BYOKConfig): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.BYOK_CONFIG, JSON.stringify(config));
  window.dispatchEvent(new Event('goalpilot_byok_updated'));
}

export function getStoredNotifications(): NotificationItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(KEYS.NOTIFICATIONS);
    if (data) return JSON.parse(data);
  } catch (e) {
    // fallback
  }
  return [
    {
      id: 'n1',
      timestamp: '15 mins ago',
      type: 'reminder',
      title: 'T-Minus 15 Minutes: Session #3 Begins',
      message: 'Completing today’s Recursive CTEs mission moves you closer to your Senior Data Engineer target at Netflix.',
      read: false,
      actionUrl: '/session',
    },
    {
      id: 'n2',
      timestamp: '2 hours ago',
      type: 'accountability',
      title: 'Coach Goggins checked your streak',
      message: '14-Day Streak active! "Don’t you dare break the chain today!"',
      read: false,
    },
    {
      id: 'n3',
      timestamp: 'Yesterday',
      type: 'milestone',
      title: 'Window Functions Mastered!',
      read: true,
      message: 'You scored 96% in your Session #2 mandatory assessment. Weak areas: 0.',
    },
  ];
}

export function saveStoredNotifications(notifs: NotificationItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(notifs));
  window.dispatchEvent(new Event('goalpilot_notifs_updated'));
}

export function getStoredSpacedRepetition(): SpacedRepetitionCard[] {
  if (typeof window === 'undefined') return INITIAL_SPACED_REPETITION_CARDS;
  try {
    const data = localStorage.getItem(KEYS.SPACED_REPETITION);
    return data ? JSON.parse(data) : INITIAL_SPACED_REPETITION_CARDS;
  } catch (e) {
    return INITIAL_SPACED_REPETITION_CARDS;
  }
}

export function saveStoredSpacedRepetition(cards: SpacedRepetitionCard[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEYS.SPACED_REPETITION, JSON.stringify(cards));
}
