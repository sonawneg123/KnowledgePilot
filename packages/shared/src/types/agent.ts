export type AgentName =
  | 'Orchestrator'
  | 'ResearchAgent'
  | 'AnalysisAgent'
  | 'VerificationAgent'
  | 'ReportAgent';

export type AgentStepStatus = 'SUCCESS' | 'RETRY' | 'FAILED';

export interface AgentStepLogDTO {
  id: string;
  jobId: string;
  agentName: AgentName;
  stepAction: string;
  modelUsed: string;
  inputPayload?: unknown;
  outputPayload?: unknown;
  promptTokens: number;
  completionTokens: number;
  durationMs: number;
  status: AgentStepStatus;
  createdAt: string;
}

export interface RetrievedEvidence {
  chunkId: string;
  documentId: string;
  documentTitle: string;
  pageNumber: number;
  passageId: string;
  content: string;
  similarityScore: number;
}

export interface ContradictionFinding {
  claimA: string;
  sourceAPassageId: string;
  claimB: string;
  sourceBPassageId: string;
  explanation: string;
}

export interface AnalysisOutput {
  keyThemes: string[];
  findings: Array<{
    findingText: string;
    supportingPassageIds: string[];
    confidence: number;
  }>;
  contradictions: ContradictionFinding[];
}

export interface ClaimVerificationResult {
  claimText: string;
  passageId: string;
  chunkId: string;
  status: 'VERIFIED' | 'CONTRADICTED' | 'UNSUPPORTED';
  confidenceScore: number;
  reasoning: string;
}
