# Development Rules & Constraints

## Strict Design Prohibitions
1. **NO Purple Gradients**: Do not use purple gradients anywhere in the design or component styles. Use dark slate, deep navy, clean zinc/neutral, and subtle teal or cyan accents.
2. **NO Pill-Shaped Buttons**: Buttons must use subtle border-radius (`rounded-md` or `rounded-lg`). Do NOT use `rounded-full` on buttons or primary CTA elements.
3. **NO Emoji Icons**: Do NOT use emoji characters (`🚀`, `✨`, `🔥`, etc.) in the UI or copy. Use Lucide React SVG icons strictly.
4. **NO Fake Metrics, Reviews, or Testimonials**: Do NOT fabricate customer numbers, rating stars, user testimonials, revenue stats, or company partner logos. Only display real architectural facts and functional data.
5. **NO Vague Hero Copy**: Hero text must clearly state what TransformX does: an enterprise Gen AI platform for grounded content transformation across multimodal sources.
6. **NO Excessive Animations or Cursor Effects**: Avoid cursor-following effects, parallax scrolling, or heavy animations. Use standard Tailwind transitions (`transition-colors duration-150`).
7. **NO AI-Slopped Imagery**: Do NOT use artificial stock photos or generic AI face placeholders. Use SVG vectors, standard document previews, and structured technical flow diagrams.
8. **NO Em-Dashes**: Do NOT use em-dashes (`—` or `--`) anywhere in titles, subheaders, body text, or UI labels. Use en-dashes (`-`) with spaces or standard punctuation.
9. **Constrained Layout Container**: Keep main container widths constrained (maximum `max-w-6xl` or `max-w-7xl` with `px-4 sm:px-6 lg:px-8`). Avoid overly wide full-width screen stretches for text content.
10. **Consistency**: Maintain exact color tokens, typography scales, card layouts, and button states throughout all routes.

## Mandatory Website Requirements Before Completion
1. Custom domain connection indicator and status header.
2. Proper SVG & ICO favicon setup.
3. Completely clean build without "Made with AI" or generic builder tags.
4. Functional Privacy Policy page (`/privacy`).
5. Functional Terms and Conditions page (`/terms`).
6. 100% Mobile, Tablet, and Desktop responsive layout.
7. Zero broken links or non-functional buttons.
8. Proper navigation, routing, and browser back/forward history.
9. Verified image/asset links.
10. Strict spelling and grammatical accuracy.
11. No placeholder text (`Lorem Ipsum`, `TBD`, `Insert text here`).
12. Zero fabricated claims.

## Coding Conventions
- **TypeScript**: Strict mode enabled. No `any` types.
- **Components**: Modular, functional components with clear prop interfaces.
- **Styling**: Utility-first Tailwind CSS with consistent color palette tokens.
- **Accessibility**: ARIA labels on buttons, keyboard focus rings (`focus:ring-2 focus:ring-slate-400 focus:outline-none`), semantic HTML tags (`main`, `nav`, `header`, `footer`, `section`, `article`).
