import React from 'react';
import { useTransform } from '../../context/TransformContext';
import { OutputFormat } from '../../types';
import { Settings, Sparkles, CheckSquare, Square, Target, SlidersHorizontal, ArrowRight } from 'lucide-react';

export const TransformationConfig: React.FC = () => {
  const { 
    selectedFormats, 
    setSelectedFormats, 
    targetAudience, 
    setTargetAudience, 
    targetTone, 
    setTargetTone,
    generateTransformation,
    isTransforming,
    activeDocument
  } = useTransform();

  const formats: { id: OutputFormat; label: string; desc: string }[] = [
    { id: 'executive-summary', label: 'Executive Summary', desc: 'High-level concise briefing for leadership' },
    { id: 'advisory-note', label: 'Security Advisory Note', desc: 'Actionable technical assessment & mitigation' },
    { id: 'presentation-slides', label: 'Presentation Slides Outline', desc: 'Structured 5-slide deck outline' },
    { id: 'infographic', label: 'Infographic Specification', desc: 'Visual metrics & layout breakdown' },
    { id: 'social-posts', label: 'Social Posts (LinkedIn / X)', desc: 'Concise verified social media copy' },
    { id: 'video-script', label: 'Video Script & Storyboard', desc: '90-second script & scene breakdown' }
  ];

  const toggleFormat = (id: OutputFormat) => {
    setSelectedFormats(prev => 
      prev.includes(id) ? (prev.length > 1 ? prev.filter(f => f !== id) : prev) : [...prev, id]
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 space-y-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-sky-400" />
          <h2 className="text-sm font-semibold text-slate-100">Transformation Parameters</h2>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Source: <strong className="text-slate-200">{activeDocument?.title || 'None'}</strong>
        </span>
      </div>

      {/* Format Checkboxes */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-300">
          Target Output Formats (Select one or more)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {formats.map(fmt => {
            const isSelected = selectedFormats.includes(fmt.id);
            return (
              <button
                key={fmt.id}
                type="button"
                onClick={() => toggleFormat(fmt.id)}
                className={`p-3 rounded-lg border text-left transition-colors flex items-start gap-2.5 ${
                  isSelected 
                    ? 'bg-slate-800/90 border-sky-500 text-sky-200' 
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-300'
                }`}
              >
                <div className="mt-0.5 text-sky-400">
                  {isSelected ? <CheckSquare className="w-4 h-4 text-sky-400" /> : <Square className="w-4 h-4 text-slate-600" />}
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-100">{fmt.label}</div>
                  <div className="text-[11px] text-slate-400 leading-normal">{fmt.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Audience & Tone Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-teal-400" />
            Target Audience Profile
          </label>
          <input
            type="text"
            value={targetAudience}
            onChange={e => setTargetAudience(e.target.value)}
            placeholder="e.g. Executive Leadership & Technical Evaluators"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-md text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
            <Settings className="w-3.5 h-3.5 text-sky-400" />
            Communication Tone & Style
          </label>
          <select
            value={targetTone}
            onChange={e => setTargetTone(e.target.value)}
            className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-md text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="Professional & Direct">Professional & Direct</option>
            <option value="Technical & Analytical">Technical & Analytical</option>
            <option value="Executive Briefing">Executive Briefing</option>
            <option value="Actionable Guidance">Actionable Guidance</option>
          </select>
        </div>
      </div>

      {/* Execute Button */}
      <div className="pt-2 flex justify-end">
        <button
          onClick={generateTransformation}
          disabled={isTransforming || !activeDocument}
          className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-md text-xs shadow-md transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {isTransforming ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Generating Grounded Multi-Format Assets...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-sky-200" />
              Generate Multi-Format Outputs ({selectedFormats.length})
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

    </div>
  );
};
