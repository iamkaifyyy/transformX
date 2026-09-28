import React, { useState } from 'react';
import { useTransform } from '../../context/TransformContext';
import { useAuth } from '../../context/AuthContext';
import { GroundingCitationDrawer } from './GroundingCitationDrawer';
import { 
  FileText, 
  Copy, 
  Download, 
  Edit3, 
  Check, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Eye,
  Lock
} from 'lucide-react';

export const OutputPreview: React.FC = () => {
  const { activeAsset, updateAssetStatus, updateAssetContent, activeDocument } = useTransform();
  const { currentUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [copied, setCopied] = useState(false);
  const [showCitationDrawer, setShowCitationDrawer] = useState(true);

  if (!activeAsset) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-12 text-center text-slate-400 space-y-3">
        <FileText className="w-10 h-10 mx-auto text-slate-600" />
        <h3 className="text-sm font-semibold text-slate-200">No Asset Generated Yet</h3>
        <p className="text-xs max-w-md mx-auto">
          Select target formats in the parameter panel above and click "Generate Multi-Format Outputs" to produce grounded transformation assets.
        </p>
      </div>
    );
  }

  const handleStartEdit = () => {
    setEditedContent(activeAsset.content);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    updateAssetContent(activeAsset.id, editedContent);
    setIsEditing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeAsset.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const element = document.createElement("a");
    const file = new Blob([activeAsset.content], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `${activeAsset.format}-${activeAsset.id}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const canApprove = currentUser.role === 'admin' || currentUser.role === 'reviewer';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex flex-col lg:flex-row shadow-sm">
      
      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Asset Header Toolbar */}
        <div className="p-4 border-b border-slate-800 bg-slate-850 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                {activeAsset.title}
              </h3>
              <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono mt-0.5">
                <span>Audience: <strong className="text-slate-300">{activeAsset.audience}</strong></span>
                <span>Tone: <strong className="text-slate-300">{activeAsset.tone}</strong></span>
                <span>Updated: <strong className="text-slate-300">{activeAsset.updatedAt}</strong></span>
              </div>
            </div>
          </div>

          {/* Status & Actions */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Status Transition Actions */}
            {activeAsset.status === 'draft' && (
              <button
                onClick={() => updateAssetStatus(activeAsset.id, 'in_review')}
                className="px-3 py-1.5 bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-800 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5" />
                Submit for Review
              </button>
            )}

            {activeAsset.status === 'in_review' && canApprove && (
              <button
                onClick={() => updateAssetStatus(activeAsset.id, 'approved')}
                className="px-3 py-1.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Approve Asset
              </button>
            )}

            {activeAsset.status === 'approved' && canApprove && (
              <button
                onClick={() => updateAssetStatus(activeAsset.id, 'published')}
                className="px-3 py-1.5 bg-sky-950 hover:bg-sky-900 text-sky-300 border border-sky-800 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Publish Asset
              </button>
            )}

            {!canApprove && activeAsset.status === 'in_review' && (
              <span className="text-[11px] text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800 font-mono flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Awaiting Reviewer Approval
              </span>
            )}

            {/* Edit Button */}
            {!isEditing ? (
              <button
                onClick={handleStartEdit}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit
              </button>
            ) : (
              <button
                onClick={handleSaveEdit}
                className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                Save Edits
              </button>
            )}

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>

            {/* Download Button */}
            <button
              onClick={handleDownloadMarkdown}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5"
              title="Download Markdown File"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>

        {/* Content Body View / Editor */}
        <div className="p-6 flex-1 overflow-y-auto bg-slate-950 text-slate-200">
          {isEditing ? (
            <textarea
              value={editedContent}
              onChange={e => setEditedContent(e.target.value)}
              rows={16}
              className="w-full p-4 bg-slate-900 border border-slate-700 rounded-md font-mono text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500 leading-relaxed"
            />
          ) : (
            <div className="prose prose-invert max-w-none text-xs leading-relaxed space-y-4 font-sans whitespace-pre-wrap">
              {activeAsset.content}
            </div>
          )}
        </div>

      </div>

      {/* Grounding Citations Side Drawer */}
      <GroundingCitationDrawer />

    </div>
  );
};
