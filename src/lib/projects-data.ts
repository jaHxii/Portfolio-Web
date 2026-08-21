import { MESOB_DEMO_IMAGES } from '@/lib/mesob-demo-images';
import {
  CAREHUB_DEMO_IMAGES,
  CAREHUB_MAIN_IMAGE,
} from '@/lib/carehub-demo-images';
import {
  PYTHON_SNMP_DEMO_IMAGES,
  PYTHON_SNMP_MAIN_IMAGE,
} from '@/lib/python-snmp-demo-images';

export interface ProjectData {
  title: string;
  description: string;
  category: string;
  tech: string[];
  github?: string;
  demo?: string;
  image?: string;
  /** Extended bullet-point metrics shown on the Projects page */
  metrics?: string[];
  /** Screenshots shown in the DemoGallery lightbox */
  demoImages?: string[];
}

/**
 * All projects in display order.
 * Consumer pages pick the fields they need — no duplication.
 */
export const ALL_PROJECTS: readonly ProjectData[] = [
  {
    title: 'Melala Coffee',
    description:
      'A modern, responsive website for Melala Coffee Wesen - an authentic Ethiopian coffee shop in Addis Ababa - with a menu, story, gallery, and location pages. Deployed and served worldwide via Netlify.',
    category: 'Frontend',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Netlify'],
    github: 'https://github.com/jaHxii/melala-buna-brand',
    demo: 'https://melalacoffee.netlify.app',
    image: '/melalaCoffee.webp',
    metrics: ['Live production site', 'Responsive design', 'Fast CDN delivery'],
  },
  {
    title: 'KIRAY - Rental & Building Management System',
    description:
      'Full-stack rental management platform built as a final year project. Handles tenant management, payment tracking, and reporting, with a relational database schema, authentication, and user role control.',
    category: 'Full Stack',
    tech: ['React', 'Node.js', 'Database', 'Authentication'],
    github: 'https://github.com/jaHxii/kiray.git',
    image: '/kiray_page.webp',
    metrics: [
      'Final Year Project',
      'Tenant, payment & reporting modules',
      'Relational database schema',
      'Authentication and role control',
    ],
  },
  {
    title: 'MESOB IT Helpdesk Ticketing System',
    description:
      'Automated IT support ticketing platform for managing helpdesk workflows - issue tracking, prioritization, and lifecycle management, improving coordination between technical staff and users.',
    category: 'Full Stack',
    tech: ['Backend Logic', 'Workflow Management', 'Ticketing'],
    github: 'https://github.com/jaHxii/Mesob-Help_Desk.git',
    image: '/mesob_page.webp',
    metrics: [
      'Built for enterprise IT support',
      'Issue tracking and prioritization',
      'Ticket lifecycle management',
      'Workflow automation between staff & users',
    ],
    demoImages: MESOB_DEMO_IMAGES,
  },
  {
    title: 'CareHub - Healthcare Management System',
    description:
      'Fullstack clinic platform handling appointments, patient records, and prescriptions with PostgreSQL-enforced conflict-free scheduling and role-based access.',
    category: 'Full Stack',
    tech: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'PostgreSQL',
      'JWT',
      'Docker',
    ],
    github: 'https://github.com/jaHxii/CareHub.git',
    image: CAREHUB_MAIN_IMAGE,
    metrics: [
      'End-to-end fullstack: React + Express + PostgreSQL',
      'Overlap-free scheduling via tstzrange exclusion constraint',
      'JWT + RBAC with row-level scoping',
      'Medical history as JSONB - no schema migrations',
    ],
    demoImages: CAREHUB_DEMO_IMAGES,
  },
  {
    title: 'Realtime Support Ops Dashboard',
    description:
      'Real-time customer support ops dashboard streaming simulated ticket activity over WebSocket, visualized with a custom D3 chart and a virtualized 10,000-row live log - with offline fallback, filters, and 15 passing tests.',
    category: 'Frontend',
    tech: ['React', 'WebSocket', 'Data Visualization'],
    github: 'https://github.com/jaHxii/realtime-support-ops-dashboard.git',
    image: '/realtime-support-ops-dashboard_page.webp',
    metrics: [
      'WebSocket live ticket streaming',
      'Custom D3 data visualizations',
      'Virtualized 10,000-row live log',
      'Offline fallback + filters',
      '15 passing tests',
    ],
    demoImages: ['/realtime-support-ops-dashboard_page.webp'],
  },
  {
    title: 'Local Network Printer Information Collector',
    description:
      'Windows executable tool that scans printers on a local network, automating device discovery and configuration reporting for IT asset monitoring.',
    category: 'IT/DevOps',
    tech: ['Python', 'SNMP', 'Windows', 'Network Scanning'],
    github: 'https://github.com/jaHxii/Python-SNMP-Printer.git',
    image: PYTHON_SNMP_MAIN_IMAGE,
    metrics: [
      'SNMP-based printer discovery',
      'Automated configuration reporting',
      'Packaged as a Windows executable',
      'Built for IT asset monitoring',
    ],
    demoImages: PYTHON_SNMP_DEMO_IMAGES,
  },
  {
    title: 'Sador Bar & Restaurant - Digital Menu',
    description:
      'Bilingual Amharic/English digital menu for Sador Bar and Restaurant - a small frontend with separate food and drinks/bar pages, categorized sections with prices including 15% VAT, and a QR code for scanning the menu on your phone. Deployed and served via Netlify.',
    category: 'Frontend',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Netlify'],
    demo: 'https://sador-menu.netlify.app/',
    image: '/sador-menu.webp',
    metrics: [
      'Bilingual Amharic & English UI',
      'Food and drinks/bar menu pages',
      'Prices shown with 15% VAT included',
      'QR code for phone access',
      'Live production site on Netlify',
    ],
  },
] as const;
