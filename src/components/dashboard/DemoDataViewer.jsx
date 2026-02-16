import { motion } from 'framer-motion';
import { MessageSquare, Phone, Instagram } from 'lucide-react';

const DemoDataViewer = ({ demoData, type }) => {
  if (!demoData) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
        <p className="text-gray-500">No demo data available</p>
      </div>
    );
  }

  if (type === 'whatsapp_chatbot') {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">WhatsApp Demo Messages</h3>
            <p className="text-sm text-gray-500">Sample automated conversations</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {demoData.sample_messages?.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="font-semibold text-gray-900">{msg.from}</span>
                <span className="text-xs text-gray-500">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-2">{msg.message}</p>
              <div className="bg-white rounded p-2 border border-gray-200">
                <p className="text-xs text-gray-600">
                  <span className="font-semibold text-green-600">AI Reply:</span> {msg.reply}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          {Object.entries(demoData.sample_analytics || {}).map(([key, value], idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl font-black text-primary-600">{value}</div>
              <div className="text-xs text-gray-600 capitalize">{key.replace(/_/g, ' ')}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'ai_voice_agent') {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <Phone className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Voice Agent Call Logs</h3>
            <p className="text-sm text-gray-500">Sample handled calls</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {demoData.sample_calls?.map((call, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{call.caller}</div>
                  <div className="text-xs text-gray-500">
                    {new Date(call.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-semibold text-gray-900">{call.duration}</div>
                <div className={`text-xs ${call.status === 'Resolved' ? 'text-green-600' : 'text-orange-600'}`}>
                  {call.status}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          {Object.entries(demoData.sample_analytics || {}).map(([key, value], idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl font-black text-blue-600">{value}</div>
              <div className="text-xs text-gray-600 capitalize">{key.replace(/_/g, ' ')}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'instagram_automation') {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
            <Instagram className="w-6 h-6 text-pink-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Instagram Content Generated</h3>
            <p className="text-sm text-gray-500">AI-created posts and captions</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          {demoData.sample_posts?.map((post, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-4 border border-pink-200"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {post.type}
                </span>
                <span className="text-sm text-gray-600">{post.engagement}</span>
              </div>
              <p className="text-sm text-gray-800 mb-2">{post.caption}</p>
              <p className="text-xs text-primary-600">{post.hashtags}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
          {Object.entries(demoData.sample_analytics || {}).map(([key, value], idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl font-black text-pink-600">{value}</div>
              <div className="text-xs text-gray-600 capitalize">{key.replace(/_/g, ' ')}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default DemoDataViewer;
