# Lab Page Design System

> **PROJECT:** Swarup Portfolio - /lab Page
> **Generated:** 2026-03-28
> **Page Type:** 3D Interactive Portfolio Showcase

---

## Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Background | `#040404` | Page background |
| Text Primary | `#e8e4dc` | Main text, primary nodes |
| Text Muted | `rgba(232,228,220,0.3)` | Secondary text |
| Primary Node | `#c4a882` | ENGLIVO, WEHOSTT, STUDYHOURS spheres |
| Satellite Node | `#7a6e62` | Tech stack nodes |
| Connection Lines | `#5a5450` | Node connection lines |
| Accent | `#8a7355` | Wireframe, subtle highlights |

---

## Typography

**Display Font:** DM Serif Display
**Mono Font:** DM Mono

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400&display=swap');
```

### Sizes

| Element | Font | Size | Tracking | Opacity |
|---------|------|------|----------|---------|
| Hero Name | DM Mono | 10px | 0.45em | 0.3 |
| Hero Heading | DM Serif Display | clamp(5rem,10vw,10rem) | -0.02em | 1.0 |
| Chapter Number | DM Serif Display | 15vw | - | 0.03 |
| Chapter Heading | DM Serif Display | clamp(3rem,7vw,7rem) | -0.02em | 1.0 |
| Body | DM Mono | 12px | 0.03em | 0.45 |
| Primary Label | DM Serif Display | 13px | - | 1.0 |
| Satellite Label | DM Mono | 9px | 0.15em | 0.4 |
| Node Counter | DM Mono | 9px | 0.2em | 0.2 |

---

## 3D Network Graph

### Node Configuration

**Primary Nodes** (MeshStandardMaterial)
- Radius: 0.18
- Metalness: 0.8
- Roughness: 0.1
- Emissive Intensity: 0.4 (idle), 1.2 (hover)

| Node | Position | Color |
|------|----------|-------|
| ENGLIVO | (-3, 1, 0) | #c4a882 |
| WEHOSTT | (3, 1, 0) | #c4a882 |
| STUDYHOURS | (0, -2, 0) | #c4a882 |

**Satellite Nodes** (MeshBasicMaterial)
- Radius: 0.07
- Opacity: 0.7

| Primary | Satellites |
|---------|------------|
| ENGLIVO | LiveKit, NestJS, Neon, Claude API |
| WEHOSTT | Next.js, Stripe, CRM |
| STUDYHOURS | Multi-auth, Scheduling, Payments |

**Connections** (LineBasicMaterial)
- Color: #5a5450
- Opacity: 0.12 (idle), 0.4 (hover)

---

## Scroll Behavior (500vh)

| Scroll % | Graph Position | Graph Scale | Content |
|----------|----------------|-------------|---------|
| 0-20% | Center | 1.0 | Hero text visible |
| 20-40% | translateX(30vw) | 0.6 | "The Signal" chapter |
| 40-60% | Morph | 0.6 | Satellites fly out 2x |
| 60-80% | Center | 0.8 | "The Scale" chapter |
| 80-100% | Dissolve | → 0 | CTA appears |

**Lerp Factor:** 0.06 (cinematic lag)

---

## Interaction States

### Hover Primary Node
- Node scale: 1.4
- Emissive intensity: 1.2
- Satellites scale: 1.3
- Connections opacity: 0.4
- Other nodes opacity: 0.3
- Cursor: pointer

### Click Primary Node
- Opens info panel at bottom center
- Close on outside click or Escape

---

## Components

### Info Panel
```
position: fixed
bottom: 2rem
left: 50%
transform: translateX(-50%)
max-width: 480px
width: 90vw
background: rgba(4,4,4,0.92)
border: 0.5px solid rgba(232,228,220,0.12)
padding: 1.5rem 2rem
font: DM Mono
```

### Star Background
- 1500 particles total
- Near: 200 particles, size 0.06, opacity 0.8
- Mid: 500 particles, size 0.025, opacity 0.4
- Far: 800 particles, size 0.01, opacity 0.15
- All drift slowly

---

## Performance Rules

- [ ] Dispose Three.js objects on unmount
- [ ] Cap DPR at 1.5
- [ ] useRef for all Three.js objects (never useState)
- [ ] Single rAF loop
- [ ] Use Lenis for smooth scroll
