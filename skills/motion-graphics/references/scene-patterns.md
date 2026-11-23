# 12 Domain-Agnostic Scene Patterns

Mix and parameterize from these 12 modular scene blueprints to fit any product, story, or dataset. **Never place two consecutive scenes with the same spatial split or pattern.**

*(For `9:16` vertical videos, stack horizontal splits vertically: top narrative block + bottom interactive stage.)*

---

## 1. Hook & Hero Reveal
- **Narrative Role**: Opening 3–6 second hook introducing the product, host, or core promise.
- **Spatial Split (`16:9`)**: Centered hero stage flanked by 2 ambient corner status cards + optional bottom Dock or navigation strip.
- **Parameterizable Schema**:
  - `eyebrow`, `headline`, `accentWord`, `subheadline`
  - `visualAnchor`: product logo, character/avatar, or Polaroid/frame card
  - `cornerBadges`: 2 concise live status widgets
  - `launcherStrip`: optional bottom Dock/bar with cursor click trigger
- **Motion Choreography**: Cursor or focal pulse activates launcher (`microTap`) → visual anchor pops in (`bouncyPop`) → corner badges & headline stagger (`+8f`) → hero frame settles (`gentleSlide`).
- **Pitfalls**: Caption overlapping bottom launcher/Dock — increase `bottomReservePx` on `StageShell` whenever bottom chrome is rendered.

---

## 2. Alert / Request Cascade
- **Narrative Role**: Establish incoming workload, user pain points, notifications, or real-time triggers (`4–7s`).
- **Spatial Split (`16:9`)**: **38 / 62** split (left: headline + reactive anchor; right: vertical stack of 4–6 frosted notification/event banners).
- **Parameterizable Schema**:
  - `headline`, `accentWord`, `mood`
  - `items[]`: `{ categoryTag, tagColor, senderOrSource, message, timestamp }`
- **Motion Choreography**: Left column lands (`0–20f`) → notification banners drop down sequentially every `14–20f` (`snappyUI` from `translateY: -18px`, `scale: 0.95`) with escalating pitch `pop` SFX.
- **Pitfalls**: Multi-line wrapping inside banners breaks rhythm; cap each item to 1 crisp line (`<= 52` chars).

---

## 3. Multi-Column Capability Bento
- **Narrative Role**: Demonstrate 3–4 distinct capabilities or pillars running simultaneously (`6–9s`).
- **Spatial Split (`16:9`)**: Centered header over **3 equal columns** (`gridTemplateColumns: repeat(3, minmax(0, 1fr))`), optionally paired with a roving indicator/companion underneath.
- **Parameterizable Schema**:
  - `header`: `{ eyebrow, title, accentWord }`
  - `cards[3]`: `{ windowTitle, heading, livePreviewType, footerStatus }`
- **Motion Choreography**: Cards stagger upward (`+30f` to `+60f` apart when narrated sequentially) and each card activates an internal live loop (typing CLI command, animated selection handles, scrubbing timeline playhead, or live chart line).
- **Pitfalls**: Static boxes inside bento cards feel like slides; ensure each card animates at least one inner micro-element.

---

## 4. Multi-Step Tabbed Workflow
- **Narrative Role**: Walk through a 3-step end-to-end process inside one unified app frame (`7–11s`).
- **Spatial Split (`16:9`)**: **20 / 80** split (left: status indicator or companion; right: large window topped with a 3-pill step switcher).
- **Parameterizable Schema**:
  - `steps[3]`: `{ tabLabel, topBarTitle, contentMode, actionTrigger }`
- **Motion Choreography**: Divide duration into 3 equal sub-beats → highlight active pill tab and update `StageShell` top bar title simultaneously → Step 3 concludes with cursor clicking primary CTA button (`"Submit"` / `"Deploy"` → emerald `"✓ Live"`).
- **Pitfalls**: Switching inner views without updating the window/top bar title breaks continuity.

---

## 5. Split Contrast & Mobile Viewport
- **Narrative Role**: Highlight stark contrast (manual chaos vs. automation, deadline vs. calm, desktop vs. mobile experience) (`5–7s`).
- **Spatial Split (`16:9`)**: **55 / 45** split (left: live countdown/metric card + headline + callout; right: vertical phone mockup with scrolling feed or app screen).
- **Parameterizable Schema**:
  - `badge` (e.g., countdown timer or status alert)
  - `headline`, `metricBarCard`, `calloutQuote`
  - `mobileCards[]`: 3–4 vertical feed or mobile UI frames
- **Motion Choreography**: Left counter/progress bar ticks continuously (`tabular-nums`) while right phone bezel snaps smoothly between cards every `40–50f` (`gentleSlide` + `swipe` SFX).
- **Pitfalls**: Phone height exceeding `72%` of stage height pushes into caption safe zones.

---

## 6. Live Problem-to-Solution Diff
- **Narrative Role**: Prove reliability, debugging, error recovery, or before/after transformation in real time (`8–13s`).
- **Spatial Split (`16:9`)**: **20 / 80** or full-width split window (left: code/config/canvas with error state; right: chat/log/agent panel).
- **Parameterizable Schema**:
  - `problemState`: `{ highlightedLine, errorBadge, errorMessage }`
  - `threadMessages[]`: `{ author, severity: 'normal' | 'urgent' | 'resolved', text, enterFrame }`
  - `patchedCode`: replacement lines rendered in emerald diff highlight
- **Motion Choreography**: Error highlights (`error` SFX) → incoming request/escalation messages pop in → code or workflow patches in emerald green diff → status badge flips `PROBLEMS (1)` → `PROBLEMS (0)` (`success` SFX) + calm confirmation reply.
- **Pitfalls**: Tiny 10px font in mock editors becomes illegible after video compression; show 5–8 clean lines at `>= 15px`.

---

## 7. Metric & KPI Proof Row
- **Narrative Role**: Emotional or analytical pivot showcasing tangible outcomes (`4–6s`).
- **Spatial Split (`16:9`)**: Centered header lockup over a **3-column KPI bento row**.
- **Parameterizable Schema**:
  - `eyebrow`, `headline`, `accentWord`
  - `kpis[3]`: `{ category, label, startValue, endValue, suffix, accentColor }`
- **Motion Choreography**: Header enters (`0–20f`) → 3 cards stagger (`+8f`) while numbers ease-out from `startValue` to `endValue` (`tabular-nums`). For `0`-target metrics (e.g., `"0h Overtime"` or `"0 Errors"`), count **down** from a realistic baseline (`8h → 0h`) rather than staying static.
- **Pitfalls**: Animating `0 → 0` looks broken; always animate from a nonzero start when the target is zero.

---

## 8. 3D Perspective Showcase Carousel
- **Narrative Role**: Present 3–5 shipped deliverables, templates, or customer stories cleanly (`6–10s`).
- **Spatial Split (`16:9`)**: Top headline (often featuring an animated strikethrough Myth → Truth contrast) over a full-width horizontal 3D coverflow stage.
- **Parameterizable Schema**:
  - `crossedPhrase` (optional), `headline`, `accentWord`
  - `cards[]`: `{ title, subtitle, statusPill, previewItems[] }`
- **Motion Choreography**: Optional `scaleX: 0 -> 1` strikethrough draws across old assumption → interpolate continuous `activeIndex` across plateaus (`hold ~35–45f` per card) computing `translateX`, `scale`, `rotateY`, and `opacity` for flanking cards.
- **Pitfalls**: Continuous non-stop linear glide makes card titles hard to read; include flat hold plateaus on each index.

---

## 9. Comparative Benchmark / Effort Bar
- **Narrative Role**: Crisp visual comparison showing leverage, speed improvement, or workload split (`3.5–5s`).
- **Spatial Split (`16:9`)**: **25 / 75** or centered Activity/Benchmark card comparing 2–4 horizontal progress bars.
- **Parameterizable Schema**:
  - `windowTitle`, `rows[]`: `{ name, subtitle, targetPct, barGradient, useOvershoot }`
- **Motion Choreography**: Baseline bar animates cleanly (`snappyUI`); hero/agent bar fires with `overshootPunch` spring (optionally peaking past `100%`, e.g., `105.8%`, before settling at `99.9%` or hitting a target faster).
- **Pitfalls**: Setting `overflow: hidden` on the track container clips comedic or dramatic >100% overshoot bars.

---

## 10. Scale Surge / Queue Burst
- **Narrative Role**: Show momentum, scale, backlog clearing, or viral inbound demand (`7–10s`).
- **Spatial Split (`16:9`)**: **30 / 70** split (left: headline + morphing counter pill; right: workspace grid transitioning from `STANDBY` to flooding `NEW` cards).
- **Parameterizable Schema**:
  - `completedCard`: `{ id, title, status }`
  - `counterStages[]`: progressive threshold labels (`1 Done` → `+7` → `+40` → `+99 Queued`)
  - `gridItems[6]`: `{ id, title, subtitle, triggerFrame }`
- **Motion Choreography**: Calm state (`0–40%` scene) with dimmed grid (`opacity: 0.36`) → sudden state flip (`AUTO-QUEUED` crimson header) → grid cards pop to full opacity every `10–14f` with escalating pitch SFX.
- **Pitfalls**: All 6 cards popping on the exact same frame feels flat; accelerating stagger (`12f` apart) builds energy.

---

## 11. Kinetic Typography Statement
- **Narrative Role**: High-impact transitional statement, hook, quote, or chapter divider (`2.5–4.5s`).
- **Spatial Split (`16:9` / `9:16`)**: Centered oversized typography stage with crisp word-by-word or phrase-by-phrase reveal and minimal accent underline/pill.
- **Parameterizable Schema**:
  - `eyebrow`, `segments[]`: `{ text, style: 'sans' | 'serifItalic' | 'highlightPill', enterFrame }`
- **Motion Choreography**: Words or lines enter in tight `5–8f` staggers (`snappyUI`, `translateY: 22 -> 0`, `opacity: 0 -> 1`) synced directly to voiceover emphasis syllables.
- **Pitfalls**: Slow word reveals lag behind voiceover; match each word's `enterFrame` directly to `detect-audio-beats.mjs` timestamps.

---

## 12. Interactive Conversion CTA
- **Narrative Role**: Closing sign-off turning passive viewers into sign-ups, installs, or comments (`4–6s`).
- **Spatial Split (`16:9`)**: Centered lockup (brand/host + icon strip + CTA headline + live interactive input/command pill).
- **Parameterizable Schema**:
  - `lockup`, `toolIcons[]`, `headline`, `accentWord`
  - `interactionType`: `'comment-input' | 'cli-copy' | 'waitlist-email'`
  - `typedText`, `ctaIdleLabel`, `ctaDoneLabel`
- **Motion Choreography**: Lockup + headline spring in (`0–25f`) → input field auto-types `typedText` (`keystroke` SFX) with blinking caret → cursor glides and clicks button → button morphs smoothly into emerald confirmation (`✓` + `success` SFX) held cleanly for `1.0–1.5s`.
- **Pitfalls**: Ending the video the exact frame the click happens; always hold the confirmed green state at least `30–45f` before fade/end.
