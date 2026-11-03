import { jsPDF } from 'jspdf';
import { Formula, Subject } from '../types/formula';
import { PdfDocument } from '../types/pdf';
import { CONSTANTS_DATA } from '../data/constantsData';
import { IDENTITIES_DATA } from '../data/identitiesData';

interface SubjectPalette {
  primary: [number, number, number]; // RGB
  secondary: [number, number, number];
  accent: [number, number, number];
  lightBg: [number, number, number];
  cardBg: [number, number, number];
}

const PALETTES: Record<string, SubjectPalette> = {
  Physics: {
    primary: [2, 132, 199], // #0284c7 electric blue
    secondary: [6, 182, 212], // #06b6d4 cyan
    accent: [139, 92, 246], // #8b5cf6 violet
    lightBg: [240, 249, 255],
    cardBg: [248, 250, 252],
  },
  Chemistry: {
    primary: [5, 150, 105], // #059669 emerald
    secondary: [13, 148, 136], // #0d9488 turquoise
    accent: [124, 58, 237], // #7c3aed purple
    lightBg: [236, 253, 245],
    cardBg: [248, 250, 252],
  },
  Mathematics: {
    primary: [234, 88, 12], // #ea580c orange
    secondary: [79, 70, 229], // #4f46e5 indigo
    accent: [37, 99, 235], // #2563eb blue
    lightBg: [255, 247, 237],
    cardBg: [248, 250, 252],
  },
  Combined: {
    primary: [15, 23, 42], // slate
    secondary: [2, 132, 199],
    accent: [217, 119, 6], // amber
    lightBg: [248, 250, 252],
    cardBg: [255, 255, 255],
  },
};

/**
 * Format math expressions into clean readable text for PDF typography
 */
function cleanLatexForPdf(latex: string): string {
  return latex
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\left\(/g, '(')
    .replace(/\\right\)/g, ')')
    .replace(/\\left\[/g, '[')
    .replace(/\\right\]/g, ']')
    .replace(/\\left\|/g, '|')
    .replace(/\\right\|/g, '|')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1) / ($2)')
    .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
    .replace(/\\pm/g, '±')
    .replace(/\\mp/g, '∓')
    .replace(/\\times/g, ' × ')
    .replace(/\\cdot/g, ' · ')
    .replace(/\\ge/g, '≥')
    .replace(/\\le/g, '≤')
    .replace(/\\gg/g, '≫')
    .replace(/\\ll/g, '≪')
    .replace(/\\approx/g, '≈')
    .replace(/\\neq/g, '≠')
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\gamma/g, 'γ')
    .replace(/\\theta/g, 'θ')
    .replace(/\\phi/g, 'φ')
    .replace(/\\lambda/g, 'λ')
    .replace(/\\mu/g, 'μ')
    .replace(/\\pi/g, 'π')
    .replace(/\\omega/g, 'ω')
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\varepsilon/g, 'ε')
    .replace(/\\rho/g, 'ρ')
    .replace(/\\sigma/g, 'σ')
    .replace(/\\tau/g, 'τ')
    .replace(/\\int/g, '∫')
    .replace(/\\sum/g, '∑')
    .replace(/\\infty/g, '∞')
    .replace(/\\quad/g, '   ')
    .replace(/\\,/g, ' ')
    .replace(/\\;/g, ' ')
    .replace(/\\partial/g, '∂')
    .replace(/\\vec\{([^}]+)\}/g, '$1⃗')
    .replace(/\\hat\{([^}]+)\}/g, '$1̂')
    .replace(/\\^2/g, '²')
    .replace(/\\^3/g, '³')
    .replace(/[{}]/g, '')
    .trim();
}

/**
 * Builds a publication-grade PDF document
 */
export function generatePdfDocument(docMeta: PdfDocument, formulas: Formula[]): jsPDF {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  const palette = PALETTES[docMeta.subject] || PALETTES.Combined;

  // --- PAGE 1: COVER PAGE ---
  // Top decorative color strip
  doc.setFillColor(...palette.primary);
  doc.rect(0, 0, pageWidth, 12, 'F');
  doc.setFillColor(...palette.secondary);
  doc.rect(0, 12, pageWidth, 3, 'F');

  // Brand Header
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('FORMULA HUB  ·  JEE & NEET REFERENCE LIBRARY', margin, 26);

  // Subject Badge
  doc.setFillColor(...palette.lightBg);
  doc.roundedRect(margin, 36, contentWidth, 75, 4, 4, 'F');
  doc.setDrawColor(...palette.primary);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, 36, contentWidth, 75, 4, 4, 'S');

  // Category Tag
  doc.setTextColor(...palette.primary);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`${docMeta.subject.toUpperCase()}  |  CLASS ${docMeta.class}  |  ${docMeta.category.toUpperCase()}`, margin + 8, 48);

  // Big Title
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  const titleLines = doc.splitTextToSize(docMeta.title, contentWidth - 16);
  doc.text(titleLines, margin + 8, 62);

  // Subtitle / Description
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);
  const descLines = doc.splitTextToSize(docMeta.description, contentWidth - 16);
  doc.text(descLines, margin + 8, 76);

  // Exam Badges Row
  let badgeX = margin + 8;
  docMeta.examTags.forEach((exam) => {
    doc.setFillColor(...palette.primary);
    doc.roundedRect(badgeX, 90, 28, 7, 2, 2, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(exam, badgeX + 14, 94.5, { align: 'center' });
    badgeX += 32;
  });

  // Metadata Panel
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, 120, contentWidth, 45, 3, 3, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, 120, contentWidth, 45, 3, 3, 'S');

  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('DOCUMENT VERSION:', margin + 8, 130);
  doc.text('VERIFICATION STATUS:', margin + 65, 130);
  doc.text('LAST UPDATED:', margin + 125, 130);

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`Version ${docMeta.currentVersion}`, margin + 8, 137);
  doc.setTextColor(5, 150, 105);
  doc.text('Verified Syllabus Grade', margin + 65, 137);
  doc.setTextColor(15, 23, 42);
  doc.text(docMeta.lastUpdated, margin + 125, 137);

  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('VERIFIED BY:', margin + 8, 149);
  doc.text('FORMULAS INCLUDED:', margin + 65, 149);
  doc.text('TOTAL PAGES:', margin + 125, 149);

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(docMeta.verifiedBy, margin + 8, 156);
  doc.text(`${formulas.length} Core Equations`, margin + 65, 156);
  doc.text(`${docMeta.pageCount} Pages`, margin + 125, 156);

  // Table of Contents Preview
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(margin, 175, contentWidth, 90, 3, 3, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, 175, contentWidth, 90, 3, 3, 'S');

  doc.setTextColor(...palette.primary);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('EXECUTIVE TABLE OF CONTENTS', margin + 8, 187);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);

  let tocY = 196;
  const maxTocItems = Math.min(formulas.length, 7);
  for (let i = 0; i < maxTocItems; i++) {
    const f = formulas[i];
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...palette.secondary);
    doc.text(`${String(i + 1).padStart(2, '0')}.`, margin + 8, tocY);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(30, 41, 59);
    doc.text(f.title, margin + 18, tocY);
    doc.setTextColor(148, 163, 184);
    doc.text(`·  ${f.chapter}`, margin + 120, tocY);
    tocY += 8;
  }
  if (formulas.length > 7) {
    doc.setTextColor(100, 116, 139);
    doc.setFont('helvetica', 'italic');
    doc.text(`+ and ${formulas.length - 7} additional formulas, conditions and derivations inside...`, margin + 8, tocY + 2);
  }

  // Cover Footer
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('Formula Hub Academic Publishing  ·  Free for Student Use  ·  formula-hub.pages.dev', margin, 282);

  // --- CONTENT PAGES ---
  let currentPage = 1;
  let currentY = margin + 15;

  const startNewPage = () => {
    doc.addPage();
    currentPage += 1;
    currentY = margin + 15;

    // Header strip
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(margin, 18, pageWidth - margin, 18);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...palette.primary);
    doc.text(`${docMeta.subject.toUpperCase()} · ${docMeta.title}`, margin, 14);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(148, 163, 184);
    doc.text(`Page ${currentPage}`, pageWidth - margin, 14, { align: 'right' });

    // Footer strip
    doc.line(margin, pageHeight - 14, pageWidth - margin, pageHeight - 14);
    doc.text('FORMULA HUB  ·  Every Formula. One Destination.', margin, pageHeight - 9);
    doc.text(`v${docMeta.currentVersion}`, pageWidth - margin, pageHeight - 9, { align: 'right' });
  };

  startNewPage();

  // Render Formula Cards
  formulas.forEach((formula, idx) => {
    // Check if card needs a new page (card needs approx 75mm)
    if (currentY > pageHeight - 75) {
      startNewPage();
    }

    const cardY = currentY;
    const cardPadding = 6;
    const cardInnerWidth = contentWidth - cardPadding * 2;

    // Outer card container
    doc.setFillColor(252, 253, 255);
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);

    // Header background bar inside card
    doc.setFillColor(...palette.lightBg);
    doc.roundedRect(margin, cardY, contentWidth, 10, 2, 2, 'F');

    // Title & Index
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...palette.primary);
    doc.text(`${idx + 1}.`, margin + cardPadding, cardY + 7);
    doc.setTextColor(15, 23, 42);
    doc.text(formula.title, margin + cardPadding + 6, cardY + 7);

    // Chapter badge on right
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`Class ${formula.class} · ${formula.chapter}`, margin + contentWidth - cardPadding, cardY + 7, { align: 'right' });

    let itemY = cardY + 16;

    // Formula equation box
    const cleanedLatex = cleanLatexForPdf(formula.latex);
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(margin + cardPadding, itemY, cardInnerWidth, 14, 2, 2, 'F');
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.2);
    doc.roundedRect(margin + cardPadding, itemY, cardInnerWidth, 14, 2, 2, 'S');

    doc.setFont('courier', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(cleanedLatex, margin + contentWidth / 2, itemY + 9, { align: 'center', maxWidth: cardInnerWidth - 4 });

    itemY += 19;

    // Variables row
    if (formula.variables && formula.variables.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text('Where:', margin + cardPadding, itemY + 3);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(51, 65, 85);

      const varStrings = formula.variables
        .slice(0, 6)
        .map((v) => `${cleanLatexForPdf(v.symbol)} = ${v.name}${v.unit ? ` (${v.unit})` : ''}`)
        .join(';  ');

      const splitVars = doc.splitTextToSize(varStrings, cardInnerWidth - 14);
      doc.text(splitVars, margin + cardPadding + 13, itemY + 3);
      itemY += splitVars.length * 4 + 2;
    }

    // Conditions box
    if (formula.conditions && formula.conditions.length > 0) {
      doc.setFillColor(254, 243, 199);
      doc.roundedRect(margin + cardPadding, itemY, cardInnerWidth, 7, 1.5, 1.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(180, 83, 9);
      doc.text('CONDITION:', margin + cardPadding + 2, itemY + 4.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(120, 53, 15);
      const condText = formula.conditions[0];
      const truncCond = condText.length > 110 ? condText.slice(0, 107) + '...' : condText;
      doc.text(truncCond, margin + cardPadding + 24, itemY + 4.5);
      itemY += 10;
    }

    // Common Mistakes Warning
    if (formula.commonMistakes && formula.commonMistakes.length > 0) {
      doc.setFillColor(255, 241, 242);
      doc.roundedRect(margin + cardPadding, itemY, cardInnerWidth, 7, 1.5, 1.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(225, 29, 72);
      doc.text('EXAM TRAP:', margin + cardPadding + 2, itemY + 4.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(159, 18, 57);
      const trapText = formula.commonMistakes[0];
      const truncTrap = trapText.length > 110 ? trapText.slice(0, 107) + '...' : trapText;
      doc.text(truncTrap, margin + cardPadding + 24, itemY + 4.5);
      itemY += 10;
    }

    // Draw total outer card border
    const cardHeight = itemY - cardY + 2;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.4);
    doc.roundedRect(margin, cardY, contentWidth, cardHeight, 2, 2, 'S');

    // Spacing to next card
    currentY += cardHeight + 6;
  });

  return doc;
}

/**
 * Download a generated PDF file directly to user device
 */
export function downloadPdf(docMeta: PdfDocument, formulas: Formula[]) {
  const doc = generatePdfDocument(docMeta, formulas);
  const filename = `${docMeta.subject.toLowerCase()}-${docMeta.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-v${docMeta.currentVersion}.pdf`;
  doc.save(filename);
}

/**
 * Returns a PDF data URI string suitable for browser iframe embedding
 */
export function getPdfDataUri(docMeta: PdfDocument, formulas: Formula[]): string {
  const doc = generatePdfDocument(docMeta, formulas);
  return doc.output('datauristring');
}

/**
 * Returns a PDF Blob for download or preview
 */
export function getPdfBlob(docMeta: PdfDocument, formulas: Formula[]): Blob {
  const doc = generatePdfDocument(docMeta, formulas);
  return doc.output('blob');
}
