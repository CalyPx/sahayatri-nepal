# CLAUDE.md — Sahayatri Nepal Website
## Read this fully before writing a single line of code.

---

## VISUAL REFERENCE
Primary reference: https://www.genocideedu.org (GenocideEdu design)
Screenshot saved at: /reference/genocideedu.png

Study and replicate:
- Full-bleed dark photography hero with handwritten script overlay
- Circular/pill containers for program sections (NOT rectangular cards)
- Large editorial numbers on dark background strips
- Handwritten/script font as recurring accent element for quotes and section endings
- Mixed content density — alternating airy and dense sections
- Muted, sophisticated dark tones (not pure black, not pure white)
- Signature-style cursive text for emotional moments

---

## PROJECT IDENTITY
- **Organization**: Sahayatri Nepal (सहयात्री नेपाल) / Hand in Hand Nepal
- **Mission**: Education, shelter & rehabilitation for deaf children, Karnali Province, Nepal
- **Partner INGO**: Learn for Life, United Kingdom (primary donor)
- **Location**: Chandanath-02, Jumla, Karnali Province, Nepal
- **Leadership**: Dhrub Saud (Chair), Pradeep Narayan Joshi (Secretary), Devendra Timilsena (Chief Advisor), Ramita Budha (Coordinator/Translator)
- **Contact**: hhnjumla25@gmail.com | +977 984-5165386 | WhatsApp: +977 984-5165386
- **Facebook**: https://www.facebook.com/profile.php?id=61588662294463

---

## BRAND TOKENS

### Colors
```css
--primary:   #1A6FA8;   /* Strong sky blue — primary */
--secondary: #0D4F7A;   /* Deep blue — secondary sections */
--gold:      #C8A84B;   /* Himalayan gold — script accents, highlights */
--lightbg:   #F0F7FF;   /* Very light blue tint — light section bg */
--dark:      #0A1628;   /* Near black — dark sections, text */
--white:     #FFFFFF;   /* Pure white */
```

### Typography (LOAD FROM GOOGLE FONTS — NEVER USE SYSTEM FONTS)
```css
/* Display / Hero H1 */
@import: "Space Grotesk" weight 700   (Clash Display preferred; use Space Grotesk as fallback)

/* Body / nav / labels / buttons */
@import: "Plus Jakarta Sans" weight 400, 500, 600

/* Handwritten script — signature moments, quotes, section taglines */
@import: "Dancing Script" weight 700

/* Monospace — impact numbers, financial data */
@import: "Space Mono" weight 400
```

**Usage rules:**
- "Space Grotesk" → H1, H2, large editorial headings (bold, impactful)
- "Plus Jakarta Sans" → body, nav, labels, buttons, captions, eyebrow labels
- "Dancing Script" → hero script overlays, pull quotes, section-ending taglines
- "Space Mono" → impact numbers, financial data

**NEVER USE:** Inter, Roboto, Cormorant Garamond, Outfit, JetBrains Mono, system fonts

### Shadows (layered)
```css
--shadow-soft: 0 4px 24px rgba(27,58,45,0.12), 0 1px 4px rgba(27,58,45,0.08);
--shadow-card: 0 8px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10);
```

---

## AESTHETIC DIRECTION

**Target feel**: GenocideEdu.org — but warmer, more hopeful (less conflict, more renewal).
Editorial NGO annual report quality. The handwritten script elements signal humanity and authenticity.
Alternating dark/light sections. Photography-first design. Generous whitespace.

### Signature Elements (USE ALL OF THESE)
1. **Handwritten script overlays** on hero — "Dancing Script" in gold, slightly rotated (-3deg), overlapping the photo headline
2. **Circular containers** for the 3 program pillars — not cards, not boxes. Circles with thin border.
3. **Dark number strip** — forest/charcoal bg, huge JetBrains Mono numbers, gold labels
4. **Cursive section endings** — after emotional sections, a script tagline in gold (e.g., "सहयात्री — Fellow Travellers")
5. **Left-aligned hero text** — not centered. Big Cormorant Garamond, white, bottom-left of hero.

### NEVER DO
- ❌ Purple anything
- ❌ Bootstrap blue buttons  
- ❌ Inter or Roboto fonts
- ❌ Generic rectangular icon cards
- ❌ Centered hero text (left-align always)
- ❌ Clip-art or emoji icons
- ❌ "Donate Now" as the first CTA (build emotion first)
- ❌ Stock photo fake smiles
- ❌ Gradient rainbow color schemes
- ❌ Shadcn/default component library appearance

---

## PAGE STRUCTURE

### Pages (build in this order)
```
1. index.html      — Homepage
2. about.html      — About & Team  
3. programs.html   — Education, Shelter, Activities
4. impact.html     — Numbers & Transparency
5. stories.html    — Student Stories
6. donate.html     — Donate
7. contact.html    — Contact
```

### Homepage Section Order (CRITICAL — do not reorder)
```
NAV
HERO              — Full-bleed photo, left-aligned Cormorant headline,
                    Dancing Script gold overlay, dark gradient
─────────────────────────────────────────────────────
WHAT WE DO        — 3 circular pill containers (Education / Shelter / Life Skills)
                    Light cream background, thin meadow borders on circles
─────────────────────────────────────────────────────
NEWS/UPDATES STRIP — 2-col: left = editorial pull quote from team
                     right = 3 recent Facebook post summaries with photos
─────────────────────────────────────────────────────
NUMBERS STRIP     — Dark (charcoal/forest) background
                    3 huge numbers: 47 students | 100% SEE pass | 12 years
                    JetBrains Mono numbers, Dancing Script gold labels below
─────────────────────────────────────────────────────
HOW YOU CAN HELP  — 3 columns: Donate Monthly | One-time Gift | Volunteer/Partner
                    Light section, icon-free, short copy
─────────────────────────────────────────────────────
QUOTE SECTION     — Dark green bg, large italic Cormorant quote
                    Dancing Script signature below: "सहयात्री — Fellow Travellers"
─────────────────────────────────────────────────────
REPORTS/IMPACT    — Cards with dates, PDF links, SEE results, program reports
                    Light section, editorial grid
─────────────────────────────────────────────────────
TEAM FEATURE      — Photo left, editorial bio right
                    Cursive script name signature below photo
─────────────────────────────────────────────────────
SCRIPT ENDING     — Dark section, large Dancing Script: "हरेक बच्चाको आवाज छ।"
                    Translation below, Donate CTA
─────────────────────────────────────────────────────
FOOTER            — 3 cols, bilingual, Learn for Life UK credit
```

---

## MOTION (reference GenocideEdu)
- Hero: fade in from bottom, staggered, 60ms delay between elements
- Numbers strip: count-up on IntersectionObserver enter
- Script overlays: draw-on using SVG stroke-dasharray OR opacity fade
- Sections: translateY(20px) → translateY(0) + opacity 0→1 on scroll
- Circles: subtle scale(1.03) on hover
- NO: parallax, continuous loops, bouncing, elastic easing

---

## TECH STACK
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS (customized tokens, not defaults)
- **CMS**: Sanity.io (for client to update photos, stories, news)
- **Hosting**: Vercel (free tier)
- **Fonts**: Google Fonts via next/font
- **Animations**: Framer Motion (lightweight — only enter animations)
- **Images**: Next.js Image component with optimization

### Sanity Schema (what client can edit)
```
- heroImage (image + alt)
- impactNumbers (students, years, passRate)
- programPillars (title, description, icon — 3 items)
- studentStories (name, photo, quote, story text)
- newsUpdates (title, date, summary, photo, link)
- teamMembers (name, role, photo, bio)
- reports (title, date, type, fileUrl)
- donationAmounts (amount, currency, label, description)
```

---

## CONTENT VOICE
- English primary, Nepali (Devanagari) for emotional/cultural moments
- Dignified, hopeful, specific — never pitying
- Say "deaf students" or "children with hearing disabilities" — not "special needs"
- Use real names, real places, real numbers
- Avoid: "vulnerable", "underprivileged", "help us help them"

### Key Copy
**Hero headline**: "Educating deaf children in Nepal's most remote province."
**Hero script overlay**: "in the arms of the future" (or Nepali equivalent)
**Numbers labels** (Dancing Script, gold):
- below 47 → "students, finding their voice"
- below 100% → "SEE pass rate, Class of 2025"  
- below 12 → "years of showing up"

**Quote section**: 
"The children who come to us are not broken. They have simply been waiting for a language."
— Devendra Timilsena, Chief Advisor

**Script ending**: "हरेक बच्चाको आवाज छ।"
Sub: "Every child has a voice. Help us make sure it is heard."

---

## SCREENSHOT WORKFLOW (MANDATORY)
After EVERY section:
1. Puppeteer screenshot at 1440px wide
2. Compare against /reference/genocideedu.png
3. Ask: Does this feel like GenocideEdu quality or like a WordPress template?
4. List specific differences → fix → re-screenshot
5. Minimum 2 rounds. Do not proceed until section passes.

---

## CLIENT CMS NOTES
Client = non-technical NGO staff in Jumla, Nepal.
- Sanity Studio must be in simple mode
- Field labels in plain English (not developer jargon)
- Photo upload must be drag-and-drop
- All text fields must have character limits displayed
- Test: can a 50-year-old NGO worker in a remote district update this without help?
