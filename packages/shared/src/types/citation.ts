export type VerificationStatus = 'VERIFIED' | 'CONTRADICTED' | 'UNSUPPORTED';

export interface CitationDTO {
  id: string;
  jobId: string;
  chunkId: string;
  documentId: string;
  documentTitle: string;
  pageNumber: number;
  passageId: string;
  claimText: string;
  verificationStatus: VerificationStatus;
  confidenceScore: number;
  reasoning: string;
  sourcePassageSnippet: string;
  createdAt: string;
}
