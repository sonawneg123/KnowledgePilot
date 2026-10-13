export type JobStatus =
  | 'QUEUED'
  | 'RESEARCHING'
  | 'ANALYZING'
  | 'VERIFYING'
  | 'REPORTING'
  | 'COMPLETED'
  | 'FAILED';

export interface ResearchJobDTO {
  id: string;
  query: string;
  status: JobStatus;
  progressPercentage: number;
  currentAgent: string | null;
  totalPromptTokens: number;
  totalCompletionTokens: number;
  estimatedCostUsd: number;
  errorMessage?: string | null;
  targetDocumentIds: string[];
  reportId?: string | null;
  createdAt: string;
  completedAt?: string | null;
}

export interface CreateJobRequest {
  query: string;
  documentIds?: string[];
}

export interface CreateJobResponse {
  jobId: string;
  status: JobStatus;
  message: string;
}
