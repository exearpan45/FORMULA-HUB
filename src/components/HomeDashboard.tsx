import React, { useMemo } from 'react';
import {
  Search,
  BookOpen,
  Atom,
  FlaskConical,
  Pi,
  Sparkles,
  ArrowRight,
  Bookmark,
  CheckCircle2,
  BedDouble,
  Wrench,
  Calculator,
  Compass,
  FileText,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getSubjectStats, getGlobalStats, ALL_FORMULAS } from '../data/allFormulas';
import { FormulaCard } from './FormulaCard';
import { MathView } from './MathView';
import { Subject } from '../types/formula';

export const HomeDashboard: React.FC = () => {
  const {
    activeExam,
    setActiveExam,
    setSelectedSubject,
    setSelectedChapter,
    setActiveTab,
    setActiveTool,
    setIsSearchOpen,
    bookmarkedIds,
    recentFormulaIds,
    openBedStudy,
  } = useApp();

  const globalStats = useMemo(() => getGlobalStats(), []);

  // Daily formula spotlight (cycles by day of year so it stays deterministic)
  const dailyFormula = useMemo(() => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
    );
    const index = dayOfYear % ALL_FORMULAS.length;
    return ALL_FORMULAS[index];
  }, []);

  // Recently viewed formulas
  const recentFormulas = useMemo(() => {
    return recentFormulaIds
      .slice(0, 3)
      .map((id) => ALL_FORMULAS.find((f) => f.id === id))
      .filter((f): f is typeof ALL_FORMULAS[0] => !!f);
  }, [recentFormulaIds]);

  const handleSubjectSelect = (subject: Subject) => {
    setSelectedSubject(subject);
    setSelectedChapter(null);
    setActiveTab('browse');
  };

  const handleChapterClick = (subject: Subject, chapter: string) => {
    setSelectedSubject(subject);
    setSelectedChapter(chapter);
    setActiveTab('browse');
  };

  const highYieldChapters = [
    { subject: 'Physics' as const, chapter: 'Laws of Motion', class: '11' },
    { subject: 'Physics' as const, chapter: 'Current Electricity', class: '12' },
    { subject: 'Chemistry' as const, chapter: 'Chemical Thermodynamics', class: '11' },
    { subject: 'Chemistry' as const, chapter: 'Electrochemistry', class: '12' },
    { subject: 'Mathematics' as const, chapter: 'Integrals', class: '12' },
    { subject: 'Mathematics' as const, chapter: 'Conic Sections', class: '11' },
  ];

  return (
    <div className="space-y-12 pb-12">
      
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-10 pb-8 text-center max-w-4xl mx-auto space-y-6">
        
        {/* Exam Mode Toggle Strip */}
        <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          {(['JEE Main', 'JEE Advanced', 'NEET'] as const).map((exam) => (
            <button
              key={exam}
              onClick={() => setActiveExam(exam)}
              className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeExam === exam
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {exam}
            </button>
          ))}
        </div>

        {/* Hero Headings */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            Every Formula.{' '}
            <span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              One Destination.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            The definitive, verified digital formula reference for JEE & NEET. KaTeX typesetting,
            bed-friendly study mode, zero-lag offline access, and complete derivation nuances.
          </p>
        </div>

        {/* Big Search Bar Trigger */}
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-sky-500 dark:hover:border-sky-500 transition-all text-left group"
          >
            <div className="flex items-center gap-3 text-slate-400">
              <Search className="w-5 h-5 text-sky-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
                Search formulas, chapters, constants, or variables...
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-block text-xs font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700">
                Press ⌘K
              </span>
            </div>
          </button>
        </div>

        {/* Quick Action Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <button
            onClick={() => setActiveTab('pdf-library')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold transition-all shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>PDF Formula Library</span>
          </button>
          <button
            onClick={() => openBedStudy()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 hover:bg-indigo-100 transition-colors"
          >
            <BedDouble className="w-3.5 h-3.5" />
            <span>Bed Study Mode</span>
          </button>
          <button
            onClick={() => setActiveTab('revision')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span>Quick Flashcards</span>
          </button>
          <button
            onClick={() => {
              setActiveTool('constants');
              setActiveTab('tools');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-amber-500" />
            <span>Physical Constants</span>
          </button>
        </div>

      </section>

      {/* Featured PDF Compendiums Spotlight Banner */}
      <section className="rounded-2xl border border-sky-200/80 dark:border-sky-900/60 bg-gradient-to-r from-sky-50/80 via-indigo-50/50 to-purple-50/80 dark:from-sky-950/30 dark:via-indigo-950/20 dark:to-purple-950/30 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            <span>Publication Quality · Vector PDFs</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Comprehensive Colourful PDF Compendiums
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Download or read chapter-wise and full subject compendiums for Physics, Chemistry, and Mathematics. Typeset formulas, variables, and derivation nuances formatted for laptop and tablet reading.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('pdf-library')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
          >
            <span>Open PDF Library</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Real Subject Cards Grid (Actual Counts, Not Fake!) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Curated Subject Libraries
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            {globalStats.totalFormulas} verified formulas across {globalStats.totalChapters} chapters
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Physics Card */}
          <div
            onClick={() => handleSubjectSelect('Physics')}
            className="group cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs hover:border-sky-500 dark:hover:border-sky-500 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Atom className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Physics
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Mechanics, Electrodynamics, Optics, Thermodynamics, Modern Physics & Waves with full symbol derivations and sign conventions.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400">
                {globalStats.physics.totalChapters} Chapters · {globalStats.physics.totalFormulas} Formulas
              </span>
              <span className="text-sky-600 dark:text-sky-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Chemistry Card */}
          <div
            onClick={() => handleSubjectSelect('Chemistry')}
            className="group cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs hover:border-emerald-500 dark:hover:border-emerald-500 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <FlaskConical className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Chemistry
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Physical, Organic, and Inorganic Chemistry equations, Nernst relations, degree of unsaturation, and CFT coordination trends.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400">
                {globalStats.chemistry.totalChapters} Chapters · {globalStats.chemistry.totalFormulas} Formulas
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Mathematics Card */}
          <div
            onClick={() => handleSubjectSelect('Mathematics')}
            className="group cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs hover:border-indigo-500 dark:hover:border-indigo-500 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Pi className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Mathematics
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Calculus, Coordinate Geometry, Vectors, 3D Geometry, Algebra, Trigonometry, and Probability standard forms for JEE.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400">
                {globalStats.mathematics.totalChapters} Chapters · {globalStats.mathematics.totalFormulas} Formulas
              </span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Daily Spotlight Formula */}
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500/10 text-amber-500">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400">
                Formula of the Day
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {dailyFormula.title}
              </h3>
            </div>
          </div>

          <button
            onClick={() => openBedStudy(dailyFormula.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors shrink-0"
          >
            <BedDouble className="w-3.5 h-3.5" />
            <span>Open in Bed Mode</span>
          </button>
        </div>

        <div className="my-4 p-5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 text-center overflow-x-auto shadow-inner">
          <MathView latex={dailyFormula.latex} fontSize="xl" />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">{dailyFormula.subject}</span>
            <span>·</span>
            <span>Class {dailyFormula.class}</span>
            <span>·</span>
            <span>{dailyFormula.chapter}</span>
          </div>

          {dailyFormula.notes && dailyFormula.notes[0] && (
            <span className="italic text-slate-400 truncate max-w-md">
              Key note: {dailyFormula.notes[0]}
            </span>
          )}
        </div>
      </section>

      {/* High-Yield Chapters Quick-Access */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          High-Yield JEE & NEET Chapters
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {highYieldChapters.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleChapterClick(item.subject, item.chapter)}
              className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-sky-500 dark:hover:border-sky-500 text-left transition-all group"
            >
              <span className="text-[10px] font-semibold text-sky-600 dark:text-sky-400 block mb-1">
                {item.subject} · Cl {item.class}
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2">
                {item.chapter}
              </h4>
            </button>
          ))}
        </div>
      </section>

      {/* Recently Viewed Formulas (if any) */}
      {recentFormulas.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              Recently Studied Formulas
            </h2>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
            >
              View all history →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentFormulas.map((formula) => (
              <div
                key={formula.id}
                onClick={() => openBedStudy(formula.id)}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-sky-500 cursor-pointer transition-all shadow-xs"
              >
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
                  <span className="font-semibold text-sky-600 dark:text-sky-400">{formula.subject}</span>
                  <span>·</span>
                  <span className="truncate">{formula.chapter}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate mb-2">
                  {formula.title}
                </h4>
                <div className="p-2 rounded bg-slate-50 dark:bg-slate-950 text-xs overflow-hidden text-center">
                  <MathView latex={formula.latex} displayMode={false} fontSize="sm" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Preparation Tools Strip */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Exam Utility Toolkit
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <button
            onClick={() => {
              setActiveTool('converter');
              setActiveTab('tools');
            }}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-sky-500 text-left transition-all"
          >
            <Compass className="w-5 h-5 text-sky-500 mb-2" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Unit Converter</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">10 physical dimensions, SI multipliers & temperature scales.</p>
          </button>

          <button
            onClick={() => {
              setActiveTool('calculator');
              setActiveTab('tools');
            }}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-sky-500 text-left transition-all"
          >
            <Calculator className="w-5 h-5 text-indigo-500 mb-2" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Scientific Calculator</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Trigonometry, logarithms, factorials & history tape.</p>
          </button>

          <button
            onClick={() => {
              setActiveTool('quiz');
              setActiveTab('tools');
            }}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-sky-500 text-left transition-all"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-2" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Formula Quiz</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Challenging JEE & NEET questions with step-by-step checks.</p>
          </button>

          <button
            onClick={() => {
              setActiveTool('identities');
              setActiveTab('tools');
            }}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-sky-500 text-left transition-all"
          >
            <FileText className="w-5 h-5 text-purple-500 mb-2" />
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Identities Cheat Sheet</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Algebraic cubes, trig product-to-sum & standard integrals.</p>
          </button>

        </div>
      </section>

    </div>
  );
};
