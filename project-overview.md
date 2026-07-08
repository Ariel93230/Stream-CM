# Project Overview — StreamCM

## What This Is
StreamCM is a video streaming and creator platform built for the Cameroonian market. It combines two content models in one app:

1. **Licensed/curated streaming** (movies, series) — Netflix-style.
2. **Creator-uploaded videos** — YouTube/Twitch-style, open to any registered creator.

This doc is the entry point for any AI coding agent (opencode, GitHub Copilot, Codex) or human contributor joining this repo. Read this first, then `architecture.md`, then `file-structure.md` before writing code.

## Companion Docs (read in this order)
| Doc | Purpose |
|---|---|
| `project-overview.md` | This file — vision, scope, stack summary |
| `architecture.md` | System design, service boundaries, data flow |
| `file-structure.md` | Literal folder/file layout to follow |
| `code-standards.md` | Naming, style, commit, and PR conventions |
| `ui-context.md` | Design system, theming, component rules |
| `workflows.md` | Dev workflow, branching, how AI agents should operate in this repo |
| `progress-tracker.md` | Live checklist of what's built vs. pending |

**Rule for all agents:** if a doc conflicts with what you're about to generate, the doc wins. If a doc is ambiguous or missing something you need, add a note to `progress-tracker.md` under "Open Questions" rather than guessing silently.

## Target Users
- **Viewers**: mobile-first, mostly on Android, data-conscious, MTN/Orange Mobile Money users, bilingual (French/English).
- **Creators**: independent video creators, students, small media producers uploading original content.
- **Admins/Moderators**: internal team managing catalog, licensing, and content moderation.

## Core Features (MVP scope)
- Auth (email + phone/OTP), role-based access (`viewer`, `creator`, `admin`, `moderator`)
- Browsable content catalog (categories, search)
- Video upload (creators) with resumable/chunked upload
- Transcoding to adaptive-bitrate renditions (HLS)
- Video playback with adaptive streaming
- Subscription + pay-per-view via MTN MoMo / Orange Money (via Flutterwave aggregator)
- Basic recommendations (trending, most-watched)
- Content moderation queue for creator uploads
- Light/dark theme toggle, navy blue primary brand color

## Tech Stack
| Layer | Choice |
|---|---|
| Frontend | React (Vite), Tailwind CSS, shadcn/ui |
| Backend | Node.js + Express.js |
| ORM | Prisma |
| Database | PostgreSQL |
| Cache / Queue broker | Redis |
| Job queue | BullMQ (video transcoding, notifications) |
| Object storage | S3-compatible (AWS S3 or Backblaze B2) |
| Video processing | FFmpeg workers |
| Search | PostgreSQL full-text search (MVP) → Elasticsearch/OpenSearch (later phase) |
| Payments | Flutterwave (wraps MTN MoMo, Orange Money, cards) |
| Auth | JWT (access + refresh tokens) |
| Repo structure | Monorepo: `/client` + `/server` |

## Non-Goals (for now)
- No 4K streaming (cost vs. demand doesn't justify it yet)
- No native iOS/Smart TV app in MVP — web-first, mobile-responsive
- No custom-built DRM in MVP — token-authenticated signed URLs are sufficient until licensed studio content requires DRM
- No microservices split on day one — build as a well-separated modular backend first (see `architecture.md` §9)

## Phased Rollout
1. **Phase 1 (MVP)**: Auth, catalog, single-bitrate playback, creator upload, MoMo payment
2. **Phase 2**: Adaptive bitrate (HLS), notifications, moderation queue, offline-friendly caching
3. **Phase 3**: Recommendations, analytics dashboard, CDN/edge optimization
4. **Phase 4**: DRM for licensed content, regional expansion beyond Cameroon

Track live status of each phase in `progress-tracker.md`.