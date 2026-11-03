import { IdentityItem } from '../types/formula';

export const IDENTITIES_DATA: IdentityItem[] = [
  // Algebraic Identities
  {
    id: 'alg-cube-sum',
    category: 'Algebraic Identities',
    title: 'Sum and Difference of Cubes',
    latex: 'a^3 \\pm b^3 = (a \\pm b)(a^2 \\mp ab + b^2)',
    notes: 'Essential for factorization in limits and algebra problems.'
  },
  {
    id: 'alg-three-cubes',
    category: 'Algebraic Identities',
    title: 'Three Variable Cubic Identity',
    latex: 'a^3 + b^3 + c^3 - 3abc = (a + b + c)(a^2 + b^2 + c^2 - ab - bc - ca)',
    notes: 'If a + b + c = 0, then a³ + b³ + c³ = 3abc. Frequently tested in JEE Main and Advanced.'
  },
  {
    id: 'alg-sum-squares-half',
    category: 'Algebraic Identities',
    title: 'Symmetric Square Transformation',
    latex: 'a^2 + b^2 + c^2 - ab - bc - ca = \\frac{1}{2}\\left[(a-b)^2 + (b-c)^2 + (c-a)^2\\right]',
    notes: 'Always non-negative for real numbers; equals zero if and only if a = b = c.'
  },
  {
    id: 'alg-lagrange',
    category: 'Algebraic Identities',
    title: 'Lagrange\'s Identity (2-Term)',
    latex: '(a^2 + b^2)(x^2 + y^2) - (ax + by)^2 = (ay - bx)^2',
    notes: 'Directly implies the Cauchy-Schwarz inequality for 2 dimensions.'
  },

  // Trigonometric Identities
  {
    id: 'trig-pythagorean',
    category: 'Trigonometric Identities',
    title: 'Fundamental Pythagorean Identities',
    latex: '\\sin^2\\theta + \\cos^2\\theta = 1, \\quad 1 + \\tan^2\\theta = \\sec^2\\theta, \\quad 1 + \\cot^2\\theta = \\csc^2\\theta',
    notes: 'Note: \\sec^2\\theta - \\tan^2\\theta = 1 \\implies (\\sec\\theta - \\tan\\theta)(\\sec\\theta + \\tan\\theta) = 1.'
  },
  {
    id: 'trig-compound',
    category: 'Trigonometric Identities',
    title: 'Compound Angle Formulas',
    latex: '\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B, \\quad \\cos(A \\pm B) = \\cos A\\cos B \\mp \\sin A\\sin B',
    notes: 'Watch the sign flip in the cosine compound angle formula.'
  },
  {
    id: 'trig-tan-compound',
    category: 'Trigonometric Identities',
    title: 'Tangent Compound Angle',
    latex: '\\tan(A \\pm B) = \\frac{\\tan A \\pm \\tan B}{1 \\mp \\tan A\\tan B}',
    notes: 'Valid when A, B, and A ± B are not odd multiples of π/2.'
  },
  {
    id: 'trig-double',
    category: 'Trigonometric Identities',
    title: 'Double Angle Formulas',
    latex: '\\sin 2\\theta = 2\\sin\\theta\\cos\\theta = \\frac{2\\tan\\theta}{1 + \\tan^2\\theta}, \\quad \\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta = 2\\cos^2\\theta - 1 = 1 - 2\\sin^2\\theta = \\frac{1 - \\tan^2\\theta}{1 + \\tan^2\\theta}',
    notes: 'Crucial for rationalizing trigonometric integrals via Weierstrass substitution.'
  },
  {
    id: 'trig-triple',
    category: 'Trigonometric Identities',
    title: 'Triple Angle Formulas',
    latex: '\\sin 3\\theta = 3\\sin\\theta - 4\\sin^3\\theta, \\quad \\cos 3\\theta = 4\\cos^3\\theta - 3\\cos\\theta, \\quad \\tan 3\\theta = \\frac{3\\tan\\theta - \\tan^3\\theta}{1 - 3\\tan^2\\theta}',
    notes: 'Mnemonic: sin 3θ has the 3 first (3 sin θ - 4 sin³ θ), cos 3θ has the 4 first (4 cos³ θ - 3 cos θ).'
  },
  {
    id: 'trig-product-to-sum',
    category: 'Trigonometric Identities',
    title: 'Product-to-Sum Formulas',
    latex: '2\\sin A\\cos B = \\sin(A+B) + \\sin(A-B), \\quad 2\\cos A\\cos B = \\cos(A+B) + \\cos(A-B), \\quad 2\\sin A\\sin B = \\cos(A-B) - \\cos(A+B)',
    notes: 'Notice the reverse subtraction in 2 sin A sin B = cos(A - B) - cos(A + B).'
  },
  {
    id: 'trig-sum-to-product',
    category: 'Trigonometric Identities',
    title: 'Sum-to-Product (C-D Formulas)',
    latex: '\\sin C + \\sin D = 2\\sin\\frac{C+D}{2}\\cos\\frac{C-D}{2}, \\quad \\cos C - \\cos D = -2\\sin\\frac{C+D}{2}\\sin\\frac{C-D}{2} = 2\\sin\\frac{C+D}{2}\\sin\\frac{D-C}{2}',
    notes: 'Notice the negative sign or flipped argument in cos C - cos D.'
  },

  // Calculus Standard Forms
  {
    id: 'calc-derivatives-table',
    category: 'Calculus Standard Forms',
    title: 'Standard Trigonometric Derivatives',
    latex: '\\frac{d}{dx}(\\sin x) = \\cos x, \\quad \\frac{d}{dx}(\\cos x) = -\\sin x, \\quad \\frac{d}{dx}(\\tan x) = \\sec^2 x, \\quad \\frac{d}{dx}(\\sec x) = \\sec x\\tan x',
    notes: 'Every co-function (cos, cot, csc) has a negative derivative sign.'
  },
  {
    id: 'calc-inv-derivatives',
    category: 'Calculus Standard Forms',
    title: 'Inverse Trigonometric Derivatives',
    latex: '\\frac{d}{dx}(\\arcsin x) = \\frac{1}{\\sqrt{1-x^2}}, \\quad \\frac{d}{dx}(\\arctan x) = \\frac{1}{1+x^2}, \\quad \\frac{d}{dx}(\\text{arcsec } x) = \\frac{1}{|x|\\sqrt{x^2-1}}',
    notes: 'Valid for appropriate principal value branches: |x| < 1 for arcsin x, |x| > 1 for arcsec x.'
  },
  {
    id: 'calc-special-integrals',
    category: 'Calculus Standard Forms',
    title: 'Special Quadratic Rational Integrals',
    latex: '\\int \\frac{dx}{x^2 - a^2} = \\frac{1}{2a}\\ln\\left|\\frac{x-a}{x+a}\\right| + C, \\quad \\int \\frac{dx}{a^2 - x^2} = \\frac{1}{2a}\\ln\\left|\\frac{a+x}{a-x}\\right| + C',
    notes: 'Very frequently confused in JEE Main. Remember: x² - a² has (x - a) in numerator.'
  },
  {
    id: 'calc-special-roots-integrals',
    category: 'Calculus Standard Forms',
    title: 'Irrational Quadratic Standard Integrals',
    latex: '\\int \\frac{dx}{\\sqrt{x^2 \\pm a^2}} = \\ln\\left|x + \\sqrt{x^2 \\pm a^2}\\right| + C, \\quad \\int \\frac{dx}{\\sqrt{a^2 - x^2}} = \\arcsin\\left(\\frac{x}{a}\\right) + C',
    notes: 'No 1/a factor appears outside the ln in ∫ dx/√(x² ± a²).'
  },
  {
    id: 'calc-by-parts',
    category: 'Calculus Standard Forms',
    title: 'Integration by Parts (ILATE Rule)',
    latex: '\\int u\\,v\\,dx = u\\int v\\,dx - \\int \\left(u\'\\int v\\,dx\\right)dx',
    notes: 'Priority order for u (first function): Inverse trig > Logarithmic > Algebraic > Trigonometric > Exponential.'
  },
  {
    id: 'calc-king-property',
    category: 'Calculus Standard Forms',
    title: 'Definite Integral: King\'s Property',
    latex: '\\int_a^b f(x)\\,dx = \\int_a^b f(a + b - x)\\,dx, \\quad \\int_0^a f(x)\\,dx = \\int_0^a f(a - x)\\,dx',
    notes: 'The single most heavily tested property in JEE Main and Advanced definite calculus.'
  }
];
