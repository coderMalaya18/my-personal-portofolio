export type ProjectCategory = 'All' | 'BI & Analytics' | 'AI & ML' | 'Full-Stack';

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'All'>;
  tools: string[];
  summary: string;
  highlights: string[];
  methodology: {
    stage: string;
    detail: string;
  }[];
  deliverable: string;
  visualType:
    | 'sales-dashboard'
    | 'cyber-threat'
    | 'hireiq-matcher'
    | 'hr-attrition'
    | 'ecommerce-orders'
    | 'wanderlust-platform';
  bentoSpan: string;
}

export interface SkillDomain {
  id: string;
  index: string;
  name: string;
  focus: string;
  skills: string[];
  relatedCategory: ProjectCategory;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  year: string;
  score: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  area: string;
}

export const RESUME_PDF_PATH =
  '/assets/aistudio/UPMalayaranjan_Nayak_Data_Analyst_AI_ML_Resume.pdf_848e6ea4.pdf';

export const PROFILE = {
  name: 'Malayaranjan Nayak',
  shortName: 'Malayaranjan',
  role: 'Data Analyst (AI / ML)',
  level: 'Entry-Level',
  location: 'Bhubaneswar, Odisha',
  phone: '+91 6372466821',
  email: 'malayaranjannayak936@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/malayaranjan-nayak-1382462b1',
  linkedinHandle: 'linkedin.com/in/malayaranjan-nayak-1382462b1',
  githubUrl: 'https://github.com/malayaranjan-nayak',
  githubHandle: 'github.com/malayaranjan-nayak',
  headline: 'Turning raw data into clear, actionable analytical insights.',
  lead:
    'Computer Science graduate (B.Tech, 2026) with hands-on experience in SQL, Excel, Python, and Power BI for end-to-end data analysis and visualization, alongside applied machine learning using Random Forest classification.',
  biographyParagraphs: [
    'I am a Computer Science engineering graduate (B.Tech, 2026) from GITA Autonomous College, Bhubaneswar, focused on bridging structured data analysis with practical machine learning. My work centers on preparing messy datasets, uncovering operational trends through exploratory data analysis, and translating findings into clear dashboards and predictive models.',
    'Across my academic and independent portfolio, I have built business intelligence workflows for sales revenue tracking, HR employee attrition, and e-commerce order behavior, as well as applied AI/ML systems including an NSL-KDD cybersecurity threat classifier and an AI-powered resume-job matcher. I am currently seeking an entry-level Data Analyst role in AI/ML where rigorous data work drives measurable business decisions.',
  ],
  languages: ['English', 'Hindi', 'Odia'],
};

export const KEY_FACTS = [
  {
    value: '06',
    label: 'Portfolio Projects',
    context: 'BI Dashboards, Applied ML & Full-Stack',
  },
  {
    value: '7.5',
    label: 'B.Tech CGPA (2026)',
    context: 'Computer Science · GITA Autonomous College',
  },
  {
    value: '04',
    label: 'Certifications',
    context: 'Coursera, Cisco Networking Academy & Anthropic',
  },
  {
    value: '03',
    label: 'Languages Spoken',
    context: 'English, Hindi & Odia',
  },
];

export const FOCUS_TRACKS = [
  {
    id: 'bi',
    label: 'BI & Reporting',
    title: 'Decision-Ready Dashboards',
    description:
      'Transforming transactional tables into clean Power BI and Excel reporting layers with clear KPI hierarchy and drill-down trend visibility.',
    stack: 'Power BI · SQL · Excel · EDA',
    steps: [
      { label: '01. Ingest & Clean', detail: 'Standardize schemas and resolve null/duplicate records' },
      { label: '02. Aggregate in SQL', detail: 'Join multi-table datasets and compute business KPIs' },
      { label: '03. Visual Reporting', detail: 'Publish interactive dashboards for stakeholder review' },
    ],
  },
  {
    id: 'ml',
    label: 'Applied ML',
    title: 'Classification & Matching',
    description:
      'Building supervised learning pipelines in Python with Scikit-learn, Pandas, and NumPy—from feature preprocessing to classification evaluation.',
    stack: 'Python · Scikit-learn · Random Forest · Flask',
    steps: [
      { label: '01. Feature Prep', detail: 'Encode categorical signals and normalize feature ranges' },
      { label: '02. Model Training', detail: 'Train Random Forest classifiers and tune parameters' },
      { label: '03. Evaluate & Serve', detail: 'Assess precision/recall metrics and expose via Flask' },
    ],
  },
  {
    id: 'eng',
    label: 'Data & Web',
    title: 'Structured Storage & Apps',
    description:
      'Designing relational schemas in MySQL alongside practical full-stack web interfaces using Flask, Node.js, Express, and MongoDB.',
    stack: 'MySQL · DBMS · Node.js · MongoDB',
    steps: [
      { label: '01. Schema Design', detail: 'Structure relational tables and document collections' },
      { label: '02. API & Auth Layer', detail: 'Implement Express/Flask routes and user authentication' },
      { label: '03. Cloud Deployment', detail: 'Ship production web builds backed by persistent databases' },
    ],
  },
];

export const ANALYTICAL_APPROACH = [
  {
    index: '01',
    title: 'Data Cleaning & Preparation',
    description:
      'Auditing raw spreadsheets and relational exports to remove inconsistencies, normalize fields, and establish a trustworthy analytical baseline.',
  },
  {
    index: '02',
    title: 'Exploratory Analysis & SQL',
    description:
      'Writing structured SQL queries and Pandas transformations to segment customers, uncover attrition drivers, and quantify behavioral trends.',
  },
  {
    index: '03',
    title: 'Applied Machine Learning',
    description:
      'Training, evaluating, and deploying practical classification models such as Random Forest on structured datasets like NSL-KDD.',
  },
  {
    index: '04',
    title: 'Clear Stakeholder Reporting',
    description:
      'Packaging metrics into uncluttered Power BI dashboards and concise summaries that directly support business and retention decisions.',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'sales-performance-dashboard',
    index: '01',
    title: 'Sales Performance & Revenue Dashboard',
    subtitle: 'Interactive business intelligence suite for revenue trend tracking',
    category: 'BI & Analytics',
    tools: ['Power BI', 'SQL', 'Excel'],
    summary:
      'Built an interactive Power BI dashboard backed by cleaned SQL and Excel datasets to monitor sales performance and revenue trajectories for business decision-making.',
    highlights: [
      'Built an interactive dashboard to track sales performance and revenue trends for business decision-making.',
      'Cleaned and prepared the data and presented key metrics in a clear, visual format.',
    ],
    methodology: [
      {
        stage: 'Data Preparation',
        detail: 'Cleaned raw sales records in Excel and SQL, resolving formatting discrepancies and missing fields.',
      },
      {
        stage: 'Metric Modeling',
        detail: 'Structured revenue, volume, and period-over-period aggregations for fast multi-dimensional slicing.',
      },
      {
        stage: 'Executive Visualization',
        detail: 'Designed a clear Power BI layout highlighting revenue trends and regional performance drivers.',
      },
    ],
    deliverable: 'Interactive Power BI Dashboard & SQL Query Workbook',
    visualType: 'sales-dashboard',
    bentoSpan: 'lg:col-span-6',
  },
  {
    id: 'cybersecurity-threat-detection',
    index: '02',
    title: 'AI-Powered Cybersecurity Threat Detection System',
    subtitle: 'Random Forest intrusion detection with real-time Flask alerting',
    category: 'AI & ML',
    tools: ['Python', 'Random Forest', 'Flask', 'Scikit-learn'],
    summary:
      'Trained and evaluated a Random Forest classifier on the NSL-KDD intrusion-detection dataset and built a Flask web dashboard for monitoring network threats and alerts.',
    highlights: [
      'Trained and evaluated a Random Forest classifier on the NSL-KDD intrusion-detection dataset.',
      'Preprocessed data and assessed model performance using classification metrics.',
      'Built a Flask dashboard for threat monitoring and alerts.',
    ],
    methodology: [
      {
        stage: 'Dataset Preprocessing',
        detail: 'Processed NSL-KDD network connection features, encoding categorical protocol fields and preparing train/test splits.',
      },
      {
        stage: 'Classification & Evaluation',
        detail: 'Trained a Random Forest ensemble model and validated detection quality using standard classification metrics.',
      },
      {
        stage: 'Monitoring Interface',
        detail: 'Integrated the trained model into a Flask dashboard to display classified traffic states and surface alerts.',
      },
    ],
    deliverable: 'Trained NSL-KDD Random Forest Model & Flask Alert Dashboard',
    visualType: 'cyber-threat',
    bentoSpan: 'lg:col-span-6',
  },
  {
    id: 'hireiq-resume-matcher',
    index: '03',
    title: 'HireIQ – AI-Powered Resume-Job Matcher',
    subtitle: 'Automated candidate-to-role fit assessment engine',
    category: 'AI & ML',
    tools: ['AI / ML', 'Python', 'Data Analysis'],
    summary:
      'Developed an AI-powered matching tool that compares candidate resumes against target job descriptions to evaluate skill alignment and overall role fit.',
    highlights: [
      'Built an AI-powered tool that matches resumes to job descriptions to assess candidate-job fit.',
    ],
    methodology: [
      {
        stage: 'Text Structuring',
        detail: 'Parsed resume sections and role requirements into normalized skill and qualification signals.',
      },
      {
        stage: 'Fit Evaluation',
        detail: 'Compared extracted candidate profiles against job criteria to surface alignment strengths and skill gaps.',
      },
      {
        stage: 'Screening Output',
        detail: 'Presented clear fit assessments to streamline early-stage candidate screening workflows.',
      },
    ],
    deliverable: 'AI Resume-to-JD Fit Assessment Application',
    visualType: 'hireiq-matcher',
    bentoSpan: 'lg:col-span-7',
  },
  {
    id: 'hr-analytics-attrition',
    index: '04',
    title: 'HR Analytics & Employee Attrition',
    subtitle: 'Workforce turnover diagnostics and retention insights',
    category: 'BI & Analytics',
    tools: ['Data Analysis', 'EDA', 'Reporting'],
    summary:
      'Analyzed workforce and HR datasets to isolate behavioral and organizational patterns linked to employee attrition, turning findings into retention guidance.',
    highlights: [
      'Analyzed HR data to identify patterns and factors associated with employee attrition.',
      'Summarized findings into insights to support employee-retention decisions.',
    ],
    methodology: [
      {
        stage: 'Exploratory Analysis',
        detail: 'Segmented workforce records across tenure, role, and department dimensions to expose turnover concentration.',
      },
      {
        stage: 'Driver Identification',
        detail: 'Evaluated recurring factors correlated with employee departure to separate signal from noise.',
      },
      {
        stage: 'Retention Summary',
        detail: 'Distilled analytical findings into structured takeaways designed for HR retention planning.',
      },
    ],
    deliverable: 'Attrition Factor Analysis & Executive Retention Report',
    visualType: 'hr-attrition',
    bentoSpan: 'lg:col-span-5',
  },
  {
    id: 'ecommerce-customer-analysis',
    index: '05',
    title: 'E-commerce Customer & Order Analysis',
    subtitle: 'SQL and Excel deep dive into purchasing behavior',
    category: 'BI & Analytics',
    tools: ['SQL', 'Excel', 'Data Cleaning'],
    summary:
      'Investigated customer and order transaction logs using SQL and Excel to clean, aggregate, and reveal purchasing behavior and seasonal order trends.',
    highlights: [
      'Analyzed customer and order data to understand purchasing behavior and order trends.',
      'Used SQL and Excel to clean, aggregate and summarize data into actionable insights.',
    ],
    methodology: [
      {
        stage: 'Data Hygiene',
        detail: 'Standardized order timestamps, customer identifiers, and transactional totals across datasets.',
      },
      {
        stage: 'SQL Aggregation',
        detail: 'Authored grouping and summary queries to measure order frequency, basket size, and repeat patterns.',
      },
      {
        stage: 'Actionable Summary',
        detail: 'Compiled Excel summaries translating customer purchasing patterns into clear merchandising insights.',
      },
    ],
    deliverable: 'SQL Aggregation Suite & Excel Behavioral Summary',
    visualType: 'ecommerce-orders',
    bentoSpan: 'lg:col-span-5',
  },
  {
    id: 'wanderlust-rental-platform',
    index: '06',
    title: 'Wanderlust – Property Rental Platform',
    subtitle: 'Full-stack listing, authentication, and booking application',
    category: 'Full-Stack',
    tools: ['Node.js', 'Express.js', 'MongoDB', 'EJS'],
    summary:
      'Engineered a full-stack property rental web platform featuring user authentication, listing CRUD management, and booking workflows backed by MongoDB and deployed on Render.',
    highlights: [
      'Built a full-stack rental platform with user authentication, listing management and booking, backed by MongoDB; deployed on Render.',
    ],
    methodology: [
      {
        stage: 'Database & Models',
        detail: 'Modeled users, property listings, and booking records in MongoDB with structured validation.',
      },
      {
        stage: 'Application Logic',
        detail: 'Implemented Express.js routing, authentication flows, and dynamic server-rendered EJS views.',
      },
      {
        stage: 'Production Hosting',
        detail: 'Configured environment variables and deployed the live full-stack platform on Render.',
      },
    ],
    deliverable: 'Production Node.js / MongoDB Web Application on Render',
    visualType: 'wanderlust-platform',
    bentoSpan: 'lg:col-span-7',
  },
];

export const SKILL_DOMAINS: SkillDomain[] = [
  {
    id: 'data-bi',
    index: '01',
    name: 'Data Analysis & BI',
    focus: 'Cleaning, exploratory analysis, KPI modeling, and executive dashboard design.',
    skills: [
      'SQL',
      'Excel',
      'Power BI',
      'Data Cleaning',
      'Exploratory Data Analysis (EDA)',
      'Dashboards & Reporting',
    ],
    relatedCategory: 'BI & Analytics',
  },
  {
    id: 'ml',
    index: '02',
    name: 'Machine Learning',
    focus: 'Supervised classification workflows, model evaluation, and numerical computing.',
    skills: [
      'Random Forest (Classification)',
      'Model Training & Evaluation',
      'Pandas',
      'NumPy',
      'Scikit-learn',
    ],
    relatedCategory: 'AI & ML',
  },
  {
    id: 'databases',
    index: '03',
    name: 'Databases',
    focus: 'Relational schema design, querying, aggregations, and database management.',
    skills: ['MySQL', 'DBMS', 'MongoDB'],
    relatedCategory: 'BI & Analytics',
  },
  {
    id: 'programming',
    index: '04',
    name: 'Programming',
    focus: 'Core analytical scripting, object-oriented fundamentals, and web scripting.',
    skills: ['Python', 'Java', 'C', 'JavaScript'],
    relatedCategory: 'AI & ML',
  },
  {
    id: 'tools-web',
    index: '05',
    name: 'Tools & Web',
    focus: 'Version control, lightweight ML serving, and full-stack web delivery.',
    skills: ['Git', 'VS Code', 'Flask', 'Node.js', 'Express.js', 'HTML5', 'CSS'],
    relatedCategory: 'Full-Stack',
  },
];

export const EDUCATION: EducationItem[] = [
  {
    degree: 'B.Tech, Computer Science',
    institution: 'GITA Autonomous College',
    location: 'Bhubaneswar',
    year: '2026',
    score: 'CGPA: 7.5',
  },
  {
    degree: 'Higher Secondary (12th)',
    institution: 'Udayanath H.S. School',
    location: 'Adaspur',
    year: '2019',
    score: '53%',
  },
  {
    degree: 'Secondary (10th)',
    institution: 'Siddhamangala Bidyaniketan',
    location: 'Karanga',
    year: '2017',
    score: '73%',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    title: 'Python for Everybody',
    issuer: 'Coursera',
    area: 'Programming & Data Structures',
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Coursera',
    area: 'Security Fundamentals',
  },
  {
    title: 'Java Programming',
    issuer: 'Cisco Networking Academy',
    area: 'Object-Oriented Engineering',
  },
  {
    title: 'AI Fluency for Students',
    issuer: 'Anthropic',
    area: 'Applied AI Literacy',
  },
];
