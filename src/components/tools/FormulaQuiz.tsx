import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../../data/quizData';
import { MathView } from '../MathView';
import { Subject } from '../../types/formula';

export const FormulaQuiz: React.FC = () => {
  const [subjectFilter, setSubjectFilter] = useState<Subject | 'All'>('All');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = QUIZ_QUESTIONS.filter(
    (q) => subjectFilter === 'All' || q.subject === subjectFilter
  );

  const currentQ = questions[currentIdx] || questions[0];

  const handleSelectOption = (optId: string) => {
    if (submitted) return;
    setSelectedOption(optId);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption || submitted) return;
    setSubmitted(true);
    if (selectedOption === currentQ.correctOptionId) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="max-w-xl mx-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center shadow-lg space-y-6">
        <div className="w-16 h-16 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 mx-auto flex items-center justify-center">
          <Award className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            Quiz Completed!
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            You scored {score} out of {questions.length} ({percentage}%)
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
          {percentage >= 80 ? (
            <p className="font-semibold text-emerald-600 dark:text-emerald-400">
              Outstanding conceptual command! Ready for JEE Advanced & NEET!
            </p>
          ) : percentage >= 50 ? (
            <p className="font-semibold text-sky-600 dark:text-sky-400">
              Solid grasp. Revise weak formulas in Bed Mode or Quick Revision!
            </p>
          ) : (
            <p className="font-semibold text-amber-600 dark:text-amber-400">
              Keep practicing. Review applicability conditions and error traps.
            </p>
          )}
        </div>

        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-sm transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Retake Quiz</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Formula Application Quiz
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Test formula identification, edge cases, and numerical substitution.
          </p>
        </div>

        {/* Subject Filter */}
        <div className="flex items-center gap-1 text-xs">
          {(['All', 'Physics', 'Chemistry', 'Mathematics'] as const).map((s) => (
            <button
              key={s}
              onClick={() => {
                setSubjectFilter(s);
                setCurrentIdx(0);
                setSelectedOption(null);
                setSubmitted(false);
              }}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                subjectFilter === s
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-5">
        
        {/* Progress & Chapter */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 font-medium">
            <span className="font-semibold text-sky-600 dark:text-sky-400">{currentQ.subject}</span>
            <span>·</span>
            <span>{currentQ.chapter}</span>
          </div>
          <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
            {currentIdx + 1} / {questions.length}
          </span>
        </div>

        {/* Question Text */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
          {currentQ.question}
        </h3>

        {/* Optional LaTeX in question */}
        {currentQ.latexQuestion && (
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950/70 border border-slate-200/60 dark:border-slate-800/80 overflow-x-auto text-center">
            <MathView latex={currentQ.latexQuestion} fontSize="base" />
          </div>
        )}

        {/* Options */}
        <div className="space-y-2.5">
          {currentQ.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const isCorrect = opt.id === currentQ.correctOptionId;

            let optionStyle = 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700';

            if (submitted) {
              if (isCorrect) {
                optionStyle = 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200';
              } else if (isSelected && !isCorrect) {
                optionStyle = 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200';
              }
            } else if (isSelected) {
              optionStyle = 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/30 text-sky-900 dark:text-sky-200';
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start justify-between gap-3 ${optionStyle}`}
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-bold text-xs uppercase shrink-0 mt-0.5">
                    {opt.id}
                  </span>
                  <span>{opt.text}</span>
                </div>

                {submitted && isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                )}
                {submitted && isSelected && !isCorrect && (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Card when submitted */}
        {submitted && (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
              <HelpCircle className="w-4 h-4 text-sky-500" />
              <span>Explanation:</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentQ.explanation}
            </p>
            {currentQ.latexExplanation && (
              <div className="pt-2 text-center overflow-x-auto">
                <MathView latex={currentQ.latexExplanation} fontSize="sm" />
              </div>
            )}
          </div>
        )}

        {/* Submit / Next Button */}
        <div className="pt-2 flex justify-end">
          {!submitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={!selectedOption}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                selectedOption
                  ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-sm'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
            >
              <span>{currentIdx + 1 < questions.length ? 'Next Question' : 'View Results'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
