import { SourceDocument, AuditLogEntry, GeneratedAsset } from '../types';

export const INITIAL_DOCUMENTS: SourceDocument[] = [
  {
    id: 'doc-tech',
    title: 'TransformX Technical Architecture & Security Governance Specification',
    type: 'pdf',
    uploadDate: '2026-09-28 10:15',
    fileSize: '2.4 MB',
    status: 'indexed',
    chunkCount: 6,
    rawText: `Title: Gen AI Platform for Automated Content Transformation 'TransformX'. Theme: Blockchain & Cybersecurity. Team Name: CryptoCreds.
TransformX ingests multimodal content including PDF, DOCX, Plain Text, Images, Video Context, Prompts, and URLs. It processes documents through OCR (Tesseract / PaddleOCR), text chunking, and semantic vector indexing using FAISS/Pinecone. 
The GenAI engine executes Retrieval-Augmented Generation (RAG) with multimodal AI models to convert a single trusted source document into multiple distinct output formats: Executive Summary, Security Advisory Note, Presentation Slide Deck, Infographic Outline, Social Media Posts (LinkedIn/X), and Video Script Packages.
Security governance is enforced through Role-Based Access Control (RBAC), claim-to-source evidence verification, human-in-the-loop review, version control, and immutable audit logs. The system maintains source fidelity and eliminates hallucinations.`,
    chunks: [
      {
        id: 'chunk-1',
        documentId: 'doc-tech',
        chunkIndex: 1,
        sectionHeader: 'Problem Statement & Identity',
        content: "Title: Gen AI Platform for Automated Content Transformation 'TransformX'. Theme: Blockchain & Cybersecurity. Team Name: CryptoCreds.",
        confidenceScore: 0.99
      },
      {
        id: 'chunk-2',
        documentId: 'doc-tech',
        chunkIndex: 2,
        sectionHeader: 'Multimodal Ingestion Pipeline',
        content: "TransformX ingests multimodal content including PDF, DOCX, Plain Text, Images, Video Context, Prompts, and URLs. It processes documents through OCR (Tesseract / PaddleOCR), text chunking, and semantic vector indexing using FAISS/Pinecone.",
        confidenceScore: 0.98
      },
      {
        id: 'chunk-3',
        documentId: 'doc-tech',
        chunkIndex: 3,
        sectionHeader: 'GenAI RAG Transformation Engine',
        content: "The GenAI engine executes Retrieval-Augmented Generation (RAG) with multimodal AI models to convert a single trusted source document into multiple distinct output formats: Executive Summary, Security Advisory Note, Presentation Slide Deck, Infographic Outline, Social Media Posts (LinkedIn/X), and Video Script Packages.",
        confidenceScore: 0.97
      },
      {
        id: 'chunk-4',
        documentId: 'doc-tech',
        chunkIndex: 4,
        sectionHeader: 'Security & Governance System',
        content: "Security governance is enforced through Role-Based Access Control (RBAC), claim-to-source evidence verification, human-in-the-loop review, version control, and immutable audit logs. The system maintains source fidelity and eliminates hallucinations.",
        confidenceScore: 0.99
      }
    ]
  },
  {
    id: 'doc-nist-ai-600',
    title: 'NIST AI 600-1 Generative AI Risk Management Framework Advisory',
    type: 'pdf',
    uploadDate: '2026-09-27 14:30',
    fileSize: '4.1 MB',
    status: 'indexed',
    chunkCount: 4,
    rawText: `NIST AI 600-1 profile establishes guidelines for managing generative AI risks in enterprise environments. It outlines key principles including content provenance verification, retrieval grounding, privacy-preserving vector indices, and structured human approval workflows prior to multi-channel publishing.`,
    chunks: [
      {
        id: 'chunk-nist-1',
        documentId: 'doc-nist-ai-600',
        chunkIndex: 1,
        sectionHeader: 'Risk Management Framework',
        content: "NIST AI 600-1 profile establishes guidelines for managing generative AI risks in enterprise environments.",
        confidenceScore: 0.98
      },
      {
        id: 'chunk-nist-2',
        documentId: 'doc-nist-ai-600',
        chunkIndex: 2,
        sectionHeader: 'Content Provenance & Grounding',
        content: "It outlines key principles including content provenance verification, retrieval grounding, privacy-preserving vector indices, and structured human approval workflows prior to multi-channel publishing.",
        confidenceScore: 0.96
      }
    ]
  }
];

export const INITIAL_ASSETS: GeneratedAsset[] = [
  {
    id: 'asset-1',
    documentId: 'doc-tech',
    format: 'executive-summary',
    title: 'TransformX Platform Executive Briefing',
    audience: 'Executive Leadership & Project Evaluators',
    tone: 'Professional & Direct',
    status: 'approved',
    createdAt: '2026-09-28 11:00',
    updatedAt: '2026-09-28 11:30',
    content: `## Executive Overview

TransformX addresses the key challenge of converting single, authoritative documents into multiple audience-tailored communication formats without introducing hallucinated facts or manual copy-paste overhead.

### Key Capabilities
1. **Multimodal Content Ingestion**: Native parsing of PDF, DOCX, TXT, OCR images, video context, and Web URLs.
2. **Grounded Generation Engine**: RAG-driven generation with explicit claim-to-source mapping to guarantee information fidelity.
3. **Enterprise Security & Governance**: Enforces Role-Based Access Control (RBAC), human approval workflows, and immutable audit logs.
4. **Multi-Format Output Pipeline**: Simultaneously generates executive summaries, security advisory bulletins, slide deck structures, infographic outlines, social media posts, and video scripts.`,
    citations: [
      {
        id: 'cite-1',
        claimText: 'TransformX ingests multimodal content including PDF, DOCX, Plain Text, Images, Video Context, Prompts, and URLs.',
        sourceChunkId: 'chunk-2',
        confidence: 0.98,
        exactQuote: 'TransformX ingests multimodal content including PDF, DOCX, Plain Text, Images, Video Context, Prompts, and URLs.',
        sourceSection: 'Multimodal Ingestion Pipeline'
      },
      {
        id: 'cite-2',
        claimText: 'Security governance is enforced through Role-Based Access Control (RBAC), claim-to-source evidence verification, human-in-the-loop review, version control, and immutable audit logs.',
        sourceChunkId: 'chunk-4',
        confidence: 0.99,
        exactQuote: 'Security governance is enforced through Role-Based Access Control (RBAC), claim-to-source evidence verification...',
        sourceSection: 'Security & Governance System'
      }
    ]
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-101',
    timestamp: '2026-09-28 11:30:12',
    user: 'Security Lead (Reviewer)',
    role: 'reviewer',
    action: 'Approved Transformation Asset',
    target: 'TransformX Platform Executive Briefing',
    category: 'governance',
    details: 'Verified claim citations against source chunk-2 and chunk-4. Status updated to Approved.'
  },
  {
    id: 'log-100',
    timestamp: '2026-09-28 11:00:05',
    user: 'Content Specialist (Contributor)',
    role: 'contributor',
    action: 'Generated Multi-Format Output',
    target: 'Executive Summary (doc-tech)',
    category: 'transformation',
    details: 'Triggered RAG pipeline with Executive Leadership target audience configuration.'
  },
  {
    id: 'log-99',
    timestamp: '2026-09-28 10:15:44',
    user: 'System Admin (Admin)',
    role: 'admin',
    action: 'Indexed Source Document',
    target: 'TransformX Technical Architecture & Security Governance Specification',
    category: 'ingestion',
    details: 'Parsed 4 text chunks via Tesseract OCR engine. Vector indexing completed in 420ms.'
  }
];
