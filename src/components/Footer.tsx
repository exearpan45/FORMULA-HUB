import React from 'react';
import { useApp } from '../context/AppContext';
import { ALL_FORMULAS } from '../data/allFormulas';

export const Footer: React.FC = () => {
  const { setSelectedSubject, setActiveTab, setActiveTool, openBedStudy } = useApp();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs text-slate-500 dark:text-slate-400">
        
        {/* Brand & Purpose */}
        <div className="space-y-1.5 max-w-sm">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-sky-600 text-white flex items-center justify-center font-black text-[10px]">
              ∑
            </div>
            <span className="font-extrabold text-slate-900 dark:text-slate-100 tracking-tight text-sm">
              FORMULA HUB
            </span>
          </div>
          <p className="leading-relaxed text-[11px]">
            Every Formula. One Destination. Complete, verified formula reference and revision platform for JEE Main, JEE Advanced, and NEET.
          </p>
          <div className="text-[11px] text-slate-400 font-mono">
            {ALL_FORMULAS.length} equations · CODATA fundamental constants · Offline ready
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-medium">
          <button
            onClick={() => {
              setSelectedSubject('Physics');
              setActiveTab('browse');
            }}
            className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          >
            Physics Library
          </button>
          <button
            onClick={() => {
              setSelectedSubject('Chemistry');
              setActiveTab('browse');
            }}
            className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          >
            Chemistry Library
          </button>
          <button
            onClick={() => {
              setSelectedSubject('Mathematics');
              setActiveTab('browse');
            }}
            className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          >
            Mathematics Library
          </button>
          <button
            onClick={() => openBedStudy()}
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Bed Study Mode
          </button>
          <button
            onClick={() => setActiveTab('pdf-library')}
            className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors text-sky-600 dark:text-sky-400 font-bold"
          >
            PDF Formula Sheets
          </button>
          <button
            onClick={() => {
              setActiveTool('constants');
              setActiveTab('tools');
            }}
            className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
          >
            CODATA Constants
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors font-mono text-[11px]"
          >
            Admin Portal
          </button>
        </div>

        {/* Copyright */}
        <div className="text-slate-400 text-[11px]">
          © {new Date().getFullYear()} Formula Hub. Dedicated to serious competitive exam aspirants.
        </div>

      </div>
    </footer>
  );
};
