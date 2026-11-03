import { Formula } from '../types/formula';

export const PHYSICS_FORMULAS: Formula[] = [
  // --- CLASS 11 ---
  // Chapter 1: Units and Measurements
  {
    id: 'phy-error-propagation',
    subject: 'Physics',
    class: '11',
    category: 'General Physics',
    chapter: 'Units and Measurements',
    title: 'Relative and Fractional Error Propagation',
    latex: 'Z = \\frac{A^p B^q}{C^r} \\implies \\frac{\\Delta Z}{Z} = p\\frac{\\Delta A}{A} + q\\frac{\\Delta B}{B} + r\\frac{\\Delta C}{C}',
    variables: [
      { symbol: 'Z', name: 'Calculated quantity' },
      { symbol: '\\Delta Z/Z', name: 'Fractional error in Z' },
      { symbol: 'p, q, r', name: 'Exponents of measured quantities' },
      { symbol: '\\Delta A/A, \\Delta B/B, \\Delta C/C', name: 'Fractional errors in component measurements' }
    ],
    units: [
      { quantity: 'Fractional Error', siUnit: 'Dimensionless', symbol: '-' }
    ],
    conditions: [
      'Applicable when individual fractional errors (\\Delta A / A) are sufficiently small (typically < 10%).',
      'For maximum probable or worst-case error, signs of all term coefficients are taken as positive.'
    ],
    notes: [
      'For percentage error, multiply fractional error by 100%.',
      'The quantity raised to the highest power contributes the most to the overall percentage error.'
    ],
    commonMistakes: [
      'Subtracting terms when quantities appear in the denominator. Errors always accumulate in worst-case analysis.'
    ],
    variations: [
      {
        label: 'Sum and Difference Form',
        latex: 'Z = A \\pm B \\implies \\Delta Z = \\Delta A + \\Delta B',
        note: 'Absolute errors add directly for both sums and differences.'
      }
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },
  {
    id: 'phy-vernier-screw-gauge',
    subject: 'Physics',
    class: '11',
    category: 'General Physics',
    chapter: 'Units and Measurements',
    title: 'Least Count of Measuring Instruments',
    latex: '\\text{LC}_{\\text{vernier}} = 1\\,\\text{MSD} - 1\\,\\text{VSD} = \\frac{1\\,\\text{MSD}}{N}, \\quad \\text{LC}_{\\text{screw}} = \\frac{\\text{Pitch}}{\\text{Total Circular Divisions}}',
    variables: [
      { symbol: '\\text{MSD}', name: 'Main Scale Division' },
      { symbol: '\\text{VSD}', name: 'Vernier Scale Division' },
      { symbol: 'N', name: 'Number of Vernier divisions matching (N-1) MSD' },
      { symbol: '\\text{Pitch}', name: 'Linear distance moved in one complete rotation' }
    ],
    units: [
      { quantity: 'Least Count', siUnit: 'Metre', symbol: 'm' }
    ],
    conditions: [
      'Valid for standard linear vernier scales and micrometer screw gauges.',
      'Total Reading = Main Scale Reading + (Matching Division × Least Count) - Zero Error (with sign).'
    ],
    notes: [
      'Positive zero error must be subtracted; negative zero error must be added in magnitude.',
      'JEE Advanced frequently tests non-standard vernier configurations where n VSD = m MSD.'
    ],
    commonMistakes: [
      'Forgetting to account for the sign of zero error.',
      'Assuming standard 10 divisions when problem specifies custom divisions.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Intermediate'
  },

  // Chapter 2: Mathematical Tools & Vectors
  {
    id: 'phy-vector-cross-product',
    subject: 'Physics',
    class: '11',
    category: 'Mathematical Tools',
    chapter: 'Mathematical Tools',
    title: 'Vector Dot & Cross Product',
    latex: '\\vec{A}\\cdot\\vec{B} = |\\vec{A}||\\vec{B}|\\cos\\theta, \\quad \\vec{A}\\times\\vec{B} = |\\vec{A}||\\vec{B}|\\sin\\theta\\,\\hat{n} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ A_x & A_y & A_z \\\\ B_x & B_y & B_z \\end{vmatrix}',
    variables: [
      { symbol: '\\vec{A}, \\vec{B}', name: 'Vectors' },
      { symbol: '\\theta', name: 'Angle between vectors (0 \\le \\theta \\le \\pi)' },
      { symbol: '\\hat{n}', name: 'Unit vector normal to both A and B given by right-hand thumb rule' }
    ],
    conditions: [
      'Dot product is commutative (A · B = B · A); cross product is anti-commutative (A × B = -B × A).'
    ],
    notes: [
      'If A · B = 0 for non-zero vectors, they are mutually perpendicular.',
      'If A × B = 0 for non-zero vectors, they are parallel or antiparallel.',
      'Area of triangle formed by vectors A and B is (1/2)|A × B|.'
    ],
    commonMistakes: [
      'Forgetting that A × B changes sign when order is reversed.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter 3: Motion in a Straight Line
  {
    id: 'phy-kinematic-equations',
    subject: 'Physics',
    class: '11',
    category: 'Mechanics',
    chapter: 'Motion in a Straight Line',
    title: 'Kinematic Equations for Constant Acceleration',
    latex: 'v = u + at, \\quad s = ut + \\frac{1}{2}at^2, \\quad v^2 = u^2 + 2as, \\quad s_n = u + \\frac{a}{2}(2n - 1)',
    variables: [
      { symbol: 'u', name: 'Initial velocity', unit: 'm/s' },
      { symbol: 'v', name: 'Final velocity', unit: 'm/s' },
      { symbol: 'a', name: 'Constant linear acceleration', unit: 'm/s²' },
      { symbol: 't', name: 'Elapsed time', unit: 's' },
      { symbol: 's', name: 'Displacement', unit: 'm' },
      { symbol: 's_n', name: 'Displacement during the n-th second', unit: 'm' }
    ],
    units: [
      { quantity: 'Velocity', siUnit: 'metre per second', symbol: 'm/s' },
      { quantity: 'Acceleration', siUnit: 'metre per second squared', symbol: 'm/s²' }
    ],
    conditions: [
      'Acceleration must remain strictly constant in magnitude and direction.',
      'All vector quantities (u, v, a, s) must be assigned signs according to a chosen reference axis.'
    ],
    notes: [
      'For variable acceleration, differential calculus must be used: v = ds/dt and a = dv/dt = v(dv/ds).',
      'Area under v-t curve represents displacement; slope of v-t curve represents acceleration.'
    ],
    commonMistakes: [
      'Applying these equations when acceleration depends on time or position (e.g., spring motion).'
    ],
    variations: [
      {
        label: 'Stopping Distance',
        latex: 'd_s = \\frac{u^2}{2a}',
        note: 'Proportional to square of initial speed.'
      }
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter 4: Motion in a Plane
  {
    id: 'phy-projectile-motion',
    subject: 'Physics',
    class: '11',
    category: 'Mechanics',
    chapter: 'Motion in a Plane',
    title: 'Projectile Motion on Flat Ground',
    latex: 'T = \\frac{2u\\sin\\theta}{g}, \\quad H_{\\max} = \\frac{u^2\\sin^2\\theta}{2g}, \\quad R = \\frac{u^2\\sin 2\\theta}{g}, \\quad y = x\\tan\\theta - \\frac{gx^2}{2u^2\\cos^2\\theta}',
    variables: [
      { symbol: 'u', name: 'Initial launch speed', unit: 'm/s' },
      { symbol: '\\theta', name: 'Angle of projection with horizontal', unit: 'rad or deg' },
      { symbol: 'T', name: 'Time of flight', unit: 's' },
      { symbol: 'H_{\\max}', name: 'Maximum vertical height', unit: 'm' },
      { symbol: 'R', name: 'Horizontal range', unit: 'm' },
      { symbol: 'g', name: 'Acceleration due to gravity', unit: 'm/s²' }
    ],
    units: [
      { quantity: 'Range / Height', siUnit: 'Metre', symbol: 'm' }
    ],
    conditions: [
      'Air resistance is neglected.',
      'Launch and landing points lie on the same horizontal plane.',
      'Gravitational acceleration g is uniform throughout the trajectory.'
    ],
    notes: [
      'Maximum range occurs at \\theta = 45^\\circ: R_{\\max} = u^2/g.',
      'Complementary launch angles \\theta and 90^\\circ - \\theta yield identical horizontal ranges.',
      'Relation: R = 4H_{\\max}\\cot\\theta, or y = x\\tan\\theta\\left(1 - \\frac{x}{R}\\right).'
    ],
    commonMistakes: [
      'Using the flat ground range formula when landing is at an elevated or depressed cliff.',
      'Confusing sin(2θ) with 2sin(θ).'
    ],
    variations: [
      {
        label: 'Projectile on Incline (Angle α up incline β)',
        latex: 'R_{\\text{incline}} = \\frac{2u^2\\sin(\\theta-\\beta)\\cos\\theta}{g\\cos^2\\beta}',
        note: 'Maximum range up the incline occurs at θ = π/4 + β/2.'
      }
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Intermediate'
  },

  // Chapter 5: Laws of Motion
  {
    id: 'phy-newton-second-law',
    subject: 'Physics',
    class: '11',
    category: 'Mechanics',
    chapter: 'Laws of Motion',
    title: 'Newton\'s Second Law & Momentum',
    latex: '\\vec{F}_{\\text{net}} = \\frac{d\\vec{p}}{dt} = m\\vec{a} + \\vec{v}_{\\text{rel}}\\frac{dm}{dt}',
    variables: [
      { symbol: '\\vec{F}_{\\text{net}}', name: 'Vector sum of external forces', unit: 'N' },
      { symbol: '\\vec{p}', name: 'Linear momentum', unit: 'kg·m/s' },
      { symbol: 'm', name: 'Mass of the system', unit: 'kg' },
      { symbol: '\\vec{a}', name: 'Linear acceleration of centre of mass', unit: 'm/s²' },
      { symbol: '\\vec{v}_{\\text{rel}}', name: 'Relative velocity of ejected/accreted mass', unit: 'm/s' }
    ],
    units: [
      { quantity: 'Force', siUnit: 'Newton', symbol: 'N' }
    ],
    conditions: [
      'Valid directly in inertial reference frames.',
      'In a non-inertial frame accelerating with a_0, a pseudo-force F_pseudo = -m a_0 must be introduced.'
    ],
    notes: [
      'For constant mass systems (dm/dt = 0), this simplifies to F_net = m a.',
      'Impulse J = ∫ F dt = Δp (Impulse-Momentum theorem).'
    ],
    commonMistakes: [
      'Applying F = ma in accelerating frames without including pseudo force.',
      'Including internal forces in the F_net sum.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },
  {
    id: 'phy-friction-laws',
    subject: 'Physics',
    class: '11',
    category: 'Mechanics',
    chapter: 'Laws of Motion',
    title: 'Static and Kinetic Friction',
    latex: 'f_s \\le \\mu_s N, \\quad f_{s,\\max} = \\mu_s N, \\quad f_k = \\mu_k N',
    variables: [
      { symbol: 'f_s', name: 'Static friction force', unit: 'N' },
      { symbol: 'f_{s,\\max}', name: 'Limiting static friction', unit: 'N' },
      { symbol: 'f_k', name: 'Kinetic friction force', unit: 'N' },
      { symbol: '\\mu_s, \\mu_k', name: 'Coefficients of static and kinetic friction (typically μ_s > μ_k)' },
      { symbol: 'N', name: 'Normal contact reaction force', unit: 'N' }
    ],
    conditions: [
      'Direction opposes relative impending motion (static) or actual sliding (kinetic).'
    ],
    notes: [
      'Static friction is self-adjusting from 0 up to μ_s N.',
      'Angle of friction λ: tan λ = μ_s. Angle of repose = angle of friction.'
    ],
    commonMistakes: [
      'Assuming static friction is always equal to μ_s N regardless of applied force.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },
  {
    id: 'phy-banking-roads',
    subject: 'Physics',
    class: '11',
    category: 'Mechanics',
    chapter: 'Laws of Motion',
    title: 'Banking of Curved Circular Roads',
    latex: 'v_{\\text{optimum}} = \\sqrt{rg\\tan\\theta}, \\quad v_{\\max} = \\sqrt{rg\\left(\\frac{\\tan\\theta + \\mu}{1 - \\mu\\tan\\theta}\\right)}, \\quad v_{\\min} = \\sqrt{rg\\left(\\frac{\\tan\\theta - \\mu}{1 + \\mu\\tan\\theta}\\right)}',
    variables: [
      { symbol: 'v', name: 'Speed of vehicle', unit: 'm/s' },
      { symbol: 'r', name: 'Radius of curve', unit: 'm' },
      { symbol: '\\theta', name: 'Banking angle with horizontal', unit: 'rad' },
      { symbol: '\\mu', name: 'Coefficient of friction between tyre and road' }
    ],
    conditions: [
      'Circular turn on a banked surface.',
      'At optimum speed, no friction is required across the lateral tire surface.'
    ],
    notes: [
      'If μ ≥ cot θ, then v_max becomes infinite (car cannot skid outward).'
    ],
    commonMistakes: [
      'Using tan θ instead of sin θ for pendulum or inverted cone problems.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Intermediate'
  },

  // Chapter 6: Work, Energy and Power
  {
    id: 'phy-work-energy-theorem',
    subject: 'Physics',
    class: '11',
    category: 'Mechanics',
    chapter: 'Work, Energy and Power',
    title: 'Work-Energy Theorem',
    latex: 'W_{\\text{all}} = \\Delta K = \\frac{1}{2}m v_f^2 - \\frac{1}{2}m v_i^2',
    variables: [
      { symbol: 'W_{\\text{all}}', name: 'Work done by ALL forces (conservative, non-conservative, pseudo, external)', unit: 'J' },
      { symbol: '\\Delta K', name: 'Change in kinetic energy', unit: 'J' }
    ],
    conditions: [
      'Valid in both inertial and non-inertial frames (provided pseudo-work is included in non-inertial frames).'
    ],
    notes: [
      'Work by conservative forces: W_c = -ΔU.',
      'If only conservative forces act: ΔK + ΔU = 0 (Conservation of Mechanical Energy).'
    ],
    commonMistakes: [
      'Omitting normal reaction or friction when calculating work done.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },
  {
    id: 'phy-power-instantaneous',
    subject: 'Physics',
    class: '11',
    category: 'Mechanics',
    chapter: 'Work, Energy and Power',
    title: 'Instantaneous and Average Power',
    latex: 'P = \\frac{dW}{dt} = \\vec{F}\\cdot\\vec{v} = F v\\cos\\theta, \\quad P_{\\text{avg}} = \\frac{W_{\\text{total}}}{\\Delta t}',
    variables: [
      { symbol: 'P', name: 'Instantaneous power', unit: 'W' },
      { symbol: '\\vec{F}', name: 'Applied force', unit: 'N' },
      { symbol: '\\vec{v}', name: 'Velocity of point of application', unit: 'm/s' }
    ],
    units: [
      { quantity: 'Power', siUnit: 'Watt (J/s)', symbol: 'W' }
    ],
    conditions: [
      'Velocity v is evaluated at the instant and point where force F acts.'
    ],
    notes: [
      '1 Horsepower (hp) = 746 W.',
      'If force is perpendicular to velocity (e.g. magnetic force on charge), instantaneous power is zero.'
    ],
    commonMistakes: [
      'Using average velocity instead of instantaneous velocity for instantaneous power.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter 7: System of Particles and Rotational Motion
  {
    id: 'phy-centre-of-mass',
    subject: 'Physics',
    class: '11',
    category: 'Mechanics',
    chapter: 'System of Particles and Rotational Motion',
    title: 'Centre of Mass Coordinates',
    latex: '\\vec{R}_{\\text{cm}} = \\frac{\\sum m_i \\vec{r}_i}{\\sum m_i} = \\frac{1}{M}\\int \\vec{r}\\,dm',
    variables: [
      { symbol: '\\vec{R}_{\\text{cm}}', name: 'Position vector of centre of mass', unit: 'm' },
      { symbol: 'M', name: 'Total mass of the system', unit: 'kg' },
      { symbol: 'dm', name: 'Differential mass element', unit: 'kg' }
    ],
    conditions: [
      'For rigid bodies, integration limits span over the full geometric envelope.'
    ],
    notes: [
      'Hemisphere (solid): y_cm = 3R/8 from flat base.',
      'Hemispherical shell: y_cm = R/2 from flat base.',
      'Solid cone: y_cm = h/4 from base.',
      'Hollow cone: y_cm = h/3 from base.'
    ],
    commonMistakes: [
      'Measuring COM distance from apex instead of base for conical bodies.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Intermediate'
  },
  {
    id: 'phy-moment-of-inertia',
    subject: 'Physics',
    class: '11',
    category: 'Mechanics',
    chapter: 'System of Particles and Rotational Motion',
    title: 'Parallel and Perpendicular Axes Theorems',
    latex: 'I = I_{\\text{cm}} + M d^2, \\quad I_z = I_x + I_y \\quad (\\text{planar laminar bodies only})',
    variables: [
      { symbol: 'I', name: 'Moment of inertia about arbitrary parallel axis', unit: 'kg·m²' },
      { symbol: 'I_{\\text{cm}}', name: 'Moment of inertia about parallel axis passing through COM', unit: 'kg·m²' },
      { symbol: 'd', name: 'Perpendicular separation between axes', unit: 'm' },
      { symbol: 'I_x, I_y, I_z', name: 'Moments of inertia about three mutually perpendicular intersecting axes', unit: 'kg·m²' }
    ],
    conditions: [
      'Parallel axis theorem requires one axis to pass strictly through the Centre of Mass (not any arbitrary axis).',
      'Perpendicular axis theorem applies ONLY to 2D flat planar laminar sheets lying in the xy-plane.'
    ],
    notes: [
      'Ring (central axis): MR².',
      'Disc / Cylinder (central axis): (1/2)MR².',
      'Solid sphere: (2/5)MR².',
      'Hollow sphere: (2/3)MR².',
      'Thin rod (about center): (1/12)ML²; (about end): (1/3)ML².'
    ],
    commonMistakes: [
      'Applying perpendicular axis theorem to 3D objects like solid cylinders or spheres.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },
  {
    id: 'phy-pure-rolling',
    subject: 'Physics',
    class: '11',
    category: 'Mechanics',
    chapter: 'System of Particles and Rotational Motion',
    title: 'Pure Rolling on Horizontal & Inclined Planes',
    latex: 'v_{\\text{cm}} = R\\omega, \\quad a_{\\text{cm}} = \\frac{g\\sin\\theta}{1 + \\frac{k^2}{R^2}}, \\quad K_{\\text{total}} = \\frac{1}{2}M v_{\\text{cm}}^2\\left(1 + \\frac{k^2}{R^2}\\right)',
    variables: [
      { symbol: 'v_{\\text{cm}}', name: 'Velocity of centre of mass', unit: 'm/s' },
      { symbol: '\\omega', name: 'Angular velocity', unit: 'rad/s' },
      { symbol: 'k', name: 'Radius of gyration (I = M k²)', unit: 'm' },
      { symbol: 'k^2/R^2', name: 'Shape factor (Ring: 1, Disc: 1/2, Solid Sphere: 2/5, Hollow Sphere: 2/3)' },
      { symbol: '\\theta', name: 'Angle of inclined plane', unit: 'rad' }
    ],
    conditions: [
      'Point of contact has zero relative instantaneous velocity with respect to ground.',
      'Friction force does zero net work during pure rolling.'
    ],
    notes: [
      'Minimum friction coefficient required for pure rolling down incline: \\mu_{\\min} = \\frac{\\tan\\theta}{1 + \\frac{R^2}{k^2}}.',
      'Solid sphere reaches bottom first (smallest k²/R² = 0.4), ring reaches last (k²/R² = 1).'
    ],
    commonMistakes: [
      'Assuming friction does negative work in pure rolling (static friction does no work on point of contact).'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Intermediate'
  },

  // Chapter 8: Gravitation
  {
    id: 'phy-orbital-escape-velocity',
    subject: 'Physics',
    class: '11',
    category: 'Mechanics',
    chapter: 'Gravitation',
    title: 'Escape Velocity & Satellite Orbital Speed',
    latex: 'v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR}, \\quad v_o = \\sqrt{\\frac{GM}{r}} = \\sqrt{\\frac{GM}{R+h}}, \\quad T^2 = \\frac{4\\pi^2}{GM}r^3',
    variables: [
      { symbol: 'v_e', name: 'Escape velocity from surface', unit: 'm/s' },
      { symbol: 'v_o', name: 'Orbital velocity of satellite', unit: 'm/s' },
      { symbol: 'r', name: 'Orbital radius (R + h)', unit: 'm' },
      { symbol: 'T', name: 'Orbital time period (Kepler\'s Third Law)', unit: 's' },
      { symbol: 'M', name: 'Mass of central planet', unit: 'kg' },
      { symbol: 'R', name: 'Radius of planet', unit: 'm' }
    ],
    conditions: [
      'Applies to circular orbital trajectories around spherical mass distribution.',
      'Escape velocity assumes no atmospheric drag and launch from rest relative to planet surface.'
    ],
    notes: [
      'Escape velocity on Earth surface \\approx 11.2\\,\\text{km/s}.',
      'Relation: v_e = \\sqrt{2} v_o for near-surface orbit.',
      'Total mechanical energy of satellite: E = -\\frac{GMm}{2r} = -K = \\frac{U}{2}.'
    ],
    commonMistakes: [
      'Forgetting that total mechanical energy of a bound satellite is NEGATIVE.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter 9: Mechanical Properties of Solids
  {
    id: 'phy-hookes-law-moduli',
    subject: 'Physics',
    class: '11',
    category: 'Properties of Matter',
    chapter: 'Mechanical Properties of Solids',
    title: 'Hooke\'s Law & Elastic Moduli',
    latex: 'Y = \\frac{F/A}{\\Delta L/L} = \\frac{FL}{A\\Delta L}, \\quad B = -V\\frac{\\Delta P}{\\Delta V}, \\quad U = \\frac{1}{2}\\times\\text{Stress}\\times\\text{Strain}\\times\\text{Volume} = \\frac{1}{2}\\frac{YA(\\Delta L)^2}{L}',
    variables: [
      { symbol: 'Y', name: 'Young\'s Modulus', unit: 'N/m² or Pa' },
      { symbol: 'B', name: 'Bulk Modulus', unit: 'Pa' },
      { symbol: 'U', name: 'Elastic potential energy stored in stretched wire', unit: 'J' },
      { symbol: 'F', name: 'Tensile stretching force', unit: 'N' },
      { symbol: 'A', name: 'Cross-sectional area', unit: 'm²' },
      { symbol: '\\Delta L', name: 'Elongation', unit: 'm' }
    ],
    conditions: [
      'Within proportional/elastic limit of the material.'
    ],
    notes: [
      'Energy density (energy per unit volume) = \\frac{1}{2}\\times\\text{stress}\\times\\text{strain} = \\frac{\\text{stress}^2}{2Y}.',
      'Poisson\'s ratio \\sigma = -\\frac{\\text{Lateral strain}}{\\text{Longitudinal strain}} (theoretical limit: -1 to 0.5).'
    ],
    commonMistakes: [
      'Omitting the factor of 1/2 in the stored elastic strain energy formula.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter 10: Mechanical Properties of Fluids
  {
    id: 'phy-bernoullis-principle',
    subject: 'Physics',
    class: '11',
    category: 'Properties of Matter',
    chapter: 'Mechanical Properties of Fluids',
    title: 'Bernoulli\'s Equation & Continuity',
    latex: 'A_1 v_1 = A_2 v_2, \\quad P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{constant}',
    variables: [
      { symbol: 'P', name: 'Static fluid pressure', unit: 'Pa' },
      { symbol: '\\rho', name: 'Fluid density', unit: 'kg/m³' },
      { symbol: 'v', name: 'Fluid flow velocity', unit: 'm/s' },
      { symbol: 'h', name: 'Elevation above arbitrary datum', unit: 'm' },
      { symbol: 'A', name: 'Cross-sectional pipe area', unit: 'm²' }
    ],
    conditions: [
      'Incompressible fluid (\\rho = \\text{const}).',
      'Non-viscous (frictionless flow).',
      'Streamline / laminar steady flow.',
      'Irrotational flow along a streamline.'
    ],
    notes: [
      'Torricelli\'s Law for efflux speed from orifice at depth h: v = \\sqrt{2gh}.',
      'Venturimeter flow rate: Q = A_1 A_2 \\sqrt{\\frac{2gh}{A_1^2 - A_2^2}}.'
    ],
    commonMistakes: [
      'Applying Bernoulli equation across turbulent eddy regions or separated boundary layers.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Intermediate'
  },
  {
    id: 'phy-surface-tension-excess-pressure',
    subject: 'Physics',
    class: '11',
    category: 'Properties of Matter',
    chapter: 'Mechanical Properties of Fluids',
    title: 'Excess Pressure & Capillary Ascent',
    latex: '\\Delta P_{\\text{drop}} = \\frac{2T}{R}, \\quad \\Delta P_{\\text{soap bubble}} = \\frac{4T}{R}, \\quad h = \\frac{2T\\cos\\theta_c}{\\rho g r}',
    variables: [
      { symbol: 'T', name: 'Surface tension of liquid', unit: 'N/m' },
      { symbol: 'R', name: 'Radius of curvature of meniscus / bubble', unit: 'm' },
      { symbol: 'r', name: 'Radius of capillary tube', unit: 'm' },
      { symbol: '\\theta_c', name: 'Contact angle between liquid and solid', unit: 'rad' },
      { symbol: 'h', name: 'Height of liquid column in capillary', unit: 'm' }
    ],
    conditions: [
      'Liquid drop has 1 free surface; soap bubble has 2 free surfaces (inner and outer).',
      'For pure water and clean glass, contact angle \\theta_c \\approx 0^\\circ \\implies R = r.'
    ],
    notes: [
      'If tube is of insufficient length l < h, liquid does not overflow; instead, meniscus flattens: R\' l = R h.'
    ],
    commonMistakes: [
      'Confusing tube radius r with meniscus radius of curvature R (R = r / cos θ_c).'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Intermediate'
  },

  // Chapter 11 & 12: Thermal Properties & Thermodynamics
  {
    id: 'phy-carnot-efficiency',
    subject: 'Physics',
    class: '11',
    category: 'Thermodynamics',
    chapter: 'Thermodynamics',
    title: 'First Law & Carnot Heat Engine Efficiency',
    latex: '\\Delta Q = \\Delta U + W, \\quad \\eta = 1 - \\frac{Q_C}{Q_H} = 1 - \\frac{T_C}{T_H}, \\quad \\beta = \\frac{Q_C}{W} = \\frac{T_C}{T_H - T_C}',
    variables: [
      { symbol: '\\Delta Q', name: 'Heat supplied to system', unit: 'J' },
      { symbol: '\\Delta U', name: 'Change in internal energy (n C_v \\Delta T)', unit: 'J' },
      { symbol: 'W', name: 'Work done by system (\\int P dV)', unit: 'J' },
      { symbol: '\\eta', name: 'Efficiency of heat engine' },
      { symbol: '\\beta', name: 'Coefficient of performance (refrigerator)' },
      { symbol: 'T_H, T_C', name: 'Absolute temperatures of hot and cold reservoirs', unit: 'K' }
    ],
    conditions: [
      'Temperatures T_H and T_C MUST be in Kelvin (absolute scale).',
      'Carnot cycle is reversible and consists of 2 isothermal and 2 adiabatic processes.'
    ],
    notes: [
      'Molar heat capacities: C_p - C_v = R (Mayer\'s relation).',
      'Adiabatic process: P V^\\gamma = \\text{const}, T V^{\\gamma-1} = \\text{const}, P^{1-\\gamma}T^\\gamma = \\text{const}.',
      'Work in adiabatic expansion: W = \\frac{P_1 V_1 - P_2 V_2}{\\gamma - 1} = \\frac{nR(T_1 - T_2)}{\\gamma - 1}.'
    ],
    commonMistakes: [
      'Using Celsius temperatures when calculating Carnot efficiency.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter 13: Kinetic Theory
  {
    id: 'phy-kinetic-gas-pressure',
    subject: 'Physics',
    class: '11',
    category: 'Thermodynamics',
    chapter: 'Kinetic Theory',
    title: 'Pressure and Speeds of Ideal Gas',
    latex: 'P = \\frac{1}{3}\\rho v_{\\text{rms}}^2, \\quad v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}}, \\quad v_{\\text{avg}} = \\sqrt{\\frac{8RT}{\\pi M}}, \\quad v_{\\text{mp}} = \\sqrt{\\frac{2RT}{M}}',
    variables: [
      { symbol: 'v_{\\text{rms}}', name: 'Root-mean-square molecular speed', unit: 'm/s' },
      { symbol: 'v_{\\text{avg}}', name: 'Average molecular speed', unit: 'm/s' },
      { symbol: 'v_{\\text{mp}}', name: 'Most probable molecular speed', unit: 'm/s' },
      { symbol: 'M', name: 'Molar mass of gas in kg/mol', unit: 'kg/mol' },
      { symbol: 'T', name: 'Absolute temperature', unit: 'K' }
    ],
    notes: [
      'Speed comparison: v_{\\text{rms}} > v_{\\text{avg}} > v_{\\text{mp}} in ratio \\sqrt{3} : \\sqrt{8/\\pi} : \\sqrt{2} \\approx 1.732 : 1.596 : 1.414.',
      'Translational kinetic energy per molecule: E = \\frac{3}{2} k_B T.'
    ],
    commonMistakes: [
      'Plugging molar mass in g/mol instead of kg/mol into the speed formulas.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter 14: Oscillations
  {
    id: 'phy-shm-dynamics',
    subject: 'Physics',
    class: '11',
    category: 'Oscillations & Waves',
    chapter: 'Oscillations',
    title: 'Simple Harmonic Motion (SHM) Equations',
    latex: 'x(t) = A\\sin(\\omega t + \\phi), \\quad v = \\omega\\sqrt{A^2 - x^2}, \\quad a = -\\omega^2 x, \\quad T = 2\\pi\\sqrt{\\frac{m}{k}}',
    variables: [
      { symbol: 'A', name: 'Amplitude of oscillation', unit: 'm' },
      { symbol: '\\omega', name: 'Angular frequency (\\sqrt{k/m})', unit: 'rad/s' },
      { symbol: '\\phi', name: 'Initial phase constant', unit: 'rad' },
      { symbol: 'T', name: 'Time period', unit: 's' }
    ],
    conditions: [
      'Restoring force is linearly proportional to displacement: F = -kx.'
    ],
    notes: [
      'Total mechanical energy: E = \\frac{1}{2}m\\omega^2 A^2 = \\frac{1}{2}kA^2 (constant).',
      'Simple pendulum: T = 2\\pi\\sqrt{\\frac{L}{g}} (for small angles \\theta < 10^\\circ).',
      'Physical pendulum: T = 2\\pi\\sqrt{\\frac{I}{mgd}}.'
    ],
    commonMistakes: [
      'Forgetting that maximum acceleration occurs at extreme positions (x = ±A) while velocity is zero.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter 15: Waves
  {
    id: 'phy-doppler-effect',
    subject: 'Physics',
    class: '11',
    category: 'Oscillations & Waves',
    chapter: 'Waves',
    title: 'Doppler Effect in Sound Waves',
    latex: 'f\' = f \\left( \\frac{v \\pm v_o}{v \\mp v_s} \\right)',
    variables: [
      { symbol: 'f\'', name: 'Apparent frequency observed', unit: 'Hz' },
      { symbol: 'f', name: 'Source emitted natural frequency', unit: 'Hz' },
      { symbol: 'v', name: 'Speed of sound in air', unit: 'm/s' },
      { symbol: 'v_o', name: 'Speed of observer relative to medium', unit: 'm/s' },
      { symbol: 'v_s', name: 'Speed of source relative to medium', unit: 'm/s' }
    ],
    conditions: [
      'Speeds v_o and v_s are subsonic (less than speed of sound v).',
      'Medium (air) is stationary; if wind blows at speed w, replace v by v ± w along line of propagation.'
    ],
    notes: [
      'Sign Rule: Choose upper signs (+ in numerator, - in denominator) when distance between observer and source is DECREASING (approaching \\implies frequency increases).',
      'Choose lower signs when receding (frequency decreases).'
    ],
    commonMistakes: [
      'Mixing up the numerator (observer) and denominator (source) terms.'
    ],
    variations: [
      {
        label: 'Organ Pipe Harmonics',
        latex: 'f_{\\text{open}} = n\\frac{v}{2L} \\;(n=1,2,3\\dots), \\quad f_{\\text{closed}} = (2n-1)\\frac{v}{4L} \\;(n=1,2,3\\dots)',
        note: 'Closed pipe produces odd harmonics only.'
      }
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Intermediate'
  },

  // --- CLASS 12 ---
  // Chapter 1: Electric Charges and Fields
  {
    id: 'phy-coulomb-electric-field',
    subject: 'Physics',
    class: '12',
    category: 'Electrodynamics',
    chapter: 'Electric Charges and Fields',
    title: 'Coulomb\'s Law & Electric Dipole Field',
    latex: 'F = \\frac{1}{4\\pi\\varepsilon_0}\\frac{q_1 q_2}{r^2}, \\quad E_{\\text{axial}} = \\frac{1}{4\\pi\\varepsilon_0}\\frac{2pr}{(r^2 - a^2)^2} \\approx \\frac{2kp}{r^3}, \\quad E_{\\text{equatorial}} \\approx \\frac{kp}{r^3}',
    variables: [
      { symbol: 'q_1, q_2', name: 'Point charges', unit: 'C' },
      { symbol: 'p', name: 'Electric dipole moment (p = q × 2a directed from -q to +q)', unit: 'C·m' },
      { symbol: 'r', name: 'Distance from center of dipole', unit: 'm' },
      { symbol: '\\varepsilon_0', name: 'Permittivity of vacuum (8.854 × 10⁻¹² F/m)' }
    ],
    units: [
      { quantity: 'Electric Field', siUnit: 'Newton per Coulomb or Volt per Metre', symbol: 'N/C or V/m' }
    ],
    conditions: [
      'Coulomb\'s law strictly applies to stationary point charges in an electrostatic equilibrium.',
      'Dipole approximations (2kp/r³ and kp/r³) valid for r ≫ a (far field).'
    ],
    notes: [
      'Torque on dipole in uniform field: \\vec{\\tau} = \\vec{p}\\times\\vec{E}.',
      'Potential energy of dipole: U = -\\vec{p}\\cdot\\vec{E}.'
    ],
    commonMistakes: [
      'Forgetting that dipole moment direction is defined from negative to positive charge in physics.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },
  {
    id: 'phy-gauss-law',
    subject: 'Physics',
    class: '12',
    category: 'Electrodynamics',
    chapter: 'Electric Charges and Fields',
    title: 'Gauss\'s Law & Continuous Distributions',
    latex: '\\oint \\vec{E}\\cdot d\\vec{A} = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0}, \\quad E_{\\text{wire}} = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}, \\quad E_{\\text{sheet}} = \\frac{\\sigma}{2\\varepsilon_0}, \\quad E_{\\text{conductor surface}} = \\frac{\\sigma}{\\varepsilon_0}',
    variables: [
      { symbol: '\\lambda', name: 'Linear charge density', unit: 'C/m' },
      { symbol: '\\sigma', name: 'Surface charge density', unit: 'C/m²' },
      { symbol: 'q_{\\text{enclosed}}', name: 'Net charge inside closed Gaussian surface', unit: 'C' }
    ],
    conditions: [
      'Surface integral over a closed Gaussian surface.',
      'Wire formula assumes an infinitely long, uniformly charged thin wire.'
    ],
    notes: [
      'Inside a conducting shell in static equilibrium: E = 0.',
      'Uniformly charged non-conducting solid sphere of radius R: E_{\\text{in}} = \\frac{\\rho r}{3\\varepsilon_0} = \\frac{k Q r}{R^3}.'
    ],
    commonMistakes: [
      'Confusing the electric field of an infinite non-conducting sheet (σ/2ε₀) with a charged conducting plate (σ/ε₀).'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Intermediate'
  },

  // Chapter 2: Electrostatic Potential and Capacitance
  {
    id: 'phy-capacitance-dielectric',
    subject: 'Physics',
    class: '12',
    category: 'Electrodynamics',
    chapter: 'Electrostatic Potential and Capacitance',
    title: 'Capacitance & Dielectric Insertion',
    latex: 'C = \\frac{\\varepsilon_0 A}{d}, \\quad C\' = \\frac{\\varepsilon_0 A}{d - t + \\frac{t}{K}}, \\quad U = \\frac{1}{2}CV^2 = \\frac{Q^2}{2C} = \\frac{1}{2}QV',
    variables: [
      { symbol: 'C', name: 'Parallel plate capacitance', unit: 'F' },
      { symbol: 'A', name: 'Plate area', unit: 'm²' },
      { symbol: 'd', name: 'Plate separation', unit: 'm' },
      { symbol: 't', name: 'Thickness of inserted dielectric slab', unit: 'm' },
      { symbol: 'K', name: 'Dielectric constant (relative permittivity \\varepsilon_r)' },
      { symbol: 'U', name: 'Electrostatic stored energy', unit: 'J' }
    ],
    conditions: [
      'Fringing electric field at edges is negligible (d ≪ √A).'
    ],
    notes: [
      'Battery Disconnected: Charge Q remains constant. When dielectric K is inserted, C\' = KC, V\' = V/K, E\' = E/K, U\' = U/K.',
      'Battery Connected: Voltage V remains constant. C\' = KC, Q\' = KQ, E\' = E, U\' = KU.',
      'Electrostatic pressure on plate: P = \\frac{\\sigma^2}{2\\varepsilon_0} = \\frac{1}{2}\\varepsilon_0 E^2.'
    ],
    commonMistakes: [
      'Failing to check whether battery remains connected or is disconnected before inserting dielectric.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter 3: Current Electricity
  {
    id: 'phy-drift-velocity-resistors',
    subject: 'Physics',
    class: '12',
    category: 'Electrodynamics',
    chapter: 'Current Electricity',
    title: 'Drift Velocity, Resistance & Temperature Dependence',
    latex: 'I = n e A v_d, \\quad v_d = \\frac{e E \\tau}{m}, \\quad R = \\rho\\frac{L}{A} = \\frac{m}{n e^2 \\tau}\\frac{L}{A}, \\quad R_T = R_0(1 + \\alpha\\Delta T)',
    variables: [
      { symbol: 'v_d', name: 'Electron drift velocity', unit: 'm/s' },
      { symbol: 'n', name: 'Number density of free conduction electrons', unit: 'm⁻³' },
      { symbol: '\\tau', name: 'Mean relaxation time between collisions', unit: 's' },
      { symbol: '\\rho', name: 'Electrical resistivity', unit: '\\Omega\\cdot\\text{m}' },
      { symbol: '\\alpha', name: 'Temperature coefficient of resistance', unit: 'K⁻¹ or °C⁻¹' }
    ],
    conditions: [
      'Linear Ohm\'s law regime for metallic conductors at non-extreme fields.'
    ],
    notes: [
      'When a wire is stretched to n times its initial length (volume constant): R\' = n² R.',
      'Kirchhoff\'s Junction Rule (KCL) expresses conservation of electric charge.',
      'Kirchhoff\'s Loop Rule (KVL) expresses conservation of energy.'
    ],
    commonMistakes: [
      'Using R\' = n R instead of n² R when wire is stretched without adding mass.'
    ],
    variations: [
      {
        label: 'Balanced Wheatstone Bridge',
        latex: '\\frac{P}{Q} = \\frac{R}{S} \\implies I_g = 0',
        note: 'No current flows through galvanometer when diagonal product holds.'
      }
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter 4: Moving Charges and Magnetism
  {
    id: 'phy-biot-savart-ampere',
    subject: 'Physics',
    class: '12',
    category: 'Electrodynamics',
    chapter: 'Moving Charges and Magnetism',
    title: 'Biot-Savart Law & Circular Coil Field',
    latex: 'd\\vec{B} = \\frac{\\mu_0}{4\\pi}\\frac{I(d\\vec{l}\\times\\hat{r})}{r^2}, \\quad B_{\\text{axis}} = \\frac{\\mu_0 N I R^2}{2(R^2 + x^2)^{3/2}}, \\quad B_{\\text{center}} = \\frac{\\mu_0 N I}{2R}',
    variables: [
      { symbol: 'B', name: 'Magnetic flux density', unit: 'T (Tesla)' },
      { symbol: 'I', name: 'Current carried', unit: 'A' },
      { symbol: 'R', name: 'Radius of circular coil', unit: 'm' },
      { symbol: 'x', name: 'Axial distance from center of coil', unit: 'm' },
      { symbol: 'N', name: 'Number of circular turns' }
    ],
    conditions: [
      'Steady steady-state DC current.'
    ],
    notes: [
      'Infinitely long straight wire: B = \\frac{\\mu_0 I}{2\\pi d}.',
      'Circular arc subtending angle \\theta at center: B = \\frac{\\mu_0 I}{4\\pi R}\\theta.',
      'Solenoid interior field: B = \\mu_0 n I (where n = N / L).'
    ],
    commonMistakes: [
      'Forgetting the factor of 2 in denominator of center field (2R, not 2πR).'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },
  {
    id: 'phy-lorentz-force-cyclotron',
    subject: 'Physics',
    class: '12',
    category: 'Electrodynamics',
    chapter: 'Moving Charges and Magnetism',
    title: 'Magnetic Lorentz Force & Cyclotron Radius',
    latex: '\\vec{F} = q(\\vec{E} + \\vec{v}\\times\\vec{B}), \\quad r = \\frac{mv_{\\perp}}{qB} = \\frac{\\sqrt{2mK}}{qB}, \\quad T = \\frac{2\\pi m}{qB}',
    variables: [
      { symbol: 'q', name: 'Charge of particle', unit: 'C' },
      { symbol: 'v_{\\perp}', name: 'Velocity component perpendicular to magnetic field', unit: 'm/s' },
      { symbol: 'r', name: 'Radius of helical or circular path', unit: 'm' },
      { symbol: 'T', name: 'Cyclotron time period (independent of velocity and radius)', unit: 's' }
    ],
    conditions: [
      'Non-relativistic speeds (v ≪ c).'
    ],
    notes: [
      'Magnetic force does ZERO work on a charged particle because F_mag is always perpendicular to velocity v.',
      'Kinetic energy and speed remain strictly constant in a purely magnetic field.',
      'Helical pitch: p = v_\\parallel T = \\frac{2\\pi m v\\cos\\theta}{qB}.'
    ],
    commonMistakes: [
      'Thinking magnetic force can increase the kinetic energy of a charged particle.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter 5: Magnetism and Matter
  {
    id: 'phy-magnetic-materials',
    subject: 'Physics',
    class: '12',
    category: 'Electrodynamics',
    chapter: 'Magnetism and Matter',
    title: 'Magnetic Intensity & Material Susceptibility',
    latex: '\\vec{B} = \\mu_0(\\vec{H} + \\vec{M}) = \\mu_r\\mu_0\\vec{H}, \\quad \\chi_m = \\frac{M}{H} = \\mu_r - 1, \\quad \\chi_{\\text{paramagnetic}} = \\frac{C}{T}',
    variables: [
      { symbol: 'B', name: 'Magnetic flux density', unit: 'T' },
      { symbol: 'H', name: 'Magnetic field intensity', unit: 'A/m' },
      { symbol: 'M', name: 'Magnetisation intensity (dipole moment per unit volume)', unit: 'A/m' },
      { symbol: '\\chi_m', name: 'Magnetic susceptibility (dimensionless)' },
      { symbol: '\\mu_r', name: 'Relative magnetic permeability' },
      { symbol: 'C', name: 'Curie constant' }
    ],
    notes: [
      'Diamagnetic: \\chi_m < 0 (small negative, independent of temperature). \\mu_r < 1.',
      'Paramagnetic: \\chi_m > 0 (small positive, varies as 1/T according to Curie\'s Law).',
      'Ferromagnetic: \\chi_m \\gg 1 (large positive, exhibits hysteresis).'
    ],
    commonMistakes: [
      'Assuming diamagnetic susceptibility depends on temperature (it does not).'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Intermediate'
  },

  // Chapter 6: Electromagnetic Induction
  {
    id: 'phy-faraday-lenz-inductance',
    subject: 'Physics',
    class: '12',
    category: 'Electrodynamics',
    chapter: 'Electromagnetic Induction',
    title: 'Faraday-Lenz Law & Self/Mutual Inductance',
    latex: '\\varepsilon = -\\frac{d\\Phi_B}{dt} = -N\\frac{d}{dt}(BA\\cos\\theta), \\quad \\varepsilon_{\\text{motional}} = B v L, \\quad L = \\frac{N\\Phi_B}{I} = \\mu_0 n^2 A l',
    variables: [
      { symbol: '\\varepsilon', name: 'Induced electromotive force (EMF)', unit: 'V' },
      { symbol: '\\Phi_B', name: 'Magnetic flux', unit: 'Wb (Weber)' },
      { symbol: 'L', name: 'Self-inductance of solenoid', unit: 'H (Henry)' },
      { symbol: 'n', name: 'Turns per unit length of solenoid (N/l)' }
    ],
    units: [
      { quantity: 'Magnetic Flux', siUnit: 'Weber', symbol: 'Wb' },
      { quantity: 'Inductance', siUnit: 'Henry', symbol: 'H' }
    ],
    conditions: [
      'Negative sign represents Lenz\'s Law: induced current opposes the flux change that causes it.'
    ],
    notes: [
      'Energy stored in inductor: U = \\frac{1}{2}L I^2.',
      'Magnetic energy density: u_B = \\frac{B^2}{2\\mu_0}.',
      'Rotating rod of length L in perpendicular field B: \\varepsilon = \\frac{1}{2}B\\omega L^2.'
    ],
    commonMistakes: [
      'Forgetting the 1/2 factor in induced EMF for a rotating conducting rod.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter 7: Alternating Current
  {
    id: 'phy-ac-lcr-resonance',
    subject: 'Physics',
    class: '12',
    category: 'Electrodynamics',
    chapter: 'Alternating Current',
    title: 'Series LCR Circuit & Resonance',
    latex: 'Z = \\sqrt{R^2 + (X_L - X_C)^2}, \\quad \\tan\\phi = \\frac{X_L - X_C}{R}, \\quad \\omega_0 = \\frac{1}{\\sqrt{LC}}, \\quad Q = \\frac{\\omega_0 L}{R} = \\frac{1}{R}\\sqrt{\\frac{L}{C}}',
    variables: [
      { symbol: 'Z', name: 'Total impedance of circuit', unit: '\\Omega' },
      { symbol: 'X_L', name: 'Inductive reactance (\\omega L)', unit: '\\Omega' },
      { symbol: 'X_C', name: 'Capacitive reactance (1 / (\\omega C))', unit: '\\Omega' },
      { symbol: '\\phi', name: 'Phase angle between voltage and current', unit: 'rad' },
      { symbol: '\\omega_0', name: 'Resonant angular frequency', unit: 'rad/s' },
      { symbol: 'Q', name: 'Quality factor of resonance (sharpness)' }
    ],
    conditions: [
      'Sinusoidal AC driving voltage.'
    ],
    notes: [
      'At resonance: X_L = X_C \\implies Z = R (minimum), current amplitude is maximum, power factor \\cos\\phi = 1.',
      'Average power dissipated: P_{\\text{avg}} = V_{\\text{rms}} I_{\\text{rms}}\\cos\\phi = I_{\\text{rms}}^2 R.',
      'RMS values: V_{\\text{rms}} = V_0 / \\sqrt{2}, I_{\\text{rms}} = I_0 / \\sqrt{2}.'
    ],
    commonMistakes: [
      'Calculating power dissipation using reactive elements (pure inductor and capacitor dissipate zero average power).'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter 8: Electromagnetic Waves
  {
    id: 'phy-em-wave-relations',
    subject: 'Physics',
    class: '12',
    category: 'Electrodynamics',
    chapter: 'Electromagnetic Waves',
    title: 'Electromagnetic Wave Velocity & Poynting Vector',
    latex: 'c = \\frac{1}{\\sqrt{\\mu_0\\varepsilon_0}} = \\frac{E_0}{B_0}, \\quad \\vec{S} = \\frac{1}{\\mu_0}(\\vec{E}\\times\\vec{B}), \\quad I = \\langle S \\rangle = \\frac{1}{2}\\varepsilon_0 c E_0^2 = \\frac{E_{\\text{rms}}^2}{c\\mu_0}',
    variables: [
      { symbol: 'c', name: 'Speed of light in vacuum', unit: 'm/s' },
      { symbol: 'E_0, B_0', name: 'Peak electric and magnetic field amplitudes', unit: 'V/m and T' },
      { symbol: '\\vec{S}', name: 'Poynting vector (energy flux density)', unit: 'W/m²' },
      { symbol: 'I', name: 'Average wave intensity', unit: 'W/m²' }
    ],
    conditions: [
      'Transverse electromagnetic wave propagating in vacuum/dielectric.'
    ],
    notes: [
      'Radiation pressure on perfectly absorbing surface: P = I / c.',
      'Radiation pressure on perfectly reflecting surface: P = 2I / c.',
      'Electric and magnetic energy densities are equal: u_E = u_B = \\frac{1}{4}\\varepsilon_0 E_0^2.'
    ],
    commonMistakes: [
      'Forgetting the factor of 2 when calculating radiation pressure on a reflector.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Intermediate'
  },

  // Chapter 9: Ray Optics
  {
    id: 'phy-lens-maker-formula',
    subject: 'Physics',
    class: '12',
    category: 'Optics',
    chapter: 'Ray Optics',
    title: 'Snell\'s Law & Lens Maker\'s Formula',
    latex: 'n_1\\sin\\theta_1 = n_2\\sin\\theta_2, \\quad \\frac{1}{f} = \\left(\\frac{n_2}{n_1} - 1\\right)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right), \\quad \\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}',
    variables: [
      { symbol: 'n_1, n_2', name: 'Refractive indices of surrounding medium and lens material' },
      { symbol: 'f', name: 'Focal length of lens', unit: 'm' },
      { symbol: 'R_1, R_2', name: 'Radii of curvature of first and second refractive surfaces', unit: 'm' },
      { symbol: 'u, v', name: 'Object and image distances following Cartesian sign convention', unit: 'm' }
    ],
    conditions: [
      'Paraxial rays (small angles with principal axis).',
      'Thin lens approximation.'
    ],
    notes: [
      'Cartesian Sign Convention: Distances measured in direction of incident light are positive; opposite are negative.',
      'For equiconvex lens in air: f = \\frac{R}{2(n - 1)}. If n = 1.5, f = R.',
      'Total Internal Reflection: \\sin\\theta_c = n_2 / n_1 (where light travels from denser n_1 to rarer n_2).'
    ],
    commonMistakes: [
      'Forgetting that R_2 is negative for a standard biconvex lens in the Lens Maker formula.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter 10: Wave Optics
  {
    id: 'phy-ydse-interference',
    subject: 'Physics',
    class: '12',
    category: 'Optics',
    chapter: 'Wave Optics',
    title: 'Young\'s Double Slit Experiment (YDSE)',
    latex: '\\beta = \\frac{\\lambda D}{d}, \\quad y_n^{\\text{bright}} = n\\frac{\\lambda D}{d}, \\quad y_n^{\\text{dark}} = \\left(n - \\frac{1}{2}\\right)\\frac{\\lambda D}{d}, \\quad I = 4I_0\\cos^2\\left(\\frac{\\phi}{2}\\right)',
    variables: [
      { symbol: '\\beta', name: 'Fringe width', unit: 'm' },
      { symbol: '\\lambda', name: 'Wavelength of monochromatic light', unit: 'm' },
      { symbol: 'D', name: 'Distance between slit plane and screen', unit: 'm' },
      { symbol: 'd', name: 'Separation between coherent slits', unit: 'm' },
      { symbol: 'I_0', name: 'Intensity from each single slit', unit: 'W/m²' },
      { symbol: '\\phi', name: 'Phase difference: \\phi = \\frac{2\\pi}{\\lambda}\\Delta x' }
    ],
    conditions: [
      'd ≪ D (paraxial approximation on screen).',
      'Slits are coherent, narrow, and monochromatic.'
    ],
    notes: [
      'Fringe shift due to insertion of thin sheet of thickness t and refractive index \\mu: \\Delta y = \\frac{(\\mu - 1)t D}{d}.',
      'In a medium of refractive index \\mu, fringe width decreases: \\beta\' = \\beta / \\mu.'
    ],
    commonMistakes: [
      'Confusing angular fringe width (θ = λ/d) with linear fringe width (β = λD/d).'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter 11: Dual Nature of Radiation and Matter
  {
    id: 'phy-photoelectric-debroglie',
    subject: 'Physics',
    class: '12',
    category: 'Modern Physics',
    chapter: 'Dual Nature of Radiation and Matter',
    title: 'Einstein\'s Photoelectric Equation & de Broglie Wavelength',
    latex: 'K_{\\max} = e V_0 = h\\nu - \\Phi_0 = h\\nu - h\\nu_0, \\quad \\lambda = \\frac{h}{p} = \\frac{h}{mv} = \\frac{h}{\\sqrt{2mK}} = \\frac{1.227}{\\sqrt{V}}\\,\\text{nm (for electron)}',
    variables: [
      { symbol: 'K_{\\max}', name: 'Maximum kinetic energy of emitted photoelectrons', unit: 'J or eV' },
      { symbol: 'V_0', name: 'Stopping potential', unit: 'V' },
      { symbol: '\\nu', name: 'Incident photon frequency', unit: 'Hz' },
      { symbol: '\\Phi_0', name: 'Work function of metallic photosurface', unit: 'eV' },
      { symbol: '\\lambda', name: 'de Broglie matter wavelength', unit: 'm' }
    ],
    conditions: [
      'Photoelectric emission occurs instantaneously only if incident frequency \\nu \\ge \\nu_0 (threshold frequency).'
    ],
    notes: [
      'Slope of V_0 vs \\nu plot equals h/e (a universal constant, independent of cathode metal).',
      'Increasing light intensity increases saturation photocurrent but DOES NOT change stopping potential V_0.'
    ],
    commonMistakes: [
      'Thinking stopping potential increases with light intensity (it only increases with frequency).'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter 12: Atoms
  {
    id: 'phy-bohr-hydrogen-model',
    subject: 'Physics',
    class: '12',
    category: 'Modern Physics',
    chapter: 'Atoms',
    title: 'Bohr Postulates for Hydrogen-like Atoms',
    latex: 'r_n = \\frac{n^2 h^2 \\varepsilon_0}{\\pi m Z e^2} = 0.529\\frac{n^2}{Z}\\,\\text{Å}, \\quad v_n = \\frac{Z e^2}{2\\varepsilon_0 n h} = 2.18\\times 10^6\\frac{Z}{n}\\,\\text{m/s}, \\quad E_n = -13.6\\frac{Z^2}{n^2}\\,\\text{eV}',
    variables: [
      { symbol: 'n', name: 'Principal quantum number (1, 2, 3, ...)' },
      { symbol: 'Z', name: 'Atomic number (number of protons)' },
      { symbol: 'r_n', name: 'Radius of n-th stationary electronic orbit', unit: 'm or Å' },
      { symbol: 'E_n', name: 'Total energy in n-th state', unit: 'eV' }
    ],
    conditions: [
      'Applies strictly to single-electron species (H, He⁺, Li²⁺, Be³⁺).'
    ],
    notes: [
      'Quantization of orbital angular momentum: L = m v r = n\\frac{h}{2\\pi} = n\\hbar.',
      'Energy relationships: E_n = -K_n = \\frac{1}{2}U_n (Viral Theorem).',
      'Rydberg formula for spectral emission: \\frac{1}{\\lambda} = R_H Z^2\\left(\\frac{1}{n_1^2} - \\frac{1}{n_2^2}\\right).'
    ],
    commonMistakes: [
      'Applying Bohr formulas directly to multi-electron atoms without effective nuclear charge corrections.'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter 13: Nuclei
  {
    id: 'phy-radioactivity-mass-defect',
    subject: 'Physics',
    class: '12',
    category: 'Modern Physics',
    chapter: 'Nuclei',
    title: 'Radioactive Decay Law & Nuclear Binding Energy',
    latex: 'N(t) = N_0 e^{-\\lambda t}, \\quad T_{1/2} = \\frac{\\ln 2}{\\lambda} = \\frac{0.693}{\\lambda}, \\quad \\tau = \\frac{1}{\\lambda}, \\quad \\Delta E_b = \\Delta m\\cdot c^2 = \\left[Z m_p + (A-Z)m_n - M_{\\text{nucleus}}\\right]c^2',
    variables: [
      { symbol: 'N(t)', name: 'Number of undecayed radioactive nuclei at time t' },
      { symbol: '\\lambda', name: 'Decay constant', unit: 's⁻¹' },
      { symbol: 'T_{1/2}', name: 'Radioactive half-life', unit: 's' },
      { symbol: '\\tau', name: 'Mean lifetime (1 / \\lambda)', unit: 's' },
      { symbol: '\\Delta E_b', name: 'Nuclear binding energy', unit: 'MeV' }
    ],
    notes: [
      '1 atomic mass unit (1 u) = 931.5 MeV/c².',
      'Nuclear radius scaling: R = R_0 A^{1/3} (where R_0 \\approx 1.2\\,\\text{fm}). Thus nuclear density is roughly constant across all nuclei (\\approx 2.3 \\times 10^{17}\\,\\text{kg/m}^3).'
    ],
    commonMistakes: [
      'Confusing half-life T_{1/2} with mean lifetime τ (τ = 1.44 T_{1/2}).'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  },

  // Chapter 14: Semiconductor Electronics
  {
    id: 'phy-semiconductors-transistors',
    subject: 'Physics',
    class: '12',
    category: 'Modern Physics',
    chapter: 'Semiconductor Electronics',
    title: 'Semiconductor Conductivity & Diode Rectification',
    latex: 'n_i^2 = n_e n_h, \\quad \\sigma = e(n_e\\mu_e + n_h\\mu_h), \\quad I = I_0\\left(e^{\\frac{eV}{\\eta k_B T}} - 1\\right), \\quad \\eta_{\\text{rectifier, half}} = 40.6\\%, \\quad \\eta_{\\text{rectifier, full}} = 81.2\\%',
    variables: [
      { symbol: 'n_i', name: 'Intrinsic carrier concentration', unit: 'm⁻³' },
      { symbol: 'n_e, n_h', name: 'Electron and hole concentrations in doped semiconductor', unit: 'm⁻³' },
      { symbol: '\\mu_e, \\mu_h', name: 'Mobilities of electrons and holes (\\mu_e > \\mu_h)', unit: 'm²/(V·s)' },
      { symbol: '\\sigma', name: 'Electrical conductivity', unit: 'S/m' }
    ],
    notes: [
      'Mass Action Law: n_e n_h = n_i² holds in thermal equilibrium for both intrinsic and extrinsic semiconductors.',
      'Zener diode operates in the reverse breakdown region as a voltage regulator.',
      'Depletion region width INCREASES under reverse bias and DECREASES under forward bias.'
    ],
    commonMistakes: [
      'Thinking n-type semiconductor has a negative net charge (it remains electrically neutral overall).'
    ],
    examTags: ['JEE Main', 'JEE Advanced', 'NEET'],
    difficulty: 'Fundamental'
  }
];
