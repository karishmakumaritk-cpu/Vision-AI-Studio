import './styles.css';

const app = document.querySelector('#app');

const PLAN_LIMITS = {
  starter: { workflows: 1, leads: 100, calls: 0, price: '₹1499/month' },
  growth: { workflows: 5, leads: 500, calls: 50, price: '₹3999/month' },
  pro: { workflows: 'Unlimited', leads: 'Unlimited', calls: 'Unlimited', price: '₹7999/month' }
};

const WORKFLOW_CATALOG = [
  { key: 'lead_capture', emoji: '🤖', name: 'Lead Capture Automation', desc: 'Lead Capture → Auto Reply → Follow-up → CRM Save' },
  { key: 'abandoned_cart', emoji: '🛒', name: 'Abandoned Cart Recovery', desc: 'Recover missed checkouts with reminders + offers' },
  { key: 'complaint_automation', emoji: '🎧', name: 'Complaint Automation', desc: 'Complaint Handling → Ticket + escalation workflow' },
  { key: 'whatsapp_order', emoji: '💬', name: 'WhatsApp Order Automation', desc: 'Order taking → Payment link → Invoice on WhatsApp' },
  { key: 'ai_voice', emoji: '📞', name: 'AI Voice Agent', desc: 'AI voice calls → Booking → Calendar update' },
  { key: 'instagram_dm', emoji: '📸', name: 'Instagram DM Automation', desc: 'DM auto-response → Lead save → Follow-up' }
];

function defaultState() {
  return {
    auth: null,
    selectedWorkflow: null,
    activeWorkflows: [],
    usage: { leads: 0, calls: 0, revenue: 0 },
    onboarding: null
  };
}

function getState() {
  return JSON.parse(localStorage.getItem('vision_saas_state') || JSON.stringify(defaultState()));
}

function setState(next) {
  localStorage.setItem('vision_saas_state', JSON.stringify(next));
}

function createTrial(email, fullName, plan = 'starter') {
  const now = Date.now();
  return {
    userId: `usr_${Math.random().toString(36).slice(2, 10)}`,
    email,
    fullName,
    plan,
    subscriptionStatus: 'trial_active',
    trialStartDate: now,
    trialEndDate: now + 24 * 60 * 60 * 1000,
    isTrialActive: true
  };
}

function trialMeta(auth) {
  if (!auth) return { isActive: false, remainingLabel: '0h 0m' };
  const diff = auth.trialEndDate - Date.now();
  if (diff <= 0) return { isActive: false, remainingLabel: 'Expired' };
  const h = Math.floor(diff / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { isActive: true, remainingLabel: `${h}h ${m}m` };
}

function nav() {
  return `<nav>
    <a class="logo" href="#/">
      <div class="logo-icon">⚡</div>
      <div><div class="logo-text">HerBalance AI</div><span class="logo-sub">Automation Studio</span></div>
    </a>
    <div class="nav-links">
      <a href="#/">Home</a>
      <a href="#/pricing">Pricing</a>
      <a href="#/workflows">Workflows</a>
      <a href="#/signup">Signup</a>
      <a href="#/login">Login</a>
    </div>
    <a class="nav-cta" href="#/signup">Start 1-Day Trial →</a>
  </nav>`;
}

function homePage() {
  return `${nav()}
  <div class="progress-bar" id="progressBar"></div>
  <div class="bg-orbs"><div class="orb orb1"></div><div class="orb orb2"></div><div class="orb orb3"></div></div>
  <div class="grid-bg"></div>
  <section class="hero">
    <div class="hero-inner">
      <div>
        <div class="hero-badge"><div class="badge-dot"></div> Workflow-based SaaS Automation</div>
        <h1 class="hero-title"><span class="line1">Stop manual ops.</span><br><span class="line2">Automate by workflow.</span><br><span class="line3">Scale with AI.</span></h1>
        <p class="hero-desc">User signup → 1-day trial active → workflow setup → dashboard tracking → upgrade on expiry.</p>
        <div class="hero-btns">
          <a class="btn-primary" href="#catalog">Choose Workflow ↓</a>
          <a class="btn-secondary" href="#/pricing">See Pricing</a>
        </div>
      </div>
      <div class="hero-card-wrap">
        <div class="hero-card">
          <div class="hero-card-header"><div class="card-title">Live Automation Stats</div></div>
          <div class="hero-stats-grid">
            <div class="hero-stat"><div class="stat-label">Leads Processed</div><div class="stat-value stat-v1">12,480</div></div>
            <div class="hero-stat"><div class="stat-label">Calls Handled</div><div class="stat-value stat-v2">3,240</div></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="catalog">
    <div class="catalog-header">
      <div class="section-label">Automation Catalog</div>
      <h2 class="section-title">Choose your workflow</h2>
    </div>
    <div class="catalog-grid">
      ${WORKFLOW_CATALOG.map((w) => `
      <article class="auto-card" data-workflow="${w.key}">
        <div class="card-body">
          <div class="card-sub">${w.emoji} ${w.name}</div>
          <div class="card-desc">${w.desc}</div>
          <button class="card-btn workflow-btn" data-workflow="${w.key}">Setup in Trial →</button>
        </div>
      </article>`).join('')}
    </div>
  </section>

  <section class="section" id="pricing">
    <div class="catalog-header"><h2 class="section-title">Workflow-based pricing</h2></div>
    <div class="pricing-grid">
      <article class="price-card">
        <div class="price-name">Starter Automation Plan</div>
        <div class="price-amount">₹1499<span>/month</span></div>
        <ul class="price-features">
          <li class="price-feat">✔ 1 workflow</li><li class="price-feat">✔ 100 leads/month</li><li class="price-feat">✔ Email automation</li><li class="price-feat">✔ Basic chatbot</li><li class="price-feat">✔ 1-day free trial</li>
        </ul>
      </article>
      <article class="price-card popular">
        <div class="price-badge">Popular</div>
        <div class="price-name">Growth Automation Plan</div>
        <div class="price-amount">₹3999<span>/month</span></div>
        <ul class="price-features">
          <li class="price-feat">✔ Up to 5 workflows</li><li class="price-feat">✔ 500 leads/month</li><li class="price-feat">✔ WhatsApp automation</li><li class="price-feat">✔ AI chatbot + CRM</li><li class="price-feat">✔ Voice integration (limited)</li>
        </ul>
      </article>
      <article class="price-card">
        <div class="price-name">Pro AI Business Plan</div>
        <div class="price-amount">₹7999<span>/month</span></div>
        <ul class="price-features">
          <li class="price-feat">✔ Unlimited workflows</li><li class="price-feat">✔ Full AI voice agent</li><li class="price-feat">✔ Advanced CRM</li><li class="price-feat">✔ Complaint automation</li><li class="price-feat">✔ 24/7 AI support</li>
        </ul>
      </article>
    </div>
  </section>`;
}

function authPage(type) {
  const isSignup = type === 'signup';
  return `${nav()}<section class="auth-shell"><div class="auth-card">
  <h2>${isSignup ? 'Create account' : 'Login'}</h2>
  <p>${isSignup ? 'Start your 1-day SaaS trial' : 'Access your dashboard and workflows'}</p>
  <form id="auth-form">
    ${isSignup ? '<input name="fullName" placeholder="Full name" required />' : ''}
    <input name="email" type="email" placeholder="Email" required />
    ${isSignup ? `<select name="plan"><option value="starter">Starter</option><option value="growth">Growth</option><option value="pro">Pro</option></select>` : ''}
    <button type="submit">${isSignup ? 'Activate 1-Day Trial' : 'Continue'}</button>
  </form>
  </div></section>`;
}

function dashboardPage() {
  const state = getState();
  const auth = state.auth;
  const trial = trialMeta(auth);
  return `${nav()}<section class="section"><h2 class="section-title">Dashboard</h2>
  <div class="grid cards3">
    <article class="card"><p>Account</p><h3>${auth?.email || 'Guest'}</h3><small>${auth?.plan || '-'}</small></article>
    <article class="card"><p>Trial Remaining</p><h3>${trial.remainingLabel}</h3><small>${trial.isActive ? 'Active' : 'Payment Required'}</small></article>
    <article class="card"><p>Automation Status</p><h3>${trial.isActive ? 'Active' : 'Paused'}</h3><small>${state.activeWorkflows.length} workflows</small></article>
  </div>
  <div class="card form-block">
    <h3>Master Client Data Form</h3>
    <div class="grid cards2">
      <div><h4>Basic Business Info</h4><ul><li>Business name</li><li>Industry</li><li>Website URL</li><li>WhatsApp number</li><li>Business email</li><li>Instagram page</li></ul></div>
      <div><h4>Lead Automation</h4><ul><li>Lead source</li><li>Follow-up delay</li><li>Follow-up tone</li><li>Offer details</li><li>Payment link</li></ul></div>
      <div><h4>WhatsApp Bot</h4><ul><li>Product list</li><li>Price list</li><li>Delivery time</li><li>FAQ</li><li>Refund policy</li></ul></div>
      <div><h4>Voice + Complaint</h4><ul><li>Business hours</li><li>Call script</li><li>Escalation number</li><li>Booking link</li><li>Complaint categories</li><li>Refund rules</li></ul></div>
    </div>
  </div>
  </section>`;
}

function route() {
  return location.hash.replace('#', '') || '/';
}

function bindHome() {
  document.querySelectorAll('.workflow-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const state = getState();
      state.selectedWorkflow = btn.dataset.workflow;
      setState(state);
      location.hash = '#/signup';
    });
  });

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const value = total > 0 ? (window.scrollY / total) * 100 : 0;
    const bar = document.querySelector('#progressBar');
    if (bar) bar.style.width = `${value}%`;
  }, { passive: true });
}

function bindAuth(type) {
  const form = document.querySelector('#auth-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const state = getState();

    if (type === 'signup') {
      state.auth = createTrial(data.get('email'), data.get('fullName'), data.get('plan'));
      if (state.selectedWorkflow && !state.activeWorkflows.includes(state.selectedWorkflow)) {
        state.activeWorkflows.push(state.selectedWorkflow);
      }
    } else if (state.auth?.email === data.get('email')) {
      // pass-through
    } else {
      state.auth = createTrial(data.get('email'), data.get('email').split('@')[0], 'starter');
    }

    setState(state);
    location.hash = '#/dashboard';
  });
}

function render() {
  const r = route();
  if (r === '/signup') {
    app.innerHTML = authPage('signup');
    bindAuth('signup');
  } else if (r === '/login') {
    app.innerHTML = authPage('login');
    bindAuth('login');
  } else if (r === '/dashboard') {
    app.innerHTML = dashboardPage();
  } else {
    app.innerHTML = homePage();
    bindHome();
    if (r === '/pricing') document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' });
    if (r === '/workflows') document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' });
  }
}

window.addEventListener('hashchange', render);
render();
