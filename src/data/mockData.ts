import type { Domain, Product } from './models';
import wcBanner from '../assets/WC-banner.png';
import chatBanner from '../assets/Chat-Banner.png';
import wcWorkflow from '../assets/WC-WF.png';
import cfoWorkflow from '../assets/CA-WF.png';
import autoRejectionBanner from '../assets/insurance-banner.png';
import claimValidationBanner from '../assets/claim-validation-banner.png';
import claimRoutingBanner from '../assets/routing-banner.png';
import customerSupportBanner from '../assets/chat-support-banner.png';

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
  {
    id: 'insurance',
    name: 'Insurance',
    description: 'AI solutions for claim rejections, validation, routing, and customer support.',
    iconName: 'Umbrella',
    featured: true,
    products: ['insurance-01', 'insurance-02', 'insurance-03', 'insurance-04'],
  },
  {
    id: 'telecom',
    name: 'Telecom',
    description: 'AI-powered solutions for telecom billing, usage monitoring, and revenue assurance.',
    iconName: 'Phone',
    featured: true,
    products: ['telecom-01'],
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
    demoUrl: 'https://drive.google.com/file/d/1znPAX9NTqAs9NN-oaMVSd0Sjk4VJVwOZ/preview',
  },
  {
    id: 'insurance-01',
    name: 'Auto Rejections',
    slug: 'auto-rejections',
    domainId: 'insurance',
    category: 'Claims Automation',
    shortDescription: 'AI-driven solution that automatically identifies and rejects ineligible claims based on policy rules, coverage, and documentation, with a clear reason for every rejection.',
    useCase: 'AI-driven solution that automatically identifies and rejects ineligible claims based on policy rules, coverage, and documentation, with a clear reason for every rejection.',
    descriptionPoints: [
      'Checks every incoming claim against policy status, coverage limits, waiting periods, and exclusions.',
      'Detects lapsed policies, non-covered treatments or losses, duplicate submissions, and claims filed outside allowed timelines.',
      'Automatically rejects clearly ineligible claims and generates a rejection letter for the claimant.',
      'Sends borderline cases to a human reviewer, and keeps an audit trail of every decision for compliance.'
    ],
    keyCapabilities: [
      'Policy Eligibility Checks',
      'Exclusion & Waiting-Period Rules',
      'Lapsed Policy Detection',
      'Duplicate Claim Detection',
      'Timeline Validation',
      'Automated Rejection Letters',
      'Human Review for Edge Cases',
      'Decision Audit Trail'
    ],
    status: 'Active',
    featured: true,
    isNew: true,
    tags: ['Insurance', 'Claims', 'Automation', 'AI'],
    heroImageUrl: autoRejectionBanner,
    siteUrl: 'https://insurance.snsquare.com',
  },
  {
    id: 'insurance-02',
    name: 'AI Accelerated Claim Validation',
    slug: 'ai-accelerated-claim-validation',
    domainId: 'insurance',
    category: 'Claim Validation',
    shortDescription: 'AI-driven solution that extracts and validates claim documents, verifies coverage, and flags inconsistencies to cut claim validation time from days to minutes.',
    useCase: 'AI-driven solution that extracts and validates claim documents, verifies coverage, and flags inconsistencies to cut claim validation time from days to minutes.',
    descriptionPoints: [
      'Extracts data from claim forms, invoices, bills, reports, and photos using document AI.',
      'Verifies the claimant, policy details, and coverage for every claim.',
      'Cross-checks information across all claim documents and flags mismatches and suspicious patterns before the claim moves forward.',
      'Produces a validation summary with a confidence score so adjusters can approve clean claims in one step.'
    ],
    keyCapabilities: [
      'Document AI Extraction',
      'Coverage Verification',
      'Claimant & Policy Matching',
      'Inconsistency Flagging',
      'Fraud Signal Detection',
      'Validation Confidence Score',
      'Adjuster Summary View'
    ],
    status: 'Active',
    featured: true,
    isNew: true,
    tags: ['Insurance', 'Claims', 'Validation', 'AI'],
    heroImageUrl: claimValidationBanner,
    siteUrl: 'https://insurance.snsquare.com',
  },
  {
    id: 'insurance-03',
    name: 'Intelligent Claim Routing',
    slug: 'intelligent-claim-routing',
    domainId: 'insurance',
    category: 'Claim Routing',
    shortDescription: 'AI-driven solution that classifies claims by type, complexity, severity, and risk and routes each one to the right team, queue, or adjuster automatically.',
    useCase: 'AI-driven solution that classifies claims by type, complexity, severity, and risk and routes each one to the right team, queue, or adjuster automatically.',
    descriptionPoints: [
      'Classifies each claim by line of business, claim type, complexity, severity, and fraud risk.',
      'Fast-tracks simple, low-risk claims and sends complex or high-value claims to senior adjusters.',
      'Balances workload across teams and queues based on availability, location, and current caseload.',
      'Tracks routing outcomes and turnaround times to keep improving routing accuracy.'
    ],
    keyCapabilities: [
      'Claim Classification',
      'Complexity & Severity Scoring',
      'Risk-Based Prioritization',
      'Workload Balancing',
      'SIU Referral Routing',
      'Routing Analytics'
    ],
    status: 'Active',
    featured: true,
    isNew: true,
    tags: ['Insurance', 'Claims', 'Routing', 'AI'],
    heroImageUrl: claimRoutingBanner,
    siteUrl: 'https://insurance.snsquare.com',
  },
  {
    id: 'insurance-04',
    name: 'AI Powered Customer Support',
    slug: 'ai-powered-customer-support',
    domainId: 'insurance',
    category: 'Customer Support',
    shortDescription: 'Conversational AI assistant that answers policyholder questions and provides real-time claim status in natural language.',
    useCase: 'Conversational AI assistant that answers policyholder questions and provides real-time claim status in natural language.',
    descriptionPoints: [
      'Answers questions on coverage, premiums, renewals, and claim procedures using policy documents and core system data.',
      'Gives policyholders real-time claim status and expected settlement timelines.',
      "Explains coverage, benefits, and exclusions in plain language, in the customer's preferred language."
    ],
    keyCapabilities: [
      'Natural Language Q&A',
      'Real-Time Claim Status',
      'Coverage Explanation',
      'Multilingual Support',
      'Support Analytics'
    ],
    status: 'Active',
    featured: true,
    isNew: true,
    tags: ['Insurance', 'Customer Support', 'Conversational AI'],
    heroImageUrl: customerSupportBanner,
    siteUrl: 'https://insurance.snsquare.com',
  },
  {
    id: 'telecom-01',
    name: 'Billing Anomaly Detection',
    slug: 'billing-anomaly-detection',
    domainId: 'telecom',
    category: 'Revenue Assurance',
    shortDescription: 'Rule-based solution that continuously monitors telecom usage, rating, and billing data to automatically detect revenue leakage, overbilling, underbilling, and operational inconsistencies across the billing pipeline, with AI-powered guidance for resolution and prevention.',
    useCase: 'Rule-based solution that continuously monitors telecom usage, rating, and billing data to automatically detect revenue leakage, overbilling, underbilling, and operational inconsistencies across the billing pipeline, with AI-powered guidance for resolution and prevention.',
    descriptionPoints: [
      'Continuously validates usage records against billing outputs, plan configurations, and conversion standards across mediation, rating, and billing systems using configurable business rules.',
      'Detects unit conversion errors, cycle misalignments, delayed threshold alerts, unexpected counter resets, wrong tariff priorities, and prepaid balance inconsistencies.',
      'Automatically calculates financial impact and classifies the most probable root cause for every detected anomaly.',
      'Provides AI-assisted recommendations on the exact steps to resolve the issue and preventive actions to avoid recurrence.',
      'Routes complex cases for human review while maintaining a complete audit trail of every detection and decision for compliance and operational transparency.'
    ],
    keyCapabilities: [
      'Incorrect Unit Conversion Detection',
      'Billing Cycle Misalignment Validation',
      'Threshold Trigger Delay Monitoring',
      'Usage Counter Reset Detection',
      'Incorrect Rating Priority Checks',
      'Prepaid Balance Sync Validation',
      'Financial Impact Calculation',
      'Automated Root Cause Classification',
      'AI-Powered Resolution Guidance',
      'Preventive Action Recommendations',
      'Full Decision Audit Trail'
    ],
    status: 'Active',
    featured: true,
    isNew: true,
    tags: ['Telecom', 'Billing', 'Revenue Assurance', 'AI'],
    heroImageUrl: '/images/billing_anomaly_website.png',
    workflowSteps: [
      'Ingest usage records from mediation systems',
      'Validate against billing outputs and plan configurations',
      'Detect anomalies using configurable business rules',
      'Calculate financial impact and classify root cause',
      'Provide AI-powered resolution guidance and preventive actions'
    ],
    siteUrl: 'https://telecom.snssquare.com/'
  }
];

