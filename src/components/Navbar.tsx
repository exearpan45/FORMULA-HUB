import React from 'react';
import { Search, Moon, Sun, BookOpen, Bookmark, Wrench, BedDouble, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ExamType } from '../types/formula';
import { PWAInstallButton } from './PWAInstallButton';

export const Navbar: React.FC = () => {
  const {
    theme,
    toggleTheme,
    activeExam,
    setActiveExam,
    activeTab,
    setActiveTab,
    bookmarkedIds,
    openBedStudy,
    setIsSearchOpen,
    setSelectedSubject,
    setSelectedChapter,
  } = useApp();

  const exams: ExamType[] = ['JEE Main', 'JEE Advanced', 'NEET'];

  const handleNavClick = (tab: 'home' | 'browse' | 'revision' | 'tools' | 'bookmarks' | 'pdf-library' | 'admin') => {
    setActiveTab(tab);
    if (tab === 'home') {
      setSelectedChapter(null);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 md:gap-6 px-4 sm:px-6 h-16">
        
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          onClick={() => {
            setSelectedSubject('All');
            setSelectedChapter(null);
            setActiveTab('home');
          }}
          className="flex items-center gap-2.5 text-left group whitespace-nowrap shrink-0 focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
            ∑
          </div>
          <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap">
            FORMULA <span className="text-sky-600 dark:text-sky-400">HUB</span>
          </span>
        </button>

        {/* Zone 2: Clean 4–5 single-line navigation links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-sm font-medium text-slate-600 dark:text-slate-400">
          <button
            onClick={() => handleNavClick('home')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'home'
                ? 'text-sky-600 dark:text-sky-400 font-semibold bg-sky-500/10'
                : 'hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => handleNavClick('browse')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'browse'
                ? 'text-sky-600 dark:text-sky-400 font-semibold bg-sky-500/10'
                : 'hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Formulas</span>
          </button>
          <button
            onClick={() => handleNavClick('pdf-library')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'pdf-library'
                ? 'text-sky-600 dark:text-sky-400 font-semibold bg-sky-500/10'
                : 'hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            <span>PDF Sheets</span>
          </button>
          <button
            onClick={() => handleNavClick('revision')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'revision'
                ? 'text-sky-600 dark:text-sky-400 font-semibold bg-sky-500/10'
                : 'hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Revision
          </button>
          <button
            onClick={() => handleNavClick('tools')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'tools'
                ? 'text-sky-600 dark:text-sky-400 font-semibold bg-sky-500/10'
                : 'hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Tools</span>
          </button>
          <button
            onClick={() => handleNavClick('bookmarks')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'bookmarks'
                ? 'text-sky-600 dark:text-sky-400 font-semibold bg-sky-500/10'
                : 'hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved ({bookmarkedIds.length})</span>
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Search, Exam Mode, Bed Study, Admin, Theme) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* Quick Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Open global search (Cmd+K)"
            className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 hover:bg-slate-200/70 dark:bg-slate-900 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors whitespace-nowrap shrink-0"
          >
            <Search className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-200/80 dark:bg-slate-800 rounded">
              ⌘K
            </kbd>
          </button>

          {/* Exam Mode Selector */}
          <div className="flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            {exams.map((exam) => (
              <button
                key={exam}
                onClick={() => setActiveExam(exam)}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                  activeExam === exam
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {exam === 'JEE Advanced' ? 'JEE Adv' : exam}
              </button>
            ))}
          </div>

          {/* Bed Study Mode Button */}
          <button
            onClick={() => openBedStudy()}
            title="Open Bed-Friendly Study Mode (Distraction-Free)"
            aria-label="Bed-friendly study mode"
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800/60 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <BedDouble className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Bed Mode</span>
          </button>

          {/* Admin Panel Button */}
          <button
            onClick={() => handleNavClick('admin')}
            title="Administrator Portal (/admin)"
            aria-label="Open Admin Portal"
            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'admin'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            <span className="font-mono text-[11px]">Admin</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* PWA Install */}
          <PWAInstallButton />
        </div>

      </div>

      {/* Mobile Bottom Sub-Nav */}
      <div className="flex md:hidden items-center justify-around border-t border-slate-200 dark:border-slate-800/80 px-2 py-1.5 bg-slate-50/95 dark:bg-slate-900/95 text-[11px]">
        <button
          onClick={() => handleNavClick('home')}
          className={`py-1 px-1.5 rounded font-medium ${
            activeTab === 'home' ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Home
        </button>
        <button
          onClick={() => handleNavClick('browse')}
          className={`py-1 px-1.5 rounded font-medium ${
            activeTab === 'browse' ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Formulas
        </button>
        <button
          onClick={() => handleNavClick('pdf-library')}
          className={`py-1 px-1.5 rounded font-medium ${
            activeTab === 'pdf-library' ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          PDFs
        </button>
        <button
          onClick={() => handleNavClick('revision')}
          className={`py-1 px-1.5 rounded font-medium ${
            activeTab === 'revision' ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Revision
        </button>
        <button
          onClick={() => handleNavClick('tools')}
          className={`py-1 px-1.5 rounded font-medium ${
            activeTab === 'tools' ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Tools
        </button>
        <button
          onClick={() => handleNavClick('bookmarks')}
          className={`py-1 px-1.5 rounded font-medium ${
            activeTab === 'bookmarks' ? 'text-sky-600 dark:text-sky-400 font-semibold' : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Saved
        </button>
      </div>
    </header>
  );
};
