import React from 'react';
import { AuditTrailTable } from '../components/governance/AuditTrailTable';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { ShieldCheck, UserCheck, Lock } from 'lucide-react';

export const AuditLogsView: React.FC = () => {
  const { currentUser, switchRole } = useAuth();

  const roles: { id: UserRole; label: string; desc: string }[] = [
    { id: 'admin', label: 'System Admin', desc: 'Full configuration & audit clear permissions' },
    { id: 'reviewer', label: 'Security Reviewer', desc: 'Claim verification & asset approval' },
    { id: 'contributor', label: 'Content Specialist', desc: 'Document upload & draft generation' }
  ];

  return (
    <div className="space-y-6 py-4">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Lock className="w-5 h-5 text-teal-400" />
            Audit Trail & Governance Console
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Immutable log tracking document ingestion, transformation tasks, status transitions, and user permissions.
          </p>
        </div>

        {/* RBAC Role Switcher Card */}
        <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg flex items-center gap-3">
          <UserCheck className="w-4 h-4 text-sky-400" />
          <div className="text-xs">
            <div className="text-slate-400">Active Role: <strong className="text-slate-200 capitalize">{currentUser.name} ({currentUser.role})</strong></div>
          </div>
          <div className="flex gap-1.5 ml-2">
            {roles.map(r => (
              <button
                key={r.id}
                onClick={() => switchRole(r.id)}
                className={`px-2.5 py-1 text-[11px] font-mono rounded border transition-colors ${
                  currentUser.role === r.id 
                    ? 'bg-sky-950 border-sky-600 text-sky-300 font-semibold' 
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {r.id.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Audit Table */}
      <div className="h-[680px]">
        <AuditTrailTable />
      </div>

    </div>
  );
};
