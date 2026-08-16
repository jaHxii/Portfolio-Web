import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Calendar,
  MapPin,
  Building,
  Award,
  Users,
  TrendingUp,
  Code,
  Brain,
  Server,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/layout/Navigation';
import SEO from '@/components/seo/SEO';
import StructuredData from '@/components/seo/StructuredData';
import { useSEO } from '@/hooks/use-seo';
import { useStructuredData } from '@/hooks/use-structured-data';
import { createOrganizationSchema } from '@/lib/structured-data';

const Experience = () => {
  const seoProps = useSEO();
  const { breadcrumbSchema } = useStructuredData();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      role: 'Senior IT Support',
      company: 'ROTECH Information Technology',
      location: 'Addis Ababa, Ethiopia',
      period: 'Present',
      type: 'Full-time',
      startYear: undefined,
      endYear: undefined,
      description:
        'Providing enterprise IT support across multiple office locations — diagnosing network, printer, and hardware faults and resolving helpdesk tickets within SLAs.',
      achievements: [
        'Diagnose and resolve network, printer, and hardware issues across multiple office locations',
        'Configure VPNs, cross-network folder sharing, and Wi-Fi troubleshooting for multi-floor environments',
        'Manage IT procurement, hardware evaluation, and vendor coordination',
        'Deliver end-user training, technical documentation, and weekly reporting',
      ],
      technologies: [
        'Network Troubleshooting',
        'VPN',
        'Wi-Fi',
        'Windows',
        'Hardware',
        'IT Procurement',
      ],
      impact: {
        coverage: 'Multiple office sites',
        support: 'Remote, chat & in-person',
      },
    },
    {
      role: 'Hardware Engineer',
      company: 'Addis Mesob - Bole Branch',
      location: 'Addis Ababa, Ethiopia',
      period: 'Previous role',
      type: 'Full-time',
      startYear: undefined,
      endYear: undefined,
      description:
        'Installed, configured, and maintained computer hardware systems while supporting printer setup, network connectivity, and system maintenance.',
      achievements: [
        'Install, configure, and maintain computer hardware systems',
        'Diagnose and troubleshoot hardware and peripheral issues',
        'Support printer setup, network connectivity, and system maintenance',
        'Ensure operational continuity of IT equipment',
        'Assist in technical documentation and system monitoring',
      ],
      technologies: [
        'Hardware',
        'Peripherals',
        'Printers',
        'Networking',
        'Documentation',
      ],
      impact: {
        scope: 'End-to-end hardware maintenance',
        setup: 'Printer & network setup',
      },
    },
    {
      role: 'AI/ML Intern',
      company: 'Ethiopian Artificial Intelligence Institute (EAII)',
      location: 'Addis Ababa, Ethiopia',
      period: 'Internship',
      type: 'Internship',
      startYear: undefined,
      endYear: undefined,
      description:
        'Supported AI model development through data preparation, model training and evaluation, and chatbot development.',
      achievements: [
        'Assisted in data collection, cleaning, and preprocessing for AI model development',
        'Participated in training and evaluation of machine learning models',
        'Contributed to AI-based chatbot development and deployment',
        'Prepared technical documentation and research summaries',
        'Collaborated with cross-functional technical teams',
      ],
      technologies: ['Python', 'Data Preprocessing', 'Machine Learning', 'Chatbots'],
      impact: {
        data: 'ML data pipelines',
        models: 'Training & evaluation',
      },
    },
  ];

  const education = [
    {
      degree: 'Bachelor of Science in Computer Engineering',
      school: 'University of Gondar',
      period: 'Aug 2021 - Aug 2025',
      gpa: '3.42/4.0',
      achievements: [
        'Graduated August 2025 with CGPA 3.42',
        'Strong foundation in computer engineering, systems, and software development',
      ],
    },
  ];

  const getIcon = (index: number) => {
    const icons = [Code, Brain, Server, Building];
    const IconComponent = icons[index % icons.length];
    return IconComponent;
  };

  // Create organization schemas for work experience
  const organizationSchemas = experiences.map(exp =>
    createOrganizationSchema({
      name: exp.company,
      description: exp.description,
      address: {
        locality: exp.location.split(' / ')[1] || exp.location,
        country: 'Ethiopia',
      },
      employees: [
        {
          name: 'Ermias Lemesa',
          jobTitle: exp.role,
          ...(exp.startYear ? { startDate: exp.startYear } : {}),
          ...(exp.endYear ? { endDate: exp.endYear } : {}),
        },
      ],
    })
  );

  return (
    <>
      <SEO {...seoProps} />
      <StructuredData schema={breadcrumbSchema} />
      {organizationSchemas.map((schema, index) => (
        <StructuredData key={index} schema={schema} />
      ))}
      <Navigation />
      <div className='min-h-screen bg-background pt-20'>
        <div className='container mx-auto px-4 py-12'>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className='max-w-6xl mx-auto'
          >
            {/* Header */}
            <div className='text-center mb-16'>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className='text-4xl md:text-5xl font-bold font-heading mb-6'
              >
                Professional <span className='gradient-text'>Experience</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className='text-xl text-muted-foreground max-w-3xl mx-auto'
              >
                Hands-on experience in enterprise IT support, hardware
                engineering, and AI/ML across ROTECH, Addis Mesob, and the
                Ethiopian Artificial Intelligence Institute.
              </motion.p>
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: 100 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
                className='h-1 bg-gradient-primary mx-auto rounded-full mt-8'
              />
            </div>

            {/* Timeline */}
            <div className='relative'>
              {/* Timeline Line */}
              <div className='absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-primary hidden md:block' />

              {/* Experience Cards */}
              <div className='space-y-12'>
                {experiences.map((exp, index) => {
                  const IconComponent = getIcon(index);
                  return (
                    <motion.div
                      key={`${exp.company}-${exp.period}`}
                      initial={{ opacity: 0, x: -30 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                      className='relative'
                    >
                      {/* Timeline Icon */}
                      <div className='hidden md:flex absolute left-6 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-glow' />

                      {/* Content Card */}
                      <div className='md:ml-20'>
                        <Card className='card-surface border-border/50 hover:border-primary/30 transition-all duration-300 hover-lift'>
                          <CardHeader>
                            <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-4'>
                              <div className='space-y-2'>
                                <CardTitle className='flex items-center gap-3'>
                                  <IconComponent className='h-6 w-6 text-primary' />
                                  <span className='text-xl'>{exp.role}</span>
                                </CardTitle>
                                <div className='flex items-center gap-4 text-muted-foreground'>
                                  <div className='flex items-center gap-1'>
                                    <Building className='h-4 w-4' />
                                    <span>{exp.company}</span>
                                  </div>
                                  <div className='flex items-center gap-1'>
                                    <MapPin className='h-4 w-4' />
                                    <span>{exp.location}</span>
                                  </div>
                                </div>
                              </div>
                              <div className='flex flex-col items-start md:items-end gap-2'>
                                <div className='flex items-center gap-1 text-primary'>
                                  <Calendar className='h-4 w-4' />
                                  <span className='font-medium'>
                                    {exp.period}
                                  </span>
                                </div>
                                <Badge variant='outline' className='text-xs'>
                                  {exp.type}
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className='text-muted-foreground mb-6'>
                              {exp.description}
                            </p>

                            {/* Key Achievements */}
                            <div className='mb-6'>
                              <h4 className='font-semibold mb-3 flex items-center gap-2'>
                                <Award className='h-4 w-4 text-primary' />
                                Key Achievements
                              </h4>
                              <ul className='space-y-2'>
                                {exp.achievements.map((achievement, i) => (
                                  <li
                                    key={i}
                                    className='flex items-start gap-2 text-sm text-muted-foreground'
                                  >
                                    <div className='w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0' />
                                    <span>{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Impact Metrics */}
                            <div className='mb-6'>
                              <h4 className='font-semibold mb-3 flex items-center gap-2'>
                                <TrendingUp className='h-4 w-4 text-primary' />
                                Impact Metrics
                              </h4>
                              <div className='flex flex-wrap gap-4'>
                                {Object.entries(exp.impact).map(
                                  ([key, value]) => (
                                    <div
                                      key={key}
                                      className='bg-surface/50 px-3 py-2 rounded-lg border border-border/50'
                                    >
                                      <div className='text-primary font-semibold text-sm'>
                                        {value}
                                      </div>
                                      <div className='text-xs text-muted-foreground capitalize'>
                                        {key}
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>

                            {/* Technologies */}
                            <div>
                              <h4 className='font-semibold mb-3'>
                                Technologies Used
                              </h4>
                              <div className='flex flex-wrap gap-2'>
                                {exp.technologies.map(tech => (
                                  <Badge
                                    key={tech}
                                    variant='secondary'
                                    className='text-xs hover:bg-primary/10 hover:border-primary/50 transition-colors'
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Education Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.6, duration: 0.8 }}
              className='mt-20'
            >
              <h2 className='text-3xl font-bold text-center mb-12'>
                Education
              </h2>
              {education.map((edu, index) => (
                <Card
                  key={index}
                  className='card-surface border-border/50 hover:border-primary/30 transition-all duration-300'
                >
                  <CardHeader>
                    <CardTitle className='flex items-center gap-3'>
                      <Users className='h-6 w-6 text-primary' />
                      <span>{edu.degree}</span>
                    </CardTitle>
                    <div className='flex flex-col md:flex-row md:justify-between gap-2 text-muted-foreground'>
                      <span>{edu.school}</span>
                      <div className='flex items-center gap-4'>
                        <span>{edu.period}</span>
                        <Badge
                          variant='outline'
                          className='text-primary border-primary/50'
                        >
                          GPA: {edu.gpa}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-4'>
                      <div>
                        <h4 className='font-semibold mb-2'>Final Year Project</h4>
                        <p className='text-muted-foreground text-sm'>
                          {edu.finalYearProject}
                        </p>
                      </div>
                      <div>
                        <h4 className='font-semibold mb-2'>
                          Academic Achievements
                        </h4>
                        <ul className='space-y-1'>
                          {edu.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className='flex items-start gap-2 text-sm text-muted-foreground'
                            >
                              <div className='w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0' />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Experience;
