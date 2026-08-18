# CloudWeb — UI/UX Design Documentation

A working reference for how the CloudWeb site is built to look and behave: the color and type tokens, the motion primitives shared across every section, and the interaction conventions (cursor, focus, reduced motion, touch) that keep it consistent from the hero to the footer.

This documents the system **as built**, not a redesign proposal.

## Contents

1. [Foundations](#1-foundations)
2. [Color](#2-color)
3. [Typography](#3-typography)
4. [Layout & grid](#4-layout--grid)
5. [Motion system](#5-motion-system)
6. [Cursor & interaction](#6-cursor--interaction)
7. [Components](#7-components)
8. [Page structure](#8-page-structure)
9. [Accessibility](#9-accessibility)
10. [Responsive & performance strategy](#10-responsive--performance-strategy)

---

## 1. Foundations

CloudWeb is an AI / software / cybersecurity / infrastructure company, and the site reads that way on purpose: editorial and technical rather than soft or playful, one accent color used with restraint, and a visual language of nodes and connections that runs from the logotype down to the ambient canvas backgrounds.

The direction draws on a specific set of references, adapted into an original system rather than copied wholesale:

- **krissrealestate.com** — crosshair/coordinate-marker technical feel
- **dottodot.es** — the literal connect-the-dots network motif and oversized outline type
- **asmobius.co.jp** — restrained hairline chrome
- **lisa.locomotive.ca** — the scramble-decode text reveal

Three commitments hold the system together end to end:

- **Every color is a token, not a literal** — the whole site can re-theme from one file (`globals.css`).
- **Every animation has a reduced-motion fallback**, not a shortened version of itself.
- **Every heavier interaction has a lighter equivalent** for touch/low-end devices — WebGL → 2D canvas, custom cursor → native pointer, dense field → sparse field — decided once per primitive and reused everywhere.

---

## 2. Color

Nine CSS custom properties, defined once in `globals.css` and consumed everywhere through Tailwind v4's `@theme inline` mapping — components never reference a hex value directly.

Light is the base palette (bare `:root`); dark applies via `prefers-color-scheme` **and** an explicit `[data-theme]` override, so a manual toggle always beats the OS setting in either direction.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--cw-bg` | `#ffffff` | `#0a0806` | Page background |
| `--cw-bg-secondary` | `#f7f4f0` | `#100d0a` | Alternating section tone (even-numbered system sections) |
| `--cw-surface` | `#f1ece5` | `#1f1b17` | Cards, hover states, diagram panels |
| `--cw-text` | `#14110d` | `#f5f5f4` | Primary text, headlines |
| `--cw-text-secondary` | `#6b6459` | `#a8a29e` | Body copy, captions, mono labels |
| `--cw-border` | `oklch(0 0 0 / 10%)` | `oklch(1 0 0 / 10%)` | Hairline dividers |
| `--cw-border-strong` | `oklch(0 0 0 / 24%)` | `oklch(1 0 0 / 22%)` | Buttons, input underlines, focus-adjacent chrome |
| `--cw-accent-text` | `#c2410c` | `#fb923c` | `text-accent` / `border-accent` / `bg-accent` — contrast-tuned per theme |
| `--cw-accent` (bright) | `#fb923c` | `#fb923c` | Decorative fills only — canvas, SVG, logo mark. Constant across themes |

**Why two accents.** `--cw-accent` is the one true brand orange, constant across both themes, used only for decorative fills (canvas particles, SVG diagram strokes, the logo's convergence point). `--cw-accent-text` is the same hue re-tuned per theme for AA text contrast: `#c2410c` on white (~4.9:1), the brighter `#fb923c` on near-black (already high-contrast there). Every Tailwind `text-accent` / `border-accent` / `bg-accent` class resolves to the contrast-safe token, so components never had to choose between the two manually.

**Border weight.** Borders are pure alpha-over-background (`oklch(... / 10%)`) rather than a fixed gray, so a hairline reads correctly against any of the three background tones (`bg`, `bg-secondary`, `surface`) without a second set of border tokens.

---

## 3. Typography

Three families, three jobs:

| Family | Role |
|---|---|
| **Geist Sans** | Body copy and UI labels |
| **Geist Mono** | Structural micro-copy — eyebrows, index numbers, nav links, captions — always uppercase, always letter-spaced. This is what gives the site its "technical readout" texture. |
| **Bricolage Grotesque** | Display face for every large headline, set bold and tight |

### Scale

| Role | Size |
|---|---|
| Hero headline | `clamp(3.5rem, 10vw, 10.5rem)` |
| Section headline | `clamp(2.25rem, 5vw, 4.25rem)` |
| Sub headline | `clamp(2rem, 4.5vw, 3.5rem)` |
| Body large | `1.125rem` |
| Body | `0.875rem`–`0.9375rem` |
| Mono label | `11px`, `500` weight, `0.2em`–`0.3em` tracking |

### Headline treatments

- **Line reveal** — every large headline uses `RevealLines`: each line masked and slid up on scroll-into-view, staggered 0.08s apart, once only.
- **Outline / stroke** — `.cw-outline-text`: transparent fill, 1.5px stroke, so the background (often a canvas field) shows through the letterforms. Used for one line of a two-line headline, never the whole block.
- **Scramble decode** — eyebrows and the loading screen resolve from random characters into real text over roughly 20–70 frames depending on string length.

---

## 4. Layout & grid

A 4/8/12-column responsive grid (`.cw-grid`), breaking at 768px and 1024px, inside a container capped at `min(1600px, 100% - 4rem)` so the site never runs edge-to-edge on very wide monitors but still gets full-bleed canvas backgrounds behind it. Gutter is fluid: `clamp(1rem, 2vw, 1.5rem)`.

At desktop width (12 columns), most sections split content 5/7 or 6/6, alternating which side leads via a `reverse` prop rather than hand-placing every section.

---

## 5. Motion system

A small set of shared primitives, reused by every section rather than one-off animations per component. Framer Motion handles entrance/hover choreography; GSAP + ScrollTrigger (bridged through Lenis's smooth-scroll event) drives the one scroll-scrubbed moment; native Canvas 2D and WebGL cover the two generative backgrounds. One easing curve, `cubic-bezier(0.16, 1, 0.3, 1)`, is used almost everywhere motion needs to settle.

| Primitive | File | Behavior |
|---|---|---|
| `Reveal` | `lib/animations/reveal.tsx` | Fade + 24px rise on scroll-into-view, once, used for paragraphs and secondary copy |
| `RevealLines` | `lib/animations/reveal.tsx` | Per-line masked slide-up for headlines; a line can carry its own class (e.g. the outline treatment) instead of a uniform style |
| `ScrambleText` / `ScrambleOnView` | `lib/animations/scramble-text.tsx` | Decode-in effect — characters resolve left to right, unresolved ones re-roll each frame. `OnView` variant triggers once via `framer-motion`'s `useInView` |
| `Magnetic` | `components/shared/magnetic.tsx` | Nav links/buttons nudge toward the cursor within their own bounds on pointer move; a no-op on touch and under reduced motion |
| `CloudField` | `components/cloud-field/cloud-field.tsx` | Canvas 2D node network, 8 named variants (density/speed/connect-distance tuned per section), pointer-repels nodes, pauses via IntersectionObserver when off-screen |
| `AICore` | `components/three/ai-core.tsx` | WebGL hero centerpiece — two counter-rotating wireframe icosahedron shells with glowing points, tilts toward the cursor. Desktop-only; touch devices get `CloudField` instead |
| Grain overlay | `globals.css` | Fixed, full-viewport inline-SVG turbulence filter at 5% opacity, `mix-blend-mode: overlay` — the one effect applied globally rather than per-component |

**Reduced motion** is handled at two levels: a global CSS rule collapses every `animation-duration`/`transition-duration` to near-zero, and each generative primitive (`CloudField`, `AICore`, the loading screen's percentage counter, the scroll-scrub band) separately checks `useReducedMotion()` to skip its own rAF/GSAP loop entirely — not just play faster, since a paused generative background is cheaper and calmer than a sped-up one.

---

## 6. Cursor & interaction

A two-part custom cursor replaces the system pointer on fine-pointer devices only: a small dot tracks the pointer directly (fast spring), a larger ring lags behind (slower spring) and expands into a label — `VIEW`, `OPEN` — when hovering anything tagged `data-cursor`. The label is opt-in per element, never inferred from a generic hover heuristic, so it's always intentional.

| Convention | Meaning |
|---|---|
| `.cw-focus-ring` | 1px accent outline, 4px offset, applied to every interactive element — independent of the custom cursor, so keyboard navigation is never degraded by it |
| `data-cursor="view"` | Marks an element as navigable/inspectable — nav links, capability rows, work items |
| `data-cursor="open"` | Marks an element that opens/submits something — primary CTAs, the contact form's submit button |

---

## 7. Components

Organized by where they sit in the page, not alphabetically — most of the "systems" content (AI, LLM, Agents, Security, Software, Infrastructure, Automation) shares one shell component and differs only by props and data.

### Chrome

| Component | File | Behavior |
|---|---|---|
| **Navbar** | `components/navigation/navbar.tsx` | Fixed header, blurs and gains a border past 40px scroll. Desktop nav is a straight list; mobile opens a full-screen menu with staggered link reveals |
| **ThemeToggle** | `components/theme/theme-toggle.tsx` | Binary light/dark switch with a cross-fading sun/moon icon; writes the explicit preference to `localStorage` and the `data-theme` attribute |
| **CustomCursor** | `components/cursor/custom-cursor.tsx` | The two-part dot/ring described above; unmounted entirely on touch devices |
| **LoadingScreen** | `components/loading/loading-screen.tsx` | First-paint overlay: wordmark and tagline scramble-decode in, a percentage counter runs over ~1.5s on a self-drawing `CloudField`, with CRT scanlines and a rare chromatic-aberration glitch on the number |
| **Footer** | `components/footer/footer.tsx` | Logo + pillars, nav links, contact email, status line ("Systems online") and the theme toggle mirrored a second time |

### Page sections

| Component | Behavior |
|---|---|
| **Hero** | Full-viewport intro: scramble eyebrow, two-line outline headline, `AICore`/`CloudField` background, magnetic CTAs, a "scroll & explore" pill |
| **Introduction** | Short two-column statement bridging the hero into the capabilities list |
| **CapabilitiesList** | Hover-synced row list (title/description/index) with a sticky preview panel that swaps its `CloudField` variant per hovered row; a scroll-scrubbed horizontal band of oversized outline titles sits above it as a second, purely visual way into the same anchors |
| **SystemSection** | Shared shell instantiated seven times (AI, LLM, Agents, Security, Software, Infrastructure, Automation) — alternating layout via a `reverse` prop, alternating background tone by parity of its own eyebrow number, a faint giant numeral watermark per section |
| **FlowDiagram / LayerStack** | Step-sequence and layer-stack visualizations feeding several system sections, driven entirely by data (no hardcoded copy in the component) |
| **SecurityDiagram / InfrastructureTopology** | Bespoke inline-SVG topology diagrams (request path; system→node→data), with animated particles tracing the "allowed" vs "anomalous" paths |
| **WorkList** | Accordion of explicitly-labeled *conceptual* projects — expands in place rather than linking to case-study pages that don't exist, honesty over a dead link |
| **ApproachTimeline / Philosophy** | Numbered process steps and a short statement of design principles, both index/label pairs typeset in mono |
| **About** | Statement + four-pillar list (AI / Software / Security / Infrastructure), shared verbatim with the footer's pillar list |
| **ContactSection** | Underline-style form over a dense `CloudField` "converge" background; submits locally (no backend wired yet) and swaps to a confirmation message rather than pretending to send anywhere real |

---

## 8. Page structure

One continuously scrolling page, stacked top to bottom in a fixed order, navigated by anchor links routed through Lenis smooth-scroll (`SmoothLink`) instead of the browser's instant hash jump — falls back to a normal link/native jump automatically when Lenis isn't active (reduced motion, or before the provider mounts).

| # | Section |
|---|---|
| 01 | Hero — full-viewport intro, WebGL/canvas background |
| 02 | Introduction — short bridging statement |
| 03 | Capabilities — hover list + scroll-scrubbed word band |
| 04–10 | System sections × 7 — AI, LLM, Agents, Security, Software, Infrastructure, Automation |
| 11 | Work — conceptual project accordion |
| 12 | Approach — process timeline |
| 13 | Philosophy — principles statement |
| 14 | About — statement + pillars |
| 15 | Contact — form |
| 16 | Footer |

---

## 9. Accessibility

- **Keyboard** — every interactive element carries `cw-focus-ring` independent of the decorative custom cursor; the mobile menu traps scroll but not focus order changes.
- **Reduced motion** — checked in every generative component individually, not just at the CSS level; rAF/GSAP loops stop running entirely rather than continuing off-screen.
- **Color contrast** — the accent token itself shifts per theme (see [Color](#2-color)) specifically so `text-accent` stays AA-legible on both a white and a near-black ground, rather than one theme being an afterthought.
- **Content honesty** — Work items are labeled "conceptual" rather than presented as real case studies; the contact email is a visible placeholder pending a real one, not silently faked.

---

## 10. Responsive & performance strategy

Every heavy interaction has a named, deliberate degradation path rather than "hope it still runs":

| Condition | Full behavior | Fallback |
|---|---|---|
| Touch device | `AICore` WebGL scene in the hero | `CloudField` 2D canvas, same slot |
| Touch device | Custom two-part cursor | Unmounted; native pointer |
| Touch device | Full-density `CloudField` node count | ~55% node count |
| WebGL unavailable | `AICore` | `WebglBoundary` catches the render error, renders nothing (the 2D field beneath still shows) |
| `prefers-reduced-motion` | Loading screen timer + percentage | Skipped outright — instant render, not a shortened animation |
| `prefers-reduced-motion` | Lenis smooth scroll | Provider skipped entirely; native scroll |
