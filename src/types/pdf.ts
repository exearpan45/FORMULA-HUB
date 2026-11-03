import { Subject, ExamType } from './formula';

export type PdfCategory = 'Chapter' | 'Class Collection' | 'Subject Master' | 'Special Toolkit';

export type PublishingStatus = 'Published' | 'Draft' | 'Archived';

export interface PdfVersion {
  versionNumber: string; // e.g. '1.0', '1.1', '2.0'
  uploadedAt: string;
  fileSize: number; // in bytes
  pageCount: number;
  uploadedBy: string;
  updateNotes: string;
  fileData?: string; // base64 data URI or storage identifier
  checksum?: string;
}

export interface PdfDocument {
  id: string;
  title: string;
  description: string;
  subject: Subject | 'Combined';
  class: '11' | '12' | 'Combined';
  chapter?: string;
  category: PdfCategory;
  examTags: ExamType[];
  currentVersion: string;
  status: PublishingStatus;
  fileSize: number; // bytes of current version
  pageCount: number;
  lastUpdated: string;
  downloadsCount: number;
  coverAccentColor?: string; // e.g. '#0284c7'
  versions: PdfVersion[];
  verifiedBy: string;
  formulaCount?: number;
}

export interface StorageStats {
  usedBytes: number;
  maxFreeTierBytes: number; // 10 GB for Cloudflare R2 free tier
  totalDocuments: number;
  publishedCount: number;
  archivedCount: number;
  subjectBreakdown: {
    Physics: number;
    Chemistry: number;
    Mathematics: number;
    Combined: number;
  };
}

export interface AdminActivityLog {
  id: string;
  action: 'UPLOAD' | 'REPLACE' | 'PUBLISH' | 'UNPUBLISH' | 'RESTORE' | 'DELETE' | 'LOGIN';
  documentId?: string;
  documentTitle?: string;
  details: string;
  performedBy: string;
  timestamp: string;
}

export interface AdminSession {
  token: string;
  username: string;
  role: 'superadmin' | 'editor';
  expiresAt: number;
}
