import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  SourceDocument, 
  GeneratedAsset, 
  AuditLogEntry, 
  OutputFormat, 
  AssetStatus, 
  DocumentType,
  ClaimCitation
} from '../types';
import { INITIAL_DOCUMENTS, INITIAL_ASSETS, INITIAL_AUDIT_LOGS } from '../data/sampleData';
import { useAuth } from './AuthContext';

interface TransformContextType {
  documents: SourceDocument[];
  activeDocument: SourceDocument | null;
  assets: GeneratedAsset[];
  activeAsset: GeneratedAsset | null;
  auditLogs: AuditLogEntry[];
  selectedFormats: OutputFormat[];
  targetAudience: string;
  targetTone: string;
  isIngesting: boolean;
  isTransforming: boolean;
  
  // Actions
  setActiveDocumentId: (id: string | null) => void;
  setActiveAssetId: (id: string | null) => void;
  setSelectedFormats: React.Dispatch<React.SetStateAction<OutputFormat[]>>;
  setTargetAudience: (aud: string) => void;
  setTargetTone: (tone: string) => void;
  
  ingestDocument: (params: { title: string; type: DocumentType; rawText: string; sourceUrl?: string }) => Promise<void>;
  generateTransformation: () => Promise<void>;
  updateAssetStatus: (assetId: string, status: AssetStatus) => void;
  updateAssetContent: (assetId: string, newContent: string) => void;
  deleteDocument: (docId: string) => void;
  clearAuditLogs: () => void;
}

const TransformContext = createContext<TransformContextType | undefined>(undefined);

export const TransformProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();

  const [documents, setDocuments] = useState<SourceDocument[]>([]);
  const [activeDocumentId, setActiveDocumentIdState] = useState<string | null>(null);
  
  const [assets, setAssets] = useState<GeneratedAsset[]>([]);
  const [activeAssetId, setActiveAssetIdState] = useState<string | null>(null);
  
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  
  const [selectedFormats, setSelectedFormats] = useState<OutputFormat[]>([
    'executive-summary',
    'advisory-note',
    'presentation-slides'
  ]);
  const [targetAudience, setTargetAudience] = useState<string>('Executive Leadership & Technical Stakeholders');
  const [targetTone, setTargetTone] = useState<string>('Professional & Direct');
  
  const [isIngesting, setIsIngesting] = useState<boolean>(false);
  const [isTransforming, setIsTransforming] = useState<boolean>(false);

  const activeDocument = documents.find(d => d.id === activeDocumentId) || null;
  const activeAsset = assets.find(a => a.id === activeAssetId) || null;

  const addAuditLog = (action: string, target: string, category: AuditLogEntry['category'], details: string) => {
    const newEntry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: `${currentUser.name} (${currentUser.role})`,
      role: currentUser.role,
      action,
      target,
      category,
      details
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  const setActiveDocumentId = (id: string | null) => {
    setActiveDocumentIdState(id);
    // Automatically select the first asset associated with this document if available
    if (id) {
      const match = assets.find(a => a.documentId === id);
      if (match) {
        setActiveAssetIdState(match.id);
      }
    }
  };

  const setActiveAssetId = (id: string | null) => {
    setActiveAssetIdState(id);
  };

  const ingestDocument = async ({ title, type, rawText, sourceUrl }: { title: string; type: DocumentType; rawText: string; sourceUrl?: string }) => {
    setIsIngesting(true);
    
    // Simulate chunking and vector indexing delay
    await new Promise(res => setTimeout(res, 800));

    const docId = `doc-${Date.now()}`;
    const paragraphs = rawText.split('\n\n').filter(p => p.trim().length > 0);

    const chunks = (paragraphs.length > 0 ? paragraphs : [rawText]).map((p, idx) => ({
      id: `chunk-${docId}-${idx + 1}`,
      documentId: docId,
      chunkIndex: idx + 1,
      sectionHeader: `Parsed Section ${idx + 1}`,
      content: p.trim(),
      confidenceScore: 0.95 + (idx % 4) * 0.01
    }));

    const newDoc: SourceDocument = {
      id: docId,
      title: title || 'Untitled Source Document',
      type,
      uploadDate: new Date().toISOString().replace('T', ' ').substring(0, 16),
      fileSize: `${(rawText.length / 1024).toFixed(1)} KB`,
      sourceUrl,
      status: 'indexed',
      chunkCount: chunks.length,
      rawText,
      chunks
    };

    setDocuments(prev => [newDoc, ...prev]);
    setActiveDocumentIdState(docId);
    setIsIngesting(false);

    addAuditLog(
      'Ingested Source Document',
      newDoc.title,
      'ingestion',
      `Parsed ${chunks.length} chunks via ${type.toUpperCase()} OCR/document parser.`
    );
  };

  const generateTransformation = async () => {
    if (!activeDocument) return;
    setIsTransforming(true);

    await new Promise(res => setTimeout(res, 1200));

    const newAssets: GeneratedAsset[] = [];
    const mainChunk = activeDocument.chunks[0] || { id: 'chunk-1', content: activeDocument.rawText, sectionHeader: 'Main Content' };

    for (const fmt of selectedFormats) {
      const assetId = `asset-${Date.now()}-${fmt}`;
      let title = '';
      let content = '';
      const citations: ClaimCitation[] = [
        {
          id: `cite-${assetId}-1`,
          claimText: mainChunk.content.substring(0, 120) + '...',
          sourceChunkId: mainChunk.id,
          confidence: 0.98,
          exactQuote: mainChunk.content.substring(0, 140),
          sourceSection: mainChunk.sectionHeader
        }
      ];

      switch (fmt) {
        case 'executive-summary':
          title = `${activeDocument.title} - Executive Summary`;
          content = `## Executive Summary\n\n### Objective & Grounding\nThis executive summary converts the primary technical document into core actionable insights.\n\n### Grounded Key Points\n1. **Core Domain**: ${activeDocument.chunks[0]?.content || activeDocument.rawText.substring(0, 150)}\n2. **Technical Scope**: Grounded RAG synthesis across ${activeDocument.chunkCount} verified document chunks.\n3. **Governance Standard**: Validated through Role-Based Access Control and claim evidence indexing.`;
          break;

        case 'advisory-note':
          title = `${activeDocument.title} - Security & Governance Advisory`;
          content = `## Security & Technical Advisory Note\n\n**Classification**: Internal Security Advisory\n**Target Audience**: ${targetAudience}\n**Tone**: ${targetTone}\n\n### Threat & Architectural Assessment\n${activeDocument.chunks[0]?.content || activeDocument.rawText.substring(0, 200)}\n\n### Recommended Actions\n- Verify claim evidence markers before implementation.\n- Maintain audit logging for all policy edits.\n- Enforce role separation (Admin vs Reviewer vs Contributor).`;
          break;

        case 'presentation-slides':
          title = `${activeDocument.title} - Presentation Slide Outline`;
          content = `## Presentation Outline (5-Slide Structure)\n\n### Slide 1: Executive Overview\n- **Title**: ${activeDocument.title}\n- **Context**: Grounded transformation from single trusted source\n\n### Slide 2: Technical Breakdown\n- **Source Scope**: ${activeDocument.chunkCount} parsed content blocks\n- **Key Finding**: ${activeDocument.chunks[0]?.content.substring(0, 100) || 'Primary content node verified'}\n\n### Slide 3: Security & Governance\n- Claim evidence tracing enabled\n- Immutable action logs recorded\n\n### Slide 4: Key Takeaways\n- Zero hallucination guarantee via RAG indexing\n- Rapid multi-format dissemination`;
          break;

        case 'infographic':
          title = `${activeDocument.title} - Infographic Data Structure`;
          content = `## Infographic Specification & Key Metrics\n\n### Primary Metric Highlights\n- **Source Document Status**: Indexed (${activeDocument.chunkCount} Chunks)\n- **Verification Standard**: 100% Claim-to-Source Grounding\n\n### Visual Flow Structure\n1. **Header Block**: ${activeDocument.title}\n2. **Core Callout**: ${activeDocument.chunks[0]?.content.substring(0, 120) || 'Main source content summary'}\n3. **Governance Pillar**: RBAC + Claim Verification + Audit Trail`;
          break;

        case 'social-posts':
          title = `${activeDocument.title} - Social Media Brief (LinkedIn / X)`;
          content = `## Social Media Content Package\n\n### LinkedIn Professional Post\nWe are sharing the technical summary of our latest architecture document: ${activeDocument.title}.\n\nKey Takeaway: ${activeDocument.chunks[0]?.content.substring(0, 160) || 'Grounded content transformation powered by RAG'}.\n\nRead the verified documentation for full governance details.\n\n---\n\n### X / Twitter Thread Post\n1/ Technical Brief: ${activeDocument.title}\n\n2/ Grounded RAG analysis ensures 100% fidelity to the original source without hallucinated details.`;
          break;

        case 'video-script':
          title = `${activeDocument.title} - Video Package Script & Storyboard`;
          content = `## Video Script & Storyboard Specification\n\n**Target Duration**: 90 Seconds\n**Target Audience**: ${targetAudience}\n\n### Scene 1 (0:00 - 0:20): Introduction\n- **Visual**: Document ingestion screen showing ${activeDocument.title}\n- **Voiceover**: "Transforming complex technical documentation into verified, multi-channel assets starts with a single trusted source."\n\n### Scene 2 (0:20 - 0:50): Core Analysis\n- **Visual**: RAG vector chunk highlighting source section: ${activeDocument.chunks[0]?.sectionHeader}\n- **Voiceover**: "Every generated summary, advisory note, and slide deck maintains direct claim-to-evidence links."\n\n### Scene 3 (0:50 - 1:30): Conclusion & Governance\n- **Visual**: Audit log confirmation banner and export options.`;
          break;
      }

      newAssets.push({
        id: assetId,
        documentId: activeDocument.id,
        format: fmt,
        title,
        audience: targetAudience,
        tone: targetTone,
        content,
        citations,
        status: 'draft',
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
      });
    }

    setAssets(prev => [...newAssets, ...prev]);
    if (newAssets.length > 0) {
      setActiveAssetIdState(newAssets[0].id);
    }
    setIsTransforming(false);

    addAuditLog(
      'Generated Multi-Format Assets',
      activeDocument.title,
      'transformation',
      `Produced ${newAssets.length} output assets (${selectedFormats.join(', ')}) with target audience: ${targetAudience}.`
    );
  };

  const updateAssetStatus = (assetId: string, newStatus: AssetStatus) => {
    setAssets(prev => prev.map(a => a.id === assetId ? { ...a, status: newStatus, updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) } : a));
    const targetAsset = assets.find(a => a.id === assetId);
    if (targetAsset) {
      addAuditLog(
        `Updated Asset Status to ${newStatus.toUpperCase()}`,
        targetAsset.title,
        'governance',
        `Asset status transitioned to ${newStatus} by user ${currentUser.name}.`
      );
    }
  };

  const updateAssetContent = (assetId: string, newContent: string) => {
    setAssets(prev => prev.map(a => a.id === assetId ? { ...a, content: newContent, updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) } : a));
    const targetAsset = assets.find(a => a.id === assetId);
    if (targetAsset) {
      addAuditLog(
        'Edited Asset Content',
        targetAsset.title,
        'transformation',
        `Manual edit saved by user ${currentUser.name}.`
      );
    }
  };

  const deleteDocument = (docId: string) => {
    const docToDelete = documents.find(d => d.id === docId);
    setDocuments(prev => prev.filter(d => d.id !== docId));
    setAssets(prev => prev.filter(a => a.documentId !== docId));
    if (activeDocumentId === docId) {
      const remaining = documents.filter(d => d.id !== docId);
      setActiveDocumentIdState(remaining[0]?.id || null);
    }
    if (docToDelete) {
      addAuditLog(
        'Deleted Document & Associated Assets',
        docToDelete.title,
        'governance',
        `Document removed by user ${currentUser.name}.`
      );
    }
  };

  const clearAuditLogs = () => {
    setAuditLogs([]);
    addAuditLog(
      'Cleared System Audit Trail',
      'System Audit Log',
      'governance',
      `Audit logs cleared by Admin user ${currentUser.name}.`
    );
  };

  return (
    <TransformContext.Provider value={{
      documents,
      activeDocument,
      assets,
      activeAsset,
      auditLogs,
      selectedFormats,
      targetAudience,
      targetTone,
      isIngesting,
      isTransforming,
      setActiveDocumentId,
      setActiveAssetId,
      setSelectedFormats,
      setTargetAudience,
      setTargetTone,
      ingestDocument,
      generateTransformation,
      updateAssetStatus,
      updateAssetContent,
      deleteDocument,
      clearAuditLogs
    }}>
      {children}
    </TransformContext.Provider>
  );
};

export const useTransform = () => {
  const context = useContext(TransformContext);
  if (!context) {
    throw new Error('useTransform must be used within a TransformProvider');
  }
  return context;
};
