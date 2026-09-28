import React from 'react';
import { ShieldCheck, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

export const TermsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-sky-400 font-mono">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          TransformX Terms of Service
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">Terms and Conditions</h1>
        <p className="text-xs text-slate-400">Effective Date: September 28, 2026</p>
      </div>

      {/* Content Body */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 sm:p-8 space-y-6 text-xs text-slate-300 leading-relaxed">
        
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-sky-400" />
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using the TransformX platform (developed by Team CryptoCreds), organizations and users agree to comply with these Terms and Conditions. TransformX provides grounded content transformation services across multimodal inputs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
            2. Source Grounding & Human-in-the-Loop Review
          </h2>
          <p>
            TransformX utilizes Retrieval-Augmented Generation (RAG) and claim-evidence verification to maintain high source fidelity. However, final publishing approval for critical security advisories, vulnerability disclosures, and executive statements requires human-in-the-loop review by an authorized Security Reviewer or Admin.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            3. Acceptable Use Policy
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li>Users must not upload malicious files designed to corrupt system indices or bypass OCR parsing security.</li>
            <li>Users must respect Role-Based Access Control (RBAC) boundaries and administrative credentials.</li>
            <li>No user shall fabricate source citations or bypass verification badges when exporting public advisories.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            4. Intellectual Property & Ownership
          </h2>
          <p>
            All ingested source documents, custom prompts, vector indices, generated assets, and audit logs remain the exclusive intellectual property of the uploading organization or user. TransformX claims no ownership over user-submitted content.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            5. Limitation of Liability & Governance
          </h2>
          <p>
            TransformX is provided as an enterprise Generative AI content transformation platform. Users are responsible for verifying compliance with organization-specific publishing guidelines before external distribution.
          </p>
        </section>

      </div>

    </div>
  );
};
