-- =====================================================================
-- GOALPILOT AI - PRODUCTION POSTGRESQL DATABASE SCHEMA
-- Purpose: Complete Relational Schema for the AI Learning Execution Platform
-- Optimizing: Goal Completion Rate & Career Outcomes
-- =====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    avatar_url TEXT,
    auth_provider VARCHAR(50) DEFAULT 'email', -- 'google', 'microsoft', 'email', 'magic_link'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PROFILES TABLE (Detailed User Learning & Routine Context)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    career_goal VARCHAR(255) NOT NULL,
    current_role VARCHAR(255),
    wake_up_time TIME,
    sleep_time TIME,
    work_timings VARCHAR(100),
    gym_schedule VARCHAR(150),
    daily_availability_hours NUMERIC(4, 2) DEFAULT 2.0,
    preferred_study_duration INT DEFAULT 45, -- in minutes
    preferred_reminder_type VARCHAR(50) DEFAULT 'all', -- 'browser', 'push', 'email', 'all'
    preferred_ai_coach VARCHAR(50) DEFAULT 'david_goggins',
    timezone VARCHAR(100) DEFAULT 'UTC',
    focus_score INT DEFAULT 90,
    interview_readiness INT DEFAULT 75,
    project_readiness INT DEFAULT 70,
    streak_days INT DEFAULT 0,
    total_study_minutes INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. API KEYS TABLE (BYOK - Bring Your Own Keys)
CREATE TABLE IF NOT EXISTS api_keys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL, -- 'gemini', 'openai', 'claude', 'openrouter', 'deepseek'
    encrypted_key TEXT NOT NULL,
    key_hint VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. GOALS TABLE
CREATE TABLE IF NOT EXISTS goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    target_completion_date DATE NOT NULL,
    reason_for_goal TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'high', -- 'low', 'medium', 'high', 'urgent'
    expected_outcome TEXT NOT NULL,
    progress_percentage NUMERIC(5, 2) DEFAULT 0.00,
    hours_remaining NUMERIC(6, 2) DEFAULT 0.00,
    days_remaining INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'completed', 'paused', 'recovering'
    commitment_accepted_at TIMESTAMPTZ,
    commitment_signature VARCHAR(255),
    selected_coach VARCHAR(50) DEFAULT 'david_goggins',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. RESOURCES TABLE (Ingested Learning Materials)
CREATE TABLE IF NOT EXISTS resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    goal_id UUID REFERENCES goals(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    resource_type VARCHAR(50) NOT NULL, -- 'youtube', 'pdf', 'docx', 'pptx', 'epub', 'web_article', 'github', 'leetcode'
    source_url TEXT,
    file_path TEXT,
    total_duration_minutes INT DEFAULT 0,
    item_or_video_count INT DEFAULT 1,
    difficulty VARCHAR(30) DEFAULT 'Intermediate',
    knowledge_base_summary TEXT,
    learning_outcomes JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. LEARNING CHUNKS (Semantic Units from Resources)
CREATE TABLE IF NOT EXISTS learning_chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resource_id UUID REFERENCES resources(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    sequence_order INT NOT NULL,
    duration_minutes INT NOT NULL,
    difficulty VARCHAR(30) DEFAULT 'Intermediate',
    summary TEXT,
    key_concepts JSONB DEFAULT '[]',
    suggested_study_hours NUMERIC(4, 2) DEFAULT 1.0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SCHEDULES TABLE (Adaptive Calendars & Plan Options)
CREATE TABLE IF NOT EXISTS schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    goal_id UUID REFERENCES goals(id) ON DELETE CASCADE,
    plan_tier VARCHAR(50) DEFAULT 'balanced', -- 'realistic', 'balanced', 'aggressive'
    daily_study_minutes INT NOT NULL,
    completion_probability NUMERIC(5, 2) NOT NULL,
    estimated_success_rate NUMERIC(5, 2) NOT NULL,
    is_adaptive BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. SESSIONS TABLE (Daily Study War Room Missions)
CREATE TABLE IF NOT EXISTS sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    goal_id UUID REFERENCES goals(id) ON DELETE CASCADE,
    chunk_id UUID REFERENCES learning_chunks(id) ON DELETE SET NULL,
    session_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    scheduled_date DATE NOT NULL,
    scheduled_time TIME NOT NULL,
    duration_minutes INT NOT NULL,
    status VARCHAR(30) DEFAULT 'upcoming', -- 'upcoming', 'in_progress', 'completed', 'missed', 'recovered'
    difficulty VARCHAR(30) DEFAULT 'Medium',
    tasks JSONB DEFAULT '[]',
    focus_score INT,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. ASSESSMENTS TABLE (Mandatory End-Of-Session Evaluations)
CREATE TABLE IF NOT EXISTS assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE UNIQUE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    overall_score INT NOT NULL,
    understanding_score INT,
    communication_score INT,
    confidence_score INT,
    practical_score INT,
    interview_readiness_score INT,
    user_answers JSONB NOT NULL,
    evaluation_strengths JSONB DEFAULT '[]',
    evaluation_weaknesses JSONB DEFAULT '[]',
    better_answer TEXT,
    expert_answer TEXT,
    detailed_explanation TEXT,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. PROJECTS TABLE (Capstone Project Generation)
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    goal_id UUID REFERENCES goals(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    project_level VARCHAR(50) DEFAULT 'Industry-Level', -- 'Beginner', 'Intermediate', 'Advanced', 'Industry-Level'
    problem_statement TEXT NOT NULL,
    business_context TEXT NOT NULL,
    architecture_summary TEXT NOT NULL,
    required_software JSONB DEFAULT '[]',
    folder_structure TEXT,
    database_requirements JSONB DEFAULT '[]',
    api_requirements JSONB DEFAULT '[]',
    frontend_requirements JSONB DEFAULT '[]',
    dashboard_requirements JSONB DEFAULT '[]',
    presentation_requirements JSONB DEFAULT '[]',
    success_criteria JSONB DEFAULT '[]',
    deliverables JSONB DEFAULT '[]',
    learning_links JSONB DEFAULT '[]',
    status VARCHAR(50) DEFAULT 'in_progress', -- 'in_progress', 'reviewed', 'completed'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. PROJECT TASKS TABLE
CREATE TABLE IF NOT EXISTS project_tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    milestone_order INT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMPTZ
);

-- 12. NOTES TABLE (Auto Notes & Student Session Notes)
CREATE TABLE IF NOT EXISTS notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    note_type VARCHAR(50) DEFAULT 'session_notes', -- 'summary', 'definitions', 'cheat_sheet', 'interview_notes', 'personal'
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. FLASHCARDS TABLE (Spaced Repetition SM-2 Queue)
CREATE TABLE IF NOT EXISTS flashcards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    topic VARCHAR(150) NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    interval_days INT DEFAULT 1, -- 1, 3, 7, 14, 30
    next_review_date DATE NOT NULL,
    repetition_count INT DEFAULT 0,
    difficulty_rating VARCHAR(20) DEFAULT 'good',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. INTERVIEW SCORES TABLE
CREATE TABLE IF NOT EXISTS interview_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL, -- 'Technical', 'Scenario', 'Behavioral', 'Rapid Fire'
    score INT NOT NULL,
    readiness_percentage INT NOT NULL,
    questions_attempted INT DEFAULT 1,
    feedback TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'reminder', 'accountability', 'recovery', 'milestone'
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    action_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. REMINDERS TABLE (Precise Notification Sequences)
CREATE TABLE IF NOT EXISTS reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
    sequence_stage VARCHAR(50) NOT NULL, -- '-15m', '-10m', '-5m', 'start', '+10m_late', '+20m_late', '+30m_late', '+60m_late'
    scheduled_trigger_time TIMESTAMPTZ NOT NULL,
    personalized_message TEXT NOT NULL,
    dispatched_at TIMESTAMPTZ,
    status VARCHAR(20) DEFAULT 'pending' -- 'pending', 'sent', 'cancelled'
);

-- 17. AI CHATS TABLE (War Room & Project Mentor In-Context Chats)
CREATE TABLE IF NOT EXISTS ai_chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id UUID REFERENCES sessions(id) ON DELETE SET NULL,
    coach_type VARCHAR(50) NOT NULL,
    role VARCHAR(20) NOT NULL, -- 'user', 'assistant', 'system'
    message TEXT NOT NULL,
    context_type VARCHAR(50), -- 'session_study', 'project_mentor', 'planning_interview'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. ANALYTICS TABLE (Daily Performance Snapshots)
CREATE TABLE IF NOT EXISTS analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    record_date DATE NOT NULL,
    study_minutes INT DEFAULT 0,
    focus_score INT DEFAULT 0,
    completion_rate INT DEFAULT 0,
    interviews_completed INT DEFAULT 0,
    projects_progressed INT DEFAULT 0,
    UNIQUE(user_id, record_date)
);

-- 19. PROGRESS HISTORY TABLE
CREATE TABLE IF NOT EXISTS progress_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    goal_id UUID REFERENCES goals(id) ON DELETE CASCADE,
    snapshot_date DATE NOT NULL,
    progress_percentage NUMERIC(5, 2) NOT NULL,
    hours_invested NUMERIC(6, 2) NOT NULL,
    sessions_completed INT NOT NULL
);

-- 20. CAREER PATHS TABLE
CREATE TABLE IF NOT EXISTS career_paths (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    track_name VARCHAR(150) NOT NULL,
    current_match_percentage INT NOT NULL,
    target_salary_range VARCHAR(100),
    nodes JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 21. BROWSER EVENTS TABLE (Extension Ingested Telemetry)
CREATE TABLE IF NOT EXISTS browser_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL, -- 'video_watch', 'problem_solved', 'article_read', 'repo_view'
    platform VARCHAR(50) NOT NULL, -- 'youtube', 'leetcode', 'hackerrank', 'udemy', 'coursera', 'github'
    url TEXT NOT NULL,
    watch_time_seconds INT DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES FOR MAXIMUM QUERY OPTIMIZATION
CREATE INDEX IF NOT EXISTS idx_goals_user_status ON goals(user_id, status);
CREATE INDEX IF NOT EXISTS idx_sessions_goal_date ON sessions(goal_id, scheduled_date);
CREATE INDEX IF NOT EXISTS idx_flashcards_user_review ON flashcards(user_id, next_review_date);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_browser_events_user_platform ON browser_events(user_id, platform, created_at DESC);
