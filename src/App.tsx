import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomeDashboard } from './components/HomeDashboard';
import { SubjectView } from './components/SubjectView';
import { QuickRevision } from './components/tools/QuickRevision';
import { ToolsHub } from './components/ToolsHub';
import { BookmarksView } from './components/BookmarksView';
import { BedStudyMode } from './components/BedStudyMode';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { OfflineBanner } from './components/OfflineBanner';
import { Footer } from './components/Footer';

import { PdfLibraryView } from './components/pdf/PdfLibraryView';
import { AdminPanel } from './components/admin/AdminPanel';

const MainLayout: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 md:py-8">
        {activeTab === 'home' && <HomeDashboard />}
        {activeTab === 'browse' && <SubjectView />}
        {activeTab === 'pdf-library' && <PdfLibraryView />}
        {activeTab === 'revision' && <QuickRevision />}
        {activeTab === 'tools' && <ToolsHub />}
        {activeTab === 'bookmarks' && <BookmarksView />}
        {activeTab === 'admin' && <AdminPanel />}
      </main>

      <Footer />

      {/* Overlays & Modals */}
      <BedStudyMode />
      <GlobalSearchModal />
      <OfflineBanner />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
