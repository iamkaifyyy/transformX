import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FileText, 
  Layers, 
  ShieldAlert, 
  UserCheck, 
  Menu, 
  X, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const Header: React.FC = () => {
  const location = useLocation();
  const { currentUser, switchRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const roles: { id: UserRole; label: string; desc: string }[] = [
    { id: 'admin', label: 'System Admin', desc: 'Full configuration & audit access' },
    { id: 'reviewer', label: 'Security Reviewer', desc: 'Claim verification & publishing approval' },
    { id: 'contributor', label: 'Content Specialist', desc: 'Document upload & draft generation' }
  ];

  return (
    <header className="bg-slate-900/90 backdrop-blur border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Tag */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 group-hover:border-sky-500 transition-colors">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-lg text-slate-100 tracking-tight flex items-center gap-2">
                  TransformX
                </span>
                <p className="text-[11px] text-slate-400 font-normal leading-tight hidden sm:block">
                  Gen AI Content Transformation Platform
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              <Link 
                to="/" 
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') ? 'bg-slate-800 text-sky-400 font-semibold' : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                Overview
              </Link>
              <Link 
                to="/app" 
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive('/app') ? 'bg-slate-800 text-sky-400 font-semibold' : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <FileText className="w-4 h-4" />
                Workspace
              </Link>
              <Link 
                to="/audit" 
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  isActive('/audit') ? 'bg-slate-800 text-sky-400 font-semibold' : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <ShieldAlert className="w-4 h-4" />
                Audit Logs
              </Link>
            </nav>
          </div>

          {/* Right Section: RBAC Selector & Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* RBAC Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-md text-xs text-slate-200 hover:border-slate-600 transition-colors"
                title="Switch Active RBAC User Role"
              >
                <UserCheck className="w-3.5 h-3.5 text-teal-400" />
                <span className="font-medium">{currentUser.name}</span>
                <span className="uppercase text-[10px] px-1.5 py-0.2 bg-slate-900 text-slate-400 rounded border border-slate-700 font-mono">
                  {currentUser.role}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-2 z-50">
                  <div className="px-3 py-1.5 border-b border-slate-700 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Role-Based Access Control (RBAC)
                  </div>
                  {roles.map(r => (
                    <button
                      key={r.id}
                      onClick={() => {
                        switchRole(r.id);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex flex-col hover:bg-slate-700/80 transition-colors ${
                        currentUser.role === r.id ? 'bg-slate-750 font-semibold border-l-2 border-sky-400' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between text-slate-100">
                        <span>{r.label}</span>
                        {currentUser.role === r.id && (
                          <span className="text-[10px] text-teal-400 font-mono">Active</span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 font-normal">{r.desc}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Launch App Button */}
            <Link
              to="/app"
              className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs rounded-md shadow-sm transition-colors flex items-center gap-1.5"
            >
              Open Workspace
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-slate-800 border border-slate-700 rounded-md text-slate-300 hover:text-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-3">
          <nav className="flex flex-col space-y-1">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-sm text-slate-200 hover:bg-slate-800"
            >
              Overview
            </Link>
            <Link 
              to="/app" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-sm text-slate-200 hover:bg-slate-800"
            >
              Workspace
            </Link>
            <Link 
              to="/audit" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-sm text-slate-200 hover:bg-slate-800"
            >
              Audit Logs
            </Link>
            <Link 
              to="/privacy" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-sm text-slate-200 hover:bg-slate-800"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-sm text-slate-200 hover:bg-slate-800"
            >
              Terms & Conditions
            </Link>
          </nav>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <span className="text-xs text-slate-400">Current Role: <strong className="text-sky-400 capitalize">{currentUser.role}</strong></span>
            <div className="flex gap-1">
              {roles.map(r => (
                <button
                  key={r.id}
                  onClick={() => switchRole(r.id)}
                  className={`px-2 py-1 text-[11px] rounded border ${
                    currentUser.role === r.id ? 'bg-sky-900 border-sky-600 text-sky-200' : 'bg-slate-800 border-slate-700 text-slate-400'
                  }`}
                >
                  {r.id}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
