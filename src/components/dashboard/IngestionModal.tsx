import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useTransform } from '../../context/TransformContext';
import { DocumentType } from '../../types';
import { Upload, Link as LinkIcon, FileText, FileCode, CheckCircle2, AlertCircle } from 'lucide-react';

interface IngestionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IngestionModal: React.FC<IngestionModalProps> = ({ isOpen, onClose }) => {
  const { ingestDocument, isIngesting } = useTransform();
  
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'prompt'>('upload');
  const [title, setTitle] = useState('');
  const [docType, setDocType] = useState<DocumentType>('pdf');
  const [rawText, setRawText] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [error, setError] = useState<string | null>(null);



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide a document title.');
      return;
    }
    if (!rawText.trim() && activeTab !== 'url') {
      setError('Please provide document text content or paste sample data.');
      return;
    }

    setError(null);
    const textToIngest = rawText.trim() || `Ingested content from URL: ${sourceUrl}`;
    
    await ingestDocument({
      title: title.trim(),
      type: docType,
      rawText: textToIngest,
      sourceUrl: activeTab === 'url' ? sourceUrl : undefined
    });

    // Reset and close
    setTitle('');
    setRawText('');
    setSourceUrl('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ingest Source Document for Transformation" maxWidth="max-w-3xl">
      <div className="space-y-5">
        
        {/* Ingestion Source Tabs */}
        <div className="flex border-b border-slate-800 space-x-4">
          <button
            onClick={() => setActiveTab('upload')}
            className={`pb-2.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'upload' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Upload className="w-4 h-4" />
            File & Document Text
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`pb-2.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'url' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            Web URL / Article Link
          </button>
          <button
            onClick={() => setActiveTab('prompt')}
            className={`pb-2.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-colors ${
              activeTab === 'prompt' ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4" />
            Prompt & Context Notes
          </button>
        </div>



        {error && (
          <div className="p-3 bg-red-950/60 border border-red-800 text-red-300 rounded-md text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Document Title / Identifier *
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g., Q3 Security Vulnerability Briefing"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-md text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Format Type
              </label>
              <select
                value={docType}
                onChange={e => setDocType(e.target.value as DocumentType)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-md text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="pdf">PDF Document</option>
                <option value="docx">DOCX File</option>
                <option value="txt">Plain Text / Markdown</option>
                <option value="image">PNG / JPG Image (OCR)</option>
                <option value="video">Video Transcript</option>
                <option value="url">Web URL</option>
                <option value="prompt">Prompt Context</option>
              </select>
            </div>
          </div>

          {activeTab === 'url' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Web URL
              </label>
              <input
                type="url"
                value={sourceUrl}
                onChange={e => setSourceUrl(e.target.value)}
                placeholder="https://security.organization.gov/advisories/2026-001"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-md text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          )}

          {activeTab === 'upload' && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Upload File (PDF, DOCX, TXT, Image)
              </label>
              <input
                type="file"
                accept=".pdf,.docx,.txt,image/*"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setTitle(file.name);
                    if (file.name.endsWith('.pdf')) setDocType('pdf');
                    else if (file.name.endsWith('.docx')) setDocType('docx');
                    else if (file.name.endsWith('.txt')) setDocType('txt');
                    else if (file.type.startsWith('image/')) setDocType('image');
                    
                    // Simulate file reading
                    setRawText(`This text represents the parsed output from the OCR and document extraction pipeline. In a production environment, this would contain the actual text extracted from the file.`);
                  }
                }}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-md text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-sky-900 file:text-sky-300 hover:file:bg-sky-800"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Source Text Content *
            </label>
            <textarea
              value={rawText}
              onChange={e => setRawText(e.target.value)}
              rows={5}
              placeholder="Paste raw technical report text, markdown, or parsed document contents here..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-md text-xs text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-sky-500 leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              OCR + FAISS RAG Indexer Ready
            </div>
            
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 rounded-md text-xs font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isIngesting}
                className="px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-md text-xs shadow-sm transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isIngesting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Parsing & Indexing...
                  </>
                ) : (
                  'Ingest & Index Source'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};
