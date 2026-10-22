import { AssessmentQuestion } from '@/types';

export const SESSION_ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'q1',
    type: 'concept',
    badge: '1. Concept Deep Dive',
    question: 'Explain the internal execution model of a recursive CTE in PostgreSQL. How does the anchor query interact with the working table and intermediate table?',
    contextHint: 'Think about the step-by-step iteration: What is in the working table during iteration 0, and what causes iteration to terminate?',
    idealAnswerPoints: [
      'Anchor query executes once to populate the working table and initial result set',
      'The recursive term executes repeatedly, using the working table as its input',
      'Intermediate results replace the working table for the subsequent iteration',
      'Terminates automatically when the recursive term produces zero rows'
    ]
  },
  {
    id: 'q2',
    type: 'scenario',
    badge: '2. Real-World Scenario',
    question: 'You are designing an organizational employee hierarchy query. An employee accidentally sets their manager ID to their own direct report, creating a circular graph cycle. How do you prevent your query from entering an infinite loop without altering the base table?',
    contextHint: 'Recall cycle detection strategies using arrays or path tracking columns.',
    idealAnswerPoints: [
      'Track an array of visited IDs in the recursive projection: ARRAY[employee_id]',
      'In the recursive member, append the current ID: visited_ids || e.employee_id',
      'Add a WHERE guard: WHERE NOT (e.employee_id = ANY(visited_ids))',
      'Or use PostgreSQL 14+ native CYCLE clause: CYCLE employee_id SET is_cycle USING path'
    ]
  },
  {
    id: 'q3',
    type: 'practical',
    badge: '3. Practical Hands-On',
    question: 'Write or outline the recursive query syntax required to compute the total organizational depth (level) and full breadcrumb path (e.g., "CEO > VP Engineering > Tech Lead > Senior Dev") for every employee.',
    contextHint: 'Include the level counter starting at 1 and string concatenation for path.',
    idealAnswerPoints: [
      'Anchor member: SELECT id, name, manager_id, 1 as depth, name::text as breadcrumb FROM employees WHERE manager_id IS NULL',
      'Recursive member: JOIN employees e ON e.manager_id = cte.id',
      'Increment depth: cte.depth + 1',
      'Concatenate breadcrumb: cte.breadcrumb || " > " || e.name'
    ]
  },
  {
    id: 'q4',
    type: 'interview',
    badge: '4. Staff Interview Question',
    question: 'In an interview with Stripe or Uber, the interviewer asks: "Why would you choose UNION ALL instead of UNION in a recursive query, and what are the specific memory implications for work_mem?"',
    contextHint: 'Focus on sorting, hashing, and deduplication cost.',
    idealAnswerPoints: [
      'UNION performs an implicit deduplication (sorting or hashing all rows in the working table)',
      'UNION ALL skips deduplication, resulting in significantly lower CPU and memory overhead',
      'If deduplication spills past work_mem, PostgreSQL writes temporary disk files, drastically increasing I/O latency',
      'Always prefer UNION ALL and handle uniqueness logically when graph cycles are already guarded'
    ]
  },
  {
    id: 'q5',
    type: 'eli10',
    badge: "5. Explain Like I'm 10",
    question: 'Explain what a recursive database query is to a 10-year-old child using a family tree, Lego blocks, or Russian nesting dolls.',
    contextHint: 'Keep it free of jargon; focus on the repeating action until finding the smallest doll or origin.',
    idealAnswerPoints: [
      'Imagine Russian nesting dolls or asking "Who is your parent?"',
      'You start by looking at yourself (that is the first clue)',
      'Then you ask who your parent is, then who their parent is, step by step',
      'You stop when you reach the very first ancestor in the book'
    ]
  }
];
