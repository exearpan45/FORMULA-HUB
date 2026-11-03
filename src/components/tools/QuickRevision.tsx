import React, { useState, useMemo } from 'react';
import { Shuffle, CheckCircle2, RotateCcw, Eye, ArrowRight, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ALL_FORMULAS } from '../../data/allFormulas';
import { MathView } from '../MathView';
import { Formula, Subject } from '../../types/formula';

export const QuickRevision: React.FC = () => {
  const { activeExam, isRevised, toggleRevised, openBedStudy } = useApp();

  const [subjectFilter, setSubjectFilter] = useState<Subject | 'All'>('All');
  const [revealed, setRevealed] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);

  // Filter pool
  const pool = useMemo(() => {
    return ALL_FORMULAS.filter((f) => {
      if (!f.examTags.includes(activeExam)) return false;
      if (subjectFilter !== 'All' && f.subject !== subjectFilter) return false;
      return true;
    });
  }, [activeExam, subjectFilter]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentFormula: Formula | undefined = pool[currentIndex] || pool[0];

  const handleNextRandom = () => {
    if (pool.length <= 1) return;
    let nextIdx = Math.floor(Math.random() * pool.length);
    if (nextIdx === currentIndex) {
      nextIdx = (nextIdx + 1) % pool.length;
    }
    setCurrentIndex(nextIdx);
    setRevealed(false);
    setSessionCount((prev) => prev + 1);
  };

  const handleNextSequential = () => {
    setCurrentIndex((prev) => (prev + 1) % pool.length);
    setRevealed(false);
    setSessionCount((prev) => prev + 1);
  };

  if (!currentFormula) {
    return (
      <div className="text-center py-16 text-slate-500">
        No formulas match current exam filter ({activeExam}).
      </div>
    );
  }

  const revised = isRevised(currentFormula.id);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Active Recall Flashcard Revision
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Test yourself before flipping: Recall variables, conditions, and exact formula signs.
          </p>
        </div>

        {/* Counter */}
        <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
          <span>Card {sessionCount + 1} reviewed</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {(['All', 'Physics', 'Chemistry', 'Mathematics'] as const).map((s) => (
          <button
            key={s}
            onClick={() => {
              setSubjectFilter(s);
              setCurrentIndex(0);
              setRevealed(false);
            }}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap shrink-0 ${
              subjectFilter === s
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Flashcard Body */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-md space-y-6">
        
        {/* Card Header */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2 font-medium">
            <span className="font-bold text-sky-600 dark:text-sky-400">{currentFormula.subject}</span>
            <span>·</span>
            <span>Class {currentFormula.class}</span>
            <span>·</span>
            <span className="truncate">{currentFormula.chapter}</span>
          </div>

          <button
            onClick={() => toggleRevised(currentFormula.id)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
              revised
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{revised ? 'Mastered' : 'Mark Mastered'}</span>
          </button>
        </div>

        {/* Prompt Title */}
        <div className="text-center py-4">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 block mb-2">
            Recall Expression For:
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            {currentFormula.title}
          </h3>
        </div>

        {/* Hidden / Revealed Formula State */}
        {!revealed ? (
          <div
            onClick={() => setRevealed(true)}
            className="py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-950/40 transition-colors group"
          >
            <Eye className="w-8 h-8 text-sky-500 mb-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Click or Tap to Reveal Formula
            </span>
            <span className="text-xs text-slate-400 mt-1">
              Verify your recall against the exact expression
            </span>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* KaTeX Box */}
            <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center overflow-x-auto">
              <MathView latex={currentFormula.latex} fontSize="xl" />
            </div>

            {/* Quick Variables */}
            {currentFormula.variables && (
              <div className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-2">
                  Variables & Symbols:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {currentFormula.variables.map((v, i) => (
                    <div key={i} className="flex items-baseline gap-1.5">
                      <span className="font-mono font-bold text-sky-600 dark:text-sky-400">{v.symbol}:</span>
                      <span className="text-slate-600 dark:text-slate-400">{v.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Notes */}
            {currentFormula.notes && currentFormula.notes[0] && (
              <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                Note: {currentFormula.notes[0]}
              </div>
            )}
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <button
            onClick={() => openBedStudy(currentFormula.id)}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Study in Bed Mode →
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNextRandom}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Random</span>
            </button>

            <button
              onClick={handleNextSequential}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-sm transition-colors"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
