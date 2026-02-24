import React, { useState } from 'react';

export default function Chat({ projectId }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  async function send() {
    if (!text.trim()) return;
    const m = { sender: 'user', message: text, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, m]);
    setText('');
    // Post to backend messages if available
    try {
      await fetch('/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ project_id: projectId || 'demo', sender: 'user', message: text }) });
    } catch (e) { console.warn('message post failed', e.message); }
  }

  return (
    <div style={{ border: '1px solid #eee', padding: 12, borderRadius: 8 }}>
      <div style={{ maxHeight: 280, overflow: 'auto', marginBottom: 8 }}>
        {messages.map((m,i) => <div key={i}><strong>{m.sender}</strong>: {m.message}</div>)}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Type message..." style={{ flex: 1 }} />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}
