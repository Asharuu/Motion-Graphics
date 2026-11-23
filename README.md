<div align="center">

# Motion Graphics

### General-purpose Antigravity skill and Remotion toolkit for deterministic, audio-synced motion graphics.

**5 visual directions · 12 modular scene patterns · zero-dependency Node.js SFX & audio-beat scripts.**

[![Antigravity Skill](https://img.shields.io/badge/Antigravity-Skill-2563EB?style=flat-square&logo=google)](https://github.com/Asharuu/Motion-Graphics)
[![Remotion](https://img.shields.io/badge/Engine-Remotion%204-0F172A?style=flat-square)](https://www.remotion.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-10B981?style=flat-square)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.0-6366F1?style=flat-square)](plugin.json)

**[English](#english) · [Bahasa Indonesia](#bahasa-indonesia)**

<code>git clone https://github.com/Asharuu/Motion-Graphics.git ~/.gemini/config/plugins/motion-graphics</code>

</div>

---

<a id="english"></a>
## English

**[Features](#features) · [Tutorial](#tutorial) · [CLI Tools](#cli-tools) · [Architecture](#architecture) · [FAQ](#faq)**

### Features

| Component | What It Covers | Reference |
| :--- | :--- | :--- |
| **5 Visual Presets** | `light-studio`, `dark-saas`, `editorial-paper`, `bold-brand`, `clean-data` with contrast & font locks | [visual-directions.md](skills/motion-graphics/references/visual-directions.md) |
| **12 Scene Patterns** | Domain-agnostic blueprints (Hero, Cascade, Bento, Tabbed Workflow, Diff, KPI, 3D Carousel, Queue Flood, CTA) | [scene-patterns.md](skills/motion-graphics/references/scene-patterns.md) |
| **Multi-Format Safe Zones** | Ready constraints for `16:9` (`1920×1080`), `9:16` (`1080×1920`), and `1:1` (`1080×1080`) | [motion-tokens.ts](skills/motion-graphics/examples/motion-tokens.ts) |
| **Deterministic Physics** | 5 calibrated `spring()` presets + frame-pure formulas (`useCurrentFrame()`, `tabular-nums`) | [motion-physics-and-timing.md](skills/motion-graphics/references/motion-physics-and-timing.md) |
| **Audio & Beat Sync** | Script pacing math, TTS pronunciation isolation, procedural SFX synthesis, silence-to-frame mapping | [audio-and-sync-pipeline.md](skills/motion-graphics/references/audio-and-sync-pipeline.md) |
| **Starter Components** | Drop-in `StageShell.tsx` supporting animated mesh/grid/solid canvases and kinetic caption pills | [StageShell.tsx](skills/motion-graphics/examples/StageShell.tsx) |

### Repository Layout

```text
Motion-Graphics/
├── .gitignore
├── LICENSE
├── plugin.json
├── README.md
└── skills/
    └── motion-graphics/
        ├── SKILL.md
        ├── references/
        │   ├── visual-directions.md
        │   ├── scene-patterns.md
        │   ├── motion-physics-and-timing.md
        │   └── audio-and-sync-pipeline.md
        ├── scripts/
        │   ├── generate-sfx.mjs
        │   └── detect-audio-beats.mjs
        └── examples/
            ├── motion-tokens.ts
            └── StageShell.tsx
```

### Tutorial

#### 1. Install the Skill or Plugin

**Option A — Antigravity Plugin (recommended, updates via `git pull`)**
```powershell
# Windows PowerShell
git clone https://github.com/Asharuu/Motion-Graphics.git "$env:USERPROFILE\.gemini\config\plugins\motion-graphics"
```
```bash
# macOS / Linux
git clone https://github.com/Asharuu/Motion-Graphics.git ~/.gemini/config/plugins/motion-graphics
```

**Option B — Global Skill Only**
```powershell
git clone https://github.com/Asharuu/Motion-Graphics.git $env:TEMP\Motion-Graphics
Copy-Item -Recurse "$env:TEMP\Motion-Graphics\skills\motion-graphics" "$env:USERPROFILE\.gemini\config\skills\"
```

**Option C — Workspace-Specific Skill**
```bash
mkdir -p .agents/skills
cp -r path/to/Motion-Graphics/skills/motion-graphics .agents/skills/
```

#### 2. Prompt Antigravity to Build a Video

Once installed, trigger [SKILL.md](skills/motion-graphics/SKILL.md) naturally in any coding workspace:

- **SaaS Product Launch (`16:9`)**:
  > *"Use `motion-graphics` to build a 45-second `16:9` Remotion product video for our invoice automation tool using the `light-studio` preset, plus an ElevenLabs voiceover script."*
- **Developer CLI Demo (`dark-saas`)**:
  > *"Create a 30-second Remotion launch clip in `dark-saas` style showing terminal install, live error-to-fix diff, and benchmark bars."*
- **Short-Form Vertical Reel (`9:16`)**:
  > *"Build a 25-second `9:16` Remotion reel using `bold-brand` with kinetic typography statements, KPI count-up, and an auto-typing CTA."*

#### 3. Generate Studio UI SFX

Run [generate-sfx.mjs](skills/motion-graphics/scripts/generate-sfx.mjs) inside your Remotion project (requires Node.js only—zero npm packages needed):

```bash
node path/to/skills/motion-graphics/scripts/generate-sfx.mjs --out ./public/sfx
```

This creates 7 PCM16 WAV files (`whoosh.wav`, `pop.wav`, `click.wav`, `keystroke.wav`, `error.wav`, `success.wav`, `swipe.wav`) ready for Remotion `<Audio src={staticFile('sfx/pop.wav')} />`.

#### 4. Sync Scenes to Voiceover Pauses

After placing your TTS or recorded audio in `./public/audio/voiceover.mp3`, run [detect-audio-beats.mjs](skills/motion-graphics/scripts/detect-audio-beats.mjs):

```bash
node path/to/skills/motion-graphics/scripts/detect-audio-beats.mjs ./public/audio/voiceover.mp3 --fps 30
```

It inspects your audio via `ffmpeg`/`ffprobe` (checking system `PATH` or Remotion's bundled `@remotion/compositor-*`) and prints each spoken phrase's exact `startFrame` and `endFrame` so transitions, captions, and SFX hit on beat.

#### 5. Preview & Render Final Video

```bash
npx tsc --noEmit
npx remotion still src/index.ts MyComposition out/preview.png --frame=90
npx remotion render src/index.ts MyComposition out/video.mp4 --codec=h264 --crf=18
```

### CLI Tools

| Script | Flags | Output |
| :--- | :--- | :--- |
| [generate-sfx.mjs](skills/motion-graphics/scripts/generate-sfx.mjs) | `--out <dir>` (default `./public/sfx`), `--help` | 7 mono 44.1 kHz PCM16 `.wav` UI sound effects |
| [detect-audio-beats.mjs](skills/motion-graphics/scripts/detect-audio-beats.mjs) | `<audio-path>`, `--fps <30>`, `--noise <-32dB>`, `--min-silence <0.18>` | Total frame count + phrase timestamp/frame table |

### Architecture

- **Zero Non-Deterministic Timers**: Remotion renders frames concurrently across headless browser workers. CSS `transition`, `@keyframes`, and `setInterval` desynchronize or freeze across workers; driving every transform and counter via `useCurrentFrame()` guarantees identical frames between Studio preview and MP4 export.
- **Trimmed Font Subsets**: Loading an entire Google Font family without `weights` and `subsets: ['latin']` triggers 30–90 font requests per render worker. Pinning exact weights keeps bundles lightweight.
- **Audio-First Scene Lengths**: Hardcoding arbitrary frame counts causes awkward silent tails or clipped narration. Measuring real pause boundaries via silence detection keeps scene cuts aligned with natural speech cadence.

### FAQ

<details>
<summary>Does this require a paid Remotion license or external sound pack?</summary>

No for personal or qualifying small-team usage under Remotion's license terms, and no external sound packs are required—`generate-sfx.mjs` synthesizes clean UI WAV files locally.

</details>

<details>
<summary>Can I use my own brand colors, fonts, or vertical 9:16 layout?</summary>

Yes. Copy `motion-tokens.ts` and customize `VISUAL_PRESETS` or pass `FORMATS.vertical9x16` (`1080×1920`) and adjust `defaultCaptionBottomPx` in `StageShell.tsx` to clear mobile social UI overlays.

</details>

<details>
<summary>Does detect-audio-beats.mjs require installing FFmpeg separately?</summary>

If `ffmpeg`/`ffprobe` is already on your `PATH`, it uses that; otherwise it automatically detects the binaries bundled inside your project's `node_modules/@remotion/compositor-*`.

</details>

---

<a id="bahasa-indonesia"></a>
## Bahasa Indonesia

**[Fitur Utama](#fitur-utama) · [Tutorial Penggunaan](#tutorial-penggunaan) · [Alat CLI](#alat-cli) · [Arsitektur](#arsitektur) · [Pertanyaan Umum](#pertanyaan-umum)**

### Fitur Utama

| Komponen | Cakupan Teknis | Referensi |
| :--- | :--- | :--- |
| **5 Arah Visual** | Preset `light-studio`, `dark-saas`, `editorial-paper`, `bold-brand`, dan `clean-data` dengan kunci kontras & tipografi | [visual-directions.md](skills/motion-graphics/references/visual-directions.md) |
| **12 Pola Scene** | Blueprint lintas domain (Hero, Cascade, Bento, Tabbed Workflow, Diff Error-to-Fix, KPI, 3D Carousel, Queue Flood, CTA) | [scene-patterns.md](skills/motion-graphics/references/scene-patterns.md) |
| **Safe Zone Multi-Format** | Batas aman siap pakai untuk rasio `16:9` (`1920×1080`), `9:16` (`1080×1920`), dan `1:1` (`1080×1080`) | [motion-tokens.ts](skills/motion-graphics/examples/motion-tokens.ts) |
| **Fisika Deterministik** | 5 preset `spring()` terkalibrasi + rumus berbasis frame (`useCurrentFrame()`, `tabular-nums`) | [motion-physics-and-timing.md](skills/motion-graphics/references/motion-physics-and-timing.md) |
| **Sinkronisasi Audio & Beat** | Rumus tempo naskah, pemisahan ejaan TTS vs caption, sintesis SFX lokal, serta pemetaan jeda audio ke frame | [audio-and-sync-pipeline.md](skills/motion-graphics/references/audio-and-sync-pipeline.md) |
| **Komponen Starter** | `StageShell.tsx` siap salin dengan latar mesh/grid/solid animatif dan kapsul caption dinamis | [StageShell.tsx](skills/motion-graphics/examples/StageShell.tsx) |

### Tutorial Penggunaan

#### 1. Memasang Skill atau Plugin

Pilih salah satu metode pemasangan berikut:

**Opsi A — Sebagai Plugin Antigravity (disarankan, mudah update lewat `git pull`)**
```powershell
# Windows PowerShell
git clone https://github.com/Asharuu/Motion-Graphics.git "$env:USERPROFILE\.gemini\config\plugins\motion-graphics"
```
```bash
# macOS / Linux
git clone https://github.com/Asharuu/Motion-Graphics.git ~/.gemini/config/plugins/motion-graphics
```

**Opsi B — Sebagai Global Skill (berlaku di semua workspace)**
```powershell
git clone https://github.com/Asharuu/Motion-Graphics.git $env:TEMP\Motion-Graphics
Copy-Item -Recurse "$env:TEMP\Motion-Graphics\skills\motion-graphics" "$env:USERPROFILE\.gemini\config\skills\"
```

**Opsi C — Khusus Satu Project Workspace**
```bash
mkdir -p .agents/skills
cp -r path/to/Motion-Graphics/skills/motion-graphics .agents/skills/
```

#### 2. Meminta Antigravity Membuat Video Baru

Setelah terpasang, cukup panggil [SKILL.md](skills/motion-graphics/SKILL.md) lewat prompt biasa sesuai kebutuhan proyekmu:

- **Peluncuran Produk SaaS (`16:9`)**:
  > *"Pakai skill `motion-graphics` untuk membuat video explainer Remotion 45 detik rasio `16:9` tentang aplikasi kasir otomatis menggunakan preset `light-studio`, lengkap dengan script ElevenLabs."*
- **Demo CLI / Developer Tool (`dark-saas`)**:
  > *"Buatkan klip peluncuran Remotion 30 detik bergaya `dark-saas` yang menampilkan instalasi terminal, perbaikan bug live diff, dan grafik benchmark."*
- **Reels / TikTok / Shorts (`9:16`)**:
  > *"Bikin video vertikal `9:16` berdurasi 25 detik pakai preset `bold-brand` dengan kinetic typography, animasi angka KPI, dan tombol CTA interaktif."*

#### 3. Membuat SFX UI Secara Lokal

Jalankan [generate-sfx.mjs](skills/motion-graphics/scripts/generate-sfx.mjs) di dalam folder project Remotion kamu (cukup Node.js, tanpa install library tambahan):

```bash
node path/to/skills/motion-graphics/scripts/generate-sfx.mjs --out ./public/sfx
```

Perintah ini menghasilkan 7 file audio PCM16 `.wav` (`whoosh.wav`, `pop.wav`, `click.wav`, `keystroke.wav`, `error.wav`, `success.wav`, `swipe.wav`) yang langsung bisa dipanggil lewat `<Audio src={staticFile('sfx/pop.wav')} />`.

#### 4. Menyelaraskan Scene dengan Jeda Voiceover

Setelah menaruh file suara TTS/ElevenLabs atau rekaman ke `./public/audio/voiceover.mp3`, jalankan [detect-audio-beats.mjs](skills/motion-graphics/scripts/detect-audio-beats.mjs):

```bash
node path/to/skills/motion-graphics/scripts/detect-audio-beats.mjs ./public/audio/voiceover.mp3 --fps 30
```

Script ini membaca durasi total dan mendeteksi setiap jeda napas/kalimat menggunakan `ffmpeg`/`ffprobe` (otomatis mendeteksi dari `PATH` sistem maupun bawaan `node_modules/@remotion/compositor-*`), lalu menampilkan daftar `startFrame` dan `endFrame` agar pergantian scene, caption, dan SFX jatuh tepat di ketukan suara.

#### 5. Preview QA & Render MP4 Final

```bash
npx tsc --noEmit
npx remotion still src/index.ts MyComposition out/preview.png --frame=90
npx remotion render src/index.ts MyComposition out/video.mp4 --codec=h264 --crf=18
```

### Alat CLI

| Script | Opsi Flag | Keluaran |
| :--- | :--- | :--- |
| [generate-sfx.mjs](skills/motion-graphics/scripts/generate-sfx.mjs) | `--out <dir>` (default `./public/sfx`), `--help` | 7 efek suara UI `.wav` mono 44.1 kHz PCM16 |
| [detect-audio-beats.mjs](skills/motion-graphics/scripts/detect-audio-beats.mjs) | `<audio-path>`, `--fps <30>`, `--noise <-32dB>`, `--min-silence <0.18>` | Total frame video + tabel timestamp & frame per kalimat |

### Arsitektur

- **Bebas Timer Non-Deterministik**: Remotion me-render frame secara paralel di beberapa worker browser sekaligus. Penggunaan CSS `transition`, animasi keyframe CSS, dan `setInterval` sering meleset atau membeku antar worker; menggerakkan seluruh animasi murni dari `useCurrentFrame()` menjamin tampilan di Studio identik dengan hasil export MP4.
- **Subset Font Terukur**: Memuat keluarga Google Font tanpa membatasi `weights` dan `subsets: ['latin']` memicu puluhan request jaringan tambahan di setiap worker. Mengunci bobot huruf menjaga proses bundle tetap ringan.
- **Durasi Scene Berbasis Audio**: Menebak jumlah frame secara manual sering menyisakan jeda sunyi di akhir atau memotong suara narator. Mengukur batas hening aktual membuat transisi selalu selaras dengan intonasi suara.

### Pertanyaan Umum

<details>
<summary>Apakah perlu lisensi Remotion berbayar atau pack SFX berbayar?</summary>

Untuk penggunaan pribadi maupun tim kecil yang memenuhi syarat lisensi Remotion, tidak berbayar; sementara efek suara UI cukup digenerate lokal memakai `generate-sfx.mjs` tanpa pack eksternal.

</details>

<details>
<summary>Bisakah warna brand, font, atau format vertikal 9:16 dikustomisasi?</summary>

Bisa. Salin `motion-tokens.ts` lalu sesuaikan `VISUAL_PRESETS`, pilih `FORMATS.vertical9x16` (`1080×1920`), dan atur `defaultCaptionBottomPx` pada `StageShell.tsx` agar aman dari overlay tombol Reels/TikTok.

</details>

<details>
<summary>Apakah detect-audio-beats.mjs mewajibkan instalasi FFmpeg terpisah?</summary>

Jika `ffmpeg`/`ffprobe` sudah terpasang di `PATH` sistem, script akan langsung memakainya; jika belum, script otomatis mencari binary bawaan di dalam `node_modules/@remotion/compositor-*`.

</details>

---

<p align="center"><em>Built for reproducible, code-driven motion design.</em></p>

## License

MIT: [LICENSE](LICENSE)
