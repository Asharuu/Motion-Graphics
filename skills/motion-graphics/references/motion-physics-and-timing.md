# Motion Physics, Timing & Deterministic Formulas

Every motion in Remotion **must** derive purely from `useCurrentFrame()` and `fps`. Never use CSS transitions, CSS `@keyframes`, `requestAnimationFrame`, `setTimeout`, or `setInterval`, as headless frame-by-frame rendering breaks non-deterministic timers.

---

## 1. Spring Physics Presets (`fps = 30`)

Centralize spring configs in `src/theme.ts` so every element feels like it inhabits the same physical world:

| Preset Name | `damping` | `stiffness` | `mass` | Physical Character & Use Case |
| :--- | :--- | :--- | :--- | :--- |
| `snappyUI` | `18` | `240` | `0.8` | Windows, notification cards, chat bubbles, tab pills, headline reveals |
| `bouncyPop` | `11` | `260` | `0.75` | Badges, icons, character/avatar pops, confirmation checkmarks |
| `gentleSlide` | `24` | `140` | `1.0` | Large IDE panels, coverflow glides, mobile device frames, Polaroid settle |
| `overshootPunch` | `9` | `180` | `1.1` | Expressive comedic/dramatic overshoot (e.g., gauge peaking past `100%` before settling) |
| `microTap` | `15` | `300` | `0.6` | Fast cursor clicks, Dock magnification, button press recoil |

---

## 2. Rhythm, Pacing & Transition Rules

- **1.5-Second Alive Threshold**: Never leave a frame visually static for more than `~45 frames` (`1.5s`). Introduce subtle background drift, a blinking caret, ticking numbers, playhead scrubbing, or card staggers.
- **Stagger Intervals**:
  - Rapid typographic phrases / small badges: `5–8 frames`
  - Cards / notifications / bento items: `12–18 frames`
  - Sequential narrative reveals synchronized to VO: align to speech beat timestamps
- **Scene Boundaries (`10–12 frames`)**:
  - Fade incoming opacity `[0, 10] -> [0, 1]` and outgoing opacity `[duration - 12, duration] -> [1, 0]` inside each scene using clamped `interpolate()`.
  - Keep `TOTAL_DURATION_FRAMES` equal to the sum of `SCENES[].durationInFrames` with zero gaps or overlaps unless intentionally cross-fading.

---

## 3. Deterministic Animation Recipes

### A. Typewriter + Blinking Caret
```ts
const charsVisible = Math.floor(
  interpolate(frame, [startFrame, startFrame + duration], [0, fullText.length], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }),
);
const typed = fullText.slice(0, charsVisible);
const caretOn = frame >= startFrame && Math.floor(frame / 10) % 2 === 0;
```

### B. Ease-Out Numeric Counter (`tabular-nums`)
```ts
const t = interpolate(frame, [startFrame, startFrame + 48], [0, 1], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
  easing: (x) => 1 - Math.pow(1 - x, 3),
});
const value = Math.round(startVal + (endVal - startVal) * t);
```

### C. Live Ticking Timer (`HH:MM:SS`)
```ts
const remaining = Math.max(0, initialSeconds - Math.floor(frame / ticksPerSecond));
const hh = String(Math.floor(remaining / 3600)).padStart(2, '0');
const mm = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
const ss = String(remaining % 60).padStart(2, '0');
```

### D. Strikethrough Draw (`scaleX: 0 -> 1`)
Render a `3px–4px` bar vertically centered (`top: '54%'`) over the phrase with `transformOrigin: 'left center'` and `transform: scaleX(${springVal})`, shifting the underlying text color to muted slate once `springVal > 0.4`.

### E. 3D Coverflow Perspective
Given continuous `activeIndex` interpolated across hold plateaus:
```ts
const offset = index - activeIndex;
const translateX = offset * cardSpacingPx;
const scale = interpolate(Math.abs(offset), [0, 1, 2], [1, 0.84, 0.70], {
  extrapolateRight: 'clamp',
});
const rotateY = interpolate(offset, [-1.5, 0, 1.5], [16, 0, -16], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});
const opacity = interpolate(Math.abs(offset), [0, 1, 2], [1, 0.62, 0.20], {
  extrapolateRight: 'clamp',
});
const zIndex = Math.round(100 - Math.abs(offset) * 20);
```

### F. Elastic Bar Overshoot (`> 100%`)
Drive bar width directly with `spring({ frame: Math.max(0, frame - startFrame), fps, config: SPRINGS.overshootPunch })` without clamping at `1.0`. Multiply by `99.9` to produce an authentic `106%+` overshoot peak before settling smoothly at `99.9%`.

---

## 4. Optional Companion / Mascot State Machine

When a project uses a character, mascot, or host avatar alongside UI scenes:

| Mood State | Deterministic Motion | Visual Cue |
| :--- | :--- | :--- |
| `happy` | Smooth sine bob (`Math.sin(frame * 0.12) * 5px`) + blink every `110f` | Warm eyes + smile |
| `working` | Focused idle bob or horizontal X rail glide across cards | Visor/glasses + sparkle |
| `sweating` | Slight vertical tension + looping cyan drop offset (`frame % 24`) | Sweat droplet |
| `annoyed` | Steady posture with flat/half-lidded eyes | Side speech card |
| `panicked` | Rapid horizontal micro-jitter (`Math.sin(frame * 1.4) * 3.5px`) | Wide eyes + alert pill |
| `wholesome` | Soft bob + pulsing heart (`0.92 + Math.sin(frame * 0.16) * 0.08`) | Floating heart |
| `overworked` | Subtle strain jitter (`Math.sin(frame * 0.9) * 1.5px`) | Tired expression |
