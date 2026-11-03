import React from 'react';
import { Compass, Calculator, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UnitConverter } from './tools/UnitConverter';
import { ScientificCalculator } from './tools/ScientificCalculator';
import { ConstantsView } from './tools/ConstantsView';
import { EquationReference } from './tools/EquationReference';
import { FormulaQuiz } from './tools/FormulaQuiz';

export const ToolsHub: React.FC = () => {
  const { activeTool, setActiveTool } = useApp();

  const currentTool = activeTool || 'constants';

  const toolTabs = [
    { id: 'constants' as const, label: 'CODATA Constants', icon: ShieldCheck },
    { id: 'converter' as const, label: 'Unit Converter', icon: Compass },
    { id: 'calculator' as const, label: 'Calculator', icon: Calculator },
    { id: 'identities' as const, label: 'Identities Sheet', icon: FileText },
    { id: 'quiz' as const, label: 'Formula Quiz', icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-8">
      {/* Tool Selector Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {toolTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTool === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTool(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Render Active Tool */}
      <div>
        {currentTool === 'constants' && <ConstantsView />}
        {currentTool === 'converter' && <UnitConverter />}
        {currentTool === 'calculator' && <ScientificCalculator />}
        {currentTool === 'identities' && <EquationReference />}
        {currentTool === 'quiz' && <FormulaQuiz />}
      </div>
    </div>
  );
};
