# Design System — brandpop* "The Night Shift Ledger"

Approved 2026-07-02 via /design-consultation. The living mockup this system was
extracted from: `~/.gstack/projects/brandpop.ai/designs/design-system-20260702/night-shift-ledger.html`
(open it in a browser — it is the reference rendering for every token below).

## Product Context
- **What this is:** Marketing site + client onboarding for Brandpop, a fully managed
  AI front desk for local businesses and multi-location franchise brands.
- **Who it's for:** Owners/ops directors in dental, chiropractic, home services,
  legal, med spa, insurance — and franchise brands buying for many locations.
- **Positioning:** Legit, low-risk, no-brainer. Small-but-serious solo operator who
  sweats details. Never pretend to be a big company; never look like a template.
- **The memorable thing:** "This person is showing me the actual texts and the
  actual math, and the downside is zero." Feels audited, not pitched.
- **Services (exactly these five, in this order — AEO is never mentioned anywhere):**
  1. Database Reactivation — pay per booked appointment (the only performance-priced service)
  2. AI Voice Receptionist — flat monthly
  3. Speed to Lead — flat monthly
  4. Live Chat — flat monthly
  5. Reputation Management — flat monthly

## Aesthetic Direction
- **Direction:** Editorial ledger — "evidence, not interface." Warm paper, ink rules,
  highlighter lime, one glowing night panel per view.
- **Decoration level:** Intentional — paper grain texture, ledger rules, highlighter
  swipes. Nothing else.
- **Mood:** A printed ledger left on the front desk at midnight, with one phone
  screen glowing: the AI quietly booking an appointment while everyone's asleep.
- **Dark is a scene, not a theme:** `--night` appears ONLY on phone/demo exhibit
  panels — the product working after hours. Never as a page or section background.
- **Banned forever (the AI-template tells):** particle backgrounds, gradient orbs,
  shimmer text, 3D tilt cards, centered hero stacks, purple gradients, 3-column
  icon-in-circle grids, gradient CTA buttons, stock photos, photoreal device mockups,
  fake-live tickers, borrowed numbers presented as our results.

## Typography
- **Display/Hero:** Fraunces (Google Fonts, variable: opsz 9–144, wght 300–700,
  + italic) — a serif with claws. Weight ~420 for h1/h2, ~460 for emphasis/italic.
  Tight leading (1.08–1.12), letter-spacing −0.015em.
- **Evidence/Data:** IBM Plex Mono (400/500/600) — ALL timestamps, dollar figures,
  footnotes, nav links, kickers, labels, ledger terms, calculator values. Mono is
  the font of proof; if a number matters, it's mono.
- **Body/UI:** Lexend (self-hosted variable font, already in /public/fonts) —
  weight 300 for body, 400–500 for UI labels, 500–600 for buttons/wordmark.
- **Loading:** Fraunces + IBM Plex Mono via Google Fonts (or self-host later for
  performance); Lexend stays self-hosted. Use `next/font` in the build.
- **Scale (fluid):** h1 clamp(38px, 5vw, 64px) · h2 clamp(30px, 3.6vw, 46px) ·
  h3 clamp(24px, 2.6vw, 34px) · body 16–18.5px · small/mono 12–13.5px ·
  kicker 12px uppercase tracking 0.16em.

## Color
- **Approach:** Restrained. Paper + ink everywhere; lime is rare and always means
  something (highlight, CTA, the asterisk). Semantic red/green only on math.

| Token | Hex | Usage |
|---|---|---|
| `--bone` | `#F3F1E9` | Page ground. Warm paper, never sterile #FFF |
| `--bone-deep` | `#EBE8DD` | Facts strip, subtle wells |
| `--ink` | `#141410` | Text, rules, borders, ink button fill |
| `--ink-soft` | `#4A4A40` | Secondary text |
| `--ink-faint` | `#8A8A7C` | Kickers, captions, muted labels |
| `--lime` | `#B3FF57` | Highlighter swipes, CTA fill, asterisk marks, AI bubbles. NEVER a background wash, NEVER in a gradient |
| `--night` | `#09090D` | Exhibit/demo panels ONLY |
| `--night-soft` | `#16161F` / `#23232E` | Surfaces inside night panels (lead bubbles) |
| `--dead` | `#E4572E` | Strikethrough "dead" figures, cold-lead status |
| `--booked` | `#1E7F4F` | Booked/win figures, performance-priced terms |
| `--rule` | `rgba(20,20,16,0.18)` | Ledger rules, hairline borders |
| Card white | `#FDFCF7` | Exhibit/calculator card background on bone |

- **Contrast notes:** body text is ink on bone (≥13:1). Lime is never used for text;
  text ON lime is always ink. Inside night panels, text is `#F4F4EF`/`#E8E8E2`.
- **Paper grain:** fixed full-page SVG fractal-noise overlay at ~0.35 opacity
  (see mockup `body::before`). Subtle; if you can screenshot it and clearly see
  noise, it's too strong.

## Signature Components
- **The asterisk footnote system (the brand device):** `*` marks rendered as ink on
  a lime chip (`padding: 0 3px`). Every asterisk on a page resolves to a real,
  honest footnote in IBM Plex Mono — terms, pricing, candor. The wordmark's own
  asterisk is footnote zero: "pay only when it books." Footnotes are lowercase,
  plainspoken, and never weasel. Footer sign-off: "the asterisk means what it says."
- **Highlighter swipe (`.hl`):** lime gradient band behind a single key word in a
  serif headline (slightly angled edges). Max one per headline.
- **Ledger rows:** services and list content as ruled line items — mono index
  number, serif name, sans description, right-aligned mono term column. Top border
  1px ink; row separators `--rule`. Hover: 12% lime wash.
- **Night panel (phone exhibit):** rounded 22px near-black card, deep soft shadow,
  SMS thread with lime AI bubbles / dark lead bubbles, mono timestamps with
  "delivered" receipts, dashed-lime "APPOINTMENT BOOKED" resolution line. Realism
  lives in the thread (timing, receipts, texture), never in device chrome.
- **Exhibit/calculator card:** `#FDFCF7`, 1px ink border, hard offset shadow
  (`6px 6px 0 rgba(20,20,16,0.12)`), mono tag chip, dashed-rule footnote area.
- **Facts strip:** static ruled band (`--bone-deep`) of true operational claims in
  mono. Facts never scroll, tick, or pretend to be live.
- **Buttons:** Primary = lime fill, ink text/border, 3px radius, hard offset shadow
  `3px 3px 0 var(--ink)`, hover translates 1px into the shadow. Ink variant = ink
  fill, bone text (on lime surfaces). Ghost = mono text with 2px lime underline.

## Spacing
- **Base unit:** 4px. **Density:** spacious on marketing pages, comfortable in
  onboarding.
- **Scale:** 2xs(4) xs(8) sm(12) md(16) lg(24) xl(32) 2xl(48) 3xl(64) 4xl(96).
- **Section rhythm:** clamp(64px, 9vh, 110px) vertical padding; kicker + rule
  introduces every section.

## Layout
- **Approach:** Editorial grid, always left-aligned. Nothing is centered except
  content inside night panels.
- **Max content width:** 1240px; gutters clamp(20px, 4vw, 56px).
- **Hero pattern:** poster, not document — 1.55fr text column + 1fr exhibit column;
  mono timestamp stamp above serif headline; footnote under CTAs.
- **Border radius:** 3px buttons · 12–14px inputs/bubbles · 22px night panels.
  Cards on paper are square-cornered with ink borders.

## Motion
- **Approach:** minimal and meaningful. Two moving things per page, max.
- Sanctioned motion: SMS thread messages entering in conversation order (staggered
  0.8s/2.2s/3.6s/5.0s + 6.2s booked line — keep explicit per-message delay classes,
  never nth-of-type), button press translate, ledger-row hover wash, calculator
  live recalc.
- **Easing:** ease / cubic-bezier(0.22, 1, 0.36, 1). Durations 120–450ms.
- **SEO-critical rule:** content is NEVER hidden pending JS/scroll animation. Server
  render everything visible; motion is progressive enhancement only. No
  `initial={{ opacity: 0 }}` on meaningful content.

## Copy Voice (site-specific)
- Managed-service language: "we build it, run it, monitor it 24/7, and send you the
  report," "you never log into anything." NEVER "complex AI workflows," never
  hype-speak, never "revolutionize/supercharge/unlock."
- Sentence case everywhere; footnotes lowercase; numbers as numerals; proper
  typographic apostrophes (’) and quotes (“ ”) — no prime marks.
- Honesty is the brand: young company, real threads (names changed), benchmark
  numbers labeled as benchmarks. Radical-candor footnotes are on-brand; scale-faking
  is off-brand.
- Headlines tell a specific story ("Your front desk went home at five. We just
  booked Mrs. Alvarez for Tuesday.") — concrete nouns, real times, real names.

## Proof Strategy (until real case-study volume exists)
1. **Try it live** — visitor texts/calls the demo line (GHL subaccount) or uses
   the custom on-page chat (our UI, GHL via API — never the stock GHL widget).
   The AI is Brandpop's OWN front desk (dogfooding is the proof), with a roleplay
   mode: ask it to play a business in your vertical, it runs the lead conversation,
   then breaks the fourth wall and offers to book a real meeting with Troy. Every
   demo conversation should end with a path onto Troy's calendar.
2. **The math** — interactive DBR calculator; sliders for list size, customer value,
   benchmark rebook rate; outputs appointments/revenue vs. lime-highlighted $0.00
   up-front. Benchmarks footnoted as benchmarks.
3. Real client results replace/augment these as they accumulate — never before.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-07-02 | Polarity flip: paper/ink ground, dark demoted to exhibit panels | Every AI vendor is dark+neon; documents read as trustworthy; lime-on-paper = highlighter |
| 2026-07-02 | Fraunces / IBM Plex Mono / Lexend stack | Serif = taste signal nobody in category dares; mono = font of proof; Lexend kept as quiet body for brand continuity (free fonts only) |
| 2026-07-02 | Asterisk footnote system as brand device | Wordmark already contains it; fine-print honesty IS the business model (pay when it books) |
| 2026-07-02 | Killed live ticker + borrowed-number "Exhibit A" | No real volume to show; fake-live undermines the honesty register. Replaced with facts strip + try-it-live + calculator |
| 2026-07-02 | Proof = experience (demo line) + self-computed math | "The demo does the selling" (ICP.md); strongest real asset a young company owns |
| 2026-07-02 | No AEO on the site; services locked to the five in onboarding | Troy's instruction — offerings must match onboarding |
