import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Lock,
  Upload,
  RefreshCw,
  Trash2,
  Eye,
  History,
  HardDrive,
  FileText,
  Search,
  CheckCircle2,
  AlertCircle,
  X,
  LogOut,
  Sparkles,
  ArrowRight,
  Database,
  Calendar,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { PdfDocument, StorageStats, AdminActivityLog } from '../../types/pdf';
import { INITIAL_PDF_CATALOG } from '../../data/pdfCatalog';
import { Subject, ExamType } from '../../types/formula';
import { AdvancedPdfReader } from '../pdf/AdvancedPdfReader';

export const AdminPanel: React.FC = () => {
  // Session State
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('formula_hub_admin_token'));
  const [adminUser, setAdminUser] = useState<string | null>(() => sessionStorage.getItem('formula_hub_admin_user'));

  // Login Form State
  const [usernameInput, setUsernameInput] = useState('admin');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard Data State
  const [documents, setDocuments] = useState<PdfDocument[]>(INITIAL_PDF_CATALOG);
  const [stats, setStats] = useState<StorageStats | null>(null);
  const [activityLogs, setActivityLogs] = useState<AdminActivityLog[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'storage' | 'logs'>('overview');

  // Search & Filter in Admin
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<string>('All');

  // Modals & Drawers
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [replaceTargetDoc, setReplaceTargetDoc] = useState<PdfDocument | null>(null);
  const [versionHistoryDoc, setVersionHistoryDoc] = useState<PdfDocument | null>(null);
  const [previewDoc, setPreviewDoc] = useState<PdfDocument | null>(null);
  const [deleteConfirmDoc, setDeleteConfirmDoc] = useState<PdfDocument | null>(null);

  // Upload / Replace Form State
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formSubject, setFormSubject] = useState<Subject>('Physics');
  const [formClass, setFormClass] = useState<'11' | '12' | 'Combined'>('11');
  const [formChapter, setFormChapter] = useState('');
  const [formCategory, setFormCategory] = useState<'Chapter' | 'Class Collection' | 'Subject Master'>('Chapter');
  const [formVersion, setFormVersion] = useState('1.0');
  const [formNotes, setFormNotes] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Fetch Dashboard & Documents
  const fetchAdminData = async () => {
    if (!token) return;
    try {
      const dashRes = await fetch('/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (dashRes.ok) {
        const data = await dashRes.json();
        setStats(data.stats);
        setActivityLogs(data.recentActivity || []);
      }

      const pdfRes = await fetch('/api/admin/pdfs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (pdfRes.ok) {
        const data = await pdfRes.json();
        setDocuments(data.documents);
      }
    } catch {
      // Backend fallback
    }
  };

  useEffect(() => {
    if (token) {
      fetchAdminData();
    }
  }, [token]);

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput }),
      });

      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || 'Login failed');
      } else {
        setToken(data.token);
        setAdminUser(data.user.username);
        sessionStorage.setItem('formula_hub_admin_token', data.token);
        sessionStorage.setItem('formula_hub_admin_user', data.user.username);
      }
    } catch {
      setLoginError('Unable to connect to authentication server');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      if (token) {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch {
      // ignore
    }
    setToken(null);
    setAdminUser(null);
    sessionStorage.removeItem('formula_hub_admin_token');
    sessionStorage.removeItem('formula_hub_admin_user');
  };

  // Upload the real selected PDF and report actual browser upload progress.
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);
    if (!selectedFile) { setUploadError('Choose a PDF file before uploading.'); return; }
    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.toLowerCase().endsWith('.pdf')) {
      setUploadError('Only PDF documents are accepted.'); return;
    }
    if (selectedFile.size < 8 || selectedFile.size > 20 * 1024 * 1024) {
      setUploadError('PDF must be between 8 bytes and 20 MB.'); return;
    }
    setUploadProgress(0);
    const isReplacing = !!replaceTargetDoc;
    try {
      const header = new TextDecoder().decode(await selectedFile.slice(0, 5).arrayBuffer());
      if (header !== '%PDF-') throw new Error('The selected file does not contain a valid PDF header.');
      const fileData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => typeof reader.result === 'string' ? resolve(reader.result) : reject(new Error('Unable to read selected PDF.'));
        reader.onerror = () => reject(new Error('Unable to read selected PDF.'));
        reader.readAsDataURL(selectedFile);
      });
      const endpoint = isReplacing ? '/api/admin/pdfs/' + replaceTargetDoc.id + '/replace' : '/api/admin/pdfs/upload';
      const payload = isReplacing ? {
        versionNumber: formVersion, updateNotes: formNotes, fileSize: selectedFile.size, pageCount: 0, fileData
      } : {
        title: formTitle, description: formDescription, subject: formSubject, class: formClass,
        chapter: formChapter, category: formCategory, versionNumber: formVersion, updateNotes: formNotes,
        fileSize: selectedFile.size, pageCount: 0, fileData
      };
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(isReplacing ? 'PUT' : 'POST', endpoint);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) setUploadProgress(Math.min(99, Math.round((event.loaded / event.total) * 100)));
        };
        xhr.onerror = () => reject(new Error('Network error while uploading the PDF.'));
        xhr.onload = () => {
          let result: any = {};
          try { result = JSON.parse(xhr.responseText || '{}'); } catch { reject(new Error('Server returned an unreadable response.')); return; }
          if (xhr.status < 200 || xhr.status >= 300) { reject(new Error(result.error || 'PDF upload failed (' + xhr.status + ').')); return; }
          resolve();
        };
        xhr.send(JSON.stringify(payload));
      });
      setUploadProgress(100);
      await fetchAdminData();
      setUploadModalOpen(false);
      setReplaceTargetDoc(null);
      setSelectedFile(null);
      setUploadProgress(null);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'PDF upload failed.');
      setUploadProgress(null);
    }
  };
  // Toggle Publish / Unpublish
  const handleTogglePublish = async (doc: PdfDocument) => {
    const action = doc.status === 'Published' ? 'unpublish' : 'publish';
    try {
      await fetch(`/api/admin/pdfs/${doc.id}/${action}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAdminData();
    } catch {
      // Fallback update in state
      setDocuments((prev) =>
        prev.map((d) => (d.id === doc.id ? { ...d, status: doc.status === 'Published' ? 'Draft' : 'Published' } : d))
      );
    }
  };

  // Delete Document
  const handleDeleteConfirm = async () => {
    if (!deleteConfirmDoc) return;
    try {
      await fetch(`/api/admin/pdfs/${deleteConfirmDoc.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeleteConfirmDoc(null);
      fetchAdminData();
    } catch {
      setDeleteConfirmDoc(null);
    }
  };

  // Restore Older Version
  const handleRestoreVersion = async (docId: string, versionNumber: string) => {
    try {
      await fetch(`/api/admin/pdfs/${docId}/restore`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ versionNumber }),
      });
      setVersionHistoryDoc(null);
      fetchAdminData();
    } catch {
      // ignore
    }
  };

  // If not logged in, display secure admin login screen
  if (!token) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 mx-auto flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Formula Hub Admin Console
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Protected server-side session authentication for PDF publishing and storage control.
          </p>
        </div>

        {loginError && (
          <div className="p-3 mb-4 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{loginError}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Admin Username
            </label>
            <input
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-mono"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="••••••••••••"
              className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-mono"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition-colors disabled:opacity-50"
          >
            {loginLoading ? 'Authenticating...' : 'Sign in to Admin Dashboard'}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 text-center">
          Use the administrator credentials configured in the server environment. No default password is provided.
        </div>
      </div>
    );
  }

  // Filtered documents for admin table
  const filteredDocs = documents.filter((doc) => {
    if (subjectFilter !== 'All' && doc.subject !== subjectFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return doc.title.toLowerCase().includes(q) || doc.chapter?.toLowerCase().includes(q);
    }
    return true;
  });

  const totalUsedMb = (
    documents.reduce((acc, d) => acc + (d.fileSize || 0), 0) /
    1024 /
    1024
  ).toFixed(1);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Admin Top Banner */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Authenticated Session ({adminUser})</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-1">
            Formula Hub Admin Management Console
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage educational PDF publications, upload replacements, audit version history, and monitor R2/D1 storage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setReplaceTargetDoc(null);
              setFormTitle('');
              setFormChapter('');
              setFormDescription('');
              setFormVersion('1.0');
              setFormNotes('Initial publication');
              setUploadModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-colors shadow-xs"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload New PDF</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-bold overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-sky-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Overview & Storage
        </button>
        <button
          onClick={() => setActiveTab('documents')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
            activeTab === 'documents'
              ? 'bg-sky-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          PDF Repository ({documents.length})
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
            activeTab === 'logs'
              ? 'bg-sky-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Activity Logs
        </button>
      </div>

      {/* TAB 1: OVERVIEW & STORAGE */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Storage & KPIs Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Stored Volume
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono mt-1">
                {totalUsedMb} MB
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-sky-500 h-full rounded-full transition-all"
                  style={{ width: `${Math.min((parseFloat(totalUsedMb) / 10240) * 100, 100)}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Free Tier: 10 GB limit (Cloudflare R2 standard)
              </span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Published Formula Sheets
              </span>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                {documents.filter((d) => d.status === 'Published').length}
              </div>
              <span className="text-[10px] text-slate-400 mt-2 block">
                Available to students for download
              </span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Student Downloads
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100 font-mono mt-1">
                {documents.reduce((acc, d) => acc + (d.downloadsCount || 0), 0).toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-400 mt-2 block">
                Across all chapters and master bundles
              </span>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Active Version Revisions
              </span>
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-mono mt-1">
                {documents.reduce((acc, d) => acc + (d.versions?.length || 1), 0)}
              </div>
              <span className="text-[10px] text-slate-400 mt-2 block">
                Full changelog archived in version control
              </span>
            </div>

          </div>

          {/* Quick Actions Panel */}
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              Recent Administrator Publishing Activity
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {activityLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-sky-500">
                      {log.action}
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {log.documentTitle || log.details}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(log.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: PDF REPOSITORY & REPLACEMENT */}
      {activeTab === 'documents' && (
        <div className="space-y-4">
          
          {/* Table Search & Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search repository..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              {(['All', 'Physics', 'Chemistry', 'Mathematics', 'Combined'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSubjectFilter(s)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
                    subjectFilter === s
                      ? 'bg-sky-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-950/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Document Title</th>
                    <th className="py-3 px-4">Subject & Class</th>
                    <th className="py-3 px-3">Version</th>
                    <th className="py-3 px-3">Size / Pgs</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Updated</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">
                        <div>{doc.title}</div>
                        <span className="text-[10px] font-normal text-slate-400">{doc.category}</span>
                      </td>

                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                        {doc.subject} · {doc.class === 'Combined' ? '11 & 12' : `Cl ${doc.class}`}
                      </td>

                      <td className="py-3 px-3 font-mono font-bold text-sky-600 dark:text-sky-400">
                        v{doc.currentVersion}
                      </td>

                      <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-400">
                        {(doc.fileSize / 1024 / 1024).toFixed(1)}MB · {doc.pageCount}p
                      </td>

                      <td className="py-3 px-3">
                        <button
                          onClick={() => handleTogglePublish(doc)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                            doc.status === 'Published'
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                          }`}
                        >
                          {doc.status}
                        </button>
                      </td>

                      <td className="py-3 px-3 font-mono text-slate-400 text-[11px]">
                        {doc.lastUpdated}
                      </td>

                      <td className="py-3 px-4 text-right space-x-1">
                        {/* Replace Document Button */}
                        <button
                          onClick={() => {
                            setReplaceTargetDoc(doc);
                            const parts = doc.currentVersion.split('.');
                            const nextVer = `${parts[0]}.${(parseInt(parts[1] || '0') + 1)}`;
                            setFormVersion(nextVer);
                            setFormNotes('Updated formula corrections & layout');
                            setUploadModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-sky-500 hover:border-sky-500 transition-colors"
                          title="Replace PDF Sheet"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>

                        {/* Version History Button */}
                        <button
                          onClick={() => setVersionHistoryDoc(doc)}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-500 hover:border-indigo-500 transition-colors"
                          title="Version History & Restore"
                        >
                          <History className="w-3.5 h-3.5" />
                        </button>

                        {/* Preview */}
                        <button
                          onClick={() => setPreviewDoc(doc)}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:border-emerald-500 transition-colors"
                          title="Preview Document"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setDeleteConfirmDoc(doc)}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:border-rose-500 transition-colors"
                          title="Delete Document"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: ACTIVITY LOGS */}
      {activeTab === 'logs' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Immutable Audit Trail & Administrative Logs
          </h3>
          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {activityLogs.map((log) => (
              <div key={log.id} className="py-3 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-sky-500">
                      {log.action}
                    </span>
                    <strong className="text-slate-900 dark:text-slate-100">
                      {log.documentTitle || log.performedBy}
                    </strong>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">{log.details}</p>
                </div>
                <div className="text-right text-[10px] text-slate-400 font-mono shrink-0">
                  <div>{new Date(log.timestamp).toLocaleDateString()}</div>
                  <div>{new Date(log.timestamp).toLocaleTimeString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* UPLOAD & REPLACE MODAL */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {replaceTargetDoc
                  ? `Replace Document: ${replaceTargetDoc.title}`
                  : 'Upload New Chapter PDF Sheet'}
              </h3>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {uploadError && (
              <div className="p-3 mb-4 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-700 dark:text-rose-300 text-xs">
                {uploadError}
              </div>
            )}

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              {!replaceTargetDoc && (
                <>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Document Title
                    </label>
                    <input
                      type="text"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g. Motion in a Plane"
                      className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Subject
                      </label>
                      <select
                        value={formSubject}
                        onChange={(e) => setFormSubject(e.target.value as any)}
                        className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                      >
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="Mathematics">Mathematics</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Class
                      </label>
                      <select
                        value={formClass}
                        onChange={(e) => setFormClass(e.target.value as any)}
                        className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                      >
                        <option value="11">Class 11</option>
                        <option value="12">Class 12</option>
                        <option value="Combined">Combined (11 & 12)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Chapter Name
                    </label>
                    <input
                      type="text"
                      value={formChapter}
                      onChange={(e) => setFormChapter(e.target.value)}
                      placeholder="e.g. Motion in a Plane"
                      className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                    />
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Version Number
                  </label>
                  <input
                    type="text"
                    value={formVersion}
                    onChange={(e) => setFormVersion(e.target.value)}
                    placeholder="e.g. 1.1 or 2.0"
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Update / Changelog Notes
                  </label>
                  <input
                    type="text"
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    placeholder="e.g. Corrected sign convention..."
                    className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100"
                    required
                  />
                </div>
              </div>

              {/* File Dropzone */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Upload PDF Document (.pdf)
                </label>
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-5 text-center bg-slate-50 dark:bg-slate-950 cursor-pointer hover:bg-slate-100/50">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    className="w-full"
                  />
                  <p className="text-[11px] text-slate-400 mt-2">
                    Select a real PDF file. The viewer will open the exact uploaded version; generated previews are not substituted for uploaded documents.
                  </p>
                </div>
              </div>

              {/* Upload Progress Bar */}
              {uploadProgress !== null && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Uploading & Validating...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-sky-500 h-full rounded-full transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadProgress !== null}
                  className="px-5 py-2 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold transition-colors disabled:opacity-50"
                >
                  {replaceTargetDoc ? 'Publish Replacement' : 'Upload Document'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* VERSION HISTORY DRAWER */}
      {versionHistoryDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Version History & Rollback
                </h3>
                <span className="text-xs text-slate-400">{versionHistoryDoc.title}</span>
              </div>
              <button
                onClick={() => setVersionHistoryDoc(null)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1 text-xs">
              {versionHistoryDoc.versions?.map((ver, idx) => {
                const isCurrent = ver.versionNumber === versionHistoryDoc.currentVersion;
                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                      isCurrent
                        ? 'bg-sky-50/50 dark:bg-sky-950/30 border-sky-300 dark:border-sky-800'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sky-600 dark:text-sky-400">
                          v{ver.versionNumber}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-sky-600 text-white">
                            Current Active
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 mt-1">{ver.updateNotes}</p>
                      <div className="text-[10px] text-slate-400 font-mono mt-1">
                        By {ver.uploadedBy} · {ver.uploadedAt} · {(ver.fileSize / 1024 / 1024).toFixed(1)} MB
                      </div>
                    </div>

                    {!isCurrent && (
                      <button
                        onClick={() => handleRestoreVersion(versionHistoryDoc.id, ver.versionNumber)}
                        className="px-2.5 py-1 text-xs font-semibold rounded bg-slate-200 dark:bg-slate-800 hover:bg-sky-600 hover:text-white transition-colors shrink-0"
                      >
                        Restore v{ver.versionNumber}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {deleteConfirmDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-500 mx-auto flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Delete PDF Document?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Are you sure you want to remove <strong>{deleteConfirmDoc.title}</strong>? This action will remove it from the public directory.
              </p>
            </div>
            <div className="flex justify-center gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmDoc(null)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF PREVIEW MODAL */}
      {previewDoc && (
        <AdvancedPdfReader
          document={previewDoc}
          onClose={() => setPreviewDoc(null)}
        />
      )}

    </div>
  );
};
