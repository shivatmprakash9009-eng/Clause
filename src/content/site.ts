export const site = {
  brand: { name: 'Clause', tagline: 'One tool to manage contracts and your team', email: 'hello@clause.com', phone: '+621 987 654 321', demo: true },
  nav: {
    menus: [
      { label: 'Solutions', items: [
        { title: 'Contract repository', description: 'Every agreement, searchable in one place.', href: '/#features' },
        { title: 'Approvals', description: 'Route sign-offs without chasing anyone.', href: '/#features' },
        { title: 'Reporting', description: 'See risk and renewals at a glance.', href: '/#features' } ] },
      { label: 'Customers', items: [
        { title: 'Legal', description: 'Keep every clause and deadline in view.', href: '/#testimonial' },
        { title: 'Procurement', description: 'Negotiate and renew with full context.', href: '/#testimonial' },
        { title: 'Sales', description: 'Close deals without waiting on paperwork.', href: '/#testimonial' } ] },
    ],
    links: [{ label: 'Pricing', href: '/#cta' }],
    login: { label: 'Log In', href: '/start' },
    start: { label: 'Start Now', href: '/start' },
  },
  hero: {
    badge: 'Create for fast',
    h1: { before: 'One tool to ', highlight: 'manage', after: ' contracts and your team' },
    sub: 'Clause helps legal teams work faster, smarter and more efficiently, delivering the visibility and data-driven insights to mitigate risk and ensure compliance.',
    primary: { label: 'Start for Free', href: '/start' },
    secondary: { label: 'Get a Demo', href: '/demo' },
    avatars: [ { name: 'Maya', hue: 'a' }, { name: 'Rohan', hue: 'b' }, { name: 'Lena', hue: 'c' }, { name: 'Jonas', hue: 'd' } ],
    partners: { caption: 'More than 100+ companies partner', demo: true,
      items: [ { slug: 'hubspot', label: 'HubSpot' }, { slug: 'dropbox', label: 'Dropbox' }, { slug: 'square', label: 'Square' }, { slug: 'intercom', label: 'Intercom' }, { slug: 'grammarly', label: 'Grammarly' } ] },
  },
  features: {
    badge: 'Features',
    h2: 'Latest advanced technologies to ensure everything you need',
    sub: "Maximize your team's productivity and security with our affordable, user-friendly contract management system.",
    dashboard: {
      title: 'Dynamic dashboard',
      body: 'Clause helps legal teams work faster, smarter and more efficiently, delivering the visibility and data-driven insights to mitigate risk and ensure compliance.',
      cta: { label: 'Explore all', href: '/#integrations' },
      workspace: 'Acme Inc.', yLabels: ['10K', '6K', '2K', '0'],
      values: [46, 78, 38, 24, 100, 48, 70, 46, 24, 34], peakIndex: 4,
      unit: 'Contract activity, ten periods; peak in the fifth',
    },
    notifications: {
      title: 'Smart notifications',
      body: 'Easily accessible from the notifications center, calendar or email with the relevant activities.',
      panelTitle: 'Email notification', save: 'Save', saved: 'Saved',
      rows: [
        { id: 'messages', label: 'New messages, comment, or replies', on: true, disabled: false },
        { id: 'social', label: 'Social emails', on: false, disabled: false },
        { id: 'announce', label: 'Announcement and Update', on: true, disabled: false },
        { id: 'reminders', label: 'Reminders', on: true, disabled: true },
      ],
    },
    tasks: {
      title: 'Task management',
      body: 'Discuss contract queries, manage tasks, secure approvals, track progress in the workspace.',
      panelTitle: 'Activity', newMessage: '+ Message',
      messages: [
        { author: 'Bill Sanders', hue: 'a', mention: '@Ragip Diller', text: 'Could you sign the contract before the March 12? Thank you in advance', emoji: { glyph: '😊', label: 'smile' } },
        { author: 'Jane Cooper', hue: 'b', file: 'Uploaded new contract' },
      ],
    },
  },
  integrations: {
    badge: 'Integrations', h2: "Don't replace. Integrate.",
    body: "We understand the hassle of replacing the long used tools in your process. That's why we integrate tools you use in your day-to-day work.",
    link: { label: 'All Integrations', href: '/#integrations' },
    srList: 'Integrates with Slack, Notion, Trello, PayPal, Google Ads, Grammarly, Dropbox, HubSpot, Asana, Mailchimp, Zapier, Zendesk, Monday.com, ClickUp, Shopify and Intercom.',
    pause: 'Pause animation', resume: 'Resume animation',
    row1: [ 'slack:Slack', 'notion:Notion', 'trello:Trello', 'paypal:PayPal', 'googleads:Google Ads', 'grammarly:Grammarly', 'dropbox:Dropbox', 'hubspot:HubSpot' ],
    row2: [ 'asana:Asana', 'mailchimp:Mailchimp', 'zapier:Zapier', 'zendesk:Zendesk', 'mondaydotcom:Monday.com', 'clickup:ClickUp', 'shopify:Shopify', 'intercom:Intercom' ],
  },
  testimonial: {
    demo: true,
    quote: 'Clause is helping our company to decrease operational expenses and turnaround time, while increasing the compliance, resource allocation and effectiveness of our contract management.',
    name: 'Darlene Robertson', role: 'Head of Strategy at Mailchimp',
  },
  stats: { demo: true, items: [
    { to: 2021, from: 2000, suffix: '', label: 'Clause Founded' },
    { to: 50, from: 0, suffix: 'K+', label: 'Active Users' },
    { to: 1, from: 0, suffix: 'k+', label: 'Company Partners' } ] },
  cta: {
    before: 'Discover the full scale of ', highlight: 'Clause', after: ' capabilities',
    secondary: { label: 'Get a Demo', href: '/demo' }, primary: { label: 'Start for Free', href: '/start' },
  },
  footer: {
    columns: [
      { title: 'Solution', links: [ { label: 'Why Clause', href: '/#features' }, { label: 'Features', href: '/#features' }, { label: 'OpenAI', href: '/#integrations' }, { label: 'Technology', href: '/#integrations' }, { label: 'Security', href: '/privacy' } ] },
      { title: 'Customers', links: [ { label: 'Procurement', href: '/#testimonial' }, { label: 'Sales', href: '/#testimonial' }, { label: 'Legal', href: '/#testimonial' }, { label: 'Medium', href: '/#testimonial' }, { label: 'Enterprise', href: '/demo' } ] },
      { title: 'Resources', links: [ { label: 'Pricing', href: '/#cta' }, { label: 'Contact Sales', href: '/demo' }, { label: 'Changelog', href: '/#features', isNew: true }, { label: 'Blog', href: '/#top' } ] },
    ],
    legal: [ { label: 'Privacy', href: '/privacy' }, { label: 'Terms', href: '/terms' } ],
    social: [ { label: 'X', href: 'https://x.com/' }, { label: 'LinkedIn', href: 'https://www.linkedin.com/' }, { label: 'Instagram', href: 'https://www.instagram.com/' }, { label: 'YouTube', href: 'https://www.youtube.com/' } ],
  },
  forms: {
    start: { h1: 'Start for free', sub: 'Create your workspace in minutes. No credit card required.' },
    demo: { h1: 'Book a demo', sub: 'See Clause on your own contracts with a specialist.' },
    labels: { name: 'Full name', email: 'Work email', company: 'Company', message: 'What would you like to see?' },
    errors: { name: 'Enter your name', email: 'Enter a valid work email', company: 'Company is required' },
    submit: { start: 'Create workspace', demo: 'Request a demo' }, sending: 'Sending…',
    success: "Thanks — we'll be in touch within one business day.",
    failure: 'Something went wrong. Please try again.',
    privacy: 'By submitting you agree to our',
  },
  seo: {
    title: 'Clause — contract management for legal teams',
    description: 'Manage contracts, approvals and your team in one tool. Clause gives legal teams visibility, data-driven insights and fewer compliance surprises.',
  },
  legalStubs: {
    privacy: { h1: 'Privacy', body: 'This is a template page. Replace it with your organisation’s privacy policy before launch.' },
    terms: { h1: 'Terms', body: 'This is a template page. Replace it with your organisation’s terms of service before launch.' },
  },
} as const;
