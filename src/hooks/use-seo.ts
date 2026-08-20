import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOProps } from '@/components/seo/SEO';

interface PageSEOConfig {
  [key: string]: Partial<SEOProps>;
}

const defaultSEO: SEOProps = {
  title:
    'Ermias Lemesa - Computer Engineer | IT Support Specialist | Hardware Engineer',
  description:
    'Computer Engineer and Senior IT Support Specialist with hands-on experience in hardware, networking, helpdesk, and AI/ML. Skilled in Python, SQL, web applications, and process automation.',
  keywords: [
    'computer engineer',
    'it support',
    'hardware engineer',
    'python',
    'machine learning',
    'web development',
    'addis ababa',
    'ethiopia',
  ],
  image: '/portfolio.png',
  type: 'website',
  author: 'Ermias Lemesa',
};

const pageSEOConfig: PageSEOConfig = {
  '/': {
    title: 'Home - Ermias Lemesa | Computer Engineer & IT Support Specialist',
    description:
      'Welcome to my portfolio. I am a Computer Engineer and Senior IT Support Specialist based in Addis Ababa, Ethiopia, specializing in hardware, networking, helpdesk, and AI/ML.',
    keywords: [
      'portfolio',
      'computer engineer',
      'it support',
      'hardware engineer',
      'addis ababa',
      'home',
    ],
    type: 'website',
  },
  '/projects': {
    title: 'Projects - Portfolio Showcase',
    description:
      'Explore my real projects: KIRAY rental management, MESOB IT helpdesk ticketing, analytics dashboards, printer asset monitoring, and Melala Coffee.',
    keywords: [
      'projects',
      'portfolio',
      'kiray',
      'it helpdesk',
      'analytics dashboard',
      'melala coffee',
    ],
    type: 'website',
    section: 'Projects',
  },
  '/skills': {
    title: 'Skills & Technologies - Technical Expertise',
    description:
      'Discover my technical skills in IT infrastructure support, system troubleshooting, Python programming, machine learning fundamentals, database design, and web application development.',
    keywords: [
      'skills',
      'technologies',
      'it infrastructure',
      'system troubleshooting',
      'python',
      'sql',
      'machine learning',
    ],
    type: 'website',
    section: 'Skills',
  },
  '/experience': {
    title: 'Professional Experience - Career Journey',
    description:
      'Learn about my professional experience as a Senior IT Support Specialist at ROTECH, Hardware Engineer at Addis Mesob, and AI/ML Intern at the Ethiopian Artificial Intelligence Institute.',
    keywords: [
      'experience',
      'career',
      'professional',
      'it support',
      'hardware engineer',
      'ai/ml intern',
    ],
    type: 'website',
    section: 'Experience',
  },
  '/contact': {
    title: 'Contact - Get In Touch',
    description:
      "Get in touch for IT support, collaboration opportunities, or professional discussions. Let's build something amazing together.",
    keywords: ['contact', 'collaboration', 'hire', 'freelance', 'consultation'],
    type: 'website',
    section: 'Contact',
  },
  '/resume': {
    title: 'Resume - Ermias Lemesa',
    description:
      'Resume of Ermias Lemesa — Computer Engineer and Senior IT Support Specialist. Education, skills, experience, and certifications.',
    keywords: [
      'resume',
      'cv',
      'curriculum vitae',
      'computer engineer',
      'it support',
    ],
    type: 'website',
    section: 'Resume',
  },
};

export const useSEO = (customSEO?: Partial<SEOProps>): SEOProps => {
  const location = useLocation();

  return useMemo(() => {
    const pageSEO = pageSEOConfig[location.pathname] || {};
    const currentUrl = `${window.location.origin}${location.pathname}`;

    return {
      ...defaultSEO,
      ...pageSEO,
      ...customSEO,
      url: currentUrl,
      canonicalUrl: currentUrl,
    };
  }, [location.pathname, customSEO]);
};

export default useSEO;
