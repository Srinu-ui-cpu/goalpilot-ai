import { CapstoneProjectSpec } from '@/types';

export const CAPSTONE_PROJECTS: Record<string, CapstoneProjectSpec> = {
  'industry_data_platform': {
    id: 'proj_sql_01',
    title: 'High-Throughput Financial Ledger & Analytics Engine',
    level: 'Industry-Level',
    problemStatement: 'Design and implement an immutable double-entry financial ledger and real-time fraud monitoring pipeline capable of executing 100,000 transactions/minute with sub-50ms query response times and zero concurrency drift.',
    businessContext: 'Fintech platforms face severe regulatory and financial risks if ledger balances drift or if audit logs can be mutated. Modern payment engines require strictly ACID-compliant transactional guarantees paired with high-performance analytical aggregation for customer dashboards and fraud alerts.',
    architectureSummary: `Distributed PostgreSQL cluster with Write-Ahead Logging (WAL) replication, partitioned ledger tables by monthly intervals, custom recursive CTEs for account hierarchy reconciliation, and automated materialized views with incremental refreshes.`,
    requiredSoftware: [
      'PostgreSQL 16+',
      'Docker & Docker Compose',
      'Python 3.11+ / Node.js 20+',
      'pgvector (for vector anomaly search)',
      'Apache JMeter or k6 for load testing'
    ],
    installationInstructions: [
      'git clone your newly created repository',
      'docker compose up -d (launches PostgreSQL 16 with custom configuration for work_mem and max_connections)',
      'Run database migration scripts located in /migrations/001_init.sql',
      'Seed 1,000,000 test transactions using the synthetic data generator',
      'Execute verification script test_balance_invariants.py'
    ],
    folderStructure: `fintech-ledger-engine/
├── docker-compose.yml
├── README.md
├── docs/
│   ├── architecture_diagram.png
│   └── data_dictionary.md
├── migrations/
│   ├── 001_initial_schema.sql
│   ├── 002_partitioning_ledger.sql
│   └── 003_indexes_and_views.sql
├── src/
│   ├── database.py
│   ├── ledger_service.py
│   └── reconciliation_engine.py
├── tests/
│   ├── test_concurrency_locks.py
│   └── test_recursive_reconciliation.py
└── benchmarks/
    └── k6_load_test.js`,
    databaseRequirements: [
      'accounts table with recursive parent_account_id for organizational chart aggregation',
      'ledger_entries table partitioned by RANGE (created_at)',
      'Check constraints enforcing non-negative balances on debit-normal accounts',
      'Composite B-Tree index on (account_id, created_at DESC) for instant statement generation',
      'Transaction isolation level set to REPEATABLE READ with optimistic concurrency retries'
    ],
    apiRequirements: [
      'POST /v1/transactions: atomic transfer between two accounts with row-level locks (SELECT FOR UPDATE)',
      'GET /v1/accounts/{id}/statement: returns running balance using analytical window functions',
      'GET /v1/accounts/{id}/hierarchy: recursive CTE returning total balance across all sub-subsidiaries',
      'GET /v1/audit/reconciliation: validates that sum(debit) == sum(credit) across the entire platform'
    ],
    frontendRequirements: [
      'Real-time account balance ticker',
      'Transaction stream with status indicators (settled, pending, flagged)',
      'Date-range picker for monthly financial statements'
    ],
    dashboardRequirements: [
      'System throughput gauge (Transactions Per Second)',
      'Daily Volume & Revenue breakdown chart',
      'Top 10 largest accounts visual tree'
    ],
    presentationRequirements: [
      '10-minute slide deck explaining architectural trade-offs: why partitioned PostgreSQL vs MongoDB',
      'Live demonstration of EXPLAIN ANALYZE comparison before and after indexing',
      'Root Cause Analysis of how concurrency race conditions were eliminated'
    ],
    successCriteria: [
      'Zero balance drift across 1,000 concurrent transfers in load tests',
      'Sub-20ms 95th percentile query latency for ledger statement generation',
      '100% test coverage on double-entry balance invariant assertions'
    ],
    milestones: [
      { title: 'Milestone 1: Relational Schema & Partitioning', desc: 'Design tables, primary keys, foreign keys, and monthly range partitions.', done: true },
      { title: 'Milestone 2: Concurrency & Lock Handling', desc: 'Implement atomic transfers using advisory locks and SELECT FOR UPDATE.', done: true },
      { title: 'Milestone 3: Recursive Hierarchy Aggregator', desc: 'Write the recursive CTE to compute multi-tier company rollups.', done: false },
      { title: 'Milestone 4: Benchmarking & Optimization', desc: 'Profile slow queries with EXPLAIN ANALYZE and tune postgresql.conf.', done: false },
      { title: 'Milestone 5: Portfolio Packaging & Case Study', desc: 'Draft GitHub README, architecture diagram, and LinkedIn case study.', done: false }
    ],
    deliverables: [
      'Public GitHub repository with clean git commit history',
      'Comprehensive README with architecture diagram, setup guide, and benchmark graphs',
      'Video walkthrough demonstrating concurrency tests and query plans'
    ],
    learningLinks: [
      { title: 'Designing Data-Intensive Applications (Ch 7: Transactions)', url: 'https://dataintensive.net' },
      { title: 'PostgreSQL Partitioning Best Practices', url: 'https://postgresql.org/docs/current/ddl-partitioning.html' },
      { title: 'Martin Fowler: Accounting Patterns & Event Ledger', url: 'https://martinfowler.com' }
    ]
  }
};

export interface AIReviewResult {
  score: number;
  codeQualityRating: 'Exceptional' | 'Competent' | 'Needs Improvement';
  architectureRating: 'Production Ready' | 'Acceptable Prototype' | 'Fragile';
  criticalStrengths: string[];
  vulnerabilitiesOrGaps: string[];
  scalabilityAdvice: string;
  nextStepRecommendation: string;
}

export function evaluateStudentProjectSubmission(codeOrDiagramText: string): AIReviewResult {
  const hasLocking = /FOR UPDATE|advisory_lock|LOCK/i.test(codeOrDiagramText);
  const hasWindow = /OVER\s*\(|PARTITION BY/i.test(codeOrDiagramText);
  const hasRecursive = /WITH RECURSIVE/i.test(codeOrDiagramText);

  let score = 80;
  if (hasLocking) score += 7;
  if (hasWindow) score += 6;
  if (hasRecursive) score += 5;

  return {
    score: Math.min(97, score),
    codeQualityRating: score >= 90 ? 'Exceptional' : 'Competent',
    architectureRating: score >= 90 ? 'Production Ready' : 'Acceptable Prototype',
    criticalStrengths: [
      'Clean schema modularity and logical separation of audit trails from transaction state',
      hasLocking ? 'Excellent usage of row-level locking to prevent race conditions' : 'Solid primary key and indexing definitions',
      'Appropriate use of foreign key constraints to enforce relational referential integrity'
    ],
    vulnerabilitiesOrGaps: [
      !hasLocking ? 'Warning: Lacks explicit pessimistic concurrency control (SELECT FOR UPDATE) on transfer operations' : 'Consider adding connection pooling configuration (PgBouncer) for high-frequency bursts',
      'Ensure deadlocks are prevented by sorting account IDs before acquiring multiple row locks'
    ],
    scalabilityAdvice: `When scaling beyond 50 million ledger entries, partition maintenance should be automated via pg_partman. Also consider adding a BRIN index on transaction timestamps to save memory in buffer pools.`,
    nextStepRecommendation: `Proceed to Milestone 4. Run your k6 load test script with 500 virtual users and observe whether connection pool saturation occurs.`
  };
}
