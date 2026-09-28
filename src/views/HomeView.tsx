import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Layers, 
  ShieldCheck, 
  FileText, 
  Database, 
  ArrowRight, 
  CheckCircle2, 
  FileCode, 
  Lock, 
  Cpu, 
  Share2, 
  SlidersHorizontal,
  Workflow
} from 'lucide-react';

export const HomeView: React.FC = () => {
  return (
    <div className="space-y-16 py-8">
      
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 border border-slate-700 rounded-md text-xs text-sky-400 font-mono">
          <ShieldCheck className="w-4 h-4 text-teal-400" />
          Team CryptoCreds
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-100 tracking-tight leading-tight max-w-4xl mx-auto">
          Gen AI Platform for Automated Content Transformation
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Transform single, trusted technical reports and security documentation into grounded executive summaries, advisories, slide decks, infographics, social posts, and video scripts.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            to="/app"
            className="px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg text-sm shadow-md transition-colors flex items-center gap-2"
          >
            Launch Transformation Workspace
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/audit"
            className="px-6 py-3 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <Lock className="w-4 h-4 text-teal-400" />
            Audit & Governance Logs
          </Link>
        </div>

        {/* Technical Stack Badges */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 font-mono">
          <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded">Python / FastAPI</span>
          <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded">React / TypeScript</span>
          <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded">RAG / LangChain</span>
          <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded">FAISS Vector Database</span>
          <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 rounded">Tesseract / PaddleOCR</span>
        </div>
      </section>

      {/* Core Workflow Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Workflow className="w-5 h-5 text-sky-400" />
            Technical Architecture & Data Pipeline
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            How TransformX converts complex multimodal inputs into verified multi-format assets while eliminating hallucinations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Step 1 */}
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 font-mono font-bold">
              01
            </div>
            <h3 className="text-base font-semibold text-slate-100">Multimodal Ingestion</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ingest technical PDF reports, DOCX specifications, plain text, OCR-parsed images, video context, prompts, and Web URLs into structured semantic chunks.
            </p>
            <div className="text-[11px] text-slate-400 font-mono bg-slate-950 p-2 rounded border border-slate-850">
              PDF | DOCX | TXT | OCR | Video Transcript
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400 font-mono font-bold">
              02
            </div>
            <h3 className="text-base font-semibold text-slate-100">RAG Vector Indexing</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Store and index passages in a high-performance vector database. Retrieve source context dynamically to constrain generative outputs to verifiable evidence.
            </p>
            <div className="text-[11px] text-slate-400 font-mono bg-slate-950 p-2 rounded border border-slate-850">
              FAISS / Pinecone | LangChain Embeddings
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-mono font-bold">
              03
            </div>
            <h3 className="text-base font-semibold text-slate-100">Grounded Multi-Format Output</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Generate 6 target format assets backed by claim-to-source citations, human approval workflows, and immutable security audit logs.
            </p>
            <div className="text-[11px] text-slate-400 font-mono bg-slate-950 p-2 rounded border border-slate-850">
              Summary | Advisory | Slides | Infographic | Social | Video
            </div>
          </div>

        </div>
      </section>

      {/* Multi-Format Output Types Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-teal-400" />
            Supported Output Formats
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Transform a single authoritative document into tailored communication assets for specific audience personas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
            <div className="text-sky-400 font-semibold text-sm flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Executive Summary
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              High-level brief summarizing core objectives, key technical findings, and strategic impact for executive leadership.
            </p>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
            <div className="text-teal-400 font-semibold text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Security Advisory Note
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Technical threat bulletin specifying vulnerability impact, severity ratings, CVSS scores, and mitigation steps.
            </p>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
            <div className="text-indigo-400 font-semibold text-sm flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Presentation Slide Deck
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Structured 5-slide deck outline including slide titles, bullet highlights, and speaker presentation notes.
            </p>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
            <div className="text-emerald-400 font-semibold text-sm flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Infographic Specification
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Data structure outlining visual metrics, key callouts, and layout flow for designer handoff.
            </p>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
            <div className="text-amber-400 font-semibold text-sm flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Social Media Package
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Grounded posts tailored for LinkedIn and X (Twitter) emphasizing verified findings without sensational claims.
            </p>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
            <div className="text-sky-400 font-semibold text-sm flex items-center gap-2">
              <FileCode className="w-4 h-4" />
              Video Script & Storyboard
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              90-second video script with timed scene breakdowns, visual directions, and audio voiceover text.
            </p>
          </div>

        </div>
      </section>

      {/* Governance & Integrity Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <Lock className="w-6 h-6 text-teal-400" />
            <div>
              <h2 className="text-lg font-bold text-slate-100">Security Governance & Source Grounding</h2>
              <p className="text-xs text-slate-400">Enforcing strict enterprise verification standards for sensitive organizational assets.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Claim-to-Evidence Traceability
              </h3>
              <p className="leading-relaxed">
                Every generated paragraph links to exact source text passages and vector chunk IDs, giving reviewers clear visibility into original evidence.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-slate-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Role-Based Access Control (RBAC)
              </h3>
              <p className="leading-relaxed">
                Separates responsibilities across Admin, Reviewer, and Contributor roles to control who can ingest content, edit drafts, approve advisories, or export final assets.
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-center">
            <Link
              to="/app"
              className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-md text-xs transition-colors flex items-center gap-2"
            >
              Test Transformation Pipeline
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
