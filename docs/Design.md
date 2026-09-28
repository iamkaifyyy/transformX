# Design System Specification

## Visual Philosophy
TransformX features a clean, highly structured, enterprise cybersecurity design system built for high legibility, precision, and trust. The visual system uses dark slate tones, crisp border definitions, high contrast typography, and subtle cyan/teal accents.

## Color Palette

### Base Surfaces (Dark Theme Default)
- **Background Root**: `#0f172a` (Slate 900)
- **Card / Container Surface**: `#1e293b` (Slate 800)
- **Elevated Surface / Popover**: `#334155` (Slate 700)
- **Subtle Surface Highlight**: `#1e293b` with 60% opacity

### Borders & Dividers
- **Subtle Border**: `#334155` (Slate 700)
- **Focused / Interactive Border**: `#0284c7` (Sky 600) or `#0d9488` (Teal 600)
- **Divider Line**: `#1e293b` (Slate 800)

### Text & High-Contrast Colors
- **Primary Text**: `#f8fafc` (Slate 50)
- **Secondary Text**: `#94a3b8` (Slate 400)
- **Muted Text / Metadata**: `#64748b` (Slate 500)

### Brand & Status Colors
- **Primary Action (Cyan/Sky)**: `#0284c7` (Hover: `#0369a1`, Active: `#075985`)
- **Accent Color (Teal)**: `#0d9488` (Hover: `#0f766e`)
- **Success / Grounded Verified**: `#10b981` (Emerald 500)
- **Warning / Pending Review**: `#f59e0b` (Amber 500)
- **Error / Unverified Claim**: `#ef4444` (Red 500)

*(STRICT RULE: NO PURPLE GRADIENTS, NO PURPLE BRAND COLORS)*

## Typography
- **Primary Font Family**: Inter, system-ui, -apple-system, sans-serif
- **Code / Vector / Hash Font Family**: JetBrains Mono, Fira Code, monospace

### Font Scales & Weights
- **Display Heading**: 2.25rem (36px), Line Height: 1.2, Weight: 700 Bold
- **Section Heading (H2)**: 1.5rem (24px), Line Height: 1.3, Weight: 600 SemiBold
- **Sub-heading (H3)**: 1.25rem (20px), Line Height: 1.4, Weight: 600 SemiBold
- **Body Large**: 1rem (16px), Line Height: 1.6, Weight: 400 Regular
- **Body Standard**: 0.875rem (14px), Line Height: 1.5, Weight: 400 Regular
- **Small / Metadata**: 0.75rem (12px), Line Height: 1.4, Weight: 500 Medium

*(STRICT RULE: DO NOT USE EM-DASHES IN ANY COPY OR HEADING)*

## Layout & Container Width
- **Max Container Width**: `max-w-6xl` (1152px) or `max-w-7xl` (1280px) for wide tables.
- **Padding**: `px-4 sm:px-6 lg:px-8` on containers.
- **Grid Systems**: 1 column on mobile, 2 columns on tablet, 3-4 columns on desktop where appropriate.

## Button System
Buttons MUST be rectangular with clean, subtle rounded corners.
- **Border Radius**: `rounded-md` (4px) or `rounded-lg` (8px).
- *(STRICT RULE: DO NOT USE PILL-SHAPED BUTTONS or rounded-full for buttons)*

### Button Variants
1. **Primary Button**: Background `#0284c7`, Text `#ffffff`, Hover `#0369a1`, Focus ring `focus:ring-2 focus:ring-sky-400`.
2. **Secondary Button**: Background `#334155`, Text `#f8fafc`, Hover `#475569`, Border `border border-slate-600`.
3. **Ghost / Outline Button**: Background transparent, Text `#94a3b8`, Hover background `#1e293b`, Hover text `#f8fafc`, Border `border border-slate-700`.
4. **Destructive Button**: Background `#ef4444`, Text `#ffffff`, Hover `#dc2626`.

## Card & Surface Design
- **Card Background**: `#1e293b` (Slate 800)
- **Card Border**: 1px solid `#334155` (Slate 700)
- **Card Radius**: `rounded-lg` (8px)
- **Shadow**: Subtle crisp drop-shadow (`shadow-md shadow-slate-950/40`), no excessive glow or glassmorphism.

## Iconography
- **Library**: Lucide React SVG icons strictly.
- *(STRICT RULE: DO NOT USE EMOJI ICONS ANYWHERE)*

## Micro-Interactions & Transitions
- Standard clean color transitions: `transition-colors duration-150 ease-in-out`.
- *(STRICT RULE: NO CURSOR ANIMATIONS, NO CURSOR-FOLLOWING EFFECTS, NO EXCESSIVE PARALLAX OR SCROLL ANIMATIONS)*
