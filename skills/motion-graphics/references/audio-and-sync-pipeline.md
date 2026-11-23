# Audio, Voiceover Scripting & Beat-Sync Pipeline

Audio timing drives viewer retention. Rather than guessing frame lengths, generate or record audio first, measure exact pause boundaries, and lock every Remotion scene and caption to real timestamps.

---

## 1. Script Pacing Math

Estimate spoken duration before recording/generating TTS:

| Delivery Style | Words / Second | Recommended Beat Length |
| :--- | :--- | :--- |
| **Energetic Reel / Hook (`9:16`)** | `2.8 – 3.3 w/s` | `2.5s – 5.0s` per visual scene |
| **Conversational Explainer (`16:9`)** | `2.4 – 2.8 w/s` | `4.0s – 11.0s` per visual scene |
| **Technical / Analytical Deep-Dive** | `2.0 – 2.4 w/s` | `6.0s – 14.0s` per visual scene |

Add `+0.3s` (`9 frames`) breathing pause between major scene transitions and `+1.2s` (`36 frames`) at the very end so the final CTA confirmation sits comfortably before the clip ends.

---

## 2. Writing Scripts for TTS / ElevenLabs

1. **Separate Phonetic Spelling from On-Screen Captions**: If an acronym, brand name, or handle reads awkwardly in TTS (e.g., `SiLy` read letter-by-letter or `@handle` read as "at"), write natural phonetic text in the TTS script while keeping exact brand spelling in `CAPTIONS`.
2. **Keep Sentences Scannable**: Break long explanations into crisp `6–12` word caption chunks so the floating caption pill fits cleanly on one line without vertical expansion.
3. **Optional Expressive Tags**: Modern expressive TTS models (e.g., ElevenLabs v4) respond well to concise delivery tags like `[cheerful]`, `[sighs]`, `[chuckles]`, `[curious]`, `[warmly]`—verify generated audio by listening/inspecting so tags are acted out rather than spoken aloud.

---

## 3. Measuring Exact Pause Timestamps (`detect-audio-beats.mjs`)

Once the voiceover audio file (`.mp3` / `.wav`) is saved inside `public/audio/`, run the bundled beat-detection script:

```bash
node ./scripts/detect-audio-beats.mjs ./public/audio/voiceover.mp3 --fps 30
```

It reports:
- Exact total duration (`seconds` and `frames`)
- Every speech phrase window (`startSec → endSec`) and exact frame offsets (`startFrame → endFrame`)
- Pause midpoints ideal for cutting cleanly between `<Sequence>` scenes

Use those exact frame numbers to update `SCENES`, `CAPTIONS`, and internal action triggers (e.g., triggering an IDE fix, strikethrough draw, or queue flood on the exact frame the narrator speaks that phrase).

---

## 4. Procedural SFX Layering (`generate-sfx.mjs`)

Generate 7 clean, royalty-free UI SFX `.wav` files into `./public/sfx/` with zero external dependencies:

```bash
node ./scripts/generate-sfx.mjs --out ./public/sfx
```

### Gain Staging & Placement Rules
Keep Voiceover at `volume={1.0}` and attenuate UI SFX cleanly underneath:

| Sound File | Trigger Moment | Recommended Volume | Notes |
| :--- | :--- | :--- | :--- |
| `whoosh.wav` | Scene entry / major transition | `0.15 – 0.18` | Place right on scene `startFrame` |
| `pop.wav` | Cards, notifications, chat bubbles, badges | `0.16 – 0.20` | Increment `playbackRate` (`1.0, 1.06, 1.12...`) on cascades |
| `click.wav` | Cursor clicks, tab switches, CTA press | `0.22 – 0.26` | Trigger `2–3` frames before button state morphs |
| `keystroke.wav` | Terminal or input auto-typing | `0.12 – 0.15` | Place at typing start frame |
| `error.wav` | Validation errors, alert states | `0.18 – 0.22` | Subtle low bonk; avoid harsh loud buzzers |
| `success.wav` | Build pass, deploy live, CTA confirmed | `0.20 – 0.24` | Major triad harmonic chime |
| `swipe.wav` | Mobile feed scroll & 3D carousel glide | `0.14 – 0.17` | Sync to midpoint of glide curve |
