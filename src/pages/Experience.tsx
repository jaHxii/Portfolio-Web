import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Building, MapPin, TrendingUp } from 'lucide-react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Atmosphere from '@/components/atmosphere/Atmosphere';
import FlightLog from '@/components/ui/flight-log';
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
      technologies: [
        'Python',
        'Data Preprocessing',
        'Machine Learning',
        'Chatbots',
      ],
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
    <div className='min-h-screen bg-background'>
      <SEO {...seoProps} />
      <StructuredData schema={breadcrumbSchema} />
      {organizationSchemas.map((schema, index) => (
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
            className='max-w-3xl mx-auto text-center'
          >
            <FlightLog
              entries={[
                'FLIGHT PATH / CAREER',
                'WAYPOINT 03 · CLIMBING',
                'AUTOPILOT · ENGAGED',
                'EST. ARRIVAL · CLOUD-9',
              ]}
            />
            <h1 className='text-4xl md:text-5xl font-bold font-heading tracking-tight'>
              <span className='name-gradient'>Experience</span>
            </h1>
            <p className='mt-5 text-lg text-mist-soft leading-relaxed font-light max-w-2xl mx-auto'>
              A rising trajectory — from AI/ML intern to senior IT support,
              climbing through hardware and systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className='relative pb-16 overflow-hidden'>
        <Atmosphere variant='mist' className='opacity-70' />
        <div className='relative z-10 container mx-auto px-4 max-w-6xl'>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className='relative'
          >
            {/* Flight path line */}
            <div className='absolute left-5 md:left-1/3 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent' />

            <div className='space-y-12 md:space-y-16'>
              {experiences.map((exp, index) => (
                <motion.div
                  key={`${exp.company}-${exp.period}`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.18, duration: 0.6 }}
                  className='relative md:grid md:grid-cols-12 md:gap-10 items-start'
                >
                  {/* Waypoint marker */}
                  <div className='absolute left-5 md:left-1/3 -translate-x-1/2 top-8'>
                    <div className='relative'>
                      <div className='h-3 w-3 rounded-full bg-gold shadow-glow' />
                      <div className='absolute inset-0 rounded-full bg-gold/40 animate-pulse' />
                    </div>
                  </div>

                  {/* Meta column */}
                  <div className='hidden md:flex flex-col items-end gap-1 pt-8 md:col-span-4'>
                    <span className='font-mono text-xs tracking-[0.3em] gold-text'>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className='font-heading font-semibold text-2xl tracking-tight'>
                      {exp.period}
                    </span>
                  </div>

                  {/* Card column */}
                  <div className='pl-14 md:pl-0 pt-8 md:pt-0 md:col-span-8'>
                    <div className='glass-cloud rounded-2xl p-7'>
                      <div className='flex items-center gap-2 md:hidden mb-3'>
                        <span className='font-mono text-xs tracking-[0.3em] gold-text'>
                          {String(index + 1).padStart(2, '0')} / {exp.period}
                        </span>
                      </div>

                      <h3 className='font-heading font-bold text-xl tracking-tight'>
                        {exp.role}
                      </h3>
                      <div className='flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-mist-soft'>
                        <div className='flex items-center gap-1.5'>
                          <Building className='h-4 w-4 gold-text' />
                          <span>{exp.company}</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                          <MapPin className='h-4 w-4 gold-text' />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      <p className='text-mist-soft leading-relaxed mt-5 text-sm font-light'>
                        {exp.description}
                      </p>

                      <div className='mt-6'>
                        <h4 className='font-semibold text-sm mb-3 flex items-center gap-2'>
                          <Award className='h-4 w-4 gold-text' />
                          Key Achievements
                        </h4>
                        <ul className='space-y-2'>
                          {exp.achievements.map((achievement, i) => (
                            <li
                              key={i}
                              className='flex items-start gap-2.5 text-sm text-mist-soft'
                            >
                              <div className='w-1 h-1 bg-gold rounded-full mt-2 flex-shrink-0' />
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className='mt-6'>
                        <h4 className='font-semibold text-sm mb-3 flex items-center gap-2'>
                          <TrendingUp className='h-4 w-4 gold-text' />
                          Impact
                        </h4>
                        <div className='flex flex-wrap gap-3'>
                          {Object.entries(exp.impact).map(([key, value]) => (
                            <div
                              key={key}
                              className='glass rounded-md px-3 py-2'
                            >
                              <div className='gold-text font-semibold text-sm'>
                                {value}
                              </div>
                              <div className='text-xs text-mist-soft capitalize'>
                                {key}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className='mt-6'>
                        <h4 className='font-semibold text-sm mb-3'>
                          Technologies Used
                        </h4>
                        <div className='flex flex-wrap gap-2'>
                          {exp.technologies.map(tech => (
                            <span
                              key={tech}
                              className='glass rounded-md px-2.5 py-1 font-mono text-xs text-mist-soft'
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
            className='mt-20'
          >
            <div className='text-center mb-10'>
              <span className='font-mono text-xs tracking-[0.3em] gold-text'>
                ORIGIN /
              </span>
              <h2 className='text-2xl md:text-3xl font-bold font-heading mt-2 tracking-tight'>
                Education
              </h2>
            </div>
            {education.map((edu, index) => (
              <div
                key={index}
                className='glass-cloud rounded-2xl p-7 md:p-8 transition-all duration-300'
              >
                <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4'>
                  <div>
                    <h3 className='font-heading font-bold text-lg tracking-tight'>
                      {edu.degree}
                    </h3>
                    <p className='text-mist-soft text-sm mt-1'>{edu.school}</p>
                  </div>
                  <div className='flex items-center gap-3 md:flex-col md:items-end'>
                    <span className='font-mono text-xs text-mist-soft'>
                      {edu.period}
                    </span>
                    <span className='px-2.5 py-1 rounded-md border border-gold/40 text-gold font-mono text-xs'>
                      GPA: {edu.gpa}
                    </span>
                  </div>
                </div>
                <ul className='space-y-2'>
                  {edu.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className='flex items-start gap-2.5 text-sm text-mist-soft'
                    >
                      <div className='w-1 h-1 bg-gold rounded-full mt-2 flex-shrink-0' />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Experience;
