import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ConfirmCodeLink from '@/components/ui/confirm-code-link';
import DemoGallery from '@/components/sections/DemoGallery';
import { ALL_PROJECTS } from '@/lib/projects-data';

const FEATURED = ALL_PROJECTS;

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    }
  };

  return (
    <div
      className='relative'
      role='region'
      aria-label='Featured projects carousel'
      aria-roledescription='carousel'
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
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
                  {' '}
                  <span
                    className='font-mono text-xs tracking-[0.3em] gold-text'
                    aria-live='polite'
                    aria-atomic='true'
                  >
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
