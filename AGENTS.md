<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Silo Project Guidelines

Silo is a premium product interface ecosystem focused on helping builders create world-class digital products by combining high-fidelity UI design, frontend engineering, motion systems, and interactive case study education.

---

## 1. Core Vision

Silo is not a generic React component library. It is an educational design sandbox and a product pattern database. It values:
- **Premium Quality Over Quantity**: Fewer, meticulously refined components with custom hover, focus, disabled, and responsive states.
- **Design Education**: Explaining the *why* (Visual Hierarchy, Spacing, Typography, Motion) alongside the *how* (React, Tailwind CSS v4).
- **Originality**: Creating a unique design language borrowing principles from craft-focused tools (Linear, Stripe, Vercel, Apple, Framer).

---

## 2. Technology & Coding Rules

- **Stack**: Next.js App Router, React 19, TypeScript, Tailwind CSS v4.
- **Build From Scratch**: Do NOT use pre-built components (e.g., shadcn/ui, Radix, Material UI, Chakra UI). Everything must be implemented from raw HTML/CSS/Tailwind elements.
- **Zero Heavy Dependencies**: Keep external utilities at a minimum.
- **Component isolation**: When rendering elements in grids or play spaces, always mount them as React Elements (e.g. `<ComponentPreview />`) rather than calling raw functions (e.g. `{spec.render()}`) to isolate hook states correctly.

---

## 3. Design & Creation Rules

- **Typography**: Symmetrical hierarchy. Prefer tracking-tight configurations for display weightings and text-xs/text-sm for secondary elements.
- **Spacing**: Align grids and flex gaps strictly to standard offsets (e.g. 4px, 8px, 12px, 16px, 24px, 32px, 48px). Avoid arbitrary ad-hoc margins.
- **Motion**: Use spring transitions (`ease-spring`) and swift smooth easings (`ease-smooth`). Animation durations must be subtle (150ms to 350ms) to feel highly reactive.
- **Micro-interactions**: Hover effects should feel alive (subtle scales, glow shifts, borders fading).

---

## 4. Current Folder Structure

```
silo/
├── AGENTS.md                  # Guidelines and Source of Truth
├── src/
│   ├── app/
│   │   ├── docs/              # Installation and documentation guides
│   │   ├── components/        # Component catalog and interactive specification play space
│   │   ├── templates/         # Visual landing page stacker
│   │   └── page.tsx           # Home landing page
│   └── components/
│       ├── registry.tsx       # Component registry index
│       ├── Header.tsx         # Global header navigation
│       └── Footer.tsx         # Shared footer
```

---

## 5. Current Roadmap

### Phase 1: Modular Components Restructuring
- Restructure component codes out of the single `registry.tsx` into individual files under `src/components/ui/` (e.g., `Button.tsx`, `Input.tsx`, `Modal.tsx`) so developers can inspect and copy-paste singular files.

### Phase 2: Product Flow Patterns & Loaders
- Create onboarding screens, authentication layouts (Login, Signup, Magic link), skeleton card grids, and status notification triggers.

### Phase 3: Case Studies Section
- Establish `/case-studies` route for layout recreations, design analyses, and visual case studies.

<!-- END:nextjs-agent-rules -->