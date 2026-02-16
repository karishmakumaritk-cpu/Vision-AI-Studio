import { Zap, PlayCircle, MessageSquarePlus } from 'lucide-react';

const QuickActions = () => (
  <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-6 text-white">
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
          <Zap className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold">Get Started with AI Automation</h3>
          <p className="text-white/90 text-sm">Watch a short tutorial or create your first workflow</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="bg-white text-primary-600 px-4 py-2 rounded-full font-bold hover:shadow-2xl transition-all flex items-center gap-2">
          <PlayCircle className="w-5 h-5" />
          Watch Tutorial
        </button>
        <button className="bg-white/20 text-white px-4 py-2 rounded-full font-semibold hover:bg-white/30 transition-all flex items-center gap-2">
          <MessageSquarePlus className="w-5 h-5" />
          New Automation
        </button>
      </div>
    </div>
  </div>
);

export default QuickActions;
