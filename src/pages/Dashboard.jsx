import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import TrialBanner from '../components/dashboard/TrialBanner';
import StatsCard from '../components/dashboard/StatsCard';
import AutomationCard from '../components/dashboard/AutomationCard';
import DemoDataViewer from '../components/dashboard/DemoDataViewer';
import { 
  Bot, 
  MessageSquare, 
  TrendingUp, 
  Users,
  Zap,
  Sparkles
} from 'lucide-react';
import { dashboardAPI } from '../utils/api';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [trialStatus, setTrialStatus] = useState(null);
  const [automations, setAutomations] = useState([]);
  const [demoData, setDemoData] = useState([]);
  const [stats, setStats] = useState(null);

  // Mock User ID (in production, get from auth context)
  const userId = 'demo-user-123';

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // In production, make real API calls
      // For now, using mock data
      
      // Mock Trial Status
      setTrialStatus({
        days_remaining: 5,
        trial_end: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        is_expired: false
      });

      // Mock Automations
      setAutomations([
        {
          id: '1',
          automation_type: 'whatsapp_chatbot',
          status: 'active',
          usage_count: 34,
          usage_limit: 50,
          config: { demo_mode: true }
        },
        {
          id: '2',
          automation_type: 'ai_voice_agent',
          status: 'active',
          usage_count: 12,
          usage_limit: 50,
          config: { demo_mode: true }
        },
        {
          id: '3',
          automation_type: 'instagram_automation',
          status: 'paused',
          usage_count: 8,
          usage_limit: 50,
          config: { demo_mode: true }
        }
      ]);

      // Mock Demo Data
      setDemoData([
        {
          data_type: 'whatsapp_chatbot',
          data: {
            sample_messages: [
              { 
                from: 'Customer A', 
                message: 'What are your prices?', 
                reply: 'Auto-replied with pricing details', 
                timestamp: new Date() 
              },
              { 
                from: 'Customer B', 
                message: 'Is this available?', 
                reply: 'Checked inventory and confirmed', 
                timestamp: new Date() 
              }
            ],
            sample_analytics: {
              messages_handled: 45,
              response_time: '2.3s',
              satisfaction: '94%'
            }
          }
        },
        {
          data_type: 'ai_voice_agent',
          data: {
            sample_calls: [
              { caller: '+91 98765 43210', duration: '3:24', status: 'Resolved', timestamp: new Date() },
              { caller: '+91 98765 43211', duration: '1:45', status: 'Transferred', timestamp: new Date() }
            ],
            sample_analytics: {
              calls_handled: 28,
              avg_duration: '2:45',
              resolution: '89%'
            }
          }
        },
        {
          data_type: 'instagram_automation',
          data: {
            sample_posts: [
              { 
                type: 'Reel', 
                caption: '5 ways AI can transform your business! 🚀', 
                hashtags: '#ai #business #automation #growth', 
                engagement: '245 likes' 
              },
              { 
                type: 'Post', 
                caption: 'Automate your way to success with HerBalance AI 💜', 
                hashtags: '#automation #saas #tech', 
                engagement: '189 likes' 
              }
            ],
            sample_analytics: {
              posts_created: 12,
              engagement: '8.4%',
              growth: '+156'
            }
          }
        }
      ]);

      // Mock Stats
      setStats({
        total_automations: 3,
        messages_handled: 127,
        growth_rate: 24,
        active_leads: 18
      });

    } catch (error) {
      console.error('Load dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAutomation = async (automationId, newStatus) => {
    try {
      // Update local state
      setAutomations(prev =>
        prev.map(auto =>
          auto.id === automationId
            ? { ...auto, status: newStatus ? 'active' : 'paused' }
            : auto
        )
      );

      // In production, call API to update
      // await dashboardAPI.toggleAutomation(automationId, newStatus);
      
    } catch (error) {
      console.error('Toggle automation error:', error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeTab="overview">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            Welcome to Your AI Dashboard 👋
          </h1>
          <p className="text-gray-600">
            Manage your automations, track performance, and grow your business
          </p>
        </motion.div>

        {/* Trial Banner */}
        {trialStatus && !trialStatus.is_expired && (
          <TrialBanner
            daysRemaining={trialStatus.days_remaining}
            trialEnd={trialStatus.trial_end}
          />
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Active Automations"
            value={stats?.total_automations || 0}
            change={12}
            icon={Bot}
            color="purple"
            delay={0}
          />
          <StatsCard
            title="Messages Handled"
            value={stats?.messages_handled || 0}
            change={24}
            icon={MessageSquare}
            color="pink"
            delay={0.1}
          />
          <StatsCard
            title="Growth Rate"
            value={`${stats?.growth_rate || 0}%`}
            change={8}
            icon={TrendingUp}
            color="success"
            delay={0.2}
          />
          <StatsCard
            title="Active Leads"
            value={stats?.active_leads || 0}
            change={-3}
            icon={Users}
            color="warning"
            delay={0.3}
          />
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 mb-8 text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Get Started with AI Automation</h3>
                <p className="text-white/90 text-sm">Watch our 5-minute tutorial to maximize your trial</p>
              </div>
            </div>
            <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-bold hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Watch Tutorial
            </button>
          </div>
        </motion.div>

        {/* Automations Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Your Active Automations</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {automations.map((automation, idx) => (
              <AutomationCard
                key={automation.id}
                automation={automation}
                onToggle={handleToggleAutomation}
                delay={idx * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Demo Data Section */}
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-6">Demo Performance Data</h2>
          <div className="grid gap-6">
            {demoData.map((demo, idx) => (
              <DemoDataViewer
                key={idx}
                demoData={demo.data}
                type={demo.data_type}
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
