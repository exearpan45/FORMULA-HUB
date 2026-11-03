import React, { useEffect, useState, useMemo } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  Bookmark,
  CheckCircle2,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ALL_FORMULAS } from '../data/allFormulas';
import { MathView } from './MathView';
import { Formula } from '../types/formula';

export const BedStudyMode: React.FC = () => {
  const {
    isBedStudyOpen,
    closeBedStudy,
    bedStudyFormulaId,
    bedStudySettings,
    updateBedStudySettings,
    isBookmarked,
    toggleBookmark,
    isRevised,
    toggleRevised,
    activeExam,
    formulaNotes,
  } = useApp();

  // Filter formulas relevant to current exam
  const relevantFormulas = useMemo(() => {
    return ALL_FORMULAS.filter((f) => f.examTags.includes(activeExam));
  }, [activeExam]);

  // Find index of current formula
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (bedStudyFormulaId) {
      const idx = relevantFormulas.findIndex((f) => f.id === bedStudyFormulaId);
      if (idx !== -1) setCurrentIndex(idx);
    }
  }, [bedStudyFormulaId, relevantFormulas]);

  const currentFormula: Formula | undefined = relevantFormulas[currentIndex] || relevantFormulas[0];

  // Keyboard navigation
  useEffect(() => {
    if (!isBedStudyOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'j' || e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setCurrentIndex((prev) => (prev + 1 < relevantFormulas.length ? prev + 1 : 0));
      } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'k' || e.key.toLowerCase() === 'h') {
        e.preventDefault();
        setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : relevantFormulas.length - 1));
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeBedStudy();
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key.toLowerCase() === 'b' && currentFormula) {
        e.preventDefault();
        toggleBookmark(currentFormula.id);
      } else if (e.key.toLowerCase() === 'r' && currentFormula) {
        e.preventDefault();
        toggleRevised(currentFormula.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isBedStudyOpen, relevantFormulas.length, currentFormula, closeBedStudy, toggleBookmark, toggleRevised]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  if (!isBedStudyOpen || !currentFormula) return null;

  // Theme style mapping
  const themeBgMap = {
    navy: 'bg-slate-950 text-slate-100',
    oled: 'bg-black text-neutral-100',
    sepia: 'bg-[#181410] text-[#e8ded1]',
  };

  const cardBgMap = {
    navy: 'bg-slate-900/80 border-slate-800',
    oled: 'bg-[#0a0a0a] border-neutral-900',
    sepia: 'bg-[#211c16] border-[#362f27]',
  };

  const maxWidthMap = {
    compact: 'max-w-2xl',
    standard: 'max-w-3xl',
    wide: 'max-w-4xl',
    full: 'max-w-5xl',
  };

  const fontScaleMap = {
    normal: { title: 'text-xl', math: 'lg' as const, text: 'text-sm' },
    large: { title: 'text-2xl', math: 'xl' as const, text: 'text-base' },
    xl: { title: 'text-3xl', math: '2xl' as const, text: 'text-lg' },
    giant: { title: 'text-4xl', math: '3xl' as const, text: 'text-xl' },
  };

  const currentScale = fontScaleMap[bedStudySettings.fontSize];
  const bookmarked = isBookmarked(currentFormula.id);
  const revised = isRevised(currentFormula.id);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto transition-colors duration-200 select-none ${
        themeBgMap[bedStudySettings.theme]
      }`}
    >
      {/* Top Distraction-Free Header */}
      <header className="flex items-center justify-between px-4 sm:px-8 py-3.5 border-b border-white/5 backdrop-blur-md sticky top-0 z-10 bg-inherit">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-sky-400 font-semibold tracking-wider">
            BED STUDY MODE
          </span>
          <span className="text-xs text-white/40">·</span>
          <span className="text-xs text-white/60">
            {currentIndex + 1} of {relevantFormulas.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Settings Toggle */}
          <button
            onClick={() => setShowSettings((prev) => !prev)}
            aria-label="Adjust study settings"
            className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            title="Adjust theme & size"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            aria-label="Toggle Fullscreen"
            className="p-2 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"
            title="Toggle fullscreen (F)"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Close Bed Mode */}
          <button
            onClick={closeBedStudy}
            aria-label="Exit bed study mode"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors ml-1"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit (Esc)</span>
          </button>
        </div>
      </header>

      {/* Floating Settings Drawer */}
      {showSettings && (
        <div className="px-4 sm:px-8 py-3 border-b border-white/10 bg-black/40 backdrop-blur-lg flex flex-wrap items-center justify-between gap-4 text-xs">
          {/* Font Size Selector */}
          <div className="flex items-center gap-2">
            <span className="text-white/60 font-medium">Text Size:</span>
            {(['normal', 'large', 'xl', 'giant'] as const).map((sz) => (
              <button
                key={sz}
                onClick={() => updateBedStudySettings({ fontSize: sz })}
                className={`px-2.5 py-1 rounded capitalize font-medium transition-colors ${
                  bedStudySettings.fontSize === sz
                    ? 'bg-sky-600 text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          {/* Width Selector */}
          <div className="flex items-center gap-2">
            <span className="text-white/60 font-medium">Width:</span>
            {(['compact', 'standard', 'wide', 'full'] as const).map((w) => (
              <button
                key={w}
                onClick={() => updateBedStudySettings({ width: w })}
                className={`px-2.5 py-1 rounded capitalize font-medium transition-colors ${
                  bedStudySettings.width === w
                    ? 'bg-sky-600 text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
              >
                {w}
              </button>
            ))}
          </div>

          {/* Theme Palette */}
          <div className="flex items-center gap-2">
            <span className="text-white/60 font-medium">Theme:</span>
            <button
              onClick={() => updateBedStudySettings({ theme: 'navy' })}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                bedStudySettings.theme === 'navy' ? 'bg-sky-600 text-white' : 'bg-slate-900 text-slate-300'
              }`}
            >
              Navy
            </button>
            <button
              onClick={() => updateBedStudySettings({ theme: 'oled' })}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                bedStudySettings.theme === 'oled' ? 'bg-sky-600 text-white' : 'bg-black text-neutral-300 border border-neutral-800'
              }`}
            >
              OLED Pure Black
            </button>
            <button
              onClick={() => updateBedStudySettings({ theme: 'sepia' })}
              className={`px-2.5 py-1 rounded font-medium transition-colors ${
                bedStudySettings.theme === 'sepia' ? 'bg-[#c27c3e] text-white' : 'bg-[#2b241c] text-[#d4c3b0]'
              }`}
            >
              Warm Sepia
            </button>
          </div>
        </div>
      )}

      {/* Main Focus Reading Container */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 sm:px-8 py-8 w-full">
        <div className={`w-full ${maxWidthMap[bedStudySettings.width]} mx-auto space-y-6 transition-all`}>
          
          {/* Chapter & Subject Breadcrumb */}
          <div className="flex items-center justify-between text-xs text-white/50">
            <div className="flex items-center gap-2 font-medium">
              <span className="text-sky-400 font-bold">{currentFormula.subject}</span>
              <span>·</span>
              <span>Class {currentFormula.class}</span>
              <span>·</span>
              <span>{currentFormula.chapter}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleRevised(currentFormula.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
                  revised ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/60 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{revised ? 'Revised' : 'Mark Revised (R)'}</span>
              </button>
              <button
                onClick={() => toggleBookmark(currentFormula.id)}
                className={`p-1.5 rounded-md transition-colors ${
                  bookmarked ? 'bg-amber-500/20 text-amber-400' : 'bg-white/5 text-white/60 hover:text-white'
                }`}
                title="Bookmark (B)"
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-amber-400' : ''}`} />
              </button>
            </div>
          </div>

          {/* Large Formula Title */}
          <h1 className={`${currentScale.title} font-extrabold tracking-tight text-white leading-snug`}>
            {currentFormula.title}
          </h1>

          {/* Hero KaTeX Formula Stage */}
          <div
            className={`p-6 sm:p-10 rounded-2xl border ${cardBgMap[bedStudySettings.theme]} flex items-center justify-center shadow-2xl overflow-x-auto`}
          >
            <MathView latex={currentFormula.latex} fontSize={currentScale.math} />
          </div>

          {/* Variables and Applicability in comfortable large format */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Variables */}
            {currentFormula.variables && currentFormula.variables.length > 0 && (
              <div className={`p-5 rounded-xl border ${cardBgMap[bedStudySettings.theme]} space-y-2`}>
                <span className="text-xs uppercase tracking-wider font-bold text-sky-400 block mb-2">
                  Key Variables
                </span>
                <div className="space-y-1.5">
                  {currentFormula.variables.map((v, i) => (
                    <div key={i} className={`flex items-baseline gap-2 ${currentScale.text}`}>
                      <span className="font-mono font-bold text-sky-300 shrink-0">{v.symbol}:</span>
                      <span className="text-white/80">{v.name} {v.unit && `(${v.unit})`}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Conditions & Notes */}
            <div className={`p-5 rounded-xl border ${cardBgMap[bedStudySettings.theme]} space-y-3`}>
              {currentFormula.conditions && currentFormula.conditions.length > 0 && (
                <div>
                  <span className="text-xs uppercase tracking-wider font-bold text-amber-400 block mb-1">
                    When Applicable
                  </span>
                  <ul className={`list-disc list-inside space-y-1 text-white/80 ${currentScale.text}`}>
                    {currentFormula.conditions.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {currentFormula.notes && currentFormula.notes.length > 0 && (
                <div className="pt-2 border-t border-white/5">
                  <span className="text-xs uppercase tracking-wider font-bold text-emerald-400 block mb-1">
                    Special Case / Key Note
                  </span>
                  <ul className={`list-disc list-inside space-y-1 text-white/80 ${currentScale.text}`}>
                    {currentFormula.notes.map((n, i) => (
                      <li key={i}>{n}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          </div>

          {/* Personal Note if present */}
          {formulaNotes[currentFormula.id] && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm">
              <span className="font-bold text-xs uppercase tracking-wider block text-amber-400 mb-1">
                My Note:
              </span>
              <p>{formulaNotes[currentFormula.id]}</p>
            </div>
          )}

        </div>
      </main>

      {/* Bottom Sticky Control Bar with Big Next / Previous Buttons */}
      <footer className="sticky bottom-0 z-10 px-4 sm:px-8 py-3.5 border-t border-white/5 backdrop-blur-md bg-inherit flex items-center justify-between">
        
        {/* Previous Button */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : relevantFormulas.length - 1))}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all active:scale-95"
          title="Previous Formula (Arrow Left / K)"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Keyboard Shortcut Hints */}
        <div className="hidden md:flex items-center gap-3 text-xs text-white/40 font-mono">
          <span>← / K Prev</span>
          <span>·</span>
          <span>→ / J Next</span>
          <span>·</span>
          <span>B Bookmark</span>
          <span>·</span>
          <span>R Revise</span>
        </div>

        {/* Next Button */}
        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1 < relevantFormulas.length ? prev + 1 : 0))}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-lg transition-all active:scale-95"
          title="Next Formula (Arrow Right / J)"
        >
          <span>Next Formula</span>
          <ChevronRight className="w-5 h-5" />
        </button>

      </footer>
    </div>
  );
};
