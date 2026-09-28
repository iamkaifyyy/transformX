import React, { useState } from 'react';
import { useTransform } from '../../context/TransformContext';
import { FileText, Plus, Trash2, Eye, Database, Layers, CheckCircle2, ChevronRight, Hash } from 'lucide-react';
import { IngestionModal } from './IngestionModal';

export const DocumentViewer: React.FC = () => {
  const { documents, activeDocument, setActiveDocumentId, deleteDocument } = useTransform();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'chunks' | 'raw'>('chunks');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-sm flex flex-col h-full overflow-hidden">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-850 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-sky-400" />
          <h2 className="text-sm font-semibold text-slate-100">Source Documents ({documents.length})</h2>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-md text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          Ingest Document
        </button>
      </div>

      {/* Document Selector Ribbon */}
      <div className="p-2 bg-slate-950 border-b border-slate-800 overflow-x-auto flex items-center gap-2">
        {documents.map(doc => (
          <button
            key={doc.id}
            onClick={() => setActiveDocumentId(doc.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-2 border ${
              activeDocument?.id === doc.id 
                ? 'bg-slate-800 border-sky-500 text-sky-300 shadow-sm' 
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span className="truncate max-w-[180px]">{doc.title}</span>
            <span className="text-[10px] font-mono px-1 rounded bg-slate-950 text-slate-400 border border-slate-800">
              {doc.type.toUpperCase()}
            </span>
          </button>
        ))}
      </div>

      {/* Active Document Body */}
      {activeDocument ? (
        <div className="p-4 flex-1 overflow-y-auto space-y-4">
          
          {/* Metadata Banner */}
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              <div className="flex items-center gap-2 text-slate-200 font-semibold mb-1">
                <Layers className="w-4 h-4 text-teal-400" />
                {activeDocument.title}
              </div>
              <div className="flex items-center gap-4 text-slate-400 text-[11px] font-mono">
                <span>Type: <strong className="text-slate-300 uppercase">{activeDocument.type}</strong></span>
                <span>Size: <strong className="text-slate-300">{activeDocument.fileSize || 'N/A'}</strong></span>
                <span>Chunks: <strong className="text-slate-300">{activeDocument.chunkCount}</strong></span>
                <span>Uploaded: <strong className="text-slate-300">{activeDocument.uploadDate}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex border border-slate-800 rounded-md overflow-hidden bg-slate-900">
                <button
                  onClick={() => setActiveTab('chunks')}
                  className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    activeTab === 'chunks' ? 'bg-sky-950 text-sky-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  RAG Chunks ({activeDocument.chunks.length})
                </button>
                <button
                  onClick={() => setActiveTab('raw')}
                  className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    activeTab === 'raw' ? 'bg-sky-950 text-sky-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Raw Source Text
                </button>
              </div>

              {documents.length > 1 && (
                <button
                  onClick={() => deleteDocument(activeDocument.id)}
                  className="p-1.5 bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-900 rounded-md transition-colors"
                  title="Remove Document"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* View Tab Contents */}
          {activeTab === 'chunks' ? (
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Vector Indexed Semantic Passages</span>
                <span className="text-[11px] text-slate-400 font-mono">FAISS Index Score threshold: &gt; 0.90</span>
              </div>

              <div className="space-y-2.5">
                {activeDocument.chunks.map(chunk => (
                  <div key={chunk.id} className="p-3 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-lg space-y-2 transition-colors">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 font-mono font-medium text-sky-400">
                        <Hash className="w-3.5 h-3.5 text-slate-500" />
                        <span>Chunk #{chunk.chunkIndex}</span>
                        <span className="text-slate-300 font-sans font-semibold">[{chunk.sectionHeader}]</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Match Score: {(chunk.confidenceScore * 100).toFixed(0)}%
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-900/60 p-2.5 rounded border border-slate-850">
                      {chunk.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <div className="text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
                {activeDocument.rawText}
              </div>
            </div>
          )}

        </div>
      ) : (
        <div className="p-8 text-center text-slate-400 space-y-3">
          <FileText className="w-10 h-10 mx-auto text-slate-600" />
          <p className="text-xs">No source document selected. Click below to ingest a technical document.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-md text-xs font-medium transition-colors"
          >
            Ingest Document
          </button>
        </div>
      )}

      {/* Ingestion Modal Trigger */}
      <IngestionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
