import { motion } from 'framer-motion';
import { Play, Pause, Settings, BarChart3, CheckCircle } from 'lucide-react';

const AutomationCard = ({ automation, onToggle, delay = 0 }) => {
  const { automation_type, status, usage_count, usage_limit, config } = automation;

  const isActive = status === 'active';
  const usagePercentage = usage_limit ? (usage_count / usage_limit) * 100 : 0;

  const automationLabels = {
    whatsapp_chatbot: 'WA',
    ai_voice_agent: 'VA',
    instagram_automation: 'IG',
    business_automation: 'BA',
    ai_website_chatbot: 'WB',
  };

  const automationNames = {
    whatsapp_chatbot: 'WhatsApp Chatbot',
    ai_voice_agent: 'AI Voice Agent',
    instagram_automation: 'Instagram Automation',
    business_automation: 'Business Automation',
    ai_website_chatbot: 'Website Chatbot',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-sm font-bold text-gray-700">
            {automationLabels[automation_type] || 'AI'}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {automationNames[automation_type] || automation_type}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className="text-sm text-gray-600 capitalize">{status}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onToggle(automation.id, !isActive)}
          className={`
            w-10 h-10 rounded-lg flex items-center justify-center transition-all
            ${isActive
              ? 'bg-green-100 text-green-600 hover:bg-green-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
          `}
        >
          {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
      </div>

      {config?.demo_mode && (
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
          <CheckCircle className="w-3 h-3" />
          Demo Mode Active
        </div>
      )}

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Usage (Trial Limit)</span>
          <span className="font-semibold text-gray-900">
            {usage_count} / {usage_limit}
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${usagePercentage}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className={`h-full rounded-full ${
              usagePercentage > 80
                ? 'bg-red-500'
                : usagePercentage > 50
                  ? 'bg-orange-500'
                  : 'bg-green-500'
            }`}
          ></motion.div>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded-lg transition-all text-sm font-semibold">
          <BarChart3 className="w-4 h-4" />
          View Stats
        </button>
        <button className="flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2 px-4 rounded-lg transition-all">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default AutomationCard;
