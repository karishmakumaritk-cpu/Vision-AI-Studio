import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

export default function Admin() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    Promise.all([api.get('/admin/users', token), api.get('/admin/revenue', token)]).then(([u, r]) => {
      setUsers(u.data?.users || []);
      setRevenue(r.data?.total_revenue || 0);
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-black">Admin Panel</h2>
        <p className="mt-2 text-slate-400">Revenue: ₹{revenue}</p>
        <div className="mt-6 card overflow-auto">
          <table className="w-full text-sm"><thead><tr><th className="text-left">Name</th><th>Email</th><th>Role</th></tr></thead>
            <tbody>{users.map((u) => <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
