import { CitationDTO } from './citation.js';

export interface ReportDTO {
  id: string;
  jobId: string;
  query: string;
  title: string;
  executiveSummary: string;
  contentMarkdown: string;
  totalClaims: number;
  verifiedClaims: number;
  contradictionsDetected: number;
  citations: CitationDTO[];
  createdAt: string;
}
