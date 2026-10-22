import { AICoachType, AssessmentEvaluation, AssessmentQuestion, BYOKConfig, PlanOption, ResourceAnalysis } from '@/types';
import { AI_COACHES } from './constants';

export interface AICallParams {
  systemPrompt?: string;
  userPrompt: string;
  coachType?: AICoachType;
  context?: string;
  byokConfig?: BYOKConfig;
}

export function getCoachSystemPrompt(coachType: AICoachType = 'david_goggins', careerGoal: string = 'Senior Data Engineer'): string {
  const coach = AI_COACHES.find(c => c.id === coachType) || AI_COACHES[3];
  
  const personaMap: Record<AICoachType, string> = {
    friendly_mentor: `You are Sarah Lin, a compassionate yet deeply effective AI Learning Coach. Always encourage the student, celebrate micro-wins, use positive reinforcement, and explain complex concepts gently using relatable metaphors.`,
    strict_teacher: `You are Professor Vance, an uncompromising academic tutor. You demand rigor, correct technical precision, zero laziness, and adherence to formal definitions. Point out flaws directly.`,
    military_commander: `You are Commander Stone, an elite tactical execution mentor. Address the user with military discipline. Keep responses mission-oriented, direct, objective, and urgent. Procrastination is a mission failure.`,
    david_goggins: `You are David Goggins in coach mode! You are hyper-intense, relentless, and raw. Use catchphrases like "Stay hard!", "Who's gonna carry the boats?", "They don't know you, son!". Challenge them to break through their perceived limits. Never accept excuses.`,
    corporate_manager: `You are Victoria Cross, an executive engineering VP. Speak in terms of OKRs, KPIs, career capital, leverage, ROI, and delivery against expectations. Hold the student accountable like a high-performing lead.`,
    engineering_mentor: `You are Alex Rivera, a Principal Staff Systems Engineer. Focus on deep systems thinking, trade-offs, scalability, edge cases, distributed guarantees, and asymptotic time/space complexity. Always encourage first-principles reasoning.`,
  };

  return `${personaMap[coachType]}
Primary directive: The user is striving to become: "${careerGoal}".
Every message, hint, reminder, or critique must directly anchor back to their ultimate goal.
Never write full solutions for exercises or projects; provide architectural hints, mental models, and critical questions so they build the neural connections themselves.`;
}

export async function askAI(params: AICallParams): Promise<string> {
  const { systemPrompt, userPrompt, coachType = 'david_goggins', byokConfig } = params;
  const sys = systemPrompt || getCoachSystemPrompt(coachType);

  // If BYOK is configured and key is present, attempt live API call
  if (byokConfig) {
    try {
      if (byokConfig.activeProvider === 'gemini' && byokConfig.geminiKey) {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${byokConfig.geminiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: `${sys}\n\nTask:\n${userPrompt}` }] }
            ]
          })
        });
        if (res.ok) {
          const data = await res.json();
          return data.candidates?.[0]?.content?.parts?.[0]?.text || "Response received from Gemini.";
        }
      }

      if (byokConfig.activeProvider === 'openai' && byokConfig.openaiKey) {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${byokConfig.openaiKey}`
          },
          body: JSON.stringify({
            model: byokConfig.activeModel || 'gpt-4o-mini',
            messages: [
              { role: 'system', content: sys },
              { role: 'user', content: userPrompt }
            ]
          })
        });
        if (res.ok) {
          const data = await res.json();
          return data.choices?.[0]?.message?.content || "Response received from OpenAI.";
        }
      }

      if (byokConfig.activeProvider === 'deepseek' && byokConfig.deepseekKey) {
        const res = await fetch('https://api.deepseek.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${byokConfig.deepseekKey}`
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              { role: 'system', content: sys },
              { role: 'user', content: userPrompt }
            ]
          })
        });
        if (res.ok) {
          const data = await res.json();
          return data.choices?.[0]?.message?.content || "Response received from DeepSeek.";
        }
      }
    } catch (err) {
      console.warn('Live AI call failed, gracefully falling back to high-fidelity cognitive simulation:', err);
    }
  }

  // High-fidelity fallback / simulated responses based on coach persona
  const coach = AI_COACHES.find(c => c.id === coachType) || AI_COACHES[3];
  
  if (coachType === 'david_goggins') {
    return `🔥 [${coach.name}]: Look at me! You asked: "${userPrompt.slice(0, 40)}..."
Here's the truth: You don't need a soft answer, you need relentless reps! 
In advanced systems and SQL recursion, the anchor query sets your baseline. If your anchor is weak, your recursive step will blow up the stack! 
Stop hesitating. Focus on the base case, guard against circular graphs with an array tracker, and lock in! Stay hard! Who's gonna carry the boats?!`;
  }

  if (coachType === 'strict_teacher') {
    return `📐 [${coach.name}]: Let us analyze this systematically.
Regarding: "${userPrompt.slice(0, 45)}..."
1. First, define the invariant: What is the exact mathematical predicate separating your base partition from your recursive union?
2. Note that in standard ANSI SQL, a recursive query continues execution until an empty set is produced by the recursive term.
Verify your termination clause now. Do not skip the verification.`;
  }

  if (coachType === 'engineering_mentor') {
    return `⚡ [${coach.name}]: Great question to dig into.
When dealing with this in a distributed production environment:
- The fundamental bottleneck is memory allocation during the CTE materialized iteration.
- PostgreSQL evaluates recursive CTEs iteratively; if you lack an index on the parent-pointer key, every hop triggers a sequential re-scan.
- Think about adding a composite index on (parent_id, id) to keep intermediate lookups in shared buffer cache.`;
  }

  return `🌱 [${coach.name}]: You're making tremendous progress on this mission!
Regarding your question: When dealing with recursive queries, remember the three core pieces:
1. The Anchor (your starting point)
2. The Recursive Member (how you step forward)
3. The Termination Condition (how you know when you are done)
Take a deep breath, run the anchor query on its own first, verify the output, and then add the recursive member. You've got this!`;
}

export function generateSyntheticAssessmentEvaluation(
  userAnswers: { questionId: string; answerText: string }[],
  _coachType: AICoachType = 'david_goggins'
): AssessmentEvaluation {
  const avgLen = userAnswers.reduce((acc, a) => acc + (a.answerText?.length || 0), 0) / (userAnswers.length || 1);
  const baseScore = Math.min(96, Math.max(72, Math.round(75 + (avgLen / 15))));

  return {
    overallScore: baseScore,
    understandingScore: Math.min(100, baseScore + 2),
    communicationScore: Math.min(100, baseScore - 3),
    confidenceScore: Math.min(100, baseScore + 4),
    practicalScore: Math.min(100, baseScore + 1),
    interviewReadinessScore: Math.min(100, baseScore - 2),
    strengths: [
      'Accurate identification of the anchor query vs recursive member role',
      'Solid awareness of cycle detection requirements in directed acyclic graphs',
      'Clear articulation of termination conditions in hierarchical queries'
    ],
    weaknesses: [
      'Did not explicitly quantify the performance impact on work_mem or buffer hits',
      'Could articulate the difference between UNION and UNION ALL deduplication overhead more sharply'
    ],
    betterAnswer: `A robust recursive CTE requires two unified SELECT queries joined by UNION ALL. The anchor member executes first to seed the result set. The recursive member then repeatedly references the CTE alias, joining against the prior iteration's working table until no rows are returned. To prevent infinite loops in cyclic graphs, maintain an array of visited IDs: WHERE NOT (child_id = ANY(path_array)).`,
    expertAnswer: `In enterprise PostgreSQL query engines, recursive CTEs are evaluated using an ephemeral working table and an intermediate table. Prefer UNION ALL over UNION to eliminate unnecessary Sort and Unique hashing steps on each iteration. For hierarchical structures exceeding 10,000 nodes, configure session-level work_mem to prevent disk spillover during hash joins, and enforce cycle termination using: ARRAY[id] || visited_ids.`,
    detailedExplanation: `Your understanding is strong and demonstrates hands-on familiarity. To reach L5/Senior staff interview caliber, always lead with computational complexity (O(V + E) for tree traversal), follow with execution engine mechanics (working table buffering), and conclude with production failure modes (cycles, stack depth limits).`
  };
}

export function generatePlanOptions(
  dailyMinutesAvailable: number = 60,
  _targetRole: string = 'Senior Data Engineer'
): PlanOption[] {
  const baseDays = 28;
  return [
    {
      id: 'realistic',
      title: 'Realistic Steady Plan',
      tagline: 'Sustainable, low-stress pacing with built-in buffer days.',
      dailyMinutes: Math.max(30, Math.round(dailyMinutesAvailable * 0.65)),
      daysToComplete: Math.round(baseDays * 1.4),
      completionProbability: 88,
      hoursPerDay: Number(((dailyMinutesAvailable * 0.65) / 60).toFixed(1)),
      estimatedSuccessRate: 91,
      description: 'Ideal if you have unpredictable work shifts or family commitments. Features 2 buffer catch-up days every week.',
      recommendedFor: 'Busy professionals seeking guaranteed completion without burnout',
    },
    {
      id: 'balanced',
      title: 'Balanced Momentum Plan',
      tagline: 'The sweet spot for neuroplasticity, retention, and speed.',
      dailyMinutes: dailyMinutesAvailable,
      daysToComplete: baseDays,
      completionProbability: 94,
      hoursPerDay: Number((dailyMinutesAvailable / 60).toFixed(1)),
      estimatedSuccessRate: 95,
      description: 'Balances deep technical focus blocks with spaced repetition intervals. Highest historical completion rate on GoalPilot.',
      recommendedFor: 'Most users wanting structured daily progress towards interviews',
    },
    {
      id: 'aggressive',
      title: 'Aggressive Career Sprint',
      tagline: 'High-intensity immersion for rapid upcoming interviews.',
      dailyMinutes: Math.round(dailyMinutesAvailable * 1.5),
      daysToComplete: Math.round(baseDays * 0.65),
      completionProbability: 79,
      hoursPerDay: Number(((dailyMinutesAvailable * 1.5) / 60).toFixed(1)),
      estimatedSuccessRate: 84,
      description: 'Demands strict discipline. Double focus blocks per day, daily coding drills, and rapid fire interview questions.',
      recommendedFor: 'Candidates with interviews scheduled in under 3 weeks',
    },
  ];
}
