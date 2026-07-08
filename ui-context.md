# UI Context — StreamCM

Authoritative design-system reference for anything visual. Frontend built with **React + Tailwind CSS + shadcn/ui**. Any AI agent generating UI should pull colors, spacing, and component choices from here rather than inventing new ones.

---

## 1. Brand Direction

- **Primary color**: Navy Blue — conveys trust and a premium/cinematic feel, distinct from the red/black palettes of Netflix/YouTube.
- **Personality**: modern, clean, slightly premium (streaming should feel cinematic even on a budget Android phone), calm rather than loud.
- Both **light and dark themes** are first-class — not dark-mode-as-afterthought. Many users will default to dark (battery/data-friendly perception, evening viewing habit), but light mode must be equally polished.

---

## 2. Color Tokens

Implemented as CSS variables in `client/src/styles/globals.css`, consumed via Tailwind's `dark:` variant and shadcn's theming convention (HSL-based CSS vars, matching shadcn's default token structure so `components/ui/*` need zero modification).

```css
/* globals.css */
:root {
  /* Light theme */
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;

  --primary: 222 72% 25%;        /* Navy Blue */
  --primary-foreground: 210 40% 98%;

  --secondary: 210 40% 96%;
  --secondary-foreground: 222 47% 11%;

  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;

  --accent: 210 40% 94%;
  --accent-foreground: 222 47% 11%;

  --destructive: 0 72% 51%;
  --destructive-foreground: 210 40% 98%;

  --border: 214 32% 91%;
  --input: 214 32% 91%;
  --ring: 222 72% 25%;

  --radius: 0.625rem;
}

.dark {
  --background: 222 47% 7%;
  --foreground: 210 40% 98%;

  --primary: 217 70% 55%;        /* Lighter navy/blue, keeps contrast in dark mode */
  --primary-foreground: 222 47% 7%;

  --secondary: 222 40% 14%;
  --secondary-foreground: 210 40% 98%;

  --muted: 222 40% 14%;
  --muted-foreground: 215 20% 65%;

  --accent: 222 40% 16%;
  --accent-foreground: 210 40% 98%;

  --destructive: 0 63% 45%;
  --destructive-foreground: 210 40% 98%;

  --border: 222 30% 18%;
  --input: 222 30% 18%;
  --ring: 217 70% 55%;
}
```

**Note on navy in dark mode**: pure dark navy (`222 72% 25%`) loses contrast against a near-black background, so the dark theme uses a lifted, slightly more saturated blue (`217 70% 55%`) for `--primary` to keep buttons/links/active states legible. Same brand hue family, tuned for contrast — not a different brand color.

### Semantic usage
| Token | Use for |
|---|---|
| `primary` | Primary buttons, active nav state, links, brand accents, play button |
| `secondary` | Secondary buttons, subtle surfaces |
| `muted` | Placeholder text, disabled states, dividers |
| `accent` | Hover states, subtle highlights |
| `destructive` | Delete/cancel actions, error states |
| `border` / `input` | All borders and form field outlines |
| `ring` | Focus rings (accessibility-critical — never remove) |

---

## 3. Typography

- Font: **Inter** (or a similar geometric sans) for UI text — clean at small sizes, renders well on low-DPI budget Android screens.
- Headings: semibold/bold, tight tracking.
- Body: regular weight, `text-sm`/`text-base` — avoid tiny text; assume users on smaller/lower-res screens.

| Use | Tailwind class |
|---|---|
| Page title | `text-2xl font-semibold tracking-tight` |
| Section heading | `text-lg font-semibold` |
| Body text | `text-sm text-foreground` |
| Muted/secondary text | `text-sm text-muted-foreground` |
| Caption/meta | `text-xs text-muted-foreground` |

---

## 4. Theme Toggling — Implementation Pattern

- `ThemeContext` (in `client/src/context/ThemeContext.tsx`) manages `'light' | 'dark' | 'system'`, persists choice in `localStorage`, applies/removes the `.dark` class on `<html>`.
- Default: `system` (respect OS preference) on first visit; explicit user choice always overrides afterward.
- `ThemeToggle` component (`components/shared/theme-toggle.tsx`) lives in the navbar — a simple sun/moon icon toggle (or three-way switch if `system` option is surfaced in UI).
- **No component should hardcode colors** (`bg-blue-900`, `text-black`, etc.) — always use semantic Tailwind classes tied to the CSS variables (`bg-primary`, `text-foreground`, `bg-background`). This is what makes the whole app theme-switch cleanly with zero per-component dark-mode logic.

```tsx
// Correct
<div className="bg-background text-foreground border-border">

// Incorrect — never do this
<div className="bg-white text-black border-gray-200">
```

---

## 5. Component Patterns (shadcn)

- Install shadcn components as needed via the CLI; they land in `components/ui/` untouched.
- Never edit generated primitives directly for one-off styling — wrap instead:
  ```tsx
  // components/shared/PrimaryButton.tsx
  import { Button } from "@/components/ui/button";
  export function PrimaryButton(props: React.ComponentProps<typeof Button>) {
    return <Button className="font-semibold" {...props} />;
  }
  ```
- Cards for video thumbnails, plan cards, etc. use `components/ui/card.tsx` as the base, composed in `components/shared/video-card.tsx`.
- Modals/dialogs (upload progress, plan selection, OTP entry) use `components/ui/dialog.tsx`.
- Forms use `components/ui/form.tsx` + `react-hook-form` + `zod` resolver — consistent validation pattern across auth, billing, and creator-studio forms.

---

## 6. Layout & Spacing

- Base spacing scale: Tailwind default (4px increments) — don't introduce a custom spacing scale.
- Container max-width: `max-w-7xl mx-auto px-4 md:px-6` for standard pages.
- Video grids: responsive grid, `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4`.
- Mobile-first: design and test at 360–390px width first (common Android viewport in this market), then scale up.

---

## 7. Motion

- Keep animations minimal and fast (150–200ms) — avoid heavy motion that taxes low-end devices/battery.
- Use Tailwind's built-in transition utilities; avoid adding a heavy animation library unless a specific feature (e.g. upload progress) genuinely needs it.

---

## 8. Iconography

- **lucide-react** (already a common shadcn companion) for all icons — consistent stroke width and style, avoid mixing icon sets.

---

## 9. Checklist for Any New UI Component
- [ ] Uses semantic color tokens only (no hardcoded hex/Tailwind color-scale classes)
- [ ] Works in both light and dark theme without special-casing
- [ ] Keyboard accessible, visible focus ring (`ring` token)
- [ ] Text pulled from i18n dictionary, not hardcoded (see `code-standards.md` §8)
- [ ] Tested at mobile width (360px) first