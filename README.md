# FORMULA HUB 2.0

> **Every Formula. One Destination.**  
> A premium, comprehensive, searchable formula learning, revision, and colourful PDF sheet platform designed for JEE Main, JEE Advanced, and NEET aspirants.

[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646cff.svg)](https://vitejs.dev/)
[![KaTeX](https://img.shields.io/badge/KaTeX-0.16-3298dc.svg)](https://katex.org/)
[![jsPDF](https://img.shields.io/badge/jsPDF-Vector_Engine-ff0055.svg)](https://github.com/parallax/jsPDF)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8.svg)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-10b981.svg)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

---

## 🌟 Key Highlights

- **100% Client-Side & Zero-Cost Architecture**: Operates statically on Cloudflare Pages and GitHub, with an optional full-stack Express engine for authenticated admin workflows. No paid APIs, no OpenAI/LLM runtime dependencies, and no credit card required.
- **Professional Colourful PDF Formula Sheets**:
  - Distinct subject design identities:
    - **Physics**: Electric blue & cyan palette with dynamic vector grids.
    - **Chemistry**: Emerald & turquoise palette with molecular motifs.
    - **Mathematics**: Vibrant orange, amber & deep indigo palette.
  - Complete coverage across:
    - **Master Bundles**: Complete JEE Physics (128 pgs), Complete JEE Chemistry (142 pgs), Complete JEE Mathematics (156 pgs), NEET Physics (96 pgs), NEET Chemistry (108 pgs), and Essential Physical Constants (18 pgs).
    - **Class Collections**: Class 11 and Class 12 compendiums for all three subjects.
    - **Chapter-Wise Sheets**: High-density formula sheets for individual chapters.
  - Formatted in print-ready A4 with clickable TOCs, variable breakdowns, SI units, applicability conditions, and JEE/NEET warning callouts.
- **Advanced In-App PDF Reader**:
  - Vector PDF preview modal with zoom controls (50% to 200%), fit-to-width, fit-to-page, full screen, and page stepper.
  - Distraction-free reading mode with customizable focus width.
  - Keyboard shortcuts: `←`/`→` (page navigation), `+`/`-` (zoom), `0` (reset), `F` (fullscreen), `Esc` (exit).
  - Single-click native print and instant PDF download.
- **Dedicated Administrator Management System (`/admin`)**:
  - Secure server-side PBKDF2/SHA-512 authentication (`/api/admin/login`, `/api/admin/logout`) with 24-hour Bearer session tokens.
  - **Safe Document Replacement Engine**: Upload updated PDFs with automatic semver incrementing (`v1.0` → `v1.1`), mandatory changelog notes, and full historical version retention.
  - **Instant Rollback**: 1-click restoration to any previous version.
  - **Publishing Lifecycle**: Toggle sheets between `Draft` and `Published` instantly.
  - **Storage Quota Guard**: Visual Cloudflare R2 10 GB free-tier monitoring bar and telemetry counter.
  - **Immutable Audit Trail**: Chronological event logs for uploads, edits, replacements, rollbacks, and deletions.
- **Flawless Mathematical Typesetting**: Every equation is rendered with KaTeX for crisp rendering across all screen sizes.
- **Dedicated Bed-Friendly Study Mode**: Fullscreen, high-contrast, distraction-free reading mode with customizable font sizes, reading widths, and OLED black / warm sepia themes with complete keyboard navigation (`←`/`→`, `J`/`K`, `F`, `B`, `R`, `Esc`).
- **Complete Syllabus Coverage**:
  - **Physics**: Class 11 (15 chapters) & Class 12 (14 chapters) with variables, SI units, applicability conditions, traps, and JEE Advanced / NEET variations.
  - **Chemistry**: Physical Chemistry (Mole concepts, Thermodynamics, Equilibrium, Electrochemistry, Kinetics, Solutions), Organic Chemistry (GOC, Degree of Unsaturation, Named Reactions, Reaction Mechanisms), and Inorganic Chemistry (Periodic trends, Coordination compounds, CFSE, EAN rule).
  - **Mathematics**: Class 11 & 12 (Calculus, Coordinate Geometry, Vectors & 3D, Algebra, Trigonometry, Conics, Matrices & Determinants, Probability).
- **Fundamental Physical Constants**: Verified CODATA values with SI units, uncertainties, and single-click copy.
- **Built-in Physical Toolkit**:
  - High-precision **Unit Converter** across 10 physical dimensions (Length, Mass, Time, Speed, Acceleration, Force, Energy, Power, Pressure, Temperature).
  - Fully featured **Scientific Calculator** (Trigonometry, Logarithms, Powers, Roots, Factorials, Rad/Deg toggle, History tape).
  - **Active Recall Flashcards** (Quick Revision mode with shuffle).
  - **Formula Application Quiz** with instant score tracking and detailed KaTeX mathematical explanations.
  - **Essential Identities Reference** cheat-sheet.
- **Personal Notebook & Privacy**:
  - Bookmark formulas and PDF sheets with persistent LocalStorage storage.
  - Mark formulas as revised to track verified syllabus progress.
  - Write custom mnemonics and memory tips directly on formula cards.
  - Export and Import progress as a portable JSON file.
- **PWA & Offline Capability**: Complete service worker caching enables full offline functionality after the initial load.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19, TypeScript, Vite 8 |
| **Styling & Design System** | Tailwind CSS v4, Lucide Icons, Glassmorphic dark/light surfaces |
| **Mathematical Rendering** | KaTeX 0.16 (LaTeX expression parsing & rendering) |
| **Document Generation** | jsPDF vector engine with custom high-contrast color palettes |
| **Full-Stack Server** | Express 4 mounted with Vite dev middleware (`server.ts`) |
| **Authentication & Security** | Server-side PBKDF2/SHA-512 cryptographic hashing, 24-hr Bearer session tokens |
| **Offline & PWA** | Vite Plugin PWA, Workbox Service Worker, Web App Manifest |
| **Storage & Persistence** | Client LocalStorage (study progress) + Cloudflare R2 / Server storage engine |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/formula-hub.git

# Navigate to project directory
cd formula-hub

# Install dependencies
npm install

# Start development server (runs Express + Vite on port 3000)
npm run dev
```

The application will be live at `http://localhost:3000`.

### Default Administrator Credentials

To access the Admin Portal (`/?tab=admin` or clicking "Admin" in the navbar):

- **Username**: `admin`
- **Password**: `FormulaHub2026!`

To customize admin credentials in production, set the following environment variables:

```bash
ADMIN_USERNAME="your-admin-user"
ADMIN_PASSWORD="YourStrongPassword123!"
```

### Production Build

```bash
# Build production bundle
npm run build

# Start production server
npm start
```

---

## 📡 REST API Endpoints

The integrated Express backend exposes clean REST endpoints:

### Public Routes
- `GET /api/public/pdfs` - List all published formula PDFs with metadata, version, and page count.
- `POST /api/public/pdfs/:id/increment-download` - Track document download counts.

### Admin Routes (Bearer Token Required)
- `POST /api/admin/login` - Authenticate admin credentials and receive a session token.
- `POST /api/admin/logout` - Invalidate current session token.
- `GET /api/admin/me` - Verify session status.
- `GET /api/admin/dashboard` - Retrieve analytics, R2 storage usage (10 GB free tier), and activity logs.
- `GET /api/admin/pdfs` - Retrieve all documents including drafts and unlisted sheets.
- `POST /api/admin/pdfs/upload` - Upload a new PDF document.
- `PUT /api/admin/pdfs/:id/replace` - Safe document replacement with automatic version bump and update notes.
- `PATCH /api/admin/pdfs/:id` - Update title, category, description, or tags.
- `POST /api/admin/pdfs/:id/publish` - Set status to `published`.
- `POST /api/admin/pdfs/:id/unpublish` - Set status to `draft`.
- `POST /api/admin/pdfs/:id/restore` - Roll back document to any previous historical version.
- `DELETE /api/admin/pdfs/:id` - Remove a document from the catalog.

---

## ☁️ Cloudflare Pages & Workers Deployment

### Option A: Static SPA Deployment (Cloudflare Pages)

1. Push your repository to GitHub.
2. In the **Cloudflare Dashboard**, navigate to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Select your `formula-hub` repository.
4. Set build configurations:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**.

> The included `public/_redirects` file ensures that deep links (`/?tab=pdf-library`, `/?tab=admin`) resolve smoothly.

### Option B: Full-Stack Cloudflare Pages + Functions / Worker

For server-side PDF replacement and upload handling in serverless environments, mount `server.ts` routes onto Cloudflare Pages Functions (`/functions/api/[[route]].ts`) using Cloudflare R2 bucket bindings.

---

## 📖 Contributing New Content

### Adding Formulas
Add formula objects conforming to the `Formula` schema in `src/data/physicsData.ts`, `src/data/chemistryData.ts`, or `src/data/mathData.ts`.

### Adding PDF Formula Sheets
Registered admins can upload PDFs directly through the **Admin Portal** (`/?tab=admin`). Alternatively, define static catalog entries in `src/data/pdfCatalog.ts`.

---

## 📄 License

Apache License 2.0. Built with pride for the JEE and NEET student community.

