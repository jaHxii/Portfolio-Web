import React from 'react';
import { motion } from 'framer-motion';
import { Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/layout/Navigation';
import SEO from '@/components/seo/SEO';

/* ─── Real data from Ermias's CV ─────────────────── */

const INFO = {
  name: 'ERMIAS LEMESA BAYISA',
  title: 'Computer Engineer | IT Support Specialist | Hardware Engineer',
  location: 'Addis Ababa, Ethiopia',
  phone: '+251921615244',
  email: 'ermias.xii@gmail.com',
  github: 'github.com/jaHxii',
  telegram: 't.me/cloudx69',
};

const SUMMARY =
  'Proactive and detail-oriented IT Support Technician (B.Sc. Computer Engineering, CGPA: 3.42) with hands-on enterprise IT support experience. Currently serving as a Senior IT Support specialist, adept at installing/configuring hardware/OS, diagnosing complex network faults, managing user accounts/permissions, and resolving helpdesk tickets within SLAs. Proven track record of providing clear remote, chat, and in-person end-user support, ensuring smooth daily operations for multi-floor office environments. Experienced in creating detailed technical documentation, system diagrams, and user training materials. Developed an automated IT Helpdesk Ticketing System, demonstrating strong decision-making and workflow prioritization skills. Highly empathetic and collaborative, with a strong ability to understand end-user perspectives while maintaining professionalism under pressure.';

const EDUCATION = {
  period: 'Aug 2021 - Aug 2025',
  school: 'University of Gondar',
  degree: 'B.Sc. in Computer Engineering',
  cgpa: '3.42',
};

const PROJECTS = [
  {
    title: 'KIRAY - Rental & Building Management System',
    note: 'Final Year Project',
    bullets: [
      'Designed and developed a full-stack rental management platform',
      'Implemented tenant management, payment tracking, and reporting modules',
      'Designed relational database schema for structured data management',
      'Integrated authentication and user role control',
      'Focused on automation of rental operations and record-keeping',
    ],
  },
  {
    title: 'MESOB IT Helpdesk Ticketing System',
    bullets: [
      'Developed an automated IT support ticketing platform',
      'Implemented issue tracking, prioritization, and lifecycle management',
      'Designed backend logic for handling support workflows',
      'Improved coordination between technical staff and users',
    ],
  },
  {
    title: 'Real-Time Analytics Dashboard',
    bullets: [
      'Developed a real-time data monitoring dashboard',
      'Implemented live data streaming using WebSocket integration',
      'Optimized data rendering performance',
      'Built interactive visualization components for operational metrics',
    ],
  },
  {
    title: 'Progressive Web Application (E-Commerce Platform)',
    bullets: [
      'Built a PWA with offline capabilities and caching strategies',
      'Designed responsive user interface and product management modules',
      'Implemented performance optimization techniques',
    ],
  },
  {
    title: 'Local Network Printer Information Collector',
    bullets: [
      'Developed a Windows executable tool for scanning printers on a local network',
      'Automated device discovery and configuration reporting',
      'Designed for IT asset monitoring',
    ],
  },
];

const EXPERIENCE = [
  {
    company: 'ROTECH Information Technology',
    role: 'Senior IT Support',
    period: 'Present',
    bullets: [
      'Diagnose and resolve network, printer, and hardware issues across multiple office locations',
      'Configure VPNs, cross-network folder sharing, and Wi-Fi troubleshooting for multi-floor environments',
      'Manage IT procurement, hardware evaluation, and vendor coordination',
      'Deliver end-user training, technical documentation, and weekly reporting',
    ],
  },
  {
    company: 'Addis Mesob - Bole Branch',
    role: 'Hardware Engineer',
    period: 'Past',
    bullets: [
      'Install, configure, and maintain computer hardware systems',
      'Diagnose and troubleshoot hardware and peripheral issues',
      'Support printer setup, network connectivity, and system maintenance',
      'Ensure operational continuity of IT equipment',
      'Assist in technical documentation and system monitoring',
    ],
  },
  {
    company: 'Ethiopian Artificial Intelligence Institute (EAII)',
    role: 'AI/ML Intern',
    period: 'Past',
    bullets: [
      'Assisted in data collection, cleaning, and preprocessing for AI model development',
      'Participated in training and evaluation of machine learning models',
      'Contributed to AI-based chatbot development and deployment',
      'Prepared technical documentation and research summaries',
      'Collaborated with cross-functional technical teams',
    ],
  },
];

const TECH_SKILLS = [
  {
    label: 'IT & Infrastructure',
    value: 'IT Infrastructure Support, System Troubleshooting, Process Automation, Technical Documentation',
  },
  {
    label: 'Programming & Data',
    value: 'Python Programming, Machine Learning Fundamentals, Database Design & SQL',
  },
  {
    label: 'Development',
    value: 'Web Application Development, Strong Written & Verbal Communication',
  },
];

const ATTRIBUTES = [
  'Strong analytical mindset',
  'High accountability and professionalism',
  'Respect for confidentiality',
  'Team collaboration and adaptability',
  'Digital learning agility',
];

const REFERENCE = {
  name: 'Kumneger Sitotaw (MSc)',
  role: 'Head, Department of Digitization | Addis Mesob - Bole Branch',
  phone: '+251 92 043 8072',
};

/* ─── Component ──────────────────────────────────── */

const Resume = () => {
  const handlePrint = () => window.print();

  return (
    <>
      <SEO
        title='Resume — Ermias Lemesa Bayisa'
        description='Resume of Ermias Lemesa Bayisa — Computer Engineer, IT Support Specialist and Hardware Engineer based in Addis Ababa, Ethiopia.'
        keywords={[
          'resume',
          'CV',
          'Ermias Lemesa',
          'Computer Engineer',
          'IT Support',
          'Hardware Engineer',
        ]}
      />

      {/* ── Action bar (screen only) ── */}
      <div className='print:hidden'>
        <Navigation />
      </div>

      <div className='print:hidden fixed top-16 left-0 right-0 z-40 bg-background/90 backdrop-blur border-b border-border'>
        <div className='max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4'>
          <span className='text-xs text-muted-foreground hidden sm:block'>
            Use <strong>Print → Save as PDF</strong>, or download my CV.
          </span>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              asChild
              className='flex items-center gap-2'
            >
              <a href='/Ermias.L_cv.pdf' download>
                <Download className='h-4 w-4' />
                Download PDF
              </a>
            </Button>
            <Button
              onClick={handlePrint}
              size='sm'
              className='ml-auto flex items-center gap-2 btn-glow'
            >
              <Printer className='h-4 w-4' />
              Print
            </Button>
          </div>
        </div>
      </div>

      {/* ── Resume sheet ── */}
      <div className='min-h-screen bg-background pt-28 pb-20 print:pt-0 print:pb-0 print:bg-white'>
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='max-w-4xl mx-auto px-6 print:px-0
                     bg-card print:bg-white
                     shadow-xl print:shadow-none
                     rounded-2xl print:rounded-none
                     border border-border/50 print:border-none'
          style={{ fontFamily: "'Times New Roman', Times, serif" }}
        >
          <div className='p-10 print:p-8'>
            {/* ── Name & contact line ── */}
            <header className='mb-5 print:mb-4'>
              <h1 className='text-3xl font-bold tracking-widest text-foreground print:text-black uppercase mb-1'>
                {INFO.name}
                <span className='block w-full h-px bg-primary mt-1 print:bg-blue-700' />
              </h1>
              <p className='text-primary print:text-blue-700 font-semibold text-base mt-1'>
                {INFO.title}
              </p>
              <p className='text-sm text-muted-foreground print:text-gray-700 mt-1'>
                {INFO.location}&nbsp;&nbsp;|&nbsp;&nbsp; Phone:&nbsp;
                {INFO.phone}&nbsp;&nbsp;|&nbsp;&nbsp;
                {INFO.email}
              </p>
              <p className='text-sm text-muted-foreground print:text-gray-700'>
                GitHub:&nbsp;{INFO.github}&nbsp;&nbsp;|&nbsp;&nbsp;
                Telegram:&nbsp;{INFO.telegram}
              </p>
            </header>

            {/* ── Professional Summary ── */}
            <Section title='PROFESSIONAL SUMMARY:'>
              <blockquote className='border-l-2 border-primary print:border-blue-700 pl-4 text-sm leading-relaxed text-foreground/90 print:text-gray-800'>
                {SUMMARY}
              </blockquote>
            </Section>

            {/* ── Education ── */}
            <Section title='EDUCATION:'>
              <div className='text-sm space-y-0.5 text-foreground/90 print:text-gray-800'>
                <p className='font-medium'>
                  {EDUCATION.period} | {EDUCATION.school}
                </p>
                <p>{EDUCATION.degree}</p>
                <p>CGPA: {EDUCATION.cgpa}</p>
              </div>
            </Section>

            {/* ── Major Projects ── */}
            <Section title='MAJOR PROJECTS:'>
              <div className='space-y-4'>
                {PROJECTS.map(p => (
                  <div key={p.title}>
                    <p className='text-sm font-medium text-foreground print:text-black'>
                      {p.title}
                      {p.note && (
                        <span className='font-normal text-muted-foreground print:text-gray-600'>
                          {' '}
                          ({p.note})
                        </span>
                      )}
                    </p>
                    <ul className='mt-1 space-y-0.5 list-disc list-inside'>
                      {p.bullets.map((b, i) => (
                        <li
                          key={i}
                          className='text-sm text-muted-foreground print:text-gray-700 ml-2'
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            {/* ── Professional Experience ── */}
            <Section title='PROFESSIONAL EXPERIENCE:'>
              <div className='space-y-5'>
                {EXPERIENCE.map(e => (
                  <div key={e.company}>
                    <p className='text-sm font-medium text-foreground print:text-black'>
                      {e.company}
                    </p>
                    <p className='text-sm text-muted-foreground print:text-gray-600'>
                      {e.role}
                      {e.period ? ` | ${e.period}` : ''}
                    </p>
                    <ul className='mt-1 space-y-0.5 list-disc list-inside'>
                      {e.bullets.map((b, i) => (
                        <li
                          key={i}
                          className='text-sm text-muted-foreground print:text-gray-700 ml-2'
                        >
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            {/* ── Skills + Attributes side-by-side ── */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-8 mt-6 print:grid-cols-2'>
              {/* Technical Skills */}
              <div>
                <SectionTitle title='TECHNICAL & ANALYTICAL SKILLS' />
                <ul className='space-y-1 mt-3'>
                  {TECH_SKILLS.map(s => (
                    <li
                      key={s.label}
                      className='text-sm text-foreground/90 print:text-gray-800'
                    >
                      <span className='font-semibold'>{s.label}:</span>{' '}
                      {s.value}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Additional Attributes + Reference */}
              <div className='space-y-6'>
                <div>
                  <SectionTitle title='ADDITIONAL ATTRIBUTES:' />
                  <ul className='space-y-1 mt-3 list-disc list-inside'>
                    {ATTRIBUTES.map((a, i) => (
                      <li
                        key={i}
                        className='text-sm text-muted-foreground print:text-gray-700'
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <SectionTitle title='REFERENCE:' />
                  <p className='text-sm text-foreground/90 print:text-gray-800 mt-3'>
                    {REFERENCE.name}
                  </p>
                  <p className='text-sm text-muted-foreground print:text-gray-700'>
                    {REFERENCE.role}
                  </p>
                  <p className='text-sm text-muted-foreground print:text-gray-700'>
                    {REFERENCE.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.article>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          @page { margin: 1.2cm; size: A4; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </>
  );
};

/* ── Helpers ── */
const SectionTitle = ({ title }: { title: string }) => (
  <div>
    <h2 className='text-sm font-bold tracking-wide uppercase text-primary print:text-blue-700'>
      {title}
    </h2>
    <div className='h-px bg-primary/40 print:bg-blue-300 mt-1' />
  </div>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className='mt-6 print:mt-4 print:break-inside-avoid'>
    <SectionTitle title={title} />
    <div className='mt-3'>{children}</div>
  </div>
);

export default Resume;
