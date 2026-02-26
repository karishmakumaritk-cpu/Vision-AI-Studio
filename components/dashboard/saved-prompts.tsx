'use client';

import { useEffect, useState } from 'react';

type PromptItem = { id: string; prompt: string; response: string; createdAt: string };

export function SavedPrompts() {
  const [items, setItems] = useState<PromptItem[]>([]);

  const load = async () => {
    const response = await fetch('/api/prompts');
    const data = await response.json();
    setItems(data.items || []);
  };

  useEffect(() => { void load(); }, []);

  const onDelete = async (id: string) => {
    await fetch(`/api/prompts/${id}`, { method: 'DELETE' });
    void load();
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Saved Prompts</h1>
        <p className="mt-1 text-sm text-slate-500">Your previously generated outputs.</p>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="card p-5">
            <p className="text-sm leading-relaxed text-slate-300">{item.prompt}</p>
            <p className="mt-2 text-xs text-slate-600">{new Date(item.createdAt).toLocaleString()}</p>
            <div className="mt-3 flex gap-3">
              <button
                onClick={() => navigator.clipboard.writeText(item.response)}
                className="rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400 transition-colors hover:bg-indigo-500/20"
              >
                Copy
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {!items.length && (
          <div className="rounded-2xl border border-dashed border-slate-800 px-6 py-12 text-center text-sm text-slate-600">
            No saved prompts yet. Generate something in <span className="text-indigo-400">Prompt Generator</span>.
          </div>
        )}
      </div>
    </div>
  );
}
