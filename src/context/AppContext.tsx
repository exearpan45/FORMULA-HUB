import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { ExamType, Subject, UserProgress } from '../types/formula';

interface AppContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  activeExam: ExamType;
  setActiveExam: (exam: ExamType) => void;
  selectedSubject: Subject | 'All';
  setSelectedSubject: (subj: Subject | 'All') => void;
  selectedChapter: string | null;
  setSelectedChapter: (chapter: string | null) => void;
  activeTab: 'home' | 'browse' | 'revision' | 'tools' | 'bookmarks' | 'pdf-library' | 'admin';
  setActiveTab: (tab: 'home' | 'browse' | 'revision' | 'tools' | 'bookmarks' | 'pdf-library' | 'admin') => void;
  activeTool: 'constants' | 'converter' | 'calculator' | 'identities' | 'quiz' | null;
  setActiveTool: (tool: 'constants' | 'converter' | 'calculator' | 'identities' | 'quiz' | null) => void;
  
  // Bookmarks & Progress
  bookmarkedIds: string[];
  toggleBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  revisedIds: string[];
  toggleRevised: (id: string) => void;
  isRevised: (id: string) => boolean;
  formulaNotes: Record<string, string>;
  saveFormulaNote: (id: string, note: string) => void;
  
  // Recents & Search
  recentFormulaIds: string[];
  addRecentFormula: (id: string) => void;
  searchHistory: string[];
  addSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  
  // Bed study mode
  isBedStudyOpen: boolean;
  bedStudyFormulaId: string | null;
  openBedStudy: (initialFormulaId?: string) => void;
  closeBedStudy: () => void;
  bedStudySettings: UserProgress['bedStudySettings'];
  updateBedStudySettings: (settings: Partial<UserProgress['bedStudySettings']>) => void;
  
  // Global search modal
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  
  // Backup / Restore
  exportUserData: () => void;
  importUserData: (jsonString: string) => boolean;
}

const STORAGE_KEY = 'formula_hub_user_progress_v1';

const defaultSettings: UserProgress['bedStudySettings'] = {
  fontSize: 'large',
  width: 'standard',
  theme: 'navy',
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state from LocalStorage
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.theme === 'light' || parsed.theme === 'dark') return parsed.theme;
      }
    } catch {
      // fallback
    }
    return 'dark';
  });

  const [activeExam, setActiveExam] = useState<ExamType>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.activeExam) return parsed.activeExam;
      }
    } catch {
      // fallback
    }
    return 'JEE Main';
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.bookmarkedIds)) return parsed.bookmarkedIds;
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [revisedIds, setRevisedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.revisedIds)) return parsed.revisedIds;
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [formulaNotes, setFormulaNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.formulaNotes && typeof parsed.formulaNotes === 'object') return parsed.formulaNotes;
      }
    } catch {
      // fallback
    }
    return {};
  });

  const [recentFormulaIds, setRecentFormulaIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.recentFormulaIds)) return parsed.recentFormulaIds;
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.searchHistory)) return parsed.searchHistory;
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [bedStudySettings, setBedStudySettings] = useState<UserProgress['bedStudySettings']>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.bedStudySettings) return { ...defaultSettings, ...parsed.bedStudySettings };
      }
    } catch {
      // fallback
    }
    return defaultSettings;
  });

  const [selectedSubject, setSelectedSubject] = useState<Subject | 'All'>('All');
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'home' | 'browse' | 'revision' | 'tools' | 'bookmarks' | 'pdf-library' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      if (tabParam === 'pdf-library' || tabParam === 'admin' || tabParam === 'browse' || tabParam === 'tools' || tabParam === 'revision') {
        return tabParam as any;
      }
      if (window.location.pathname.includes('/admin')) return 'admin';
      if (window.location.pathname.includes('/pdf-library')) return 'pdf-library';
    }
    return 'home';
  });
  const [activeTool, setActiveTool] = useState<'constants' | 'converter' | 'calculator' | 'identities' | 'quiz' | null>(null);

  // Bed study modal
  const [isBedStudyOpen, setIsBedStudyOpen] = useState(false);
  const [bedStudyFormulaId, setBedStudyFormulaId] = useState<string | null>(null);

  // Search modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Synchronize Theme with <html> element class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [theme]);

  // Save state to LocalStorage
  useEffect(() => {
    try {
      const data: UserProgress = {
        theme,
        activeExam,
        bookmarkedIds,
        revisedIds,
        formulaNotes,
        recentFormulaIds: recentFormulaIds.slice(0, 20),
        searchHistory: searchHistory.slice(0, 15),
        bedStudySettings,
        quizHistory: [],
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage quota or private browsing restriction
    }
  }, [theme, activeExam, bookmarkedIds, revisedIds, formulaNotes, recentFormulaIds, searchHistory, bedStudySettings]);

  // Global hotkeys (Cmd+K / Ctrl+K for search, B for bed mode)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [id, ...prev]
    );
  };

  const isBookmarked = (id: string) => bookmarkedIds.includes(id);

  const toggleRevised = (id: string) => {
    setRevisedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [id, ...prev]
    );
  };

  const isRevised = (id: string) => revisedIds.includes(id);

  const saveFormulaNote = (id: string, note: string) => {
    setFormulaNotes((prev) => {
      const updated = { ...prev };
      if (!note.trim()) {
        delete updated[id];
      } else {
        updated[id] = note;
      }
      return updated;
    });
  };

  const addRecentFormula = (id: string) => {
    setRecentFormulaIds((prev) => {
      const filtered = prev.filter((item) => item !== id);
      return [id, ...filtered].slice(0, 20);
    });
  };

  const addSearchHistory = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setSearchHistory((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase());
      return [trimmed, ...filtered].slice(0, 15);
    });
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  const openBedStudy = (initialFormulaId?: string) => {
    if (initialFormulaId) {
      setBedStudyFormulaId(initialFormulaId);
    }
    setIsBedStudyOpen(true);
  };

  const closeBedStudy = () => {
    setIsBedStudyOpen(false);
  };

  const updateBedStudySettings = (settings: Partial<UserProgress['bedStudySettings']>) => {
    setBedStudySettings((prev) => ({ ...prev, ...settings }));
  };

  const exportUserData = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      version: '1.0',
      activeExam,
      bookmarkedIds,
      revisedIds,
      formulaNotes,
      searchHistory,
      bedStudySettings,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `formula-hub-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importUserData = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed.bookmarkedIds)) setBookmarkedIds(parsed.bookmarkedIds);
      if (Array.isArray(parsed.revisedIds)) setRevisedIds(parsed.revisedIds);
      if (parsed.formulaNotes && typeof parsed.formulaNotes === 'object') setFormulaNotes(parsed.formulaNotes);
      if (parsed.activeExam) setActiveExam(parsed.activeExam);
      if (parsed.bedStudySettings) setBedStudySettings({ ...defaultSettings, ...parsed.bedStudySettings });
      return true;
    } catch {
      return false;
    }
  };

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      activeExam,
      setActiveExam,
      selectedSubject,
      setSelectedSubject,
      selectedChapter,
      setSelectedChapter,
      activeTab,
      setActiveTab,
      activeTool,
      setActiveTool,
      bookmarkedIds,
      toggleBookmark,
      isBookmarked,
      revisedIds,
      toggleRevised,
      isRevised,
      formulaNotes,
      saveFormulaNote,
      recentFormulaIds,
      addRecentFormula,
      searchHistory,
      addSearchHistory,
      clearSearchHistory,
      isBedStudyOpen,
      bedStudyFormulaId,
      openBedStudy,
      closeBedStudy,
      bedStudySettings,
      updateBedStudySettings,
      isSearchOpen,
      setIsSearchOpen,
      exportUserData,
      importUserData,
    }),
    [
      theme,
      activeExam,
      selectedSubject,
      selectedChapter,
      activeTab,
      activeTool,
      bookmarkedIds,
      revisedIds,
      formulaNotes,
      recentFormulaIds,
      searchHistory,
      isBedStudyOpen,
      bedStudyFormulaId,
      bedStudySettings,
      isSearchOpen,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
