# FORWARD — One Timeline. All Opportunities.

> **HACKSHIFT 2026 — Track PS4: MyCampus (Your Event Journey)**  
> An intelligent student timeline engine that unifies scattered hackathons, workshops, college events, and application deadlines into a single actionable timeline with smart extraction, conflict detection, and preparation tracking.

---

## 📌 Problem Statement

College students miss high-stakes academic and career opportunities not because they lack interest, but because information is fragmented across:
- Unstructured **WhatsApp / Telegram groups** and campus circulars
- Independent competition portals (**Devfolio, Unstop, MLH**)
- Social posts on **LinkedIn / Instagram**, email newsletters, and flyer PDFs

**The Consequences:**
1. **Missed Deadlines:** Registration cutoffs pass unnoticed in chat clutter.
2. **Scheduling Conflicts:** Double-booking between hackathons and campus exams or overlapping multi-day workshops.
3. **Information Drift:** Organizers quietly update dates or venues without attendees knowing.
4. **Lack of Preparation Visibility:** No direct link between an event and actionable milestones (forming teams, submitting decks, booking travel).

---

## 🚀 The FORWARD Solution

**FORWARD** transforms passive event discovery into an active, friction-free journey:

```
[ Raw Sources ]                [ FORWARD Core Engine ]                   [ Unified Student Hub ]
• WhatsApp Notices    ───┐                                          ┌───► Real-Time Overview
• PDF Flyers / Posters ──┼──►  Smart Ingestion & Extraction Engine  ┼───► Chronological Timeline
• Devfolio / Portals  ───┤     • NLP parsing & confidence scoring   ├───► Conflict & Review Queue
• Web Links & Emails  ───┘     • Cross-source reconciliation        ├───► Source Management
                               • Schedule clash detection           └───► Prep Task Tracker
```

---

## ✨ Key Features

### 1. 📊 Executive Dashboard (Overview)
- **Dynamic Metrics Row:** Real-time counts of upcoming events, imminent deadlines (next 7 days), and confirmed registrations computed dynamically.
- **Urgent Action Center ("Needs Attention"):** Prioritizes items requiring immediate resolution (date clashes, missing venues, deadline extensions).
- **Recent Discoveries:** Newly ingested events from synced platforms.
- **Next Moves Prep Checklist:** Direct task tracker linked to specific events (e.g., submitting GitHub repository links, attending team orientations).
- **Interactive Calendar Widget:** Month view with active event indicators and instant date-filtering.

### 2. 🗓️ My Timeline View
- **Chronological Grouping:** Events cleanly structured into temporal buckets (**Today**, **Tomorrow**, **This Week**, **Later**).
- **Multi-Filter & Search:** Filter by category (*Hackathons*, *Workshops*, *Competitions*, *Internships*, *Conferences*) and search by title, organizer, or venue.
- **View Modes:** Toggle seamlessly between **List View**, **Card View**, and **Calendar View**.
- **Interactive Event Details:** View venue, reporting time, countdown badges, registration status, and direct external registration links.

### 3. ⚡ Smart Ingestion & AI Capture (`Add Event`)
- **Three-Way Capture Pipeline:**
  - **Text Snippet:** Paste unstructured WhatsApp announcements or chat transcripts.
  - **File / PDF Upload:** Upload event posters, circulars, or brochures.
  - **Web URL:** Enter direct portal or hackathon links.
- **Confidence Scoring:** Shows confidence metrics per extracted field and flags unconfirmed data for student verification before saving.

### 4. ⚖️ Anomaly & Conflict Resolution (`Needs Review`)
- **Cross-Source Clash Detection:** Automatically flags when an event date overlaps with another confirmed commitment (e.g. *Hack On Hills 8.0* vs. *Search Central Live Bengaluru*).
- **Missing Information Warnings:** Alerts students when critical details (such as offline venue hall addresses) are absent.
- **Interactive Resolution Panel:** Side-by-side comparison of current record vs. proposed source update with options to:
  - **Keep Current:** Retain the existing schedule.
  - **Accept Update:** Automatically reconcile and update timeline records.
  - **Manual Override:** Custom edit inline.

### 5. 🌐 Connected Sources (`Sources`)
- **Multi-Platform Sync:** Manage active sync connections for platforms like **Devfolio**, **Google Search Central Events**, and campus news outlets.
- **Sync Telemetry:** Track last-synced timestamps, discovered event counts, connection health, and toggle auto-sync per source.
- **One-Click Sync:** Refresh pipelines on demand with real-time feedback toasts.

### 6. ⚙️ Profile & Student Preferences (`Settings`)
- **Personalized Student Profile:** Manage student name, college/institution (*Delhi University, IIT Delhi, DTU, NSUT, IIIT Delhi, VIPS*), role, and custom photo upload with vector avatar fallback.
- **Notification Controls:** Toggle push/in-app reminders for event deadlines, new opportunities, and critical updates.
- **Data Portability:** Export timeline data as JSON or reset demo state on demand.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Details |
|---|---|---|
| **Frontend Framework** | **React 19** + **TypeScript** | Type-safe components, custom hooks, and zero `any` types |
| **Bundler & Build Tool** | **Vite 8** | High-performance Hot Module Replacement (HMR) and optimized rollup bundle |
| **Styling & UI System** | **Vanilla CSS Design Tokens** | Custom design system (`src/index.css`) with CSS custom properties, glassmorphism, responsive grids, and zero heavy external component libraries |
| **Icons & Visual Assets** | **Lucide React** + Custom SVGs | Curated icon set + custom vector event logos and illustrations |
| **Linter & Code Quality** | **Oxlint** | High-speed Rust-based linter ensuring clean hooks and code standards |
| **Client-Side State** | LocalStorage + React State | Persistent client state across sessions with dynamic event computation |

---

## 📂 Project Structure

```
FORWARD/
├── public/                       # Static public assets
├── src/
│   ├── components/               # Modular UI components
│   │   ├── AddEventView.tsx      # Multi-mode manual & AI capture view
│   │   ├── CalendarPanel.tsx     # Interactive month-view calendar widget
│   │   ├── CaptureModal.tsx      # Quick-capture dialog (text/flyer/link)
│   │   ├── ConflictModal.tsx     # Conflict resolution modal
│   │   ├── EventDetailModal.tsx  # Full event inspection modal
│   │   ├── EventThumbnail.tsx    # Custom SVGs & logos for events + student avatar
│   │   ├── GreetingHeader.tsx    # Welcome header with quick capture triggers
│   │   ├── MetricsRow.tsx        # Dynamic summary KPI metric cards
│   │   ├── MyTimelineView.tsx    # Chronological timeline view with view switcher
│   │   ├── NeedsAttentionCard.tsx# Attention & urgency card for Overview
│   │   ├── NeedsReviewView.tsx   # Two-column reconciliation interface
│   │   ├── NextMovesPanel.tsx    # Prep task checklist
│   │   ├── RecentlyAddedCard.tsx # Recently synced event items
│   │   ├── SettingsView.tsx      # Profile, institutions, preferences & data export
│   │   ├── Sidebar.tsx           # Global navigation with notification badges
│   │   ├── SourcesView.tsx       # Platform source connectors & sync engine
│   │   ├── TopHeader.tsx         # Global search bar, notifications, and profile
│   │   └── UpcomingEventsSection.tsx # Overview upcoming event cards
│   ├── data/
│   │   └── realEventsMock.ts     # Canonical real-event seed datasets & sources
│   ├── types/
│   │   └── index.ts              # Strict TypeScript definitions & interfaces
│   ├── App.tsx                   # Main application controller, routing & state
│   ├── index.css                 # Core design system tokens, typography & layouts
│   └── main.tsx                  # React 19 root bootstrap
├── .oxlintrc.json                # Oxlint configuration
├── package.json                  # Dependencies and execution scripts
├── tsconfig.json                 # Strict TypeScript configuration
└── vite.config.ts                # Vite build configuration
```

---

## 🏃 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **pnpm** / **yarn**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/FORWARD.git
   cd FORWARD
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   The application will be live at `http://127.0.0.1:5173/`.

4. **Run code quality & lint checks:**
   ```bash
   npm run lint
   ```

5. **Create a production build:**
   ```bash
   npm run build
   ```

---

## 🧪 Demo Scenarios

Try these interactive flows during evaluation:

1. **Conflict Resolution (`Needs Review`):**
   - Click **Needs Review** in the sidebar.
   - Review the date collision for *Hack On Hills 8.0*.
   - Use the sticky comparison panel to examine the conflicting schedule with *Search Central Live Bengaluru* and resolve it.
2. **AI Smart Capture (`Add Event`):**
   - Click **Add Event** or the **+ Add Event** button in the header.
   - Select **Text Snippet** or **Paste Link** and click **Load Sample**.
   - Watch the auto-extraction populate title, dates, deadlines, and confidence scores.
3. **Synchronize Sources (`Sources`):**
   - Navigate to **Sources**.
   - Trigger a manual **Sync Now** on *Devfolio* or *Google Search Central* to observe simulated real-time ingestion and status toasts.
4. **Prep Milestones:**
   - On the Overview dashboard, check off preparation items in **Next Moves** to track readiness for *CodeStorm 2026* and *Winter of Code 2026*.

---

## 👥 Hackathon Submission Details

- **Event:** HACKSHIFT 2026
- **Problem Statement (PS4):** MyCampus — Your Event Journey
- **Project Name:** FORWARD
- **Theme:** One Timeline. All Opportunities.

---

## 📄 License

This project was built for **HACKSHIFT 2026** and is licensed under the [MIT License](LICENSE).
