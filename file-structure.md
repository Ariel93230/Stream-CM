File Structure — StreamCM
This is the literal, authoritative folder/file layout. Any AI agent generating code should place files exactly according to this map. If a needed file/folder isn't listed here, add it in the same spirit and note the addition in progress-tracker.md.
Monorepo, two top-level apps: client/ and server/.
streamcm/
├── client/                                # React + Tailwind + shadcn frontend
│   ├── public/
│   │   └── favicon, static assets
│   ├── src/
│   │   ├── api/
│   │   │   ├── axiosClient.ts             # base axios instance, interceptors
│   │   │   └── endpoints/                 # one file per domain: auth.ts, catalog.ts, videos.ts, billing.ts
│   │   ├── assets/
│   │   │   ├── icons/
│   │   │   └── images/
│   │   ├── components/
│   │   │   ├── ui/                        # shadcn primitives (button.tsx, dialog.tsx, input.tsx, etc.)
│   │   │   └── shared/                    # navbar.tsx, footer.tsx, theme-toggle.tsx, video-card.tsx
│   │   ├── context/
│   │   │   ├── ThemeContext.tsx
│   │   │   └── AuthContext.tsx
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── components/            # LoginForm.tsx, SignupForm.tsx, OtpVerify.tsx
│   │   │   │   ├── hooks/                 # useLogin.ts, useAuth.ts
│   │   │   │   └── types.ts
│   │   │   ├── catalog/
│   │   │   │   ├── components/            # CatalogGrid.tsx, CategoryFilter.tsx, SearchBar.tsx
│   │   │   │   ├── hooks/                 # useCatalog.ts, useSearch.ts
│   │   │   │   └── types.ts
│   │   │   ├── player/
│   │   │   │   ├── components/            # VideoPlayer.tsx, QualitySelector.tsx, ResumePrompt.tsx
│   │   │   │   ├── hooks/                 # usePlaybackSession.ts
│   │   │   │   └── types.ts
│   │   │   ├── creator-studio/
│   │   │   │   ├── components/            # UploadDropzone.tsx, UploadProgress.tsx, VideoManageTable.tsx
│   │   │   │   ├── hooks/                 # useChunkedUpload.ts
│   │   │   │   └── types.ts
│   │   │   ├── billing/
│   │   │   │   ├── components/            # PlanCard.tsx, MomoCheckout.tsx, TransactionHistory.tsx
│   │   │   │   ├── hooks/                 # useSubscription.ts
│   │   │   │   └── types.ts
│   │   │   └── moderation/                # admin-only feature
│   │   │       ├── components/            # FlaggedQueue.tsx, ReviewModal.tsx
│   │   │       └── hooks/
│   │   ├── hooks/                         # cross-feature hooks: useDebounce.ts, useMediaQuery.ts
│   │   ├── layouts/
│   │   │   ├── MainLayout.tsx
│   │   │   ├── AuthLayout.tsx
│   │   │   └── CreatorLayout.tsx
│   │   ├── lib/
│   │   │   ├── queryClient.ts              # TanStack Query config
│   │   │   ├── utils.ts                    # cn() helper, formatters
│   │   │   └── constants.ts
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── WatchPage.tsx
│   │   │   ├── CategoryPage.tsx
│   │   │   ├── CreatorStudioPage.tsx
│   │   │   ├── BillingPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── SignupPage.tsx
│   │   │   └── AdminModerationPage.tsx
│   │   ├── routes/
│   │   │   ├── AppRouter.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── store/
│   │   │   ├── uiStore.ts                  # Zustand: modals, upload progress, theme state
│   │   │   └── authStore.ts
│   │   ├── styles/
│   │   │   └── globals.css                 # Tailwind base + CSS variable theme tokens
│   │   ├── types/
│   │   │   └── index.ts                    # shared global types
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── tailwind.config.ts
│   ├── components.json                     # shadcn config
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── package.json
│
├── server/                                 # Node/Express backend
│   ├── src/
│   │   ├── config/
│   │   │   ├── env.ts                      # validated env vars (zod)
│   │   │   ├── db.ts                       # Prisma client instance
│   │   │   ├── redis.ts
│   │   │   └── storage.ts                  # S3 client config
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.routes.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.validators.ts      # zod schemas
│   │   │   │   └── auth.view.ts            # response serializers
│   │   │   ├── users/
│   │   │   │   ├── users.routes.ts
│   │   │   │   ├── users.controller.ts
│   │   │   │   ├── users.service.ts
│   │   │   │   └── users.view.ts
│   │   │   ├── catalog/
│   │   │   │   ├── catalog.routes.ts
│   │   │   │   ├── catalog.controller.ts
│   │   │   │   ├── catalog.service.ts
│   │   │   │   └── catalog.view.ts
│   │   │   ├── uploads/
│   │   │   │   ├── uploads.routes.ts
│   │   │   │   ├── uploads.controller.ts
│   │   │   │   ├── uploads.service.ts
│   │   │   │   └── uploads.validators.ts
│   │   │   ├── playback/
│   │   │   │   ├── playback.routes.ts
│   │   │   │   ├── playback.controller.ts
│   │   │   │   └── playback.service.ts
│   │   │   ├── billing/
│   │   │   │   ├── billing.routes.ts
│   │   │   │   ├── billing.controller.ts
│   │   │   │   ├── billing.service.ts
│   │   │   │   └── flutterwave.client.ts
│   │   │   ├── notifications/
│   │   │   │   ├── notifications.service.ts
│   │   │   │   └── notifications.routes.ts
│   │   │   ├── moderation/
│   │   │   │   ├── moderation.routes.ts
│   │   │   │   ├── moderation.controller.ts
│   │   │   │   └── moderation.service.ts
│   │   │   └── analytics/
│   │   │       ├── analytics.routes.ts
│   │   │       └── analytics.service.ts
│   │   ├── middlewares/
│   │   │   ├── authGuard.ts
│   │   │   ├── roleGuard.ts
│   │   │   ├── validateRequest.ts
│   │   │   ├── rateLimiter.ts
│   │   │   └── errorHandler.ts
│   │   ├── queues/
│   │   │   ├── transcodeQueue.ts           # BullMQ queue definitions
│   │   │   └── notificationQueue.ts
│   │   ├── utils/
│   │   │   ├── logger.ts
│   │   │   ├── apiResponse.ts              # standard { data, meta, error } shape
│   │   │   └── jwt.ts
│   │   ├── app.ts                          # express app setup, middleware mounting
│   │   └── server.ts                       # entrypoint, listens on port
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.ts
│   ├── worker/
│   │   ├── transcodeWorker.ts              # FFmpeg job processor (separate process)
│   │   └── notificationWorker.ts
│   ├── tests/
│   │   ├── unit/
│   │   └── integration/
│   ├── .env.example
│   ├── tsconfig.json
│   └── package.json
│
├── docs/                                    # this set of context files lives here
│   ├── project-overview.md
│   ├── architecture.md
│   ├── file-structure.md
│   ├── code-standards.md
│   ├── ui-context.md
│   ├── workflows.md
│   └── progress-tracker.md
│
├── .github/
│   └── workflows/
│       └── ci.yml
├── docker-compose.yml                      # postgres, redis, server, worker for local dev
├── .gitignore
└── README.md
Rules for Agents Adding New Files
New backend domain → new folder under server/src/modules/, following the routes / controller / service / view (/ validators) pattern exactly.
New frontend feature → new folder under client/src/features/, with its own components/ and hooks/.
Never place business logic in routes/, controllers/, or React pages/ — those are thin by design (see architecture.md §3 and code-standards.md).
shadcn components always land in client/src/components/ui/ untouched by feature-specific logic — wrap them in components/shared/ if you need feature-aware behavior.
Any new file that doesn't cleanly map to this structure → flag it in progress-tracker.md under "Open Questions" before creating it.