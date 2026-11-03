import React, { useState, useMemo, useRef } from 'react';
import { Bookmark, CheckCircle2, Download, Upload, StickyNote, History, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ALL_FORMULAS } from '../data/allFormulas';
import { FormulaCard } from './FormulaCard';

export const BookmarksView: React.FC = () => {
  const {
    bookmarkedIds,
    revisedIds,
    recentFormulaIds,
    formulaNotes,
    exportUserData,
    importUserData,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'bookmarks' | 'revised' | 'notes' | 'recents'>('bookmarks');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const bookmarkedFormulas = useMemo(() => {
    return ALL_FORMULAS.filter((f) => bookmarkedIds.includes(f.id));
  }, [bookmarkedIds]);

  const revisedFormulas = useMemo(() => {
    return ALL_FORMULAS.filter((f) => revisedIds.includes(f.id));
  }, [revisedIds]);

  const notedFormulas = useMemo(() => {
    return ALL_FORMULAS.filter((f) => !!formulaNotes[f.id]);
  }, [formulaNotes]);

  const recentFormulas = useMemo(() => {
    return recentFormulaIds
      .map((id) => ALL_FORMULAS.find((f) => f.id === id))
      .filter((f): f is typeof ALL_FORMULAS[0] => !!f);
  }, [recentFormulaIds]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importUserData(content);
      if (success) {
        setImportStatus('Progress imported successfully!');
      } else {
        setImportStatus('Invalid JSON backup file.');
      }
      setTimeout(() => setImportStatus(null), 3500);
    };
    reader.readAsText(file);
  };

  // Overall syllabus completion
  const totalLibraryFormulas = ALL_FORMULAS.length;
  const revisedCount = revisedIds.length;
  const progressPercent = Math.round((revisedCount / totalLibraryFormulas) * 100);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Top Banner with Real Progress */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-sky-600 dark:text-sky-400">
            Personal Preparation Dashboard
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
            Revision & Notebook Status
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            100% stored in browser LocalStorage. No account required, completely private.
          </p>
        </div>

        {/* Real Progress Meter */}
        <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-6">
          <div className="text-right">
            <div className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono">
              {progressPercent}%
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              {revisedCount} / {totalLibraryFormulas} formulas revised
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportUserData}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
              title="Download backup file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
              title="Upload previous backup"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {importStatus && (
        <div className="p-3 rounded-lg bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300 text-xs font-medium">
          {importStatus}
        </div>
      )}

      {/* Sub Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-2 text-xs">
        <button
          onClick={() => setActiveSubTab('bookmarks')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-bold transition-colors whitespace-nowrap shrink-0 ${
            activeSubTab === 'bookmarks'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Bookmarked ({bookmarkedFormulas.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('revised')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-bold transition-colors whitespace-nowrap shrink-0 ${
            activeSubTab === 'revised'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Revised ({revisedFormulas.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('notes')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-bold transition-colors whitespace-nowrap shrink-0 ${
            activeSubTab === 'notes'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <StickyNote className="w-3.5 h-3.5" />
          <span>With Notes ({notedFormulas.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('recents')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg font-bold transition-colors whitespace-nowrap shrink-0 ${
            activeSubTab === 'recents'
              ? 'bg-sky-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>Recently Viewed ({recentFormulas.length})</span>
        </button>
      </div>

      {/* Formulas Content Grid */}
      <div>
        {activeSubTab === 'bookmarks' && (
          bookmarkedFormulas.length === 0 ? (
            <div className="py-16 text-center text-slate-500 dark:text-slate-400 text-sm">
              <Bookmark className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
              <p className="font-semibold text-slate-700 dark:text-slate-300">No bookmarked formulas yet</p>
              <p className="text-xs text-slate-400 mt-1">Click the bookmark icon on any formula card to save it for quick revision.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookmarkedFormulas.map((f) => (
                <FormulaCard key={f.id} formula={f} />
              ))}
            </div>
          )
        )}

        {activeSubTab === 'revised' && (
          revisedFormulas.length === 0 ? (
            <div className="py-16 text-center text-slate-500 dark:text-slate-400 text-sm">
              <CheckCircle2 className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
              <p className="font-semibold text-slate-700 dark:text-slate-300">No formulas marked as revised yet</p>
              <p className="text-xs text-slate-400 mt-1">Mark formulas as revised as you study to track your preparation progress.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {revisedFormulas.map((f) => (
                <FormulaCard key={f.id} formula={f} />
              ))}
            </div>
          )
        )}

        {activeSubTab === 'notes' && (
          notedFormulas.length === 0 ? (
            <div className="py-16 text-center text-slate-500 dark:text-slate-400 text-sm">
              <StickyNote className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
              <p className="font-semibold text-slate-700 dark:text-slate-300">No personal formula notes yet</p>
              <p className="text-xs text-slate-400 mt-1">Click the note icon on any formula card to record mnemonics and memory tips.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notedFormulas.map((f) => (
                <FormulaCard key={f.id} formula={f} />
              ))}
            </div>
          )
        )}

        {activeSubTab === 'recents' && (
          recentFormulas.length === 0 ? (
            <div className="py-16 text-center text-slate-500 dark:text-slate-400 text-sm">
              <History className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
              <p className="font-semibold text-slate-700 dark:text-slate-300">No recent formulas</p>
              <p className="text-xs text-slate-400 mt-1">Formulas opened in Bed Study Mode or clicked from search will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentFormulas.map((f) => (
                <FormulaCard key={f.id} formula={f} />
              ))}
            </div>
          )
        )}
      </div>

    </div>
  );
};
