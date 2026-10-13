import { createApp } from './app.js';
import { getListenPort, env } from './config/env.js';

const app = createApp();
const port = getListenPort();

const server = app.listen(port, () => {
  console.log(`🚀 KnowledgePilot AppSail Server running on port ${port}`);
  console.log(`   Environment: ${env.NODE_ENV}`);
  console.log(`   Groq Model: ${env.GROQ_MODEL}`);
  console.log(`   Embedding Provider: ${env.EMBEDDING_PROVIDER}`);
  console.log(`   Health Check: http://localhost:${port}/api/health`);
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
