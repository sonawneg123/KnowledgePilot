import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3001),
  X_ZOHO_CATALYST_LISTEN_PORT: z.coerce.number().optional(),

  // Groq Inference Provider
  GROQ_API_KEY: z.string().min(1, 'GROQ_API_KEY is required').default('dummy_groq_key_for_tests'),
  GROQ_MODEL: z.string().default('llama-3.3-70b-versatile'),
  GROQ_REQUEST_TIMEOUT_MS: z.coerce.number().default(45000),
  GROQ_MAX_RETRIES: z.coerce.number().default(3),

  // Dedicated Vector Embedding Provider
  EMBEDDING_PROVIDER: z.enum(['local', 'cloud']).default('local'),
  EMBEDDING_MODEL: z.string().default('Xenova/all-MiniLM-L6-v2'),

  // MySQL Database
  MYSQL_HOST: z.string().default('localhost'),
  MYSQL_PORT: z.coerce.number().default(3306),
  MYSQL_USER: z.string().default('root'),
  MYSQL_PASSWORD: z.string().default(''),
  MYSQL_DATABASE: z.string().default('knowledgepilot'),
  MYSQL_CONNECTION_LIMIT: z.coerce.number().default(10),
  MYSQL_SSL: z
    .string()
    .transform((val) => val === 'true')
    .default('false'),

  // Frontend CORS origin
  CORS_ORIGIN: z.string().default('*'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Environment configuration error:');
  console.error(parsedEnv.error.format());
  throw new Error('Invalid environment configuration');
}

export const env = parsedEnv.data;

/**
 * Returns the effective listening port for local dev and Zoho Catalyst AppSail.
 * AppSail injects X_ZOHO_CATALYST_LISTEN_PORT at runtime.
 */
export function getListenPort(): number {
  return env.X_ZOHO_CATALYST_LISTEN_PORT || env.PORT;
}
