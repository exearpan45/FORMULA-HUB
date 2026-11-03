import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Download,
  Printer,
  FileText,
  Search,
  BookOpen,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { PdfDocument } from '../../types/pdf';
import { ALL_FORMULAS } from '../../data/allFormulas';
import { downloadPdf, generatePdfDocument } from '../../utils/pdfGenerator';
import { MathView } from '../MathView';

interface AdvancedPdfReaderProps {
  document: PdfDocument;
  onClose: () => void;
  onNavigateDoc?: (direction: 'prev' | 'next') => void;
  hasPrevDoc?: boolean;
  hasNextDoc?: boolean;
}

export const AdvancedPdfReader: React.FC<AdvancedPdfReaderProps> = ({
  document: docMeta,
  onClose,
  onNavigateDoc,
  hasPrevDoc = false,
  hasNextDoc = false,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDistractionFree, setIsDistractionFree] = useState(false);

  // Relevant formulas for this document
  const relevantFormulas = useMemo(() => {
    if (docMeta.chapter) {
      return ALL_FORMULAS.filter((f) => f.chapter.toLowerCase() === docMeta.chapter?.toLowerCase());
    }
    if (docMeta.subject !== 'Combined') {
      if (docMeta.class !== 'Combined') {
        return ALL_FORMULAS.filter((f) => f.subject === docMeta.subject && f.class === docMeta.class);
      }
      return ALL_FORMULAS.filter((f) => f.subject === docMeta.subject);
    }
    return ALL_FORMULAS.slice(0, 25);
  }, [docMeta]);

  // Prefer the administrator-uploaded PDF; generate a local copy only for legacy catalogue entries.
  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;
    const loadPdf = async () => {
      setPdfDataUri(null);
      try {
        const activeVersion = docMeta.versions?.find((version) => version.versionNumber === docMeta.currentVersion);
        if (activeVersion?.fileUrl) { if (!cancelled) setPdfDataUri(activeVersion.fileUrl); return; }
        if (activeVersion?.fileData?.startsWith('data:application/pdf')) {
          const response = await fetch(activeVersion.fileData);
          if (!response.ok) throw new Error('Unable to read the uploaded PDF.');
          const blob = await response.blob();
          const header = new TextDecoder().decode(await blob.slice(0, 5).arrayBuffer());
          if (header !== '%PDF-') throw new Error('The uploaded file is not a valid PDF.');
          objectUrl = URL.createObjectURL(blob);
        } else {
          const generated = generatePdfDocument(docMeta, relevantFormulas).output('blob');
          const header = new TextDecoder().decode(await generated.slice(0, 5).arrayBuffer());
          if (header !== '%PDF-') throw new Error('PDF generation returned an invalid document.');
          objectUrl = URL.createObjectURL(generated);
        }
        if (!cancelled && objectUrl) setPdfDataUri(objectUrl);
      } catch (error) { console.error('Unable to load PDF document:', error); if (!cancelled) setPdfDataUri(null); }
    };
    void loadPdf();
    return () => { cancelled = true; if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [docMeta, relevantFormulas]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'j') {
        e.preventDefault();
        setCurrentPage((prev) => Math.min(prev + 1, docMeta.pageCount || 999));
      } else if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setZoomLevel((z) => Math.min(z + 15, 200));
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        setZoomLevel((z) => Math.max(z - 15, 60));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, docMeta.pageCount]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleDownload = () => {
    const activeVersion = docMeta.versions?.find((version) => version.versionNumber === docMeta.currentVersion);
    if (activeVersion?.fileData?.startsWith('data:application/pdf')) {
      const anchor = window.document.createElement('a');
      anchor.href = activeVersion.fileData;
      anchor.download = docMeta.id + '-v' + docMeta.currentVersion + '.pdf';
      anchor.click();
      return;
    }
    if (activeVersion?.fileUrl) {
      const anchor = window.document.createElement('a');
      anchor.href = activeVersion.fileUrl; anchor.target = '_blank'; anchor.rel = 'noopener noreferrer';
      anchor.download = docMeta.id + '-v' + docMeta.currentVersion + '.pdf'; anchor.click();
      return;
    }
    downloadPdf(docMeta, relevantFormulas);
  };

  const handlePrint = () => {
    if (pdfDataUri) {
      const iframe = window.document.getElementById('pdf-render-frame') as HTMLIFrameElement;
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.print();
        return;
      }
    }
    window.print();
  };

  // Filter formulas inside document
  const filteredFormulas = useMemo(() => {
    if (!searchQuery.trim()) return relevantFormulas;
    const q = searchQuery.toLowerCase();
    return relevantFormulas.filter(
      (f) =>
        f.title.toLowerCase().includes(q) ||
        f.latex.toLowerCase().includes(q) ||
        f.variables.some((v) => v.name.toLowerCase().includes(q) || v.symbol.toLowerCase().includes(q))
    );
  }, [relevantFormulas, searchQuery]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-slate-100 select-none overflow-hidden animate-in fade-in duration-150">
      
      {/* Top Reading Toolbar */}
      <header className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md shrink-0">
        
        {/* Left: Document Identity & Navigation */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-1.5 text-xs">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: docMeta.coverAccentColor || '#0284c7' }}
            />
            <span className="font-bold text-sky-400 hidden sm:inline">{docMeta.subject}</span>
            <span className="text-slate-600 hidden sm:inline">·</span>
            <h1 className="text-sm font-bold text-white truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {docMeta.title}
            </h1>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
              v{docMeta.currentVersion}
            </span>
          </div>

          {/* Doc Switchers */}
          {onNavigateDoc && (
            <div className="hidden md:flex items-center gap-1 border-l border-slate-800 pl-2">
              <button
                onClick={() => onNavigateDoc('prev')}
                disabled={!hasPrevDoc}
                className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                title="Previous Document"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigateDoc('next')}
                disabled={!hasNextDoc}
                className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                title="Next Document"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Center: Page Navigation & Zoom Controls */}
        <div className="flex items-center gap-2">
          
          {/* Page Counter */}
          <div className="flex items-center gap-1 text-xs font-mono bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-0.5 text-slate-400 hover:text-white disabled:opacity-30"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="text-slate-300">
              Page <strong className="text-white">{currentPage}</strong> / {docMeta.pageCount}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(docMeta.pageCount, p + 1))}
              disabled={docMeta.pageCount > 0 && currentPage >= docMeta.pageCount}
              className="p-0.5 text-slate-400 hover:text-white disabled:opacity-30"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 text-xs font-mono bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 15, 60))}
              className="p-1 text-slate-400 hover:text-white"
              title="Zoom Out (-)"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="w-10 text-center text-slate-300">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 15, 200))}
              className="p-1 text-slate-400 hover:text-white"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          
          {/* Distraction-free toggle */}
          <button
            onClick={() => setIsDistractionFree((prev) => !prev)}
            className={`p-1.5 rounded-lg text-xs font-semibold transition-colors hidden md:flex items-center gap-1 ${
              isDistractionFree ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white bg-slate-800'
            }`}
            title="Toggle Distraction-Free Reading Mode"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Focus</span>
          </button>

          {/* Print */}
          <button
            onClick={handlePrint}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden sm:block"
            title="Print Formula Sheet"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Download Real PDF */}
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors shadow-sm"
            title="Download PDF file"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Fullscreen (F)"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
            title="Close viewer (Esc)"
          >
            <X className="w-4 h-4" />
          </button>

        </div>

      </header>

      {/* Main Split Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side Content Outline (hidden in distraction-free mode) */}
        {!isDistractionFree && (
          <aside className="w-72 sm:w-80 border-r border-slate-800 bg-slate-900/60 flex flex-col shrink-0 hidden md:flex">
            
            {/* Search inside doc */}
            <div className="p-3 border-b border-slate-800">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter formula outline..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-800 bg-slate-950 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            {/* Document Outline Index */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2 px-1">
                Formulas ({filteredFormulas.length})
              </span>

              {filteredFormulas.map((formula, idx) => (
                <div
                  key={formula.id}
                  className="p-2.5 rounded-lg bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800/80 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1">
                    <span className="font-mono text-sky-400">{String(idx + 1).padStart(2, '0')}.</span>
                    <span className="truncate">{formula.chapter}</span>
                  </div>
                  <h4 className="font-semibold text-slate-200 group-hover:text-sky-300 transition-colors truncate">
                    {formula.title}
                  </h4>
                </div>
              ))}
            </div>

            {/* Document Metadata Footer */}
            <div className="p-3 border-t border-slate-800 text-[11px] text-slate-400 space-y-1 bg-slate-950/40">
              <div className="flex justify-between">
                <span>File Size:</span>
                <span className="font-mono text-slate-200">{(docMeta.fileSize / 1024 / 1024).toFixed(1)} MB</span>
              </div>
              <div className="flex justify-between">
                <span>Total Pages:</span>
                <span className="font-mono text-slate-200">{docMeta.pageCount} Pages</span>
              </div>
              <div className="flex justify-between">
                <span>Verified:</span>
                <span className="text-emerald-400 font-semibold">{docMeta.verifiedBy}</span>
              </div>
            </div>
          </aside>
        )}

        {/* Right Canvas: Embedded PDF Viewer */}
        <div className="flex-1 overflow-auto bg-slate-950 flex justify-center p-4 sm:p-8">
          
          <div
            className="w-full max-w-4xl transition-all duration-200 flex flex-col items-center"
            style={{ width: '100%' }}
          >
            {/* Embedded Native / Blob PDF Iframe */}
            {pdfDataUri ? (
              <div className="w-full rounded-xl overflow-hidden shadow-2xl border border-slate-800 bg-white">
                <iframe
                  id="pdf-render-frame"
                  src={pdfDataUri + '#page=' + currentPage + '&zoom=' + zoomLevel}
                  title={docMeta.title}
                  className="w-full h-[85vh] border-0"
                />
              </div>
            ) : (
              <div className="py-24 text-center text-slate-400">
                <div className="w-10 h-10 border-2 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm font-medium">Generating high-fidelity PDF sheet...</p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
