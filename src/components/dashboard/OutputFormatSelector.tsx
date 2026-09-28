import React from 'react';
import { useTransform } from '../../context/TransformContext';
import { OutputFormat } from '../../types';
import { FileText, ShieldAlert, Presentation, Layout, Share2, Video } from 'lucide-react';

export const OutputFormatSelector: React.FC = () => {
  const { assets, activeAsset, setActiveAssetId, activeDocument } = useTransform();

  const currentDocAssets = assets.filter(a => a.documentId === activeDocument?.id);

  const getFormatIcon = (fmt: OutputFormat) => {
    switch (fmt) {
      case 'executive-summary': return <FileText className="w-3.5 h-3.5" />;
      case 'advisory-note': return <ShieldAlert className="w-3.5 h-3.5" />;
      case 'presentation-slides': return <Presentation className="w-3.5 h-3.5" />;
      case 'infographic': return <Layout className="w-3.5 h-3.5" />;
      case 'social-posts': return <Share2 className="w-3.5 h-3.5" />;
      case 'video-script': return <Video className="w-3.5 h-3.5" />;
    }
  };

  const getFormatLabel = (fmt: OutputFormat) => {
    switch (fmt) {
      case 'executive-summary': return 'Executive Summary';
      case 'advisory-note': return 'Security Advisory';
      case 'presentation-slides': return 'Slides Outline';
      case 'infographic': return 'Infographic';
      case 'social-posts': return 'Social Posts';
      case 'video-script': return 'Video Script';
    }
  };

  if (currentDocAssets.length === 0) return null;

  return (
    <div className="flex border-b border-slate-800 bg-slate-900 px-4 pt-2 overflow-x-auto gap-2">
      {currentDocAssets.map(asset => {
        const isSelected = activeAsset?.id === asset.id;
        return (
          <button
            key={asset.id}
            onClick={() => setActiveAssetId(asset.id)}
            className={`pb-2 px-3 text-xs font-semibold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors ${
              isSelected 
                ? 'border-sky-500 text-sky-400 bg-slate-850 rounded-t-md' 
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-850/50 rounded-t-md'
            }`}
          >
            {getFormatIcon(asset.format)}
            <span>{getFormatLabel(asset.format)}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono uppercase ${
              asset.status === 'approved' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
              asset.status === 'in_review' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
              'bg-slate-800 text-slate-400 border border-slate-700'
            }`}>
              {asset.status.replace('_', ' ')}
            </span>
          </button>
        );
      })}
    </div>
  );
};
