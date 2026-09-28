# Implementation Phases

## Phase 1: Project Setup & Base Architecture
- **Objectives**: Initialize React + TypeScript + Tailwind CSS project with Vite. Set up routing, custom domain indicator, favicon, and core layout wrappers.
- **Tasks**:
  - Scaffold React Vite application with TypeScript and Tailwind CSS.
  - Set up Lucide React icons.
  - Create standard layout structure (Header, Navigation, Footer, Domain status banner).
  - Configure SVG & ICO favicon.
- **Expected Result**: Clean compiling web shell with navigation and design system defaults.
- **Dependencies**: Node.js package setup.
- **Completion Checklist**:
  - [ ] Vite + React + TS project created.
  - [ ] Tailwind CSS configured without purple gradients or pill-button defaults.
  - [ ] Favicon files placed in public root.
  - [ ] Header & Footer components rendered.

## Phase 2: Design System & Shared UI Components
- **Objectives**: Implement reusable, accessible UI components adhering strictly to design constraints.
- **Tasks**:
  - Create Card, Button (`rounded-lg`), Badge, Modal, Tabs, and Input/Select components.
  - Configure slate/navy/teal color palette.
  - Build responsive navigation drawer for mobile and tablet views.
- **Expected Result**: Reusable UI component library ready for views and workspaces.
- **Dependencies**: Phase 1.
- **Completion Checklist**:
  - [ ] Buttons configured with rectangle rounded borders (`rounded-md` / `rounded-lg`).
  - [ ] Icons set up using Lucide React (zero emojis).
  - [ ] Modal dialogs accessible via keyboard.

## Phase 3: Content Ingestion & RAG Document Workspace
- **Objectives**: Build document ingestion interface, multimodal source parser, and RAG claim/evidence highlight workspace.
- **Tasks**:
  - Create Ingestion modal supporting PDF, DOCX, Text, Images, Prompts, and Web URLs.
  - Build sample document dataset (Security Advisories, Technical Specifications, Research Papers).
  - Implement RAG chunk viewer showing source citations and text grounding.
- **Expected Result**: Interactive source document analyzer with claim-level evidence tracking.
- **Dependencies**: Phase 2.
- **Completion Checklist**:
  - [ ] File drag & drop + text/URL tabbed upload interface.
  - [ ] Document viewer displaying parsed text chunks with confidence scores.
  - [ ] Citation drawer linking output claims back to exact source passages.

## Phase 4: GenAI Transformation Engine & Output Generator
- **Objectives**: Implement multi-format content transformer producing Executive Summaries, Advisories, Slides, Infographics, Social Posts, and Video Storyboards.
- **Tasks**:
  - Build output selection control (Audience tone, target length, output format options).
  - Implement generator pipeline producing structured grounded content for all 6 target formats.
  - Integrate claim-evidence verification badges on generated outputs.
  - Add export features (Markdown, Copy to Clipboard, JSON download, PDF print view).
- **Expected Result**: Fully functional content transformation dashboard generating 6 distinct formats from a single source.
- **Dependencies**: Phase 3.
- **Completion Checklist**:
  - [ ] Executive Summary format generator.
  - [ ] Security Advisory format generator.
  - [ ] Presentation Slide Outline generator.
  - [ ] Infographic Structure generator.
  - [ ] LinkedIn/X Social Post generator.
  - [ ] Video Package Script generator.
  - [ ] Claim verification status for generated content blocks.

## Phase 5: Enterprise Governance & Audit Trail
- **Objectives**: Implement Role-Based Access Control (RBAC), Human-in-the-Loop review status, and immutable audit logs.
- **Tasks**:
  - Build RBAC Role Switcher (Admin, Reviewer, Contributor).
  - Build Human-in-the-Loop approval workflow (Draft -> In Review -> Approved -> Published).
  - Build Audit Log view detailing action history, timestamps, user roles, and target documents.
- **Expected Result**: Complete governance and compliance management suite.
- **Dependencies**: Phase 4.
- **Completion Checklist**:
  - [ ] Role switcher changing permissions dynamically across the UI.
  - [ ] Audit log table with filterable action categories and timeline view.
  - [ ] Approval state badges on generated document items.

## Phase 6: Core Landing View & Public Pages
- **Objectives**: Build clear, human-sounding landing page explaining TransformX, plus required legal standard pages.
- **Tasks**:
  - Create main landing page (`/`) explaining problem, solution, architecture, and live demo access point.
  - Build Privacy Policy page (`/privacy`).
  - Build Terms and Conditions page (`/terms`).
- **Expected Result**: Professional, accurate public landing page free of vague jargon, fake statistics, or artificial reviews.
- **Dependencies**: Phase 5.
- **Completion Checklist**:
  - [ ] Landing page hero section with precise product description.
  - [ ] Architecture & workflow diagram section (SIH 26154 specs).
  - [ ] Privacy Policy page with clear data protection statements.
  - [ ] Terms & Conditions page with governance terms.

## Phase 7: Mobile Responsiveness, Accessibility & Quality Assurance
- **Objectives**: Perform thorough responsive testing across desktop, tablet, and mobile breakpoints. Audit text for spelling, grammar, broken links, and design rule compliance.
- **Tasks**:
  - Verify layout responsiveness on mobile (375px), tablet (768px), and desktop (1280px+).
  - Test all buttons, links, modal toggles, and state transitions.
  - Audit text to ensure no em-dashes, no purple gradients, no pill buttons, no emoji icons, and no fake numbers.
- **Expected Result**: Production-ready, verified web platform.
- **Dependencies**: Phase 6.
- **Completion Checklist**:
  - [ ] Zero console errors.
  - [ ] All navigation routes tested.
  - [ ] Mobile responsive layout confirmed.
  - [ ] Custom domain status indicator active.
