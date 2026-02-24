import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Package, Clock, CheckCircle, AlertCircle, TrendingUp, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, requestsRes] = await Promise.all([
          axios.get(`${API_URL}/projects`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API_URL}/automation/my-requests`, { headers: { Authorization: `Bearer ${token}` } })
        ]);
        setProjects(projectsRes.data.data || []);
        setRequests(requestsRes.data.data || []);
      } catch {
        setProjects([]);
        setRequests([]);
      } finally {
        setLoading(false);
      }
    };
    void fetchData();
  }, [token]);

  const getStatusColor = (s) => ({ pending: 'yellow', in_progress: 'blue', testing: 'purple', completed: 'green', cancelled: 'red' }[s] || 'gray');
  const getStatusIcon = (s) => ({ pending: Clock, in_progress: TrendingUp, testing: AlertCircle, completed: CheckCircle, cancelled: AlertCircle }[s] || Clock);

  if (loading) return <div className="min-h-screen bg-[#0A0A0A] grid place-items-center"><div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-28">
        <div className="mb-8 flex justify-between items-center">
          <div><h2 className="text-4xl font-black mb-1">Your Dashboard</h2><p className="text-gray-400">Welcome, {user?.name}</p></div>
          <button onClick={() => { logout(); navigate('/'); }} className="p-2 hover:bg-white/10 rounded"><LogOut className="w-5 h-5" /></button>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-10">
          {[{ label: 'Total Requests', value: requests.length, icon: Package }, { label: 'Active Projects', value: projects.filter((p) => p.status === 'in_progress').length, icon: TrendingUp }, { label: 'Completed', value: projects.filter((p) => p.status === 'completed').length, icon: CheckCircle }, { label: 'Total Spent', value: `₹${projects.reduce((s,p)=>s+(p.price_paid||0),0).toLocaleString()}`, icon: DollarSign }].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <stat.icon className="w-6 h-6 text-purple-300 mb-2" />
              <div className="text-xs text-gray-500">{stat.label}</div>
              <div className="text-2xl font-black">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {projects.length > 0 ? (
          <div className="space-y-4 mb-10">
            {projects.map((project) => {
              const Icon = getStatusIcon(project.status);
              const color = getStatusColor(project.status);
              return (
                <div key={project.id} className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-xl font-bold">{project.project_name}</h4>
                      <div className={`text-${color}-400 text-sm flex items-center gap-2`}><Icon className="w-4 h-4" />{project.status}</div>
                    </div>
                    <div className="text-right font-black">₹{project.price_quoted?.toLocaleString?.() || '0'}</div>
                  </div>
                  <div className="mt-3 h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-2 bg-gradient-to-r from-purple-500 to-cyan-500" style={{ width: `${project.progress_percentage || 0}%` }} /></div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/5 border border-white/10 rounded-xl">
            <Package className="w-10 h-10 mx-auto mb-3 text-purple-300" />
            <h3 className="text-2xl font-bold">No projects yet</h3>
            <button onClick={() => navigate('/request')} className="mt-4 bg-gradient-to-r from-purple-600 to-cyan-600 px-5 py-2 rounded-full font-bold">Request Automation</button>
          </div>
        )}

        {requests.length > 0 && (
          <div className="space-y-3">
            {requests.map((r) => <div key={r.id} className="bg-white/5 border border-white/10 rounded-xl p-4"><div className="font-semibold">{r.automation_category}</div><div className="text-sm text-gray-400">{r.description}</div></div>)}
          </div>
        )}
      </div>
    </div>
  );
}
