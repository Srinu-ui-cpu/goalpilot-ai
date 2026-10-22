export type AICoachType =
  | 'friendly_mentor'
  | 'strict_teacher'
  | 'military_commander'
  | 'david_goggins'
  | 'corporate_manager'
  | 'engineering_mentor';

export interface AICoachProfile {
  id: AICoachType;
  name: string;
  title: string;
  avatar: string;
  tagline: string;
  tone: string;
  sampleQuote: string;
  accentColor: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  careerGoal: string;
  currentRole: string;
  wakeUpTime: string;
  sleepTime: string;
  workTimings: string;
  gymSchedule: string;
  availabilityHours: number;
  preferredStudyDuration: number; // in minutes (e.g. 25, 45, 90)
  preferredReminderType: 'browser' | 'push' | 'email' | 'all';
  preferredAICoach: AICoachType;
  timezone: string;
  streakDays: number;
  totalStudyHours: number;
  focusScore: number;
  interviewReadiness: number;
  projectReadiness: number;
}

export type ResourceType =
  | 'youtube'
  | 'pdf'
  | 'docx'
  | 'pptx'
  | 'epub'
  | 'web_article'
  | 'github'
  | 'leetcode'
  | 'course_metadata';

export interface SemanticChunk {
  id: string;
  title: string;
  durationMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  summary: string;
  keyConcepts: string[];
  suggestedStudyHours: number;
}

export interface ResourceAnalysis {
  id: string;
  resourceTitle: string;
  type: ResourceType;
  urlOrFilename: string;
  totalDurationMinutes: number;
  videoOrItemCount: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  modulesCount: number;
  expectedTotalStudyHours: number;
  learningOutcomes: string[];
  semanticChunks: SemanticChunk[];
  keyConcepts: string[];
  knowledgeBaseSummary: string;
  transcriptSample?: string;
}

export interface PlanningInterviewData {
  wakeUpTime: string;
  sleepTime: string;
  workTimings: string;
  travelTime: string;
  familyCommitments: string;
  gymSchedule: string;
  existingKnowledgeLevel: 'Complete Beginner' | 'Some Basics' | 'Intermediate' | 'Transitioning Pro';
  learningStyle: 'Hands-on Projects' | 'Video Tutorials' | 'Reading & Docs' | 'Interactive Problem Solving';
  biggestChallenges: string[];
}

export interface PlanOption {
  id: 'realistic' | 'balanced' | 'aggressive';
  title: string;
  tagline: string;
  dailyMinutes: number;
  daysToComplete: number;
  completionProbability: number;
  hoursPerDay: number;
  estimatedSuccessRate: number;
  description: string;
  recommendedFor: string;
}

export interface StudySession {
  id: string;
  goalId: string;
  sessionNumber: number;
  title: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  durationMinutes: number;
  status: 'upcoming' | 'in_progress' | 'completed' | 'missed' | 'recovered';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tasks: { id: string; title: string; completed: boolean }[];
  resourceId: string;
  chunkId: string;
  completedAt?: string;
  focusScore?: number;
  notes?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  reasonForGoal: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  expectedOutcome: string;
  progressPercentage: number;
  hoursRemaining: number;
  daysRemaining: number;
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
  commitmentAcceptedAt?: string;
  commitmentSignature?: string;
  chosenPlan?: PlanOption;
  selectedCoach: AICoachType;
  resourceAnalysis?: ResourceAnalysis;
  sessions: StudySession[];
}

export interface PreStudyChecklistState {
  waterBottle: boolean;
  notebook: boolean;
  pen: boolean;
  laptopCharger: boolean;
  washroomBreak: boolean;
  phoneSilent: boolean;
  deskPrepared: boolean;
}

export type AssessmentQuestionType =
  | 'concept'
  | 'scenario'
  | 'practical'
  | 'interview'
  | 'eli10';

export interface AssessmentQuestion {
  id: string;
  type: AssessmentQuestionType;
  badge: string;
  question: string;
  contextHint: string;
  idealAnswerPoints: string[];
}

export interface AssessmentEvaluation {
  overallScore: number;
  understandingScore: number;
  communicationScore: number;
  confidenceScore: number;
  practicalScore: number;
  interviewReadinessScore: number;
  strengths: string[];
  weaknesses: string[];
  betterAnswer: string;
  expertAnswer: string;
  detailedExplanation: string;
}

export interface PracticeExercise {
  id: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  title: string;
  problemStatement: string;
  businessScenario: string;
  constraints: string[];
  hints: string[];
  testCasesOrCriteria: string[];
}

export interface CapstoneProjectSpec {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Industry-Level';
  problemStatement: string;
  businessContext: string;
  architectureSummary: string;
  requiredSoftware: string[];
  installationInstructions: string[];
  folderStructure: string;
  databaseRequirements: string[];
  apiRequirements: string[];
  frontendRequirements: string[];
  dashboardRequirements: string[];
  presentationRequirements: string[];
  successCriteria: string[];
  milestones: { title: string; desc: string; done: boolean }[];
  deliverables: string[];
  learningLinks: { title: string; url: string }[];
}

export interface PortfolioExport {
  id: string;
  projectTitle: string;
  caseStudy: string;
  architectureSummary: string;
  resumeBulletPoints: string[];
  linkedInPost: string;
  liveDemoMockUrl: string;
  githubRepoUrl: string;
  generatedDate: string;
}

export interface SpacedRepetitionCard {
  id: string;
  topic: string;
  question: string;
  answer: string;
  intervalDays: 1 | 3 | 7 | 14 | 30;
  nextReviewDate: string;
  repetitionCount: number;
  difficultyRating: 'easy' | 'good' | 'hard';
}

export interface BYOKConfig {
  geminiKey?: string;
  openaiKey?: string;
  claudeKey?: string;
  openrouterKey?: string;
  deepseekKey?: string;
  activeProvider: 'gemini' | 'openai' | 'claude' | 'openrouter' | 'deepseek';
  activeModel: string;
}

export interface NotificationItem {
  id: string;
  timestamp: string;
  type: 'reminder' | 'accountability' | 'recovery' | 'milestone';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
}
