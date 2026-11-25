export interface ExperienceItem {
  company: string;
  location: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year?: string;
}

export const FOUNDER = {
  name: 'Georgio Mascagni',
  title: 'Founder, Digital Trail Labs · IT CRM Platform Director & AI Champion',
  location: 'Atlanta, GA',
  email: 'gmascagni@hotmail.com',
  phone: '(404) 993-9182',
  linkedin: 'https://www.linkedin.com/in/georgiomascagni/',
  github: 'https://github.com/gmascagni',
  domain: 'https://digitaltraillabs.com',
  summary:
    'Accomplished Director of Sales & Marketing IT with 25+ years of enterprise technology leadership, overseeing 7,500+ Salesforce users across 15 global production orgs while actively building and shipping modern AI applications, autonomous Telegram/multi-agent systems, and full-stack software through Digital Trail Labs.',
  metrics: [
    { value: '25+', label: 'Years Enterprise IT Leadership' },
    { value: '7,500+', label: 'Global CRM Users Governed' },
    { value: '14+', label: 'Shipped Applications & Platforms' },
    { value: '2026', label: 'Google Certified AI Professional' },
  ],
  aiInitiatives: [
    {
      title: 'Agentic L1/L2 Support Automation',
      description:
        'Designed and integrated intelligent agentic AI workflows to automate and accelerate enterprise L1/L2 support ticket triage and resolution.',
    },
    {
      title: 'AI-Assisted CI/CD & Release Architecture',
      description:
        'Transformed Jenkins & GitHub release pipelines with automated static code scanning, L3 AI stability automation, and predictive DevOps analytics.',
    },
    {
      title: 'AI Security & Governance Model',
      description:
        'Built a proactive governance framework combining Agentic AI with Salesforce Health Scores to enforce security best practices across 15 production orgs.',
    },
    {
      title: 'Organization-Wide Google AI Adoption',
      description:
        'Served as Platform AI Champion driving adoption of Google AI tools (Gemini, NotebookLM, Canvas, Spark) to multiply engineering and operations velocity.',
    },
  ],
  proficiencies: [
    'Agentic AI & Multi-Agent Orchestration',
    'Google AI Ecosystem (Gemini / AI Studio)',
    'Enterprise Salesforce Governance (Certified)',
    'CI/CD & Release Management (Jenkins / GitHub)',
    'Autonomous Telegram / Messaging Agents',
    'Vendor Contract Negotiations',
    'Certified Project Management (GWU)',
    'Certified Scrum Master / Agile',
    'Global Team Leadership (US, Costa Rica, India)',
    'Atlassian Suite (JIRA / Confluence)',
    'TypeScript / React / Python / Kotlin',
    'Air-Gapped & Local LLM Architecture',
  ],
  experience: [
    {
      company: 'Equifax',
      location: 'Atlanta, GA',
      role: 'IT CRM Platform Director (Sales & Marketing IT)',
      period: 'March 2016 – Present',
      summary:
        'Directs governance, stability, DataOps, release management, and strategic AI transformation for 7,500+ Salesforce users across 15 production orgs, leading a 15+ member cross-functional global organization (US, Costa Rica, Pune).',
      highlights: [
        'Architected comprehensive production release management with automated static code scanning and Jenkins/GitHub CI/CD transformation.',
        'Developed and deployed intelligent agentic AI systems to automate L1/L2 support ticket resolution and L3 CI/CD stability optimization.',
        'Created a proactive security governance model pairing Agentic AI with Salesforce Health Scores.',
        'Championed organization-wide Google AI adoption (Gemini, Spark, NotebookLM, Canvas) as Platform AI Champion.',
      ],
    },
    {
      company: 'N3 Results',
      location: 'Atlanta, GA',
      role: 'Manager / Project Manager — Sales Delivery & Operations',
      period: 'June 2015 – March 2016',
      summary:
        'Directed end-to-end enterprise solution delivery, organization-wide Salesforce rollout, MS/O365 Partner Portal lifecycles, a $300K data sourcing budget, and 20+ member offshore development teams.',
      highlights: [
        'Served as primary Salesforce Administrator and liaison bridging Sales, Delivery, and Operations.',
        'Engineered cost models and targeted data pipelines to optimize enterprise lead generation and customer retention.',
      ],
    },
    {
      company: 'Run Mobile',
      location: 'Alpharetta, GA',
      role: 'Enterprise Consultant / Project Manager',
      period: 'August 2014 – May 2015',
      summary:
        'Delivered multi-client Salesforce implementations and served as SFDC Business Analyst for Accenture on the Archer Daniels Midland account.',
      highlights: [
        'Led organization-wide SFDC Chatter adoption and built scalable enablement and training programs.',
      ],
    },
    {
      company: 'SOTI',
      location: 'Atlanta, GA',
      role: 'Project Manager / Strategic Account Manager',
      period: '2012 – June 2014',
      summary:
        'Managed strategic partnership alignment between SOTI and Honeywell, driving product roadmaps, contract negotiations, and Sales Engineer technical enablement.',
      highlights: [
        'Delivered executive technical demonstrations and orchestrated custom enterprise mobility rollouts.',
      ],
    },
    {
      company: 'Dell & RIM (BlackBerry)',
      location: 'Atlanta, GA',
      role: 'Enterprise Mobility Solutions Consultant & Technical Account Manager',
      period: '2006 – 2012',
      summary:
        'Advised Fortune 250 executives on enterprise mobility, BYOD frameworks, TEM/MDM/EMM architectures, and long-term technical roadmaps.',
      highlights: [
        'Acted as primary technical liaison between strategic Fortune 250 clients and internal product engineering.',
      ],
    },
    {
      company: 'IBM Global Services & Optimus Solutions',
      location: 'Atlanta, GA',
      role: 'Messaging Architect & Senior Consultant',
      period: '2000 – 2006',
      summary:
        'Architected high-availability enterprise messaging, failover clustering, and Linux server evaluations for major brands including Popeyes, Cinnabon, and Chesapeake Bagel.',
      highlights: [
        'Engineered Domino clustering with load balancing, proactive monitoring, and enterprise server consolidation.',
      ],
    },
  ] as ExperienceItem[],
  education: {
    degree: 'Bachelor of Science in Industrial Psychology (Minor in Marketing)',
    school: 'Florida State University',
  },
  certifications: [
    { title: 'Google Certified AI Professional', issuer: 'Google', year: '2026' },
    { title: 'Master’s Certificate in Project Management', issuer: 'The George Washington University' },
    { title: 'Certified Scrum Master (CSM)', issuer: 'Scrum Alliance' },
    { title: 'Certified Salesforce.com Administrator & Developer', issuer: 'Salesforce', year: '2015' },
    { title: 'Certified Microsoft Professional', issuer: 'Microsoft' },
    { title: 'Certified Lotus Notes Professional Administration (R4–R7)', issuer: 'IBM / Lotus' },
  ] as CertificationItem[],
};
