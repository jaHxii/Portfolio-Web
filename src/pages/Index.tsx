import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ProjectCarousel from '@/components/sections/ProjectCarousel';
import { TechMarquee } from '@/components/ui/tech-marquee';
import Atmosphere from '@/components/atmosphere/Atmosphere';
import SEO from '@/components/seo/SEO';
import StructuredData from '@/components/seo/StructuredData';
import { useSEO } from '@/hooks/use-seo';
import { useStructuredData } from '@/hooks/use-structured-data';

const Index = () => {
  const seoProps = useSEO();
  const { personSchema, websiteSchema, breadcrumbSchema } = useStructuredData();

  return (
    <div className='min-h-screen bg-background'>
      <SEO {...seoProps} />
      <StructuredData schema={personSchema} />
      <StructuredData schema={websiteSchema} />
      <StructuredData schema={breadcrumbSchema} />
      <Navigation />
      <main>
        <Hero />
        <About />

        {/* Skills Marquee */}
        <section className='relative py-12 border-y border-white/5 bg-surface/30 overflow-hidden'>
          <Atmosphere variant='mist' className='opacity-60' />
          <div className='relative z-10 container mx-auto px-4'>
            <TechMarquee />
          </div>
        </section>

        {/* Featured Work */}
        <section
          id='projects-preview'
          className='relative py-28 overflow-hidden'
        >
          <Atmosphere />
          <div className='relative z-10 container mx-auto px-4'>
            <div className='text-center mb-14'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='flex items-center justify-center gap-4 mb-5'
              >
                <span className='font-mono text-xs tracking-[0.3em] gold-text'>
                  02 /
                </span>
                <h2 className='text-3xl md:text-4xl font-bold font-heading tracking-tight'>
                  Featured <span className='gold-text'>Work</span>
                </h2>
                <div className='hidden md:block h-px w-40 alt-rule' />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className='text-lg text-mist-soft mb-10 max-w-2xl mx-auto font-light'
              >
                A rotating showcase of systems, dashboards, and websites built
                across infrastructure and software.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className='max-w-4xl mx-auto text-left'
              >
                <ProjectCarousel />
              </motion.div>

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                href='/projects'
                className='inline-flex items-center mt-12 px-8 py-3.5 rounded-lg bg-mist text-storm-deep text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-strong'
              >
                View All Projects →
              </motion.a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
