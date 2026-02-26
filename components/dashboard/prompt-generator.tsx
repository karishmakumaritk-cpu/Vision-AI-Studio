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
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Prompt Generator</h1>
        <p className="mt-1 text-sm text-slate-500">Generate high-quality AI outputs for your business.</p>
      </div>

      <div className="card space-y-4 p-6">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-400">Tool Type</label>
          <select
            className="field"
            value={toolType}
            onChange={(e) => setToolType(e.target.value)}
          >
            <option value="text-generator">Text Generator</option>
            <option value="image-prompt">Image Prompt</option>
            <option value="business-idea">Business Idea</option>
            <option value="marketing-copy">Marketing Copy</option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-slate-400">Your Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="field h-36 resize-none"
            placeholder="Describe what you need..."
          />
        </div>
        <button
          onClick={onGenerate}
          disabled={loading || !prompt.trim()}
          className="btn-primary py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '⏳ Generating...' : '✨ Generate'}
        </button>
      </div>

      {result && (
        <div className="card p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-white">Generated Output</h2>
            <button
              className="rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400 transition-colors hover:bg-indigo-500/20"
              onClick={() => navigator.clipboard.writeText(result)}
            >
              Copy
            </button>
          </div>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-300">{result}</p>
        </div>
      )}
    </div>
  );
}
