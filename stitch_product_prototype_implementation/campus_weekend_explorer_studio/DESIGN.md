---
name: Campus Weekend Explorer Studio
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#4f4632'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#81765f'
  outline-variant: '#d3c5ab'
  surface-tint: '#785a00'
  primary: '#785a00'
  on-primary: '#ffffff'
  primary-container: '#ffc300'
  on-primary-container: '#6d5200'
  inverse-primary: '#f8be00'
  secondary: '#a33e00'
  on-secondary: '#ffffff'
  secondary-container: '#fe6500'
  on-secondary-container: '#541d00'
  tertiary: '#006c49'
  on-tertiary: '#ffffff'
  tertiary-container: '#55e4a8'
  on-tertiary-container: '#006343'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdf9a'
  primary-fixed-dim: '#f8be00'
  on-primary-fixed: '#251a00'
  on-primary-fixed-variant: '#5a4300'
  secondary-fixed: '#ffdbcd'
  secondary-fixed-dim: '#ffb596'
  on-secondary-fixed: '#360f00'
  on-secondary-fixed-variant: '#7c2e00'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1.5rem
  margin-xl: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system drives a desktop operational cockpit and discovery workstation catering to campus life curators, student travel leads, and platform operation managers. The aesthetic bridges high-efficiency enterprise-grade tooling with energetic youth lifestyle discovery. 

The emotional tone balances institutional reliability with collegiate optimism: crisp data structures, tactile and responsive interactive affordances, and immersive UGC lifestyle snapshots. The system employs a modern, polished hybrid approach: structured corporate ergonomics paired with soft layered cards, ambient warm-tinted depth, clean frosted navigational backplates, and prominent high-chroma callouts.

Core visual pillars:
- **Collegiate Spontaneity & Clarity:** Rapid scannability for itineraries, crowd density, cycling radiuses, and budget splitters.
- **Enterprise Precision:** Multi-pane spatial ergonomics designed for widescreen desktop workflows without losing platform brand warmth.

## Colors

The palette leverages iconic ecosystem signifiers, balanced strictly across functional hierarchy and density controls.

- **Primary Brand Yellow (`#FFC300`, active/hover `#E6A800`):** Core action driver, primary buttons, critical timeline indicators, and high-priority state foci. High-contrast dark text (`#0F172A`) must always sit atop primary yellow fills.
- **Dianping Flame Orange (`#FF6600`):** Dedicated to reputation hallmarks—Must-Eat / Must-Play collegiate badges, trending UGC review metrics, heatmaps, and platform trust rankings.
- **Campus Mint Green (`#10B981`):** Represents low-carbon transit (bike-share radiuses, walking zones), student group-buying discounts, and verified booking success feedback.
- **Sky Blue (`#3B82F6`):** Dedicated to identity validation (Campus Student ID verification), metro transit connections, and dynamic weather conditions.
- **Neutrals & Surfaces:**
  - `Canvas Ground`: `#F8FAFC` (Slate 50)
  - `Surface Recessed`: `#F1F5F9` (Slate 100)
  - `Card Ground`: `#FFFFFF`
  - `Border Subtle`: `#E2E8F0` (Slate 200)
  - `Text Primary`: `#0F172A` (Slate 900)
  - `Text Muted`: `#64748B` (Slate 500)
  - `Dark Console Accents`: `#0F172A` for side rail utilities, command palettes, and telemetry badges.

## Typography

Typography relies on **Plus Jakarta Sans** for Western glyphs, numeric metrics, and timestamps, backed gracefully by **PingFang SC** for Chinese typographic rendering. 

Rules for typographic execution:
- **Metric Prominence:** Operational statistics (budget savings, ride durations, rank indices) utilize `headline-xl` or `display-lg` with tabular figures enabled (`font-variant-numeric: tabular-nums`).
- **Hierarchy Control:** Chinese body text maintains strict `lineHeight: 1.5` to `1.6` for rapid scannability within complex data panels.
- **Badge & Status Labels:** `label-sm` utilizes subtle tracking (`letterSpacing: 0.02em`) and full uppercase for alphanumeric codes.

## Layout & Spacing

The workstation uses a multi-tier dashboard layout optimized for desktop viewports (`1440px+` ideal, responsive down to `1024px` compact desktop).

- **Grid Architecture:** 
  - Fixed left control navigation rail (`240px` expanded, `64px` icon-only collapsed).
  - Main operational area adopts a fluid 12-column sub-grid with `1.5rem` (`24px`) gutters.
  - Optional contextual inspector / itinerary preview panel dockable to the right (`360px` to `420px`).
- **Density Rhythms:**
  - Micro-spacing (`space-xs` = 4px, `space-sm` = 8px) separates inline badges, ratings, and avatars within cards.
  - Component padding (`space-md` = 16px, `space-lg` = 24px) preserves airiness inside cards without sacrificing data density.
  - Macro-spacing (`space-xl` = 32px) defines sectional segmentation across map modules and feed aggregates.

## Elevation & Depth

Visual hierarchy combines clean 1px borders with ambient, colored drop shadows to evoke physical softness without visual noise:

- **Surface Level 0 (Canvas Base):** `#F8FAFC`. Unelevated backdrop.
- **Surface Level 1 (Workplace Cards & Modules):** Pure `#FFFFFF` fill with a crisp boundary outline (`1px solid #E2E8F0`) and subtle ambient shadow: `box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)`.
- **Surface Level 2 (Interactive Hover & Selected Pins):** Elevated on hover: `box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`, translated `-2px` along the Y-axis.
- **Surface Level 3 (Floating Overlays, Popovers, & Dropdowns):** `box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 10px 10px -5px rgba(15, 23, 42, 0.04)`.
- **Brand Glow Focus:** Accent elements (active filter tabs or callout items) gain an explicit brand glow: `box-shadow: 0 0 0 3px rgba(255, 195, 0, 0.28)`.

## Shapes

The interface embraces modern, rounded geometric surfaces that reflect youthful energy while remaining disciplined enough for tabular layouts:

- **Workstation Containers & Map Viewports (`rounded-2xl` / 16px):** Primary modules, discovery feed panels, and modal shells.
- **Interactive Component Cards (`rounded-xl` / 12px):** POI spot listings, itinerary item cards, weather widgets, and transit selectors.
- **Controls, Text Inputs, and Action Buttons (8px to 10px):** Form fields, search bars, and standard operational triggers.
- **Status Tags, Verification Pills, and Filter Chips (`rounded-full` / 9999px):** Fully pill-shaped pills for student identity badges, transit modes, and discount tags.

## Components

### Buttons
- **Primary:** Solid `#FFC300` background, `#0F172A` bold typography. Hover shifts to `#E6A800`. Focus ring in `rgba(255, 195, 0, 0.35)`. Height: `40px` (desktop compact: `34px`), radius: `10px`.
- **Secondary:** Surface `#FFFFFF` with `#E2E8F0` border, text `#0F172A`. Hover transitions background to `#F1F5F9`.
- **Accent (Explore & Save):** Solid `#10B981` or tinted `#ECFDF5` borderless pill with `#065F46` label for eco-biking and group-buying triggers.

### Chips & Filter Pills
- **Standard Filter:** Height `32px`, pill-shaped (`rounded-full`), `#F1F5F9` background, `#475569` text. On selection: background switches to `#FFC300`, text to `#0F172A`, font weight `600`.
- **Reputation Badge (Must-Eat/Play):** `#FFF7ED` fill, `#FF6600` text, `1px solid rgba(255, 102, 0, 0.2)`, leading star/flame glyph.
- **Campus Verification Badge:** `#EFF6FF` background, `#3B82F6` text and border accent, featuring student graduation icon.

### Form Inputs & Search
- Surface `#FFFFFF`, border `1px solid #CBD5E1`, internal height `40px`, radius `10px`, typography `body-md`.
- Focus state: border color `#FFC300`, subtle outer glow `0 0 0 3px rgba(255, 195, 0, 0.25)`.
- Campus location selector with leading location icon and quick-switch university selector dropdown.

### POI & Itinerary Cards
- Container: Surface `#FFFFFF`, `rounded-2xl` (16px), border `1px solid #E2E8F0`, padding `16px`.
- Image header: `16:9` or `4:3` aspect ratio, `rounded-xl` (12px) overflow boundary with absolute-positioned floating pills (e.g., "Bike 8 min" in Mint Green or "Ranked #1" in Dianping Orange).
- Metadata row: Bold venue title, dual-tone pricing metrics (e.g., student discount vs. rack rate), and direct "Add to Route" trigger.

### Checkboxes & Segmented Controls
- Segmented Control: `#F1F5F9` background rail, `4px` padding, inner active slider pill `#FFFFFF` with `rounded-lg` (8px) and soft elevation.
- Checkbox: Custom `18px × 18px`, `rounded-md` (6px). Checked state: fill `#FFC300` with dark check mark.