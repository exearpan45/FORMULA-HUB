import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, X, History, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ALL_FORMULAS } from '../data/allFormulas';
import { MathView } from './MathView';
import { Formula, Subject } from '../types/formula';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchHistory,
    addSearchHistory,
    clearSearchHistory,
    activeExam,
    setSelectedSubject,
    setSelectedChapter,
    setActiveTab,
    openBedStudy,
  } = useApp();

  const [query, setQuery] = useState('');
  const [selectedSubj, setSelectedSubj] = useState<Subject | 'All'>('All');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsListRef = useRef<HTMLDivElement>(null);

  // Focus input upon open
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Filter formulas
  const filteredFormulas = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_FORMULAS.filter((f) => {
      // Exam tag match
      if (!f.examTags.includes(activeExam)) return false;

      // Subject filter
      if (selectedSubj !== 'All' && f.subject !== selectedSubj) return false;

      if (!q) return true;

      // Search matching across title, chapter, latex, variables, notes, category
      const titleMatch = f.title.toLowerCase().includes(q);
      const chapterMatch = f.chapter.toLowerCase().includes(q);
      const subjectMatch = f.subject.toLowerCase().includes(q);
      const categoryMatch = f.category.toLowerCase().includes(q);
      const latexMatch = f.latex.toLowerCase().includes(q);
      const varMatch = f.variables.some(
        (v) => v.name.toLowerCase().includes(q) || v.symbol.toLowerCase().includes(q)
      );
      const notesMatch = f.notes?.some((n) => n.toLowerCase().includes(q));

      return titleMatch || chapterMatch || subjectMatch || categoryMatch || latexMatch || varMatch || notesMatch;
    });
  }, [query, selectedSubj, activeExam]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query, selectedSubj]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < filteredFormulas.length ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filteredFormulas[selectedIndex];
      if (selected) {
        handleSelectFormula(selected);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsSearchOpen(false);
    }
  };

  const handleSelectFormula = (formula: Formula) => {
    if (query.trim()) {
      addSearchHistory(query.trim());
    }
    setIsSearchOpen(false);
    setSelectedSubject(formula.subject);
    setSelectedChapter(formula.chapter);
    setActiveTab('browse');

    // Scroll to formula card if on page
    setTimeout(() => {
      const el = document.getElementById(`formula-${formula.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  if (!isSearchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 bg-black/70 backdrop-blur-sm"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-sky-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search formulas, variables, chapters, or concepts (e.g. Newton, Carnot, Nernst, Matrix)..."
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Quick Subject Filter Strip */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-950/40 text-xs">
          <span className="text-slate-400 font-medium mr-1">Subject:</span>
          {(['All', 'Physics', 'Chemistry', 'Mathematics'] as const).map((subj) => (
            <button
              key={subj}
              onClick={() => setSelectedSubj(subj)}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                selectedSubj === subj
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {subj}
            </button>
          ))}
          <span className="ml-auto text-slate-400 text-[11px]">
            {filteredFormulas.length} results
          </span>
        </div>

        {/* Recent Searches (when query is empty) */}
        {!query && searchHistory.length > 0 && (
          <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800/40 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <History className="w-3.5 h-3.5 shrink-0 text-slate-400" />
              <span className="font-semibold text-slate-400 shrink-0">Recent:</span>
              {searchHistory.map((term, i) => (
                <button
                  key={i}
                  onClick={() => setQuery(term)}
                  className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors whitespace-nowrap"
                >
                  {term}
                </button>
              ))}
            </div>
            <button
              onClick={clearSearchHistory}
              className="text-[11px] text-slate-400 hover:text-rose-500 shrink-0 ml-2"
            >
              Clear
            </button>
          </div>
        )}

        {/* Results List */}
        <div ref={resultsListRef} className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredFormulas.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400 text-sm">
              <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">No matching formulas found</p>
              <p className="text-xs text-slate-400">
                Try searching by topic like <span className="text-sky-500">"optics"</span>, <span className="text-sky-500">"equilibrium"</span>, or <span className="text-sky-500">"integration"</span>.
              </p>
            </div>
          ) : (
            filteredFormulas.map((f, idx) => (
              <div
                key={f.id}
                onClick={() => handleSelectFormula(f)}
                className={`p-3 rounded-xl cursor-pointer transition-colors flex items-center justify-between gap-3 ${
                  idx === selectedIndex
                    ? 'bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                    <span className="font-semibold text-sky-600 dark:text-sky-400">{f.subject}</span>
                    <span>·</span>
                    <span>Class {f.class}</span>
                    <span>·</span>
                    <span className="truncate">{f.chapter}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">
                    {f.title}
                  </h4>
                  <div className="mt-1 text-xs text-slate-700 dark:text-slate-300 overflow-hidden">
                    <MathView latex={f.latex} displayMode={false} fontSize="sm" />
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSearchOpen(false);
                      openBedStudy(f.id);
                    }}
                    className="p-1 text-xs text-indigo-500 hover:text-indigo-400 hidden sm:inline-block"
                    title="Open in Bed Study Mode"
                  >
                    Bed View
                  </button>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-sky-600 dark:text-sky-400 font-medium">Exam Filter: {activeExam}</span>
        </div>
      </div>
    </div>
  );
};
