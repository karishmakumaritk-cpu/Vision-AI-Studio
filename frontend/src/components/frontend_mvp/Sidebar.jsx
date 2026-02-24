import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside style={{ width: 220, borderRight: '1px solid #eee', padding: 16 }}>
      <div style={{ marginBottom: 20 }}>
        <img src="/assets/logo.png" alt="logo" style={{ height: 36 }} />
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Link to="/dashboard">My Projects</Link>
        <Link to="/create-workflow">Create New Workflow</Link>
        <Link to="/dashboard/messages">Messages</Link>
        <Link to="/dashboard/billing">Billing</Link>
        <Link to="/dashboard/settings">Settings</Link>
      </nav>
    </aside>
  );
}
