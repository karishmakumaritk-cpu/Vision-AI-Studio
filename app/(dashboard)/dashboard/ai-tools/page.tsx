import Link from 'next/link';

export default function AIToolsPage() {
  const tools = [
    { name: 'Text Generator', icon: '📝', desc: 'Generate high-quality text using GPT models.' },
    { name: 'Image Prompt Assistant', icon: '🎨', desc: 'Craft perfect prompts for AI image generation.' },
    { name: 'Business Idea Generator', icon: '💡', desc: 'Discover profitable business ideas with AI.' },
    { name: 'Marketing Copy Tool', icon: '📣', desc: 'Write compelling marketing copy that converts.' },
  ];
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">AI Tools</h1>
        <p className="mt-1 text-sm text-slate-500">Select a tool to start generating outputs with GPT.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {tools.map((tool) => (
          <div key={tool.name} className="card group p-6 hover:border-indigo-500/40">
            <div className="mb-3 text-3xl">{tool.icon}</div>
            <h2 className="font-semibold text-white">{tool.name}</h2>
            <p className="mt-1.5 text-sm text-slate-400">{tool.desc}</p>
            <Link href="/dashboard/prompt-generator" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300">
              Open tool <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
