export const workflow = [
  {
    title: "Configure",
    text: "Set objectives, pillars, policies and review rules.",
  },
  {
    title: "Assign",
    text: "Connect people to roles, mentors and responsibilities.",
  },
  { title: "Submit", text: "Capture achievements with supporting evidence." },
  {
    title: "Review",
    text: "Check submissions, give feedback and resolve exceptions.",
  },
  {
    title: "Monitor",
    text: "Follow progress across individuals, teams and departments.",
  },
  {
    title: "Report",
    text: "Bring reviewed outcomes together for institutional reviews.",
  },
];
export const roleDetails: Record<
  string,
  { headline: string; tasks: string[]; outcome: string }
> = {
  student: {
    headline: "Turn everyday effort into visible progress.",
    tasks: [
      "Follow assigned objectives and personal goals",
      "Submit achievements with supporting evidence",
      "Track review status and respond to feedback",
    ],
    outcome:
      "A clear view of what to do next, what is under review and what has been completed.",
  },
  faculty: {
    headline: "Guide progress with context.",
    tasks: [
      "Review mentee submissions and evidence",
      "Give feedback and follow up on pending work",
      "Track personal and mentoring responsibilities",
    ],
    outcome:
      "A connected workspace for faculty achievements and student mentoring.",
  },
  head: {
    headline: "Connect department priorities and execution.",
    tasks: [
      "Review department-level progress",
      "Follow faculty and student activity",
      "Identify pending reviews and gaps",
    ],
    outcome:
      "Department oversight supported by the evidence behind each outcome.",
  },
  "cluster-head": {
    headline: "See the bigger picture across departments.",
    tasks: [
      "Follow progress across mapped departments",
      "Review outcomes within the assigned hierarchy",
      "Spot gaps that need coordinated action",
    ],
    outcome: "A consistent view of progress across a wider academic team.",
  },
  leader: {
    headline: "Connect institutional priorities with measurable work.",
    tasks: [
      "Review institution-wide progress",
      "Follow performance across teams and pillars",
      "Use reports to guide review conversations",
    ],
    outcome:
      "A shared picture of progress, supported by submitted and reviewed evidence.",
  },
  admin: {
    headline: "Keep the workspace organized and ready for people.",
    tasks: [
      "Manage permitted user and workspace functions",
      "Maintain assigned operational responsibilities",
      "Adjust settings where access has been delegated",
    ],
    outcome:
      "Practical administration with access defined by the platform team.",
  },
  ops_member: {
    headline: "Make operational contributions visible.",
    tasks: [
      "Record assigned operational activities",
      "Attach supporting evidence to submissions",
      "Follow status, feedback and completion",
    ],
    outcome:
      "Operational contributions become visible alongside academic progress.",
  },
};
export const capabilities = [
  {
    title: "Goals with a clear structure",
    text: "Organize objectives and tasks into pillars so people understand how their work connects to wider priorities.",
  },
  {
    title: "Evidence behind every outcome",
    text: "Keep submissions, supporting files and review status connected instead of scattered across separate tools.",
  },
  {
    title: "Mentoring that stays connected",
    text: "Bring mentees, faculty and academic leadership into a mapped review and feedback process.",
  },
  {
    title: "Reviews with accountability",
    text: "Use configured approval paths, review policies and exception handling to keep decisions traceable.",
  },
  {
    title: "Visibility at every level",
    text: "Follow individual, department and institutional progress through role-appropriate dashboards.",
  },
  {
    title: "Reporting with context",
    text: "Organize achievement evidence for internal reviews and NAAC, NBA and NIRF preparation.",
  },
];
export const aiWorkflow = [
  {
    title: "Collect the evidence",
    text: "Bring together the achievement, supporting links, files and relevant task context.",
  },
  {
    title: "Assist the checks",
    text: "Enabled integrations and AI-assisted workflows help examine supported evidence against configured rules.",
  },
  {
    title: "Surface what needs attention",
    text: "Help reviewers focus on missing information, flagged evidence and submissions needing a decision.",
  },
  {
    title: "Connect the outcome",
    text: "Keep review decisions and feedback attached to the submission and its progress record.",
  },
];
