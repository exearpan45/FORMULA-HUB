import { Formula, Subject, ExamType } from '../types/formula';
import { PHYSICS_FORMULAS } from './physicsData';
import { CHEMISTRY_FORMULAS } from './chemistryData';
import { MATH_FORMULAS } from './mathData';

export const ALL_FORMULAS: Formula[] = [
  ...PHYSICS_FORMULAS,
  ...CHEMISTRY_FORMULAS,
  ...MATH_FORMULAS,
];

export function getFormulasBySubject(subject: Subject): Formula[] {
  return ALL_FORMULAS.filter((f) => f.subject === subject);
}

export function getFormulasByExam(exam: ExamType): Formula[] {
  return ALL_FORMULAS.filter((f) => f.examTags.includes(exam));
}

export interface SubjectStats {
  subject: Subject;
  totalFormulas: number;
  class11Formulas: number;
  class12Formulas: number;
  totalChapters: number;
  chapters: string[];
}

export function getSubjectStats(subject: Subject): SubjectStats {
  const formulas = getFormulasBySubject(subject);
  const chapters = Array.from(new Set(formulas.map((f) => f.chapter)));
  const class11 = formulas.filter((f) => f.class === '11').length;
  const class12 = formulas.filter((f) => f.class === '12').length;

  return {
    subject,
    totalFormulas: formulas.length,
    class11Formulas: class11,
    class12Formulas: class12,
    totalChapters: chapters.length,
    chapters,
  };
}

export function getGlobalStats() {
  const physics = getSubjectStats('Physics');
  const chemistry = getSubjectStats('Chemistry');
  const mathematics = getSubjectStats('Mathematics');

  const allChapters = Array.from(new Set(ALL_FORMULAS.map((f) => `${f.subject}::${f.chapter}`)));

  return {
    totalFormulas: ALL_FORMULAS.length,
    totalChapters: allChapters.length,
    physics,
    chemistry,
    mathematics,
  };
}
