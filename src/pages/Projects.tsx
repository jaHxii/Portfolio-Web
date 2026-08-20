import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Atmosphere from '@/components/atmosphere/Atmosphere';
import FlightLog from '@/components/ui/flight-log';
import ConfirmCodeLink from '@/components/ui/confirm-code-link';
import SEO from '@/components/seo/SEO';
import StructuredData from '@/components/seo/StructuredData';
import { useSEO } from '@/hooks/use-seo';
import { useStructuredData } from '@/hooks/use-structured-data';
import DemoGallery from '@/components/sections/DemoGallery';
import { MESOB_DEMO_IMAGES } from '@/lib/mesob-demo-images';
import {
  CAREHUB_DEMO_IMAGES,
  CAREHUB_MAIN_IMAGE,
} from '@/lib/carehub-demo-images';
import {
  PYTHON_SNMP_DEMO_IMAGES,
  PYTHON_SNMP_MAIN_IMAGE,
} from '@/lib/python-snmp-demo-images';

interface Project {
  title: string;
  description: string;
  category: string;
  tech: string[];
  github?: string;
  demo?: string;
  image?: string;
  metrics?: string[];
  demoImages?: string[];
}

const CATEGORIES = ['All', 'Frontend', 'Full Stack', 'IT/DevOps'];

const ALTITUDE_LAYERS = [
  'FOUNDATION',
  'SYSTEMS',
  'NETWORK',
  'INTELLIGENCE',
  'APPLICATIONS',
  'PLATFORM',
];

const Projects = () => {
  const seoProps = useSEO();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects: Project[] = useMemo(
    () => [
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
          'Fullstack platform for appointments, patient records, and prescriptions mirroring real clinic workflows. Conflict-free scheduling is enforced by a PostgreSQL tstzrange exclusion constraint - the database rejects overlapping appointments with a 409. Role-based access across Admin/Doctor/Patient, medical history as JSONB, and server-side PDF reports with per-user rate limiting.',
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
        demoImages: ['/realtime-support-ops-dashboard_page.webp'],
        metrics: [
          'WebSocket live ticket streaming',
          'Custom D3 data visualizations',
          'Virtualized 10,000-row live log',
          'Offline fallback + filters',
          '15 passing tests',
        ],
      },
      {
        title: 'Local Network Printer Information Collector',
        description:
          'Windows executable tool that scans printers on a local network, automating device discovery and configuration reporting for IT asset monitoring.',
        category: 'IT/DevOps',
        tech: ['Python', 'SNMP', 'Windows', 'Network Scanning'],
        github: 'https://github.com/jaHxii/Python-SNMP-Printer.git',
        image: PYTHON_SNMP_MAIN_IMAGE,
        demoImages: PYTHON_SNMP_DEMO_IMAGES,
        metrics: [
          'SNMP-based printer discovery',
          'Automated configuration reporting',
          'Packaged as a Windows executable',
          'Built for IT asset monitoring',
        ],
      },
      {
        title: 'Melala Coffee',
        description:
          'A modern, responsive website for Melala Coffee Wesen - an authentic Ethiopian coffee shop in Addis Ababa - with a menu, story, gallery, and location pages. Deployed and served worldwide via Netlify.',
        category: 'Frontend',
        tech: ['React', 'TypeScript', 'Tailwind CSS', 'Netlify'],
        github: 'https://github.com/jaHxii/melala-buna-brand',
        demo: 'https://melalacoffee.netlify.app',
        image: '/melalaCoffee.webp',
        metrics: [
          'Live production site',
          'Responsive design',
          'Fast CDN delivery',
        ],
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
    ],
    []
  );

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory =
        activeCategory === 'All' || project.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tech.some(tech => tech.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  // Prepare project data for structured data
  const projectsForSchema = projects.map(project => ({
    name: project.title,
    description: project.description,
    ...(project.demo ? { url: project.demo } : {}),
    ...(project.image ? { image: project.image } : {}),
    keywords: project.tech,
    programmingLanguage: project.tech,
    ...(project.github ? { codeRepository: project.github } : {}),
  }));

  const { breadcrumbSchema, projectSchemas } = useStructuredData({
    projects: projectsForSchema,
  });

  return (
    <div className='min-h-screen bg-background'>
      <SEO {...seoProps} />
      <StructuredData schema={breadcrumbSchema} />
      {projectSchemas?.map((schema, index) => (
        <StructuredData key={index} schema={schema} />
      ))}
      <Navigation />

      {/* Hero */}
      <section className='relative pt-36 pb-20 overflow-hidden'>
        <Atmosphere />
        <div className='relative z-10 container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center max-w-3xl mx-auto'
          >
            <FlightLog
              entries={[
                'FLIGHT LOG / SELECTED WORK',
                'WAYPOINT 04 · NORTH-WEST',
                'ALTITUDE 28,000 FT · STABLE',
                'CRUISING · SYSTEMS NOMINAL',
              ]}
            />
            <h1 className='text-4xl md:text-6xl font-bold font-heading tracking-tight leading-tight'>
              <span className='name-gradient'>Projects</span>
            </h1>
            <p className='mt-5 text-lg text-mist-soft leading-relaxed font-light'>
              Systems, dashboards, and websites designed and built - each a
              different altitude layer in an engineering climb.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className='relative py-8'>
        <div className='container mx-auto px-4 max-w-6xl'>
          <div className='flex flex-col md:flex-row gap-4 items-center justify-between mb-10'>
            <div className='flex flex-wrap gap-2 justify-center'>
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 border ${
                    activeCategory === category
                      ? 'bg-gold/15 text-gold border-gold/50'
                      : 'glass border-transparent text-mist-soft hover:border-gold/40 hover:text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className='relative w-full md:w-72'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mist-soft' />
              <Input
                type='text'
                placeholder='Search projects...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='pl-10 bg-white/[0.02] border-border focus:border-gold/50'
                aria-label='Search projects'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className='relative py-16 overflow-hidden'>
        <Atmosphere variant='mist' className='opacity-70' />
        <div className='relative z-10 container mx-auto px-4 max-w-6xl'>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className='grid md:grid-cols-2 gap-8'
          >
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.title}
                project={project}
                layer={ALTITUDE_LAYERS[projects.indexOf(project)] ?? 'SECTOR'}
                number={projects.indexOf(project) + 1}
              />
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className='text-center py-16 text-mist-soft'>
              No projects match your search.
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

const ProjectCard = ({
  project,
  layer,
  number,
}: {
  project: Project;
  layer: string;
  number: number;
}) => {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='group'
    >
      <Card className='glass-cloud h-full flex flex-col overflow-hidden rounded-2xl transition-all duration-300 group-hover:shadow-glow-strong'>
        {/* Altitude header */}
        <div className='px-7 pt-7 pb-5 flex items-center justify-between border-b border-white/5'>
          <span className='font-mono text-sm tracking-[0.25em] gold-text'>
            {String(number).padStart(2, '0')}
          </span>
          <span className='font-mono text-[10px] tracking-[0.3em] text-mist-soft/60'>
            {layer}
          </span>
        </div>

        <CardContent className='p-7 flex-1 flex flex-col'>
          {/* Project Image / Placeholder */}
          <div className='relative overflow-hidden rounded-lg mb-6'>
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className='w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500'
              />
            ) : (
              <div className='w-full h-44 bg-gradient-to-br from-storm via-background to-background flex items-center justify-center'>
                <span className='text-6xl font-heading font-bold gold-text/70'>
                  {project.title.charAt(0)}
                </span>
              </div>
            )}
            <div className='absolute top-3 left-3'>
              <span className='px-3 py-1 rounded-md border border-gold/40 bg-background/70 backdrop-blur-sm text-xs font-mono text-gold'>
                {project.category}
              </span>
            </div>
            {/* cloud/light texture on hover */}
            <div
              aria-hidden='true'
              className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none'
              style={{
                background:
                  'radial-gradient(circle at 70% 30%, hsl(42 58% 64% / 0.12), transparent 55%)',
              }}
            />
          </div>

          <h3 className='font-heading font-bold text-xl tracking-tight mb-3'>
            {project.title}
          </h3>
          <p className='text-mist-soft leading-relaxed text-sm flex-1 mb-6'>
            {project.description}
          </p>

          {/* Metrics */}
          {project.metrics && (
            <div className='space-y-2 mb-6'>
              {project.metrics.map((metric, i) => (
                <div key={i} className='flex items-center gap-2.5 text-sm'>
                  <div className='w-1 h-1 bg-gold rounded-full' />
                  <span className='text-foreground/80'>{metric}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack */}
          <div className='flex flex-wrap gap-2 mb-7'>
            {project.tech.map(tech => (
              <span
                key={tech}
                className='glass rounded-md px-2.5 py-1 font-mono text-xs text-mist-soft'
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          {(project.github || project.demo || project.demoImages) && (
            <div className='flex gap-3 pt-1 mt-auto'>
              {project.github && (
                <ConfirmCodeLink
                  href={project.github}
                  projectName={project.title}
                  className='glass flex-1 text-mist-soft hover:border-gold/60'
                />
              )}
              {project.demoImages ? (
                <Button
                  size='sm'
                  className='flex-1 bg-mist text-storm-deep hover:bg-mist/90'
                  onClick={() => setDemoOpen(true)}
                >
                  <ExternalLink className='h-4 w-4 mr-2' />
                  Demo
                </Button>
              ) : (
                project.demo && (
                  <Button
                    size='sm'
                    className='flex-1 bg-mist text-storm-deep hover:bg-mist/90'
                    asChild
                  >
                    <a
                      href={project.demo}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <ExternalLink className='h-4 w-4 mr-2' />
                      Demo
                    </a>
                  </Button>
                )
              )}
            </div>
          )}
        </CardContent>
      </Card>
      {project.demoImages && (
        <DemoGallery
          open={demoOpen}
          onOpenChange={setDemoOpen}
          title={project.title}
          images={project.demoImages}
        />
      )}
    </motion.div>
  );
};

export default Projects;
