const AUTOMATIONS = [
  {
    id: 'instagram_growth',
    title: 'Instagram Growth',
    description: 'Generate reel ideas, captions, hashtags, and engagement actions.',
    image:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&q=80&auto=format&fit=crop',
    questions: [
      { key: 'handle', label: 'Instagram handle', placeholder: 'yourbrand' },
      {
        key: 'frequency',
        label: 'Post frequency',
        type: 'select',
        options: ['Daily', '3x/week', 'Weekly']
      },
      {
        key: 'businessType',
        label: 'Business type',
        type: 'select',
        options: ['Fashion', 'Food', 'Tech', 'Beauty', 'Education', 'Other']
      }
    ],
    sampleOutput: [
      'Reel idea: 5 trends your audience should know this week',
      'Caption draft: New collection drop. Which style fits your mood?',
      'DM reply template: Thanks for reaching out. Here is our latest catalog.'
    ]
  },
  {
    id: 'whatsapp_bot',
    title: 'WhatsApp Auto-Reply',
    description: 'Handle common questions, order updates, and appointment requests.',
    image:
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&q=80&auto=format&fit=crop',
    questions: [
      { key: 'phone', label: 'Business WhatsApp number', placeholder: '+91...' },
      {
        key: 'useCase',
        label: 'Primary use case',
        type: 'select',
        options: ['Support', 'Booking', 'Sales', 'Mixed']
      },
      {
        key: 'hours',
        label: 'Business hours',
        placeholder: '10 AM - 8 PM'
      }
    ],
    sampleOutput: [
      'Auto-reply: Thank you for messaging us. We usually respond within 10 minutes.',
      'Template flow: Booking request -> slot check -> confirmation message',
      'Escalation trigger: Route high-priority chats to human support'
    ]
  },
  {
    id: 'voice_assistant',
    title: 'AI Voice Assistant',
    description: 'Capture calls, answer FAQs, and qualify leads automatically.',
    image:
      'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=900&q=80&auto=format&fit=crop',
    questions: [
      { key: 'lineName', label: 'Phone line name', placeholder: 'Main Sales Line' },
      {
        key: 'language',
        label: 'Preferred language',
        type: 'select',
        options: ['English', 'Hindi', 'English + Hindi']
      },
      {
        key: 'objective',
        label: 'Call objective',
        type: 'select',
        options: ['Lead qualification', 'Support triage', 'Appointment booking']
      }
    ],
    sampleOutput: [
      'Greeting script generated for inbound calls',
      'Qualification script built with lead scoring fields',
      'Follow-up task created for unresolved calls'
    ]
  },
  {
    id: 'email_automation',
    title: 'Email Automation',
    description: 'Classify inbox items, generate replies, and send follow-ups.',
    image:
      'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=900&q=80&auto=format&fit=crop',
    questions: [
      { key: 'inbox', label: 'Primary inbox', placeholder: 'support@yourdomain.com' },
      {
        key: 'mode',
        label: 'Send mode',
        type: 'select',
        options: ['Draft for approval', 'Auto send low risk', 'Full automation']
      },
      {
        key: 'category',
        label: 'Top category',
        type: 'select',
        options: ['Support', 'Sales', 'Invoices', 'Mixed']
      }
    ],
    sampleOutput: [
      'Auto-categorization labels prepared: urgent, inquiry, billing',
      'Reply draft generated with tone matching your brand',
      'Reminder sequence ready for pending responses'
    ]
  },
  {
    id: 'ecommerce_orders',
    title: 'E-commerce Orders',
    description: 'Track orders, send updates, and recover abandoned carts.',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80&auto=format&fit=crop',
    questions: [
      { key: 'store', label: 'Store platform', type: 'select', options: ['Shopify', 'WooCommerce', 'Custom'] },
      { key: 'dailyOrders', label: 'Average daily orders', placeholder: '50' },
      {
        key: 'channel',
        label: 'Customer channel',
        type: 'select',
        options: ['Email', 'WhatsApp', 'Both']
      }
    ],
    sampleOutput: [
      'Order status automation active for processing and shipping events',
      'Abandoned cart sequence prepared with reminder intervals',
      'Low stock alerts connected to operations inbox'
    ]
  },
  {
    id: 'customer_support',
    title: 'Customer Support',
    description: 'Resolve repetitive queries with AI-assisted response flows.',
    image:
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80&auto=format&fit=crop',
    questions: [
      { key: 'channels', label: 'Support channels', placeholder: 'Email, chat, WhatsApp' },
      {
        key: 'sla',
        label: 'Target first response',
        type: 'select',
        options: ['5 minutes', '15 minutes', '1 hour']
      },
      {
        key: 'handoff',
        label: 'Escalation rule',
        type: 'select',
        options: ['Sentiment based', 'Keyword based', 'Manual only']
      }
    ],
    sampleOutput: [
      'Intent routing map generated for top 20 customer queries',
      'Agent assist suggestions enabled for real-time responses',
      'Escalation policies configured for unresolved conversations'
    ]
  }
];

const QUICK_METHODS = [
  'One click setup templates for non-technical teams',
  'Reusable workflow presets for faster launches',
  'Auto-generated task checklists for each automation',
  'Performance snapshots to compare automation outcomes'
];

const NEW_PRODUCTS = [
  {
    name: 'Lead Follow-up Accelerator',
    detail: 'Auto sequence for new leads across email and messaging channels.'
  },
  {
    name: 'Review Response Engine',
    detail: 'Detects new reviews and drafts response suggestions automatically.'
  },
  {
    name: 'Inventory Alert Pilot',
    detail: 'Tracks stock thresholds and prepares reorder notifications.'
  }
];

const FAQ_BOT_KB = [
  {
    keywords: ['price', 'pricing', 'plan', 'cost'],
    answer:
      'Current plans are Starter 999 INR, Pro 2,999 INR, and Business 9,999 INR per month. You can start with the trial and upgrade later.'
  },
  {
    keywords: ['trial', 'free trial'],
    answer:
      'The platform provides a 7-day free trial. You can activate from any automation result screen using your email.'
  },
  {
    keywords: ['setup', 'start', 'automation'],
    answer:
      'Choose an automation card, answer three setup questions, then click Generate My Automation. A preview is shown before activation.'
  },
  {
    keywords: ['support', 'help', 'issue', 'query'],
    answer:
      'For query resolution, share your issue in the chat and include your automation name. For account-level help, contact support via dashboard after login.'
  }
];

const app = document.querySelector('#app');

app.innerHTML = `
  <header class="topbar">
    <div class="brand">HerBalance AI</div>
    <nav>
      <a href="#catalog">Automations</a>
      <a href="#methods">Methods</a>
      <a href="#products">Products</a>
      <a href="#pricing">Pricing</a>
      <button class="btn btn-secondary" id="header-trial-btn">Start Free Trial</button>
    </nav>
  </header>

  <section class="hero protect-content">
    <div>
      <p class="eyebrow">Select. Click. Automate. Done in 60 seconds.</p>
      <h1>Stop doing repetitive tasks. Let AI handle them.</h1>
      <p class="hero-copy">
        Build and launch business automation flows in a guided setup. No technical configuration required.
        Choose a use-case, answer three questions, preview output, and activate your trial.
      </p>
      <div class="hero-actions">
        <button class="btn btn-primary" id="hero-start-btn">What do you want to automate today?</button>
        <button class="btn btn-ghost" id="hero-custom-btn">Describe a custom automation</button>
      </div>
    </div>
    <div class="hero-visual">
      <img
        src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1400&q=80&auto=format&fit=crop"
        alt="Automation dashboard preview" draggable="false"
      />
    </div>
  </section>

  <section class="logo-strip protect-content">
    <p>Designed for growing brands, agencies, and online businesses.</p>
  </section>

  <section id="catalog" class="catalog-section protect-content">
    <h2>Automation Catalog</h2>
    <p>Choose one automation to start instant setup.</p>
    <div class="cards" id="automation-cards"></div>
  </section>

  <section id="methods" class="methods-section protect-content">
    <h2>New Methods to Simplify Work</h2>
    <div class="methods-grid" id="methods-grid"></div>
  </section>

  <section id="products" class="products-section protect-content">
    <h2>New Automation Products</h2>
    <div class="products-grid" id="products-grid"></div>
  </section>

  <section id="setup" class="setup hidden">
    <div class="setup-head">
      <button class="btn btn-ghost" id="back-to-catalog">Back</button>
      <h3 id="setup-title">Setup Wizard</h3>
    </div>

    <div id="setup-content"></div>
  </section>

  <section id="how-it-works" class="how-grid protect-content">
    <article>
      <h3>1. Select</h3>
      <p>Pick an automation from ready-to-use categories.</p>
    </article>
    <article>
      <h3>2. Configure</h3>
      <p>Answer three business questions in a simple wizard.</p>
    </article>
    <article>
      <h3>3. Activate</h3>
      <p>Review generated outputs and start your 7-day trial.</p>
    </article>
  </section>

  <section id="pricing" class="pricing protect-content">
    <h2>Simple Pricing</h2>
    <div class="pricing-grid">
      <article><h3>Starter</h3><p>999 INR / month</p><small>3 active automations</small></article>
      <article><h3>Pro</h3><p>2,999 INR / month</p><small>10 active automations</small></article>
      <article><h3>Business</h3><p>9,999 INR / month</p><small>Unlimited automations</small></article>
    </div>
  </section>

  <button class="chat-toggle" id="chat-toggle">CX Query Assistant</button>

  <aside class="chatbot hidden" id="chatbot">
    <div class="chatbot-head">
      <strong>CX Query Assistant</strong>
      <button id="chat-close" aria-label="Close chat">Close</button>
    </div>
    <div class="chatbot-body" id="chatbot-body">
      <div class="bot-msg">Share your query. I can help with setup, plans, trial, and automation flow questions.</div>
    </div>
    <form id="chat-form" class="chatbot-form">
      <input type="text" id="chat-input" placeholder="Type your query" required />
      <button type="submit">Send</button>
    </form>
  </aside>
`;

const state = {
  selectedAutomation: null,
  answers: {},
  currentStep: 'questions'
};

const cardsContainer = document.querySelector('#automation-cards');
const methodsGrid = document.querySelector('#methods-grid');
const productsGrid = document.querySelector('#products-grid');
const setupSection = document.querySelector('#setup');
const setupTitle = document.querySelector('#setup-title');
const setupContent = document.querySelector('#setup-content');

function renderCards() {
  cardsContainer.innerHTML = AUTOMATIONS.map(
    (item) => `
      <button class="card" data-id="${item.id}">
        <img src="${item.image}" alt="${item.title}" loading="lazy" draggable="false" />
        <div class="card-body">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <span>Set up in 60 seconds</span>
        </div>
      </button>
    `
  ).join('');
}

function renderMethods() {
  methodsGrid.innerHTML = QUICK_METHODS.map((method) => `<article class="method-item">${method}</article>`).join('');
}

function renderProducts() {
  productsGrid.innerHTML = NEW_PRODUCTS.map(
    (product) => `
      <article class="product-item">
        <h3>${product.name}</h3>
        <p>${product.detail}</p>
      </article>
    `
  ).join('');
}

function renderQuestions() {
  const automation = state.selectedAutomation;
  if (!automation) return;

  setupTitle.textContent = `${automation.title} Setup`;

  const fields = automation.questions
    .map((q, idx) => {
      if (q.type === 'select') {
        return `
          <label>
            <span>${idx + 1}. ${q.label}</span>
            <select name="${q.key}" required>
              <option value="">Select</option>
              ${q.options.map((o) => `<option value="${o}">${o}</option>`).join('')}
            </select>
          </label>
        `;
      }

      return `
        <label>
          <span>${idx + 1}. ${q.label}</span>
          <input type="text" name="${q.key}" placeholder="${q.placeholder || ''}" required />
        </label>
      `;
    })
    .join('');

  setupContent.innerHTML = `
    <form id="wizard-form" class="wizard-form">
      ${fields}
      <button type="submit" class="btn btn-primary">Generate My Automation</button>
    </form>
  `;

  const form = document.querySelector('#wizard-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    state.answers = Object.fromEntries(formData.entries());
    state.currentStep = 'generating';
    renderGenerating();
  });
}

function renderGenerating() {
  setupContent.innerHTML = `
    <div class="progress-wrap">
      <h4>Creating your automation...</h4>
      <ul>
        <li>Analyzing input</li>
        <li>Generating templates</li>
        <li>Preparing workflow</li>
      </ul>
      <div class="progress">
        <div class="bar" id="progress-bar"></div>
      </div>
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
      state.currentStep = 'result';
      renderResult();
    }
  }, 250);
}

function renderResult() {
  const { selectedAutomation, answers } = state;
  if (!selectedAutomation) return;

  const answerSummary = Object.entries(answers)
    .map(([key, val]) => `<li><strong>${key}:</strong> ${val}</li>`)
    .join('');

  const output = selectedAutomation.sampleOutput.map((line) => `<li>${line}</li>`).join('');

  setupContent.innerHTML = `
    <div class="result">
      <h4>Your automation is ready</h4>
      <p>Preview generated from your setup:</p>
      <ul>${output}</ul>
      <p>Configuration summary:</p>
      <ul>${answerSummary}</ul>

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
    const msg = document.querySelector('#trial-message');
    msg.textContent = `Trial activated for ${email}. Automation status: live.`;
  });
}

function openSetup(automationId) {
  const selected = AUTOMATIONS.find((item) => item.id === automationId);
  if (!selected) return;

  state.selectedAutomation = selected;
  state.currentStep = 'questions';
  state.answers = {};

  setupSection.classList.remove('hidden');
  setupSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  renderQuestions();
}

function findBotAnswer(userText) {
  const text = userText.toLowerCase();
  const match = FAQ_BOT_KB.find((entry) => entry.keywords.some((keyword) => text.includes(keyword)));
  if (match) return match.answer;
  return 'I can help with pricing, trial, setup, and support queries. Please share your exact issue and selected automation.';
}

function appendChatMessage(type, text) {
  const container = document.querySelector('#chatbot-body');
  const el = document.createElement('div');
  el.className = type === 'user' ? 'user-msg' : 'bot-msg';
  el.textContent = text;
  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
}

function initChatbot() {
  const toggle = document.querySelector('#chat-toggle');
  const panel = document.querySelector('#chatbot');
  const close = document.querySelector('#chat-close');
  const form = document.querySelector('#chat-form');
  const input = document.querySelector('#chat-input');

  toggle.addEventListener('click', () => {
    panel.classList.toggle('hidden');
  });

  close.addEventListener('click', () => {
    panel.classList.add('hidden');
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    appendChatMessage('user', message);
    appendChatMessage('bot', findBotAnswer(message));
    input.value = '';
  });
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


function initContentProtection() {
  const isEditable = (el) => el && (el.closest('input, textarea, select, [contenteditable="true"]'));

  document.addEventListener('contextmenu', (event) => {
    if (event.target.closest('.protect-content')) {
      event.preventDefault();
    }
  });

  document.addEventListener('copy', (event) => {
    if (!isEditable(event.target) && event.target.closest('.protect-content')) {
      event.preventDefault();
    }
  });

  document.addEventListener('cut', (event) => {
    if (!isEditable(event.target) && event.target.closest('.protect-content')) {
      event.preventDefault();
    }
  });

  document.addEventListener('selectstart', (event) => {
    if (!isEditable(event.target) && event.target.closest('.protect-content')) {
      event.preventDefault();
    }
  });

  document.addEventListener('dragstart', (event) => {
    if (event.target.closest('.protect-content')) {
      event.preventDefault();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!event.target.closest('.protect-content') || isEditable(event.target)) return;
    const key = event.key.toLowerCase();
    if ((event.ctrlKey || event.metaKey) && (key === 'c' || key === 'x' || key === 'u' || key === 's' || key === 'p')) {
      event.preventDefault();
    }
  });
}

renderCards();
renderMethods();
renderProducts();
initChatbot();
initContentProtection();
