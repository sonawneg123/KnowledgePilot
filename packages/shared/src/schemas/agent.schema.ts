import { z } from 'zod';

export const analysisAgentOutputSchema = z.object({
  keyThemes: z.array(z.string().min(1)).min(1),
  findings: z.array(
    z.object({
      findingText: z.string().min(5),
      supportingPassageIds: z.array(z.string().min(1)).min(1),
      confidence: z.number().min(0).max(1),
    })
  ),
  contradictions: z.array(
    z.object({
      claimA: z.string().min(5),
      sourceAPassageId: z.string().min(1),
      claimB: z.string().min(5),
      sourceBPassageId: z.string().min(1),
      explanation: z.string().min(5),
    })
  ).default([]),
});

export const verificationAgentOutputSchema = z.object({
  verifiedClaims: z.array(
    z.object({
      claimText: z.string().min(5),
      passageId: z.string().min(1),
      status: z.enum(['VERIFIED', 'CONTRADICTED', 'UNSUPPORTED']),
      confidenceScore: z.number().min(0).max(1),
      reasoning: z.string().min(5),
    })
  ),
});

export const reportAgentOutputSchema = z.object({
  title: z.string().min(3),
  executiveSummary: z.string().min(10),
  contentMarkdown: z.string().min(20),
  keyCitations: z.array(
    z.object({
      passageId: z.string(),
      claimSupported: z.string(),
    })
  ),
});
