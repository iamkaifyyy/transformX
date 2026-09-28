import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TransformProvider } from './context/TransformContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';

import { HomeView } from './views/HomeView';
import { AppWorkspaceView } from './views/AppWorkspaceView';
import { AuditLogsView } from './views/AuditLogsView';
import { PrivacyView } from './views/PrivacyView';
import { TermsView } from './views/TermsView';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <TransformProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 antialiased selection:bg-sky-900 selection:text-sky-100">

            {/* Platform Navigation Header */}
            <Header />

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/app" element={<AppWorkspaceView />} />
                <Route path="/audit" element={<AuditLogsView />} />
                <Route path="/privacy" element={<PrivacyView />} />
                <Route path="/terms" element={<TermsView />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Platform Footer */}
            <Footer />

          </div>
        </Router>
      </TransformProvider>
    </AuthProvider>
  );
};

export default App;
