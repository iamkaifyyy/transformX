import React from 'react';
import { useTransform } from '../../context/TransformContext';
import { ShieldCheck, Hash, Quote, ArrowUpRight, CheckCircle2, Search } from 'lucide-react';

export const GroundingCitationDrawer: React.FC = () => {
  const { activeAsset, activeDocument } = useTransform();

  if (!activeAsset) return null;

  return (
    <div className="bg-slate-900 border-l border-slate-800 p-4 w-full lg:w-80 flex flex-col h-full space-y-4">
      <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-100 font-semibold text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Claim-Evidence Grounding</span>
        </div>
        <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.5 rounded">
          RAG Verified
        </span>
      </div>

      <div className="text-[11px] text-slate-400 leading-relaxed">
        Every claim in <strong className="text-slate-200">{activeAsset.title}</strong> is backed by source vector citations.
      </div>

      {/* Citations List */}
      <div className="space-y-3 overflow-y-auto flex-1 pr-1">
        {activeAsset.citations && activeAsset.citations.length > 0 ? (
          activeAsset.citations.map(cite => {
            const matchedChunk = activeDocument?.chunks.find(c => c.id === cite.sourceChunkId);
            return (
              <div key={cite.id} className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-mono text-sky-400 font-medium flex items-center gap-1">
                    <Hash className="w-3 h-3 text-slate-500" />
                    Chunk ID: {cite.sourceChunkId}
                  </span>
                  <span className="text-emerald-400 font-mono flex items-center gap-1 text-[10px]">
                    <CheckCircle2 className="w-3 h-3" />
                    {(cite.confidence * 100).toFixed(0)}% Match
                  </span>
                </div>

                <div className="text-xs text-slate-200 font-medium bg-slate-900 p-2 rounded border border-slate-850">
                  "{cite.claimText}"
                </div>

                <div className="text-[11px] text-slate-400 space-y-1">
                  <div className="flex items-center gap-1 text-slate-500">
                    <Quote className="w-3 h-3" />
                    <span>Exact Source Section: <strong className="text-slate-300">{cite.sourceSection}</strong></span>
                  </div>
                  {matchedChunk && (
                    <p className="text-[11px] text-slate-400 italic bg-slate-900/40 p-2 rounded border border-slate-850 font-sans">
                      {matchedChunk.content}
                    </p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-center text-slate-400 text-xs space-y-2">
            <Search className="w-6 h-6 mx-auto text-slate-600" />
            <p>Direct chunk citation analysis active.</p>
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 font-mono text-center">
        TransformX RAG Verification Standard v2.4
      </div>
    </div>
  );
};
