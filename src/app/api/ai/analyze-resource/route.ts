import { NextRequest, NextResponse } from 'next/server';
import { ResourceAnalysis, ResourceType } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { urlOrFilename, type, title } = body;

    const resourceTitle = title || (urlOrFilename?.includes('youtube') ? 'Advanced SQL & Query Optimization' : 'Core Systems Architecture');
    const rType: ResourceType = type || (urlOrFilename?.includes('youtube') ? 'youtube' : 'pdf');

    const analysis: ResourceAnalysis = {
      id: `res_${Date.now()}`,
      resourceTitle,
      type: rType,
      urlOrFilename: urlOrFilename || 'Uploaded Document',
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
          id: `chk_${Date.now()}_1`,
          title: 'Analytical Window Functions & Partitioning Mechanics',
          durationMinutes: 45,
          difficulty: 'Intermediate',
          summary: 'In-depth coverage of OVER(PARTITION BY ... ORDER BY ...) framing mechanics.',
          keyConcepts: ['OVER clause', 'DENSE_RANK vs RANK', 'Sliding Window Frames', 'LAG/LEAD with default offsets'],
          suggestedStudyHours: 1.5,
        },
        {
          id: `chk_${Date.now()}_2`,
          title: 'Recursive CTEs & Hierarchical Graph Queries',
          durationMinutes: 50,
          difficulty: 'Advanced',
          summary: 'Anchor member, UNION ALL, recursive iteration loop, termination conditions, and cycle detection.',
          keyConcepts: ['Anchor Member', 'Recursive Union', 'Termination Predicates', 'Cycle Prevention with Arrays'],
          suggestedStudyHours: 2.0,
        },
        {
          id: `chk_${Date.now()}_3`,
          title: 'Query Plan Anatomy: EXPLAIN ANALYZE & Buffer Hits',
          durationMinutes: 60,
          difficulty: 'Advanced',
          summary: 'Cost calculation, Nested Loop vs Hash Join vs Merge Join, index scans vs bitmap scans.',
          keyConcepts: ['Cost estimates', 'Shared Hit Buffers', 'Bitmap Index Scans', 'Hash Join memory limits (work_mem)'],
          suggestedStudyHours: 2.5,
        },
      ],
      keyConcepts: [
        'Window Functions',
        'Recursive CTEs',
        'Query Plans (EXPLAIN ANALYZE)',
        'Composite Indexes',
        'MVCC & Isolation',
        'Partial & Expression Indexes',
      ],
      knowledgeBaseSummary: 'Comprehensive engineering syllabus covering relational query design, PostgreSQL execution internals, distributed analytical patterns, and enterprise performance benchmarks.',
      transcriptSample: 'Welcome to Advanced SQL Query Optimization. Today we are dissecting recursive common table expressions. A recursive query is composed of two unified statements...',
    };

    return NextResponse.json({ analysis });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
