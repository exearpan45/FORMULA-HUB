import { Formula } from '../types/formula';

export const MATH_FORMULAS: Formula[] = [
  // --- CLASS 11 ---
  // Chapter: Sets & Relations
  {
    id: 'math-inclusion-exclusion',
    subject: 'Mathematics',
    class: '11',
    category: 'Algebra',
    chapter: 'Sets',
    title: 'Principle of Inclusion-Exclusion & De Morgan\'s Laws',
    latex: 'n(A \\cup B \\cup C) = n(A) + n(B) + n(C) - n(A \\cap B) - n(B \\cap C) - n(C \\cap A) + n(A \\cap B \\cap C), \\quad (A \\cup B)\' = A\' \\cap B\'',
    variables: [
      { symbol: 'n(S)', name: 'Cardinality / number of elements in set S' },
      { symbol: 'A\'', name: 'Complement of set A with respect to universal set U' }
    ],
    conditions: [
      'Valid for any finite sets A, B, C.'
    ],
    notes: [
      'Number of elements in exactly one set: \\sum n(A) - 2\\sum n(A \\cap B) + 3 n(A \\cap B \\cap C).',
      'Number of subsets of a set with n elements is 2ⁿ; number of proper subsets is 2ⁿ - 1.'
    ],
    commonMistakes: [
      'Forgetting to add back the triple intersection n(A ∩ B ∩ C) at the end.'
    ],
    examTags: ['JEE Main', 'JEE Advanced'],
    difficulty: 'Fundamental'
  },

  // Chapter: Complex Numbers
  {
    id: 'math-complex-roots-unity',
    subject: 'Mathematics',
    class: '11',
    category: 'Algebra',
    chapter: 'Complex Numbers',
    title: 'Cube Roots of Unity & Triangle Inequalities',
    latex: '1 + \\omega + \\omega^2 = 0, \\quad \\omega^3 = 1, \\quad ||z_1| - |z_2|| \\le |z_1 \\pm z_2| \\le |z_1| + |z_2|, \\quad z = r e^{i\\theta} = r(\\cos\\theta + i\\sin\\theta)',
    variables: [
      { symbol: '\\omega', name: 'Complex cube root of unity: \\frac{-1 + i\\sqrt{3}}{2} = e^{i 2\\pi/3}' },
      { symbol: 'r', name: 'Modulus |z| = \\sqrt{x^2 + y^2}' },
      { symbol: '\\theta', name: 'Principal argument (-\\pi < \\theta \\le \\pi)' }
    ],
    conditions: [
      'Triangle inequality equality holds on right side if origin, z₁, z₂ are collinear with z₁, z₂ on the same side of origin.'
    ],
    notes: [
      'De Moivre\'s Theorem: (\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta) for any integer n.',
      'Geometry: |z - z_0| = R represents a circle centered at z₀ with radius R.',
      'Distance formula: |z_1 - z_2| represents Euclidean separation in Argand plane.'
    ],
    commonMistakes: [
      'Assuming Arg(z) can take values outside the open-closed interval (-π, π].'
    ],
    examTags: ['JEE Main', 'JEE Advanced'],
    difficulty: 'Fundamental'
  },

  // Chapter: Quadratic Equations
  {
    id: 'math-quadratic-roots',
    subject: 'Mathematics',
    class: '11',
    category: 'Algebra',
    chapter: 'Quadratic Equations',
    title: 'Roots, Coefficients & Common Root Condition',
    latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, \\quad \\alpha + \\beta = -\\frac{b}{a}, \\quad \\alpha\\beta = \\frac{c}{a}, \\quad (c_1 a_2 - c_2 a_1)^2 = (a_1 b_2 - a_2 b_1)(b_1 c_2 - b_2 c_1)',
    variables: [
      { symbol: 'a, b, c', name: 'Coefficients of quadratic equation ax² + bx + c = 0 (a ≠ 0)' },
      { symbol: '\\Delta = b^2 - 4ac', name: 'Discriminant of the quadratic' },
      { symbol: '\\alpha, \\beta', name: 'Roots of the quadratic polynomial' }
    ],
    conditions: [
      'For both roots common to a₁x² + b₁x + c₁ = 0 and a₂x² + b₂x + c₂ = 0: a₁/a₂ = b₁/b₂ = c₁/c₂.'
    ],
    notes: [
      'If coefficients are rational and discriminant Δ is positive non-perfect square, roots occur in conjugate irrational pairs: p ± √q.',
      'If coefficients are real and Δ < 0, roots occur in conjugate complex pairs: p ± iq.',
      'Vertex of parabola y = ax² + bx + c is at \\left(-\\frac{b}{2a}, -\\frac{\\Delta}{4a}\\right).'
    ],
    commonMistakes: [
      'Forgetting that a quadratic equation can only have AT MOST 2 roots, unless it is an identity (a = b = c = 0).'
    ],
    examTags: ['JEE Main', 'JEE Advanced'],
    difficulty: 'Fundamental'
  },

  // Chapter: Permutations and Combinations
  {
    id: 'math-permutations-combinations',
    subject: 'Mathematics',
    class: '11',
    category: 'Algebra',
    chapter: 'Permutations and Combinations',
    title: 'Permutations, Combinations & Derangements',
    latex: '^nC_r = \\frac{n!}{r!(n-r)!}, \\quad ^nC_r + ^nC_{r-1} = ^{n+1}C_r, \\quad D_n = n!\\left(1 - \\frac{1}{1!} + \\frac{1}{2!} - \\frac{1}{3!} + \\dots + \\frac{(-1)^n}{n!}\\right)',
    variables: [
      { symbol: '^nC_r', name: 'Combinations of n objects taken r at a time' },
      { symbol: '^nP_r', name: 'Permutations: n! / (n - r)!' },
      { symbol: 'D_n', name: 'Number of derangements of n objects (no item in its natural place)' }
    ],
    notes: [
      'Circular permutations: (n - 1)! for distinct arrangements, or (n - 1)! / 2 for necklaces where clockwise and counterclockwise are identical.',
      'Multinomial distribution of n items into groups of size p, q, r: \\frac{n!}{p!\\,q!\\,r!}.',
      'Number of non-negative integer solutions to x₁ + x₂ + ... + xᵣ = n is ⁿ⁺ʳ⁻¹Cᵣ₋₁.'
    ],
    commonMistakes: [
      'Confusing non-negative integer solutions (n+r-1Cr-1) with positive integer solutions (n-1Cr-1).'
    ],
    examTags: ['JEE Main', 'JEE Advanced'],
    difficulty: 'Intermediate'
  },

  // Chapter: Sequences and Series
  {
    id: 'math-sequences-am-gm',
    subject: 'Mathematics',
    class: '11',
    category: 'Algebra',
    chapter: 'Sequences and Series',
    title: 'AP, GP, Infinite Series & AM-GM-HM Inequality',
    latex: 'S_n^{\\text{AP}} = \\frac{n}{2}\\left(2a + (n-1)d\\right), \\quad S_\\infty^{\\text{GP}} = \\frac{a}{1 - r} \\;(|r| < 1), \\quad \\text{AM} \\ge \\text{GM} \\ge \\text{HM} \\implies \\frac{a+b}{2} \\ge \\sqrt{ab} \\ge \\frac{2ab}{a+b}',
    variables: [
      { symbol: 'a', name: 'First term' },
      { symbol: 'd', name: 'Common difference of AP' },
      { symbol: 'r', name: 'Common ratio of GP' },
      { symbol: 'S_\\infty', name: 'Sum of infinite convergent GP' }
    ],
    conditions: [
      'AM-GM-HM inequality applies strictly to positive real numbers (a_i > 0). Equality holds if and only if all terms are equal.'
    ],
    notes: [
      'Standard series sums:',
      '\\sum_{k=1}^n k = \\frac{n(n+1)}{2}',
      '\\sum_{k=1}^n k^2 = \\frac{n(n+1)(2n+1)}{6}',
      '\\sum_{k=1}^n k^3 = \\left(\\frac{n(n+1)}{2}\\right)^2'
    ],
    commonMistakes: [
      'Applying the infinite GP sum formula when |r| ≥ 1 (the series diverges!).'
    ],
    examTags: ['JEE Main', 'JEE Advanced'],
    difficulty: 'Fundamental'
  },

  // Chapter: Straight Lines
  {
    id: 'math-straight-lines-distance',
    subject: 'Mathematics',
    class: '11',
    category: 'Coordinate Geometry',
    chapter: 'Straight Lines',
    title: 'Perpendicular Distance & Angle Between Lines',
    latex: 'd = \\frac{|a x_1 + b y_1 + c|}{\\sqrt{a^2 + b^2}}, \\quad d_{\\parallel} = \\frac{|c_1 - c_2|}{\\sqrt{a^2 + b^2}}, \\quad \\tan\\theta = \\left|\\frac{m_1 - m_2}{1 + m_1 m_2}\\right|, \\quad m_1 m_2 = -1 \\;(\\text{perpendicular})',
    variables: [
      { symbol: 'd', name: 'Perpendicular distance from point (x₁, y₁) to line ax + by + c = 0' },
      { symbol: 'd_{\\parallel}', name: 'Distance between two parallel lines ax + by + c₁ = 0 and ax + by + c₂ = 0' },
      { symbol: 'm_1, m_2', name: 'Slopes of lines' }
    ],
    conditions: [
      'For distance between parallel lines, the coefficients of x and y in both equations must be identical before subtracting constants.'
    ],
    notes: [
      'Equation of angle bisectors: \\frac{a_1 x + b_1 y + c_1}{\\sqrt{a_1^2 + b_1^2}} = \\pm \\frac{a_2 x + b_2 y + c_2}{\\sqrt{a_2^2 + b_2^2}}.',
      'Homogeneous equation of pair of lines ax² + 2hxy + by² = 0: Lines are perpendicular if a + b = 0; coincident if h² - ab = 0.'
    ],
    commonMistakes: [
      'Not normalizing coefficients before applying the parallel distance formula.'
    ],
    examTags: ['JEE Main', 'JEE Advanced'],
    difficulty: 'Fundamental'
  },

  // Chapter: Conic Sections
  {
    id: 'math-conic-sections-tangents',
    subject: 'Mathematics',
    class: '11',
    category: 'Coordinate Geometry',
    chapter: 'Conic Sections',
    title: 'Conics Standard Equations & Slopes of Tangents',
    latex: 'y^2 = 4ax \\implies y = mx + \\frac{a}{m}, \\quad \\frac{x^2}{a^2} + \\frac{y^2}{b^2} = 1 \\implies y = mx \\pm \\sqrt{a^2 m^2 + b^2}, \\quad \\frac{x^2}{a^2} - \\frac{y^2}{b^2} = 1 \\implies y = mx \\pm \\sqrt{a^2 m^2 - b^2}',
    variables: [
      { symbol: 'm', name: 'Slope of tangent line' },
      { symbol: 'a, b', name: 'Semi-major and semi-minor axis lengths' },
      { symbol: 'e', name: 'Eccentricity (Parabola: e = 1, Ellipse: e = \\sqrt{1 - b^2/a^2} < 1, Hyperbola: e = \\sqrt{1 + b^2/a^2} > 1)' }
    ],
    conditions: [
      'For hyperbola tangent, slope must satisfy m² > b²/a² for real tangents.'
    ],
    notes: [
      'Point Form Tangent (T = 0 rule): Replace x² → xx₁, y² → yy₁, 2x → x + x₁, 2y → y + y₁.',
      'Director Circle (locus of points from which perpendicular tangents can be drawn):',
      'Circle: x² + y² = 2a²; Ellipse: x² + y² = a² + b²; Hyperbola: x² + y² = a² - b² (exists only if a > b).'
    ],
    commonMistakes: [
      'Mixing up the sign under the square root for ellipse (+b²) versus hyperbola (-b²).'
    ],
    examTags: ['JEE Main', 'JEE Advanced'],
    difficulty: 'Intermediate'
  },

  // Chapter: Limits and Derivatives
  {
    id: 'math-limits-lhopital',
    subject: 'Mathematics',
    class: '11',
    category: 'Calculus',
    chapter: 'Limits and Derivatives',
    title: 'Standard Limits & L\'Hôpital\'s Rule',
    latex: '\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1, \\quad \\lim_{x\\to 0}\\frac{e^x - 1}{x} = 1, \\quad \\lim_{x\\to 0}(1 + x)^{1/x} = e, \\quad \\lim_{x\\to c}\\frac{f(x)}{g(x)} = \\lim_{x\\to c}\\frac{f\'(x)}{g\'(x)} \\;\\left(\\left[\\frac{0}{0}\\right] \\text{ or } \\left[\\frac{\\infty}{\\infty}\\right]\\right)',
    variables: [
      { symbol: 'x', name: 'Independent variable' },
      { symbol: 'e', name: 'Euler\'s number (approx 2.71828)' }
    ],
    conditions: [
      'L\'Hôpital\'s rule applies ONLY to indeterminate forms 0/0 or ∞/∞. Never apply to determinate fractions.'
    ],
    notes: [
      '1^\\infty form evaluation: \\lim_{x\\to a} f(x)^{g(x)} = e^{\\lim_{x\\to a} g(x)(f(x) - 1)} where f(x) → 1 and g(x) → ∞.',
      'Expansion method often evaluates limits much faster than repeated L\'Hôpital differentiation in JEE Advanced.'
    ],
    commonMistakes: [
      'Applying quotient rule instead of taking derivatives of numerator and denominator independently in L\'Hôpital.'
    ],
    examTags: ['JEE Main', 'JEE Advanced'],
    difficulty: 'Fundamental'
  },

  // --- CLASS 12 ---
  // Chapter: Inverse Trigonometric Functions
  {
    id: 'math-inverse-trig-addition',
    subject: 'Mathematics',
    class: '12',
    category: 'Trigonometry',
    chapter: 'Inverse Trigonometric Functions',
    title: 'Inverse Trigonometric Addition & Principal Ranges',
    latex: '\\arctan x + \\arctan y = \\begin{cases} \\arctan\\left(\\frac{x+y}{1-xy}\\right) & xy < 1 \\\\ \\pi + \\arctan\\left(\\frac{x+y}{1-xy}\\right) & x > 0, y > 0, xy > 1 \\\\ -\\pi + \\arctan\\left(\\frac{x+y}{1-xy}\\right) & x < 0, y < 0, xy > 1 \\end{cases}',
    variables: [
      { symbol: 'x, y', name: 'Real arguments' }
    ],
    conditions: [
      'Principal branch ranges:',
      '\\arcsin x \\in [-\\pi/2, \\pi/2], \\quad \\arccos x \\in [0, \\pi], \\quad \\arctan x \\in (-\\pi/2, \\pi/2).'
    ],
    notes: [
      'Complementary property: \\arcsin x + \\arccos x = \\frac{\\pi}{2}, \\quad \\arctan x + \\text{arccot } x = \\frac{\\pi}{2}.',
      'Negative arguments: \\arcsin(-x) = -\\arcsin x, \\quad \\arccos(-x) = \\pi - \\arccos x.'
    ],
    commonMistakes: [
      'Blindly using arctan((x+y)/(1-xy)) without checking if xy > 1 (which adds π for positive arguments!).'
    ],
    examTags: ['JEE Main', 'JEE Advanced'],
    difficulty: 'Intermediate'
  },

  // Chapter: Matrices and Determinants
  {
    id: 'math-matrix-inverse-cramer',
    subject: 'Mathematics',
    class: '12',
    category: 'Algebra',
    chapter: 'Matrices and Determinants',
    title: 'Matrix Inversion, Adjoint & Determinant Properties',
    latex: 'A^{-1} = \\frac{\\text{adj}(A)}{|A|}, \\quad |\\text{adj}(A)| = |A|^{n-1}, \\quad \\text{adj}(\\text{adj}(A)) = |A|^{n-2}A, \\quad |AB| = |A||B|, \\quad |kA| = k^n|A|',
    variables: [
      { symbol: 'A', name: 'Square matrix of order n × n' },
      { symbol: '|A|', name: 'Determinant of matrix A' },
      { symbol: '\\text{adj}(A)', name: 'Adjoint matrix (transpose of cofactor matrix)' }
    ],
    conditions: [
      'Matrix A is invertible (non-singular) if and only if |A| ≠ 0.'
    ],
    notes: [
      'Orthogonal matrix: A A^T = I \\implies |A| = \\pm 1.',
      'Symmetric matrix: A^T = A; Skew-symmetric: A^T = -A.',
      'Determinant of any odd-order skew-symmetric matrix is ALWAYS ZERO.'
    ],
    commonMistakes: [
      'Forgetting the power of n in |kA| = kⁿ|A| (taking only k|A|).'
    ],
    examTags: ['JEE Main', 'JEE Advanced'],
    difficulty: 'Fundamental'
  },

  // Chapter: Application of Derivatives
  {
    id: 'math-mean-value-theorems',
    subject: 'Mathematics',
    class: '12',
    category: 'Calculus',
    chapter: 'Applications of Derivatives',
    title: 'Lagrange\'s & Cauchy\'s Mean Value Theorems',
    latex: 'f\'(c) = \\frac{f(b) - f(a)}{b - a} \\quad (c \\in (a, b)), \\quad \\frac{f\'(c)}{g\'(c)} = \\frac{f(b) - f(a)}{g(b) - g(a)}',
    variables: [
      { symbol: 'f(x), g(x)', name: 'Functions continuous on [a, b] and differentiable on (a, b)' },
      { symbol: 'c', name: 'Intermediate point strictly within the open interval (a, b)' }
    ],
    conditions: [
      'f must be continuous on the closed interval [a, b].',
      'f must be differentiable on the open interval (a, b).'
    ],
    notes: [
      'Rolle\'s Theorem: If in addition f(a) = f(b), there exists at least one c in (a, b) such that f\'(c) = 0.',
      'Increasing function: f\'(x) ≥ 0 for all x in interval, with equality not holding on any sub-interval.',
      'Concavity: If f\'\'(x) > 0, graph is concave upward (convex); if f\'\'(x) < 0, concave downward.'
    ],
    commonMistakes: [
      'Assuming point c can be on the boundaries a or b; c must be STRICTLY inside (a, b).'
    ],
    examTags: ['JEE Main', 'JEE Advanced'],
    difficulty: 'Fundamental'
  },

  // Chapter: Integrals
  {
    id: 'math-definite-integrals-leibniz',
    subject: 'Mathematics',
    class: '12',
    category: 'Calculus',
    chapter: 'Integrals',
    title: 'Definite Integral Properties & Leibniz Integral Rule',
    latex: '\\int_a^b f(x)\\,dx = \\int_a^b f(a+b-x)\\,dx, \\quad \\frac{d}{dx}\\left(\\int_{u(x)}^{v(x)} f(t)\\,dt\\right) = f(v(x))\\cdot v\'(x) - f(u(x))\\cdot u\'(x)',
    variables: [
      { symbol: 'u(x), v(x)', name: 'Differentiable variable limits of integration' },
      { symbol: 'f(t)', name: 'Continuous integrand function' }
    ],
    notes: [
      'Odd/Even Function Rule:',
      '\\int_{-a}^a f(x)\\,dx = \\begin{cases} 2\\int_0^a f(x)\\,dx & \\text{if } f(-x) = f(x) \\\\ 0 & \\text{if } f(-x) = -f(x) \\end{cases}',
      'Periodic Integral Property: \\int_0^{nT} f(x)\\,dx = n\\int_0^T f(x)\\,dx where f(x + T) = f(x).'
    ],
    commonMistakes: [
      'Forgetting to multiply by the chain rule derivative of the upper and lower limits (v\'(x) and u\'(x)) in Leibniz\'s rule.'
    ],
    examTags: ['JEE Main', 'JEE Advanced'],
    difficulty: 'Intermediate'
  },

  // Chapter: Differential Equations
  {
    id: 'math-linear-differential-eq',
    subject: 'Mathematics',
    class: '12',
    category: 'Calculus',
    chapter: 'Differential Equations',
    title: 'First-Order Linear Differential Equations',
    latex: '\\frac{dy}{dx} + P(x)y = Q(x) \\implies y\\cdot e^{\\int P(x)\\,dx} = \\int Q(x)\\cdot e^{\\int P(x)\\,dx}\\,dx + C',
    variables: [
      { symbol: 'P(x), Q(x)', name: 'Continuous functions of x alone' },
      { symbol: '\\text{IF} = e^{\\int P(x)\\,dx}', name: 'Integrating Factor' },
      { symbol: 'C', name: 'Arbitrary constant of integration' }
    ],
    conditions: [
      'First order and degree one in dependent variable y and its derivative dy/dx.'
    ],
    notes: [
      'Reverse form: \\frac{dx}{dy} + P(y)x = Q(y) \\implies x\\cdot e^{\\int P(y)\\,dy} = \\int Q(y)\\cdot e^{\\int P(y)\\,dy}\\,dy + C.',
      'Homogeneous Form: \\frac{dy}{dx} = f(y/x) is solved by substituting y = vx \\implies \\frac{dy}{dx} = v + x\\frac{dv}{dx}.'
    ],
    commonMistakes: [
      'Forgetting that coefficient of dy/dx must be strictly 1 before identifying P(x) and Q(x).'
    ],
    examTags: ['JEE Main', 'JEE Advanced'],
    difficulty: 'Fundamental'
  },

  // Chapter: Vector Algebra
  {
    id: 'math-vectors-triple-products',
    subject: 'Mathematics',
    class: '12',
    category: 'Vectors & 3D Geometry',
    chapter: 'Vector Algebra',
    title: 'Scalar & Vector Triple Products',
    latex: '[\\vec{a}\\;\\vec{b}\\;\\vec{c}] = \\vec{a}\\cdot(\\vec{b}\\times\\vec{c}) = \\begin{vmatrix} a_x & a_y & a_z \\\\ b_x & b_y & b_z \\\\ c_x & c_y & c_z \\end{vmatrix}, \\quad \\vec{a}\\times(\\vec{b}\\times\\vec{c}) = (\\vec{a}\\cdot\\vec{c})\\vec{b} - (\\vec{a}\\cdot\\vec{b})\\vec{c}',
    variables: [
      { symbol: '[\\vec{a}\\;\\vec{b}\\;\\vec{c}]', name: 'Scalar Triple Product (Box Product), represents volume of parallelepiped' },
      { symbol: '\\vec{a}\\times(\\vec{b}\\times\\vec{c})', name: 'Vector Triple Product (mnemonic: "bac - cab" rule)' }
    ],
    conditions: [
      'Vectors a, b, c are coplanar if and only if [a b c] = 0.'
    ],
    notes: [
      'Cyclic permutation preserves box product: [a b c] = [b c a] = [c a b].',
      'Anti-cyclic switches sign: [a c b] = -[a b c].',
      'Lagrange Identity: (a × b) · (c × d) = (a · c)(b · d) - (a · d)(b · c).'
    ],
    commonMistakes: [
      'Confusing the order of terms in vector triple product: middle vector b comes first, not a.'
    ],
    examTags: ['JEE Main', 'JEE Advanced'],
    difficulty: 'Intermediate'
  },

  // Chapter: Three-Dimensional Geometry
  {
    id: 'math-3d-skew-lines',
    subject: 'Mathematics',
    class: '12',
    category: 'Vectors & 3D Geometry',
    chapter: 'Three-Dimensional Geometry',
    title: 'Shortest Distance Between Skew Lines',
    latex: 'd = \\frac{|(\\vec{a}_2 - \\vec{a}_1)\\cdot(\\vec{b}_1\\times\\vec{b}_2)|}{|\\vec{b}_1\\times\\vec{b}_2|} = \\frac{\\begin{vmatrix} x_2 - x_1 & y_2 - y_1 & z_2 - z_1 \\\\ a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\end{vmatrix}}{\\sqrt{(b_1 c_2 - b_2 c_1)^2 + (c_1 a_2 - c_2 a_1)^2 + (a_1 b_2 - a_2 b_1)^2}}',
    variables: [
      { symbol: '\\vec{r} = \\vec{a}_1 + \\lambda\\vec{b}_1', name: 'Vector equation of first line' },
      { symbol: '\\vec{r} = \\vec{a}_2 + \\mu\\vec{b}_2', name: 'Vector equation of second line' },
      { symbol: 'd', name: 'Shortest distance between the skew lines' }
    ],
    conditions: [
      'Lines are non-parallel (b₁ × b₂ ≠ 0).',
      'If d = 0, lines intersect in 3D space.'
    ],
    notes: [
      'For parallel lines (\\vec{b}_1 = \\vec{b}_2 = \\vec{b}): d = \\frac{|(\\vec{a}_2 - \\vec{a}_1)\\times\\vec{b}|}{|\\vec{b}|}.',
      'Direction cosines satisfy: l² + m² + n² = 1 or cos² α + cos² β + cos² γ = 1.'
    ],
    commonMistakes: [
      'Using the skew lines formula for parallel lines (the denominator |b₁ × b₂| becomes zero!).'
    ],
    examTags: ['JEE Main', 'JEE Advanced'],
    difficulty: 'Intermediate'
  },

  // Chapter: Probability
  {
    id: 'math-bayes-theorem',
    subject: 'Mathematics',
    class: '12',
    category: 'Probability',
    chapter: 'Probability',
    title: 'Bayes\' Theorem & Law of Total Probability',
    latex: 'P(E_i | A) = \\frac{P(E_i)P(A | E_i)}{\\sum_{j=1}^n P(E_j)P(A | E_j)}, \\quad P(A) = \\sum_{j=1}^n P(E_j)P(A | E_j)',
    variables: [
      { symbol: 'E_1, E_2, \\dots, E_n', name: 'Mutually exclusive and exhaustive partition events (\\sum P(E_i) = 1)' },
      { symbol: 'A', name: 'Observed evidence event with P(A) > 0' },
      { symbol: 'P(E_i | A)', name: 'Posterior probability of cause E_i given evidence A' },
      { symbol: 'P(E_i)', name: 'Prior probability' }
    ],
    conditions: [
      'E_i are pairwise disjoint and their union equals the sample space S.'
    ],
    notes: [
      'Independent Events: P(A ∩ B) = P(A) · P(B) and P(A | B) = P(A).',
      'Binomial Distribution: P(X = r) = ⁿCᵣ pʳ qⁿ⁻ʳ where mean = np and variance = npq (variance < mean always).'
    ],
    commonMistakes: [
      'Confusing mutually exclusive events (P(A ∩ B) = 0) with independent events (P(A ∩ B) = P(A)P(B)).'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  }
];
