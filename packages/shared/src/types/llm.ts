export interface TokenUsageMetrics {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCostUsd: number;
}

export type SupportedGroqModel =
  | 'llama-3.3-70b-versatile'
  | 'llama-3.1-8b-instant'
  | (string & {});

export interface GroqModelConfig {
  model: SupportedGroqModel;
  maxTokens?: number;
  temperature?: number;
}
