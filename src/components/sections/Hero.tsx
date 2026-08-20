import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, Github, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TechMarquee } from '@/components/ui/tech-marquee';

const ROLES = [
  'Computer Engineer',
  'IT Support Specialist',
  'Hardware Engineer',
];

const Typewriter = ({ roles }: { roles: string[] }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const { [roleIndex]: role } = roles;
    const current = role ?? '';
    const speed = deleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === '') {
          setDeleting(false);
          setRoleIndex(prev => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex, roles]);

  return (
    <span className='inline-flex items-center'>
      <span className='gradient-text'>{text}</span>
      <span className='ml-0.5 w-0.5 h-6 md:h-7 bg-primary animate-pulse' />
    </span>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 600], [0, 150]);
  const parallaxOpacity = useTransform(scrollY, [0, 600], [1, 0]);

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
      {/* Animated gradient mesh background */}
      <div className='absolute inset-0 bg-gradient-to-br from-background via-background to-surface'>
        <div className='absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] animate-pulse-glow' />
        <div
          className='absolute top-1/3 right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[120px] animate-pulse-glow'
          style={{ animationDelay: '2s' }}
        />
        <div
          className='absolute bottom-[-20%] left-1/3 w-[500px] h-[500px] rounded-full bg-blue-500/15 blur-[120px] animate-pulse-glow'
          style={{ animationDelay: '4s' }}
        />
        {/* Grid pattern overlay */}
        <div
          className='absolute inset-0 opacity-[0.04]'
          style={{
            backgroundImage:
              'linear-gradient(to right, hsl(217 91% 60%) 1px, transparent 1px), linear-gradient(to bottom, hsl(217 91% 60%) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <div className='max-w-4xl mx-auto text-center'>
          <motion.div
            style={{ y: parallaxY, opacity: parallaxOpacity }}
            className='space-y-8'
          >
            {/* Terminal intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className='inline-flex items-center px-4 py-2 glass rounded-full font-mono text-sm text-muted-foreground'
            >
              <span className='text-green-400 mr-2'>➜</span>
              <span className='text-primary'>~</span>
              <span className='mx-2 text-foreground/60'>$</span>
              whoami
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className='text-5xl md:text-7xl font-bold font-heading tracking-tight'
            >
              <span className='gradient-text'>Ermias Lemesa</span>
            </motion.h1>

            {/* Typewriter Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className='text-xl md:text-2xl font-mono text-muted-foreground max-w-3xl mx-auto leading-relaxed h-8'
            >
              <Typewriter roles={ROLES} />
            </motion.h2>

            {/* Motto */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className='text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed'
            >
              Keeping systems running, solving complex IT problems, and building
              practical software — from helpdesk to AI/ML and web applications.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
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
              transition={{ delay: 1.1, duration: 0.8 }}
              className='flex items-center justify-center gap-6 pt-8'
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group p-3 glass rounded-full hover:shadow-glow transition-all duration-300'
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className='h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors' />
                  <span className='sr-only'>{social.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Tech marquee */}
          <TechMarquee />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className='absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10'
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className='flex flex-col items-center gap-2 text-muted-foreground'
        >
          <span className='text-sm font-mono'>scroll to explore</span>
          <div className='w-0.5 h-8 bg-gradient-to-b from-primary to-transparent rounded-full' />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
