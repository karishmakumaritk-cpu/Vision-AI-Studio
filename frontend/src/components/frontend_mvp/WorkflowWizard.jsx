import React, { useState } from 'react';

const QUESTIONS = [
  { id: 'business', q: 'What business do you run?' },
  { id: 'tools', q: 'Which tools/platforms do you use (Shopify, WordPress, WhatsApp)?' },
  { id: 'problem', q: 'What problem are you trying to solve?' },
  { id: 'outcome', q: 'What outcome do you want?' },
  { id: 'integrations', q: 'Do you need WhatsApp / Email / CRM integration?' },
];

export default function WorkflowWizard({ onComplete }) {
  const [answers, setAnswers] = useState({});
  const [idx, setIdx] = useState(0);

  function handleNext() {
    if (idx < QUESTIONS.length - 1) setIdx(i => i + 1);
    else onComplete && onComplete(answers);
  }
  function handleChange(v) {
    setAnswers(a => ({ ...a, [QUESTIONS[idx].id]: v }));
  }

  return (
    <div style={{ maxWidth: 800 }}>
      <h2>AI Workflow Assistant</h2>
      <div style={{ marginBottom: 12, color: '#444' }}>{QUESTIONS[idx].q}</div>
      <textarea placeholder="Type your answer..." value={answers[QUESTIONS[idx].id] || ''} onChange={e => handleChange(e.target.value)} style={{ width: '100%', minHeight: 120, marginBottom: 12 }} />
      <div style={{ display: 'flex', gap: 8 }}>
        {idx > 0 && <button onClick={() => setIdx(i => i - 1)}>Back</button>}
        <button onClick={handleNext} style={{ background: 'linear-gradient(90deg,#7c3aed,#06b6d4)', color: '#fff', padding: '8px 12px', borderRadius: 6 }}>
          {idx < QUESTIONS.length - 1 ? 'Next' : 'Submit'}
        </button>
      </div>
    </div>
  );
}
