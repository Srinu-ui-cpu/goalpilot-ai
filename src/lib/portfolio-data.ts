import { PortfolioExport } from '@/types';

export function generatePortfolioArtifacts(goalTitle: string, projectTitle: string, userRole: string): PortfolioExport {
  return {
    id: `port_${Date.now()}`,
    projectTitle: projectTitle || 'High-Throughput Financial Ledger & Analytics Engine',
    caseStudy: `# Case Study: Architecting a Zero-Drift Financial Ledger & Analytics Engine

## Executive Summary
Built an enterprise-grade double-entry ledger platform in PostgreSQL handling **100,000 transactions/minute** with strict ACID compliance, zero concurrency drift, and sub-35ms p95 analytics latency.

## Problem Statement
High-volume payment platforms often suffer from balance drift, deadlocks under high concurrency, and sluggish reporting queries across multi-million row tables. Standard relational setups without explicit isolation levels or partitioning degrade under load.

## Architectural Highlights
- **PostgreSQL Partitioning**: Partitioned ledger entries by monthly intervals (RANGE partitioning) to ensure bounded B-tree index sizes and accelerated vacuuming.
- **Concurrency Control**: Implemented strict row-level locking (\`SELECT FOR UPDATE\`) with deterministic lock acquisition ordering to mathematically eliminate deadlocks.
- **Recursive CTE Hierarchies**: Developed recursive Common Table Expressions to roll up financial holdings across 6 tiers of subsidiaries in <40ms.
- **Window Function Analytics**: Designed real-time running balance projections using \`ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\` without costly self-joins.

## Benchmarks & Results
- **Concurrency**: 1,000 parallel workers executed transfers with 0% data corruption or balance drift.
- **Query Latency**: 95th percentile query time dropped from 1,420ms (unpartitioned/unindexed) to 28ms.
- **Cost Efficiency**: Enabled single-node vertical stability without needing expensive distributed NoSQL workarounds.`,
    architectureSummary: `Distributed PostgreSQL 16 Cluster | Dockerized | Custom EXPLAIN ANALYZE Tuned | Range-Partitioned Ledger | Advisory Locks & Row Locking | Recursive CTE Account Rollups`,
    resumeBulletPoints: [
      `Engineered a high-concurrency double-entry ledger in PostgreSQL supporting 100k tx/min with 0% balance drift using row-level locking (SELECT FOR UPDATE) and repeatable-read transactions.`,
      `Optimized complex multi-tier reporting queries by 98% (from 1.4s to 28ms) via monthly table partitioning, composite B-tree indexing, and analytical window functions.`,
      `Architected recursive CTE algorithms for multi-level organizational rollups, cutting downstream computation load by 60% compared to recursive application-layer polling.`
    ],
    linkedInPost: `🚀 Excited to share my latest data engineering capstone: The Zero-Drift Financial Ledger & Analytics Engine!

When building payment platforms, "eventual consistency" is often unacceptable. I wanted to see how far we can push PostgreSQL's relational guarantees under heavy concurrent load.

Here's what I engineered:
✅ Range-partitioned ledger tables handling millions of entries
✅ Deadlock-free concurrency control using deterministic row locking
✅ Recursive CTEs for instant multi-tier organizational tree rollups
✅ EXPLAIN ANALYZE query plan tuning dropping latency by 98% (1.4s ➔ 28ms)

All verified under rigorous k6 load tests with zero drift.

Check out the full case study and code on GitHub! 👇
#DataEngineering #PostgreSQL #DatabaseInternals #SQL #BackendEngineering #SoftwareArchitecture`,
    liveDemoMockUrl: 'https://goalpilot-ai.vercel.app/portfolio/demo',
    githubRepoUrl: 'https://github.com/Srinu-ui-cpu/goalpilot-ai',
    generatedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };
}
