import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, TrendingUp, Users } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import TrialBanner from '../components/dashboard/TrialBanner';
import StatsCard from '../components/dashboard/StatsCard';
import AutomationCard from '../components/dashboard/AutomationCard';
import DemoDataViewer from '../components/dashboard/DemoDataViewer';
import UsageChart from '../components/dashboard/UsageChart';
import QuickActions from '../components/dashboard/QuickActions';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [trialStatus, setTrialStatus] = useState(null);
  const [automations, setAutomations] = useState([]);
  const [demoData, setDemoData] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);

      try {
        // Mock data for initial dashboard experience
        setTrialStatus({
          days_remaining: 5,
          trial_end: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
          is_expired: false,
        });

        setAutomations([
          {
            id: '1',
            automation_type: 'whatsapp_chatbot',
            status: 'active',
            usage_count: 34,
            usage_limit: 50,
            config: { demo_mode: true },
          },
          {
            id: '2',
            automation_type: 'ai_voice_agent',
            status: 'active',
            usage_count: 12,
            usage_limit: 50,
            config: { demo_mode: true },
          },
          {
            id: '3',
            automation_type: 'instagram_automation',
            status: 'paused',
            usage_count: 8,
            usage_limit: 50,
            config: { demo_mode: true },
          },
        ]);

        setDemoData([
          {
            data_type: 'whatsapp_chatbot',
            data: {
              sample_messages: [
                {
                  from: 'Customer A',
                  message: 'What are your prices?',
                  reply: 'Auto-replied with pricing details',
                  timestamp: new Date(),
                },
                {
                  from: 'Customer B',
                  message: 'Is this available?',
                  reply: 'Checked inventory and confirmed',
                  timestamp: new Date(),
                },
              ],
              sample_analytics: {
                messages_handled: 45,
                response_time: '2.3s',
                satisfaction: '94%',
              },
            },
          },
          {
            data_type: 'ai_voice_agent',
            data: {
              sample_calls: [
                {
                  caller: '+91 98765 43210',
                  duration: '3:24',
                  status: 'Resolved',
                  timestamp: new Date(),
                },
                {
                  caller: '+91 98765 43211',
                  duration: '1:45',
                  status: 'Transferred',
                  timestamp: new Date(),
                },
              ],
              sample_analytics: {
                calls_handled: 28,
                avg_duration: '2:45',
                resolution: '89%',
              },
            },
          },
          {
            data_type: 'instagram_automation',
            data: {
              sample_posts: [
                {
                  type: 'Reel',
                  caption: 'Five ways AI can transform your business',
                  hashtags: '#ai #business #automation #growth',
                  engagement: '245 likes',
                },
                {
                  type: 'Post',
                  caption: 'Automate your way to success with HerBalance AI',
                  hashtags: '#automation #saas #tech',
                  engagement: '189 likes',
                },
              ],
              sample_analytics: {
                posts_created: 12,
                engagement: '8.4%',
                growth: '+156',
              },
            },
          },
        ]);

        setStats({
          total_automations: 3,
          messages_handled: 127,
          growth_rate: 24,
          active_leads: 18,
        });
      } catch (error) {
        console.error('Load dashboard error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleToggleAutomation = async (automationId, newStatus) => {
    try {
      setAutomations((prev) =>
        prev.map((auto) =>
          auto.id === automationId
            ? { ...auto, status: newStatus ? 'active' : 'paused' }
            : auto
        )
      );
    } catch (error) {
      console.error('Toggle automation error:', error);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeTab="overview">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            Welcome to Your AI Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your automations, track performance, and grow your business
          </p>
        </motion.div>

        {trialStatus && !trialStatus.is_expired && (
          <TrialBanner
            daysRemaining={trialStatus.days_remaining}
            trialEnd={trialStatus.trial_end}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Active Automations"
            value={stats?.total_automations || 0}
            change={12}
            icon={Bot}
            color="primary"
            delay={0}
          />
          <StatsCard
            title="Messages Handled"
            value={stats?.messages_handled || 0}
            change={24}
            icon={MessageSquare}
            color="secondary"
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

        <QuickActions />

        <div className="grid lg:grid-cols-3 gap-6 my-8">
          <div className="lg:col-span-2">
            <UsageChart
              data={[
                { label: 'Mon', value: 12 },
                { label: 'Tue', value: 18 },
                { label: 'Wed', value: 10 },
                { label: 'Thu', value: 22 },
                { label: 'Fri', value: 16 },
                { label: 'Sat', value: 8 },
                { label: 'Sun', value: 14 },
              ]}
            />
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Trial Usage Summary</h3>
            <p className="text-sm text-gray-600 mb-4">
              You are on the free trial plan with a limit of 50 actions per automation.
            </p>
            <div className="text-sm text-gray-500">
              Upgrade to unlock higher limits and advanced analytics.
            </div>
          </div>
        </div>

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
