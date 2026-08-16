import React from 'react';
import Navigation from '@/components/layout/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
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
        {/* Projects Preview Section */}
        <section id='projects-preview' className='py-20 bg-surface/30'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl md:text-4xl font-bold font-heading mb-8'>
              Featured <span className='gradient-text'>Work</span>
            </h2>
            <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
              Explore my comprehensive portfolio of projects across Frontend,
              AI/ML, and IT infrastructure.
            </p>
            <a
              href='/projects'
              className='inline-flex items-center px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors btn-glow hover-lift'
            >
              View All Projects →
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
