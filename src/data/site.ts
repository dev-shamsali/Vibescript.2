export const site = {
  name: "VibeScript",
  tagline: "Code. Design. Deliver.",
  description:
    "VibeScript is a web and app development agency helping startups and businesses build scalable websites, mobile apps, and modern SaaS products.",
  email: "info.vibescript@gmail.com",
  phone: "+91 92265 39203",
  phoneHref: "+919226539203",
  location: "Mumbai, India",
  locationShort: "Mumbai · Remote",
  whatsapp: "https://wa.me/919226539203",
} as const;

export const founder = {
  name: "Shams Ali",
  firstName: "Shams",
  role: "Founder of VibeScript",
} as const;

export const capabilities = [
  {
    title: "Full-Stack Development",
    description: "End-to-end product builds across the stack, from data models to the pixels users touch.",
  },
  {
    title: "App Development",
    description: "Native-feel mobile apps for iOS and Android, built on a shared codebase.",
  },
  {
    title: "Performance Optimization",
    description: "Faster loads, tighter bundles, better Core Web Vitals, measured before and after.",
  },
  {
    title: "AI Automation",
    description: "AI workflows that handle the repetitive work in your business, wired into the tools you already use.",
  },
] as const;

export const automations = [
  {
    name: "Lead handling",
    trigger: "New enquiry arrives",
    ai: "AI reads it, scores the lead and drafts a reply",
    action: "Reply sent, lead logged in your CRM",
    log: ["form.submitted", "ai.classify(intent: quote)", "ai.draft_reply()", "crm.create_lead()"],
  },
  {
    name: "Customer support",
    trigger: "Customer asks a question",
    ai: "AI answers from your docs, escalates when unsure",
    action: "Answer sent, tricky cases handed to a human",
    log: ["message.received", "ai.search(docs)", "ai.answer(confidence: high)", "chat.send()"],
  },
  {
    name: "Reports",
    trigger: "Every Monday morning",
    ai: "AI pulls the numbers and writes the summary",
    action: "Report lands in email or Slack",
    log: ["schedule.weekly", "db.query(sales)", "ai.summarize()", "slack.post()"],
  },
  {
    name: "Documents",
    trigger: "Invoice or form uploaded",
    ai: "AI extracts the fields and checks them",
    action: "Clean data pushed to your system",
    log: ["file.uploaded", "ai.extract(fields)", "ai.validate()", "erp.insert()"],
  },
] as const;

export const process = [
  {
    verb: "Discover",
    description: "We map the problem, the users, and what success actually looks like.",
  },
  {
    verb: "Design",
    description: "Interfaces and architecture take shape, reviewed against real constraints.",
  },
  {
    verb: "Build",
    description: "Clean, tested code shipped in small increments you can see progress on.",
  },
  {
    verb: "Ship",
    description: "Deployed, monitored, and handed off with the documentation to maintain it.",
  },
  {
    verb: "Automate",
    description: "AI automation takes over the repetitive tasks, so your team spends time on the work that matters.",
  },
] as const;

export const projects = [
  {
    title: "Developer Portfolio",
    description: "A personal showcase site built for speed, clarity, and a strong first impression.",
    tag: "Portfolio",
    href: "https://shamsali.devcodehub.cloud",
    featured: false,
  },
  {
    title: "Arna Skin Care",
    description: "Premium skincare e-commerce with a storefront built to match the product.",
    tag: "E-commerce",
    href: "https://arnaskincare.in",
    featured: false,
  },
  {
    title: "Keyset",
    description: "A modern platform website built for clarity, speed, and a polished first impression.",
    tag: "Platform",
    href: "https://keyset.in",
    featured: false,
  },
  {
    title: "WOS",
    description: "A secure login and workspace portal built on the Keyset platform.",
    tag: "Web App",
    href: "https://wos.keyset.in",
    featured: false,
  },
  {
    title: "DevCodeHub",
    description: "A developer collaboration platform for building, sharing, and shipping code together.",
    tag: "Developer Platform",
    href: "https://devcodehub.cloud",
    featured: true,
  },
] as const;
