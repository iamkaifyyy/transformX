import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-6 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-sky-400 font-mono">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          TransformX Compliance Standard
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Effective Date: September 28, 2026 | Domain: transformx.internal</p>
      </div>

      {/* Content Body */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 sm:p-8 space-y-6 text-xs text-slate-300 leading-relaxed">
        
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <Lock className="w-4 h-4 text-sky-400" />
            1. Overview & Scope
          </h2>
          <p>
            TransformX ("Platform", "we", "our") is built specifically to process technical reports, security advisories, and organizational content. We prioritize strict data sovereignty, role-based governance, and source-grounded vector processing without unauthorized data monetization or unverified third-party analytics.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-teal-400" />
            2. Data Ingestion & Processing Principles
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-300">
            <li><strong>Source Document Storage</strong>: Uploaded PDF, DOCX, text files, and OCR image data are stored securely within isolated workspace indices.</li>
            <li><strong>Vector Indexing</strong>: Text passages are parsed into semantic chunks for local Retrieval-Augmented Generation (RAG) vector retrieval.</li>
            <li><strong>Zero Public Model Retraining</strong>: Ingested documents and generated outputs are never used to train public foundation models without explicit enterprise administrator consent.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            3. Audit Logging & Governance Data
          </h2>
          <p>
            To maintain accountability for security advisories and sensitive publications, TransformX records administrative audit events (including user IDs, role designations, document titles, timestamped status transitions, and claim verification actions). Audit logs are accessible strictly through Role-Based Access Control (RBAC) rules.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            4. User Rights & Data Retention
          </h2>
          <p>
            Users and organization administrators retain complete ownership of all ingested source files and generated transformation assets. Documents and associated audit logs may be deleted permanently by authorized Administrators via the workspace console.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            5. Contact & Security Officers
          </h2>
          <p>
            For privacy inquiries or enterprise governance questions, contact Team CryptoCreds at <code className="text-slate-200 bg-slate-950 px-1.5 py-0.5 rounded font-mono">security@crypto-creds.internal</code>.
          </p>
        </section>

      </div>

    </div>
  );
};
