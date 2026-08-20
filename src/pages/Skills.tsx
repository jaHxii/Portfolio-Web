import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Atmosphere from '@/components/atmosphere/Atmosphere';
import FlightLog from '@/components/ui/flight-log';
import SEO from '@/components/seo/SEO';
import StructuredData from '@/components/seo/StructuredData';
import { useSEO } from '@/hooks/use-seo';
import { useStructuredData } from '@/hooks/use-structured-data';
import { cn } from '@/lib/utils';

const ENGINEERING_STACK = [
  {
    code: 'SYS',
    title: 'Systems',
    skills: ['Windows', 'Linux', 'Hardware', 'Troubleshooting'],
    level: 92,
  },
  {
    code: 'NET',
    title: 'Network',
    skills: ['TCP/IP', 'Routing', 'Switching', 'Network troubleshooting'],
    level: 85,
  },
  {
    code: 'DEV',
    title: 'Development',
    skills: ['Python', 'React', 'JavaScript', 'SQL'],
    level: 82,
  },
  {
    code: 'ML',
    title: 'AI / ML',
    skills: ['PyTorch', 'TensorFlow', 'Computer Vision'],
    level: 75,
  },
];

const Skills = () => {
  const seoProps = useSEO();
  const { breadcrumbSchema } = useStructuredData();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className='min-h-screen bg-background'>
      <SEO {...seoProps} />
      <StructuredData schema={breadcrumbSchema} />
      <Navigation />

      {/* Hero */}
      <section className='relative pt-36 pb-20 overflow-hidden'>
        <Atmosphere variant='mist' />
        <div className='relative z-10 container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='max-w-3xl mx-auto text-center'
          >
            <FlightLog
              entries={[
                'FLIGHT LOG / ENGINEERING STACK',
                'ENGINE ROOM · NOMINAL',
                'INSTRUMENTS · ALL GREEN',
                'MULTI-MODULE / CO-PILOTED',
              ]}
            />
            <h1 className='text-4xl md:text-5xl font-bold font-heading tracking-tight'>
              <span className='name-gradient'>Skills</span>
            </h1>
            <p className='mt-5 text-lg text-mist-soft leading-relaxed font-light max-w-2xl mx-auto'>
              Practical, hands-on expertise across infrastructure, networking,
              development, and AI/ML.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Engineering Stack */}
      <section className='relative py-12 overflow-hidden'>
        <Atmosphere />
        <div className='relative z-10 container mx-auto px-4 max-w-5xl'>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className='space-y-5'
          >
            {ENGINEERING_STACK.map((group, gi) => (
              <motion.div
                key={group.code}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + gi * 0.12, duration: 0.6 }}
                className='glass-cloud rounded-xl p-7 md:p-8'
              >
                <div className='flex items-center gap-4 mb-6'>
                  <span className='font-mono text-xs tracking-[0.3em] gold-text'>
                    {group.code}
                  </span>
                  <h2 className='font-heading font-semibold text-xl tracking-tight uppercase'>
                    {group.title}
                  </h2>
                  <span className='font-mono text-xs text-mist-soft/60 ml-auto'>
                    {group.level}%
                  </span>
                </div>

                <div className='grid sm:grid-cols-2 gap-x-8 gap-y-4'>
                  {group.skills.map(skill => (
                    <div key={skill} className='flex items-center gap-3'>
                      <span className='h-1 w-1 rounded-full bg-gold shrink-0' />
                      <span className='text-sm text-foreground/85'>
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>

                <div className='mt-6 h-px w-full bg-white/5'>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${group.level}%` } : {}}
                    transition={{
                      delay: 0.6 + gi * 0.12,
                      duration: 1,
                      ease: 'easeOut',
                    }}
                    className='h-px bg-gradient-gold'
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Base-level proficiencies */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.6 }}
            className={cn('mt-12 glass rounded-xl p-7')}
          >
            <div className='flex items-center gap-3 mb-5'>
              <span className='font-mono text-xs tracking-[0.3em] gold-text'>
                OPS
              </span>
              <h2 className='font-heading font-semibold text-lg tracking-tight uppercase'>
                Operations & Practices
              </h2>
            </div>
            <div className='flex flex-wrap gap-2'>
              {[
                'Helpdesk & SLA Management',
                'IT Procurement',
                'Technical Documentation',
                'Process Automation',
                'Git / GitHub',
                'User Training',
              ].map(skill => (
                <span
                  key={skill}
                  className='glass inline-flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs text-mist-soft'
                >
                  <span className='h-1 w-1 rounded-full bg-gold/70' />
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Skills;
