import React from 'react';
import { DocumentViewer } from '../components/dashboard/DocumentViewer';
import { TransformationConfig } from '../components/dashboard/TransformationConfig';
import { OutputFormatSelector } from '../components/dashboard/OutputFormatSelector';
import { OutputPreview } from '../components/dashboard/OutputPreview';
import { Layers } from 'lucide-react';

export const AppWorkspaceView: React.FC = () => {
  return (
    <div className="space-y-6 py-4">
      
      {/* Workspace Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-400" />
            TransformX Interactive Workspace
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Ingest source documents, configure audience parameters, and generate grounded multi-format outputs.
          </p>
        </div>
      </div>

      {/* Top Section: Parameter Configuration Panel */}
      <TransformationConfig />

      {/* Main Grid: Document Viewer & Output Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Col: Source Document & RAG Chunk Viewer (5 cols) */}
        <div className="lg:col-span-5 h-[720px]">
          <DocumentViewer />
        </div>

        {/* Right Col: Output Formats & Generated Asset Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <OutputFormatSelector />
          <OutputPreview />
        </div>

      </div>

    </div>
  );
};
