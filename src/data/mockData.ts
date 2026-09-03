import type { Domain, Product } from './models';

export const domains: Domain[] = [
  {
    id: 'compliance',
    name: 'Compliance',
    description: "Discover SNS Square's compliance products and solution.",
    iconName: 'ShieldCheck',
    featured: true,
    products: ['comp-06', 'comp-08', 'comp-09', 'comp-07'],
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
    name: 'Infosec',
    description: 'Enterprise-grade Security Solutions to protect your critical assets.',
    iconName: 'Lock',
    featured: true,
    products: ['comp-05'],
  },
  {
    id: 'retail',
    name: 'Retail',
    description: 'Innovative solutions tailored for modern retail businesses.',
    iconName: 'Store',
    featured: true,
    products: ['retail-01'],
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
    siteUrl: 'https://comtisax.snssquare.com'
  },
  {
    id: 'comp-07',
    name: 'GRC Security Training',
    slug: 'grc-security-training',
    domainId: 'compliance',
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
    siteUrl: 'https://comgrcmanagement.snssquare.com'
  },
  {
    id: 'retail-01',
    name: 'Intelligent Supply Chain & Inventory Management',
    slug: 'intelligent-supply-chain-inventory-management',
    domainId: 'retail',
    category: 'Supply Chain & Inventory',
    shortDescription: 'AI-driven supply chain intelligence platform for inventory prioritization, predictive stockout prevention, and vendor performance optimization across multi-store retail and warehouse operations.',
    useCase: 'AI-driven supply chain intelligence platform for multi-store retail and warehouse operations.\n\nAddresses unexpected inventory stockouts through predictive stockout risk analysis.\n\nOptimizes replenishment prioritization using inventory movements, consumption velocity, and demand conditions.\n\nImproves vendor performance visibility through supplier fulfillment and performance analysis.',
    descriptionPoints: [
      'Enables inventory planners, procurement specialists, and supply chain leaders to proactively manage stock availability and optimize purchase order workflows.',
      'Uses predictive analytics, centralized data aggregation, and event-driven calculations to evaluate store-level stock movements, historical consumption velocity, and supplier fulfillment timelines.',
      'Dynamically prioritizes replenishment requests and predicts stockout risks using forward-looking run-rate forecasting.',
      'Performs vendor performance analysis across lead times, quality scores, and SLA compliance.',
      'Provides real-time KPI monitoring, AI procurement recommendations, and a context-aware AI chatbot with access to system data and metrics.'
    ],
    keyCapabilities: [
      'Dynamic Replenishment Prioritization',
      'Predictive Stockout Risk Analysis',
      'Vendor Performance Analysis',
      'Real-Time KPI Monitoring',
      'AI Procurement Recommendations',
      'Context-Aware AI Chatbot'
    ],
    status: 'Active',
    featured: true,
    isNew: true,
    tags: ['Retail', 'Supply Chain', 'Inventory', 'AI'],
    heroImageUrl: '/images/supply_chain.jpg',
    demoUrl: 'https://drive.google.com/file/d/10-c79McvyqNEdR6RJxgPbaeaRE-PdotA/preview',
    siteUrl: 'https://bpretail.snssquare.com/'
  },
  {
    id: 'comp-09',
    name: 'AI Compliance Assistant',
    slug: 'ai-compliance-assistant',
    domainId: 'compliance',
    category: 'AI Governance',
    shortDescription: 'AI-powered compliance assistant that guides organizations from AI project ideation to compliance-ready deployment through intelligent, context-aware recommendations.',
    useCase: 'AI-powered compliance assistant that guides organizations through their AI compliance journey.\n\nUnderstands AI project context including purpose, cloud environment, operating region, and data being processed.\n\nRecommends relevant compliance frameworks, security controls, and implementation guidance based on project requirements.\n\nEvaluates AI models before adoption by assessing risks, governance considerations, strengths, and recommended security controls.',
    descriptionPoints: [
      'Captures project context through interactive AI-driven conversations.',
      'Maps requirements to relevant compliance and security frameworks.',
      'Evaluates pre-deployment AI models for risks and governance.',
      'Delivers intelligent guidance via a RAG-powered compliance agent.'
    ],
    keyCapabilities: [
      'AI Compliance Guidance',
      'Interactive Project Assessment',
      'Business Context Understanding',
      'Compliance Framework Recommendations',
      'Security Recommendation Engine',
      'AI Model Assessment',
      'AI Risk & Governance Analysis',
      'Security Control Recommendations',
      'RAG-Powered Compliance Intelligence'
    ],
    status: 'Active',
    featured: false,
    isNew: true,
    tags: ['AI', 'Compliance', 'Governance', 'Security'],
    heroImageUrl: '/images/ai_compliance_assistant.png',
    demoUrl: 'https://drive.google.com/file/d/1UyxpLh6PkeNk0VzxBP1lcQt-CYAJfMTB/preview'
  }
];

