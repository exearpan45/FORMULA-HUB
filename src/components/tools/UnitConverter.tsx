import React, { useState, useMemo } from 'react';
import { ArrowRightLeft, Sparkles } from 'lucide-react';

interface UnitDef {
  label: string;
  factor: number; // Factor to multiply by to convert to base SI unit
  symbol: string;
}

interface UnitCategoryDef {
  name: string;
  baseUnit: string;
  units: Record<string, UnitDef>;
}

const CONVERTER_DATA: Record<string, UnitCategoryDef> = {
  Length: {
    name: 'Length',
    baseUnit: 'metre (m)',
    units: {
      m: { label: 'Metre', factor: 1, symbol: 'm' },
      km: { label: 'Kilometre', factor: 1000, symbol: 'km' },
      cm: { label: 'Centimetre', factor: 0.01, symbol: 'cm' },
      mm: { label: 'Millimetre', factor: 0.001, symbol: 'mm' },
      nm: { label: 'Nanometre', factor: 1e-9, symbol: 'nm' },
      angstrom: { label: 'Ångström (Å)', factor: 1e-10, symbol: 'Å' },
      inch: { label: 'Inch', factor: 0.0254, symbol: 'in' },
      ft: { label: 'Foot', factor: 0.3048, symbol: 'ft' },
      ly: { label: 'Light Year', factor: 9.461e15, symbol: 'ly' },
    },
  },
  Mass: {
    name: 'Mass',
    baseUnit: 'kilogram (kg)',
    units: {
      kg: { label: 'Kilogram', factor: 1, symbol: 'kg' },
      g: { label: 'Gram', factor: 0.001, symbol: 'g' },
      mg: { label: 'Milligram', factor: 1e-6, symbol: 'mg' },
      u: { label: 'Atomic Mass Unit (u)', factor: 1.660539e-27, symbol: 'u' },
      ton: { label: 'Metric Tonne', factor: 1000, symbol: 't' },
      lb: { label: 'Pound', factor: 0.453592, symbol: 'lb' },
    },
  },
  Time: {
    name: 'Time',
    baseUnit: 'second (s)',
    units: {
      s: { label: 'Second', factor: 1, symbol: 's' },
      ms: { label: 'Millisecond', factor: 0.001, symbol: 'ms' },
      us: { label: 'Microsecond', factor: 1e-6, symbol: 'μs' },
      ns: { label: 'Nanosecond', factor: 1e-9, symbol: 'ns' },
      min: { label: 'Minute', factor: 60, symbol: 'min' },
      h: { label: 'Hour', factor: 3600, symbol: 'h' },
      d: { label: 'Day', factor: 86400, symbol: 'd' },
    },
  },
  Speed: {
    name: 'Speed',
    baseUnit: 'm/s',
    units: {
      mps: { label: 'Metre per second', factor: 1, symbol: 'm/s' },
      kmph: { label: 'Kilometre per hour', factor: 1 / 3.6, symbol: 'km/h' },
      mph: { label: 'Miles per hour', factor: 0.44704, symbol: 'mph' },
      knot: { label: 'Knot', factor: 0.514444, symbol: 'kn' },
      c: { label: 'Speed of Light (c)', factor: 299792458, symbol: 'c' },
    },
  },
  Acceleration: {
    name: 'Acceleration',
    baseUnit: 'm/s²',
    units: {
      mps2: { label: 'Metre per second²', factor: 1, symbol: 'm/s²' },
      g0: { label: 'Standard Gravity (g)', factor: 9.80665, symbol: 'g' },
      cmps2: { label: 'Galileo (cm/s²)', factor: 0.01, symbol: 'Gal' },
      ftps2: { label: 'Foot per second²', factor: 0.3048, symbol: 'ft/s²' },
    },
  },
  Force: {
    name: 'Force',
    baseUnit: 'Newton (N)',
    units: {
      N: { label: 'Newton', factor: 1, symbol: 'N' },
      kN: { label: 'Kilonewton', factor: 1000, symbol: 'kN' },
      dyne: { label: 'Dyne', factor: 1e-5, symbol: 'dyn' },
      kgf: { label: 'Kilogram-force (kgf)', factor: 9.80665, symbol: 'kgf' },
      lbf: { label: 'Pound-force (lbf)', factor: 4.44822, symbol: 'lbf' },
    },
  },
  Energy: {
    name: 'Energy',
    baseUnit: 'Joule (J)',
    units: {
      J: { label: 'Joule', factor: 1, symbol: 'J' },
      kJ: { label: 'Kilojoule', factor: 1000, symbol: 'kJ' },
      eV: { label: 'Electron-volt (eV)', factor: 1.602176634e-19, symbol: 'eV' },
      MeV: { label: 'Megaelectron-volt (MeV)', factor: 1.602176634e-13, symbol: 'MeV' },
      cal: { label: 'Calorie', factor: 4.184, symbol: 'cal' },
      kcal: { label: 'Kilocalorie (kcal)', factor: 4184, symbol: 'kcal' },
      kWh: { label: 'Kilowatt-hour', factor: 3.6e6, symbol: 'kWh' },
      erg: { label: 'Erg', factor: 1e-7, symbol: 'erg' },
    },
  },
  Power: {
    name: 'Power',
    baseUnit: 'Watt (W)',
    units: {
      W: { label: 'Watt', factor: 1, symbol: 'W' },
      kW: { label: 'Kilowatt', factor: 1000, symbol: 'kW' },
      MW: { label: 'Megawatt', factor: 1e6, symbol: 'MW' },
      hp: { label: 'Horsepower (metric)', factor: 735.49875, symbol: 'hp' },
      hp_mech: { label: 'Mechanical Horsepower', factor: 745.69987, symbol: 'hp' },
    },
  },
  Pressure: {
    name: 'Pressure',
    baseUnit: 'Pascal (Pa)',
    units: {
      Pa: { label: 'Pascal (N/m²)', factor: 1, symbol: 'Pa' },
      kPa: { label: 'Kilopascal', factor: 1000, symbol: 'kPa' },
      bar: { label: 'Bar', factor: 100000, symbol: 'bar' },
      atm: { label: 'Standard Atmosphere', factor: 101325, symbol: 'atm' },
      torr: { label: 'Torr (mmHg)', factor: 133.322368, symbol: 'mmHg' },
      psi: { label: 'Pound per sq inch (psi)', factor: 6894.76, symbol: 'psi' },
    },
  },
  Temperature: {
    name: 'Temperature',
    baseUnit: 'Kelvin (K)',
    units: {
      K: { label: 'Kelvin', factor: 1, symbol: 'K' },
      C: { label: 'Celsius (°C)', factor: 1, symbol: '°C' },
      F: { label: 'Fahrenheit (°F)', factor: 1, symbol: '°F' },
    },
  },
};

export const UnitConverter: React.FC = () => {
  const [categoryKey, setCategoryKey] = useState<string>('Length');
  const currentCategory = CONVERTER_DATA[categoryKey];

  const unitKeys = Object.keys(currentCategory.units);
  const [fromUnitKey, setFromUnitKey] = useState<string>(unitKeys[0]);
  const [toUnitKey, setToUnitKey] = useState<string>(unitKeys[1] || unitKeys[0]);
  const [inputValue, setInputValue] = useState<string>('1');

  // Handle category change
  const handleCategoryChange = (newCat: string) => {
    setCategoryKey(newCat);
    const newKeys = Object.keys(CONVERTER_DATA[newCat].units);
    setFromUnitKey(newKeys[0]);
    setToUnitKey(newKeys[1] || newKeys[0]);
  };

  // Swap units
  const handleSwap = () => {
    const temp = fromUnitKey;
    setFromUnitKey(toUnitKey);
    setToUnitKey(temp);
  };

  // Convert calculation
  const outputValue = useMemo(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return '—';

    // Temperature requires affine transformations
    if (categoryKey === 'Temperature') {
      let kelvin = val;
      if (fromUnitKey === 'C') kelvin = val + 273.15;
      else if (fromUnitKey === 'F') kelvin = ((val - 32) * 5) / 9 + 273.15;

      let result = kelvin;
      if (toUnitKey === 'C') result = kelvin - 273.15;
      else if (toUnitKey === 'F') result = ((kelvin - 273.15) * 9) / 5 + 32;

      return result.toLocaleString('en-US', { maximumFractionDigits: 6 });
    }

    // Standard linear multiplicative conversion
    const fromFactor = currentCategory.units[fromUnitKey]?.factor || 1;
    const toFactor = currentCategory.units[toUnitKey]?.factor || 1;

    const baseVal = val * fromFactor;
    const converted = baseVal / toFactor;

    if (Math.abs(converted) < 1e-4 || Math.abs(converted) > 1e7) {
      return converted.toExponential(6);
    }
    return converted.toLocaleString('en-US', { maximumFractionDigits: 8 });
  }, [categoryKey, fromUnitKey, toUnitKey, inputValue, currentCategory]);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          Physical Unit Converter
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          High-precision conversion across 10 physical dimensions for JEE & NEET.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 border-b border-slate-100 dark:border-slate-800">
        {Object.keys(CONVERTER_DATA).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              categoryKey === cat
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Inputs and Output Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
        
        {/* From Box */}
        <div className="sm:col-span-2 space-y-2">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            From
          </label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-mono text-base font-medium focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
          <select
            value={fromUnitKey}
            onChange={(e) => setFromUnitKey(e.target.value)}
            className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-medium focus:outline-none"
          >
            {Object.entries(currentCategory.units).map(([k, u]) => (
              <option key={k} value={k}>
                {u.label} ({u.symbol})
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center sm:col-span-1">
          <button
            onClick={handleSwap}
            aria-label="Swap units"
            className="p-2.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 hover:bg-sky-50 hover:text-sky-600 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors shadow-xs"
            title="Swap units"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>

        {/* To Box */}
        <div className="sm:col-span-2 space-y-2">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            To (Result)
          </label>
          <div className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/80 text-slate-900 dark:text-slate-100 font-mono text-base font-bold select-all overflow-x-auto truncate">
            {outputValue}
          </div>
          <select
            value={toUnitKey}
            onChange={(e) => setToUnitKey(e.target.value)}
            className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-medium focus:outline-none"
          >
            {Object.entries(currentCategory.units).map(([k, u]) => (
              <option key={k} value={k}>
                {u.label} ({u.symbol})
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Formula Summary Footnote */}
      <div className="mt-6 p-3 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
        <span>
          1 {currentCategory.units[fromUnitKey]?.symbol} ={' '}
          <strong className="font-mono text-slate-800 dark:text-slate-200">
            {categoryKey === 'Temperature'
              ? 'Affine transformation'
              : (currentCategory.units[fromUnitKey].factor / currentCategory.units[toUnitKey].factor).toPrecision(6)}
          </strong>{' '}
          {currentCategory.units[toUnitKey]?.symbol}
        </span>
        <span className="font-mono text-[11px] text-sky-600 dark:text-sky-400">
          SI: {currentCategory.baseUnit}
        </span>
      </div>
    </div>
  );
};
