import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ShieldCheck, FileText, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Platform identity */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
              <div className="w-7 h-7 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400">
                <Layers className="w-4 h-4" />
              </div>
              <span>TransformX</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Enterprise Generative AI platform for automated content transformation. Converts single trusted sources into verified summaries, advisories, presentations, infographics, and scripts.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              Team CryptoCreds
            </div>
          </div>

          {/* Col 2: Navigation & Core App */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 text-xs uppercase tracking-wider">Platform Features</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/app" className="hover:text-slate-200 transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-sky-400" />
                  Multimodal Workspace
                </Link>
              </li>
              <li>
                <Link to="/audit" className="hover:text-slate-200 transition-colors flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-teal-400" />
                  Audit Trail & Governance
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-slate-200 transition-colors">
                  System Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Compliance & Legal */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 text-xs uppercase tracking-wider">Compliance & Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="hover:text-slate-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-slate-200 transition-colors">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <span className="text-slate-400">
                  Domain: <code className="text-slate-300 font-mono">transformx.internal</code>
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Technical Specifications */}
          <div>
            <h4 className="text-slate-200 font-semibold mb-3 text-xs uppercase tracking-wider">System Specifications</h4>
            <div className="space-y-1.5 text-slate-400 text-[11px] font-mono">
              <div>Vector Engine: FAISS / RAG Index</div>
              <div>OCR Pipeline: Tesseract / PaddleOCR</div>
              <div>Governance: RBAC + Action Audit Trail</div>
              <div>Grounding Standard: Claim Evidence Verification</div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <div>
            Developed by Team CryptoCreds.
          </div>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-slate-300">Privacy</Link>
            <Link to="/terms" className="hover:text-slate-300">Terms</Link>
            <span className="text-slate-400">All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
