---
name: motion-graphics
description: >-
  Designs, scripts, builds, and audio-syncs programmatic motion graphics videos
  using Remotion (React + TypeScript). Supports product launches, SaaS explainers,
  developer demos, social reels (16:9, 9:16, 1:1), kinetic typography, data
  recaps, and UI storytelling across multiple visual directions. Use whenever the
  user asks to create a motion graphics video, animated explainer, Remotion reel,
  kinetic UI showcase, or video script + frame-synced rendering pipeline.
version: 1.0.0
author: "Asharuu"
---

# Motion Graphics (`motion-graphics`)

A general-purpose engineering skill for building **deterministic, frame-synced programmatic motion graphics** in **Remotion** (React + TypeScript). Instead of locking you into one aesthetic or narrative, it provides 5 distinct visual directions, 12 modular scene patterns, multi-format safe zones, spring physics presets, and Node.js CLI utilities for SFX synthesis and voiceover beat detection.

---

## Core Engineering Disciplines

1. **Visual Direction Lock**: Select one visual direction (`light-studio`, `dark-saas`, `editorial-paper`, `bold-brand`, or `clean-data`) during intake and enforce its palette, background texture, and typography pairing consistently across every scene.
2. **Structural Variety Rule**: Never place two consecutive scenes with the same spatial composition or pattern. Alternate splits, bento grids, centered typography, interactive UI simulators, and carousels.
3. **Deterministic Frame-Driven Motion**: Drive every animation exclusively from `useCurrentFrame()`, `spring()`, and `interpolate()`. Never use CSS `transition`, CSS keyframe rules, `requestAnimationFrame`, `setTimeout`, or `setInterval`.
4. **Typography & Tabular Stability**: Load trimmed Google Font weights/subsets cleanly and enforce `fontVariantNumeric: 'tabular-nums'` on all counters, timers, clocks, and percentages so digits never jitter horizontally.
5. **Safe-Zone Multi-Format Composition**: Respect platform overlays and bottom caption/navigation zones across `16:9` (`1920×1080`), `9:16` (`1080×1920`), and `1:1` (`1080×1080`).
6. **Frame-Synced Audio & SFX**: Align scene transitions, caption segments, and micro-interactions to measured voiceover pause timestamps, layered with low-gain procedural UI SFX.

---

## 6-Step Universal Production Workflow

### Step 1: Creative Intake & Format Lock
Define or confirm before scaffolding code:
- **Goal & Audience**: Product launch, SaaS onboarding, developer demo, pitch recap, editorial essay, or creator reel.
- **Format & Frame Rate**: `16:9` (`1920×1080`), `9:16` (`1080×1920`), or `1:1` (`1080×1080`), defaulting to `30 fps` (or `60 fps` for ultra-smooth UI capture).
- **Language & Tone**: Spoken persona, language, and pacing (`~2.5–3.2` words/sec conversational, `~2.0–2.4` technical).
- **Visual Direction**: Pick one preset from [`./references/visual-directions.md`](./references/visual-directions.md) tailored to the brand and subject matter.

### Step 2: Narrative Pacing & Scene Architecture
1. Draft the spoken or visual script using target pacing math (`durationSeconds ≈ wordCount / wordsPerSecond + pauseBuffer`).
2. Map each narrative beat to one of the **12 modular scene patterns** in [`./references/scene-patterns.md`](./references/scene-patterns.md) (varying spatial split between adjacent beats).
3. Define a single `SCENES` + `CAPTIONS` source of truth (`src/config/timeline.ts`) so durations, menu/status headers, and captions stay locked together.

### Step 3: Token Lock & Project Scaffolding
1. Initialize Remotion (`remotion`, `@remotion/cli`, `@remotion/media`, `@remotion/google-fonts`, `react`, `react-dom`, `typescript`).
2. Copy [`./examples/motion-tokens.ts`](./examples/motion-tokens.ts) into `src/theme.ts` and [`./examples/StageShell.tsx`](./examples/StageShell.tsx) into `src/components/StageShell.tsx`.
3. Load only required font weights and subsets (e.g., `subsets: ['latin']`, explicit `weights`) to prevent excessive font network requests during headless rendering.
4. Place local images and audio in `public/` and reference them strictly via Remotion's `<Img src={staticFile(...)} />` and `<Audio src={staticFile(...)} />`.

### Step 4: Deterministic Scene Implementation
Build each beat inside an isolated `<Sequence from={startFrame} durationInFrames={durationInFrames}>` component:
- Apply `spring()` presets and `interpolate()` formulas from [`./references/motion-physics-and-timing.md`](./references/motion-physics-and-timing.md).
- Keep transitions brisk (`10–14` frames) and trigger a subtle visual micro-event at least every `1.5s` (`45` frames) so screens feel alive.
- Use crisp SVG vectors (`shapeRendering="crispEdges"` when rendering pixel art) for UI chrome, icons, and optional companion characters.

### Step 5: Audio Synthesis, Voiceover Beat Sync & Mixing
Follow [`./references/audio-and-sync-pipeline.md`](./references/audio-and-sync-pipeline.md):
1. Generate clean studio UI SFX (`whoosh`, `pop`, `click`, `keystroke`, `error`, `success`, `swipe`) with zero external dependencies:
   ```bash
   node ./scripts/generate-sfx.mjs --out ./public/sfx
   ```
2. If using TTS or recorded voiceover (e.g., ElevenLabs), measure exact speech & pause boundaries first:
   ```bash
   node ./scripts/detect-audio-beats.mjs ./public/audio/voiceover.mp3 --fps 30
   ```
3. Align `SCENES` durations, internal beat frames, `CAPTIONS`, and `SFX_CUES` to the detected timestamps, mixing SFX (`0.14–0.26`) cleanly beneath VO (`1.0`).

### Step 6: Keyframe QA & Render Verification
1. Run `npx tsc --noEmit` to catch type or import issues early.
2. Render representative still frames across entry, midpoint, peak action, and outro with `npx remotion still`, then inspect every PNG visually for typography balance, contrast, and zero safe-zone collisions.
3. Render the final H.264 MP4 and verify video + audio streams with `ffprobe`:
   ```bash
   npx remotion render src/index.ts <CompositionId> out/output.mp4 --codec=h264 --crf=18
   ```

---

## Trigger Conditions

Activate this skill when the user asks (in English or Bahasa Indonesia) to:
- Build a programmatic motion graphics video, product teaser, or explainer in Remotion
- Design a kinetic UI showcase, developer demo reel, or data storytelling video
- Convert a script, prompt, or product brief into a multi-scene animated video + TTS/ElevenLabs script
- Sync Remotion scenes, kinetic captions, and sound effects to a recorded or generated voiceover

---

## References, Scripts & Starters

- **Visual Direction Presets & Safe Zones**: [`./references/visual-directions.md`](./references/visual-directions.md)
- **12 Domain-Agnostic Scene Patterns**: [`./references/scene-patterns.md`](./references/scene-patterns.md)
- **Motion Physics, Formulas & Character States**: [`./references/motion-physics-and-timing.md`](./references/motion-physics-and-timing.md)
- **Scripting, TTS & Beat-Sync Pipeline**: [`./references/audio-and-sync-pipeline.md`](./references/audio-and-sync-pipeline.md)
- **Procedural WAV SFX Generator**: [`./scripts/generate-sfx.mjs`](./scripts/generate-sfx.mjs)
- **Voiceover Pause & Frame-Boundary Detector**: [`./scripts/detect-audio-beats.mjs`](./scripts/detect-audio-beats.mjs)
- **Starter Design & Format Tokens**: [`./examples/motion-tokens.ts`](./examples/motion-tokens.ts)
- **Starter Multi-Preset Stage Shell**: [`./examples/StageShell.tsx`](./examples/StageShell.tsx)
