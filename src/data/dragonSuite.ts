// Dragon Suite page data, copied verbatim from the HTML prototype's script.
// Kept in one place (like okrionExperience.ts) so copy edits do not touch the component.

export const esc = (s: unknown) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string));
/** inline <svg> that references the sprite, used inside the chat card HTML strings */
export const ic = (n: string, c = '') => `<svg class="ic ${c}" aria-hidden="true"><use href="#i-${n}"/></svg>`;

export interface DsModule { n: string; i: string; d: string }
  export const MODS: Record<string, DsModule> = {
    gps:{n:'Dragon GPS',i:'compass',d:'Live 3, 6 or 12-month career route that reroutes as you progress and as the market shifts.'},
    prep:{n:'Dragon Prep',i:'book',d:'Practise across 10 exam streams and CS tracks, including training against a named company’s hiring needs.'},
    quest:{n:'Dragon Quest',i:'flag',d:'Streaks and rewards that keep preparation motivating.'},
    skillcraft:{n:'Skill Craft',i:'wrench',d:'Skill-building guided by which certifications carry demand and salary growth.'},
    projectlab:{n:'Project Lab',i:'flask',d:'Ship real projects that recruiters can see.'},
    onboarding:{n:'Talent Onboarding',i:'idcard',d:'Build a verified profile in 60 seconds from existing certifications.'},
    profile:{n:'My Profile',i:'user-check',d:'A verified, trust-scored identity with credentials pulled from issuing platforms.'},
    arena:{n:'Dragon Arena',i:'trophy',d:'9 proctored assessment formats across 43 domains, with a live Trust Score.'},
    review:{n:'Dragon Review',i:'clipboard',d:'Score breakdowns, benchmarks and proctor reports for candidates, placement teams and recruiters.'},
    hire:{n:'Dragon Hire',i:'briefcase',d:'Unique, company-calibrated assessments with 7-layer proctoring and configurable trust thresholds.'},
    hub:{n:'Dragon Hub',i:'grid',d:'One AI-ranked job feed from 50+ platforms.'},
    elite:{n:'Dragon Elite',i:'gem',d:'For talent who qualify with a Dragon Score of 85+.'},
    vault:{n:'Dragon Vault',i:'lock',d:'Access to roles at $100K+ or ₹10L+.'},
    bridge:{n:'Dragon Bridge',i:'link',d:'Live pipeline and campus-drive view, from sourced to hired.'},
    results:{n:'Match Results',i:'listcheck',d:'Explained candidate matches across certifications, skill scores and preference flags.'},
    ai:{n:'Dragon AI',i:'sparkles',d:'One conversational layer across every journey. It understands, identifies, recommends and acts.'},
    market:{n:'Market Intelligence',i:'trending',d:'Certification supply and demand gaps, salary trends and forecasts.'},
    tid:{n:'Talent Intelligence Dashboard',i:'bar',d:'12-month salary trends, a 6-month forecast and talent supply by city.'},
    nexus:{n:'Dragon Nexus (24+ connectors)',i:'network',d:'Shared foundation: 24+ connectors to job portals, coding platforms, communication tools and enterprise systems, plus credential platforms, ERP/LMS and HR systems.'},
    forge:{n:'Dragon Forge (content engine)',i:'flame',d:'Shared foundation: the content engine behind every question, problem and case study, keeping each module fresh.'}
  };

export interface DsCap { i: string; h: string; r: string; m: string[]; w: string }
export interface DsJourney { title: string; outIcon: string; outcome: string; steps: string[]; caps: DsCap[]; mock?: string }
  const J0: DsJourney[] = [
    { title:'From aspiration to a verified profile, then a job.', outIcon:'route', outcome:'A career path that adapts as your students grow.',
      steps:['Verify credentials','Set a destination','Practise and build','Take proctored assessments','Get matched'],
      caps:[
        { i:'route', h:'Build job-relevant skills', r:'Skills built with direction and a visible salary impact.', m:['Dragon GPS','Dragon Prep','Skill Craft','Project Lab','Dragon Quest'], w:'Choose a 3, 6 or 12-month career route with daily micro-actions. Practise across 10 exam streams and CS tracks. Train against a named company’s hiring needs. Ship real projects. Stay motivated with streaks and rewards.' },
        { i:'idcard', h:'Establish a verified identity', r:'A verified, trust-scored profile in 60 seconds.', m:['Talent Onboarding','My Profile','Dragon Nexus'], w:'Connect Credly, AWS, Google Cloud, Microsoft Learn, Snowflake, Databricks, NVIDIA DLI and more, or upload a certificate PDF. Bring in GitHub and LeetCode history.' },
        { i:'trophy', h:'Prove skills under real conditions', r:'Credentials earned under proctored conditions.', m:['Dragon Arena'], w:'Take 9 assessment formats across 43 domains, with a live Trust Score and a pre-assessment system check.' },
        { i:'clipboard', h:'Know exactly what to fix', r:'Every assessment ends with a next GPS step.', m:['Dragon Review (candidate view)','Dragon GPS'], w:'See score breakdowns against average and top-10% benchmarks, get specific feedback, and share credentials to LinkedIn.' },
        { i:'target', h:'Get discovered and placed', r:'From 84,000 listings to the handful that fit.', m:['Dragon Hub','Dragon Elite','Dragon Agent','Dragon Vault'], w:'Browse one AI-ranked feed from 50+ platforms. Qualify for Elite with a Dragon Score of 85+. Let Dragon Agent apply in Autonomous, Approval or Discovery mode. Access Vault roles at $100K+ or ₹10L+.' }
      ] },
    { title:'From batch uncertainty to a placement plan.', outIcon:'calendar', outcome:'Interventions that happen before the drive, not after it.',
      steps:['See the cohort','Flag at-risk students','Prescribe practice','Schedule drives','Track results'],
      caps:[
        { i:'users', h:'See where every student stands', r:'One clear picture of the cohort.', m:['Dragon Bridge (placement view)','Dragon Review (placement view)'], w:'View Dragon Score, readiness level and risk status per student, plus batch-level performance by section.' },
        { i:'alert', h:'Close gaps before the drive', r:'Interventions that land before drive day.', m:['Dragon Prep','Dragon GPS','Dragon Review'], w:'Get at-risk flags, auto-prescribed Dragon Prep paths, and cohort skill-gap analysis with a targeted boot camp recommendation.' },
        { i:'calendar', h:'Run campus drives with clarity', r:'Fewer surprises on drive day.', m:['Dragon Bridge','Dragon Review'], w:'Schedule drives with company confirmation status and eligible student counts. See which students cleared which company’s threshold.' },
        { i:'trending', h:'Guide certification choices', r:'Your students pursue credentials the market rewards.', m:['Market Intelligence','Skill Craft'], w:'Show students which certifications carry demand and salary growth before graduation.' },
        { i:'network', h:'Fit existing campus systems', r:'Dragon Suite works alongside the systems you already use.', m:['Dragon Nexus'], w:'Link college ERP and LMS through LTI 1.3, OAuth 2.0, API keys and webhooks.' }
      ] },
    { title:'From noisy pipelines to verified shortlists.', outIcon:'user-check', outcome:'Faster hiring decisions on candidates whose skills are already proven.',
      steps:['Define the role','Generate the assessment','Search verified talent','Review ranked scorecards','Hire'],
      caps:[
        { i:'shield-check', h:'Assess with integrity', r:'Zero leaked questions.', m:['Dragon Hire','Dragon Forge'], w:'Generate unique assessments calibrated to company, role, skill and level. Run 9 formats across 43+ domains with 7-layer proctoring and configurable trust thresholds.' },
        { i:'search', h:'Find verified talent fast', r:'Shortlists built on verified skills, not keywords.', m:['Match Results','Talent Intelligence Dashboard'], w:'Search in plain language and see why each candidate matched, including certifications, skill scores and preference flags.' },
        { i:'user-check', h:'Decide with explained confidence', r:'Decisions you can defend.', m:['Dragon Review (recruiter view)','Dragon Bridge'], w:'Review ranked leaderboards, hiring verdicts from Strong Hire to Below Threshold, culture fit, full proctor reports and compensation acceptance probability.' },
        { i:'users', h:'Run a live hiring pipeline', r:'One pipeline, one scoring logic.', m:['Dragon Bridge'], w:'Track candidates from sourced to hired. Score on hard skills, growth potential, soft skills, cultural fit and compensation alignment.' },
        { i:'bar', h:'Plan hiring against the market', r:'Roles, ranges and timelines set on real data.', m:['Market Intelligence','Talent Intelligence Dashboard'], w:'Track certification supply and demand gaps, 12-month salary trends, a 6-month forecast and talent supply by city.' },
        { i:'network', h:'Fit the existing hiring stack', r:'Results land where your HR team already works.', m:['Dragon Nexus'], w:'Push scorecards into Workday, SAP and BambooHR.' }
      ] }
  ];
/* tab order for the buyers: companies first, then placement officers and colleges, then candidates (each carries its own product screen) */
export const J: DsJourney[] = [J0[2], J0[1], J0[0]];
J[0].mock = 'mock2'; J[1].mock = 'mock1'; J[2].mock = 'mock0';

  export const LAYERS: { k: string; c: string; m: string[] }[] = [
    { k:'Develop', c:'rgba(239,62,73,.3)', m:['gps','prep','quest','skillcraft','projectlab'] },
    { k:'Prove', c:'rgba(239,62,73,.45)', m:['onboarding','profile','arena','review','hire'] },
    { k:'Match', c:'rgba(239,62,73,.6)', m:['hub','elite','vault','bridge','results'] },
    { k:'Intelligence', c:'rgba(239,62,73,.8)', m:['ai','market','tid'] },
    { k:'Foundation', c:'rgba(239,62,73,1)', m:['nexus','forge'] }
  ];

export interface DsFlow { id: string; t: string; i: string; n?: string; d: string; flow: string }
  export const FW: DsFlow[] = [
    { id:'prep', t:'Prep', i:'book', d:MODS.prep.d, flow:'Practice builds verified skills and scores for an 85+ Dragon Score, qualifying talent for Elite.' },
    { id:'elite', t:'Elite', i:'gem', d:MODS.elite.d, flow:'Elite talent activates Dragon Agent to discover, match and apply to calibrated roles.' },
    { id:'agent', t:'Agent', i:'bot', n:'Dragon Agent', d:'Finds, customises and submits applications in Autonomous, Approval or Discovery mode.', flow:'Applications sharpen matching while employers assess talent with unique calibrated tests.' },
    { id:'hire', t:'Hire', i:'briefcase', d:MODS.hire.d, flow:'Results land in one live pipeline scored on verified skills, potential and compensation.' },
    { id:'bridge', t:'Bridge', i:'link', d:MODS.bridge.d, flow:'Every hire sharpens calibration, feeding outcomes to Dragon GPS as market demands shift.' },
    { id:'gps', t:'GPS', i:'compass', d:MODS.gps.d, flow:'Assessments sharpen career navigation, mapping next steps and routing back to Dragon Prep.' }
  ];

export type DsMsg =
  | { r: 'user'; t: string; pause?: number }
  | { r: 'ai'; t: string; step?: number; src?: string[]; delay?: number; pause?: number }
  | { r: 'card'; html: string; step?: number; delay?: number; pause?: number };
export interface DsRole { label: string; loop: string[]; script: DsMsg[] }
  const ROLES0: DsRole[] = [
    { label:'Dragon AI · Students & Job Seekers',
      loop:[
        'Reads GPS route, verified badges and live assessment telemetry',
        'Pinpoints specific skill gaps holding back top-tier hiring eligibility',
        'Reroutes daily preparation plan with targeted high-yield sprints',
        'Deploys autonomous Dragon Agent to apply for verified role matches'
      ],
      script:[
        { r:'user', t:'I want a Cloud Backend role in 60 days. What’s blocking me and can you handle the applications?' },
        { r:'ai', step:0, t:'Auditing your verified AWS badges, Arena test history, and live fintech hiring cutoffs.', src:['3 Verified Certs','Dragon Score 88','Cloud Backend Benchmark'], delay:600 },
        { r:'ai', step:1, t:'You’re at <strong>92% readiness</strong> on APIs & Containers, but <strong>System Design (Distributed Caching)</strong> is keeping you just below the Elite shortlist.', delay:650 },
        { r:'ai', step:2, t:'I’ve inserted a focused 3-day Caching sprint into your GPS, and drafted 3 verified applications with your proof-of-work cards.', delay:700 },
        { r:'card', step:3, html:`<div class="acard"><div class="acard-h">${ic('clipboard')}3-Day System Design Sprint<span class="pill done">Added to GPS</span></div><div class="arow"><span>Distributed Caching · 45 min</span><b>Start Practice</b></div></div>` },
        { r:'card', html:`<div class="acard"><div class="acard-h">${ic('bot')}Dragon Agent · Autonomous Queue<span class="pill done">3 Matched</span></div><div class="arow"><span>Fintech Backend (94% match)</span><b style="color:var(--ok)">Auto-Applied</b></div><div class="arow"><span>Cloud Infra Role (89% match)</span><b style="color:var(--muted)">Reviewing</b></div></div>` }
      ] },
    { label:'Dragon AI · Placement Officers & Colleges',
      loop:[
        'Audits whole-batch performance and upcoming campus drive timelines',
        'Surfaces at-risk students and cohort gaps against hiring thresholds',
        'Designs instant intervention bootcamps and targeted preparation paths',
        'Generates institutional readiness reports and dispatches student invitations'
      ],
      script:[
        { r:'user', t:'We have the Tier-1 tech drive in 3 weeks. Are our students ready, and how do we clear cutoffs?' },
        { r:'ai', step:0, t:'Auditing 320 student profiles against Tier-1 partner hiring cutoffs and historical drive benchmarks.', src:['320 Student Profiles','Proctored Arena Scores','Tier-1 Cutoff Rules'], delay:600 },
        { r:'ai', step:1, t:'<strong>248 students</strong> meet the 85+ score cutoff. However, <strong>42 students</strong> lag in <strong>DSA Trees & Graphs</strong>, risking a 13% placement drop.', delay:650 },
        { r:'ai', step:2, t:'Configured a rapid 5-day bootcamp in Dragon Prep for flagged students, and prepared verified batch portfolios for visiting employers.', delay:700 },
        { r:'card', step:3, html:`<div class="acard"><div class="acard-h">${ic('bar')}Campus Drive Readiness Audit<span class="pill done">Complete</span></div><div class="arow"><span>248 Drive-Ready · 42 Intervention</span><b>View Cohort</b></div></div>` },
        { r:'card', html:`<div class="acard"><div class="acard-h">${ic('calendar')}5-Day DSA Intervention Bootcamp<span class="pill done">Scheduled</span></div><div class="arow"><span>Assigned to 42 flagged students</span><b>Active in Prep</b></div></div>` }
      ] },
    { label:'Dragon AI · Companies & HR Teams',
      loop:[
        'Screens inbound candidate pool against calibrated company role benchmarks',
        'Eliminates unverified claims with 7-layer anti-cheat proctored telemetry',
        'Ranks qualified talent with transparent decision scorecards and compensation fit',
        'Automates calibrated technical assessments and delivers shortlists to hiring managers'
      ],
      script:[
        { r:'user', t:'We need 5 Senior Backend Engineers by next Friday. Screen applicants and filter out unverified resumes.' },
        { r:'ai', step:0, t:'Scanning 184 inbound applicants against your tech stack using 7-layer proctor telemetry and code playback.', src:['184 Inbound Applicants','Anti-Cheat Telemetry','Golang/K8s Calibration'], delay:600 },
        { r:'ai', step:1, t:'Filtered out 112 unverified or flagged profiles. Identified <strong>14 top-tier engineers</strong> with 90%+ code execution fidelity.', delay:650 },
        { r:'ai', step:2, t:'Generated ranked candidate scorecards with explained decision factors and pre-scheduled 1-click technical round invites.', delay:700 },
        { r:'card', step:3, html:`<div class="acard"><div class="acard-h">${ic('users')}Verified Engineering Shortlist<span class="pill done">14 Ranked</span></div><div class="arow"><span>Candidate A · 96% Match (Trust 98)</span><b style="color:var(--ok)">Instant Hire</b></div><div class="arow"><span>Candidate B · 92% Match (Trust 95)</span><b>Interview</b></div></div>` },
        { r:'card', html:`<div class="acard"><div class="acard-h">${ic('send')}Calibrated Technical Screening<span class="pill done">Dispatched</span></div><div class="arow"><span>14 Proctored invites delivered</span><b>Track Pipeline</b></div></div>` }
      ] }
  ];
export const ROLES: DsRole[] = [ROLES0[2], ROLES0[1], ROLES0[0]]; // companies, placement officers and colleges, then candidates

/** Dragon Suite pitch deck (Google Drive), opened by the hero's View Deck button */
export const deckUrl = 'https://drive.google.com/file/d/12YkgNxq7-CVgG7ibfNdxZ9i_kesHnRUO/view?usp=drive_link';

export const heroScript: DsMsg[] = [
  { r: 'user', t: 'Find backend roles that fit my profile and apply for me.' },
  { r: 'ai', t: 'On it. Reading your profile first.', src: ['GPS progress', 'Assessment scores', 'Verified credentials'], delay: 800 },
  { r: 'ai', t: 'Dragon Score <strong>86</strong>, so you’re <strong>Elite eligible</strong>. <strong>4 roles</strong> match your verified skills.', delay: 1000 },
  { r: 'card', html: `<div class="acard"><div class="acard-h">${ic('bot')}Dragon Agent<span class="pill">Awaiting sign-off</span></div>
        <div class="arow"><span>Backend Engineer · Fintech</span><b>91% match</b></div>
        <div class="abtns"><button data-act="approve">Approve &amp; submit</button><button class="g" data-act="edit">Review</button></div></div>`, pause: 1200 }
];
