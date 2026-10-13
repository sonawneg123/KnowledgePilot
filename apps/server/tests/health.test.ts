import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

describe('GET /api/health', () => {
  const app = createApp();

  it('should return 200 OK with runtime metadata', async () => {
    const res = await request(app).get('/api/health');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'healthy');
    expect(res.body).toHaveProperty('service', 'KnowledgePilot AppSail Backend');
    expect(res.body).toHaveProperty('groqConfiguredModel');
    expect(res.body).toHaveProperty('embeddingProvider');
    expect(res.body).toHaveProperty('effectivePort');
  });
});
