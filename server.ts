import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs';
import { INITIAL_PDF_CATALOG } from './src/data/pdfCatalog';
import { PdfDocument, AdminActivityLog, StorageStats } from './src/types/pdf';

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// In-memory data store for server lifecycle
let pdfCatalog: PdfDocument[] = JSON.parse(JSON.stringify(INITIAL_PDF_CATALOG));

let activityLogs: AdminActivityLog[] = [
  {
    id: 'act-1',
    action: 'PUBLISH',
    documentId: 'pdf-jee-physics-master',
    documentTitle: 'Complete JEE Physics Formula Compendium',
    details: 'Published official v2.0 with enhanced rolling dynamics and LC circuit standards.',
    performedBy: 'admin',
    timestamp: '2026-10-15T14:30:00Z',
  },
  {
    id: 'act-2',
    action: 'REPLACE',
    documentId: 'pdf-math-ch-integrals',
    documentTitle: 'Integrals & Definite Integration',
    details: 'Upgraded to v1.1 adding Leibniz rule and King property variations.',
    performedBy: 'admin',
    timestamp: '2026-09-28T09:15:00Z',
  },
  {
    id: 'act-3',
    action: 'PUBLISH',
    documentId: 'pdf-constants-master',
    documentTitle: 'Fundamental Physical Constants (CODATA 2026)',
    details: 'Verified against authoritative CODATA values.',
    performedBy: 'admin',
    timestamp: '2026-08-14T11:00:00Z',
  },
];

// Secure Admin Authentication
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
// Salt and hash default password: "FormulaHub2026!"
const ADMIN_SALT = 'formula_hub_secure_salt_2026';
function hashPassword(password: string): string {
  return crypto.pbkdf2Sync(password, ADMIN_SALT, 10000, 64, 'sha512').toString('hex');
}
const ADMIN_PASSWORD_HASH = hashPassword(process.env.ADMIN_PASSWORD || 'FormulaHub2026!');

// Active sessions: token -> { username, role, expiresAt }
const activeSessions = new Map<string, { username: string; role: 'superadmin'; expiresAt: number }>();

// Auth Middleware
function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  const session = activeSessions.get(token);

  if (!session || session.expiresAt < Date.now()) {
    if (session) activeSessions.delete(token);
    return res.status(401).json({ error: 'Unauthorized: Session expired or invalid' });
  }

  (req as any).user = session;
  next();
}

// --- ADMIN AUTH ROUTES ---
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const inputHash = hashPassword(password);
  if (username !== ADMIN_USERNAME || inputHash !== ADMIN_PASSWORD_HASH) {
    return res.status(401).json({ error: 'Invalid administrator credentials' });
  }

  // Create 24h session token
  const token = crypto.randomBytes(32).toString('hex');
  const session = {
    username,
    role: 'superadmin' as const,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000,
  };
  activeSessions.set(token, session);

  activityLogs.unshift({
    id: `act-${Date.now()}`,
    action: 'LOGIN',
    details: 'Administrator successfully logged in',
    performedBy: username,
    timestamp: new Date().toISOString(),
  });

  return res.json({
    token,
    user: {
      username: session.username,
      role: session.role,
    },
    expiresIn: 86400,
  });
});

app.post('/api/admin/logout', requireAdminAuth, (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token) activeSessions.delete(token);
  return res.json({ message: 'Successfully logged out' });
});

app.get('/api/admin/me', requireAdminAuth, (req: Request, res: Response) => {
  const user = (req as any).user;
  return res.json({ user });
});

// --- ADMIN DASHBOARD & STORAGE ---
app.get('/api/admin/dashboard', requireAdminAuth, (req: Request, res: Response) => {
  const totalBytes = pdfCatalog.reduce((sum, doc) => sum + (doc.fileSize || 0), 0);
  const publishedDocs = pdfCatalog.filter((d) => d.status === 'Published');
  const archivedDocs = pdfCatalog.filter((d) => d.status === 'Archived');

  const stats: StorageStats = {
    usedBytes: totalBytes,
    maxFreeTierBytes: 10 * 1024 * 1024 * 1024, // 10 GB (Cloudflare R2 free tier)
    totalDocuments: pdfCatalog.length,
    publishedCount: publishedDocs.length,
    archivedCount: archivedDocs.length,
    subjectBreakdown: {
      Physics: pdfCatalog.filter((d) => d.subject === 'Physics').length,
      Chemistry: pdfCatalog.filter((d) => d.subject === 'Chemistry').length,
      Mathematics: pdfCatalog.filter((d) => d.subject === 'Mathematics').length,
      Combined: pdfCatalog.filter((d) => d.subject === 'Combined').length,
    },
  };

  return res.json({
    stats,
    recentActivity: activityLogs.slice(0, 15),
    topDownloads: [...pdfCatalog].sort((a, b) => b.downloadsCount - a.downloadsCount).slice(0, 5),
  });
});

// --- ADMIN PDF MANAGEMENT ---
app.get('/api/admin/pdfs', requireAdminAuth, (req: Request, res: Response) => {
  return res.json({ documents: pdfCatalog });
});

// Upload New PDF
app.post('/api/admin/pdfs/upload', requireAdminAuth, (req: Request, res: Response) => {
  const {
    title,
    description,
    subject,
    class: classNum,
    chapter,
    category,
    examTags,
    versionNumber = '1.0',
    updateNotes = 'Initial publication',
    fileSize = 1024000,
    pageCount = 8,
    fileData,
  } = req.body;

  if (!title || !subject || !classNum || !category) {
    return res.status(400).json({ error: 'Missing required document fields' });
  }

  // Validate PDF data if provided (must start with %PDF-)
  if (fileData && typeof fileData === 'string') {
    const isBase64Pdf = fileData.startsWith('data:application/pdf') || fileData.startsWith('%PDF-');
    if (!isBase64Pdf && fileData.length < 50) {
      return res.status(400).json({ error: 'Invalid PDF format. Expected valid PDF header %PDF-' });
    }
  }

  const user = (req as any).user;
  const newId = `pdf-${subject.toLowerCase()}-${Date.now().toString(36)}`;

  const newDoc: PdfDocument = {
    id: newId,
    title,
    description: description || `Verified formula reference for ${title}`,
    subject,
    class: classNum,
    chapter: chapter || title,
    category,
    examTags: Array.isArray(examTags) && examTags.length > 0 ? examTags : ['JEE Main', 'JEE Advanced', 'NEET'],
    currentVersion: versionNumber,
    status: 'Published',
    fileSize: Number(fileSize),
    pageCount: Number(pageCount),
    lastUpdated: new Date().toISOString().slice(0, 10),
    downloadsCount: 0,
    coverAccentColor: subject === 'Physics' ? '#0284c7' : subject === 'Chemistry' ? '#059669' : subject === 'Mathematics' ? '#ea580c' : '#d97706',
    verifiedBy: `${user.username} (Academic Panel)`,
    formulaCount: 10,
    versions: [
      {
        versionNumber,
        uploadedAt: new Date().toISOString().slice(0, 10),
        fileSize: Number(fileSize),
        pageCount: Number(pageCount),
        uploadedBy: user.username,
        updateNotes,
        fileData,
      },
    ],
  };

  pdfCatalog.unshift(newDoc);

  activityLogs.unshift({
    id: `act-${Date.now()}`,
    action: 'UPLOAD',
    documentId: newId,
    documentTitle: title,
    details: `Uploaded new ${category} PDF (v${versionNumber})`,
    performedBy: user.username,
    timestamp: new Date().toISOString(),
  });

  return res.status(201).json({ message: 'PDF document uploaded successfully', document: newDoc });
});

// Replace Existing PDF (Creates new version, preserves history)
app.put('/api/admin/pdfs/:id/replace', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    versionNumber,
    updateNotes,
    fileSize,
    pageCount,
    fileData,
  } = req.body;

  const doc = pdfCatalog.find((d) => d.id === id);
  if (!doc) {
    return res.status(404).json({ error: 'Document not found' });
  }

  if (!versionNumber) {
    return res.status(400).json({ error: 'New version number is required for replacement' });
  }

  // Validate PDF format
  if (fileData && typeof fileData === 'string') {
    const isBase64Pdf = fileData.startsWith('data:application/pdf') || fileData.startsWith('%PDF-');
    if (!isBase64Pdf && fileData.length < 50) {
      return res.status(400).json({ error: 'Invalid PDF format. Expected valid PDF header %PDF-' });
    }
  }

  const user = (req as any).user;
  const newSize = Number(fileSize) || doc.fileSize;
  const newPages = Number(pageCount) || doc.pageCount;
  const updateDate = new Date().toISOString().slice(0, 10);

  // Archive new version into version history
  const newVersion = {
    versionNumber,
    uploadedAt: updateDate,
    fileSize: newSize,
    pageCount: newPages,
    uploadedBy: user.username,
    updateNotes: updateNotes || `Replaced document with v${versionNumber}`,
    fileData,
  };

  doc.versions.unshift(newVersion);
  doc.currentVersion = versionNumber;
  doc.fileSize = newSize;
  doc.pageCount = newPages;
  doc.lastUpdated = updateDate;
  doc.status = 'Published';

  activityLogs.unshift({
    id: `act-${Date.now()}`,
    action: 'REPLACE',
    documentId: doc.id,
    documentTitle: doc.title,
    details: `Replaced document with new v${versionNumber}: ${newVersion.updateNotes}`,
    performedBy: user.username,
    timestamp: new Date().toISOString(),
  });

  return res.json({ message: 'Document replaced successfully with new version', document: doc });
});

// Edit Metadata
app.patch('/api/admin/pdfs/:id', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, examTags, status } = req.body;

  const doc = pdfCatalog.find((d) => d.id === id);
  if (!doc) {
    return res.status(404).json({ error: 'Document not found' });
  }

  if (title) doc.title = title;
  if (description) doc.description = description;
  if (Array.isArray(examTags)) doc.examTags = examTags;
  if (status && ['Published', 'Draft', 'Archived'].includes(status)) doc.status = status;

  return res.json({ message: 'Document metadata updated', document: doc });
});

// Publish
app.post('/api/admin/pdfs/:id/publish', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const doc = pdfCatalog.find((d) => d.id === id);
  if (!doc) return res.status(404).json({ error: 'Document not found' });

  doc.status = 'Published';
  const user = (req as any).user;

  activityLogs.unshift({
    id: `act-${Date.now()}`,
    action: 'PUBLISH',
    documentId: doc.id,
    documentTitle: doc.title,
    details: `Published document ${doc.title}`,
    performedBy: user.username,
    timestamp: new Date().toISOString(),
  });

  return res.json({ message: 'Document published successfully', document: doc });
});

// Unpublish (Draft)
app.post('/api/admin/pdfs/:id/unpublish', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const doc = pdfCatalog.find((d) => d.id === id);
  if (!doc) return res.status(404).json({ error: 'Document not found' });

  doc.status = 'Draft';
  const user = (req as any).user;

  activityLogs.unshift({
    id: `act-${Date.now()}`,
    action: 'UNPUBLISH',
    documentId: doc.id,
    documentTitle: doc.title,
    details: `Unpublished document ${doc.title} (moved to Draft)`,
    performedBy: user.username,
    timestamp: new Date().toISOString(),
  });

  return res.json({ message: 'Document unpublished', document: doc });
});

// Restore Previous Version
app.post('/api/admin/pdfs/:id/restore', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const { versionNumber } = req.body;

  const doc = pdfCatalog.find((d) => d.id === id);
  if (!doc) return res.status(404).json({ error: 'Document not found' });

  const targetVersion = doc.versions.find((v) => v.versionNumber === versionNumber);
  if (!targetVersion) {
    return res.status(404).json({ error: `Version ${versionNumber} not found in history` });
  }

  doc.currentVersion = targetVersion.versionNumber;
  doc.fileSize = targetVersion.fileSize;
  doc.pageCount = targetVersion.pageCount;
  doc.lastUpdated = new Date().toISOString().slice(0, 10);

  const user = (req as any).user;
  activityLogs.unshift({
    id: `act-${Date.now()}`,
    action: 'RESTORE',
    documentId: doc.id,
    documentTitle: doc.title,
    details: `Restored older version v${versionNumber} as active version`,
    performedBy: user.username,
    timestamp: new Date().toISOString(),
  });

  return res.json({ message: `Successfully restored version ${versionNumber}`, document: doc });
});

// Delete Document
app.delete('/api/admin/pdfs/:id', requireAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const index = pdfCatalog.findIndex((d) => d.id === id);
  if (index === -1) return res.status(404).json({ error: 'Document not found' });

  const deleted = pdfCatalog.splice(index, 1)[0];
  const user = (req as any).user;

  activityLogs.unshift({
    id: `act-${Date.now()}`,
    action: 'DELETE',
    documentId: deleted.id,
    documentTitle: deleted.title,
    details: `Deleted document ${deleted.title}`,
    performedBy: user.username,
    timestamp: new Date().toISOString(),
  });

  return res.json({ message: 'Document deleted successfully' });
});

// --- PUBLIC STUDENT API ENDPOINTS ---
app.get('/api/public/pdfs', (req: Request, res: Response) => {
  const publishedDocs = pdfCatalog.filter((d) => d.status === 'Published');
  return res.json({ documents: publishedDocs });
});

app.post('/api/public/pdfs/:id/increment-download', (req: Request, res: Response) => {
  const { id } = req.params;
  const doc = pdfCatalog.find((d) => d.id === id);
  if (doc) {
    doc.downloadsCount = (doc.downloadsCount || 0) + 1;
    return res.json({ success: true, count: doc.downloadsCount });
  }
  return res.status(404).json({ error: 'Document not found' });
});

// Setup Vite or Static File Serving
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve('dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Formula Hub server listening on port ${PORT} (mode: ${isProduction ? 'production' : 'development'})`);
  });
}

startServer();
