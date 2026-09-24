import type { Domain, Product } from './models';
import wcBanner from '../assets/WC-banner.png';
import chatBanner from '../assets/Chat-Banner.png';
import wcWorkflow from '../assets/WC-WF.png';
import cfoWorkflow from '../assets/CA-WF.png';

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
  {
    id: 'finance',
    name: 'Finance',
    description: 'Solutions for financial operations, risk, and reporting.',
    iconName: 'Landmark',
    featured: true,
    products: ['finance-01', 'finance-02'],
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
    siteUrl: 'https://retail.snssquare.com/'
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
  },
  {
    id: 'finance-01',
    name: 'Working Capital Optimizer',
    slug: 'working-capital-optimizer',
    domainId: 'finance',
    category: 'Working Capital',
    shortDescription: 'AI-driven solution that analyzes cash inflows and outflows, predicts liquidity needs, and recommends next-best actions to optimize working capital.',
    useCase: 'AI-driven solution that analyzes cash inflows and outflows, predicts liquidity needs, and recommends next-best actions to optimize working capital.',
    descriptionPoints: [
      'Provides real-time visibility into cash inflows, outflows, AR, AP, and overall liquidity position.',
      'Forecasts the next 30-day cash position and identifies potential cash surplus or shortage using historical and transactional data.',
      'Detects cash leakage, cash holds, collection risks, and payment risks across customers and vendors.',
      'Generates customer- and vendor-specific AI recommendations to accelerate collections, prioritize payments, optimize surplus cash, and protect liquidity.'
    ],
    keyCapabilities: [
      'Cash Forecasting',
      'AR/AP Analytics',
      'Risk Scoring',
      'Leakage Detection',
      'Cash Hold Detection',
      'Customer Prioritization',
      'Vendor Prioritization',
      'AI Recommendations',
      'Cash Visibility'
    ],
    status: 'Active',
    featured: true,
    isNew: true,
    tags: ['Finance', 'Working Capital', 'AI', 'Liquidity'],
    heroImageUrl: wcBanner,
    workflowSteps: [
      'Ingest cash inflows, outflows, AR & AP data',
      'Forecast 30-day cash position & liquidity needs',
      'Detect leakage, cash holds, collection & payment risks',
      'Prioritize customers & vendors with AI risk scoring',
      'Recommend next-best actions to optimize working capital'
    ],
    workflowImageUrl: wcWorkflow,
    siteUrl: 'https://finance.snssquare.com/organisation/login',
  },
  {
    id: 'finance-02',
    name: 'CFO Conversational Analytics',
    slug: 'cfo-conversational-analytics',
    domainId: 'finance',
    category: 'Conversational Analytics',
    shortDescription: 'AI-driven conversational analytics solution that enables finance teams to interact with CFO data using natural language, analyze financial and operational performance, identify risks and trends, and generate actionable business insights.',
    useCase: 'AI-driven conversational analytics solution that enables finance teams to interact with CFO data using natural language, analyze financial and operational performance, identify risks and trends, and generate actionable business insights.',
    descriptionPoints: [
      'Provides real-time visibility into procurement, inventory, production, sales, accounts payable, and overall financial performance.',
      'Analyzes purchase orders, GRNs, supplier invoices, and reconciliation data to identify quantity, cost, and payment mismatches.',
      'Tracks product, vendor, customer, warehouse, and plant performance to detect cost variances, inventory risks, procurement inefficiencies, and operational issues.',
      'Generates AI-powered financial insights, trend analysis, comparisons, rankings, and business recommendations to support faster and data-driven decision-making.'
    ],
    keyCapabilities: [
      'CFO-Level Financial Analytics',
      'Procurement Performance Analytics',
      'Vendor & Supplier Prioritization',
      'Invoice & PO Reconciliation',
      'Production Performance Monitoring',
      'Financial Trend & Forecast Analysis',
      'AI-Powered Business Recommendations',
      'Interactive Financial Data Visualization',
      'Risk & Anomaly Detection'
    ],
    status: 'Active',
    featured: true,
    isNew: true,
    tags: ['Finance', 'CFO', 'Analytics', 'AI'],
    heroImageUrl: chatBanner,
    workflowSteps: [
      'Ingest procurement, finance, inventory, sales & production data',
      'Process with Multi-Agent CFO AI (Finance, Coordination, General)',
      'Access live business data via Supabase MCP',
      'Run conversational analytics across procurement, finance & inventory',
      'Deliver CFO-level decisions & data-driven recommendations'
    ],
    workflowImageUrl: cfoWorkflow,
    demoUrl: 'https://llm-download-file.s3.ap-south-1.amazonaws.com/Conversational_AI.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA4SZHNYNBKHOD55OW%2F20260924%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20260924T061953Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAYaCmFwLXNvdXRoLTEiRzBFAiEAkguTPDibkNrGgC5sao3YTnpnOmXx6MiaTcOpuOtKZW4CIA7PpwR3baOrw%2BAMJkMNRhuZmK2edsg%2F%2FTR2ZQn%2BwIEJKvYCCM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMODY0OTgxNzMwMTE0Igy5kROQ0dU0EFwXGKYqygIUJq8DxUjbAGWkMpZmAF%2Br%2BI%2FUDUGiNSffLuq3n%2FL2vGSw2olwHoR1Hwk%2F7wv89lIJppv4yMiAZP7zU9uMbgaN5MNpePHSB6PKI5GutaE3HfE0HzAba1QqwoQaFY9LrZ%2FmIdGtTByUk%2FP1l%2FI%2B5pPhy13%2FmSK8AQrcmXbH%2Bgw0BX1zRiduLyddYCTBsjuT7e2n82K2oCVy2T5U2w2N3B2C68HwpfpL7UCNH7I26v%2BtJ18jDBntgXArWz7MD4BwAojPvo43u1zkIsvu1kACsdgDP08aJ6jOJm0i0bNAvcTyWnFCdDy0qIMb%2BrSLx6i6%2BZGTrw1FaIpDAAi2AUwcv1Y3%2F5Wmrml1Tt15hvX9Ti139a6FrJZEp5Ug6qnwnwMp9pIpBj%2Fg8owGWrJ0IPDd2xnEB57yuiPXvRawJ3rLqBQRcvWVc9Zgz5bleWUwvpzS1QY6rQJEbNONUi2t1IEJrvVIlNXA5bGCyTZWaBi56Vt%2Bs32P7lj5cOP1GVh7KDnybA2pIfFD46gZeuRa%2FMNQHw%2Bb2lGAtrQ7bZVgOJ6gbkQI1%2BsHkHnVfKjg%2BxG%2BQrnOJZFrNotaNuWg2csmIjlBDVj9PNE4u73bsmk8IJQJk5mGYyWBzy786qPOfjK8omfuIgSdpnNuh%2BT62DkGWEDYre0jRe5tyRPIae5aQgY9LTB0AOzwm5C5NwPBMXf9%2FBGCkS1vFtLPMBLjYu5cA8CeXfXs08hsV3SWRTkFC2kOVROvxKNEehHOkAKogOJr6iS1hm%2BWeLKj5MRJoux%2FpzNDvLS%2Bx3Z80W7zJ9VQge1cAbkgcqMywzPN7%2BpFdEf56DdLUPuXcKNyz3LxWpGws0X%2F%2BMJz&X-Amz-Signature=3d2d6166ab0ac4866a88e8650469e04c2e002bf4b5e131c1b7cb2680ae77698b&X-Amz-SignedHeaders=host&response-content-disposition=inline',
  }
];

