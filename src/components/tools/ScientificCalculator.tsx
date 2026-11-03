import React, { useState } from 'react';
import { Delete, RotateCcw, Equal, History } from 'lucide-react';

export const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [isRad, setIsRad] = useState(true);
  const [history, setHistory] = useState<{ expr: string; result: string }[]>([]);

  // Factorial helper
  const factorial = (n: number): number => {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= Math.min(n, 170); i++) res *= i;
    return res;
  };

  const handleNumber = (digit: string) => {
    setDisplay((prev) => (prev === '0' || prev === 'Error' ? digit : prev + digit));
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay((prev) => prev + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
  };

  const handleDelete = () => {
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  };

  const handleOperator = (op: string) => {
    setExpression(display + ' ' + op + ' ');
    setDisplay('0');
  };

  // Immediate scientific unary function
  const handleFunction = (fn: string) => {
    const val = parseFloat(display);
    if (isNaN(val)) return;

    let res = 0;
    const angleMultiplier = isRad ? 1 : Math.PI / 180;
    const invAngleMultiplier = isRad ? 1 : 180 / Math.PI;

    switch (fn) {
      case 'sin':
        res = Math.sin(val * angleMultiplier);
        break;
      case 'cos':
        res = Math.cos(val * angleMultiplier);
        break;
      case 'tan':
        res = Math.tan(val * angleMultiplier);
        break;
      case 'asin':
        res = Math.asin(val) * invAngleMultiplier;
        break;
      case 'acos':
        res = Math.acos(val) * invAngleMultiplier;
        break;
      case 'atan':
        res = Math.atan(val) * invAngleMultiplier;
        break;
      case 'ln':
        res = Math.log(val);
        break;
      case 'log10':
        res = Math.log10(val);
        break;
      case 'sqrt':
        res = Math.sqrt(val);
        break;
      case 'cbrt':
        res = Math.cbrt(val);
        break;
      case 'sq':
        res = Math.pow(val, 2);
        break;
      case 'cube':
        res = Math.pow(val, 3);
        break;
      case 'inv':
        res = 1 / val;
        break;
      case 'fact':
        res = factorial(Math.round(val));
        break;
      case 'exp':
        res = Math.exp(val);
        break;
      case 'neg':
        res = -val;
        break;
      default:
        return;
    }

    if (isNaN(res) || !isFinite(res)) {
      setDisplay('Error');
    } else {
      const formatted = Number(res.toFixed(10)).toString();
      setDisplay(formatted);
      setHistory((prev) => [{ expr: `${fn}(${val})`, result: formatted }, ...prev.slice(0, 9)]);
    }
  };

  const handleConstant = (c: 'pi' | 'e') => {
    const val = c === 'pi' ? Math.PI : Math.E;
    setDisplay(val.toFixed(8));
  };

  const handleEvaluate = () => {
    if (!expression) return;
    const fullExpr = expression + display;
    const parts = expression.trim().split(' ');
    if (parts.length < 2) return;

    const op1 = parseFloat(parts[0]);
    const operator = parts[1];
    const op2 = parseFloat(display);

    let res = 0;
    switch (operator) {
      case '+':
        res = op1 + op2;
        break;
      case '-':
        res = op1 - op2;
        break;
      case '×':
      case '*':
        res = op1 * op2;
        break;
      case '÷':
      case '/':
        res = op2 !== 0 ? op1 / op2 : NaN;
        break;
      case '^':
        res = Math.pow(op1, op2);
        break;
      default:
        return;
    }

    if (isNaN(res) || !isFinite(res)) {
      setDisplay('Error');
    } else {
      const formatted = Number(res.toFixed(10)).toString();
      setDisplay(formatted);
      setHistory((prev) => [{ expr: fullExpr, result: formatted }, ...prev.slice(0, 9)]);
      setExpression('');
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs max-w-xl mx-auto">
      
      {/* Title & Mode */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Scientific Calculator
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Trigonometric, logarithmic, and power functions for physical calculations.
          </p>
        </div>

        {/* Deg / Rad toggle */}
        <button
          onClick={() => setIsRad((prev) => !prev)}
          className="px-2.5 py-1 text-xs font-bold rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 transition-colors"
        >
          {isRad ? 'RAD' : 'DEG'}
        </button>
      </div>

      {/* Screen Display */}
      <div className="p-4 rounded-xl bg-slate-950 text-right font-mono text-white mb-4 border border-slate-800 select-all">
        <div className="text-xs text-slate-400 h-5 truncate">{expression}</div>
        <div className="text-2xl sm:text-3xl font-bold tracking-tight text-sky-400 truncate">
          {display}
        </div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-5 gap-2 text-xs font-semibold">
        {/* Row 1 */}
        <button onClick={() => handleFunction('sin')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors">sin</button>
        <button onClick={() => handleFunction('cos')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors">cos</button>
        <button onClick={() => handleFunction('tan')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors">tan</button>
        <button onClick={() => handleConstant('pi')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors">π</button>
        <button onClick={handleClear} className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 transition-colors">AC</button>

        {/* Row 2 */}
        <button onClick={() => handleFunction('asin')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors">sin⁻¹</button>
        <button onClick={() => handleFunction('acos')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors">cos⁻¹</button>
        <button onClick={() => handleFunction('atan')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors">tan⁻¹</button>
        <button onClick={() => handleConstant('e')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors">e</button>
        <button onClick={handleDelete} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center transition-colors"><Delete className="w-4 h-4" /></button>

        {/* Row 3 */}
        <button onClick={() => handleFunction('ln')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors">ln</button>
        <button onClick={() => handleFunction('log10')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors">log₁₀</button>
        <button onClick={() => handleFunction('sqrt')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors">√x</button>
        <button onClick={() => handleOperator('^')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors">x^y</button>
        <button onClick={() => handleOperator('÷')} className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 text-base transition-colors">÷</button>

        {/* Row 4 */}
        <button onClick={() => handleFunction('sq')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors">x²</button>
        <button onClick={() => handleNumber('7')} className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-900 dark:text-slate-100 text-sm transition-colors">7</button>
        <button onClick={() => handleNumber('8')} className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-900 dark:text-slate-100 text-sm transition-colors">8</button>
        <button onClick={() => handleNumber('9')} className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-900 dark:text-slate-100 text-sm transition-colors">9</button>
        <button onClick={() => handleOperator('×')} className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 text-base transition-colors">×</button>

        {/* Row 5 */}
        <button onClick={() => handleFunction('fact')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors">n!</button>
        <button onClick={() => handleNumber('4')} className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-900 dark:text-slate-100 text-sm transition-colors">4</button>
        <button onClick={() => handleNumber('5')} className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-900 dark:text-slate-100 text-sm transition-colors">5</button>
        <button onClick={() => handleNumber('6')} className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-900 dark:text-slate-100 text-sm transition-colors">6</button>
        <button onClick={() => handleOperator('-')} className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 text-base transition-colors">-</button>

        {/* Row 6 */}
        <button onClick={() => handleFunction('inv')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors">1/x</button>
        <button onClick={() => handleNumber('1')} className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-900 dark:text-slate-100 text-sm transition-colors">1</button>
        <button onClick={() => handleNumber('2')} className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-900 dark:text-slate-100 text-sm transition-colors">2</button>
        <button onClick={() => handleNumber('3')} className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-900 dark:text-slate-100 text-sm transition-colors">3</button>
        <button onClick={() => handleOperator('+')} className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 text-base transition-colors">+</button>

        {/* Row 7 */}
        <button onClick={() => handleFunction('neg')} className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors">±</button>
        <button onClick={() => handleNumber('0')} className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-900 dark:text-slate-100 text-sm transition-colors">0</button>
        <button onClick={handleDecimal} className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 text-slate-900 dark:text-slate-100 text-sm font-bold transition-colors">.</button>
        <button onClick={handleEvaluate} className="col-span-2 p-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-base transition-colors flex items-center justify-center gap-1 shadow-sm"><Equal className="w-4 h-4" /> Calculate</button>
      </div>

      {/* History Tape */}
      {history.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="font-semibold flex items-center gap-1.5">
              <History className="w-3.5 h-3.5" /> Recent Calculations
            </span>
            <button
              onClick={() => setHistory([])}
              className="text-[11px] text-slate-400 hover:text-rose-500"
            >
              Clear
            </button>
          </div>
          <div className="space-y-1 max-h-32 overflow-y-auto font-mono text-[11px]">
            {history.map((item, i) => (
              <div
                key={i}
                onClick={() => setDisplay(item.result)}
                className="flex items-center justify-between p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer text-slate-700 dark:text-slate-300 transition-colors"
                title="Click to copy result to screen"
              >
                <span>{item.expr}</span>
                <span className="font-bold text-sky-600 dark:text-sky-400">= {item.result}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
