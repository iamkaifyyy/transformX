import React, { useState } from 'react';
import { useTransform } from '../../context/TransformContext';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Search, Filter, Trash2, ShieldAlert, Lock, CheckCircle2, Clock, User } from 'lucide-react';

export const AuditTrailTable: React.FC = () => {
  const { auditLogs, clearAuditLogs } = useTransform();
  const { currentUser } = useAuth();
  
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredLogs = auditLogs.filter(log => {
    const matchesCategory = filterCategory === 'all' || log.category === filterCategory;
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-sm flex flex-col h-full">
      
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-slate-850 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-teal-400" />
          <div>
            <h2 className="text-sm font-semibold text-slate-100">Immutable Audit Trail & Governance Log</h2>
            <p className="text-[11px] text-slate-400">Captures every document ingestion, transformation job, status change, and user action.</p>
          </div>
        </div>

        {currentUser.role === 'admin' && (
          <button
            onClick={clearAuditLogs}
            className="px-3 py-1.5 bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-300 border border-slate-700 hover:border-red-800 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear Logs
          </button>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="p-3 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        
        {/* Category Tabs */}
        <div className="flex border border-slate-800 rounded-md overflow-hidden bg-slate-900 text-xs">
          {['all', 'ingestion', 'transformation', 'governance', 'export'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 font-medium capitalize transition-colors ${
                filterCategory === cat ? 'bg-sky-950 text-sky-300 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search audit trail..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-700 rounded-md text-xs text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>
      </div>

      {/* Audit Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono uppercase text-[10px]">
              <th className="py-2.5 px-4">Timestamp</th>
              <th className="py-2.5 px-4">User & Role</th>
              <th className="py-2.5 px-4">Action</th>
              <th className="py-2.5 px-4">Category</th>
              <th className="py-2.5 px-4">Target Item</th>
              <th className="py-2.5 px-4">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredLogs.length > 0 ? (
              filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-850/60 transition-colors">
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-200 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{log.user}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-sky-400 whitespace-nowrap">
                    {log.action}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase border ${
                      log.category === 'governance' ? 'bg-teal-950 text-teal-300 border-teal-800' :
                      log.category === 'transformation' ? 'bg-sky-950 text-sky-300 border-sky-800' :
                      log.category === 'ingestion' ? 'bg-indigo-950 text-indigo-300 border-indigo-800' :
                      'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {log.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-medium truncate max-w-[180px]">
                    {log.target}
                  </td>
                  <td className="py-3 px-4 text-slate-400 text-[11px] leading-relaxed">
                    {log.details}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500 text-xs">
                  No audit log entries match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="p-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex justify-between items-center font-mono">
        <span>Total Logged Entries: {auditLogs.length}</span>
        <span>Governance Security Standard: RBAC Active</span>
      </div>

    </div>
  );
};
