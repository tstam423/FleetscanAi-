# CLAUDE.md — FleetscanAI

This file provides context for AI assistants (Claude, Copilot, etc.) working on the FleetscanAI codebase.

## Project Overview

**FleetScan AI** — *Smart Inspections. Safer Roads.*

FleetScan AI uses video and artificial intelligence to assist mechanics in performing **DOT trailer inspections**. It detects visible damage and compliance issues, auto-fills inspection forms, and generates printable inspection labels — streamlining compliance without replacing the human inspector.

### Target Users
- Fleet maintenance companies
- Owner-operators
- DOT officers
- Mechanics and shop managers

### Core Features
- **AI-powered visual detection** of DOT compliance issues via video/photo
- **Step-by-step digital checklist** mirroring official DOT inspection forms
- **Auto-generated reports** with signature capture, timestamps, and geolocation
- **Digital J.J. Keller sticker** — printable on standard Avery labels
- **Optional QR-coded sticker rolls** for traceability and record lookups

### Revenue Model
- SaaS: monthly or per-inspection pricing
- Fleet-wide licensing or integration with existing fleet software
- Future add-ons: AR headset integration, QR-scan record lookups

### Project Status
- Concept developed, AI feature scope identified
- UI prototype live on Replit
- Early interest from fleet mechanics and techs
- Ready for full build-out

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4
- **AI Integration:** Anthropic Claude API (vision) — falls back to simulated results when no API key is set
- **Package Manager:** npm

## Repository Structure

```
FleetscanAi-/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with nav bar
│   │   ├── page.tsx            # Landing page (hero, features, how-it-works)
│   │   ├── globals.css         # Global styles and CSS variables
│   │   ├── scan/
│   │   │   └── page.tsx        # Inspection scan page (camera → AI → results)
│   │   └── api/
│   │       └── analyze/
│   │           └── route.ts    # POST /api/analyze — AI image analysis endpoint
│   ├── components/
│   │   ├── CameraCapture.tsx   # Camera/upload component with live preview
│   │   └── AnalysisResults.tsx # Damage findings, DOT alerts, recommendations
│   └── lib/
│       └── analyzeImage.ts     # AI analysis logic (Claude API + simulated fallback)
├── .env.example                # Environment variable template
├── CLAUDE.md                   # This file
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── .gitignore
```

### Key Files

| File | Purpose |
|------|---------|
| `src/lib/analyzeImage.ts` | Core AI logic — sends image to Claude Vision API, parses structured damage results. Returns simulated data when `AI_MODEL_API_KEY` is not set. |
| `src/components/CameraCapture.tsx` | Handles live camera stream (rear-facing preferred), photo capture, and file upload. Returns base64 image data. |
| `src/components/AnalysisResults.tsx` | Renders damage findings with severity badges, DOT compliance flags, confidence scores, and recommendations. |
| `src/app/api/analyze/route.ts` | API route that accepts base64 image POST and returns `AnalysisResult` JSON. |

## Development Setup

### Prerequisites
- Node.js v18+
- Git
- npm

### Getting Started
```bash
git clone https://github.com/tstam423/FleetscanAi-.git
cd FleetscanAi-
npm install
cp .env.example .env.local    # Optional: add AI_MODEL_API_KEY for real AI analysis
npm run dev                    # Opens at http://localhost:3000
```

### Without an API key
The app works in **demo mode** — the scan page returns realistic simulated inspection results so you can develop and test the full UI flow without needing an Anthropic API key.

## Common Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (http://localhost:3000) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Architecture & Key Conventions

### Coding Standards
- Use **TypeScript** with strict mode where possible
- Prefer named exports over default exports
- Keep functions small and focused — one responsibility per function
- Use descriptive variable and function names (no abbreviations)

### File Naming
- Components: `PascalCase.tsx` (e.g., `InspectionChecklist.tsx`)
- Utilities/helpers: `camelCase.ts` (e.g., `labelGenerator.ts`)
- Constants: `UPPER_SNAKE_CASE` for exported constants
- Test files: `<filename>.test.ts` or `<filename>.spec.ts`

### Patterns
- Colocate tests with source files or mirror the `src/` structure in `tests/`
- Keep API keys and secrets in environment variables — never hardcode
- Use environment-specific configuration (dev, staging, production)
- Handle errors at system boundaries (user input, external APIs, file uploads)

## Git Workflow

### Branch Naming
- Features: `feature/<short-description>`
- Bug fixes: `fix/<short-description>`
- Documentation: `docs/<short-description>`
- AI-generated: `claude/<description>` (auto-created by Claude Code)

### Commit Messages
- Use imperative mood: "Add damage classifier" not "Added damage classifier"
- Keep the subject line under 72 characters
- Reference issue numbers when applicable: `Fix #42: handle missing image metadata`

### Pull Requests
- Keep PRs focused — one feature or fix per PR
- Include a clear description of what changed and why
- Add screenshots for UI changes
- Ensure all checks pass before requesting review

## Testing Guidelines

- Write tests for business logic and AI integration points
- Test edge cases: missing images, corrupt files, network failures
- Mock external API calls (AI model endpoints, cloud storage)
- Aim for meaningful coverage on critical paths, not 100% coverage everywhere

## AI Assistant Guidelines

When working on this codebase as an AI assistant:

1. **Read before writing** — Always read existing files before modifying them
2. **Stay focused** — Only make changes the user requested; don't refactor surrounding code
3. **No secrets** — Never commit `.env` files, API keys, or credentials
4. **Preserve patterns** — Follow existing code conventions rather than introducing new ones
5. **Test your changes** — Run the test suite after modifications
6. **Small commits** — Make focused commits with clear messages
7. **Ask when unsure** — If requirements are ambiguous, ask rather than assume
8. **Security first** — Validate file uploads, sanitize inputs, use parameterized queries

### Domain-Specific Considerations
- **DOT compliance is critical** — inspection checklists must match official DOT forms exactly
- **Video/image uploads may be large** — handle memory, upload size limits, and compression
- **AI model responses must be validated** before auto-filling inspection forms
- **Always provide manual fallback** — AI assists the mechanic, never replaces them
- **Geolocation and timestamps** are required for legal compliance on inspection records
- **Label generation** must conform to standard Avery label dimensions
- **QR codes** should encode enough data for offline record lookups
- **Signature capture** must be legally valid — store as vector data, not just an image
- Log AI model confidence scores for all detection results

## Environment Variables

> Document all required environment variables here as they are added.

| Variable | Required | Description |
|----------|----------|-------------|
| `AI_MODEL_API_KEY` | No | Anthropic API key. When set, real Claude Vision analysis is used. When empty, simulated results are returned. |

More variables will be added as features like database storage, geolocation, and label generation are implemented.

**Never commit `.env` files.** Use `.env.example` to document required variables without values.
