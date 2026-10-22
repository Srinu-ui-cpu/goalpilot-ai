'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileText,
  Video,
  UploadCloud,
  Clock,
  Calendar,
  AlertCircle,
  HelpCircle,
  Bot,
  Flame,
  Check,
  ShieldCheck,
  Zap,
  Code2,
  BookOpen
} from 'lucide-react';
import { Goal, PlanOption, ResourceAnalysis, ResourceType } from '@/types';
import { getStoredActiveGoal, getStoredUserProfile, saveStoredActiveGoal, saveStoredUserProfile } from '@/lib/storage';
import { generatePlanOptions } from '@/lib/ai-engine';
import CommitmentContractModal from '@/components/modals/CommitmentContractModal';

export default function GoalsPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Goal Creation
  const [goalTitle, setGoalTitle] = useState('Master Advanced SQL & Query Optimization');
  const [description, setDescription] = useState('Deep dive into window functions, recursive CTEs, indexing, query execution plans, and transaction isolation.');
  const [targetDate, setTargetDate] = useState('2026-11-20');
  const [reasonForGoal, setReasonForGoal] = useState('Crack L5 Data Platform Engineer Technical Rounds at top tier product companies.');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'urgent'>('urgent');
  const [expectedOutcome, setExpectedOutcome] = useState('Confidently design distributed schemas, optimize 10M+ row queries, and build an end-to-end analytical pipeline project.');

  // Step 2: Resource Ingestion
  const [resourceType, setResourceType] = useState<ResourceType>('youtube');
  const [resourceInput, setResourceInput] = useState('https://youtube.com/playlist?list=PL_data_eng_sql_mastery');
  const [isAnalyzingResource, setIsAnalyzingResource] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ResourceAnalysis | null>(null);

  // Step 3: AI Planning Interview
  const [interviewData, setInterviewData] = useState({
    wakeUpTime: '06:30',
    sleepTime: '23:00',
    workTimings: '09:00 - 18:00',
    travelTime: '45 mins daily commute',
    familyCommitments: 'Dinner with family 19:00 - 20:00',
    gymSchedule: '07:00 - 08:00 (Mon, Wed, Fri)',
    existingKnowledgeLevel: 'Intermediate',
    learningStyle: 'Hands-on Projects & Code',
    biggestChallenges: 'Procrastinating when queries get complex; keeping momentum after long work days'
  });

  // Step 4: Plan Options
  const [plans, setPlans] = useState<PlanOption[]>([]);
  const [selectedPlanId, setSelectedPlanId] = useState<'realistic' | 'balanced' | 'aggressive'>('balanced');
  const [isContractOpen, setIsContractOpen] = useState(false);

  // Sample quick templates
  const applyTemplate = (title: string, desc: string, reason: string) => {
    setGoalTitle(title);
    setDescription(desc);
    setReasonForGoal(reason);
  };

  const handleAnalyzeResource = async () => {
    setIsAnalyzingResource(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
      setAnalysisResult({
        id: `res_${Date.now()}`,
        resourceTitle: goalTitle,
        type: resourceType,
        urlOrFilename: resourceInput,
        totalDurationMinutes: 720,
        videoOrItemCount: 16,
        difficulty: 'Advanced',
        modulesCount: 5,
        expectedTotalStudyHours: 24,
        learningOutcomes: [
          'Master Window Functions (ROW_NUMBER, DENSE_RANK, NTILE, LAG/LEAD with sliding windows)',
          'Construct recursive CTEs for hierarchical tree traversal and graph queries',
          'Analyze EXPLAIN (ANALYZE, BUFFERS) output and optimize sequential table scans',
          'Design B-tree, GIN, BRIN indexes and partition massive tables effectively',
          'Handle concurrency anomalies with transaction isolation levels (MVCC)',
        ],
        semanticChunks: [
          {
            id: 'c1',
            title: 'Analytical Window Functions & Partitioning Mechanics',
            durationMinutes: 45,
            difficulty: 'Intermediate',
            summary: 'Execution order of OVER clause and sliding window bounds.',
            keyConcepts: ['OVER', 'DENSE_RANK', 'ROWS BETWEEN', 'LAG/LEAD'],
            suggestedStudyHours: 1.5,
          },
          {
            id: 'c2',
            title: 'Recursive CTEs & Hierarchical Graph Queries',
            durationMinutes: 50,
            difficulty: 'Advanced',
            summary: 'Anchor query, UNION ALL, recursive termination, cycle guards.',
            keyConcepts: ['Anchor Query', 'Recursive Member', 'Cycle Prevention'],
            suggestedStudyHours: 2.0,
          },
          {
            id: 'c3',
            title: 'Query Plan Anatomy: EXPLAIN ANALYZE & Buffer Hits',
            durationMinutes: 60,
            difficulty: 'Advanced',
            summary: 'Node execution cost, work_mem saturation, disk spillovers.',
            keyConcepts: ['EXPLAIN ANALYZE', 'work_mem', 'Shared Buffers'],
            suggestedStudyHours: 2.5,
          },
        ],
        keyConcepts: [
          'Window Functions',
          'Recursive CTEs',
          'Query Plans (EXPLAIN ANALYZE)',
          'Composite Indexes',
          'MVCC & Isolation',
        ],
        knowledgeBaseSummary: 'Engineering syllabus covering relational internals, execution plans, and query optimizations.',
      });
      setStep(3);
    } finally {
      setIsAnalyzingResource(false);
    }
  };

  const handleFinishInterview = () => {
    const generated = generatePlanOptions(60, 'Senior Data Engineer');
    setPlans(generated);
    setStep(4);
  };

  const handleSaveAndActivateGoal = () => {
    const chosenPlan = plans.find(p => p.id === selectedPlanId) || plans[1];
    const newGoal: Goal = {
      id: `goal_${Date.now()}`,
      title: goalTitle,
      description,
      targetDate,
      reasonForGoal,
      priority,
      expectedOutcome,
      progressPercentage: 0,
      hoursRemaining: 24.0,
      daysRemaining: chosenPlan?.daysToComplete || 28,
      status: 'active',
      createdAt: new Date().toISOString(),
      chosenPlan,
      selectedCoach: 'david_goggins',
      resourceAnalysis: analysisResult || undefined,
      sessions: [
        {
          id: 'sess_new_1',
          goalId: 'new',
          sessionNumber: 1,
          title: 'Foundations & Window Framing Mechanics',
          description: 'Execution order and running total calculations.',
          scheduledDate: new Date().toISOString().split('T')[0],
          scheduledTime: '20:00',
          durationMinutes: 45,
          status: 'upcoming',
          difficulty: 'Easy',
          tasks: [
            { id: 'nt1', title: 'Watch Lecture 1 & 2', completed: false },
            { id: 'nt2', title: 'Execute query drills', completed: false },
            { id: 'nt3', title: 'Pass mandatory end-of-session assessment', completed: false }
          ],
          resourceId: 'res_1',
          chunkId: 'c1'
        }
      ]
    };

    saveStoredActiveGoal(newGoal);
    setIsContractOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-8">
      {/* Step Progress Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        {[
          { num: 1, label: 'Goal Definition' },
          { num: 2, label: 'Resource Ingestion' },
          { num: 3, label: 'Planning Interview' },
          { num: 4, label: 'Plan Selection' },
        ].map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= s.num ? 'bg-indigo-600 text-white' : 'bg-zinc-800 text-zinc-500'
            }`}>
              {step > s.num ? '✓' : s.num}
            </div>
            <span className={`text-xs font-medium hidden sm:inline ${step >= s.num ? 'text-zinc-200' : 'text-zinc-500'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* STEP 1: GOAL CREATION */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white">Define Your Learning Goal</h1>
            <p className="text-xs text-zinc-400">
              Clear parameters increase completion likelihood by 400%.
            </p>
          </div>

          {/* Quick Examples */}
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-xs">
            <span className="text-zinc-400 font-semibold block mb-2">Popular Execution Blueprints:</span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => applyTemplate('Master Advanced SQL & Query Optimization', 'Deep dive into window functions and query plans', 'Crack L5 Data Platform Engineer Technical Rounds')}
                className="px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 hover:border-indigo-500 text-zinc-300"
              >
                Advanced SQL Mastery
              </button>
              <button
                onClick={() => applyTemplate('Complete AWS Solutions Architect Study Guide', 'Read and synthesize 400-page exam book', 'Pass SAA-C03 Certification with 90%+')}
                className="px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 hover:border-indigo-500 text-zinc-300"
              >
                Complete AWS PDF
              </button>
              <button
                onClick={() => applyTemplate('Finish NeetCode 150 DSA Playlist', 'Implement patterns for trees, graphs, and dynamic programming', 'Prepare for Big Tech algorithms interview')}
                className="px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 hover:border-indigo-500 text-zinc-300"
              >
                Finish DSA Playlist
              </button>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-zinc-300 font-semibold block mb-1">Goal Title</label>
              <input
                type="text"
                value={goalTitle}
                onChange={(e) => setGoalTitle(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-white focus:outline-none focus:border-indigo-500 text-sm"
              />
            </div>

            <div>
              <label className="text-zinc-300 font-semibold block mb-1">Goal Description & Scope</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-zinc-300 font-semibold block mb-1">Target Completion Date</label>
                <input
                  type="date"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-zinc-300 font-semibold block mb-1">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as any)}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="low">Low (Casual Learning)</option>
                  <option value="medium">Medium (Standard Skill Up)</option>
                  <option value="high">High (Upcoming Project)</option>
                  <option value="urgent">Urgent (Interview in &lt; 30 Days)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-zinc-300 font-semibold block mb-1">Reason For Goal (Emotional Anchor)</label>
              <input
                type="text"
                value={reasonForGoal}
                onChange={(e) => setReasonForGoal(e.target.value)}
                placeholder="Why does this matter? (Used in coach reminders)"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-zinc-300 font-semibold block mb-1">Expected Outcome</label>
              <input
                type="text"
                value={expectedOutcome}
                onChange={(e) => setExpectedOutcome(e.target.value)}
                placeholder="What will you be capable of executing?"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md"
            >
              <span>Next: Ingest Learning Material</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: RESOURCE INGESTION & ANALYSIS */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white">Ingest Learning Resource</h1>
            <p className="text-xs text-zinc-400">
              Paste a URL or drop files. Our analysis engine extracts duration, modules, semantic chunks, and knowledge base.
            </p>
          </div>

          {/* Supported Types Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            {[
              { id: 'youtube', label: 'YouTube Video/Playlist', icon: Video },
              { id: 'pdf', label: 'PDF Document / Book', icon: FileText },
              { id: 'github', label: 'GitHub Repository', icon: Code2 },
              { id: 'web_article', label: 'Web Article / Blog', icon: BookOpen },
              { id: 'leetcode', label: 'LeetCode / HackerRank', icon: Zap },
              { id: 'course_metadata', label: 'Udemy / Coursera', icon: Layers },
            ].map(t => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setResourceType(t.id as any)}
                  className={`p-3 rounded-xl border text-left transition ${
                    resourceType === t.id
                      ? 'bg-indigo-950/40 border-indigo-500 text-white'
                      : 'bg-zinc-900/40 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Icon className="w-4 h-4 mb-1 text-indigo-400" />
                  <div className="font-semibold">{t.label}</div>
                </button>
              );
            })}
          </div>

          {/* Input Box */}
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">
                Resource Link or Upload
              </label>
              <input
                type="text"
                value={resourceInput}
                onChange={(e) => setResourceInput(e.target.value)}
                placeholder="https://youtube.com/playlist?list=... or PDF filename"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
              />
            </div>

            <div className="border border-dashed border-zinc-800 rounded-xl p-6 text-center text-xs text-zinc-400 hover:border-zinc-700 cursor-pointer transition">
              <UploadCloud className="w-6 h-6 text-zinc-500 mx-auto mb-2" />
              <span>Drag & drop PDF, DOCX, PPTX, EPUB, or MP4 here to analyze semantic chapters</span>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="text-xs text-zinc-400 hover:text-white"
            >
              &larr; Back to Goal Details
            </button>
            <button
              onClick={handleAnalyzeResource}
              disabled={isAnalyzingResource}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md disabled:opacity-50"
            >
              <span>{isAnalyzingResource ? 'Resource Analysis Engine Running...' : 'Analyze & Launch AI Planning Interview'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: AI PLANNING INTERVIEW */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs text-indigo-400 font-semibold mb-1">
              <Bot className="w-3.5 h-3.5" />
              <span>AI Routine Calibration</span>
            </div>
            <h1 className="text-2xl font-black text-white">The AI Planning Interview</h1>
            <p className="text-xs text-zinc-400">
              Before generating schedules, the AI must understand your daily reality. We never split content equally.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-zinc-300 font-semibold block mb-1">What time do you wake up?</label>
                <input
                  type="time"
                  value={interviewData.wakeUpTime}
                  onChange={(e) => setInterviewData({ ...interviewData, wakeUpTime: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="text-zinc-300 font-semibold block mb-1">What time do you sleep?</label>
                <input
                  type="time"
                  value={interviewData.sleepTime}
                  onChange={(e) => setInterviewData({ ...interviewData, sleepTime: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-zinc-300 font-semibold block mb-1">Work Timings</label>
                <input
                  type="text"
                  value={interviewData.workTimings}
                  onChange={(e) => setInterviewData({ ...interviewData, workTimings: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="text-zinc-300 font-semibold block mb-1">Travel / Commute Time</label>
                <input
                  type="text"
                  value={interviewData.travelTime}
                  onChange={(e) => setInterviewData({ ...interviewData, travelTime: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-zinc-300 font-semibold block mb-1">Gym / Fitness Schedule</label>
                <input
                  type="text"
                  value={interviewData.gymSchedule}
                  onChange={(e) => setInterviewData({ ...interviewData, gymSchedule: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="text-zinc-300 font-semibold block mb-1">Existing Knowledge Level</label>
                <select
                  value={interviewData.existingKnowledgeLevel}
                  onChange={(e) => setInterviewData({ ...interviewData, existingKnowledgeLevel: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white"
                >
                  <option value="Complete Beginner">Complete Beginner (0 prior knowledge)</option>
                  <option value="Some Basics">Some Basics (Know syntax, struggle with systems)</option>
                  <option value="Intermediate">Intermediate (Used in production, need optimization)</option>
                  <option value="Transitioning Pro">Transitioning Pro (Senior in other stack)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-zinc-300 font-semibold block mb-1">Biggest Obstacles / Challenges?</label>
              <input
                type="text"
                value={interviewData.biggestChallenges}
                onChange={(e) => setInterviewData({ ...interviewData, biggestChallenges: e.target.value })}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-white"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(2)}
              className="text-xs text-zinc-400 hover:text-white"
            >
              &larr; Back to Ingestion
            </button>
            <button
              onClick={handleFinishInterview}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md"
            >
              <span>Generate 3 Adaptive Plans</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: PLAN GENERATION & SELECTION */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white">Choose Your Execution Plan</h1>
            <p className="text-xs text-zinc-400">
              The Smart Scheduling Engine generated 3 options based on your {interviewData.workTimings} schedule and {interviewData.gymSchedule} workout routines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((p) => {
              const isSelected = selectedPlanId === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPlanId(p.id)}
                  className={`p-5 rounded-2xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-zinc-900 border-indigo-500 ring-2 ring-indigo-500/30 shadow-xl'
                      : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{p.title}</span>
                    {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                  </div>

                  <div className="text-2xl font-black text-white mb-1">
                    {p.dailyMinutes} <span className="text-xs font-normal text-zinc-400">min/day</span>
                  </div>

                  <p className="text-xs text-zinc-300 mb-4">{p.tagline}</p>

                  <div className="space-y-2 border-t border-zinc-800 pt-3 text-xs text-zinc-400">
                    <div className="flex justify-between">
                      <span>Timeline:</span>
                      <strong className="text-zinc-200">{p.daysToComplete} Days</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Completion Probability:</span>
                      <strong className="text-emerald-400">{p.completionProbability}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Historical Success Rate:</span>
                      <strong className="text-indigo-300">{p.estimatedSuccessRate}%</strong>
                    </div>
                  </div>

                  <p className="mt-4 text-[11px] text-zinc-500 italic border-t border-zinc-800/60 pt-2">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => setStep(3)}
              className="text-xs text-zinc-400 hover:text-white"
            >
              &larr; Back to Interview
            </button>
            <button
              onClick={handleSaveAndActivateGoal}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-xl shadow-indigo-600/30"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Lock In Plan & Sign Commitment</span>
            </button>
          </div>
        </div>
      )}

      {/* Commitment Contract Modal */}
      <CommitmentContractModal
        isOpen={isContractOpen}
        onClose={() => setIsContractOpen(false)}
        onSigned={() => {
          setIsContractOpen(false);
          router.push('/war-room');
        }}
        goalTitle={goalTitle}
      />
    </div>
  );
}
