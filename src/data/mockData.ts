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
    name: 'Security',
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
    shortDescription: 'AI-powered Security Operations platform automating security alert triage, investigation, response, and resolution.',
    useCase: 'AI SOC Agent is an AI-powered Security Operations platform designed to automate security alert triage, investigation, response, and resolution.',
    descriptionPoints: [
      'Automates security alert triage, investigation, response, and resolution.',
      'Uses SIEM-first alert investigation, AI-driven evidence analysis, and risk assessment for security and business impact-based prioritization.',
      'Offers HITL, Escalate, and Auto Resolve response paths alongside connector-based response execution.',
      'Provides Root Cause Analysis (RCA), Corrective Actions, and Human SOC Review to help teams reduce alert fatigue and accelerate incident resolution.'
    ],
    keyCapabilities: [
      'SIEM-first alert investigation and classification',
      'AI-driven evidence analysis',
      'Security and business impact-based prioritization',
      'Auto Resolve response paths',
      'HITL response paths',
      'Connector-based response execution',
      'Root Cause Analysis (RCA)',
      'Alert fatigue reduction',
      'Auditable security operations'
    ],
    status: 'Active',
    featured: true,
    isNew: true,
    tags: ['AI', 'SOC', 'Security'],
    heroImageUrl: '/images/soc_1.jpeg',
    workflowSteps: [
      'Ingest alerts from SIEM',
      'Analyze evidence with AI',
      'Prioritize based on risk',
      'Execute connector-based response'
    ],
    workflowImageUrl: '/images/workflow_soc.png',
    demoUrl: 'https://drive.google.com/file/d/1mdJbnFd8pH0rMzOpaETZ4oXZ4eKHKXVl/preview',
    siteUrl: 'https://secop.snssquare.com'
  },
  {
    id: 'comp-06',
    name: 'TISAX Compliance Management System',
    slug: 'tisax-compliance-system',
    domainId: 'compliance',
    category: 'Regulatory Intelligence',
    shortDescription: 'Enterprise solution to resolve supply chain security risks and supplier vulnerabilities.',
    useCase: 'The TISAX Compliance Management System is an enterprise solution designed to resolve supply chain security risks and supplier vulnerabilities.\n\nIt is built for OEM compliance and procurement teams.\n\nIt provides real-time visibility into supplier TISAX readiness through AI-driven risk engines and automated scoring.',
    descriptionPoints: [
      'Addresses supply chain security risks and supplier vulnerabilities for OEM compliance and procurement teams.',
      'Provides real-time visibility into supplier TISAX readiness using AI-driven risk engines and automated scoring.',
      'Aggregates supplier risk metrics, evaluates part dependencies, and identifies critical-risk suppliers.',
      'Automates evidence tracking and remediation workflows to ensure continuous audit readiness.'
    ],
    keyCapabilities: [
      'Real-time supplier TISAX readiness visibility',
      'AI-driven risk engines',
      'Automated scoring',
      'Centralized supplier risk metrics',
      'Part dependency evaluation',
      'Critical-risk supplier identification',
      'Automated evidence tracking',
      'Continuous audit readiness',
      'Supply chain governance'
    ],
    status: 'Active',
    featured: false,
    isNew: true,
    tags: ['TISAX', 'Automotive', 'Audit'],
    heroImageUrl: '/images/automobile_image.png',
    workflowSteps: [
      'Aggregate supplier risk metrics',
      'Evaluate part dependencies',
      'Identify critical-risk suppliers',
      'Automate evidence tracking and remediation'
    ],
    workflowImageUrl: '/images/workflow_tisax.png',
    demoUrl: 'https://drive.google.com/file/d/12O-BNhJQT0J9koPXdVWisPKAiOfvy-qr/preview',
    siteUrl: 'https://comtisax.snssquare.com'
  },
  {
    id: 'comp-07',
    name: 'GRC Security Training',
    slug: 'grc-security-training',
    domainId: 'security',
    category: 'Training & Awareness',
    shortDescription: 'Robust solution for managing organizational security education and compliance training.',
    useCase: 'The GRC Security Training platform provides a robust solution for managing organizational cybersecurity education.\n\nIt provides a centralized manager dashboard for managing and monitoring training activities.',
    descriptionPoints: [
      'Manages organizational cybersecurity education with a centralized manager dashboard that tracks training completion and monitors compliance.',
      'Allows managers to use the AI generator to create role-specific content and deploy customizable phishing simulations.',
      'Provides employees with a personalized learning roadmap, an AI security mentor, and verifiable certificates.',
      'Helps organizations systematically improve their security posture and build a resilient workforce against cyber threats.'
    ],
    keyCapabilities: [
      'Centralized manager dashboard',
      'AI-driven course recommendations',
      'Compliance monitoring',
      'AI-generated role-specific content',
      'Customizable phishing simulations',
      'Personalized learning roadmap',
      'AI security mentor',
      'Verifiable certificates',
      'Detailed analytics'
    ],
    status: 'Active',
    featured: false,
    isNew: false,
    tags: ['GRC', 'Training', 'Compliance'],
    heroImageUrl: '/images/grc_security_training.webp',
    workflowSteps: [
      'Monitor compliance and high-risk users',
      'Generate role-specific content',
      'Deploy phishing simulations',
      'Track competency and training completion'
    ],
    workflowImageUrl: '/images/workflow_training.png',
    demoUrl: 'https://drive.google.com/file/d/1Lb4zh3G6XW6n2izEZptt8dEBVMOf7-1P/preview',
    siteUrl: 'https://sectraining.snssquare.com'
  },
  {
    id: 'comp-08',
    name: 'GRC Management',
    slug: 'compliance-management',
    domainId: 'compliance',
    category: 'Risk Management',
    shortDescription: 'Enterprise SaaS platform designed to address AI governance and regulatory tracking.',
    useCase: 'GRC Management is an enterprise SaaS platform designed to address AI governance and regulatory tracking.\n\nIt enables compliance teams to monitor organizational security using automated data connectors.',
    descriptionPoints: [
      'Addresses AI governance and supports regulatory tracking, tracking frameworks such as SOC 2 and monitoring AI risks such as prompt injection.',
      'Enables compliance teams to monitor organizational security by leveraging automated data connectors.',
      'Uses a centralized risk workflow to aggregate evidence and automates manual evidence collection.',
      'Provides automated policy creation and real-time dashboards for continuous compliance and visibility.'
    ],
    keyCapabilities: [
      'AI governance',
      'Automated data connectors',
      'Centralized risk workflow',
      'SOC 2 framework tracking',
      'AI risk monitoring',
      'Prompt injection risk monitoring',
      'LLM financial spend analysis',
      'Real-time dashboards',
      'Generative AI risk mitigation'
    ],
    status: 'Active',
    featured: true,
    isNew: false,
    tags: ['GRC', 'Dashboard', 'Analytics'],
    heroImageUrl: '/images/grc_management.jpg',
    workflowSteps: [
      'Connect data sources via automated connectors',
      'Aggregate evidence in centralized workflow',
      'Monitor AI risks and framework compliance',
      'Generate real-time dashboards and policies'
    ],
    workflowImageUrl: '/images/workflow_compliance.png',
    demoUrl: 'https://drive.google.com/file/d/14nZGlCmOAXRibNT7cyh7L9fIaLSAwqwS/preview',
    siteUrl: 'https://comgrcmanagement.snssquare.com'
  }
];
