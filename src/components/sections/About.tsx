import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award, MapPin } from 'lucide-react';
import Atmosphere from '@/components/atmosphere/Atmosphere';
import { cn } from '@/lib/utils';

const CountUp = ({
  target,
  suffix = '',
}: {
  target: number;
  suffix?: string;
}) => {
  const [value, setValue] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return (
    <span
      ref={ref}
      className='text-3xl md:text-4xl font-bold font-heading gold-text'
    >
      {value}
      {suffix}
    </span>
  );
};

const stats = [
  { label: 'Systems Kept Running', target: 500, suffix: '+' },
  { label: 'Tickets Resolved', target: 1000, suffix: '+' },
  { label: 'Projects Built', target: 6, suffix: '' },
  { label: 'Years in IT', target: 3, suffix: '+' },
];

const disciplines = [
  {
    code: 'SYS',
    title: 'Systems',
    description: 'Windows & Linux administration, hardware, troubleshooting.',
  },
  {
    code: 'NET',
    title: 'Network',
    description: 'VPN, Wi-Fi, sharing, and multi-floor network diagnostics.',
  },
  {
    code: 'DEV',
    title: 'Development',
    description: 'Python, React, TypeScript, SQL, and automation tooling.',
  },
  {
    code: 'ML',
    title: 'AI/ML',
    description: 'Data pipelines, model training, and chatbot deployment.',
  },
];

const achievements = [
  {
    icon: GraduationCap,
    text: 'B.Sc Computer Engineering — University of Gondar (CGPA: 3.42/4.0)',
  },
  {
    icon: Award,
    text: 'AI/ML Intern at Ethiopian Artificial Intelligence Institute (EAII)',
  },
  {
    icon: MapPin,
    text: 'Senior IT Support at ROTECH Information Technology, Addis Ababa',
  },
];

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id='about' className='relative py-28 overflow-hidden'>
      <Atmosphere variant='mist' />
      <div className='relative z-10 container mx-auto px-4'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className='max-w-6xl mx-auto'
        >
          {/* Section header */}
          <div className='mb-16'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className='flex items-center gap-4 mb-5'
            >
              <span className='font-mono text-xs tracking-[0.3em] gold-text'>
                01 /
              </span>
              <h2 className='text-3xl md:text-4xl font-bold font-heading tracking-tight'>
                About <span className='gold-text'>Me</span>
              </h2>
              <div className='hidden md:block h-px flex-1 alt-rule' />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className='max-w-2xl text-lg text-mist-soft leading-relaxed font-light'
            >
              Computer Engineering graduate and Senior IT Support specialist —
              keeping enterprise systems reliable from hardware and networking
              to helpdesk automation.
            </motion.p>
          </div>

          {/* Editorial bio + disciplines */}
          <div className='grid lg:grid-cols-5 gap-6 mb-10'>
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.6 }}
              className='lg:col-span-3'
            >
              <div className='glass-cloud rounded-xl p-8 h-full space-y-5'>
                <p className='text-lg text-foreground/90 leading-relaxed'>
                  I combine practical IT infrastructure skills with software
                  development — building tools like the MESOB helpdesk ticketing
                  system and rental management platforms that solve real
                  operational problems.
                </p>
                <p className='text-lg text-foreground/80 leading-relaxed font-light'>
                  From diagnosing network faults in multi-floor offices to
                  training machine learning models, I work across the full
                  technology stack with a calm, engineering mindset.
                </p>
                <div className='flex items-center gap-3 pt-2'>
                  <span className='font-mono text-xs tracking-[0.25em] text-mist-soft/70'>
                    STATUS
                  </span>
                  <span className='h-px flex-1 bg-border' />
                  <span className='font-mono text-xs text-gold'>
                    OPEN TO OPPORTUNITIES
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Disciplines */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45, duration: 0.6 }}
              className='lg:col-span-2 grid gap-4'
            >
              {disciplines.map((d, index) => (
                <motion.div
                  key={d.code}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className='glass rounded-xl p-5 flex items-start gap-4'
                >
                  <span className='font-mono text-xs gold-text pt-0.5'>
                    {d.code}
                  </span>
                  <div>
                    <h3 className='font-heading font-semibold text-sm uppercase tracking-wider text-foreground'>
                      {d.title}
                    </h3>
                    <p className='text-sm text-mist-soft mt-1 leading-relaxed'>
                      {d.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            className='mb-10'
          >
            <div className='glass-cloud rounded-xl p-8'>
              <h3 className='font-heading font-semibold text-lg mb-6 flex items-center gap-3'>
                <span className='font-mono text-xs tracking-[0.3em] gold-text'>
                  LOG
                </span>
                Key Achievements
              </h3>
              <div className='grid md:grid-cols-3 gap-4'>
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.text}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    className='flex items-start gap-3 p-4 rounded-lg border border-border/70 hover:border-gold/40 transition-colors duration-300'
                  >
                    <div className='p-2 bg-gold/10 rounded-lg shrink-0'>
                      <achievement.icon className='h-5 w-5 gold-text' />
                    </div>
                    <span className='text-sm text-foreground/85 leading-relaxed'>
                      {achievement.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.0 + index * 0.08, duration: 0.5 }}
                  className={cn(
                    'glass rounded-xl p-7 text-center transition-all duration-300 hover:border-gold/40'
                  )}
                >
                  <CountUp target={stat.target} suffix={stat.suffix} />
                  <p className='mt-2 text-sm text-mist-soft'>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
