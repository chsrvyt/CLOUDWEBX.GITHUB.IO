# CloudWeb Site — Session Log

**2026-08-16** · `cloudweb-site`

A running record of what changed in this session, in order, including a dead end that was built, reviewed, and then fully reverted.

---

## 1. Full visual/UX redesign

**Ask:** rebuild the marketing site in an "Awwwards-style, go all in — not minimal" direction, referencing krissrealestate.com, asmobius.co.jp, and dottodot.es, with a white/orange light theme and a black/orange dark theme.

**Research:** live-browsed all three reference sites via browser automation rather than guessing at their style from memory — confirmed the shared vocabulary (crosshair/coordinate markers, oversized outline type, connect-the-dots networks, two-part cursors, percentage preloaders) before writing any code.

**Built:**
- Full light/dark theme system in `globals.css` — token-driven, following system preference by default with a manual override (`use-theme.ts`, `theme-toggle.tsx`), no-flash inline script in `layout.tsx`.
- Display font pairing (Bricolage Grotesque for headlines, Geist Mono for structural labels), grain texture overlay, `.cw-outline-text` stroke-only headline treatment, crosshair tick-mark utility.
- `CloudField` (the canvas dot-network background) pushed significantly denser/bolder.
- `CustomCursor` rebuilt as a two-part dot + lagging-ring cursor with a `VIEW`/`OPEN` label.
- `LoadingScreen` rebuilt: self-drawing node network behind a live percentage counter.
- GSAP `ScrollTrigger` wired through the existing Lenis smooth-scroll bridge (previously unused beyond driving Lenis's raf loop) — added a scroll-scrubbed horizontal band of huge outline capability titles above the capabilities list.
- Magnetic hover (`components/shared/magnetic.tsx`) on nav links and CTAs.
- A visual pass across every section: Hero, Navbar, Capabilities, all 7 `SystemSection` instances, Work, Approach, Philosophy, About, Contact, Footer.
- Small correctness fixes found along the way: reconciled a pillar-list wording mismatch between About and Footer into one shared constant; wired two previously-unused data constants (`SECURITY_PRINCIPLES`, `INFRASTRUCTURE_NODES`) into their diagrams instead of leaving them dead and duplicating labels locally.

**Verification:** `npm run lint` / `npx tsc --noEmit` / `npm run build` all clean; checked live in the browser in both themes, reduced-motion, and touch-simulated viewport. Caught and fixed one real bug mid-build: a `.cw-scanlines` CSS rule was setting `position: relative`, which silently overrode `fixed` positioning on the loading screen due to cascade order.

## 2. Locomotive.ca-inspired additions

**Ask:** after seeing lisa.locomotive.ca, add what's realistically portable from it — the literal 3D character was flagged upfront as requiring real 3D assets, which came later (see §3).

**Built:**
- `ScrambleText` / `ScrambleOnView` (`lib/animations/scramble-text.tsx`) — a decode-in text effect, characters resolving left to right, unresolved ones re-rolling every frame. Wired into the loading screen's wordmark/tagline (cycling through several phrases before settling) and every `SystemSection` eyebrow (triggers once on scroll-into-view).
- CRT scanline texture (`.cw-scanlines`) and a chromatic-aberration glitch keyframe (`.cw-glitch`), both scoped to the loading screen only, not applied globally.

## 3. 3D desk scene — built, then reverted

**Ask:** replace the entire homepage with a fixed-viewport (no page-scroll) 3D scene — a human and a robot at a desk, reacting to the cursor, with clickable icons in the scene replacing normal site navigation. Later, the user supplied two real model files directly (`sci-fi_humanoid_robot.glb`, a 122MB Sketchfab export with no rig/animations; `Char.glb`, a 37MB Blender export with a full 65-joint Mixamo-standard rig).

**Researched and flagged before building:** Ready Player Me avatars are CC BY-NC-SA (non-commercial only, disqualified for a company site); true photorealistic rigged characters have no clean free/no-login source. This shaped an explicit plan (written to `.claude/plans/`) before touching code.

**Built:**
- An asset-compression pipeline: `@gltf-transform/cli` for geometry (Draco compression, dedup/weld/prune), plus a custom Node script (`sharp` used directly) working around a `gltf-transform`↔`sharp`/libvips version-mismatch bug that made the CLI's own texture-compress step throw on otherwise-ordinary 4K sRGB PNGs. Result: robot 122MB → 2.99MB, human 37MB → 2.26MB (a ~97% and ~94% reduction respectively).
- `AICore`-style whole-object cursor-tilt for the unrigged robot; real `mixamorig:Head`/`mixamorig:Neck` bone rotation plus a procedural idle-breathing sway for the rigged human (no baked animation clip existed to lean on).
- A full routing split: `/work`, `/capabilities`, `/approach`, `/about`, `/contact` as real routes (each just re-wrapping the already-built section components), `page.tsx` reduced to the 3D scene only, `Navbar` hidden on the home route via `usePathname`, a `HomeFallback` component for touch/reduced-motion/WebGL-failure.
- A procedural desk/monitor/chair environment (deliberately not an imported stylized asset pack — once the two characters turned out to be genuinely detailed/realistic rather than the originally-planned CC0 stylized pair, a cartoonish furniture pack would have clashed).
- `SceneHotspots` — real DOM buttons (via `@react-three/drei`'s `<Html>`) anchored over the monitor, routing on click.

**Reviewed live, then reverted in full:** on inspection the scene had real problems — lighting far too dark, camera not aimed at the scene (no `lookAt`, since fixed after the first screenshot but by then more issues were visible), the human figure oddly proportioned/textured relative to the robot, and an unexplained floating geometry artifact. The user said to stop and undo. Because `cloudweb-site` turned out **not to be tracked by git** (the tracked repo root is one directory up, and the whole `cloudweb-site` folder was untracked), there was no commit to fall back to — the revert was done manually, file by file, from what was in the session's own context:
- Deleted every new file/folder from this attempt (`three/robot-figure.tsx`, `human-figure.tsx`, `office-props.tsx`, `scene-hotspots.tsx`, `desk-scene.tsx`, `components/home/`, `lib/three/`, `app/{work,capabilities,approach,about,contact}/`, the compression scripts, `public/models/`).
- Restored `hero.tsx` and `ai-core.tsx` (deleted mid-attempt) verbatim.
- Reverted `page.tsx`, `navbar.tsx`, `footer.tsx`, `nav.ts`, `eslint.config.mjs` to their pre-attempt content.
- Uninstalled `@react-three/drei`, `@gltf-transform/core`, `@gltf-transform/extensions`, `@gltf-transform/functions`, `sharp` — kept `three`/`@react-three/fiber` since the earlier `AICore` hero (§1) still depends on them.
- Left the two user-provided source `.glb` files in the project root untouched (not mine to delete).

**Verified the revert:** cleared the stale `.next` type cache (it still referenced the deleted routes), then a clean `tsc --noEmit` / `lint` / `build`, confirmed live in the browser that the site matched its pre-attempt state exactly.

## 4. UI/UX documentation

Wrote a detailed reference covering color tokens, typography, the motion-primitive system, cursor/interaction conventions, every component, page structure, accessibility, and the responsive/performance degradation strategy — as both a published interactive artifact (styled with the site's own token system, including a live scramble-text demo and a working theme toggle) and `docs/UI-UX.md` in the repo for anyone working in the codebase.

---

## Net effect on the repo

Current state = §1 + §2, permanently. §3 shipped and was fully reverted — mentioned here for the record, not present in the working tree. §4 added `docs/UI-UX.md` and this file.
