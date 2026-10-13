export type DocumentStatus = 'UPLOADED' | 'PARSING' | 'EMBEDDED' | 'FAILED';

export interface DocumentDTO {
  id: string;
  title: string;
  originalFilename: string;
  mimeType: string;
  fileSizeBytes: number;
  totalPages: number;
  checksumSha256: string;
  status: DocumentStatus;
  errorMessage?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentChunkDTO {
  id: string;
  documentId: string;
  chunkIndex: number;
  pageNumber: number;
  passageId: string; // Provenance identifier, e.g. DOC-1_P2_C4
  startChar: number;
  endChar: number;
  tokenCount: number;
  content: string;
  createdAt: string;
}

export interface DocumentUploadResponse {
  document: DocumentDTO;
  chunksCount: number;
}
