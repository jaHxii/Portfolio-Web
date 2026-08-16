import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects-preview');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/jaHxii', label: 'GitHub' },
    { icon: Send, href: 'https://t.me/cloudx69', label: 'Telegram' },
    { icon: Mail, href: 'mailto:ermias.xii@gmail.com', label: 'Email' },
  ];

  return (
    <section className='min-h-screen flex items-center justify-center relative overflow-hidden'>
      {/* Background Effects */}
      <div className='absolute inset-0 bg-gradient-to-br from-background via-background to-surface' />
      <div className='absolute inset-0'>
        <div className='absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float' />
        <div
          className='absolute top-3/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float'
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <div className='max-w-4xl mx-auto text-center'>
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='space-y-8'
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className='inline-flex items-center px-4 py-2 bg-surface border border-border rounded-full text-sm text-muted-foreground'
            >
              <div className='w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse' />
              Available for new opportunities
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className='text-5xl md:text-7xl font-bold font-heading'
            >
              <span className='gradient-text'>Ermias Lemesa</span>
            </motion.h1>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className='text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'
            >
              Computer Engineer | IT Support Specialist | Hardware Engineer
            </motion.h2>

            {/* Motto */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className='text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed'
            >
              Keeping systems running, solving complex IT problems, and building
              practical software — from helpdesk to AI/ML and web applications.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-8'
            >
              <Button
                onClick={scrollToProjects}
                className='group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 btn-glow hover-lift'
              >
                Explore My Work
                <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform' />
              </Button>

              <Button
                variant='outline'
                className='px-8 py-3 hover-lift border-border hover:border-primary/50 hover:bg-primary/5'
                asChild
              >
                <a href='/Ermias.L_cv.pdf' download>
                  <Download className='mr-2 h-4 w-4' />
                  Download CV
                </a>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className='flex items-center justify-center gap-6 pt-8'
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group p-3 bg-surface border border-border rounded-full hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 hover-lift'
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className='h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors' />
                  <span className='sr-only'>{social.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            className='absolute bottom-8 left-1/2 transform -translate-x-1/2'
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className='flex flex-col items-center gap-2 text-muted-foreground'
            >
              <span className='text-sm'>Scroll to explore</span>
              <div className='w-0.5 h-8 bg-gradient-to-b from-primary to-transparent rounded-full' />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
