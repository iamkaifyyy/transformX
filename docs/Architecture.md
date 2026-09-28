# Architecture Document

## Application Overview
TransformX is structured as a modern, decoupled web application with a high-performance React (Vite / Next.js compatible) frontend, client-side RAG engine for interactive zero-dependency execution, and a RESTful FastAPI backend architecture for enterprise scalability.

## Tech Stack
- **Frontend Framework**: React 18 / TypeScript
- **Styling & Design System**: Tailwind CSS (custom enterprise dark/light slate theme)
- **Iconography**: Lucide React (strictly SVG-based; no emoji icons)
- **State Management**: React Context / Hooks for state management (Upload, Transformation, RBAC, Audit Trail)
- **Routing**: React Router DOM (Single Page Application architecture with deep linking support for `/`, `/app`, `/privacy`, `/terms`, `/audit`, `/governance`)
- **Document Parsing & Vector Engine**: Client-side chunking + embedding mock/RAG indexer backed by FastAPI RAG schema specifications.

## Folder Structure
```
TransformX/
├── docs/
│   ├── PRD.md
│   ├── Architecture.md
│   ├── Rules.md
│   ├── Phases.md
│   ├── Design.md
│   └── Memory.md (to be initialized during development)
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   └── sih_logo.png
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── DomainBanner.tsx
│   │   │   └── Modal.tsx
│   │   ├── dashboard/
│   │   │   ├── IngestionModal.tsx
│   │   │   ├── DocumentViewer.tsx
│   │   │   ├── TransformationConfig.tsx
│   │   │   ├── OutputFormatSelector.tsx
│   │   │   ├── GroundingCitationDrawer.tsx
│   │   │   └── OutputPreview.tsx
│   │   ├── governance/
│   │   │   ├── AuditTrailTable.tsx
│   │   │   ├── RoleSelector.tsx
│   │   │   └── ClaimVerificationBadge.tsx
│   │   └── views/
│   │       ├── HomeView.tsx
│   │       ├── AppWorkspaceView.tsx
│   │       ├── AuditLogsView.tsx
│   │       ├── PrivacyView.tsx
│   │       └── TermsView.tsx
│   ├── context/
│   │   ├── TransformContext.tsx
│   │   └── AuthContext.tsx
│   ├── types/
│   │   └── index.ts
│   ├── data/
│   │   └── sampleDocuments.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── index.html
├── vite.config.ts
└── tailwind.config.js
```

## Data Flow
1. **Document Ingestion**:
   - User inputs file, text, prompt, or web URL.
   - Text parsing breaks content into indexed chunks (`ChunkID`, `SourceLocation`, `TextSnippet`, `Confidence`).
2. **Transformation Request**:
   - User selects target output types (Summary, Advisory, Slides, Infographics, Social, Video).
   - Prompt specs combine source chunks with targeted format guidelines.
3. **RAG & Grounded Output Generation**:
   - Output items generated with claim-evidence links mapping every output paragraph to source Chunk IDs.
4. **Human Review & Audit Logging**:
   - Actions (Upload, Transform, Edit, Verify, Approve, Export) produce structured log entries: `{ id, timestamp, user, role, action, targetDocument, details }`.

## Authentication & Security Model
- Role-Based Access Control (RBAC) with 3 roles:
  - **Admin**: Full access, system configuration, user role management, audit log clear.
  - **Reviewer**: Document upload, transformation, editing, claim verification, approval/publishing.
  - **Contributor**: Document upload, transformation draft creation, read-only audit log.
