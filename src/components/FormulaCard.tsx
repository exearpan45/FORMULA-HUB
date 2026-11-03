import React, { useState } from 'react';
import {
  Bookmark,
  Check,
  Copy,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Maximize2,
  StickyNote,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Formula } from '../types/formula';
import { MathView } from './MathView';
import { useApp } from '../context/AppContext';

interface FormulaCardProps {
  formula: Formula;
  isCompact?: boolean;
}

export const FormulaCard: React.FC<FormulaCardProps> = ({ formula, isCompact = false }) => {
  const {
    isBookmarked,
    toggleBookmark,
    isRevised,
    toggleRevised,
    openBedStudy,
    addRecentFormula,
    formulaNotes,
    saveFormulaNote,
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [showNotesEditor, setShowNotesEditor] = useState(false);
  const [noteText, setNoteText] = useState(formulaNotes[formula.id] || '');
  const [expanded, setExpanded] = useState(!isCompact);

  const bookmarked = isBookmarked(formula.id);
  const revised = isRevised(formula.id);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formula.latex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleOpenBedMode = () => {
    addRecentFormula(formula.id);
    openBedStudy(formula.id);
  };

  const handleSaveNote = () => {
    saveFormulaNote(formula.id, noteText);
    setShowNotesEditor(false);
  };

  return (
    <article
      id={`formula-${formula.id}`}
      className={`group relative rounded-xl border transition-all duration-200 bg-white dark:bg-slate-900/90 ${
        revised
          ? 'border-emerald-500/40 dark:border-emerald-500/30'
          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
      } shadow-xs p-5 md:p-6`}
    >
      {/* Top Metadata Row: Zero-Pill Discipline */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="text-sky-600 dark:text-sky-400 font-semibold">{formula.subject}</span>
          <span aria-hidden="true">·</span>
          <span>Class {formula.class}</span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-700 dark:text-slate-300">{formula.chapter}</span>
          <span aria-hidden="true">·</span>
          <span>{formula.difficulty}</span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-1">
          {/* Mark as Revised */}
          <button
            onClick={() => toggleRevised(formula.id)}
            title={revised ? 'Marked as revised' : 'Mark as revised'}
            aria-label="Toggle revised status"
            className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md transition-colors ${
              revised
                ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <CheckCircle2 className={`w-3.5 h-3.5 ${revised ? 'fill-emerald-500 text-white dark:text-slate-950' : ''}`} />
            <span className="hidden sm:inline">{revised ? 'Revised' : 'Revise'}</span>
          </button>

          {/* Bed Study Mode Quick Jump */}
          <button
            onClick={handleOpenBedMode}
            title="Open in Distraction-Free Bed Mode"
            aria-label="Open formula in bed mode"
            className="p-1.5 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {/* Copy LaTeX */}
          <button
            onClick={handleCopy}
            title={copied ? 'Copied LaTeX!' : 'Copy LaTeX'}
            aria-label="Copy formula LaTeX"
            className="p-1.5 text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {/* Bookmark */}
          <button
            onClick={() => toggleBookmark(formula.id)}
            title={bookmarked ? 'Remove bookmark' : 'Bookmark formula'}
            aria-label="Toggle bookmark"
            className={`p-1.5 rounded-md transition-colors ${
              bookmarked
                ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                : 'text-slate-500 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-amber-500' : ''}`} />
          </button>

          {/* Note Toggle */}
          <button
            onClick={() => setShowNotesEditor((prev) => !prev)}
            title="My study notes"
            aria-label="Personal study note"
            className={`p-1.5 rounded-md transition-colors ${
              formulaNotes[formula.id]
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40'
                : 'text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <StickyNote className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Formula Title */}
      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight mb-3">
        {formula.title}
      </h3>

      {/* Main KaTeX Equation Display Box */}
      <div className="my-3 p-4 sm:p-5 rounded-lg bg-slate-50 dark:bg-slate-950/70 border border-slate-200/60 dark:border-slate-800/80 flex items-center justify-center text-slate-900 dark:text-slate-100 transition-colors">
        <MathView latex={formula.latex} fontSize="lg" />
      </div>

      {/* Expand/Collapse toggle for compact mode */}
      {isCompact && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="w-full flex items-center justify-center gap-1.5 py-1 text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
        >
          <span>{expanded ? 'Hide details' : 'Show variables & conditions'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      )}

      {/* Detailed Variables, Conditions, & Notes */}
      {expanded && (
        <div className="mt-4 space-y-3.5 text-xs text-slate-600 dark:text-slate-300 pt-3 border-t border-slate-100 dark:border-slate-800/60">
          
          {/* Variables Breakdown */}
          {formula.variables && formula.variables.length > 0 && (
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-sky-500" />
                <span>Symbols & Variables:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 pl-5">
                {formula.variables.map((v, idx) => (
                  <div key={idx} className="flex items-baseline gap-1.5">
                    <span className="font-mono font-bold text-sky-600 dark:text-sky-400 shrink-0">
                      {v.symbol}:
                    </span>
                    <span>
                      {v.name}
                      {v.unit && <span className="text-slate-400"> ({v.unit})</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Conditions of Applicability */}
          {formula.conditions && formula.conditions.length > 0 && (
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>Conditions of Applicability:</span>
              </h4>
              <ul className="list-disc list-inside space-y-0.5 text-slate-600 dark:text-slate-400 pl-1">
                {formula.conditions.map((c, idx) => (
                  <li key={idx} className="leading-relaxed">{c}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Insights & Notes */}
          {formula.notes && formula.notes.length > 0 && (
            <div>
              <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Important Insights & Special Cases:
              </h4>
              <ul className="list-disc list-inside space-y-0.5 text-slate-600 dark:text-slate-400 pl-1">
                {formula.notes.map((n, idx) => (
                  <li key={idx} className="leading-relaxed">{n}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Common Mistakes to Avoid */}
          {formula.commonMistakes && formula.commonMistakes.length > 0 && (
            <div className="p-2.5 rounded-lg bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/30 text-rose-800 dark:text-rose-300">
              <span className="font-semibold block mb-0.5">Common Trap / Exam Pitfall:</span>
              <ul className="list-disc list-inside space-y-0.5 text-[11px] leading-relaxed">
                {formula.commonMistakes.map((m, idx) => (
                  <li key={idx}>{m}</li>
                ))}
              </ul>
            </div>
          )}

          {/* JEE Advanced / NEET Variations */}
          {formula.variations && formula.variations.length > 0 && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60">
              <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                Useful Variations & Derivations:
              </span>
              <div className="space-y-2">
                {formula.variations.map((varItem, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-slate-50 dark:bg-slate-950/40 border border-slate-200/50 dark:border-slate-800/50">
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-1">
                      {varItem.label}
                    </span>
                    <MathView latex={varItem.latex} fontSize="sm" />
                    {varItem.note && (
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 italic block mt-1">
                        {varItem.note}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Personal Student Note Editor */}
      {showNotesEditor && (
        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
          <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">
            Personal Note / Mnemonic for this formula:
          </label>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="e.g. Mnemonic: ... Remember sign change when..."
            rows={2}
            className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={() => setShowNotesEditor(false)}
              className="px-2.5 py-1 text-slate-600 dark:text-slate-400 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveNote}
              className="px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-md transition-colors"
            >
              Save Note
            </button>
          </div>
        </div>
      )}

      {/* Display Saved Student Note if present and editor is closed */}
      {!showNotesEditor && formulaNotes[formula.id] && (
        <div className="mt-3 p-2.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
          <StickyNote className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold block text-[11px] text-amber-700 dark:text-amber-300">My Study Note:</span>
            <p className="whitespace-pre-wrap">{formulaNotes[formula.id]}</p>
          </div>
        </div>
      )}

    </article>
  );
};
