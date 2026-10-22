export interface OkrionDemoRole {
  id: string;
  name: string;
  description: string;
  // Set the product's role ID and destination when demo access is available.
  productRoleId?: string;
  loginUrl?: string;
}

export interface OkrionProduct {
  websiteUrl: string;
  heroImageUrl?: string;
  description: string;
  capabilities: string[];
  descriptionPoints: string[];
  roles: OkrionDemoRole[];
}

export const okrion: OkrionProduct = {
  websiteUrl: 'https://okrion.ai/',
  heroImageUrl: '/images/okrion/placeholder.svg',
  description:
    'An academic OKR platform that brings goals, achievements, and progress into one place. Help students stay on track, support faculty mentoring, and simplify institutional reviews.',
  capabilities: [
    'Academic goal & progress tracking',
    'Digital submission verification',
    'Achievement & credential validation',
    'Mentor evaluations & feedback',
    'NAAC, NBA & NIRF compliance support',
    'User management & analytics',
  ],
  descriptionPoints: [
    'Define objectives and track student achievements in a shared academic workspace.',
    'Automate verification of digital submissions and credentials to support reliable progress records.',
    'Bring mentees, mentors, and administrators together for evaluations, feedback, and oversight.',
    'Support institutional reporting and accreditation processes with organized achievement evidence.',
  ],
  roles: [
    { id: 'student', name: 'Student', description: 'Explore personal goals, achievement submissions, and progress.' },
    { id: 'faculty', name: 'Faculty', description: 'Explore mentoring, submission reviews, and student feedback.' },
    { id: 'head', name: 'Head', description: 'Explore department goals and team progress.' },
    { id: 'cluster-head', name: 'Cluster Head', description: 'Explore progress and alignment across departments.' },
    { id: 'leader', name: 'Leader', description: 'Explore institutional objectives and performance overviews.' },
    { id: 'admin', name: 'Admin', description: 'Explore user management, access, and platform settings.' },
  ],
};
