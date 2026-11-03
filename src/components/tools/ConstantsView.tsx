import React, { useState, useMemo } from 'react';
import { Copy, Check, Search, ShieldCheck } from 'lucide-react';
import { CONSTANTS_DATA } from '../../data/constantsData';
import { MathView } from '../MathView';

export const ConstantsView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Universal', 'Electromagnetic', 'Atomic & Nuclear', 'Physicochemical'];

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return CONSTANTS_DATA.filter((c) => {
      if (selectedCategory !== 'All' && c.category !== selectedCategory) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q) ||
        c.notes.toLowerCase().includes(q) ||
        c.value.toLowerCase().includes(q)
      );
    });
  }, [search, selectedCategory]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Fundamental Physical Constants (CODATA)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Standard values, SI units, and uncertainties for physics & chemistry problem-solving.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800/40 shrink-0">
          <ShieldCheck className="w-4 h-4" />
          <span>CODATA Internationally Recommended</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search constants (e.g. Planck, c, gravity, gas constant)..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table of Constants */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Quantity / Constant</th>
                <th className="py-3 px-4">Symbol</th>
                <th className="py-3 px-4">Value</th>
                <th className="py-3 px-4">SI Unit</th>
                <th className="py-3 px-4">Notes & Application</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-slate-100">
                    <div>{item.name}</div>
                    <span className="text-[11px] font-normal text-slate-400">{item.category}</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-sky-600 dark:text-sky-400 whitespace-nowrap">
                    <MathView latex={item.latexSymbol} displayMode={false} fontSize="base" />
                  </td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">
                    <MathView latex={item.value} displayMode={false} fontSize="sm" />
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap">
                    <MathView latex={item.siUnit} displayMode={false} fontSize="sm" />
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed">
                    {item.notes}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleCopy(item.id, `${item.name} (${item.symbol}) = ${item.value}`)}
                      className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
                      title="Copy constant value"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
