import React, { useState, useMemo } from 'react';
import { Search, Copy, Check } from 'lucide-react';
import { IDENTITIES_DATA } from '../../data/identitiesData';
import { MathView } from '../MathView';

export const EquationReference: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Algebraic Identities', 'Trigonometric Identities', 'Calculus Standard Forms'];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return IDENTITIES_DATA.filter((item) => {
      if (category !== 'All' && item.category !== category) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.latex.toLowerCase().includes(q) ||
        item.notes?.toLowerCase().includes(q)
      );
    });
  }, [search, category]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Essential Equation & Identity Reference
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          High-yield algebraic, trigonometric, and calculus standard identities for fast exam recall.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search identities (e.g. King, parts, cubic, double angle)..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                category === cat
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat === 'All' ? 'All' : cat.replace(' Identities', '').replace(' Standard Forms', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Identity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span className="font-semibold text-sky-600 dark:text-sky-400">{item.category}</span>
                <button
                  onClick={() => handleCopy(item.id, item.latex)}
                  className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  title="Copy LaTeX"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {item.title}
              </h3>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-100 dark:border-slate-800/80 overflow-x-auto">
              <MathView latex={item.latex} fontSize="sm" />
            </div>

            {item.notes && (
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                {item.notes}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
