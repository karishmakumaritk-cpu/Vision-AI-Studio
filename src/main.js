import './styles.css';

const app = document.querySelector('#app');

const PLANS = [
  {
    key: 'starter',
    name: 'Starter Automation Plan',
    price: '₹1499/month',
    badge: '1-day free trial',
    features: ['1 workflow', '100 leads/month', 'Email automation', 'Basic chatbot']
  },
  {
    key: 'growth',
    name: 'Growth Automation Plan',
    price: '₹3999/month',
    badge: 'Popular for scaling teams',
    features: [
      'Up to 5 workflows',
      '500 leads/month',
      'WhatsApp automation',
      'AI chatbot + CRM',
      'Voice call integration (limited)'
    ]
  },
  {
    key: 'pro',
    name: 'Pro AI Business Plan',
    price: '₹7999/month',
    badge: 'Best for AI-first businesses',
    features: [
      'Unlimited workflows',
      'Full AI Voice Agent',
      'Advanced CRM',
      'AI follow-up system',
      'Complaint automation',
      '24/7 AI support'
    ]
  }
];

const WORKFLOWS = [
  'Lead Capture → Auto Reply → Follow-up → CRM Save',
  'Abandoned Cart Recovery',
  'Complaint Handling → Ticket System',
  'WhatsApp Order Taking → Payment Link → Invoice',
  'AI Voice Agent → Booking → Calendar Update',
  'Instagram DM → Lead Save → Follow-up'
];

const USE_CASES = ['E-commerce', 'Coaching', 'Salon', 'Real Estate', 'Agency'];

function getState() {
  return JSON.parse(
    localStorage.getItem('vision_saas_state') ||
      JSON.stringify({
        user: null,
        usage: { leads: 128, calls: 42, revenue: 78000 },
        workflowsActive: 2,
        subscriptionStatus: 'trial'
      })
  );
}

function saveState(next) {
  localStorage.setItem('vision_saas_state', JSON.stringify(next));
}

function startTrial(email, plan) {
  const now = Date.now();
  const state = getState();
  const next = {
    ...state,
    user: {
      userId: `usr_${Math.random().toString(36).slice(2, 10)}`,
      email,
      plan,
      trialStartDate: now,
      trialEndDate: now + 24 * 60 * 60 * 1000,
      isTrialActive: true,
      subscriptionStatus: 'trial_active'
    }
  };
  saveState(next);
  navigate('/dashboard');
}

function getTrialMeta(user) {
  if (!user) return { active: false, remaining: '0h' };
  const diff = user.trialEndDate - Date.now();
  if (diff <= 0) return { active: false, remaining: 'Expired' };
  const hours = Math.ceil(diff / (1000 * 60 * 60));
  return { active: true, remaining: `${hours}h` };
}

function navigate(path) {
  location.hash = `#${path}`;
}

function header() {
  return `
    <header class="topbar">
      <div class="logo">Vision AI Studio</div>
      <nav>
        <a href="#/">Home</a>
        <a href="#/pricing">Pricing</a>
        <a href="#/workflows">Workflows</a>
        <a href="#/demo">Demo</a>
        <a href="#/login" class="btn ghost">Login</a>
        <a href="#/signup" class="btn">Start 1-day trial</a>
      </nav>
    </header>
  `;
}

function homePage() {
  return `
    ${header()}
    <section class="hero">
      <p class="eyebrow">Workflow-based AI Automation SaaS</p>
      <h1>Build automation systems, not one-off tools.</h1>
      <p>Signup → trial for 24 hours → go live with workflows → upgrade when ready.</p>
      <div class="cta-row">
        <a class="btn" href="#/signup">Start Free Trial</a>
        <a class="btn ghost" href="#/demo">See Workflow Demo</a>
      </div>
    </section>

    <section id="pricing">
      <h2>Professional SaaS Pricing</h2>
      <div class="grid three">
        ${PLANS.map(
          (plan) => `
          <article class="card plan">
            <p class="tag">${plan.badge}</p>
            <h3>${plan.name}</h3>
            <p class="price">${plan.price}</p>
            <ul>${plan.features.map((f) => `<li>${f}</li>`).join('')}</ul>
            <a href="#/signup" class="btn full">Choose ${plan.name.split(' ')[0]}</a>
          </article>`
        ).join('')}
      </div>
    </section>

    <section id="how-it-works">
      <h2>How It Works</h2>
      <div class="grid three">
        <article class="card"><h3>1. Select Workflow</h3><p>Choose lead capture, recovery, complaint, or voice workflow.</p></article>
        <article class="card"><h3>2. Fill Business Details</h3><p>Submit onboarding form so AI can align messaging and process.</p></article>
        <article class="card"><h3>3. AI Activates Automation</h3><p>n8n + APIs execute daily operations, tracked from dashboard.</p></article>
      </div>
    </section>

    <section id="workflows">
      <h2>Essential Automation Workflows</h2>
      <div class="card">
        <ul>${WORKFLOWS.map((w) => `<li>${w}</li>`).join('')}</ul>
      </div>
    </section>

    <section id="use-cases">
      <h2>Use Cases</h2>
      <div class="chips">${USE_CASES.map((u) => `<span>${u}</span>`).join('')}</div>
    </section>

    <section id="demo">
      <h2>Live Demo Preview</h2>
      <div class="card demo">
        <p><strong>See Workflow Demo:</strong> Lead from Instagram DM auto-saved to CRM, follow-up sent in 5 minutes, and status tracked in dashboard.</p>
        <p class="mono">Frontend (Vercel) → Backend API (Render) → Supabase DB → n8n → WhatsApp/Email/Voice APIs</p>
      </div>
    </section>

    <section id="usage">
      <h2>Usage Meter</h2>
      <div class="grid three">
        <div class="card stat"><p>Leads Processed</p><h3>12,480</h3></div>
        <div class="card stat"><p>Calls Handled</p><h3>3,240</h3></div>
        <div class="card stat"><p>Revenue Generated</p><h3>₹18.7L</h3></div>
      </div>
    </section>
  `;
}

function signupPage() {
  return `
    ${header()}
    <section class="narrow">
      <h2>Create account and start 1-day trial</h2>
      <form id="signup-form" class="card form">
        <label>Email <input required name="email" type="email" placeholder="founder@brand.com" /></label>
        <label>Plan
          <select name="plan">
            ${PLANS.map((plan) => `<option value="${plan.key}">${plan.name}</option>`).join('')}
          </select>
        </label>
        <button class="btn" type="submit">Activate Trial</button>
      </form>
    </section>
  `;
}

function loginPage() {
  return `
    ${header()}
    <section class="narrow">
      <h2>Login with magic-link style flow (UI placeholder)</h2>
      <form id="login-form" class="card form">
        <label>Email <input required name="email" type="email" placeholder="you@company.com" /></label>
        <button class="btn" type="submit">Continue to Dashboard</button>
      </form>
    </section>
  `;
}

function onboardingForm() {
  return `
    <div class="card">
      <h3>Master Client Data Form</h3>
      <div class="grid two small-text">
        <div>
          <h4>Basic Business Info</h4>
          <ul><li>Business name</li><li>Industry</li><li>Website URL</li><li>WhatsApp number</li><li>Business email</li><li>Instagram page</li></ul>
        </div>
        <div>
          <h4>Lead Automation</h4>
          <ul><li>Lead source</li><li>Follow-up delay</li><li>Follow-up tone</li><li>Offer details</li><li>Payment link</li></ul>
        </div>
        <div>
          <h4>WhatsApp Bot</h4>
          <ul><li>Product list</li><li>Price list</li><li>Delivery time</li><li>FAQ</li><li>Refund policy</li></ul>
        </div>
        <div>
          <h4>Voice & Complaint Automation</h4>
          <ul><li>Business hours</li><li>Call script</li><li>Escalation number</li><li>Booking calendar</li><li>Complaint categories</li><li>Refund rules</li></ul>
        </div>
      </div>
    </div>
  `;
}

function dashboardPage() {
  const state = getState();
  const user = state.user;
  const trial = getTrialMeta(user);
  const workflowStatus = trial.active ? 'Active' : 'Paused';

  return `
    ${header()}
    <section>
      <h2>SaaS Dashboard</h2>
      <div class="grid three">
        <article class="card"><p>Account</p><h3>${user?.email || 'Guest'}</h3><p>${user?.plan || '-'}</p></article>
        <article class="card"><p>Trial Remaining</p><h3>${trial.remaining}</h3><p>${trial.active ? 'Trial Active' : 'Payment Required'}</p></article>
        <article class="card"><p>Automation Status</p><h3>${workflowStatus}</h3><p>${state.workflowsActive} workflows connected</p></article>
      </div>
      <div class="grid three">
        <article class="card"><p>Leads</p><h3>${state.usage.leads}</h3></article>
        <article class="card"><p>Calls</p><h3>${state.usage.calls}</h3></article>
        <article class="card"><p>Revenue</p><h3>₹${state.usage.revenue.toLocaleString('en-IN')}</h3></article>
      </div>
      ${!trial.active ? '<div class="card danger"><strong>Trial expired.</strong> Upgrade to reactivate workflows.</div>' : ''}
      <div class="cta-row"><a href="#/pricing" class="btn">Upgrade Plan</a><a href="#/" class="btn ghost">Back to Home</a></div>
      ${onboardingForm()}
    </section>
  `;
}

function bindEvents(route) {
  if (route === '/signup') {
    document.querySelector('#signup-form')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(event.target);
      startTrial(data.get('email'), data.get('plan'));
    });
  }

  if (route === '/login') {
    document.querySelector('#login-form')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(event.target);
      const state = getState();
      if (!state.user) {
        startTrial(data.get('email'), 'starter');
      } else {
        navigate('/dashboard');
      }
    });
  }
}

function render() {
  const route = location.hash.replace('#', '') || '/';

  if (route === '/signup') {
    app.innerHTML = signupPage();
  } else if (route === '/login') {
    app.innerHTML = loginPage();
  } else if (route === '/dashboard') {
    app.innerHTML = dashboardPage();
  } else {
    app.innerHTML = homePage();
    if (route === '/pricing') document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (route === '/workflows') document.querySelector('#workflows')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (route === '/demo') document.querySelector('#demo')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  bindEvents(route);
}

window.addEventListener('hashchange', render);
render();
