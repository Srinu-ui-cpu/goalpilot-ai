# GoalPilot AI 🚀
> *"Turn Learning Goals Into Completed Outcomes"*

[![Production Ready](https://img.shields.io/badge/Status-Production%20Ready-emerald.svg)]()
[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-indigo.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)]()
[![BYOK](https://img.shields.io/badge/BYOK-Gemini%20%7C%20Claude%20%7C%20OpenAI%20%7C%20DeepSeek-purple.svg)]()
[![License](https://img.shields.io/badge/License-MIT-zinc.svg)]()

GoalPilot AI is **NOT an AI chatbot**. GoalPilot AI is an **AI Learning Execution Platform** engineered around one primary KPI: **Goal Completion Rate**.

While traditional online courses and MOOCs suffer from a 96% dropout rate, GoalPilot AI transforms passive tutorial watching into an active execution pipeline:

$$\text{Goal} \longrightarrow \text{Planning} \longrightarrow \text{Scheduling} \longrightarrow \text{Accountability} \longrightarrow \text{Focus} \longrightarrow \text{Practice} \longrightarrow \text{Assessment} \longrightarrow \text{Project} \longrightarrow \text{Portfolio}$$

---

## 🌟 Core Features

### 1. Bring Your Own AI Keys (BYOK)
- Connect your own **Google Gemini**, **OpenAI**, **Claude (Anthropic)**, **OpenRouter**, or **DeepSeek** keys.
- Client-side encryption ensures **zero token markups** and 100% data sovereignty.
- Built-in intelligent fallback engine so the platform is immediately interactive without configuration hurdles.

### 2. 6 AI Accountability Coaches
Switch your coach personality at any time:
- **Sarah Lin (Friendly Mentor)**: Empathetic, supportive, habit-science focused.
- **Prof. Vance (Strict Teacher)**: Rigorous, uncompromising academic discipline.
- **Commander Stone (Military Commander)**: Tactical execution, mission-first, zero excuses.
- **David Goggins Mode**: Hyper-intense, relentless raw accountability (*"Who's gonna carry the boats?!"*).
- **Victoria Cross (Corporate Manager)**: OKR-driven, KPI-oriented executive delivery.
- **Alex Rivera (Engineering Mentor)**: First-principles systems thinker, query plan and memory debugger.

### 3. Study War Room (Dashboard)
- Real-time telemetry: Completion %, Hours Remaining, Days Remaining, Streak flame counter, Focus Score, Interview Readiness, Project Readiness, and Completion Probability.
- One-click primary action: **START TODAY'S MISSION**.
- Spaced Repetition queue (1d, 3d, 7d, 14d, 30d neuroscience review intervals).

### 4. Centerpiece Session Experience
- **Resource Viewer**: Integrated Video Player with lesson timestamps, PDF reader, Article mode, GitHub code explorer, and interactive transcript search.
- **Pre-Study Checklist**: Mandatory lock-in verification (Water bottle, Notebook, Pen, Charger, Bio break, Phone silent, Desk cleared).
- **Pomodoro Deep Work Engine**: 25/5, 50/10, 90/15, and custom intervals.
- **Focus Mode**: Minimal fullscreen distraction-free workspace.
- **AI Study Assistant**: Resource-aware chat for real-time explanations, cheat sheets, and edge-case quizzes.
- **Auto Notes & Flashcards**: Live markdown editor and active recall card flip review.

### 5. Mandatory End-of-Session Assessments
- Sessions cannot be checked off without proving comprehension.
- Evaluates 5 dimensional question types:
  1. Concept Deep Dive
  2. Real-World Scenario
  3. Practical Hands-On Code
  4. Staff / L5 Interview Question
  5. Explain Like I'm 10 (ELI10)
- Immediate multi-dimensional grading: Understanding, Communication, Confidence, Practical Knowledge, and Interview Readiness.

### 6. Capstone Project Lab & AI Reviewer
- Generates industry-grade project specifications (e.g., *High-Throughput Financial Ledger & Analytics Engine* in PostgreSQL).
- **Strict Project Rule**: AI acts exclusively as Architect & Reviewer. Students write all code themselves.
- AI Reviewer evaluates uploaded SQL scripts, schema migrations, and concurrency locks against production benchmarks.

### 7. Portfolio & LinkedIn Case Study Builder
- Generates publication-ready artifacts upon project completion:
  - Markdown Technical Case Study
  - ATS-optimized resume bullet points
  - High-engagement LinkedIn announcement
  - Public portfolio page

### 8. Manifest V3 Browser Extension
- Chrome and Microsoft Edge extension in `/extension` folder.
- Detects YouTube, Udemy, Coursera, LeetCode, HackerRank, and GitHub.
- 1-click import into GoalPilot and active watch-time / submission tracking.

---

## 🛠️ Tech Stack

- **Frontend & Full-stack**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: TailwindCSS, Lucide Icons, Canvas Confetti
- **Database Architecture**: PostgreSQL Relational Schema (`database/schema.sql`) & Prisma ORM (`prisma/schema.prisma`)
- **Browser Extension**: Manifest V3 (Chrome & Microsoft Edge)
- **Deployment**: Vercel

---

## 🚀 Quickstart & Local Setup

```bash
# Clone the repository
git clone https://github.com/Srinu-ui-cpu/goalpilot-ai.git
cd goalpilot-ai

# Install dependencies
npm install

# Run the development server
npm run dev

# Open http://localhost:3000 in your browser
```

---

## 📦 Browser Extension Installation

1. Open Chrome or Edge and navigate to `chrome://extensions` or `edge://extensions`.
2. Toggle on **Developer Mode** (top right).
3. Click **Load unpacked**.
4. Select the `extension/` directory inside this repo.

---

## 📜 Database Design

The schema covers 21 relational tables optimizing goal execution and career telemetry:
`users`, `profiles`, `api_keys`, `goals`, `resources`, `learning_chunks`, `schedules`, `sessions`, `assessments`, `projects`, `project_tasks`, `notes`, `flashcards`, `interview_scores`, `notifications`, `reminders`, `ai_chats`, `analytics`, `progress_history`, `career_paths`, `browser_events`.

To inspect or run migrations:
```bash
psql -U your_user -d goalpilot -f database/schema.sql
```

---

## 📄 License
MIT © GoalPilot AI Team. Turn Learning Goals Into Completed Outcomes.
