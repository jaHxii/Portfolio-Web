import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ProjectCarousel from '@/components/sections/ProjectCarousel';
import { TechMarquee } from '@/components/ui/tech-marquee';
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
        <section className='py-10 border-y border-border/50 bg-surface/20'>
          <div className='container mx-auto px-4'>
            <TechMarquee />
          </div>
        </section>

        {/* Featured Work */}
        <section id='projects-preview' className='py-24 relative'>
          <div className='container mx-auto px-4 text-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='flex items-center justify-center gap-4 mb-8'
            >
              <span className='font-mono text-primary text-sm'>02.</span>
              <h2 className='text-3xl md:text-4xl font-bold font-heading tracking-tight'>
                Featured <span className='gradient-text'>Work</span>
              </h2>
              <div className='hidden md:block h-px flex-1 bg-border max-w-[200px]' />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className='text-xl text-muted-foreground mb-12 max-w-2xl mx-auto'
            >
              A rotating showcase of my favorite projects.
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
              className='inline-flex items-center mt-12 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors btn-glow hover-lift'
            >
              View All Projects →
            </motion.a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
