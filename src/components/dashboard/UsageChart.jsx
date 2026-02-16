import { motion } from 'framer-motion';

const UsageChart = ({ data = [] }) => {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Weekly Usage</h3>
          <p className="text-sm text-gray-500">Automation activity over the last 7 days</p>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-3 items-end h-40">
        {data.map((item, idx) => (
          <div key={item.label} className="flex flex-col items-center gap-2">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(item.value / maxValue) * 100}%` }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="w-full bg-gradient-to-t from-primary-600 to-secondary-500 rounded-lg"
            ></motion.div>
            <span className="text-xs text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsageChart;
