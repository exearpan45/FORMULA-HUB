import { QuizQuestion } from '../types/formula';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'quiz-1',
    subject: 'Physics',
    chapter: 'System of Particles and Rotational Motion',
    question: 'A solid sphere, a solid cylinder, and a thin circular ring, each having the same mass and external radius, roll down an identical inclined plane without slipping from rest. In which order do they reach the bottom?',
    latexQuestion: 'a_{\\text{cm}} = \\frac{g\\sin\\theta}{1 + \\frac{k^2}{R^2}}',
    options: [
      { id: 'a', text: 'Ring first, then Cylinder, then Sphere' },
      { id: 'b', text: 'Sphere first, then Cylinder, then Ring' },
      { id: 'c', text: 'Cylinder first, then Sphere, then Ring' },
      { id: 'd', text: 'All reach simultaneously because masses and radii are identical' }
    ],
    correctOptionId: 'b',
    explanation: 'Acceleration in pure rolling is inversely proportional to (1 + k²/R²). For a solid sphere, k²/R² = 2/5 = 0.4 (highest acceleration, reaches first). For cylinder, k²/R² = 0.5. For ring, k²/R² = 1.0 (lowest acceleration, reaches last).',
    latexExplanation: 'a = \\frac{g\\sin\\theta}{1 + k^2/R^2} \\implies a_{\\text{sphere}} (0.71 g\\sin\\theta) > a_{\\text{cylinder}} (0.67 g\\sin\\theta) > a_{\\text{ring}} (0.50 g\\sin\\theta)',
    exam: ['JEE Main', 'JEE Advanced', 'NEET']
  },
  {
    id: 'quiz-2',
    subject: 'Physics',
    chapter: 'Current Electricity',
    question: 'A metallic uniform resistance wire of resistance R is stretched uniformly such that its length increases by 20% while its total volume remains unchanged. What is its new resistance?',
    options: [
      { id: 'a', text: '1.20 R' },
      { id: 'b', text: '1.40 R' },
      { id: 'c', text: '1.44 R' },
      { id: 'd', text: '2.00 R' }
    ],
    correctOptionId: 'c',
    explanation: 'When stretched without adding mass, volume V = A·L remains constant, so A\' = A / 1.2. Hence R\' = ρ L\' / A\' = ρ (1.2 L) / (A / 1.2) = 1.44 R (or (1.2)² R).',
    latexExplanation: 'R = \\rho\\frac{L}{A} = \\rho\\frac{L^2}{V} \\implies R \\propto L^2 \\implies R\' = (1.2)^2 R = 1.44 R',
    exam: ['JEE Main', 'NEET']
  },
  {
    id: 'quiz-3',
    subject: 'Physics',
    chapter: 'Thermodynamics',
    question: 'A reversible Carnot heat engine operates between temperatures 500 K and 300 K. What is the theoretical maximum work output if it absorbs 1000 J of heat from the hot reservoir?',
    options: [
      { id: 'a', text: '600 J' },
      { id: 'b', text: '400 J' },
      { id: 'c', text: '250 J' },
      { id: 'd', text: '500 J' }
    ],
    correctOptionId: 'b',
    explanation: 'Carnot efficiency η = 1 - T_C / T_H = 1 - 300/500 = 0.40 (40%). Therefore, Work = η × Q_H = 0.40 × 1000 J = 400 J.',
    latexExplanation: '\\eta = 1 - \\frac{300}{500} = 0.40, \\quad W = \\eta Q_H = 400\\,\\text{J}',
    exam: ['JEE Main', 'JEE Advanced', 'NEET']
  },
  {
    id: 'quiz-4',
    subject: 'Chemistry',
    chapter: 'Electrochemistry',
    question: 'If the standard reduction potential of Zn²⁺/Zn is -0.76 V and of Cu²⁺/Cu is +0.34 V, what is the standard electromotive force (E°cell) of the standard Daniell cell?',
    options: [
      { id: 'a', text: '+0.42 V' },
      { id: 'b', text: '-0.42 V' },
      { id: 'c', text: '+1.10 V' },
      { id: 'd', text: '-1.10 V' }
    ],
    correctOptionId: 'c',
    explanation: 'Standard cell potential E°cell = E°cathode - E°anode = E°(Cu²⁺/Cu) - E°(Zn²⁺/Zn) = +0.34 V - (-0.76 V) = +1.10 V.',
    latexExplanation: 'E^\\circ_{\\text{cell}} = E^\\circ_{\\text{cathode}} - E^\\circ_{\\text{anode}} = 0.34 - (-0.76) = +1.10\\,\\text{V}',
    exam: ['JEE Main', 'NEET']
  },
  {
    id: 'quiz-5',
    subject: 'Chemistry',
    chapter: 'Chemical Kinetics',
    question: 'For a first-order chemical reaction, the time required for 99.9% completion is approximately how many times the half-life (t₁/₂)?',
    options: [
      { id: 'a', text: '3 times' },
      { id: 'b', text: '5 times' },
      { id: 'c', text: '10 times' },
      { id: 'd', text: '20 times' }
    ],
    correctOptionId: 'c',
    explanation: 'For 99.9% completion, remaining concentration is [A] = 0.001 [A]₀ = [A]₀ / 10³. Thus [A]₀/[A] = 1000 ≈ 2¹⁰, which corresponds to exactly 10 consecutive half-lives.',
    latexExplanation: 't_{99.9\\%} = \\frac{2.303}{k}\\log\\left(\\frac{100}{0.1}\\right) = \\frac{2.303}{k}\\times 3 = \\frac{6.909}{k} \\approx 10\\times\\frac{0.693}{k} = 10\\,t_{1/2}',
    exam: ['JEE Main', 'JEE Advanced', 'NEET']
  },
  {
    id: 'quiz-6',
    subject: 'Chemistry',
    chapter: 'Coordination Compounds',
    question: 'What is the spin-only magnetic moment of [Fe(H₂O)₆]²⁺ complex ion? (Atomic number of Fe = 26)',
    options: [
      { id: 'a', text: '0 BM' },
      { id: 'b', text: '2.84 BM' },
      { id: 'c', text: '4.90 BM' },
      { id: 'd', text: '5.92 BM' }
    ],
    correctOptionId: 'c',
    explanation: 'Fe²⁺ has 3d⁶ electronic configuration. H₂O is a weak-field ligand, so electrons do not pair up: t₂g⁴ eg². The number of unpaired electrons is n = 4. Magnetic moment μ = √(4(4+2)) = √24 ≈ 4.90 BM.',
    latexExplanation: '\\mu_s = \\sqrt{n(n+2)} = \\sqrt{4(6)} = \\sqrt{24} \\approx 4.90\\,\\text{BM}',
    exam: ['JEE Main', 'JEE Advanced', 'NEET']
  },
  {
    id: 'quiz-7',
    subject: 'Mathematics',
    chapter: 'Integrals',
    question: 'Evaluate the definite integral: ∫ from -π/2 to +π/2 of (x³ + x·cos x + tan⁵ x + 1) dx.',
    options: [
      { id: 'a', text: '0' },
      { id: 'b', text: 'π/2' },
      { id: 'c', text: 'π' },
      { id: 'd', text: '2π' }
    ],
    correctOptionId: 'c',
    explanation: 'The functions x³, x·cos x, and tan⁵ x are all odd functions (f(-x) = -f(x)), so their integrals over [-π/2, π/2] evaluate strictly to 0. Only the constant 1 survives: ∫_{-π/2}^{π/2} 1 dx = π/2 - (-π/2) = π.',
    latexExplanation: '\\int_{-\\pi/2}^{\\pi/2} (\\text{odd})\\,dx = 0 \\implies \\int_{-\\pi/2}^{\\pi/2} 1\\,dx = \\pi',
    exam: ['JEE Main', 'JEE Advanced']
  },
  {
    id: 'quiz-8',
    subject: 'Mathematics',
    chapter: 'Differential Equations',
    question: 'What is the integrating factor (IF) for the linear differential equation: x (dy/dx) + 2y = x²?',
    options: [
      { id: 'a', text: 'x' },
      { id: 'b', text: 'x²' },
      { id: 'c', text: 'e^(2x)' },
      { id: 'd', text: 'ln x' }
    ],
    correctOptionId: 'b',
    explanation: 'First divide by x to put into standard form dy/dx + (2/x)y = x. Here P(x) = 2/x. The integrating factor is IF = e^(∫ (2/x) dx) = e^(2 ln x) = e^(ln x²) = x².',
    latexExplanation: '\\text{IF} = e^{\\int \\frac{2}{x}\\,dx} = e^{2\\ln x} = x^2',
    exam: ['JEE Main', 'JEE Advanced']
  },
  {
    id: 'quiz-9',
    subject: 'Mathematics',
    chapter: 'Matrices and Determinants',
    question: 'If A is a 3 × 3 non-singular matrix with determinant |A| = 5, what is the value of |adj(A)|?',
    options: [
      { id: 'a', text: '5' },
      { id: 'b', text: '15' },
      { id: 'c', text: '25' },
      { id: 'd', text: '125' }
    ],
    correctOptionId: 'c',
    explanation: 'For any n × n square matrix, |adj(A)| = |A|^(n - 1). For n = 3, |adj(A)| = |A|² = 5² = 25.',
    latexExplanation: '|\\text{adj}(A)| = |A|^{n-1} = 5^{3-1} = 5^2 = 25',
    exam: ['JEE Main', 'JEE Advanced']
  }
];
