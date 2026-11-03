import { ConstantItem } from '../types/formula';

export const CONSTANTS_DATA: ConstantItem[] = [
  {
    id: 'speed-of-light',
    name: 'Speed of Light in Vacuum',
    symbol: 'c',
    latexSymbol: 'c',
    value: '299,792,458',
    siUnit: '\\text{m}\\cdot\\text{s}^{-1}',
    category: 'Universal',
    uncertainty: 'Exact (by definition)',
    notes: 'Fundamental constant defining the metre in the SI system since 1983.'
  },
  {
    id: 'gravitational-constant',
    name: 'Newtonian Constant of Gravitation',
    symbol: 'G',
    latexSymbol: 'G',
    value: '6.67430 \\times 10^{-11}',
    siUnit: '\\text{m}^3\\cdot\\text{kg}^{-1}\\cdot\\text{s}^{-2}',
    category: 'Universal',
    uncertainty: '\\pm 0.00015 \\times 10^{-11}',
    notes: 'Appears in Newton\'s law of gravitation and Einstein\'s field equations. CODATA 2018/2022.'
  },
  {
    id: 'planck-constant',
    name: 'Planck Constant',
    symbol: 'h',
    latexSymbol: 'h',
    value: '6.62607015 \\times 10^{-34}',
    siUnit: '\\text{J}\\cdot\\text{s}',
    category: 'Universal',
    uncertainty: 'Exact (SI definition)',
    notes: 'Fixes the scale of quantum physics. 1 eV·s = 4.135667696 × 10⁻¹⁵ eV·s.'
  },
  {
    id: 'reduced-planck-constant',
    name: 'Reduced Planck Constant (Dirac constant)',
    symbol: 'ħ',
    latexSymbol: '\\hbar',
    value: '1.054571817 \\times 10^{-34}',
    siUnit: '\\text{J}\\cdot\\text{s}',
    category: 'Universal',
    uncertainty: 'Exact (h / 2π)',
    notes: 'Used in angular momentum quantization, Heisenberg uncertainty, and Schrödinger equation.'
  },
  {
    id: 'elementary-charge',
    name: 'Elementary Charge',
    symbol: 'e',
    latexSymbol: 'e',
    value: '1.602176634 \\times 10^{-19}',
    siUnit: '\\text{C}',
    category: 'Electromagnetic',
    uncertainty: 'Exact (SI definition)',
    notes: 'Magnitude of electric charge carried by a single proton or electron.'
  },
  {
    id: 'boltzmann-constant',
    name: 'Boltzmann Constant',
    symbol: 'k_B',
    latexSymbol: 'k_B',
    value: '1.380649 \\times 10^{-23}',
    siUnit: '\\text{J}\\cdot\\text{K}^{-1}',
    category: 'Physicochemical',
    uncertainty: 'Exact (SI definition)',
    notes: 'Relates average kinetic energy of gas molecules to temperature: E = (3/2) k_B T.'
  },
  {
    id: 'avogadro-constant',
    name: 'Avogadro Constant',
    symbol: 'N_A',
    latexSymbol: 'N_A',
    value: '6.02214076 \\times 10^{23}',
    siUnit: '\\text{mol}^{-1}',
    category: 'Physicochemical',
    uncertainty: 'Exact (SI definition)',
    notes: 'Number of constituent particles in one mole of substance.'
  },
  {
    id: 'molar-gas-constant',
    name: 'Molar Gas Constant',
    symbol: 'R',
    latexSymbol: 'R',
    value: '8.314462618',
    siUnit: '\\text{J}\\cdot\\text{mol}^{-1}\\cdot\\text{K}^{-1}',
    category: 'Physicochemical',
    uncertainty: 'Exact (N_A × k_B)',
    notes: 'Also equals 0.082057 L·atm/(mol·K) or 1.987 cal/(mol·K). Essential for ideal gas calculations.'
  },
  {
    id: 'permittivity-free-space',
    name: 'Vacuum Electric Permittivity',
    symbol: 'ε₀',
    latexSymbol: '\\varepsilon_0',
    value: '8.8541878128 \\times 10^{-12}',
    siUnit: '\\text{F}\\cdot\\text{m}^{-1}',
    category: 'Electromagnetic',
    uncertainty: '\\pm 0.0000000013 \\times 10^{-12}',
    notes: 'Coulomb constant 1/(4πε₀) ≈ 8.98755 × 10⁹ N·m²/C² (conveniently 9 × 10⁹ for JEE/NEET).'
  },
  {
    id: 'permeability-free-space',
    name: 'Vacuum Magnetic Permeability',
    symbol: 'μ₀',
    latexSymbol: '\\mu_0',
    value: '1.25663706212 \\times 10^{-6}',
    siUnit: '\\text{N}\\cdot\\text{A}^{-2}',
    category: 'Electromagnetic',
    uncertainty: '\\pm 0.00000000019 \\times 10^{-6}',
    notes: 'Related to ε₀ by c² = 1/(ε₀μ₀). μ₀/(4π) = 10⁻⁷ T·m/A.'
  },
  {
    id: 'electron-mass',
    name: 'Electron Rest Mass',
    symbol: 'm_e',
    latexSymbol: 'm_e',
    value: '9.1093837015 \\times 10^{-31}',
    siUnit: '\\text{kg}',
    category: 'Atomic & Nuclear',
    uncertainty: '\\pm 0.0000000028 \\times 10^{-31}',
    notes: 'Equivalent to 0.510998950 MeV/c² or 5.485799 × 10⁻⁴ u.'
  },
  {
    id: 'proton-mass',
    name: 'Proton Rest Mass',
    symbol: 'm_p',
    latexSymbol: 'm_p',
    value: '1.67262192369 \\times 10^{-27}',
    siUnit: '\\text{kg}',
    category: 'Atomic & Nuclear',
    uncertainty: '\\pm 0.00000000051 \\times 10^{-27}',
    notes: 'Equivalent to 938.272 MeV/c² or 1.007276 u. Ratio m_p / m_e ≈ 1836.15.'
  },
  {
    id: 'neutron-mass',
    name: 'Neutron Rest Mass',
    symbol: 'm_n',
    latexSymbol: 'm_n',
    value: '1.67492749804 \\times 10^{-27}',
    siUnit: '\\text{kg}',
    category: 'Atomic & Nuclear',
    uncertainty: '\\pm 0.00000000095 \\times 10^{-27}',
    notes: 'Equivalent to 939.565 MeV/c² or 1.008665 u. Slightly heavier than the proton.'
  },
  {
    id: 'acceleration-due-to-gravity',
    name: 'Standard Acceleration Due to Gravity',
    symbol: 'g',
    latexSymbol: 'g',
    value: '9.80665',
    siUnit: '\\text{m}\\cdot\\text{s}^{-2}',
    category: 'Universal',
    uncertainty: 'Standard nominal value at sea level (latitude 45°)',
    notes: 'Frequently approximated as 9.8 or 10 m/s² in JEE & NEET problem-solving.'
  },
  {
    id: 'rydberg-constant',
    name: 'Rydberg Constant',
    symbol: 'R_∞',
    latexSymbol: 'R_\\infty',
    value: '1.0973731568160 \\times 10^7',
    siUnit: '\\text{m}^{-1}',
    category: 'Atomic & Nuclear',
    uncertainty: '\\pm 0.0000000000021 \\times 10^7',
    notes: 'Appears in Rydberg formula 1/λ = R_H Z² (1/n₁² - 1/n₂²). hcR_∞ = 13.60569 eV.'
  },
  {
    id: 'faraday-constant',
    name: 'Faraday Constant',
    symbol: 'F',
    latexSymbol: 'F',
    value: '96,485.33212',
    siUnit: '\\text{C}\\cdot\\text{mol}^{-1}',
    category: 'Physicochemical',
    uncertainty: 'Exact (e × N_A)',
    notes: 'Total electric charge per mole of electrons. Commonly taken as 96,500 C/mol.'
  },
  {
    id: 'stefan-boltzmann-constant',
    name: 'Stefan-Boltzmann Constant',
    symbol: 'σ',
    latexSymbol: '\\sigma',
    value: '5.670374419 \\times 10^{-8}',
    siUnit: '\\text{W}\\cdot\\text{m}^{-2}\\cdot\\text{K}^{-4}',
    category: 'Physicochemical',
    uncertainty: 'Exact ((2π⁵ k_B⁴)/(15 c² h³))',
    notes: 'Radiative heat emissive power of a blackbody: E = σ T⁴.'
  },
  {
    id: 'wien-displacement-constant',
    name: 'Wien Displacement Law Constant',
    symbol: 'b',
    latexSymbol: 'b',
    value: '2.897771955 \\times 10^{-3}',
    siUnit: '\\text{m}\\cdot\\text{K}',
    category: 'Physicochemical',
    uncertainty: '\\pm 0.000000001 \\times 10^{-3}',
    notes: 'Relates peak radiation wavelength to temperature: λ_max T = b.'
  },
  {
    id: 'bohr-radius',
    name: 'Bohr Radius',
    symbol: 'a₀',
    latexSymbol: 'a_0',
    value: '5.29177210903 \\times 10^{-11}',
    siUnit: '\\text{m}',
    category: 'Atomic & Nuclear',
    uncertainty: '\\pm 0.00000000080 \\times 10^{-11}',
    notes: 'Most probable distance between proton and electron in ground state hydrogen (0.529 Å).'
  },
  {
    id: 'bohr-magneton',
    name: 'Bohr Magneton',
    symbol: 'μ_B',
    latexSymbol: '\\mu_B',
    value: '9.2740100783 \\times 10^{-24}',
    siUnit: '\\text{J}\\cdot\\text{T}^{-1}',
    category: 'Electromagnetic',
    uncertainty: '\\pm 0.0000000028 \\times 10^{-24}',
    notes: 'Natural unit for magnetic dipole moment: μ_B = eħ / (2m_e).'
  }
];
