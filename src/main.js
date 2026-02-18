import './styles.css';

const app = document.querySelector('#app');
const API_BASE = (import.meta.env.VITE_API_URL || 'https://vision-ai-studio-backend.onrender.com/api').replace(/\/$/, '');

const PLANS = {
  starter: { name: 'Starter Automation Plan', price: '₹1499/month', workflows: 1, leads: 100 },
  growth: { name: 'Growth Automation Plan', price: '₹3999/month', workflows: 5, leads: 500 },
  pro: { name: 'Pro AI Business Plan', price: '₹7999/month', workflows: 999, leads: 9999 }
};

const WORKFLOWS = [
  {
    key: 'lead-capture',
    name: 'Lead Capture Automation',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200',
    flow: 'Lead Capture → Auto Reply → Follow-up → CRM Save',
    fields: ['Business Name', 'Lead Source', 'Follow-up Delay', 'Support Email', 'WhatsApp Number']
  },
  {
    key: 'abandoned-cart',
    name: 'Abandoned Cart Recovery',
    image: 'https://political-sapphire-zd6iectvki.edgeone.app/ChatGPT%20Image%20Feb%2017,%202026,%2005_25_50%20AM.png',
    flow: 'Cart Add → Checkout Drop → Reminder + Offer',
    fields: ['Store URL', 'Cart Timeout (minutes)', 'Discount Code', 'Reminder Channel', 'Payment URL']
  },
  {
    key: 'complaint-automation',
    name: 'Complaint Automation',
    image: 'https://faithful-chocolate-dzyoznjmbr.edgeone.app/ChatGPT%20Image%20Feb%2017,%202026,%2005_25_43%20AM.png',
    flow: 'Complaint → Ticket → Escalation → Resolve',
    fields: ['Complaint Categories', 'Support Team Email', 'Escalation Email', 'SLA Hours', 'Refund Rules']
  },
  {
    key: 'whatsapp-order',
    name: 'WhatsApp Order Automation',
    image: 'https://hurt-blush-q0h9krbl7b.edgeone.app/ChatGPT%20Image%20Feb%2017,%202026,%2005_26_15%20AM.png',
    flow: 'Order → Payment Link → Invoice → Confirmation',
    fields: ['WhatsApp Number', 'Product Catalog URL', 'Payment Gateway', 'Invoice Email', 'Delivery Timeline']
  },
  {
    key: 'ai-voice-agent',
    name: 'AI Voice Agent',
    image: 'https://main-salmon-8whhceuspr.edgeone.app/Feb%2017,%202026,%2005_26_06%20AM.png',
    flow: 'Call → Conversation → Booking → Calendar Update',
    fields: ['Business Hours', 'Call Script', 'Escalation Number', 'Calendar Link', 'Language']
  },
  {
    key: 'instagram-dm',
    name: 'Instagram DM Automation',
    image: 'https://general-plum-2ygqdbt7ru.edgeone.app/ChatGPT%20Image%20Feb%2017,%202026,%2005_26_19%20AM.png',
    flow: 'DM → Auto Reply → Lead Save → Follow-up',
    fields: ['Instagram Handle', 'Reply Tone', 'Lead Form Link', 'Follow-up Delay', 'Offer Message']
  }
];

const ACTION_MAP = {
  'lead-capture': ['Form submitted', 'Auto email sent', 'WhatsApp confirmation sent', 'Lead saved to CRM', 'Follow-up reminder scheduled'],
  'abandoned-cart': ['Cart session tracked', 'Email reminder sent', 'WhatsApp reminder sent', 'Discount shared', 'Recovery status updated'],
  'complaint-automation': ['Complaint received', 'Ticket created', 'Support notified', 'Escalation timer started', 'Resolution workflow triggered'],
  'whatsapp-order': ['Order intent captured', 'Product menu shared', 'Payment link generated', 'Invoice generated', 'Order confirmation sent'],
  'ai-voice-agent': ['Incoming call accepted', 'Intent recognized', 'Booking slot selected', 'Calendar updated', 'Confirmation message sent'],
  'instagram-dm': ['DM intent detected', 'Auto reply sent', 'Lead details requested', 'Lead saved', 'Follow-up queued']
};

function seed() {
  return {
    auth: null,
    selectedWorkflow: null,
    activeWorkflows: [],
    logs: [],
    usage: { leads: 0, calls: 0, automations: 0 }
  };
}

function state() {
  return JSON.parse(localStorage.getItem('vision_saas_state') || JSON.stringify(seed()));
}

function save(next) {
  localStorage.setItem('vision_saas_state', JSON.stringify(next));
}

function trialInfo(auth) {
  if (!auth) return { active: false, label: 'Not Started' };
  const remaining = auth.trialEnd - Date.now();
  if (remaining <= 0) return { active: false, label: 'Expired' };
  const h = Math.floor(remaining / (1000 * 60 * 60));
  const m = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  return { active: true, label: `${h}h ${m}m` };
}


function visualChrome() {
  return `<div class="progress-bar" id="progressBar"></div>
  <div class="bg-orbs"><div class="orb orb1"></div><div class="orb orb2"></div><div class="orb orb3"></div></div>
  <div class="grid-bg"></div>`;
}

function withChrome(content) {
  return `${visualChrome()}${content}`;
}

function updateProgressBar() {
  const el = document.querySelector('#progressBar');
  if (!el) return;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
  el.style.width = `${Math.max(0, Math.min(100, pct))}%`;
}

function header() {
  return `<nav>
    <a class="logo" href="#/">Vision-AI-Studio</a>
    <div class="nav-links">
      <a href="#/">Home</a>
      <a href="#/pricing">Pricing</a>
      <a href="#/workflows">Workflows</a>
      <a href="#/signup">Signup</a>
      <a href="#/login">Login</a>
      <a href="#/dashboard">Dashboard</a>
    </div>
  </nav>`;
}

function home() {
  return withChrome(`${header()}
  <section class="hero">
    <h1>Automation SaaS Platform</h1>
    <p>Workflow-based pricing, 1-day trial, signup/login, activation and dashboard control.</p>
    <div class="actions"><a class="btn" href="#/workflows">Choose Workflow</a><a class="btn ghost" href="#/pricing">View Pricing</a></div>
  </section>
  ${workflowCatalog()}`);
}

function workflowCatalog() {
  return `<section class="section"><h2>Automation Workflows</h2><div class="grid">${WORKFLOWS.map((w) => `
  <article class="card wf">
    <img src="${w.image}" alt="${w.name}" loading="lazy" />
    <h3>${w.name}</h3>
    <p>${w.flow}</p>
    <a class="btn" href="#/workflow/${w.key}">Configure Workflow</a>
  </article>`).join('')}</div></section>`;
}

function pricing() {
  return withChrome(`${header()}<section class="section"><h2>Workflow-based Pricing</h2><div class="grid plans">
  ${Object.entries(PLANS).map(([key, p]) => `<article class="card"><h3>${p.name}</h3><p class="price">${p.price}</p><ul>
  <li>${p.workflows === 999 ? 'Unlimited workflows' : `${p.workflows} workflow${p.workflows > 1 ? 's' : ''}`}</li>
  <li>${p.leads} leads/month</li><li>Feature-tier access</li><li>1-day free trial</li></ul><a class="btn" href="#/signup">Start ${key}</a></article>`).join('')}
  </div></section>`);
}

function authPage(type) {
  const signup = type === 'signup';
  return withChrome(`${header()}<section class="section auth"><div class="card auth-card"><h2>${signup ? 'Signup' : 'Login'}</h2>
  <p class="muted">Use password, OTP (email/phone), or Google option.</p>
  <div class="auth-tabs">
    <button class="btn ghost auth-tab active" data-auth-tab="password" type="button">Password</button>
    <button class="btn ghost auth-tab" data-auth-tab="otp" type="button">OTP</button>
    <button class="btn ghost auth-tab" data-auth-tab="google" type="button">Google</button>
  </div>
  <p id="auth-msg" class="auth-msg"></p>

  <form id="auth-form-password" class="form auth-form-panel" data-panel="password">
    ${signup ? '<input required name="name" placeholder="Full Name" />' : ''}
    <input required type="email" name="email" placeholder="Email" />
    ${signup ? '<input name="phone" placeholder="Phone (optional)" />' : ''}
    <input required type="password" name="password" placeholder="Password" />
    ${signup ? '<select name="plan"><option value="starter">Starter</option><option value="growth">Growth</option><option value="pro">Pro</option></select>' : ''}
    <button class="btn" type="submit">${signup ? 'Create Account' : 'Login'}</button>
  </form>

  <form id="auth-form-otp" class="form auth-form-panel hidden" data-panel="otp">
    <select name="method"><option value="email">Email OTP</option><option value="phone">Phone OTP</option></select>
    <input name="target" placeholder="Email or Phone" required />
    ${signup ? '<input name="name" placeholder="Full Name (for new account)" />' : ''}
    ${signup ? '<select name="plan"><option value="starter">Starter</option><option value="growth">Growth</option><option value="pro">Pro</option></select>' : ''}
    <div class="auth-otp-row"><button class="btn ghost" type="button" id="send-otp-btn">Send OTP</button><input name="otp" placeholder="Enter OTP" /></div>
    <button class="btn" type="submit">Verify OTP</button>
  </form>

  <form id="auth-form-google" class="form auth-form-panel hidden" data-panel="google">
    <p class="muted">Google login button is ready. Backend OAuth config required.</p>
    <button class="btn" type="button" id="google-login-btn">Continue with Google</button>
  </form>

  </div></section>`);
}

function workflowSetup(key) {
  const workflow = WORKFLOWS.find((w) => w.key === key);
  if (!workflow) return withChrome(`${header()}<section class="section"><p>Workflow not found.</p></section>`);
  return withChrome(`${header()}<section class="section"><div class="card"><h2>${workflow.name}</h2><p>${workflow.flow}</p>
  <form id="workflow-form" class="form">
    ${workflow.fields.map((f) => `<input required name="${f}" placeholder="${f}" />`).join('')}
    <button class="btn" type="submit">Activate Workflow</button>
  </form></div></section>`);
}

function dashboard() {
  const s = state();
  const t = trialInfo(s.auth);
  const active = s.activeWorkflows;
  return withChrome(`${header()}<section class="section"><h2>Dashboard</h2>
  <div class="grid stats">
    <div class="card"><p>Trial</p><h3>${t.label}</h3></div>
    <div class="card"><p>Active Workflows</p><h3>${active.length}</h3></div>
    <div class="card"><p>Leads</p><h3>${s.usage.leads}</h3></div>
    <div class="card"><p>Calls</p><h3>${s.usage.calls}</h3></div>
  </div>
  <div class="card"><h3>Active Automation Controls</h3>
  ${active.length ? active.map((key) => {
    const w = WORKFLOWS.find((x) => x.key === key);
    return `<div class="row"><div><strong>${w.name}</strong><p>${w.flow}</p></div><button class="btn run-btn" data-key="${key}">Run Test Action</button></div>`;
  }).join('') : '<p>No active workflows yet. Configure from workflow page.</p>'}
  </div>
  <div class="card"><h3>Execution Logs</h3><ul>${s.logs.slice(-10).reverse().map((l) => `<li>${l}</li>`).join('') || '<li>No actions yet.</li>'}</ul></div>
  <div class="card"><h3>Master Client Data Form Requirements</h3><ul>
    <li>Business info: name, industry, website, WhatsApp, business email, Instagram page</li>
    <li>Lead workflow: source, follow-up delay, tone, offer details, payment link</li>
    <li>WhatsApp bot: product list, price list, delivery time, FAQ, refund policy</li>
    <li>Voice agent: business hours, script, escalation number, calendar link</li>
    <li>Complaint automation: complaint categories, tracking, refund rules</li>
  </ul></div>
  </section>`);
}

function currentRoute() {
  return location.hash.replace('#', '') || '/';
}

function activateWorkflow(workflowKey, payload) {
  const s = state();
  const ti = trialInfo(s.auth);
  if (!ti.active) return { ok: false, msg: 'Trial expired or login required. Please upgrade/login.' };

  const plan = s.auth.plan || 'starter';
  const limit = PLANS[plan].workflows;
  if (!s.activeWorkflows.includes(workflowKey) && s.activeWorkflows.length >= limit) {
    return { ok: false, msg: `Plan limit reached. ${PLANS[plan].name} allows ${limit} workflows.` };
  }

  if (!s.activeWorkflows.includes(workflowKey)) s.activeWorkflows.push(workflowKey);
  s.usage.automations = s.activeWorkflows.length;
  s.logs.push(`[${new Date().toLocaleString()}] ${workflowKey} configured with ${Object.keys(payload).length} fields`);
  save(s);
  return { ok: true };
}

function runWorkflowAction(workflowKey) {
  const s = state();
  const steps = ACTION_MAP[workflowKey] || ['Workflow action executed'];
  const pick = steps[Math.floor(Math.random() * steps.length)];
  if (workflowKey === 'lead-capture' || workflowKey === 'instagram-dm') s.usage.leads += 1;
  if (workflowKey === 'ai-voice-agent') s.usage.calls += 1;
  s.logs.push(`[${new Date().toLocaleString()}] ${pick}`);
  save(s);
  render();
}

function bind() {
  const route = currentRoute();

  const authMsg = document.querySelector('#auth-msg');
  const setAuthMsg = (text, isError = false) => {
    if (!authMsg) return;
    authMsg.textContent = text || '';
    authMsg.classList.toggle('error', isError);
  };

  document.querySelectorAll('.auth-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.auth-tab').forEach((x) => x.classList.remove('active'));
      tab.classList.add('active');
      const panel = tab.dataset.authTab;
      document.querySelectorAll('.auth-form-panel').forEach((p) => {
        p.classList.toggle('hidden', p.dataset.panel != panel);
      });
      setAuthMsg('');
    });
  });

  const passwordForm = document.querySelector('#auth-form-password');
  if (passwordForm) {
    passwordForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      setAuthMsg('Please wait...');
      const d = new FormData(passwordForm);
      const payload = route === '/signup'
        ? {
          full_name: d.get('name'),
          email: d.get('email'),
          phone: d.get('phone') || null,
          password: d.get('password'),
          business_type: 'General'
        }
        : { email: d.get('email'), password: d.get('password') };

      try {
        const endpoint = route === '/signup' ? '/auth/signup' : '/auth/login';
        const res = await fetch(`${API_BASE}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || 'Authentication failed');

        const s = state();
        const sub = data.data.subscription || {};
        s.auth = {
          token: data.data.token,
          userId: data.data.user.id,
          name: data.data.user.full_name,
          email: data.data.user.email,
          phone: data.data.user.phone || null,
          plan: sub.plan_name || d.get('plan') || 'trial',
          trialStart: sub.trial_start ? new Date(sub.trial_start).getTime() : Date.now(),
          trialEnd: sub.trial_end ? new Date(sub.trial_end).getTime() : (Date.now() + 24 * 60 * 60 * 1000)
        };
        save(s);
        location.hash = '#/dashboard';
      } catch (err) {
        setAuthMsg(err.message, true);
      }
    });
  }

  const otpForm = document.querySelector('#auth-form-otp');
  const sendOtpBtn = document.querySelector('#send-otp-btn');
  if (otpForm && sendOtpBtn) {
    sendOtpBtn.addEventListener('click', async () => {
      const d = new FormData(otpForm);
      const method = String(d.get('method'));
      const target = String(d.get('target') || '').trim();
      if (!target) return setAuthMsg('Email/Phone required for OTP.', true);
      setAuthMsg('Sending OTP...');
      try {
        const payload = method === 'email' ? { method, email: target } : { method, phone: target };
        const res = await fetch(`${API_BASE}/auth/request-otp`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || 'Failed to send OTP');
        setAuthMsg(`OTP sent. Dev OTP: ${data.dev_otp}`);
      } catch (err) {
        setAuthMsg(err.message, true);
      }
    });

    otpForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const d = new FormData(otpForm);
      const method = String(d.get('method'));
      const target = String(d.get('target') || '').trim();
      const otp = String(d.get('otp') || '').trim();
      if (!target || !otp) return setAuthMsg('Target and OTP required.', true);
      setAuthMsg('Verifying OTP...');
      try {
        const payload = {
          method,
          otp,
          full_name: d.get('name') || undefined,
          plan: d.get('plan') || 'starter'
        };
        if (method === 'email') payload.email = target;
        else payload.phone = target;

        const res = await fetch(`${API_BASE}/auth/verify-otp`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error || 'OTP verify failed');

        const s = state();
        const sub = data.data.subscription || {};
        s.auth = {
          token: data.data.token,
          userId: data.data.user.id,
          name: data.data.user.full_name,
          email: data.data.user.email,
          phone: data.data.user.phone || null,
          plan: sub.plan_name || d.get('plan') || 'trial',
          trialStart: sub.trial_start ? new Date(sub.trial_start).getTime() : Date.now(),
          trialEnd: sub.trial_end ? new Date(sub.trial_end).getTime() : (Date.now() + 24 * 60 * 60 * 1000)
        };
        save(s);
        location.hash = '#/dashboard';
      } catch (err) {
        setAuthMsg(err.message, true);
      }
    });
  }

  const googleBtn = document.querySelector('#google-login-btn');
  if (googleBtn) {
    googleBtn.addEventListener('click', async () => {
      setAuthMsg('Checking Google auth...');
      try {
        const res = await fetch(`${API_BASE}/auth/google`, { method: 'POST' });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Google login is not available yet');
      } catch (err) {
        setAuthMsg(err.message, true);
      }
    });
  }

  const workflowForm = document.querySelector('#workflow-form');
  if (workflowForm) {
    workflowForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const key = route.split('/')[2];
      const payload = Object.fromEntries(new FormData(workflowForm).entries());
      const result = activateWorkflow(key, payload);
      if (!result.ok) {
        alert(result.msg);
        return;
      }
      location.hash = '#/dashboard';
    });
  }

  document.querySelectorAll('.run-btn').forEach((btn) => {
    btn.addEventListener('click', () => runWorkflowAction(btn.dataset.key));
  });
}

function render() {
  const route = currentRoute();
  if (route === '/pricing') app.innerHTML = pricing();
  else if (route === '/workflows') app.innerHTML = withChrome(`${header()}${workflowCatalog()}`);
  else if (route === '/signup') app.innerHTML = authPage('signup');
  else if (route === '/login') app.innerHTML = authPage('login');
  else if (route === '/dashboard') app.innerHTML = dashboard();
  else if (route.startsWith('/workflow/')) app.innerHTML = workflowSetup(route.split('/')[2]);
  else app.innerHTML = home();
  bind();
  updateProgressBar();
}

window.addEventListener('hashchange', render);
render();

window.addEventListener('scroll', updateProgressBar);
