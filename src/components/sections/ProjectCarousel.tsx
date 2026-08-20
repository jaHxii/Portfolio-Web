import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConfirmCodeLink from '@/components/ui/confirm-code-link';
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

interface CarouselProject {
  title: string;
  description: string;
  category: string;
  tech: string[];
  github?: string;
  demo?: string;
  image?: string;
  demoImages?: string[];
}

const FEATURED: CarouselProject[] = [
  {
    title: 'Melala Coffee',
    description:
      'Responsive website for an authentic Ethiopian coffee shop in Addis Ababa — live on Netlify.',
    category: 'Frontend',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Netlify'],
    github: 'https://github.com/jaHxii/melala-buna-brand',
    demo: 'https://melalacoffee.netlify.app',
    image: '/melalaCoffee.webp',
  },
  {
    title: 'KIRAY - Rental & Building Management',
    description:
      'Full-stack rental platform with tenant management, payment tracking, and reporting.',
    category: 'Full Stack',
    tech: ['React', 'Node.js', 'Database', 'Authentication'],
    github: 'https://github.com/jaHxii/kiray.git',
    image: '/kiray_page.webp',
  },
  {
    title: 'MESOB IT Helpdesk Ticketing',
    description:
      'Automated helpdesk platform for tracking, prioritizing, and resolving support tickets.',
    category: 'Full Stack',
    tech: ['Backend Logic', 'Workflow Management', 'Ticketing'],
    github: 'https://github.com/jaHxii/Mesob-Help_Desk.git',
    image: '/mesob_page.webp',
    demoImages: MESOB_DEMO_IMAGES,
  },
  {
    title: 'CareHub — Healthcare Management System',
    description:
      'Fullstack clinic platform handling appointments, patient records, and prescriptions with PostgreSQL-enforced conflict-free scheduling and role-based access.',
    category: 'Full Stack',
    tech: ['React', 'Express', 'PostgreSQL', 'JWT', 'Docker'],
    github: 'https://github.com/jaHxii/CareHub.git',
    image: CAREHUB_MAIN_IMAGE,
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
  },
];

const ProjectCarousel = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % FEATURED.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused]);

  const { [index % FEATURED.length]: current } = FEATURED;
  const project = current ?? FEATURED[0];

  const go = (dir: number) => {
    setIndex(prev => (prev + dir + FEATURED.length) % FEATURED.length);
  };

  return (
    <div
      className='relative'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode='wait'>
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className='glass-cloud rounded-2xl overflow-hidden'>
            <div className='grid md:grid-cols-2'>
              {/* Image */}
              <div className='relative overflow-hidden min-h-56'>
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className='w-full h-56 md:h-full object-cover'
                  />
                ) : (
                  <div className='w-full h-56 md:h-full bg-gradient-to-br from-storm via-background to-background flex items-center justify-center'>
                    <span className='text-6xl font-heading font-bold gold-text/70'>
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}
                <div className='absolute top-4 left-4 flex items-center gap-2'>
                  <span className='px-3 py-1 rounded-md border border-gold/40 bg-background/70 backdrop-blur-sm text-xs font-mono text-gold'>
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className='p-8 md:p-10 flex flex-col justify-center text-left'>
                <div className='flex items-center gap-3 mb-4'>
                  <span className='font-mono text-xs tracking-[0.3em] gold-text'>
                    {String(index + 1).padStart(2, '0')} /{' '}
                    {String(FEATURED.length).padStart(2, '0')}
                  </span>
                  <span className='h-px flex-1 bg-border' />
                </div>
                <h3 className='text-2xl font-heading font-bold mb-3 tracking-tight'>
                  {project.title}
                </h3>
                <p className='text-mist-soft leading-relaxed mb-6 font-light'>
                  {project.description}
                </p>
                <div className='flex flex-wrap gap-2 mb-8'>
                  {project.tech.map(tech => (
                    <span
                      key={tech}
                      className='glass rounded-md px-3 py-1.5 font-mono text-xs text-mist-soft'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {(project.github || project.demo || project.demoImages) && (
                  <div className='flex gap-3'>
                    {project.github && (
                      <ConfirmCodeLink
                        href={project.github}
                        projectName={project.title}
                        className='glass text-mist-soft hover:border-gold/60'
                      />
                    )}
                    {project.demoImages ? (
                      <Button size='sm' onClick={() => setDemoOpen(true)}>
                        <ExternalLink className='h-4 w-4 mr-2' />
                        Demo
                      </Button>
                    ) : (
                      project.demo && (
                        <Button size='sm' asChild>
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
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className='flex items-center justify-center gap-6 mt-7'>
        <button
          onClick={() => go(-1)}
          aria-label='Previous project'
          className='glass p-2.5 rounded-full text-mist-soft hover:text-gold hover:border-gold/50 transition-all duration-300'
        >
          <ChevronLeft className='h-4 w-4' />
        </button>
        <div className='flex gap-2'>
          {FEATURED.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to project ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-6 bg-gradient-gold'
                  : 'w-1.5 bg-storm hover:bg-mist-soft/60'
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          aria-label='Next project'
          className='glass p-2.5 rounded-full text-mist-soft hover:text-gold hover:border-gold/50 transition-all duration-300'
        >
          <ChevronRight className='h-4 w-4' />
        </button>
      </div>

      {project.demoImages && (
        <DemoGallery
          open={demoOpen}
          onOpenChange={setDemoOpen}
          title={project.title}
          images={project.demoImages}
        />
      )}
    </div>
  );
};

export default ProjectCarousel;
