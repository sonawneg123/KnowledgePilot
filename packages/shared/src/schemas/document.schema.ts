import { z } from 'zod';

export const documentUploadSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(255),
});

export const documentChunkFilterSchema = z.object({
  documentId: z.string().uuid().optional(),
  pageNumber: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});
