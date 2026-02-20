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
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Saved Prompts</h1>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="card p-4">
            <p className="text-sm text-slate-300">{item.prompt}</p>
            <p className="mt-2 text-xs text-slate-500">{new Date(item.createdAt).toLocaleString()}</p>
            <div className="mt-3 flex gap-3 text-sm">
              <button onClick={() => navigator.clipboard.writeText(item.response)} className="text-indigo-400">Copy</button>
              <button onClick={() => onDelete(item.id)} className="text-red-400">Delete</button>
            </div>
          </div>
        ))}
        {!items.length && <p className="text-slate-500">No saved prompts yet.</p>}
      </div>
    </div>
  );
}
