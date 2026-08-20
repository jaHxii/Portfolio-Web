import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Server, Code2, Globe, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/layout/Navigation';
import SEO from '@/components/seo/SEO';
import StructuredData from '@/components/seo/StructuredData';
import { useSEO } from '@/hooks/use-seo';
import { useStructuredData } from '@/hooks/use-structured-data';

const Skills = () => {
  const seoProps = useSEO();
  const { breadcrumbSchema } = useStructuredData();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      icon: Server,
      title: 'IT & Infrastructure',
      color: 'text-blue-400',
      skills: [
        { name: 'IT Infrastructure Support', level: 92 },
        { name: 'System Troubleshooting', level: 90 },
        { name: 'Hardware Installation & Maintenance', level: 88 },
        { name: 'Network Troubleshooting (VPN, Wi-Fi, Sharing)', level: 85 },
        { name: 'Process Automation', level: 80 },
        { name: 'Technical Documentation', level: 85 },
      ],
    },
    {
      icon: Code2,
      title: 'Programming & Data',
      color: 'text-green-400',
      skills: [
        { name: 'Python Programming', level: 85 },
        { name: 'Database Design & SQL', level: 80 },
        { name: 'Machine Learning Fundamentals', level: 75 },
        { name: 'Data Preprocessing', level: 78 },
        { name: 'REST APIs & WebSocket', level: 70 },
      ],
    },
    {
      icon: Globe,
      title: 'Web Development',
      color: 'text-purple-400',
      skills: [
        { name: 'Web Application Development', level: 80 },
        { name: 'HTML / CSS / JavaScript', level: 82 },
        { name: 'Progressive Web Apps', level: 75 },
        { name: 'Responsive UI Design', level: 80 },
      ],
    },
    {
      icon: Wrench,
      title: 'Tools & Practices',
      color: 'text-orange-400',
      skills: [
        { name: 'Helpdesk & SLA Management', level: 88 },
        { name: 'User Training & Support', level: 85 },
        { name: 'Git / GitHub', level: 75 },
        { name: 'Linux / Windows', level: 82 },
        { name: 'IT Procurement & Vendor Coordination', level: 80 },
      ],
    },
  ];

  return (
    <>
      <SEO {...seoProps} />
      <StructuredData schema={breadcrumbSchema} />
      <Navigation />
      <div className='min-h-screen bg-background pt-20'>
        <div className='container mx-auto px-4 py-12'>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className='max-w-7xl mx-auto'
          >
            {/* Header */}
            <div className='text-center mb-16'>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className='text-4xl md:text-5xl font-bold font-heading tracking-tight mb-4'
              >
                <span className='font-mono text-primary text-sm md:text-base mr-3'>
                  05.
                </span>
                Technical <span className='gradient-text'>Skills</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className='text-xl text-muted-foreground max-w-3xl mx-auto'
              >
                Practical, hands-on expertise across IT infrastructure support,
                hardware, networking, programming, and web development.
              </motion.p>
            </div>

            {/* Skills Grid */}
            <div className='grid lg:grid-cols-2 gap-8 mb-16'>
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.8 + categoryIndex * 0.1,
                    duration: 0.6,
                  }}
                  className='group'
                >
                  <Card className='glass h-full transition-all duration-300 group-hover:shadow-glow'>
                    <CardHeader className='pb-4'>
                      <CardTitle className='flex items-center gap-3'>
                        <div
                          className={`p-2 bg-background rounded-lg group-hover:shadow-glow transition-all duration-300 ${category.color}`}
                        >
                          <category.icon className='h-6 w-6' />
                        </div>
                        <span className='group-hover:text-primary transition-colors'>
                          {category.title}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='space-y-4'>
                        {category.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{
                              delay:
                                1.0 + categoryIndex * 0.1 + skillIndex * 0.05,
                              duration: 0.4,
                            }}
                            className='space-y-2'
                          >
                            <div className='flex justify-between items-center'>
                              <span className='text-sm font-medium'>
                                {skill.name}
                              </span>
                              <span className='text-xs text-muted-foreground'>
                                {skill.level}%
                              </span>
                            </div>
                            <div className='w-full bg-surface rounded-full h-2'>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={
                                  inView ? { width: `${skill.level}%` } : {}
                                }
                                transition={{
                                  delay:
                                    1.2 +
                                    categoryIndex * 0.1 +
                                    skillIndex * 0.05,
                                  duration: 0.8,
                                  ease: 'easeOut',
                                }}
                                className='bg-gradient-primary h-2 rounded-full shadow-glow'
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Skills;
