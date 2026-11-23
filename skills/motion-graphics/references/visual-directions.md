# Visual Directions & Multi-Format Safe Zones

Choose **one** visual direction matching the project's domain and audience before writing scene components. Do not mix conflicting aesthetics mid-video.

---

## 1. Five Visual Direction Presets

### Preset 1: `light-studio` (Frosted OS & Friendly Product Storytelling)
- **Best For**: Consumer apps, AI companions, productivity tools, approachable creator explainers.
- **Canvas & Background**: Alabaster `#F7F8FC` with slowly drifting pastel radial mesh blobs (`rgba(147,197,253,0.28)` sky blue & `rgba(196,181,253,0.22)` soft lavender).
- **Surfaces**: Frosted translucent bars (`rgba(255,255,255,0.80)`, `backdrop-filter: blur(16px)`), elevated white cards (`#FFFFFF`, hairline `1px solid rgba(15,23,42,0.08)`, soft shadow `0 24px 60px -14px rgba(15,23,42,0.11)`), dark obsidian caption pills (`rgba(17,20,28,0.92)`).
- **Typography**: `Plus Jakarta Sans` (`700–800`) + `Instrument Serif` italic (`400`) strictly on 1–2 focal headline words + `JetBrains Mono` for eyebrows and badges.
- **Accents**: Primary `#2563EB` (Cobalt), Success `#10B981`, Alert `#E11D48`.

### Preset 2: `dark-saas` (Developer Tools, APIs & Infrastructure)
- **Best For**: DevTools, CLIs, cloud infrastructure, cybersecurity, engineering launches.
- **Canvas & Background**: Deep slate-obsidian `#090B10` with subtle `48px` coordinate grid (`rgba(255,255,255,0.04)`) and restrained single radial top glow (`rgba(56,189,248,0.14)`).
- **Surfaces**: Elevated glass panels `#111520` with crisp `1px solid rgba(255,255,255,0.09)` borders, inner syntax terminal `#0B0E14`.
- **Typography**: `Inter` or `Plus Jakarta Sans` (`700`) + `JetBrains Mono` (`500–700`) for code, payloads, metrics, and status indicators.
- **Accents**: Cyan `#38BDF8`, Emerald `#10B981`, Amber `#F59E0B`, Error `#EF4444`.

### Preset 3: `editorial-paper` (Essays, Manifestos & Editorial Narratives)
- **Best For**: Storytelling essays, founder memos, podcasts, research summaries, brand manifestos.
- **Canvas & Background**: Warm archival paper `#FAF7F2` (flat tactile feel, optional subtle rule lines).
- **Surfaces**: Hairline bordered frames (`1px solid rgba(28,25,23,0.14)`), minimal drop shadows, high-contrast ink blocks (`#1C1917`).
- **Typography**: Oversized editorial Serif (`Instrument Serif` or `Newsreader`) paired with clean grotesk Sans (`Inter`) and `JetBrains Mono` footnote tags.
- **Accents**: Burnt Terracotta `#C2410C`, Forest `#15803D`, Muted Stone `#78716C`.

### Preset 4: `bold-brand` (High-Energy Commercial & Social Hooks)
- **Best For**: Short `15s–45s` ad creatives, `9:16` Reels/TikTok hooks, feature drops, event promos.
- **Canvas & Background**: High-contrast solid or crisp dual-tone brand backdrop (`#111827` or primary brand hue) built for instant mobile thumb-stop readability.
- **Surfaces**: Sharp pill tags, high-contrast solid cards (`#FFFFFF` on dark or `#0F172A` on light), punchy scale-in kinetic headlines.
- **Typography**: Heavy geometric Sans (`800–900`, tight `-0.04em` tracking) with large single-line captions (`2–4` words per beat).
- **Accents**: Custom brand primary + vivid highlight yellow/lime/coral.

### Preset 5: `clean-data` (KPI Recaps, Analytics & Pitch Decks)
- **Best For**: Quarterly recaps, investor updates, SaaS analytics showcases, financial/benchmark comparisons.
- **Canvas & Background**: Cool neutral canvas `#F8FAFC` with structured subtle dividers.
- **Surfaces**: Crisp `#FFFFFF` bento cards, flat hairline borders (`rgba(15,23,42,0.08)`), muted slate gridlines.
- **Typography**: `Plus Jakarta Sans` + `JetBrains Mono` (`tabular-nums` mandatory across every axis, bar, and KPI card).
- **Accents**: Indigo `#4F46E5`, Teal `#0D9488`, Slate `#64748B`, Coral `#F43F5E`.

---

## 2. Format & Platform Safe Zones

Always configure composition dimensions in `src/theme.ts` and constrain UI within platform safe insets:

| Format Key | Resolution | Aspect | Target Channels | Safe Padding (`Top / Side / Bottom`) | Layout Guidance |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `desktop16x9` | `1920×1080` | `16:9` | YouTube, X, Product Hunt, Landing Pages | `56px / 88px / 115px` (reserve bottom for caption pill or dock) | Two-column splits (`38/62`, `55/45`, `24/76`), 3-col bento, horizontal coverflow |
| `vertical9x16` | `1080×1920` | `9:16` | Reels, TikTok, YouTube Shorts | `140px / 56px / 280px` (avoids right action bar & bottom description/nav) | Stack headline/character vertically above simulator window; keep interactive elements left-of-right-edge (`paddingRight >= 110px` on mid-lower right) |
| `square1x1` | `1080×1080` | `1:1` | LinkedIn, Instagram Feed, Carousel Video | `64px / 64px / 120px` | Single hero window or vertical 2-row split; concise 1-line captions |

---

## 3. Typography & Contrast Discipline

1. **Subset Optimization**: When calling `@remotion/google-fonts`, pass explicit `weights` and `subsets: ['latin']` (avoid loading full multi-script families that trigger dozens of font network requests during headless rendering).
2. **Italic Serif Restraint**: When pairing Sans + Italic Serif (`light-studio` or `editorial-paper`), style only **1–2 focal words** per headline in italic serif. Keep eyebrows, labels, buttons, and body copy upright.
3. **Tabular Numerals**: Apply `fontVariantNumeric: 'tabular-nums'` on every ticking timer, percentage readout, counter, and clock so numbers never wobble frame-to-frame.
4. **Legibility Floor**: Never drop body text inside mockups below `13px` (`1080p` desktop) or `22px` (`1080×1920` mobile). Video compression softens thin light-gray text; keep primary body contrast `>= 4.5:1`.
