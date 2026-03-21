import { useState, useEffect } from 'react';
import { Layout, Shield, FileText, MessageSquare, Activity, ExternalLink } from 'lucide-react';

export default function App() {
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        setHealth(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch health:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      <header className="border-b border-neutral-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Layout className="h-6 w-6 text-emerald-600" />
            <h1 className="text-xl font-semibold tracking-tight">Blog API Dashboard</h1>
          </div>
          <a 
            href="/api-docs" 
            target="_blank" 
            className="flex items-center gap-1 text-sm font-medium text-emerald-600 hover:underline"
          >
            API Documentation <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Status Card */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-medium uppercase tracking-wider text-neutral-500">System Status</h2>
              <Activity className={`h-5 w-5 ${health?.status === 'ok' ? 'text-emerald-500' : 'text-neutral-300'}`} />
            </div>
            {loading ? (
              <div className="h-8 w-24 animate-pulse rounded bg-neutral-100"></div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-light">{health?.status === 'ok' ? 'Healthy' : 'Offline'}</span>
                  {health?.status === 'ok' && <span className="h-2 w-2 rounded-full bg-emerald-500"></span>}
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-neutral-400">Database:</span>
                  <span className={`font-medium ${health?.database === 'connected' ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {health?.database === 'connected' ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </div>
            )}
            <p className="mt-4 text-xs text-neutral-400">
              Last checked: {health?.timestamp ? new Date(health.timestamp).toLocaleTimeString() : 'Never'}
            </p>
          </div>

          {/* Auth Card */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-medium uppercase tracking-wider text-neutral-500">Authentication</h2>
              <Shield className="h-5 w-5 text-indigo-500" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>JWT Strategy</span>
                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600">Active</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Bcrypt Hashing</span>
                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600">Active</span>
              </div>
            </div>
          </div>

          {/* Resources Card */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-medium uppercase tracking-wider text-neutral-500">Resources</h2>
              <div className="flex gap-2">
                <FileText className="h-4 w-4 text-neutral-400" />
                <MessageSquare className="h-4 w-4 text-neutral-400" />
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p>• Posts (CRUD + Pagination)</p>
              <p>• Comments (CRUD + Filtering)</p>
              <p>• User Profiles</p>
            </div>
          </div>
        </div>

        <section className="mt-12 rounded-3xl bg-neutral-900 p-8 text-white shadow-2xl">
          <h2 className="text-2xl font-light tracking-tight">Ready to integrate?</h2>
          <p className="mt-2 max-w-xl text-neutral-400">
            The RESTful API is fully operational. You can start making requests to the endpoints listed in the documentation. 
            Make sure to configure your <code className="rounded bg-neutral-800 px-1 text-emerald-400">MONGODB_URI</code> in the environment variables for full data persistence.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <code className="rounded-lg bg-neutral-800 p-4 font-mono text-sm text-emerald-400">
              POST /api/v1/auth/register
            </code>
            <code className="rounded-lg bg-neutral-800 p-4 font-mono text-sm text-emerald-400">
              GET /api/v1/posts
            </code>
          </div>
        </section>
      </main>

      <footer className="mt-12 border-t border-neutral-200 p-8 text-center text-xs text-neutral-400">
        &copy; 2026 RESTful Blog Application API • Production Ready
      </footer>
    </div>
  );
}
