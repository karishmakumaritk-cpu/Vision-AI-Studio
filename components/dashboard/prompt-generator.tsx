'use client';

import { useState } from 'react';

export function PromptGenerator() {
  const [prompt, setPrompt] = useState('');
  const [toolType, setToolType] = useState('text-generator');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const onGenerate = async () => {
    setLoading(true);
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, toolType })
    });
    const data = await response.json();
    setResult(data.result || data.error || 'No output');
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Prompt Generator</h1>
      <div className="card space-y-3 p-4">
        <select className="w-full rounded-md border border-slate-700 bg-slate-900 p-2" value={toolType} onChange={(e) => setToolType(e.target.value)}>
          <option value="text-generator">Text Generator</option>
          <option value="image-prompt">Image Prompt</option>
          <option value="business-idea">Business Idea</option>
          <option value="marketing-copy">Marketing Copy</option>
        </select>
        <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="h-32 w-full rounded-md border border-slate-700 bg-slate-900 p-2" placeholder="Enter your prompt..." />
        <button onClick={onGenerate} disabled={loading} className="rounded-md bg-indigo-600 px-4 py-2">{loading ? 'Generating...' : 'Generate'}</button>
      </div>
      {result && (
        <div className="card p-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-medium">Result</h2>
            <button className="text-sm text-indigo-400" onClick={() => navigator.clipboard.writeText(result)}>Copy</button>
          </div>
          <p className="whitespace-pre-wrap text-sm text-slate-300">{result}</p>
        </div>
      )}
    </div>
  );
}
