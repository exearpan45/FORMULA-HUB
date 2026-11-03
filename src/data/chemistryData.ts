import { Formula } from '../types/formula';

export const CHEMISTRY_FORMULAS: Formula[] = [
  // --- A. PHYSICAL CHEMISTRY ---
  // Chapter: Some Basic Concepts of Chemistry
  {
    id: 'chem-concentration-terms',
    subject: 'Chemistry',
    class: '11',
    category: 'Physical Chemistry',
    chapter: 'Some Basic Concepts of Chemistry',
    title: 'Mole Concept & Solution Concentrations',
    latex: 'n = \\frac{w}{M} = \\frac{N}{N_A} = \\frac{V_{\\text{STP}}}{22.7\\,\\text{L}}, \\quad M = \\frac{n_{\\text{solute}}}{V_{\\text{solution (L)}}}, \\quad m = \\frac{n_{\\text{solute}}}{w_{\\text{solvent (kg)}}}, \\quad x_A = \\frac{n_A}{n_A + n_B}',
    variables: [
      { symbol: 'n', name: 'Number of moles', unit: 'mol' },
      { symbol: 'w', name: 'Mass of substance', unit: 'g' },
      { symbol: 'M', name: 'Molar mass', unit: 'g/mol' },
      { symbol: 'M', name: 'Molarity', unit: 'mol/L or M' },
      { symbol: 'm', name: 'Molality', unit: 'mol/kg or m' },
      { symbol: 'x_A', name: 'Mole fraction of component A' },
      { symbol: 'N_A', name: 'Avogadro constant (6.022 × 10²³ mol⁻¹)' }
    ],
    units: [
      { quantity: 'Molarity', siUnit: 'mol per cubic metre', symbol: 'mol/m³ (often mol/L)' },
      { quantity: 'Molality', siUnit: 'mol per kilogram', symbol: 'mol/kg' }
    ],
    conditions: [
      'STP standard molar volume: 22.7 L at 1 bar, 273.15 K (IUPAC); 22.4 L at 1 atm, 273.15 K.',
      'Molality and mole fraction are temperature-independent; Molarity depends on temperature due to solution expansion.'
    ],
    notes: [
      'Relation between Molarity M and Molality m: m = \\frac{1000 M}{1000 d - M M_{\\text{solute}}} (where d is density in g/mL).',
      'Normality N = Molarity × n-factor (valency factor).'
    ],
    commonMistakes: [
      'Confusing mass of solvent with mass of solution when calculating molality.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter: Atomic Structure
  {
    id: 'chem-heisenberg-uncertainty',
    subject: 'Chemistry',
    class: '11',
    category: 'Physical Chemistry',
    chapter: 'Atomic Structure',
    title: 'Heisenberg Uncertainty Principle & Quantum Numbers',
    latex: '\\Delta x\\cdot\\Delta p_x \\ge \\frac{h}{4\\pi} = \\frac{\\hbar}{2}, \\quad \\Delta x\\cdot\\Delta v_x \\ge \\frac{h}{4\\pi m}, \\quad \\mu_s = \\sqrt{n(n+2)}\\,\\mu_B',
    variables: [
      { symbol: '\\Delta x', name: 'Uncertainty in position', unit: 'm' },
      { symbol: '\\Delta p_x', name: 'Uncertainty in momentum component', unit: 'kg·m/s' },
      { symbol: 'm', name: 'Mass of particle', unit: 'kg' },
      { symbol: '\\mu_s', name: 'Spin-only magnetic moment', unit: '\\mu_B\\,\\text{(Bohr Magnetons)}' },
      { symbol: 'n', name: 'Number of unpaired electrons' }
    ],
    conditions: [
      'Simultaneous precision limit for conjugate position and momentum along the identical spatial axis.'
    ],
    notes: [
      'Radial nodes = n - l - 1.',
      'Angular nodes = l. Total nodes = n - 1.',
      'Orbital angular momentum: L = \\sqrt{l(l+1)}\\frac{h}{2\\pi}. For s-electron (l=0), L = 0.'
    ],
    commonMistakes: [
      'Using h / (2π) instead of h / (4π) in Heisenberg\'s relation.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter: Chemical Thermodynamics
  {
    id: 'chem-gibbs-free-energy',
    subject: 'Chemistry',
    class: '11',
    category: 'Physical Chemistry',
    chapter: 'Chemical Thermodynamics',
    title: 'Gibbs Free Energy & Enthalpy Relation',
    latex: '\\Delta H = \\Delta U + \\Delta n_g RT, \\quad \\Delta G = \\Delta H - T\\Delta S, \\quad \\Delta G^\\circ = -RT\\ln K = -2.303 RT\\log_{10} K',
    variables: [
      { symbol: '\\Delta H', name: 'Enthalpy change of reaction', unit: 'kJ/mol' },
      { symbol: '\\Delta U', name: 'Internal energy change', unit: 'kJ/mol' },
      { symbol: '\\Delta n_g', name: 'Moles of gaseous products minus gaseous reactants' },
      { symbol: '\\Delta G', name: 'Gibbs free energy change', unit: 'kJ/mol' },
      { symbol: '\\Delta S', name: 'Entropy change of system', unit: 'J/(mol·K)' },
      { symbol: 'K', name: 'Standard thermodynamic equilibrium constant' },
      { symbol: 'T', name: 'Absolute temperature', unit: 'K' }
    ],
    conditions: [
      'Constant temperature and pressure for Gibbs free energy criteria.',
      'Spontaneous process at constant T, P requires ΔG < 0.'
    ],
    notes: [
      'At equilibrium: \\Delta G = 0 \\implies \\Delta G^\\circ = -RT\\ln K.',
      'Van \'t Hoff Isochore: \\ln\\left(\\frac{K_2}{K_1}\\right) = \\frac{\\Delta H^\\circ}{R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right).',
      'For endothermic reaction (ΔH° > 0), K increases with increasing temperature.'
    ],
    commonMistakes: [
      'Mixing units (kJ with J) when calculating ΔG = ΔH - TΔS. Remember ΔS is in J/(mol·K).'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter: Chemical and Ionic Equilibrium
  {
    id: 'chem-ionic-equilibrium-ph',
    subject: 'Chemistry',
    class: '11',
    category: 'Physical Chemistry',
    chapter: 'Chemical and Ionic Equilibrium',
    title: 'Ostwald Dilution, Henderson Equation & Ksp',
    latex: '\\alpha = \\sqrt{\\frac{K_a}{C}}, \\quad \\text{pH} = \\text{p}K_a + \\log\\frac{[\\text{Conjugate Base}]}{[\\text{Acid}]}, \\quad K_{sp} = x^x y^y s^{x+y} \\;(\\text{for } A_x B_y)',
    variables: [
      { symbol: '\\alpha', name: 'Degree of dissociation of weak electrolyte' },
      { symbol: 'K_a', name: 'Acid dissociation constant' },
      { symbol: 'C', name: 'Initial molar concentration', unit: 'mol/L' },
      { symbol: 's', name: 'Molar solubility of salt', unit: 'mol/L' },
      { symbol: 'K_{sp}', name: 'Solubility product constant' }
    ],
    conditions: [
      'Ostwald dilution law approximation holds when \\alpha \\ll 1 (typically \\alpha < 0.05).',
      'Henderson-Hasselbalch equation valid for buffer solutions (ratio 0.1 to 10).'
    ],
    notes: [
      'Salt of Weak Acid & Strong Base: \\text{pH} = 7 + \\frac{1}{2}(\\text{p}K_a + \\log C).',
      'Salt of Strong Acid & Weak Base: \\text{pH} = 7 - \\frac{1}{2}(\\text{p}K_b + \\log C).',
      'Salt of Weak Acid & Weak Base: \\text{pH} = 7 + \\frac{1}{2}(\\text{p}K_a - \\text{p}K_b) (independent of concentration C!).'
    ],
    commonMistakes: [
      'Assuming pH of 10⁻⁸ M HCl is 8 (must include water autoionization contribution [H⁺] = 10⁻⁷ M, yielding pH ≈ 6.79).'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Intermediate'
  },

  // Chapter: Solutions
  {
    id: 'chem-colligative-properties',
    subject: 'Chemistry',
    class: '12',
    category: 'Physical Chemistry',
    chapter: 'Solutions',
    title: 'Raoult\'s Law & Colligative Properties',
    latex: '\\frac{P^\\circ - P}{P^\\circ} = i\\,x_{\\text{solute}}, \\quad \\Delta T_b = i K_b m, \\quad \\Delta T_f = i K_f m, \\quad \\Pi = i C R T, \\quad i = 1 + (n - 1)\\alpha',
    variables: [
      { symbol: 'P^\\circ', name: 'Vapour pressure of pure solvent', unit: 'atm or mmHg' },
      { symbol: 'P', name: 'Vapour pressure of solution', unit: 'atm' },
      { symbol: 'i', name: 'van \'t Hoff factor' },
      { symbol: 'K_b', name: 'Molal boiling point elevation constant (ebullioscopic constant)', unit: 'K·kg/mol' },
      { symbol: 'K_f', name: 'Molal freezing point depression constant (cryoscopic constant)', unit: 'K·kg/mol' },
      { symbol: 'm', name: 'Molality of solution', unit: 'mol/kg' },
      { symbol: '\\Pi', name: 'Osmotic pressure', unit: 'atm' },
      { symbol: '\\alpha', name: 'Degree of ionization or association' },
      { symbol: 'n', name: 'Number of ions produced per molecule of electrolyte' }
    ],
    conditions: [
      'Dilute solutions exhibiting ideal behaviour.',
      'Solute must be non-volatile.'
    ],
    notes: [
      'For association (dimerization, etc.): i = 1 + (1/n - 1)β.',
      'Ideal solution: \\Delta H_{\\text{mix}} = 0, \\Delta V_{\\text{mix}} = 0, \\Delta S_{\\text{mix}} > 0, \\Delta G_{\\text{mix}} < 0.'
    ],
    commonMistakes: [
      'Forgetting to multiply by van \'t Hoff factor i for ionic electrolytes (e.g. NaCl has i ≈ 2, BaCl₂ has i ≈ 3).'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter: Electrochemistry
  {
    id: 'chem-nernst-equation',
    subject: 'Chemistry',
    class: '12',
    category: 'Physical Chemistry',
    chapter: 'Electrochemistry',
    title: 'Nernst Equation & Electrochemical Cells',
    latex: 'E_{\\text{cell}} = E^\\circ_{\\text{cell}} - \\frac{RT}{nF}\\ln Q = E^\\circ_{\\text{cell}} - \\frac{0.0591}{n}\\log_{10} Q \\quad (\\text{at } 298\\,\\text{K})',
    variables: [
      { symbol: 'E_{\\text{cell}}', name: 'Cell electromotive force under given concentrations', unit: 'V' },
      { symbol: 'E^\\circ_{\\text{cell}}', name: 'Standard cell potential: E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}}', unit: 'V' },
      { symbol: 'n', name: 'Number of moles of electrons transferred in balanced cell reaction' },
      { symbol: 'Q', name: 'Reaction quotient: [\\text{Products}]^p / [\\text{Reactants}]^r' },
      { symbol: 'F', name: 'Faraday constant (96,485 C/mol)' }
    ],
    conditions: [
      '298 K (25°C) for the 0.0591 numerical simplification factor.',
      'Pure solids and pure liquids have activities equal to 1 in Q.'
    ],
    notes: [
      'Equilibrium condition: E_{\\text{cell}} = 0 \\implies E^\\circ_{\\text{cell}} = \\frac{0.0591}{n}\\log_{10} K_{eq}.',
      'Maximum electrical work: W_{\\text{max}} = -\\Delta G^\\circ = n F E^\\circ_{\\text{cell}}.',
      'Kohlrausch\'s Law of independent migration: \\Lambda_m^\\circ = \\nu_+ \\lambda_+^\\circ + \\nu_- \\lambda_-^\\circ.'
    ],
    commonMistakes: [
      'Multiplying E° by stoichiometric coefficients when multiplying chemical equations. E° is an INTENSIVE property and never multiplies!'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter: Chemical Kinetics
  {
    id: 'chem-arrhenius-rate-law',
    subject: 'Chemistry',
    class: '12',
    category: 'Physical Chemistry',
    chapter: 'Chemical Kinetics',
    title: 'Integrated Rate Laws & Arrhenius Equation',
    latex: 'k = A e^{-\\frac{E_a}{RT}}, \\quad \\ln\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{R}\\left(\\frac{1}{T_1} - \\frac{1}{T_2}\\right), \\quad t_{1/2} = \\frac{0.693}{k} \\;(\\text{1st Order})',
    variables: [
      { symbol: 'k', name: 'Rate constant of reaction' },
      { symbol: 'A', name: 'Arrhenius frequency factor / pre-exponential factor' },
      { symbol: 'E_a', name: 'Activation energy of reaction', unit: 'J/mol or kJ/mol' },
      { symbol: 't_{1/2}', name: 'Reaction half-life', unit: 's' }
    ],
    conditions: [
      'Applies to elementary and complex reactions where Arrhenius temperature dependence holds.'
    ],
    notes: [
      'Zero Order: [A] = [A]_0 - kt, \\quad t_{1/2} = \\frac{[A]_0}{2k} (depends on initial concentration).',
      'First Order: \\ln[A] = \\ln[A]_0 - kt, \\quad t_{1/2} = \\frac{\\ln 2}{k} = \\frac{0.693}{k} (INDEPENDENT of initial concentration!).',
      'Second Order: \\frac{1}{[A]} = \\frac{1}{[A]_0} + kt, \\quad t_{1/2} = \\frac{1}{k[A]_0}.'
    ],
    commonMistakes: [
      'Assuming half-life is constant for all reaction orders; it is only constant for FIRST-order reactions.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // --- B. ORGANIC CHEMISTRY ---
  // Chapter: General Organic Chemistry
  {
    id: 'chem-degree-unsaturation',
    subject: 'Chemistry',
    class: '11',
    category: 'Organic Chemistry',
    chapter: 'General Organic Chemistry',
    title: 'Degree of Unsaturation & Huckel\'s Rule',
    latex: '\\text{DU} = C + 1 - \\frac{H}{2} - \\frac{X}{2} + \\frac{N}{2}, \\quad \\text{Aromaticity}: 4n + 2 \\;\\pi\\,\\text{electrons (cyclic, planar, conjugated)}',
    variables: [
      { symbol: '\\text{DU}', name: 'Degree of unsaturation (Double Bond Equivalents - DBE)' },
      { symbol: 'C, H, X, N', name: 'Number of carbon, hydrogen, halogen, and nitrogen atoms' },
      { symbol: 'n', name: 'Non-negative integer (0, 1, 2, 3...) in Huckel\'s rule' }
    ],
    conditions: [
      'DU calculation: Divalent atoms (Oxygen, Sulfur) are ignored in the formula.',
      'Huckel\'s rule requires complete cyclic delocalization in a flat planar geometry.'
    ],
    notes: [
      'DU = 1 corresponds to 1 double bond or 1 ring.',
      'Benzene ring has DU = 4 (3 double bonds + 1 ring).',
      'Anti-aromatic: Cyclic, planar, completely conjugated with 4n π electrons (extremely unstable, e.g. cyclobutadiene).'
    ],
    commonMistakes: [
      'Subtracting nitrogen instead of adding N/2 in the DU equation.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },
  {
    id: 'chem-carbocation-stability-goc',
    subject: 'Chemistry',
    class: '11',
    category: 'Organic Chemistry',
    chapter: 'General Organic Chemistry',
    title: 'Electronic Effects & Intermediates Stability Order',
    latex: '\\text{Carbocation Stability}: \\text{Aromatic} > \\text{Tropylium} > \\text{Dancing Resonance} > 3^\\circ > 2^\\circ > 1^\\circ > \\text{Methyl}',
    variables: [
      { symbol: '+I', name: 'Electron donating inductive effect (-C(CH₃)₃ > -CH(CH₃)₂ > -CH₂CH₃ > -CH₃)' },
      { symbol: '-I', name: 'Electron withdrawing inductive effect (-NO₂ > -CN > -COOH > -F > -Cl > -Br > -I > -OH > -C₆H₅)' },
      { symbol: '+M / +R', name: 'Electron donating mesomeric resonance effect (-O⁻ > -NR₂ > -NH₂ > -OH > -OR > -NHCOR > -X)' }
    ],
    conditions: [
      'Resonance / Mesomeric effect dominates over Inductive effect (Except for halogens where -I dominates over +M for reactivity!).'
    ],
    notes: [
      'Carbanion stability order is inverted compared to carbocations: Methyl > 1° > 2° > 3° (stabilized by -I and -M groups).',
      'Hyperconjugation in alkenes: Stability ∝ number of α-hydrogens with respect to C=C double bond.'
    ],
    commonMistakes: [
      'Applying mesomeric resonance to meta positions (mesomeric effect operates ONLY at ortho and para positions).'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Intermediate'
  },

  // Chapter: Hydrocarbons & Haloalkanes
  {
    id: 'chem-sn1-sn2-mechanisms',
    subject: 'Chemistry',
    class: '12',
    category: 'Organic Chemistry',
    chapter: 'Haloalkanes and Haloarenes',
    title: 'SN1 vs SN2 Nucleophilic Substitution Kinetics',
    latex: 'v_{\\text{SN1}} = k[R-X] \\;(\\text{Racemisation}, 3^\\circ > 2^\\circ > 1^\\circ), \\quad v_{\\text{SN2}} = k[R-X][\\text{Nu}^-] \\;(\\text{Walden Inversion}, \\text{CH}_3X > 1^\\circ > 2^\\circ > 3^\\circ)',
    variables: [
      { symbol: 'R-X', name: 'Alkyl halide substrate' },
      { symbol: '\\text{Nu}^-', name: 'Nucleophile' }
    ],
    conditions: [
      'SN1 favoured by: Polar protic solvents (H₂O, EtOH), weak nucleophiles, stabilized carbocations (3°, allylic, benzylic).',
      'SN2 favoured by: Polar aprotic solvents (DMSO, DMF, acetone), strong nucleophiles, unhindered primary substrates.'
    ],
    notes: [
      'SN2 occurs with 100% stereochemical inversion (Walden inversion) via a 5-coordinate trigonal bipyramidal transition state.',
      'Elimination competition: E2 favored by strong bulky bases (t-BuO⁻) leading to Hofmann alkene, heat strongly favors elimination over substitution.'
    ],
    commonMistakes: [
      'Thinking SN1 gives 100% pure 50:50 racemic mixture; partial inversion often exceeds retention due to intimate ion pairing.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter: Aldehydes, Ketones and Carboxylic Acids
  {
    id: 'chem-aldol-cannizzaro',
    subject: 'Chemistry',
    class: '12',
    category: 'Organic Chemistry',
    chapter: 'Aldehydes and Ketones',
    title: 'Aldol Condensation & Cannizzaro Reaction',
    latex: '2\\,\\text{R-CH}_2\\text{CHO} \\xrightarrow{\\text{dil. NaOH}} \\text{R-CH}_2\\text{CH(OH)CH(R)CHO} \\xrightarrow{\\Delta, -\\text{H}_2\\text{O}} \\text{R-CH}_2\\text{CH=C(R)CHO}',
    variables: [
      { symbol: '\\alpha\\text{-H}', name: 'Alpha hydrogen attached to carbon adjacent to carbonyl group' }
    ],
    conditions: [
      'Aldol requires carbonyl compounds having AT LEAST ONE \\alpha-hydrogen.',
      'Cannizzaro requires aldehydes having NO \\alpha-hydrogen (HCHO, PhCHO) treated with concentrated base (50% NaOH).'
    ],
    notes: [
      'Cannizzaro is a disproportionation redox reaction: One molecule oxidizes to carboxylic acid salt, the other reduces to primary alcohol.',
      'Crossed Cannizzaro with Formaldehyde: Formaldehyde is always oxidized to sodium formate, and the other aldehyde is reduced.'
    ],
    commonMistakes: [
      'Attempting Cannizzaro reaction on acetaldehyde (it contains 3 α-hydrogens and undergoes aldol instead).'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Intermediate'
  },

  // --- C. INORGANIC CHEMISTRY ---
  // Chapter: Coordination Compounds
  {
    id: 'chem-cft-cfse-splitting',
    subject: 'Chemistry',
    class: '12',
    category: 'Inorganic Chemistry',
    chapter: 'Coordination Compounds',
    title: 'Crystal Field Splitting & CFSE Calculation',
    latex: '\\Delta_t = \\frac{4}{9}\\Delta_o, \\quad \\text{CFSE}_{\\text{oct}} = \\left(-0.4\\,n_{t_{2g}} + 0.6\\,n_{e_g}\\right)\\Delta_o + m P, \\quad \\mu_s = \\sqrt{n(n+2)}\\,\\text{BM}',
    variables: [
      { symbol: '\\Delta_o', name: 'Octahedral crystal field splitting energy' },
      { symbol: '\\Delta_t', name: 'Tetrahedral crystal field splitting energy (always weak field, no pairing)' },
      { symbol: 'n_{t_{2g}}, n_{e_g}', name: 'Number of electrons in t₂g and eg sets' },
      { symbol: 'P', name: 'Electron pairing energy' },
      { symbol: 'n', name: 'Number of unpaired electrons' },
      { symbol: '\\mu_s', name: 'Spin-only magnetic moment in Bohr Magnetons (BM)' }
    ],
    conditions: [
      'Octahedral: Strong field ligands (CN⁻, CO, en) cause large Δ_o > P (low spin complexes).',
      'Weak field ligands (I⁻, Br⁻, Cl⁻, F⁻, H₂O) cause Δ_o < P (high spin complexes).'
    ],
    notes: [
      'Spectrochemical Series: I⁻ < Br⁻ < S²⁻ < SCN⁻ < Cl⁻ < F⁻ < OH⁻ < C₂O₄²⁻ < H₂O < NCS⁻ < EDTA⁴⁻ < NH₃ < en < NO₂⁻ < CN⁻ < CO.',
      'Tetrahedral splitting is inverted: e is lower, t₂ is higher, and Δ_t is always smaller than P.'
    ],
    commonMistakes: [
      'Assuming tetrahedral complexes can be low spin. Δ_t is too small to overcome pairing energy P.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Intermediate'
  },
  {
    id: 'chem-effective-atomic-number',
    subject: 'Chemistry',
    class: '12',
    category: 'Inorganic Chemistry',
    chapter: 'Coordination Compounds',
    title: 'Sidgwick\'s Effective Atomic Number (EAN) Rule',
    latex: '\\text{EAN} = Z - \\text{Oxidation State} + 2\\times\\text{Coordination Number}',
    variables: [
      { symbol: 'Z', name: 'Atomic number of central transition metal' },
      { symbol: '\\text{EAN}', name: 'Effective atomic number (reaches noble gas configuration 36, 54, or 86 when stable)' }
    ],
    notes: [
      'Example: In [Fe(CN)₆]⁴⁻, Z = 26, O.S. = +2, CN = 6: EAN = 26 - 2 + 2(6) = 36 (Krypton configuration).',
      'In metal carbonyls, the 18-electron rule is an equivalent modern statement of EAN.'
    ],
    commonMistakes: [
      'Adding oxidation state instead of subtracting it from Z.'
    ],
    examTags: ['JEE Main', 'JEE Advanced'],
    difficulty: 'Fundamental'
  }
];
