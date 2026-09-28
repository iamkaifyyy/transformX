export type DocumentType = 'pdf' | 'docx' | 'txt' | 'image' | 'video' | 'prompt' | 'url';

export interface ParsedChunk {
  id: string;
  documentId: string;
  chunkIndex: number;
  content: string;
  confidenceScore: number; // e.g. 0.98
  sectionHeader: string;
}

export interface SourceDocument {
  id: string;
  title: string;
  type: DocumentType;
  uploadDate: string;
  fileSize?: string;
  sourceUrl?: string;
  status: 'processing' | 'indexed' | 'error';
  chunkCount: number;
  rawText: string;
  chunks: ParsedChunk[];
}

export type OutputFormat = 
  | 'executive-summary' 
  | 'advisory-note' 
  | 'presentation-slides' 
  | 'infographic' 
  | 'social-posts' 
  | 'video-script';

export interface ClaimCitation {
  id: string;
  claimText: string;
  sourceChunkId: string;
  confidence: number;
  exactQuote: string;
  sourceSection: string;
}

export type AssetStatus = 'draft' | 'in_review' | 'approved' | 'published';

export interface GeneratedAsset {
  id: string;
  documentId: string;
  format: OutputFormat;
  title: string;
  audience: string;
  tone: string;
  content: string;
  citations: ClaimCitation[];
  status: AssetStatus;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'admin' | 'reviewer' | 'contributor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: UserRole;
  action: string;
  target: string;
  category: 'ingestion' | 'transformation' | 'governance' | 'export';
  details: string;
}
