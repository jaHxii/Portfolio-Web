import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Rocket,
  Bot,
  Wrench,
  GraduationCap,
  Award,
  MapPin,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SpotlightCard } from '@/components/ui/spotlight-card';

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
      className='text-3xl md:text-4xl font-bold font-heading gradient-text'
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

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const traits = [
    {
      icon: Wrench,
      title: 'IT Support & Hardware',
      description:
        'Diagnosing and resolving network, printer, and hardware faults across multi-floor enterprise environments.',
      color: 'text-blue-400',
      span: 'md:col-span-2',
    },
    {
      icon: Rocket,
      title: 'Web Development',
      description:
        'Building responsive interfaces and PWAs with React, TypeScript, and Tailwind.',
      color: 'text-purple-400',
    },
    {
      icon: Bot,
      title: 'AI/ML Fundamentals',
      description:
        'Applying machine learning concepts from my internship at the Ethiopian AI Institute.',
      color: 'text-green-400',
    },
  ];

  const achievements = [
    {
      icon: GraduationCap,
      text: 'B.Sc Computer Engineering – University of Gondar (CGPA: 3.42/4.0)',
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

  const bio = [
    'Computer Engineering graduate and Senior IT Support specialist with hands-on experience keeping enterprise systems running — from hardware and networking to helpdesk automation.',
    'I combine practical IT infrastructure skills with software development, building tools like the MESOB helpdesk ticketing system and rental management platforms that solve real operational problems.',
  ];

  const terminalLines = [
    { prompt: '$', text: 'whoami', out: 'Ermias Lemesa — Computer Engineer' },
    {
      prompt: '$',
      text: 'cat stack.txt',
      out: 'IT Support · Hardware · Web · AI/ML',
    },
    { prompt: '$', text: 'uptime', out: 'Available for new opportunities' },
  ];

  return (
    <section id='about' className='py-24 relative'>
      <div className='container mx-auto px-4'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className='max-w-6xl mx-auto'
        >
          {/* Section Header */}
          <div className='mb-16'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className='flex items-center gap-4 mb-4'
            >
              <span className='font-mono text-primary text-sm'>01.</span>
              <h2 className='text-3xl md:text-4xl font-bold font-heading tracking-tight'>
                About <span className='gradient-text'>Me</span>
              </h2>
              <div className='hidden md:block h-px flex-1 bg-border' />
            </motion.div>
          </div>

          {/* Bento Grid */}
          <div className='grid md:grid-cols-3 gap-6'>
            {/* Bio — large card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className='md:col-span-2 md:row-span-2'
            >
              <Card className='gradient-border h-full'>
                <CardContent className='p-8 space-y-4'>
                  <p className='text-lg text-foreground/90 leading-relaxed'>
                    {bio[0]}
                  </p>
                  <p className='text-lg text-foreground/90 leading-relaxed'>
                    {bio[1]}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Terminal card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className='glass h-full overflow-hidden'>
                <div className='flex items-center gap-2 px-4 py-2.5 bg-black/40 border-b border-border/50'>
                  <span className='w-3 h-3 rounded-full bg-red-500/80' />
                  <span className='w-3 h-3 rounded-full bg-yellow-500/80' />
                  <span className='w-3 h-3 rounded-full bg-green-500/80' />
                  <span className='ml-2 font-mono text-xs text-muted-foreground'>
                    ermias@portfolio: ~
                  </span>
                </div>
                <CardContent className='p-5 font-mono text-sm space-y-3'>
                  {terminalLines.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -8 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.2, duration: 0.4 }}
                    >
                      <div>
                        <span className='text-green-400'>{line.prompt}</span>{' '}
                        <span className='text-foreground'>{line.text}</span>
                      </div>
                      <div className='text-primary'>{line.out}</div>
                    </motion.div>
                  ))}
                  <div className='flex items-center text-muted-foreground'>
                    <span className='text-green-400'>$</span>
                    <span className='ml-2 inline-block w-2 h-4 bg-primary animate-pulse' />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Trait cards */}
            {traits.map((trait, index) => (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.15, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className={trait.span}
              >
                <SpotlightCard className='h-full'>
                  <Card className='glass h-full transition-all duration-300 hover:shadow-glow'>
                    <CardContent className='p-6'>
                      <div
                        className={`inline-flex p-3 rounded-xl bg-background mb-4 ${trait.color}`}
                      >
                        <trait.icon className='h-6 w-6' />
                      </div>
                      <h3 className='font-semibold text-lg mb-2 group-hover:text-primary transition-colors'>
                        {trait.title}
                      </h3>
                      <p className='text-muted-foreground leading-relaxed'>
                        {trait.description}
                      </p>
                    </CardContent>
                  </Card>
                </SpotlightCard>
              </motion.div>
            ))}

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className='md:col-span-3'
            >
              <Card className='glass'>
                <CardContent className='p-6'>
                  <h3 className='font-semibold text-lg mb-4 font-heading'>
                    Key Achievements
                  </h3>
                  <div className='grid md:grid-cols-3 gap-4'>
                    {achievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.text}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{
                          delay: 0.8 + index * 0.15,
                          duration: 0.6,
                        }}
                        className='flex items-start gap-3 p-4 bg-background rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300'
                      >
                        <div className='p-2 bg-primary/10 rounded-lg shrink-0'>
                          <achievement.icon className='h-5 w-5 text-primary' />
                        </div>
                        <span className='text-sm text-foreground/90 leading-relaxed'>
                          {achievement.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.6 }}
              className='md:col-span-3'
            >
              <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.0 + index * 0.1, duration: 0.5 }}
                    className='glass rounded-xl p-6 text-center hover:shadow-glow transition-shadow'
                  >
                    <CountUp target={stat.target} suffix={stat.suffix} />
                    <p className='mt-2 text-sm text-muted-foreground'>
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
