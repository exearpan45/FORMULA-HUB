import React, { useState, useMemo, useEffect } from 'react';
import {
  FileText,
  Download,
  BookOpen,
  Search,
  Filter,
  Bookmark,
  Share2,
  Check,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpDown,
  Sparkles,
} from 'lucide-react';
import { PdfDocument } from '../../types/pdf';
import { INITIAL_PDF_CATALOG } from '../../data/pdfCatalog';
import { ALL_FORMULAS } from '../../data/allFormulas';
import { downloadPdf } from '../../utils/pdfGenerator';
import { AdvancedPdfReader } from './AdvancedPdfReader';
import { useApp } from '../../context/AppContext';
import { Subject, ExamType } from '../../types/formula';

export const PdfLibraryView: React.FC = () => {
  const { activeExam } = useApp();

  const [documents, setDocuments] = useState<PdfDocument[]>(INITIAL_PDF_CATALOG);

  // Synchronise published documents with the admin API; retain bundled catalogue as an offline fallback.
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/public/pdfs', { signal: controller.signal, cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) throw new Error('PDF catalogue API unavailable');
        const payload = await response.json();
        if (Array.isArray(payload.documents)) setDocuments(payload.documents);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') console.warn('Using bundled PDF catalogue:', error);
      });
    return () => controller.abort();
  }, []);
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'All' | 'Bundles'>('All');
  const [selectedClass, setSelectedClass] = useState<'All' | '11' | '12' | 'Combined'>('All');
  const [examFilter, setExamFilter] = useState<ExamType | 'All'>(activeExam);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'downloads' | 'pages'>('downloads');
  const [bookmarkedPdfIds, setBookmarkedPdfIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('formula_hub_bookmarked_pdfs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active Reader modal document
  const [activeReaderDoc, setActiveReaderDoc] = useState<PdfDocument | null>(null);
  const [copiedShareId, setCopiedShareId] = useState<string | null>(null);

  const toggleBookmarkPdf = (id: string) => {
    setBookmarkedPdfIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('formula_hub_bookmarked_pdfs', JSON.stringify(next));
      return next;
    });
  };

  const handleShare = async (doc: PdfDocument) => {
    try {
      const shareUrl = `${window.location.origin}/?tab=pdf-library&doc=${doc.id}`;
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopiedShareId(doc.id);
        setTimeout(() => setCopiedShareId(null), 2000);
      }
    } catch {
      // Fallback
    }
  };

  const handleDownload = (doc: PdfDocument) => {
    const activeVersion = doc.versions?.find((version) => version.versionNumber === doc.currentVersion);
    if (activeVersion?.fileData?.startsWith('data:application/pdf')) {
      const link = window.document.createElement('a');
      link.href = activeVersion.fileData;
      link.download = doc.id + '-v' + doc.currentVersion + '.pdf';
      link.click();
      return;
    }
    if (activeVersion?.fileUrl) {
      const link = window.document.createElement('a');
      link.href = activeVersion.fileUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.download = doc.id + '-v' + doc.currentVersion + '.pdf';
      link.click();
      return;
    }
    let formulas = ALL_FORMULAS;
    if (doc.chapter) formulas = ALL_FORMULAS.filter((f) => f.chapter.toLowerCase() === doc.chapter?.toLowerCase());
    else if (doc.subject !== 'Combined') formulas = ALL_FORMULAS.filter((f) => f.subject === doc.subject);
    downloadPdf(doc, formulas);
  };

  // Filter and sort
  const filteredDocs = useMemo(() => {
    return documents.filter((doc) => {
      // Subject filter
      if (selectedSubject === 'Bundles') {
        if (doc.category !== 'Subject Master' && doc.category !== 'Special Toolkit') return false;
      } else if (selectedSubject !== 'All') {
        if (doc.subject !== selectedSubject) return false;
      }

      // Class filter
      if (selectedClass !== 'All' && doc.class !== selectedClass) return false;

      // Exam filter
      if (examFilter !== 'All' && !doc.examTags.includes(examFilter)) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = doc.title.toLowerCase().includes(q);
        const matchesDesc = doc.description.toLowerCase().includes(q);
        const matchesChapter = doc.chapter?.toLowerCase().includes(q);
        const matchesSubject = doc.subject.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesChapter && !matchesSubject) return false;
      }

      return doc.status === 'Published';
    }).sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      if (sortBy === 'downloads') return b.downloadsCount - a.downloadsCount;
      if (sortBy === 'pages') return b.pageCount - a.pageCount;
      return 0;
    });
  }, [documents, selectedSubject, selectedClass, examFilter, searchQuery, sortBy]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Hero Header */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            <Sparkles className="w-4 h-4" />
            <span>Official Publication Library</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Professional Colourful PDF Sheets
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Download or read online verified, colourful infographic formula compendiums for Class 11, Class 12,
            JEE Main, JEE Advanced, and NEET. High-resolution typography, complete conditions, and derivations.
          </p>
        </div>

        {/* Global Stats Counter */}
        <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-4 md:pt-0 md:pl-8">
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono">
              {documents.length}
            </div>
            <div className="text-[11px] text-slate-400">Published Sheets</div>
          </div>
          <div>
            <div className="text-2xl font-black text-sky-600 dark:text-sky-400 font-mono">
              100%
            </div>
            <div className="text-[11px] text-slate-400">Free Vector PDFs</div>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="space-y-4">
        
        {/* Row 1: Subject Selector Tabs */}
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {(['All', 'Physics', 'Chemistry', 'Mathematics', 'Bundles'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSubject(s)}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap shrink-0 ${
                  selectedSubject === s
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {s === 'Bundles' ? 'Master Bundles' : s}
              </button>
            ))}
          </div>

          {/* Exam Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 shrink-0">
            <span className="font-semibold hidden sm:inline">Exam:</span>
            {(['All', 'JEE Main', 'JEE Advanced', 'NEET'] as const).map((ex) => (
              <button
                key={ex}
                onClick={() => setExamFilter(ex)}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  examFilter === ex
                    ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Search, Class Filter, and Sort */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search PDF sheets (e.g. Kinematics, Thermodynamics, Master, Integrals)..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Sorting & Class */}
          <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
            <span className="text-slate-400 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium focus:outline-none"
            >
              <option value="downloads">Most Downloaded</option>
              <option value="recent">Recently Updated</option>
              <option value="pages">Most Comprehensive</option>
            </select>
          </div>

        </div>

      </div>

      {/* PDF Grid Cards */}
      {filteredDocs.length === 0 ? (
        <div className="py-20 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <FileText className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-700 dark:text-slate-300">No PDF sheets matched your criteria</h3>
          <p className="text-xs text-slate-400 mt-1">Try resetting the exam or subject filter to explore more chapters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => {
            const isBookmarked = bookmarkedPdfIds.includes(doc.id);
            const isCopied = copiedShareId === doc.id;
            const sizeInMb = (doc.fileSize / 1024 / 1024).toFixed(1);

            return (
              <div
                key={doc.id}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs transition-all flex flex-col justify-between overflow-hidden"
              >
                {/* Visual Thumbnail Cover Banner */}
                <div
                  className="h-32 p-4 relative flex flex-col justify-between text-white overflow-hidden transition-all"
                  style={{
                    background:
                      doc.subject === 'Physics'
                        ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)'
                        : doc.subject === 'Chemistry'
                        ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
                        : doc.subject === 'Mathematics'
                        ? 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)'
                        : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                  }}
                >
                  {/* Subtle vector background overlay */}
                  <div className="absolute right-2 -bottom-4 opacity-15 font-black text-7xl select-none pointer-events-none">
                    {doc.subject === 'Physics' ? 'Φ' : doc.subject === 'Chemistry' ? '⚗' : doc.subject === 'Mathematics' ? '∫' : '∑'}
                  </div>

                  <div className="flex items-center justify-between text-xs z-10">
                    <span className="font-extrabold uppercase tracking-wider text-[10px] bg-black/20 backdrop-blur-xs px-2 py-0.5 rounded">
                      {doc.category}
                    </span>
                    <span className="font-mono text-[10px] bg-black/20 backdrop-blur-xs px-2 py-0.5 rounded">
                      v{doc.currentVersion}
                    </span>
                  </div>

                  <div className="z-10">
                    <span className="text-[11px] font-medium text-white/80 block">
                      {doc.subject} · {doc.class === 'Combined' ? 'Class 11 & 12' : `Class ${doc.class}`}
                    </span>
                    <h3 className="text-base font-black tracking-tight text-white line-clamp-2 leading-snug">
                      {doc.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {doc.description}
                  </p>

                  {/* Metadata Specs Strip */}
                  <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                    <div>
                      <span className="block text-[10px] text-slate-400">Pages</span>
                      <strong className="text-slate-800 dark:text-slate-200 font-mono">{doc.pageCount} pgs</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400">File Size</span>
                      <strong className="text-slate-800 dark:text-slate-200 font-mono">{sizeInMb} MB</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400">Downloads</span>
                      <strong className="text-slate-800 dark:text-slate-200 font-mono">{doc.downloadsCount.toLocaleString()}</strong>
                    </div>
                  </div>

                  {/* Exam Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500">
                    {doc.examTags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-medium text-slate-700 dark:text-slate-300"
                      >
                        {t}
                      </span>
                    ))}
                    <span className="ml-auto text-[10px] text-slate-400">
                      Updated {doc.lastUpdated}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleBookmarkPdf(doc.id)}
                        className={`p-2 rounded-lg border transition-colors ${
                          isBookmarked
                            ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-500'
                            : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark PDF'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                      </button>

                      <button
                        onClick={() => handleShare(doc)}
                        className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                        title="Copy shareable link"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveReaderDoc(doc)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors flex items-center gap-1.5"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-sky-500" />
                        <span>Read</span>
                      </button>

                      <button
                        onClick={() => handleDownload(doc)}
                        className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Advanced PDF Reader Modal */}
      {activeReaderDoc && (
        <AdvancedPdfReader
          document={activeReaderDoc}
          onClose={() => setActiveReaderDoc(null)}
          onNavigateDoc={(dir) => {
            const idx = filteredDocs.findIndex((d) => d.id === activeReaderDoc.id);
            if (dir === 'prev' && idx > 0) setActiveReaderDoc(filteredDocs[idx - 1]);
            else if (dir === 'next' && idx < filteredDocs.length - 1) setActiveReaderDoc(filteredDocs[idx + 1]);
          }}
          hasPrevDoc={filteredDocs.findIndex((d) => d.id === activeReaderDoc.id) > 0}
          hasNextDoc={filteredDocs.findIndex((d) => d.id === activeReaderDoc.id) < filteredDocs.length - 1}
        />
      )}

    </div>
  );
};
