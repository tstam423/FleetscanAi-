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

## Repository Structure

> **Note:** This project is in its initial setup phase. Update this section as the codebase grows.

```
FleetscanAi-/
├── CLAUDE.md            # This file — AI assistant guide
└── ...                  # Project files to be added
```

<!--
Suggested structure (update as implemented):
├── src/
│   ├── app/             # App routes and pages
│   ├── components/      # Reusable UI components
│   │   ├── inspection/  # Inspection checklist, form steps
│   │   ├── camera/      # Video/photo capture UI
│   │   ├── reports/     # Report generation and viewing
│   │   └── labels/      # Sticker/label generation (Avery format)
│   ├── lib/             # Utilities, helpers, API clients
│   ├── models/          # Data models and types
│   └── services/        # Business logic and AI integration
│       ├── ai/          # AI damage detection, model inference
│       ├── inspection/  # DOT checklist logic, form autofill
│       ├── geolocation/ # GPS and timestamp capture
│       └── labels/      # Label formatting, QR code generation
├── public/              # Static assets, icons, label templates
├── tests/               # Test files
├── .env.example         # Environment variable template
├── package.json         # Dependencies and scripts
└── README.md            # User-facing documentation
-->

## Development Setup

### Prerequisites
- Node.js (v18+ recommended) or Python 3.10+ (depending on chosen stack)
- Git
- Package manager (npm, yarn, or pnpm)

### Getting Started
```bash
# Clone the repository
git clone https://github.com/tstam423/FleetscanAi-.git
cd FleetscanAi-

# Install dependencies (update once package manager is chosen)
npm install

# Start development server
npm run dev
```

## Common Commands

> Update this section as tooling is configured.

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run test` | Run test suite |
| `npm run lint` | Run linter |

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

```bash
# Example .env structure (create .env.local for local development)
# DATABASE_URL=              # Database connection string
# AI_MODEL_API_KEY=          # API key for AI vision/detection model
# CLOUD_STORAGE_BUCKET=      # Storage for inspection photos/videos
# NEXT_PUBLIC_APP_URL=       # Public-facing app URL
# GEOLOCATION_API_KEY=       # Geolocation service key (if needed)
# SIGNATURE_STORAGE_PATH=    # Path/bucket for signature data
```

**Never commit `.env` files.** Use `.env.example` to document required variables without values.
