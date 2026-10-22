export interface RoadmapNode {
  id: string;
  title: string;
  category: 'Foundation' | 'Core Platform' | 'Distributed Systems' | 'Capstone' | 'Staff Specialty';
  status: 'completed' | 'in_progress' | 'recommended' | 'locked';
  estimatedHours: number;
  description: string;
  skills: string[];
  recommendedCertifications?: string[];
  suggestedProject?: string;
}

export interface CareerPathTrack {
  id: string;
  roleTitle: string;
  avgSalaryRange: string;
  currentMatchPercentage: number;
  description: string;
  nodes: RoadmapNode[];
}

export const CAREER_PATHS: CareerPathTrack[] = [
  {
    id: 'track_data_eng',
    roleTitle: 'Senior Data Platform Engineer',
    avgSalaryRange: '$165,000 - $220,000',
    currentMatchPercentage: 78,
    description: 'Build enterprise-scale streaming & analytical batch infrastructure, distributed data lakes, and high-concurrency query engines.',
    nodes: [
      {
        id: 'node_1',
        title: 'Advanced Relational Database Internals & SQL',
        category: 'Foundation',
        status: 'in_progress',
        estimatedHours: 24,
        description: 'PostgreSQL architecture, MVCC, query plan optimization, indexing strategies, recursive queries.',
        skills: ['SQL Optimization', 'EXPLAIN ANALYZE', 'Window Functions', 'Partitioning'],
        suggestedProject: 'High-Throughput Financial Ledger Engine',
        recommendedCertifications: ['PostgreSQL Certified Professional']
      },
      {
        id: 'node_2',
        title: 'Distributed Compute with Apache Spark & PySpark',
        category: 'Core Platform',
        status: 'recommended',
        estimatedHours: 35,
        description: 'Spark Catalyst optimizer, shuffle partitions, broadcast joins, data skews, and PySpark DataFrame APIs.',
        skills: ['PySpark', 'Distributed Shuffling', 'Memory Management', 'Parquet Format'],
        suggestedProject: '100M Record Clickstream Aggregator',
        recommendedCertifications: ['Databricks Certified Data Engineer Associate']
      },
      {
        id: 'node_3',
        title: 'Modern Lakehouse Architecture (Delta Lake & Iceberg)',
        category: 'Distributed Systems',
        status: 'locked',
        estimatedHours: 28,
        description: 'ACID transactions on object storage, metadata management, time travel queries, compaction, Z-ordering.',
        skills: ['Apache Iceberg', 'Delta Lake', 'Cloud Storage Tiering', 'Data Governance'],
        suggestedProject: 'Petabyte Lakehouse Migration & Benchmark Suite',
        recommendedCertifications: ['Databricks Certified Data Engineer Professional']
      },
      {
        id: 'node_4',
        title: 'Real-Time Streaming Systems (Apache Kafka & Flink)',
        category: 'Distributed Systems',
        status: 'locked',
        estimatedHours: 40,
        description: 'Event-driven streaming, exactly-once processing semantics, stateful stream processing, watermarks.',
        skills: ['Kafka Streams', 'Apache Flink', 'Schema Registry', 'Event Sourcing'],
        suggestedProject: 'Live Fraud Detection Stream Processing Pipeline',
        recommendedCertifications: ['Confluent Certified Developer for Apache Kafka']
      },
      {
        id: 'node_5',
        title: 'Cloud Orchestration & DataOps (dbt & Airflow)',
        category: 'Capstone',
        status: 'locked',
        estimatedHours: 20,
        description: 'Declarative data transformations, automated CI/CD testing, dependency DAGs, SLA monitoring.',
        skills: ['dbt Core', 'Apache Airflow', 'Docker', 'Great Expectations'],
        suggestedProject: 'End-to-End Enterprise Analytics Pipeline'
      }
    ]
  },
  {
    id: 'track_ai_eng',
    roleTitle: 'AI Systems & LLM Platform Engineer',
    avgSalaryRange: '$175,000 - $240,000',
    currentMatchPercentage: 64,
    description: 'Design production retrieval engines, agentic orchestration, vector search scalability, and model evaluation pipelines.',
    nodes: [
      {
        id: 'ai_1',
        title: 'Production RAG & Vector Indexing Architecture',
        category: 'Foundation',
        status: 'recommended',
        estimatedHours: 25,
        description: 'HNSW, IVF indexing, hybrid BM25 + dense vector reranking, semantic caching.',
        skills: ['Qdrant', 'Pinecone', 'Hybrid Search', 'Reranking'],
        suggestedProject: 'Sub-15ms Enterprise Legal Search Engine'
      },
      {
        id: 'ai_2',
        title: 'Agentic Workflows & Multi-Agent State Machines',
        category: 'Core Platform',
        status: 'locked',
        estimatedHours: 30,
        description: 'Tool use, reactive wakeup, structured output schemas, agent evaluation frameworks.',
        skills: ['LangGraph', 'Antigravity SDK', 'Tool Calling', 'Agentic Workflows'],
        suggestedProject: 'Autonomous Code Refactoring Agent'
      }
    ]
  }
];
