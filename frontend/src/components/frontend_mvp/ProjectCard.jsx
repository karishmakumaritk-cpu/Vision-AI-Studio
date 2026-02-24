import React from 'react';
export default function ProjectCard({ project }) {
  return (
    <div style={{ border: '1px solid #eee', padding: 12, borderRadius: 8, background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div><strong>{project.workflow_type}</strong></div>
        <div style={{ color: '#666' }}>{project.status}</div>
      </div>
      <div style={{ marginTop: 8 }}>{project.requirements_json ? JSON.stringify(project.requirements_json) : ''}</div>
    </div>
  );
}
