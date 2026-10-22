'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Minimize2,
  Sparkles,
  BookOpen,
  FileText,
  Code2,
  Video,
  ListTodo,
  CheckCircle2,
  Send,
  HelpCircle,
  Bookmark,
  Highlighter,
  ChevronRight,
  ShieldCheck,
  CheckSquare,
  Square,
  Volume2,
  Bot,
  Brain,
  Award
} from 'lucide-react';
import { getStoredActiveGoal, getStoredBYOKConfig, getStoredUserProfile, saveStoredActiveGoal } from '@/lib/storage';
import { AI_COACHES } from '@/lib/constants';
import { askAI } from '@/lib/ai-engine';
import PreStudyChecklistModal from '@/components/modals/PreStudyChecklistModal';

export default function SessionPage() {
  const router = useRouter();
  const [goal, setGoal] = useState(getStoredActiveGoal());
  const [profile, setProfile] = useState(getStoredUserProfile());
  const [byok, setByok] = useState(getStoredBYOKConfig());

  // Pomodoro timer state
  const [timerMode, setTimerMode] = useState<'25/5' | '50/10' | '90/15' | 'custom'>('50/10');
  const [secondsRemaining, setSecondsRemaining] = useState(50 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Active resource viewer tab
  const [activeViewer, setActiveViewer] = useState<'video' | 'pdf' | 'github' | 'article' | 'transcript'>('video');

  // Interactive notes state
  const [notesText, setNotesText] = useState(`## Session Notes: Recursive Common Table Expressions (CTEs)
- An anchor query runs first and builds the working table.
- UNION ALL is strongly preferred over UNION to skip deduplication overhead.
- Termination condition: Recursive term returns 0 rows.
- Cycle guard: ARRAY[id] || visited_ids to avoid infinite loops.`);

  // Auto notes tabs
  const [activeNoteTab, setActiveNoteTab] = useState<'personal' | 'summary' | 'cheat_sheet' | 'interview_notes'>('personal');

  // Flashcards state
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);

  // AI Chat Assistant
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([
    {
      role: 'assistant',
      text: "🔥 I'm your AI Study Assistant for this session! Ask me to explain concepts, generate cheat sheets, test your recursive logic, or clarify execution plans. No passive watching!"
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  const currentCoach = AI_COACHES.find(c => c.id === (goal.selectedCoach || profile.preferredAICoach)) || AI_COACHES[3];
  const activeSession = goal.sessions?.[2] || goal.sessions?.[0];

  // Pomodoro interval loop
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsRemaining]);

  const switchTimerMode = (mode: '25/5' | '50/10' | '90/15' | 'custom') => {
    setTimerMode(mode);
    setIsTimerRunning(false);
    if (mode === '25/5') setSecondsRemaining(25 * 60);
    else if (mode === '50/10') setSecondsRemaining(50 * 60);
    else if (mode === '90/15') setSecondsRemaining(90 * 60);
    else setSecondsRemaining(45 * 60);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleTask = (taskId: string) => {
    const updated = {
      ...goal,
      sessions: goal.sessions.map(s => {
        if (s.id === activeSession.id) {
          return {
            ...s,
            tasks: s.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
          };
        }
        return s;
      })
    };
    setGoal(updated);
    saveStoredActiveGoal(updated);
  };

  const handleSendMessage = async (customPrompt?: string) => {
    const promptToSend = customPrompt || inputMsg;
    if (!promptToSend.trim()) return;

    const userMessage = { role: 'user' as const, text: promptToSend };
    setChatMessages(prev => [...prev, userMessage]);
    if (!customPrompt) setInputMsg('');
    setIsAiLoading(true);

    try {
      const reply = await askAI({
        userPrompt: promptToSend,
        coachType: goal.selectedCoach,
        context: `Session Topic: ${activeSession.title}. Notes: ${notesText}`,
        byokConfig: byok
      });
      setChatMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    } catch (e: any) {
      setChatMessages(prev => [...prev, { role: 'assistant', text: 'Error connecting to AI coach. Running cognitive fallback mode.' }]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleEndSessionAndAssess = () => {
    router.push('/assessment');
  };

  const flashcards = [
    {
      q: 'What is the working table in a recursive CTE?',
      a: 'The temporary rowset populated by the anchor query and refreshed by each iteration until 0 rows remain.'
    },
    {
      q: 'Why should you avoid UNION in recursive queries?',
      a: 'UNION enforces costly sorting/hashing deduplication across every pass. Use UNION ALL unless duplicates are inherent to the graph.'
    },
    {
      q: 'How do you detect cycles in directed graphs?',
      a: 'Accumulate visited node IDs in an array and add: WHERE NOT (child_id = ANY(visited_array)).'
    }
  ];

  return (
    <div className={`w-full min-h-screen bg-zinc-950 text-zinc-100 flex flex-col ${isFocusMode ? 'fixed inset-0 z-50 p-4 bg-black overflow-y-auto' : ''}`}>
      {/* SESSION HEADER */}
      <div className="w-full border-b border-zinc-800 bg-zinc-950/90 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Mission Details */}
        <div className="flex items-center gap-3">
          <Link href="/war-room" className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 font-medium">
            &larr; War Room
          </Link>
          <div className="h-4 w-px bg-zinc-800" />
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                SESSION #3
              </span>
              <h2 className="text-sm font-bold text-white tracking-tight">{activeSession.title}</h2>
            </div>
            <span className="text-[11px] text-zinc-400">PostgreSQL Query Engineering • Difficulty: Hard</span>
          </div>
        </div>

        {/* Live Countdown & Pomodoro Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800">
            <span className="text-xs text-zinc-400 font-medium">Focus Timer:</span>
            <span className="text-base font-mono font-bold text-indigo-400">{formatTimer(secondsRemaining)}</span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white transition ml-1"
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
            </button>
            <button
              onClick={() => switchTimerMode(timerMode)}
              className="p-1 rounded text-zinc-400 hover:text-white transition"
              title="Reset Timer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Focus Mode Fullscreen Button */}
          <button
            onClick={() => setIsFocusMode(!isFocusMode)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-medium text-zinc-300 transition"
          >
            {isFocusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span>{isFocusMode ? 'Exit Focus' : 'Focus Mode'}</span>
          </button>

          {/* Primary Complete CTA */}
          <button
            onClick={handleEndSessionAndAssess}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md transition flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Finish & Take Assessment</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT AREA: 3-COLUMN OR SPLIT EXPERIENCE */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* LEFT / CENTER: RESOURCE VIEWER & SESSION TASKS (8 COLS) */}
        <div className="lg:col-span-8 flex flex-col border-r border-zinc-800/80 bg-zinc-950/40 overflow-y-auto">
          {/* Resource Viewer Tabs */}
          <div className="border-b border-zinc-800 bg-zinc-950 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[
                { id: 'video', label: 'Video Player', icon: Video },
                { id: 'pdf', label: 'PDF & Notes', icon: FileText },
                { id: 'github', label: 'GitHub Explorer', icon: Code2 },
                { id: 'article', label: 'Article Mode', icon: BookOpen },
                { id: 'transcript', label: 'Transcript & Search', icon: ListTodo },
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeViewer === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveViewer(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                      isActive ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 text-zinc-400 text-xs">
              <span className="flex items-center gap-1 cursor-pointer hover:text-white" title="Bookmark current timestamp">
                <Bookmark className="w-3.5 h-3.5" /> Bookmark
              </span>
              <span className="flex items-center gap-1 cursor-pointer hover:text-white" title="Highlight selection">
                <Highlighter className="w-3.5 h-3.5" /> Highlight
              </span>
            </div>
          </div>

          {/* VIEWER DISPLAY */}
          <div className="p-4 sm:p-6 flex-1">
            {activeViewer === 'video' && (
              <div className="space-y-4">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl flex flex-col items-center justify-center group">
                  {/* Embedded Simulated / Real Player */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                    <div className="text-white text-base font-bold">
                      Lecture 3: Recursive CTE Mechanics & Tree Traversal (PostgreSQL 16)
                    </div>
                    <div className="text-xs text-zinc-300 mt-1 flex items-center gap-3">
                      <span>Timestamp: 14:28 / 48:15</span>
                      <span>Speed: 1.25x</span>
                      <span className="text-emerald-400">Audio Synced</span>
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition cursor-pointer">
                    <Play className="w-7 h-7 fill-white translate-x-0.5" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-300 space-y-1">
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>Key Lesson Timestamps</span>
                    <span className="text-indigo-400">Click to jump</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button className="text-left p-2 rounded bg-zinc-950 border border-zinc-800 hover:border-indigo-500">
                      <strong>03:15:</strong> The Anchor Member
                    </button>
                    <button className="text-left p-2 rounded bg-zinc-950 border border-zinc-800 hover:border-indigo-500">
                      <strong>14:28:</strong> UNION ALL vs UNION Trade-offs
                    </button>
                    <button className="text-left p-2 rounded bg-zinc-950 border border-zinc-800 hover:border-indigo-500">
                      <strong>28:40:</strong> Cycle Detection with Arrays
                    </button>
                    <button className="text-left p-2 rounded bg-zinc-950 border border-zinc-800 hover:border-indigo-500">
                      <strong>41:10:</strong> EXPLAIN ANALYZE Buffer Hits
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeViewer === 'pdf' && (
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-4 text-xs font-serif leading-relaxed text-zinc-300">
                <div className="border-b border-zinc-800 pb-3 flex items-center justify-between font-sans">
                  <span className="font-bold text-white text-sm">PostgreSQL Internals Guide (Chapter 7: CTEs)</span>
                  <span className="text-zinc-500">Page 142 of 380</span>
                </div>
                <h3 className="font-sans font-bold text-base text-white">Section 7.4: Recursive Query Evaluation Semantics</h3>
                <p>
                  A recursive evaluation in PostgreSQL does not use standard function recursion on the call stack. Instead, the executor maintains two stateful data structures in memory: the <em>working table</em> and the <em>intermediate table</em>.
                </p>
                <div className="p-3 bg-indigo-950/40 border-l-2 border-indigo-500 text-indigo-200 font-mono text-[11px] my-2">
                  WITH RECURSIVE subordinates AS (<br />
                  &nbsp;&nbsp;SELECT employee_id, manager_id, full_name, 1 as level<br />
                  &nbsp;&nbsp;FROM employees WHERE manager_id IS NULL<br />
                  &nbsp;&nbsp;UNION ALL<br />
                  &nbsp;&nbsp;SELECT e.employee_id, e.manager_id, e.full_name, s.level + 1<br />
                  &nbsp;&nbsp;FROM employees e JOIN subordinates s ON e.manager_id = s.employee_id<br />
                  )<br />
                  SELECT * FROM subordinates;
                </div>
                <p>
                  At iteration 0, the non-recursive term (anchor) runs and fills the working table. In iteration 1, the recursive query runs, referencing the contents of the working table, and inserts rows into the intermediate table...
                </p>
              </div>
            )}

            {activeViewer === 'github' && (
              <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden text-xs font-mono">
                <div className="p-3 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
                  <span className="text-zinc-400">repo: postgresql-advanced-patterns / queries / recursive_tree.sql</span>
                  <span className="text-emerald-400">main branch</span>
                </div>
                <div className="p-4 space-y-1 text-zinc-300 overflow-x-auto">
                  <div><span className="text-indigo-400">-- Cycle-guarded recursive employee hierarchy query</span></div>
                  <div><span className="text-purple-400">WITH RECURSIVE</span> emp_tree <span className="text-purple-400">AS</span> (</div>
                  <div className="pl-4"><span className="text-zinc-500">-- 1. Anchor member</span></div>
                  <div className="pl-4"><span className="text-indigo-400">SELECT</span> id, name, manager_id, 1 <span className="text-purple-400">AS</span> depth, <span className="text-amber-400">ARRAY</span>[id] <span className="text-purple-400">AS</span> path</div>
                  <div className="pl-4"><span className="text-indigo-400">FROM</span> employees <span className="text-indigo-400">WHERE</span> manager_id <span className="text-indigo-400">IS NULL</span></div>
                  <div className="pl-4"><span className="text-purple-400">UNION ALL</span></div>
                  <div className="pl-4"><span className="text-zinc-500">-- 2. Recursive member</span></div>
                  <div className="pl-4"><span className="text-indigo-400">SELECT</span> e.id, e.name, e.manager_id, t.depth + 1, t.path || e.id</div>
                  <div className="pl-4"><span className="text-indigo-400">FROM</span> employees e <span className="text-indigo-400">JOIN</span> emp_tree t <span className="text-indigo-400">ON</span> e.manager_id = t.id</div>
                  <div className="pl-4"><span className="text-indigo-400">WHERE NOT</span> (e.id = <span className="text-indigo-400">ANY</span>(t.path))</div>
                  <div>)</div>
                  <div><span className="text-indigo-400">SELECT</span> * <span className="text-indigo-400">FROM</span> emp_tree;</div>
                </div>
              </div>
            )}

            {activeViewer === 'article' && (
              <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3 text-xs leading-relaxed text-zinc-300 max-w-3xl">
                <h3 className="text-lg font-bold text-white">Why UNION ALL is 10x Faster Than UNION in Large Recursive Datasets</h3>
                <p>
                  Whenever you use <code>UNION</code>, the database engine must eliminate duplicates after every recursive iteration. This implies either maintaining an in-memory hash table or sorting the entire batch.
                </p>
                <p>
                  If the dataset exceeds your <code>work_mem</code> setting, PostgreSQL writes intermediate run files to temporary disk storage, introducing high I/O overhead.
                </p>
                <p>
                  By ensuring your graph traversal logic is mathematically acyclic (or by explicitly tracking visited IDs in an array), you can safely use <code>UNION ALL</code> and eliminate the deduplication cost altogether.
                </p>
              </div>
            )}

            {activeViewer === 'transcript' && (
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 text-xs">
                <input
                  type="text"
                  placeholder="Search transcript..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs text-white mb-2"
                />
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  <div className="p-2 rounded bg-zinc-950 border border-zinc-850 hover:border-indigo-500 cursor-pointer">
                    <span className="text-indigo-400 font-mono text-[10px]">[14:28]</span> In standard SQL, you must specify the RECURSIVE keyword right after the WITH statement...
                  </div>
                  <div className="p-2 rounded bg-zinc-950 border border-zinc-850 hover:border-indigo-500 cursor-pointer">
                    <span className="text-indigo-400 font-mono text-[10px]">[17:50]</span> Let us look at what happens inside the executor when the termination predicate fails...
                  </div>
                  <div className="p-2 rounded bg-zinc-950 border border-zinc-850 hover:border-indigo-500 cursor-pointer">
                    <span className="text-indigo-400 font-mono text-[10px]">[24:12]</span> Cycle prevention is essential because cyclic foreign key loops create runaway memory consumption...
                  </div>
                </div>
              </div>
            )}

            {/* Session Objectives Tasks Strip */}
            <div className="mt-6 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-zinc-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <ListTodo className="w-3.5 h-3.5 text-indigo-400" /> Session Objectives & Checklist
                </span>
                <span className="text-zinc-500">
                  {activeSession.tasks.filter(t => t.completed).length}/{activeSession.tasks.length} Completed
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {activeSession.tasks.map(t => (
                  <div
                    key={t.id}
                    onClick={() => toggleTask(t.id)}
                    className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition ${
                      t.completed ? 'bg-indigo-950/30 border-indigo-500/50 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {t.completed ? <CheckSquare className="w-4 h-4 text-indigo-400 shrink-0" /> : <Square className="w-4 h-4 text-zinc-600 shrink-0" />}
                    <span className={t.completed ? 'line-through text-zinc-400' : ''}>{t.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR: AI ASSISTANT + NOTES & FLASHCARDS (4 COLS) */}
        <div className="lg:col-span-4 flex flex-col bg-zinc-950 h-full border-t lg:border-t-0 overflow-hidden">
          {/* Top Half: Auto Notes & Flashcards Tab */}
          <div className="h-1/2 flex flex-col border-b border-zinc-800 p-4">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>Notes & Flashcards</span>
              </div>
              <div className="flex items-center gap-1 text-[11px]">
                <button
                  onClick={() => setActiveNoteTab('personal')}
                  className={`px-2 py-0.5 rounded ${activeNoteTab === 'personal' ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}
                >
                  Editor
                </button>
                <button
                  onClick={() => setActiveNoteTab('cheat_sheet')}
                  className={`px-2 py-0.5 rounded ${activeNoteTab === 'cheat_sheet' ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}
                >
                  Cheat Sheet
                </button>
                <button
                  onClick={() => setActiveNoteTab('interview_notes')}
                  className={`px-2 py-0.5 rounded ${activeNoteTab === 'interview_notes' ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}
                >
                  Flashcard
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto mt-2">
              {activeNoteTab === 'personal' && (
                <textarea
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  placeholder="Take notes during your focus session..."
                  className="w-full h-full bg-transparent resize-none focus:outline-none text-xs text-zinc-200 font-mono leading-relaxed p-1"
                />
              )}

              {activeNoteTab === 'cheat_sheet' && (
                <div className="space-y-2 text-xs text-zinc-300">
                  <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800">
                    <strong className="text-white block mb-0.5">Anchor Member:</strong>
                    The base query that executes first. Must not reference the CTE alias.
                  </div>
                  <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800">
                    <strong className="text-white block mb-0.5">Recursive Member:</strong>
                    Joins the previous iteration's working table. Must have exact matching column count & types.
                  </div>
                  <div className="p-2.5 rounded bg-zinc-900 border border-zinc-800">
                    <strong className="text-white block mb-0.5">Cycle Guard:</strong>
                    <code>ARRAY[id] || visited_path</code> to prevent graph loop crashes.
                  </div>
                </div>
              )}

              {activeNoteTab === 'interview_notes' && (
                <div className="h-full flex flex-col justify-between">
                  <div
                    onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                    className="flex-1 p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500 transition"
                  >
                    <span className="text-[10px] text-zinc-500 font-mono mb-2">
                      Card {flashcardIndex + 1} of {flashcards.length} • Click to Flip
                    </span>
                    <div className="text-xs font-semibold text-white">
                      {flashcardFlipped ? flashcards[flashcardIndex].a : flashcards[flashcardIndex].q}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 text-xs">
                    <button
                      onClick={() => {
                        setFlashcardFlipped(false);
                        setFlashcardIndex((flashcardIndex + 1) % flashcards.length);
                      }}
                      className="px-3 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300"
                    >
                      Next Card &rarr;
                    </button>
                    <span className="text-[11px] text-emerald-400">Spaced Interval: 3d</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Half: AI Study Assistant Context Chat */}
          <div className="h-1/2 flex flex-col p-4 bg-zinc-950">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="text-base">{currentCoach.avatar}</span>
                <span className="text-xs font-bold text-white">AI Study Assistant ({currentCoach.name})</span>
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">Resource-Aware</span>
            </div>

            {/* Quick Action Pills */}
            <div className="flex items-center gap-1.5 py-2 overflow-x-auto text-[10px] shrink-0 no-scrollbar">
              <button
                onClick={() => handleSendMessage("Explain this concept simply like I'm 10")}
                className="px-2 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 whitespace-nowrap"
              >
                Explain Simply
              </button>
              <button
                onClick={() => handleSendMessage("Show me a practical scenario example with code")}
                className="px-2 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 whitespace-nowrap"
              >
                Practical Example
              </button>
              <button
                onClick={() => handleSendMessage("Quiz me on an edge case right now!")}
                className="px-2 py-1 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 whitespace-nowrap"
              >
                Quiz Edge Case
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 py-1 text-xs">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl ${
                    msg.role === 'user'
                      ? 'bg-indigo-600/20 border border-indigo-500/30 text-white ml-6'
                      : 'bg-zinc-900/80 border border-zinc-800 text-zinc-300 mr-2 leading-relaxed'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isAiLoading && (
                <div className="p-2.5 rounded-xl bg-zinc-900 text-zinc-400 text-xs italic">
                  Coach is analyzing your query against the lecture context...
                </div>
              )}
            </div>

            {/* Input form */}
            <div className="pt-2 flex items-center gap-2">
              <input
                type="text"
                placeholder={`Ask ${currentCoach.name.split(' ')[0]} about this lesson...`}
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isAiLoading || !inputMsg.trim()}
                className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition disabled:opacity-40"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
