import './styles.css';

const app = document.querySelector('#app');

const SERVICES = [
  {
    title: 'AI Lead Engine',
    blurb: 'Instagram, Meta aur website leads ko auto-capture karke CRM me push karta hai.'
  },
  {
    title: 'WhatsApp Automation',
    blurb: 'Instant reply, follow-ups, payment nudges aur appointment reminders without manual effort.'
  },
  {
    title: 'Voice AI Receptionist',
    blurb: '24x7 incoming calls handle karta hai, booking leta hai aur qualified leads team ko deta hai.'
  },
  {
    title: 'Sales Pipeline Setup',
    blurb: 'Custom stages, reminders aur dashboard jisse founder ko clear growth visibility mile.'
  }
];

const PROCESS = [
  'Strategy call: business model, audience aur bottlenecks samajhna',
  'Workflow mapping: lead-to-sale journey ka full architecture design',
  'Automation build: integrations, bots, CRM aur campaign setup',
  'Go-live + optimization: reporting, fixes aur weekly improvements'
];

const PACKAGES = [
  { name: 'Starter', price: '₹19,999', points: ['1 core workflow', 'WhatsApp starter bot', 'Basic CRM pipeline'] },
  { name: 'Growth', price: '₹49,999', points: ['Up to 4 workflows', 'Lead + follow-up automation', 'Team dashboard + reports'] },
  { name: 'Scale', price: '₹99,999', points: ['Full funnel automation', 'Voice AI + escalation setup', 'Priority support + optimization'] }
];

const FAQS = [
  {
    q: 'Setup me kitna time lagta hai?',
    a: 'Most projects 5-14 days me live ho jate hain, complexity ke hisaab se.'
  },
  {
    q: 'Kya existing tools ke saath connect ho sakta hai?',
    a: 'Haan, Meta, WhatsApp APIs, CRMs, forms, sheets, n8n, aur custom webhooks support karte hain.'
  },
  {
    q: 'Monthly support milta hai?',
    a: 'Yes. Monitoring, updates aur performance improvements ke liye retainers available hain.'
  }
];

function getLeads() {
  return JSON.parse(localStorage.getItem('vision_ai_leads') || '[]');
}

function saveLead(lead) {
  const leads = getLeads();
  const next = [...leads, { ...lead, createdAt: new Date().toISOString() }];
  localStorage.setItem('vision_ai_leads', JSON.stringify(next));
}

function navigate(path) {
  location.hash = `#${path}`;
}

function header() {
  return `
    <header class="topbar">
      <a href="#/" class="brand">Vision AI Studio</a>
      <nav>
        <a href="#/services">Services</a>
        <a href="#/process">Process</a>
        <a href="#/pricing">Pricing</a>
        <a href="#/faq">FAQ</a>
        <a href="#/contact" class="btn">Book Free Call</a>
      </nav>
    </header>
  `;
}

function homePage() {
  return `
    ${header()}

    <section class="hero">
      <p class="eyebrow">Tixu-style AI Automation Agency Experience</p>
      <h1>Hum aapke business ke liye <span>AI systems</span> banate hain, sirf chatbots nahi.</h1>
      <p class="sub">Lead capture se sale close tak poora flow automate. Faster response, better conversion, less manual chaos.</p>
      <div class="cta-row">
        <a class="btn" href="#/contact">Start Project</a>
        <a class="btn ghost" href="#/process">How we work</a>
      </div>
      <div class="trust-strip">
        <span>Meta Ads</span><span>WhatsApp API</span><span>n8n</span><span>Supabase</span><span>Custom CRM</span>
      </div>
    </section>

    <section id="services">
      <h2>Core Services</h2>
      <div class="grid two">
        ${SERVICES.map((s) => `<article class="card"><h3>${s.title}</h3><p>${s.blurb}</p></article>`).join('')}
      </div>
    </section>

    <section id="process">
      <h2>Execution Process</h2>
      <div class="grid two">
        ${PROCESS.map((step, idx) => `<article class="card process"><p class="step">Step ${idx + 1}</p><p>${step}</p></article>`).join('')}
      </div>
    </section>

    <section id="pricing">
      <h2>Project Packages</h2>
      <div class="grid three">
        ${PACKAGES.map((plan) => `
          <article class="card plan">
            <h3>${plan.name}</h3>
            <p class="price">${plan.price}</p>
            <ul>${plan.points.map((point) => `<li>${point}</li>`).join('')}</ul>
            <a href="#/contact" class="btn full">Choose ${plan.name}</a>
          </article>
        `).join('')}
      </div>
    </section>

    <section class="card testimonial">
      <p>"Lead response time 2 ghante se 2 minute par aa gaya. Sales team ab sirf qualified leads par focus karti hai."</p>
      <strong>— D2C Founder, Gurgaon</strong>
    </section>

    <section id="faq">
      <h2>Frequently Asked Questions</h2>
      <div class="grid two">
        ${FAQS.map((item) => `<article class="card"><h3>${item.q}</h3><p>${item.a}</p></article>`).join('')}
      </div>
    </section>

    <section class="cta-final card">
      <h2>Ready to build your AI growth engine?</h2>
      <p>Free audit call me hum aapke current flow ka bottleneck nikaal kar 30-day automation plan denge.</p>
      <a class="btn" href="#/contact">Book Free Strategy Call</a>
    </section>
  `;
}

function contactPage() {
  return `
    ${header()}
    <section class="narrow">
      <h2>Book a Free Strategy Call</h2>
      <p>Basic details bhejiye, hum 24 hours ke andar roadmap share karenge.</p>
      <form id="lead-form" class="card form">
        <label>Name <input required name="name" type="text" placeholder="Aman Sharma" /></label>
        <label>Email <input required name="email" type="email" placeholder="founder@brand.com" /></label>
        <label>Business Type <input required name="business" type="text" placeholder="D2C Skincare" /></label>
        <label>Monthly Leads <input required name="leads" type="number" min="0" placeholder="500" /></label>
        <label>Main Goal
          <select name="goal">
            <option value="Lead automation">Lead automation</option>
            <option value="Sales follow-up">Sales follow-up</option>
            <option value="Support automation">Support automation</option>
            <option value="Voice AI setup">Voice AI setup</option>
          </select>
        </label>
        <button class="btn" type="submit">Submit & Get Call Back</button>
      </form>
    </section>
  `;
}

function thankYouPage() {
  const totalLeads = getLeads().length;
  return `
    ${header()}
    <section class="narrow card thanks">
      <h2>Thanks! Request received ✅</h2>
      <p>Team Vision AI Studio aapse jald contact karegi.</p>
      <p class="small">Demo submissions saved in localStorage: <strong>${totalLeads}</strong></p>
      <a class="btn" href="#/">Back to Home</a>
    </section>
  `;
}

function bindEvents(route) {
  if (route === '/contact') {
    document.querySelector('#lead-form')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(event.target);
      saveLead({
        name: data.get('name'),
        email: data.get('email'),
        business: data.get('business'),
        leads: Number(data.get('leads')),
        goal: data.get('goal')
      });
      navigate('/thanks');
    });
  }
}

function render() {
  const route = location.hash.replace('#', '') || '/';

  if (route === '/contact') {
    app.innerHTML = contactPage();
  } else if (route === '/thanks') {
    app.innerHTML = thankYouPage();
  } else {
    app.innerHTML = homePage();
    if (route === '/services') document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
    if (route === '/process') document.querySelector('#process')?.scrollIntoView({ behavior: 'smooth' });
    if (route === '/pricing') document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' });
    if (route === '/faq') document.querySelector('#faq')?.scrollIntoView({ behavior: 'smooth' });
  }

  bindEvents(route);
}

window.addEventListener('hashchange', render);
render();
