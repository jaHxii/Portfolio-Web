import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navigation from '@/components/layout/Navigation';
import SEO from '@/components/seo/SEO';
import StructuredData from '@/components/seo/StructuredData';
import { useSEO } from '@/hooks/use-seo';
import { useStructuredData } from '@/hooks/use-structured-data';
import { TiltCard } from '@/components/ui/tilt-card';
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
          'Automated IT support ticketing platform for managing helpdesk workflows — issue tracking, prioritization, and lifecycle management, improving coordination between technical staff and users.',
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
        title: 'CareHub — Healthcare Management System',
        description:
          'Fullstack platform for appointments, patient records, and prescriptions mirroring real clinic workflows. Conflict-free scheduling is enforced by a PostgreSQL tstzrange exclusion constraint — the database rejects overlapping appointments with a 409. Role-based access across Admin/Doctor/Patient, medical history as JSONB, and server-side PDF reports with per-user rate limiting.',
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
          'Medical history as JSONB — no schema migrations',
        ],
        demoImages: CAREHUB_DEMO_IMAGES,
      },
      {
        title: 'Realtime Support Ops Dashboard',
        description:
          'Real-time customer support ops dashboard streaming simulated ticket activity over WebSocket, visualized with a custom D3 chart and a virtualized 10,000-row live log — with offline fallback, filters, and 15 passing tests.',
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
          'A modern, responsive website for Melala Coffee Wesen — an authentic Ethiopian coffee shop in Addis Ababa — with a menu, story, gallery, and location pages. Deployed and served worldwide via Netlify.',
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
        title: 'Sador Bar & Restaurant — Digital Menu',
        description:
          'Bilingual Amharic/English digital menu for Sador Bar and Restaurant — a small frontend with separate food and drinks/bar pages, categorized sections with prices including 15% VAT, and a QR code for scanning the menu on your phone. Deployed and served via Netlify.',
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

      {/* Hero Section */}
      <section className='pt-24 pb-16 bg-gradient-to-br from-background via-surface/30 to-background relative overflow-hidden'>
        <div className='absolute -top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse-glow' />
        <div
          className='absolute top-1/2 right-[-10%] w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] animate-pulse-glow'
          style={{ animationDelay: '2s' }}
        />
        <div className='container mx-auto px-4 relative z-10'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center max-w-4xl mx-auto'
          >
            <div className='flex items-center justify-center gap-4 mb-4'>
              <span className='font-mono text-primary text-sm'>02.</span>
              <h1 className='text-4xl md:text-6xl font-bold font-heading tracking-tight'>
                My <span className='gradient-text'>Projects</span>
              </h1>
            </div>
            <p className='text-xl text-muted-foreground leading-relaxed'>
              Real projects from my CV — systems, dashboards, and websites I
              have designed and built.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className='py-8'>
        <div className='container mx-auto px-4 max-w-6xl'>
          <div className='flex flex-col md:flex-row gap-4 items-center justify-between mb-8'>
            <div className='flex flex-wrap gap-2 justify-center'>
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                    activeCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background border border-border text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className='relative w-full md:w-64'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
              <Input
                type='text'
                placeholder='Search projects...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='pl-10'
                aria-label='Search projects'
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className='py-16'>
        <div className='container mx-auto px-4 max-w-6xl'>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className='text-center py-16 text-muted-foreground'>
              No projects match your search.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className='group'
    >
      <TiltCard>
        <Card className='glass h-full flex flex-col transition-all duration-300 group-hover:shadow-glow overflow-hidden'>
          {/* Project Image / Placeholder */}
          <div className='relative overflow-hidden rounded-t-lg'>
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
              />
            ) : (
              <div className='w-full h-48 bg-gradient-to-br from-primary/40 via-secondary/40 to-background flex items-center justify-center'>
                <span className='text-6xl font-heading font-bold text-primary/60'>
                  {project.title.charAt(0)}
                </span>
              </div>
            )}
            <div className='absolute top-4 left-4'>
              <span className='px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full'>
                {project.category}
              </span>
            </div>
          </div>

          <CardHeader>
            <CardTitle className='group-hover:text-primary transition-colors text-lg'>
              {project.title}
            </CardTitle>
          </CardHeader>

          <CardContent className='space-y-4 flex-1 flex flex-col'>
            <p className='text-muted-foreground leading-relaxed flex-1'>
              {project.description}
            </p>

            {/* Metrics */}
            {project.metrics && (
              <div className='space-y-2'>
                {project.metrics.map((metric, i) => (
                  <div key={i} className='flex items-center gap-2 text-sm'>
                    <div className='w-1.5 h-1.5 bg-primary rounded-full' />
                    <span className='text-foreground/80'>{metric}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack */}
            <div className='flex flex-wrap gap-2'>
              {project.tech.map(tech => (
                <span
                  key={tech}
                  className='px-2 py-1 bg-background border border-border text-xs rounded-md hover:border-primary/50 transition-colors'
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            {(project.github || project.demo || project.demoImages) && (
              <div className='flex gap-3 pt-2'>
                {project.github && (
                  <Button
                    variant='outline'
                    size='sm'
                    className='flex-1 group/btn'
                    asChild
                  >
                    <a
                      href={project.github}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Github className='h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform' />
                      Code
                    </a>
                  </Button>
                )}
                {project.demoImages ? (
                  <Button
                    size='sm'
                    className='flex-1 group/btn bg-primary hover:bg-primary/90'
                    onClick={() => setDemoOpen(true)}
                  >
                    <ExternalLink className='h-4 w-4 mr-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform' />
                    Demo
                  </Button>
                ) : (
                  project.demo && (
                    <Button
                      size='sm'
                      className='flex-1 group/btn bg-primary hover:bg-primary/90'
                      asChild
                    >
                      <a
                        href={project.demo}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <ExternalLink className='h-4 w-4 mr-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform' />
                        Demo
                      </a>
                    </Button>
                  )
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </TiltCard>
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
