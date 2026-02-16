const AUTOMATIONS = [
  {
    id: 'instagram_growth',
    title: 'Instagram Growth',
    description: 'Generate reel ideas, captions, hashtags, and engagement actions.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&q=80&auto=format&fit=crop',
    tag: 'Social'
  },
  {
    id: 'whatsapp_bot',
    title: 'WhatsApp Auto-Reply',
    description: 'Handle common questions, order updates, and appointment requests.',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&q=80&auto=format&fit=crop',
    tag: 'Communication'
  },
  {
    id: 'voice_assistant',
    title: 'AI Voice Assistant',
    description: 'Capture calls, answer FAQs, and qualify leads automatically.',
    image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=900&q=80&auto=format&fit=crop',
    tag: 'Support'
  },
  {
    id: 'email_automation',
    title: 'Email Automation',
    description: 'Classify inbox items, generate replies, and send follow-ups.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=900&q=80&auto=format&fit=crop',
    tag: 'Operations'
  },
  {
    id: 'ecommerce_orders',
    title: 'E-commerce Orders',
    description: 'Track orders, send updates, and recover abandoned carts.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80&auto=format&fit=crop',
    tag: 'Sales'
  },
  {
    id: 'customer_support',
    title: 'Customer Support',
    description: 'Resolve repetitive queries with AI-assisted response flows.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80&auto=format&fit=crop',
    tag: 'Service'
  }
];

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="bg-blobs" aria-hidden="true">
    <span class="blob blob-a"></span>
    <span class="blob blob-b"></span>
    <span class="blob blob-c"></span>
  </div>

  <header class="topbar glass reveal">
    <div class="brand-wrap">
      <span class="brand-dot"></span>
      <div>
        <p class="brand-label">HerBalance AI</p>
        <p class="brand-sub">Self-Service Automation Platform</p>
      </div>
    </div>
    <nav>
      <a href="#catalog">Automations</a>
      <a href="#how-it-works">How it works</a>
      <a href="#pricing">Pricing</a>
      <button class="btn btn-secondary" id="header-trial-btn">Start Free Trial</button>
    </nav>
  </header>

  <section class="hero reveal">
    <div>
      <p class="eyebrow">Select. Click. Automate. Done in 60 seconds.</p>
      <h1>Stop doing repetitive tasks. Let AI handle them.</h1>
      <p class="hero-copy">
        Set up production-ready automation flows in a guided flow that feels as simple as filling a short form.
        Pick an automation, answer three questions, preview output, and activate your trial.
      </p>
      <div class="hero-actions">
        <button class="btn btn-primary" id="hero-start-btn">What do you want to automate today?</button>
        <button class="btn btn-ghost" id="hero-custom-btn">Describe a custom automation</button>
      </div>
      <div class="trust-row">
        <span>Trusted workflow templates</span>
        <span>Fast onboarding</span>
        <span>Business-ready output</span>
      </div>
    </div>
    <aside class="hero-visual glass">
      <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1400&q=80&auto=format&fit=crop" alt="Business analytics dashboard" />
      <div class="hero-stats">
        <article>
          <h3>120h</h3>
          <p>Monthly time saved</p>
        </article>
        <article>
          <h3>245%</h3>
          <p>Automation ROI uplift</p>
        </article>
      </div>
    </aside>
  </section>

  <section id="catalog" class="catalog-section reveal">
    <h2>Automation Catalog</h2>
    <p>Choose one automation to start instant setup.</p>
    <div class="cards" id="automation-cards"></div>
  </section>

  <section id="setup" class="setup glass hidden reveal">
    <div class="setup-head">
      <button class="btn btn-ghost" id="back-to-catalog">Back</button>
      <h3 id="setup-title">Setup Wizard</h3>
    </div>
    <div id="setup-content"></div>
  </section>

  <section id="how-it-works" class="how-grid reveal">
    <article class="glass">
      <h3>1. Select</h3>
      <p>Pick an automation from ready-to-use categories.</p>
    </article>
    <article class="glass">
      <h3>2. Configure</h3>
      <p>Answer three business questions in a simple wizard.</p>
    </article>
    <article class="glass">
      <h3>3. Activate</h3>
      <p>Review generated outputs and start your 7-day trial.</p>
    </article>
  </section>

  <section id="pricing" class="pricing reveal">
    <h2>Simple Pricing</h2>
    <div class="pricing-grid">
      <article class="glass"><h3>Starter</h3><p>999 INR / month</p><small>3 active automations</small></article>
      <article class="glass featured"><h3>Pro</h3><p>2,999 INR / month</p><small>10 active automations</small></article>
      <article class="glass"><h3>Business</h3><p>9,999 INR / month</p><small>Unlimited automations</small></article>
    </div>
  </section>
`;

const state = {
  selectedAutomation: null,
  answers: {}
};

const cardsContainer = document.querySelector('#automation-cards');
const setupSection = document.querySelector('#setup');
const setupTitle = document.querySelector('#setup-title');
const setupContent = document.querySelector('#setup-content');

function renderCards() {
  cardsContainer.innerHTML = AUTOMATIONS.map(
    (item) => `
      <button class="card" data-id="${item.id}">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
        <div class="card-gradient"></div>
        <div class="card-body">
          <span class="chip">${item.tag}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <span class="link">Set up in 60 seconds</span>
        </div>
      </button>
    `
  ).join('');
}

function renderQuestions() {
  const automation = state.selectedAutomation;
  if (!automation) return;

  setupTitle.textContent = `${automation.title} Setup`;

  setupContent.innerHTML = `
    <form id="wizard-form" class="wizard-form">
      <label>
        <span>1. Business handle</span>
        <input type="text" name="handle" placeholder="yourbrand" required />
      </label>
      <label>
        <span>2. Primary goal</span>
        <select name="goal" required>
          <option value="">Select</option>
          <option>Growth</option>
          <option>Lead generation</option>
          <option>Support optimization</option>
        </select>
      </label>
      <label>
        <span>3. Business type</span>
        <select name="type" required>
          <option value="">Select</option>
          <option>Fashion</option>
          <option>Food</option>
          <option>Tech</option>
          <option>Services</option>
        </select>
      </label>
      <button type="submit" class="btn btn-primary">Generate My Automation</button>
    </form>
  `;

  const form = document.querySelector('#wizard-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    state.answers = Object.fromEntries(new FormData(form).entries());
    renderGenerating();
  });
}

function renderGenerating() {
  setupContent.innerHTML = `
    <div class="progress-wrap glass">
      <h4>Creating your automation...</h4>
      <ul>
        <li>Analyzing input</li>
        <li>Generating templates</li>
        <li>Preparing workflow</li>
      </ul>
      <div class="progress"><div class="bar" id="progress-bar"></div></div>
      <p id="progress-label">0%</p>
    </div>
  `;

  const bar = document.querySelector('#progress-bar');
  const label = document.querySelector('#progress-label');
  let value = 0;

  const timer = setInterval(() => {
    value += 10;
    bar.style.width = `${value}%`;
    label.textContent = `${value}%`;

    if (value >= 100) {
      clearInterval(timer);
      renderResult();
    }
  }, 220);
}

function renderResult() {
  const summary = Object.entries(state.answers)
    .map(([key, val]) => `<li><strong>${key}:</strong> ${val}</li>`)
    .join('');

  setupContent.innerHTML = `
    <div class="result">
      <h4>Your automation is ready</h4>
      <p>Preview generated from your setup:</p>
      <ul>
        <li>Content ideas and execution plan generated</li>
        <li>Messaging templates prepared for daily operations</li>
        <li>Automation runbook created for your workflow</li>
      </ul>
      <p>Configuration summary:</p>
      <ul>${summary}</ul>

      <form id="trial-form" class="trial-form">
        <label>
          <span>Activate 7-day free trial with email</span>
          <input type="email" name="email" placeholder="you@business.com" required />
        </label>
        <button type="submit" class="btn btn-primary">Start 7-Day Free Trial</button>
      </form>
      <p id="trial-message" class="trial-message"></p>
    </div>
  `;

  document.querySelector('#trial-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get('email');
    document.querySelector('#trial-message').textContent = `Trial activated for ${email}.`;
  });
}

function openSetup(automationId) {
  const selected = AUTOMATIONS.find((item) => item.id === automationId);
  if (!selected) return;

  state.selectedAutomation = selected;
  state.answers = {};

  setupSection.classList.remove('hidden');
  setupSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  renderQuestions();
}

cardsContainer.addEventListener('click', (event) => {
  const card = event.target.closest('.card');
  if (!card) return;
  openSetup(card.dataset.id);
});

document.querySelector('#back-to-catalog').addEventListener('click', () => {
  setupSection.classList.add('hidden');
  document.querySelector('#catalog').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('#hero-start-btn').addEventListener('click', () => {
  document.querySelector('#catalog').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('#header-trial-btn').addEventListener('click', () => {
  document.querySelector('#pricing').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('#hero-custom-btn').addEventListener('click', () => {
  setupSection.classList.remove('hidden');
  setupTitle.textContent = 'Custom Automation Builder';
  setupContent.innerHTML = `
    <form id="custom-form" class="wizard-form">
      <label>
        <span>Describe what you want to automate</span>
        <textarea name="request" rows="4" placeholder="Example: Send birthday discount codes automatically" required></textarea>
      </label>
      <label>
        <span>Data source</span>
        <select name="source" required>
          <option value="">Select</option>
          <option value="csv">CSV file</option>
          <option value="google_sheets">Google Sheets</option>
          <option value="crm">CRM</option>
        </select>
      </label>
      <button type="submit" class="btn btn-primary">Continue</button>
    </form>
    <p id="custom-result" class="trial-message"></p>
  `;

  document.querySelector('#custom-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    document.querySelector('#custom-result').textContent =
      `Request received: ${data.get('request')}. Next step: file mapping and workflow creation.`;
  });

  setupSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

function initRevealAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

renderCards();
initRevealAnimations();
