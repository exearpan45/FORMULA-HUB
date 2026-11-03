import React, { useState, useMemo } from 'react';
import { BookOpen, CheckCircle2, ChevronRight, Filter, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ALL_FORMULAS } from '../data/allFormulas';
import { FormulaCard } from './FormulaCard';
import { Subject } from '../types/formula';

export const SubjectView: React.FC = () => {
  const {
    selectedSubject,
    setSelectedSubject,
    selectedChapter,
    setSelectedChapter,
    activeExam,
    revisedIds,
  } = useApp();

  const [classFilter, setClassFilter] = useState<'All' | '11' | '12'>('All');
  const [chapterSearch, setChapterSearch] = useState('');
  const [formulaSearch, setFormulaSearch] = useState('');

  const subjects: Subject[] = ['Physics', 'Chemistry', 'Mathematics'];
  const currentSubject: Subject = selectedSubject === 'All' ? 'Physics' : selectedSubject;

  // Filter formulas by subject and exam
  const subjectFormulas = useMemo(() => {
    return ALL_FORMULAS.filter((f) => {
      if (f.subject !== currentSubject) return false;
      if (!f.examTags.includes(activeExam)) return false;
      if (classFilter !== 'All' && f.class !== classFilter) return false;
      return true;
    });
  }, [currentSubject, activeExam, classFilter]);

  // Distinct chapters with formula count and revision progress
  const chapterList = useMemo(() => {
    const map = new Map<string, { name: string; class: string; total: number; revised: number }>();

    subjectFormulas.forEach((f) => {
      if (!map.has(f.chapter)) {
        map.set(f.chapter, { name: f.chapter, class: f.class, total: 0, revised: 0 });
      }
      const item = map.get(f.chapter)!;
      item.total += 1;
      if (revisedIds.includes(f.id)) {
        item.revised += 1;
      }
    });

    const arr = Array.from(map.values());
    if (!chapterSearch.trim()) return arr;
    return arr.filter((c) => c.name.toLowerCase().includes(chapterSearch.toLowerCase()));
  }, [subjectFormulas, revisedIds, chapterSearch]);

  // Set default chapter if none selected
  const activeChapter = selectedChapter || (chapterList[0] ? chapterList[0].name : null);

  // Formulas for the active chapter
  const activeChapterFormulas = useMemo(() => {
    if (!activeChapter) return [];
    return subjectFormulas.filter((f) => {
      if (f.chapter !== activeChapter) return false;
      if (!formulaSearch.trim()) return true;
      const q = formulaSearch.toLowerCase();
      return (
        f.title.toLowerCase().includes(q) ||
        f.latex.toLowerCase().includes(q) ||
        f.variables.some((v) => v.name.toLowerCase().includes(q) || v.symbol.toLowerCase().includes(q))
      );
    });
  }, [subjectFormulas, activeChapter, formulaSearch]);

  return (
    <div className="space-y-6">
      
      {/* Subject Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-1 sm:gap-2">
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => {
                setSelectedSubject(s);
                setSelectedChapter(null);
              }}
              className={`px-4 py-2 text-sm font-bold rounded-xl transition-all whitespace-nowrap ${
                currentSubject === s
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Class Filter */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold mr-1">Class:</span>
          {(['All', '11', '12'] as const).map((c) => (
            <button
              key={c}
              onClick={() => setClassFilter(c)}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                classFilter === c
                  ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {c === 'All' ? 'All Classes' : `Class ${c}`}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Layout: Sidebar Chapters + Main Formula Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Chapter List Navigation */}
        <aside className="lg:col-span-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Chapters ({chapterList.length})
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">
              Exam: {activeExam}
            </span>
          </div>

          {/* Quick Chapter Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={chapterSearch}
              onChange={(e) => setChapterSearch(e.target.value)}
              placeholder="Filter chapters..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
            />
          </div>

          {/* Chapter Buttons List */}
          <div className="space-y-1 max-h-[600px] overflow-y-auto pr-1">
            {chapterList.map((ch) => {
              const isSelected = activeChapter === ch.name;
              const percent = Math.round((ch.revised / ch.total) * 100);

              return (
                <button
                  key={ch.name}
                  onClick={() => {
                    setSelectedChapter(ch.name);
                    setFormulaSearch('');
                  }}
                  className={`w-full text-left p-2.5 rounded-lg transition-colors flex items-center justify-between text-xs group ${
                    isSelected
                      ? 'bg-sky-50 dark:bg-sky-950/50 border border-sky-300 dark:border-sky-800/80 text-sky-900 dark:text-sky-200 font-bold'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-transparent'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="truncate">{ch.name}</div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-normal mt-0.5">
                      <span>Class {ch.class}</span>
                      <span>·</span>
                      <span>{ch.total} formulas</span>
                      {percent > 0 && (
                        <>
                          <span>·</span>
                          <span className="text-emerald-500 font-medium">{percent}% revised</span>
                        </>
                      )}
                    </div>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-sky-600 dark:text-sky-400 translate-x-0.5' : 'text-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Column: Active Chapter Formula Deck */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Chapter Top Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div>
              <div className="flex items-center gap-2 text-xs text-sky-600 dark:text-sky-400 font-semibold mb-1">
                <span>{currentSubject}</span>
                <span>·</span>
                <span>{activeChapter}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                {activeChapter}
              </h2>
            </div>

            {/* Formula filter inside active chapter */}
            <div className="relative sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={formulaSearch}
                onChange={(e) => setFormulaSearch(e.target.value)}
                placeholder="Find formula in chapter..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* List of Formula Cards */}
          {activeChapterFormulas.length === 0 ? (
            <div className="py-16 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              No formulas matched your search in this chapter.
            </div>
          ) : (
            <div className="space-y-4">
              {activeChapterFormulas.map((formula) => (
                <FormulaCard key={formula.id} formula={formula} />
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
