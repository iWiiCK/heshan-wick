# Heshan Wickramaratne — Portfolio

A modern, immersive portfolio website built with **React**, **Three.js**, and **Vite**. Features a procedural particle field, smooth scroll animations, and a fully JSON-driven content system for easy editing.

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool
- **Three.js** + **@react-three/fiber** — 3D particle system
- **@react-three/postprocessing** — Bloom effects
- **Lenis** — Smooth scrolling
- **CSS Custom Properties** — Theming

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run deploy` | Deploy to GitHub Pages |

---

## Content Editing Guide

All website content is driven by two JSON files. Edit these files and the website updates automatically — no code changes needed.

### `src/data/portfolio.json`

This file contains **all text content** on the site. Here's how each section works:

#### `meta` — Site metadata
```json
{
  "meta": {
    "name": "Your Full Name",
    "shortName": "HW",           // Shown in navbar & loader
    "title": "Your Job Title",
    "siteTitle": "Page <title>",
    "description": "SEO description"
  }
}
```

#### `hero` — Landing section
```json
{
  "hero": {
    "greeting": "Hello, I'm",
    "firstName": "HESHAN",        // Large display text (line 1)
    "lastName": "WICKRAMARATNE",  // Large display text (line 2)
    "subtitle": "Senior Software Engineer",
    "description": "A brief intro paragraph...",
    "scrollCta": "Scroll to explore"
  }
}
```

#### `about` — About section
```json
{
  "about": {
    "sectionNumber": "01",
    "title": "ABOUT",
    "bio": [
      "First paragraph...",
      "Second paragraph..."
    ],
    "highlights": [
      { "value": "5+", "label": "Years Experience" }
    ]
  }
}
```

**To add a highlight:** Add a new `{ "value": "...", "label": "..." }` object to the `highlights` array.

**To add a bio paragraph:** Add a new string to the `bio` array.

#### `experience` — Work experience
```json
{
  "experience": {
    "sectionNumber": "02",
    "title": "EXPERIENCE",
    "items": [
      {
        "company": "Company Name",
        "role": "Your Role",
        "period": "2022 — Present",
        "description": "What you did...",
        "technologies": ["React", "Node.js", "AWS"]
      }
    ]
  }
}
```

**To add a new role:** Add a new object to the `items` array. Items render in array order (first = top).

**To add technologies:** Add strings to the `technologies` array of any experience item.

#### `education` — Education background
```json
{
  "education": {
    "sectionNumber": "03",
    "title": "EDUCATION",
    "items": [
      {
        "institution": "University Name",
        "degree": "BSc. (Hons) Software Engineering",
        "result": "First Class Honours",
        "period": "2019 — 2022",
        "location": "United Kingdom"
      }
    ]
  }
}
```

**To add education:** Add a new object to the `items` array.

#### `skills` — Technical expertise
```json
{
  "skills": {
    "sectionNumber": "04",
    "title": "EXPERTISE",
    "categories": [
      {
        "name": "Languages",
        "items": ["JavaScript", "TypeScript", "Go"]
      }
    ]
  }
}
```

**To add a new skill category:** Add a new `{ "name": "...", "items": [...] }` object to `categories`.

**To add a skill to an existing category:** Add a string to that category's `items` array.

#### `contact` — Contact section
```json
{
  "contact": {
    "sectionNumber": "05",
    "title": "LET'S CONNECT",
    "description": "Contact intro text...",
    "email": "your.email@example.com",
    "socials": [
      {
        "platform": "GitHub",
        "url": "https://github.com/yourname",
        "handle": "@yourname"
      }
    ]
  }
}
```

**To add a social link:** Add a new object with `platform`, `url`, and `handle` to the `socials` array.

#### `footer` — Footer text
```json
{
  "footer": {
    "text": "Designed & Built by Your Name",
    "year": "2024"
  }
}
```

---

### `src/data/theme.json`

Controls the visual theme — colors, fonts, and particle settings.

#### Colors
```json
{
  "colors": {
    "background": "#0a0a0a",       // Main background
    "backgroundAlt": "#111111",    // Alternate background (skill tags)
    "surface": "#1a1a1a",          // Card/surface background
    "surfaceHover": "#222222",     // Surface hover state
    "text": "#ffffff",             // Primary text
    "textSecondary": "#999999",    // Secondary text
    "textMuted": "#555555",        // Muted/subtle text
    "accent": "#ffffff",           // Accent color
    "border": "#1e1e1e",           // Borders
    "borderLight": "#333333"       // Lighter borders
  }
}
```

Change any hex value to update the entire site's color scheme.

#### Fonts
```json
{
  "fonts": {
    "heading": "'Space Grotesk', sans-serif",
    "body": "'Inter', sans-serif",
    "mono": "'JetBrains Mono', monospace"
  }
}
```

Update font names here. Make sure to also add the corresponding Google Fonts `<link>` in `index.html`.

#### Particles (Three.js)
```json
{
  "particles": {
    "count": 2500,         // Number of particles (desktop)
    "countMobile": 800,    // Number of particles (mobile)
    "color": "#ffffff",    // Particle color
    "size": 2.0,           // Particle size multiplier
    "speed": 0.15,         // Animation speed
    "opacity": 0.6,        // Base opacity
    "spread": 5.0          // How spread out particles are
  }
}
```

Lower `count` and `countMobile` for better performance on slower devices.

---

## Project Structure

```
├── index.html                 # Root HTML (Vite entry)
├── vite.config.js             # Vite configuration
├── package.json
├── src/
│   ├── main.jsx               # App entry point + theme injection
│   ├── App.jsx                # Main app with scroll tracking
│   ├── store.js               # Shared state for Three.js bridge
│   ├── data/
│   │   ├── portfolio.json     # All content (edit this!)
│   │   └── theme.json         # Theme config (edit this!)
│   ├── components/
│   │   ├── Hero.jsx           # Hero/landing section
│   │   ├── About.jsx          # About section
│   │   ├── Experience.jsx     # Experience + Education
│   │   ├── Skills.jsx         # Skills grid
│   │   ├── Contact.jsx        # Contact + social links
│   │   ├── Footer.jsx         # Footer
│   │   ├── Navbar.jsx         # Navigation bar
│   │   ├── SectionIndicator.jsx # Side dot navigation
│   │   ├── Loader.jsx         # Loading screen
│   │   ├── ScrollReveal.jsx   # Scroll animation wrapper
│   │   ├── ThreeScene.jsx     # Three.js canvas setup
│   │   └── Particles.jsx      # Particle system (shaders)
│   └── styles/
│       └── global.css         # All styles
└── public/
    └── favicon.ico
```

## Deployment

### GitHub Pages

```bash
npm run deploy
```

This builds the project and deploys to the `gh-pages` branch.

### Other Platforms

Run `npm run build` and deploy the `build/` directory to any static hosting (Netlify, Vercel, etc.).

## Performance Notes

- No external 3D models — all procedural geometry
- Particle count automatically reduced on mobile
- GPU-accelerated animations via custom GLSL shaders
- Smooth scrolling via Lenis
- Lazy intersection-based reveal animations
- DPR capped at 1.5 for consistent performance
