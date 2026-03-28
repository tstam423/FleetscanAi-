# CLAUDE.md — FleetscanAI

This file provides context for AI assistants (Claude, Copilot, etc.) working on the FleetscanAI codebase.

## Project Overview

**FleetscanAI** is a trailer damage estimator application that uses AI to assess and estimate damage on fleet trailers. The app helps fleet operators quickly identify, document, and estimate repair costs for trailer damage through intelligent image analysis and reporting.

### Core Capabilities (Planned)
- AI-powered trailer damage detection from photos
- Damage severity classification and repair cost estimation
- Fleet-wide damage tracking and reporting
- User-friendly interface for field inspections

## Repository Structure

> **Note:** This project is in its initial setup phase. Update this section as the codebase grows.

```
FleetscanAi-/
├── CLAUDE.md            # This file — AI assistant guide
└── ...                  # Project files to be added
```

<!--
Suggested structure (update as implemented):
├── src/                 # Application source code
│   ├── app/             # App routes and pages
│   ├── components/      # Reusable UI components
│   ├── lib/             # Utilities, helpers, API clients
│   ├── models/          # Data models and types
│   └── services/        # Business logic and AI integration
├── public/              # Static assets
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
- Components: `PascalCase.tsx` (e.g., `DamageReport.tsx`)
- Utilities/helpers: `camelCase.ts` (e.g., `imageProcessor.ts`)
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

### Image/AI-Specific Considerations
- Trailer damage images may be large — handle memory and upload size limits
- AI model responses should be validated before displaying to users
- Always provide fallback behavior when AI services are unavailable
- Log AI model confidence scores for damage estimates

## Environment Variables

> Document all required environment variables here as they are added.

```bash
# Example .env structure (create .env.local for local development)
# DATABASE_URL=
# AI_MODEL_API_KEY=
# CLOUD_STORAGE_BUCKET=
# NEXT_PUBLIC_APP_URL=
```

**Never commit `.env` files.** Use `.env.example` to document required variables without values.
