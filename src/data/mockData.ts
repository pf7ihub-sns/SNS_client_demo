import type { Domain, Product } from './models';

export const domains: Domain[] = [
  {
    id: 'compliance',
    name: 'Compliance',
    description: "Discover SNS Square's compliance products and solution.",
    iconName: 'ShieldCheck',
    featured: true,
    products: ['comp-06', 'comp-08'],
  },
  {
    id: 'ai-automation',
    name: 'AI & Automation',
    description: 'Intelligent automation solutions for the modern enterprise.',
    iconName: 'Cpu',
    featured: false,
    products: [],
  },
  {
    id: 'data-analytics',
    name: 'Data & Analytics',
    description: 'Transform your raw data into actionable business intelligence.',
    iconName: 'BarChart3',
    featured: false,
    products: [],
  },
  {
    id: 'security',
    name: 'security',
    description: 'Enterprise-grade Security Solutions to protect your critical assets.',
    iconName: 'Lock',
    featured: true,
    products: ['comp-05', 'comp-07'],
  },
];

export const products: Product[] = [
  {
    id: 'comp-05',
    name: 'AI SOC – SOC Intelligence',
    slug: 'ai-soc-agent',
    domainId: 'security',
    category: 'Security Operations',
    description: 'AI SOC – SOC Intelligence is an AI-powered Security Operations platform designed to automate security alert triage, investigation, response, and resolution.',
    shortDescription: 'AI-powered Security Operations platform automating alert triage, investigation, and resolution.',
    status: 'Active',
    featured: true,
    isNew: true,
    tags: ['AI', 'SOC', 'Security'],
    technologies: [],
    problem: 'Traditional Security Operations Centers are overwhelmed by a high volume of alerts and false positives, leading to delayed response times and analyst burnout.',
    solution: 'AI SOC – SOC Intelligence automates security operations with SIEM-first alert investigation, AI-driven evidence analysis, and connector-based response execution.',
    heroImageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000',
    visualSections: [
      {
        title: 'SIEM-First Alert Investigation',
        description: 'Automatically ingest and classify alerts from your existing SIEM.',
        layout: 'image-right',
        imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000'
      },
      {
        title: 'AI-Driven Evidence Analysis',
        description: 'Advanced models analyze evidence to assess risk.',
        layout: 'image-left',
        imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000'
      }
    ],
    businessOutcomes: [
      { label: 'Reduce alert fatigue' },
      { label: 'Accelerate incident resolution' },
      { label: 'Automate repetitive security operations' },
      { label: 'Keep critical decisions controlled' },
      { label: 'Maintain auditable security operations' }
    ],
    capabilities: [
      { title: 'SIEM-first alert investigation and classification', description: '' },
      { title: 'AI-driven evidence analysis', description: '' },
      { title: 'Risk assessment', description: '' },
      { title: 'Security and business impact-based prioritization', description: '' },
      { title: 'HITL response paths', description: '' },
      { title: 'Escalate response paths', description: '' },
      { title: 'Auto Resolve response paths', description: '' },
      { title: 'Connector-based response execution', description: '' },
      { title: 'Response verification', description: '' },
      { title: 'Root Cause Analysis (RCA)', description: '' },
      { title: 'Corrective Actions', description: '' },
      { title: 'Human SOC Review', description: '' },
      { title: 'Knowledge Hub for investigation learnings and context', description: '' }
    ],
    workflowSteps: [
      'Ingest alerts from SIEM',
      'Analyze evidence with AI',
      'Prioritize based on risk',
      'Execute connector-based response'
    ],
    workflowImageUrl: '/images/workflow_soc.png',
    screenshots: [],
    demoUrl: '/videos/ai_soc.mov',
    siteUrl: 'https://recons-gamma.vercel.app/'
  },
  {
    id: 'comp-06',
    name: 'TISAX Compliance Management System',
    slug: 'tisax-compliance-system',
    domainId: 'compliance',
    category: 'Regulatory Intelligence',
    description: 'The TISAX Compliance Management System is an enterprise solution designed to resolve supply chain security risks and supplier vulnerabilities. Built for OEM compliance and procurement teams, it offers real-time visibility into supplier TISAX readiness via AI-driven risk engines and automated scoring. A centralized dashboard aggregates supplier risk metrics, evaluates part dependencies, and identifies critical-risk suppliers to optimize procurement routes. By automating evidence tracking and remediation workflows, the system ensures continuous audit readiness and supply chain resilience. Ultimately, this platform helps organizations mitigate vehicle program disruptions while building a scalable foundation for robust supply chain governance.',
    shortDescription: 'Enterprise solution to resolve supply chain security risks and supplier vulnerabilities.',
    status: 'Active',
    featured: false,
    isNew: true,
    tags: ['TISAX', 'Automotive', 'Audit'],
    technologies: [],
    problem: 'Procurement and compliance teams in the automotive industry lack real-time visibility into supplier TISAX readiness, leading to critical supply chain security risks.',
    solution: 'A centralized platform that aggregates supplier risk metrics, evaluates part dependencies, and identifies critical-risk suppliers with automated evidence tracking.',
    heroImageUrl: '/images/automobile_image.png',
    visualSections: [
      {
        title: 'Supplier Risk Dashboard',
        description: 'Gain instant insight into the TISAX certification status of your entire supplier network.',
        layout: 'image-right',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000'
      }
    ],
    businessOutcomes: [
      { label: 'Mitigate vehicle program disruptions' },
      { label: 'Improve supply chain resilience' },
      { label: 'Improve supplier risk visibility' },
      { label: 'Support continuous audit readiness' },
      { label: 'Establish scalable supply chain governance' }
    ],
    capabilities: [
      { title: 'Supply chain security risk management', description: '' },
      { title: 'Supplier vulnerability management', description: '' },
      { title: 'OEM compliance support', description: '' },
      { title: 'Procurement team support', description: '' },
      { title: 'Real-time supplier TISAX readiness visibility', description: '' },
      { title: 'AI-driven risk engines', description: '' },
      { title: 'Automated scoring', description: '' },
      { title: 'Centralized supplier risk dashboard', description: '' },
      { title: 'Supplier risk metrics', description: '' },
      { title: 'Part dependency evaluation', description: '' },
      { title: 'Critical-risk supplier identification', description: '' },
      { title: 'Procurement route optimization', description: '' },
      { title: 'Automated evidence tracking', description: '' },
      { title: 'Remediation workflows', description: '' },
      { title: 'Continuous audit readiness', description: '' },
      { title: 'Supply chain resilience', description: '' },
      { title: 'Supply chain governance', description: '' }
    ],
    workflowSteps: [
      'Aggregate supplier risk metrics',
      'Evaluate part dependencies',
      'Identify critical-risk suppliers',
      'Automate evidence tracking and remediation'
    ],
    workflowImageUrl: '/images/workflow_tisax.png',
    screenshots: [],
    demoUrl: '/videos/tisax_dashboard.mov',
    siteUrl: '#'
  },
  {
    id: 'comp-07',
    name: 'GRC Security Training',
    slug: 'grc-security-training',
    domainId: 'security',
    category: 'Training & Awareness',
    description: 'The GRC Security Training platform provides a robust solution for managing organizational security education. The centralized manager dashboard tracks training completion, offers AI-driven course recommendations, and monitors compliance. Managers can use the AI generator to create role-specific content and deploy customizable phishing simulations to test employee vigilance. Employees receive a personalized learning roadmap, an AI security mentor for guidance, and verifiable certificates upon completion. By integrating targeted awareness modules, detailed analytics, and continuous competency tracking, this platform empowers organizations to systematically improve their security posture and build a resilient workforce against evolving cyber threats.',
    shortDescription: 'Robust solution for managing organizational security education and compliance training.',
    status: 'Active',
    featured: false,
    isNew: false,
    tags: ['GRC', 'Training', 'Compliance'],
    technologies: [],
    problem: 'Organizations struggle to effectively manage, track, and personalize security education across the workforce, leaving them vulnerable to social engineering.',
    solution: 'Provides a centralized manager dashboard with AI-generated role-specific content, customizable phishing simulations, and personalized learning roadmaps.',
    heroImageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000',
    visualSections: [
      {
        title: 'Manager Dashboard',
        description: 'Track training completion rates, monitor compliance scores, and identify high-risk user groups.',
        layout: 'image-right',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000'
      }
    ],
    businessOutcomes: [
      { label: 'Improve organizational security posture' },
      { label: 'Build a resilient security workforce' },
      { label: 'Improve employee security awareness' },
      { label: 'Systematically track security competency' },
      { label: 'Strengthen organizational preparedness against evolving cyber threats' }
    ],
    capabilities: [
      { title: 'Organizational security education', description: '' },
      { title: 'Centralized manager dashboard', description: '' },
      { title: 'Training completion tracking', description: '' },
      { title: 'AI-driven course recommendations', description: '' },
      { title: 'Compliance monitoring', description: '' },
      { title: 'AI-generated role-specific content', description: '' },
      { title: 'Customizable phishing simulations', description: '' },
      { title: 'Employee vigilance testing', description: '' },
      { title: 'Personalized learning roadmap', description: '' },
      { title: 'AI security mentor', description: '' },
      { title: 'Verifiable certificates', description: '' },
      { title: 'Targeted awareness modules', description: '' },
      { title: 'Training analytics', description: '' },
      { title: 'Continuous competency tracking', description: '' }
    ],
    workflowSteps: [
      'Monitor compliance and high-risk users',
      'Generate role-specific content',
      'Deploy phishing simulations',
      'Track competency and training completion'
    ],
    workflowImageUrl: '/images/workflow_training.png',
    screenshots: [],
    demoUrl: '/videos/grc_training.mov',
    siteUrl: '#'
  },
  {
    id: 'comp-08',
    name: 'Compliance Management',
    slug: 'compliance-management',
    domainId: 'compliance',
    category: 'Risk Management',
    description: 'Compliance Management is an enterprise SaaS platform designed to address AI governance and regulatory tracking. The solution enables compliance teams to monitor organizational security by leveraging automated data connectors. It uses a centralized risk workflow to aggregate evidence, allowing the system to track frameworks like SOC 2, monitor AI risks like prompt injection, and analyze LLM financial spend. The platform also provides automated policy creation and real-time dashboards to ensure continuous compliance and visibility. By automating manual evidence collection, the solution helps organizations mitigate generative AI risks, while providing a scalable foundation for secure enterprise AI adoption.',
    shortDescription: 'Enterprise SaaS platform designed to address AI governance and regulatory tracking.',
    status: 'Active',
    featured: true,
    isNew: false,
    tags: ['GRC', 'Dashboard', 'Analytics'],
    technologies: [],
    problem: 'Tracking framework compliance (like SOC 2) and monitoring AI-specific risks (like prompt injection and LLM spend) is highly manual and fragmented.',
    solution: 'Uses a centralized risk workflow and automated data connectors to aggregate evidence continuously, automate policy creation, and provide real-time dashboards.',
    heroImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000',
    visualSections: [
      {
        title: 'Compliance Dashboards',
        description: 'Connect directly to your infrastructure and SaaS tools to monitor frameworks like SOC 2.',
        layout: 'image-right',
        imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1000'
      }
    ],
    businessOutcomes: [
      { label: 'Reduce manual evidence collection' },
      { label: 'Improve continuous compliance visibility' },
      { label: 'Mitigate generative AI risks' },
      { label: 'Support secure enterprise AI adoption' },
      { label: 'Improve AI governance and regulatory tracking' }
    ],
    capabilities: [
      { title: 'AI governance', description: '' },
      { title: 'Regulatory tracking', description: '' },
      { title: 'Organizational security monitoring', description: '' },
      { title: 'Automated data connectors', description: '' },
      { title: 'Centralized risk workflow', description: '' },
      { title: 'Evidence aggregation', description: '' },
      { title: 'SOC 2 framework tracking', description: '' },
      { title: 'AI risk monitoring', description: '' },
      { title: 'Prompt injection risk monitoring', description: '' },
      { title: 'LLM financial spend analysis', description: '' },
      { title: 'Automated policy creation', description: '' },
      { title: 'Real-time dashboards', description: '' },
      { title: 'Automated evidence collection', description: '' },
      { title: 'Continuous compliance visibility', description: '' },
      { title: 'Generative AI risk mitigation', description: '' },
      { title: 'Secure enterprise AI adoption', description: '' }
    ],
    workflowSteps: [
      'Connect data sources via automated connectors',
      'Aggregate evidence in centralized workflow',
      'Monitor AI risks and framework compliance',
      'Generate real-time dashboards and policies'
    ],
    workflowImageUrl: '/images/workflow_compliance.png',
    screenshots: [],
    demoUrl: '/videos/compliance_management.mov',
    siteUrl: '#'
  }
];
