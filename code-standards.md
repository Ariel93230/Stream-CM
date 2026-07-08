Code Standards — StreamCM
Applies to all contributors — human or AI agent (opencode, Copilot, Codex). When any agent generates code in this repo, it should conform to this doc without being re-prompted each time.
1. General Principles
Thin controllers, fat services. Controllers only parse requests and call a service. All logic lives in services.
No business logic in routes, pages, or components. UI components render; feature hooks/services fetch and transform.
Framework-agnostic services. Backend services should never reference req/res — pass in plain arguments, return plain data/errors.
Explicit over clever. Prefer readable, slightly longer code over dense one-liners. Agents should optimize for the next contributor (human or AI) understanding it in 30 seconds.
Every module owns its types. Don't scatter shared interfaces across unrelated files — colocate with the feature/module, promote to a shared types/ only when truly cross-cutting.
2. Naming Conventions
Item	Convention	Example
React components	PascalCase	VideoPlayer.tsx
Hooks	camelCase, use prefix	useChunkedUpload.ts
Backend files	kebab-case with role suffix	auth.controller.ts, auth.service.ts
Functions/variables	camelCase	getVideoById
Constants	SCREAMING_SNAKE_CASE	MAX_UPLOAD_SIZE_MB
Database tables (Prisma models)	PascalCase singular	Video, Subscription
DB columns	camelCase (Prisma default)	createdAt, userId
API routes	kebab-case, plural nouns	/api/v1/videos, /api/v1/watch-history
Env vars	SCREAMING_SNAKE_CASE	DATABASE_URL, JWT_SECRET
Branches	type/short-description	feat/video-upload-chunking, fix/otp-retry-bug
3. Backend Standards (Node/Express + Prisma)
TypeScript required — no plain .js in server/src.
Every route input validated with zod before it reaches the controller (validateRequest middleware).
Every controller returns via the shared apiResponse util — never res.json({...}) ad hoc:
return apiResponse.success(res, { data: video });
return apiResponse.error(res, { code: 'VIDEO_NOT_FOUND', message: 'Video not found', status: 404 });
Errors are thrown as typed AppError instances from services, caught once in the global errorHandler middleware — controllers don't try/catch individually unless doing something special.
Prisma queries live only in services (or a thin repository layer if a service gets complex) — never in controllers.
Async route handlers always wrapped (e.g. express-async-handler or an equivalent wrapper) so unhandled rejections don't crash the process.
Long-running work (transcoding, bulk notifications) is never done inline in a request handler — enqueue a BullMQ job instead.
4. Frontend Standards (React + Tailwind + shadcn)
TypeScript required — .tsx/.ts only.
Functional components only, no class components.
Server state via TanStack Query — never store server data (catalog, user profile) in Zustand/Context; only UI-only state goes there.
Tailwind utility classes directly in JSX; avoid custom CSS files except globals.css for theme tokens. Use cn() (from lib/utils.ts) for conditional classes, not manual string concatenation.
shadcn components imported from components/ui/ and not edited in place — if a variant is needed, wrap it in components/shared/ rather than modifying the generated primitive, so future shadcn add updates don't conflict.
One component per file, default export matching the filename.
Co-locate a feature's components/hooks/types under features/<feature-name>/ — see file-structure.md.
No inline API calls inside components — always go through api/endpoints/*.ts + a TanStack Query hook.
5. Git & Commit Conventions
Conventional Commits format: type(scope): message
feat(auth): add OTP verification flow
fix(uploads): handle chunk retry on network drop
refactor(catalog): extract category filter logic to hook
docs(architecture): update video pipeline diagram
Types: feat, fix, refactor, docs, test, chore, perf.
One logical change per commit — agents should not bundle unrelated changes into a single commit even if generated in one pass.
PRs reference the relevant item in progress-tracker.md.
6. Testing Standards
Backend: unit tests for services (business logic, mockable Prisma client), integration tests for critical flows (auth, upload, payment webhook).
Frontend: component tests for complex interactive components (upload dropzone, player controls); skip trivial presentational components.
No PR merges a new service function without at least one accompanying test, except pure UI/presentational work.
7. Comments & Documentation
Comment why, not what — code should be self-explanatory for the "what."
Every new backend module gets a one-paragraph header comment describing its responsibility (mirrors its entry in architecture.md §3).
Public/exported functions with non-obvious behavior get a short JSDoc block.
8. Accessibility & i18n (frontend)
All interactive elements keyboard-navigable (shadcn primitives handle most of this by default — don't strip it out).
Text content should be run through the i18n layer (French/English) from the start — don't hardcode user-facing strings inline; pull from a translation dict even in MVP, even if only English is populated initially.
9. When an AI Agent Is Unsure
If a generation choice isn't covered here (e.g. a new library, a pattern not yet established), the agent should:
Default to the simplest option consistent with architecture.md.
Leave a short comment flagging the decision (// STANDARDS: no existing convention for X, chose Y because Z).
Add a one-line note to progress-tracker.md → "Open Questions" so a human can confirm or override it.