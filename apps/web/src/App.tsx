import { useEffect, useState } from 'react';
import { 
  Bot, 
  FileSearch, 
  GitFork, 
  ShieldCheck, 
  FileText, 
  Cpu, 
  Server, 
  Cloud, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface HealthStatus {
  status: string;
  service: string;
  version: string;
  groqConfiguredModel: string;
  embeddingProvider: string;
  effectivePort: number;
}

export function App() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkHealth() {
      try {
        const res = await fetch('/api/health');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setHealth(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to connect');
      } finally {
        setLoading(false);
      }
    }
    checkHealth();
  }, []);

  const agents = [
    {
      name: 'Research Agent',
      icon: FileSearch,
      desc: 'Retrieves dense vector passages with exact document IDs, page offsets, and passage IDs.',
      color: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30 text-blue-400',
    },
    {
      name: 'Analysis Agent',
      icon: GitFork,
      desc: 'Performs cross-document synthesis and highlights contradictions or agreements.',
      color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
    },
    {
      name: 'Verification Agent',
      icon: ShieldCheck,
      desc: 'Executes strict Natural Language Inference (NLI) checking claims against source passages.',
      color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    },
    {
      name: 'Report Agent',
      icon: FileText,
      desc: 'Produces cited synthesis with verified provenance tags [DocID, p.X, #chunk].',
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
    },
    {
      name: 'Orchestrator',
      icon: Bot,
      desc: 'Manages async job state machine, retries, agent handoffs, and audit persistence.',
      color: 'from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-400',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between p-6 sm:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <Bot className="h-6 w-6 text-slate-950 stroke-[2.5]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Knowledge<span className="text-teal-400">Pilot</span>
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-teal-950 text-teal-300 border border-teal-800">
              Phase 1 Blueprint
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Evidence-backed multi-agent research with strict claim grounding.
          </p>
        </div>

        {/* Runtime status badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          {loading ? (
            <span className="text-slate-400 animate-pulse">Connecting to backend...</span>
          ) : health ? (
            <div className="flex items-center gap-2 text-emerald-400 font-medium">
              <CheckCircle2 className="h-4 w-4" />
              <span>Backend Connected (Port {health.effectivePort})</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-amber-400 font-medium">
              <AlertCircle className="h-4 w-4" />
              <span>Backend offline ({error || 'Not running'})</span>
            </div>
          )}
        </div>
      </header>

      {/* Main Grid */}
      <main className="my-10 space-y-10">
        {/* Architecture Spec Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-teal-400 font-semibold mb-2 text-sm">
              <Cpu className="h-4 w-4" />
              LLM Inference Engine
            </div>
            <div className="text-lg font-bold text-white">
              {health?.groqConfiguredModel || 'Groq (llama-3.3-70b)'}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Ultra-low latency LPU inference with JSON mode & token usage tracking.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-blue-400 font-semibold mb-2 text-sm">
              <Server className="h-4 w-4" />
              Vector Embeddings
            </div>
            <div className="text-lg font-bold text-white">
              {health?.embeddingProvider === 'local' ? 'Local ONNX (all-MiniLM)' : 'Dedicated Embedder'}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Decoupled dense retrieval layer with cosine similarity & provenance tagging.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-purple-400 font-semibold mb-2 text-sm">
              <Cloud className="h-4 w-4" />
              Deployment Targets
            </div>
            <div className="text-lg font-bold text-white">Zoho Catalyst</div>
            <p className="text-xs text-slate-400 mt-1">
              Slate (Static Frontend) + AppSail (Node.js Containerized Backend).
            </p>
          </div>
        </div>

        {/* Core Agents Row */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Core Multi-Agent Mesh</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {agents.map((agent) => {
              const Icon = agent.icon;
              return (
                <div 
                  key={agent.name}
                  className={`p-5 rounded-2xl border bg-gradient-to-b ${agent.color} flex flex-col justify-between`}
                >
                  <div>
                    <Icon className="h-6 w-6 mb-3" />
                    <h3 className="font-bold text-sm text-white mb-1">{agent.name}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{agent.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Zod Validated</span>
                    <span className="text-emerald-400 font-semibold">Active</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
        <p>KnowledgePilot Monorepo Blueprint • Phase 1 Verified</p>
        <p className="font-mono">Zoho Catalyst Slate + AppSail Ready</p>
      </footer>
    </div>
  );
}
