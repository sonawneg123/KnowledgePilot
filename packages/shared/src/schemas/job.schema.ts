import { z } from 'zod';

export const createJobSchema = z.object({
  query: z
    .string()
    .trim()
    .min(3, 'Research query must be at least 3 characters')
    .max(2000, 'Research query must not exceed 2000 characters'),
  documentIds: z.array(z.string().uuid()).optional().default([]),
});

export const getJobParamsSchema = z.object({
  jobId: z.string().uuid('Invalid job ID format'),
});
