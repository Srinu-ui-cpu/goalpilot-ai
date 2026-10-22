export interface InterviewQuestionItem {
  id: string;
  category: 'Technical' | 'Scenario' | 'Behavioral' | 'Rapid Fire' | 'Company Style';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  company?: string;
  question: string;
  keyEvaluationCriteria: string[];
  sampleModelAnswer: string;
  trapToAvoid: string;
}

export const INTERVIEW_QUESTIONS: InterviewQuestionItem[] = [
  {
    id: 'int_01',
    category: 'Technical',
    difficulty: 'Advanced',
    company: 'Stripe',
    question: 'How does PostgreSQL handle MVCC under Read Committed vs Repeatable Read isolation levels, and what happens when two concurrent transactions attempt to update the same row?',
    keyEvaluationCriteria: [
      'Explanation of snapshot generation timing (per-statement in Read Committed vs per-transaction in Repeatable Read)',
      'Behavior of row-level lock acquisition on the target tuple',
      'Handling of serialization failures (SQLSTATE 40001: could not serialize access due to concurrent update)'
    ],
    sampleModelAnswer: `In Read Committed, each SQL statement takes a fresh snapshot of the committed data at the moment it begins execution. If transaction A updates a row and transaction B attempts to update the same row, transaction B blocks on the row lock. Once transaction A commits, transaction B unblocks, re-reads the updated row, and evaluates its WHERE condition again. 

In Repeatable Read, the snapshot is frozen at the beginning of the transaction. If transaction B blocks on transaction A's update and transaction A commits, transaction B will abort with a serialization failure error because it cannot see changes committed after its snapshot began. The application layer must handle this by catching the error and retrying with exponential backoff.`,
    trapToAvoid: 'Do not say that Repeatable Read prevents all race conditions without optimistic retry loops, or that locks prevent reads (PostgreSQL reads never block writes, and writes never block reads).'
  },
  {
    id: 'int_02',
    category: 'Scenario',
    difficulty: 'Advanced',
    company: 'Netflix',
    question: 'A query reporting user stream viewing intervals suddenly slows down from 80ms to 14 seconds during prime time. EXPLAIN ANALYZE reveals a Hash Join spilling 850MB to disk. Walk me through your triage and mitigation steps.',
    keyEvaluationCriteria: [
      'Diagnosing work_mem exhaustion and temp file generation',
      'Evaluating join ordering and predicate pushdown',
      'Checking table statistics freshness (ANALYZE / auto-vacuum)',
      'Tuning session-level vs global memory parameters'
    ],
    sampleModelAnswer: `1. Immediate Root Cause: The hash table built for the join exceeded the allocated work_mem (often defaulted to 4MB), forcing PostgreSQL to write multi-pass batches to disk temp files.
2. Immediate Mitigation: If this is an analytical batch or background worker, set session-level work_mem = '256MB' for that specific connection so the hash table stays entirely in RAM.
3. Query Optimization: Inspect if both joined tables are necessary or if the driving table can be pre-filtered earlier. Check if an index exists on the foreign key to allow an Index Scan or Merge Join instead.
4. Statistics: Check pg_stats to verify whether n_distinct estimates match reality; if statistics are stale, the planner might misjudge row counts by orders of magnitude.`,
    trapToAvoid: 'Do not globally increase work_mem in postgresql.conf without calculating max_connections * work_mem, as this risks triggering Linux Out-Of-Memory (OOM) killer.'
  },
  {
    id: 'int_03',
    category: 'Company Style',
    difficulty: 'Intermediate',
    company: 'Amazon',
    question: 'Amazon Leadership Principle (Frugality & Dive Deep): Describe a time when you optimized a poorly performing database or pipeline without provisioning larger hardware.',
    keyEvaluationCriteria: [
      'STAR method format (Situation, Task, Action, Result)',
      'Concrete metrics (latency reduction, cost saved, throughput gained)',
      'First-principles reasoning and telemetry verification'
    ],
    sampleModelAnswer: `Situation: At my previous team, our nightly analytics aggregation job was running for 3.5 hours, and the proposal was to upgrade to a $1,200/month RDS db.r6g.4xlarge instance.
Task: I took ownership of diving deep into query execution plans before approving budget increases.
Action: I ran EXPLAIN (ANALYZE, BUFFERS) and identified that an unindexed timestamp column forced a sequential scan over 42 million rows. Additionally, an implicit type cast prevented index usage on account IDs. I added a composite BRIN index on the timestamp and aligned the UUID types.
Result: Query execution time dropped from 3.5 hours to 11 minutes (a 95% reduction), saving $14,400 annually with zero hardware upgrades.`,
    trapToAvoid: 'Avoid vague claims like "I optimized the database and it felt much faster" without metrics.'
  },
  {
    id: 'int_04',
    category: 'Rapid Fire',
    difficulty: 'Beginner',
    company: 'Google',
    question: 'What is the exact order of query clause execution in SQL, from first to last?',
    keyEvaluationCriteria: [
      'Strict logical sequence: FROM -> ON -> JOIN -> WHERE -> GROUP BY -> WITH CUBE/ROLLUP -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT / OFFSET'
    ],
    sampleModelAnswer: `The logical processing order is:
1. FROM & JOINs (identifies data source sets)
2. WHERE (filters individual rows before aggregation)
3. GROUP BY (collapses rows into groups)
4. HAVING (filters grouped aggregations)
5. SELECT & Window Functions (evaluates projected expressions)
6. DISTINCT (deduplicates output)
7. ORDER BY (sorts the final projection)
8. LIMIT / OFFSET (slices row count)`,
    trapToAvoid: 'Never say SELECT runs first just because it is written at the top of the SQL string.'
  }
];
