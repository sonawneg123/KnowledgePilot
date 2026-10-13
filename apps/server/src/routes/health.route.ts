import { Router, Request, Response } from 'express';
import { env, getListenPort } from '../config/env.js';

export const healthRouter = Router();

healthRouter.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    service: 'KnowledgePilot AppSail Backend',
    version: '0.1.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: env.NODE_ENV,
    effectivePort: getListenPort(),
    groqConfiguredModel: env.GROQ_MODEL,
    embeddingProvider: env.EMBEDDING_PROVIDER,
  });
});
