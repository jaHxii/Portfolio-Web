import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Rocket, Bot, Wrench, GraduationCap, Award, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const traits = [
    {
      icon: Rocket,
      title: 'Frontend Excellence',
      description: 'Pixel-perfect UIs with 90+ Lighthouse scores',
      color: 'text-blue-400',
    },
    {
      icon: Bot,
      title: 'AI/ML Innovation',
      description: 'Production-grade NLP/Computer Vision models',
      color: 'text-green-400',
    },
    {
      icon: Wrench,
      title: 'IT Infrastructure',
      description: 'Kubernetes, AWS, Cybersecurity hardening',
      color: 'text-purple-400',
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
      icon: Heart,
      text: 'Open source contributor & passionate problem-solver',
    },
  ];

  return (
    <section id='about' className='py-20 bg-surface/50'>
      <div className='container mx-auto px-4'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className='max-w-4xl mx-auto'
        >
          {/* Section Header */}
          <div className='text-center mb-16'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className='text-3xl md:text-4xl font-bold font-heading mb-4'
            >
              About <span className='gradient-text'>Me</span>
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: 80 } : {}}
              transition={{ delay: 0.4, duration: 0.8 }}
              className='h-1 bg-gradient-primary mx-auto rounded-full'
            />
          </div>

          {/* Main Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className='mb-12'
          >
            <Card className='card-surface border-border/50 hover-lift'>
              <CardContent className='p-8'>
                <p className='text-lg text-foreground/90 leading-relaxed mb-6'>
                  Seasoned{' '}
                  <span className='font-semibold text-primary'>
                    Computer Engineer
                  </span>{' '}
                  with <span className='font-semibold'>5+ years</span> of
                  experience building scalable web applications, machine
                  learning models, and robust IT infrastructure.
                </p>
                <p className='text-lg text-foreground/90 leading-relaxed'>
                  Specialized in{' '}
                  <span className='font-semibold text-primary'>
                    React performance optimization
                  </span>
                  , AI-driven web apps, and cloud-native solutions. Passionate
                  about <span className='font-semibold'>open-source</span> and{' '}
                  <span className='font-semibold'>mentoring</span> the next
                  generation of developers.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Key Traits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className='grid md:grid-cols-3 gap-6 mb-12'
          >
            {traits.map((trait, index) => (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className='group'
              >
                <Card className='card-surface border-border/50 hover:border-primary/30 transition-all duration-300 h-full'>
                  <CardContent className='p-6 text-center'>
                    <div
                      className={`inline-flex p-3 rounded-xl bg-background mb-4 group-hover:shadow-glow transition-all duration-300 ${trait.color}`}
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
              </motion.div>
            ))}
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0, duration: 0.8 }}
            className='space-y-4'
          >
            <h3 className='text-xl font-semibold text-center mb-6'>
              Key Achievements
            </h3>
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.text}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
                className='flex items-center gap-4 p-4 bg-surface/70 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300 hover-lift'
              >
                <div className='p-2 bg-primary/10 rounded-lg'>
                  <achievement.icon className='h-5 w-5 text-primary' />
                </div>
                <span className='text-foreground/90'>{achievement.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
