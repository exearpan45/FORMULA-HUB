export type Subject = 'Physics' | 'Chemistry' | 'Mathematics';

export type ExamType = 'JEE Main' | 'JEE Advanced' | 'NEET';

export type Difficulty = 'Fundamental' | 'Intermediate' | 'Advanced';

export interface VariableItem {
  symbol: string;
  name: string;
  unit?: string;
  notes?: string;
}

export interface UnitItem {
  quantity: string;
  siUnit: string;
  symbol: string;
}

export interface FormulaVariation {
  label: string;
  latex: string;
  note?: string;
}

export interface Formula {
  id: string;
  subject: Subject;
  class: '11' | '12';
  category: string; // e.g. 'Mechanics', 'Physical Chemistry', 'Calculus'
  chapter: string;
  title: string;
  latex: string;
  description?: string;
  variables: VariableItem[];
  units?: UnitItem[];
  conditions?: string[];
  notes?: string[];
  commonMistakes?: string[];
  variations?: FormulaVariation[];
  examTags: ExamType[];
  difficulty: Difficulty;
  neetRelevant?: boolean;
  jeeAdvancedNotes?: string;
}

export interface ConstantItem {
  id: string;
  name: string;
  symbol: string;
  latexSymbol: string;
  value: string;
  siUnit: string;
  category: 'Universal' | 'Electromagnetic' | 'Atomic & Nuclear' | 'Physicochemical';
  uncertainty?: string;
  notes: string;
}

export interface IdentityItem {
  id: string;
  category: string;
  title: string;
  latex: string;
  notes?: string;
}

export interface QuizQuestion {
  id: string;
  subject: Subject;
  chapter: string;
  question: string;
  latexQuestion?: string;
  options: {
    id: string;
    text?: string;
    latex?: string;
  }[];
  correctOptionId: string;
  explanation: string;
  latexExplanation?: string;
  exam: ExamType[];
}

export interface UserProgress {
  theme: 'dark' | 'light';
  activeExam: ExamType;
  bookmarkedIds: string[];
  revisedIds: string[];
  formulaNotes: Record<string, string>; // formulaId -> note string
  recentFormulaIds: string[];
  searchHistory: string[];
  bedStudySettings: {
    fontSize: 'normal' | 'large' | 'xl' | 'giant';
    width: 'compact' | 'standard' | 'wide' | 'full';
    theme: 'navy' | 'oled' | 'sepia';
  };
  quizHistory: {
    completedAt: string;
    score: number;
    total: number;
    subject?: string;
  }[];
}
