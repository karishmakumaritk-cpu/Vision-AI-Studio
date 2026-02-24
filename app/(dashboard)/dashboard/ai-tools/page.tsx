import Link from 'next/link';

export default function AIToolsPage() {
  const tools = ['Text Generator', 'Image Prompt Assistant', 'Business Idea Generator', 'Marketing Copy Tool'];
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">AI Tools</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {tools.map((tool) => (
          <div key={tool} className="card p-4">
            <h2 className="font-medium">{tool}</h2>
            <p className="mt-2 text-sm text-slate-400">Generate high-quality outputs using GPT models.</p>
            <Link href="/dashboard/prompt-generator" className="mt-3 inline-block text-sm text-indigo-400">Open tool →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
