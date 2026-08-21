import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, Github, Mail, Plane, Send } from 'lucide-react';

const ROLES = [
  'IT Systems Engineer',
  'Systems & Network Specialist',
  'Computer Engineer',
  'Technology Builder',
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const Typewriter = ({ roles }: { roles: string[] }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setText(roles[0] ?? '');
      return;
    }

    const { [roleIndex]: role } = roles;
    const current = role ?? '';
    const speed = deleting ? 30 : 70;

    let pauseTimer: ReturnType<typeof setTimeout> | null = null;

    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) {
          pauseTimer = setTimeout(() => setDeleting(true), 1500);
        }
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === '') {
          setDeleting(false);
          setRoleIndex(prev => (prev + 1) % roles.length);
        }
      }
    }, speed);

    return () => {
      clearTimeout(timeout);
      if (pauseTimer) clearTimeout(pauseTimer);
    };
  }, [text, deleting, roleIndex, roles]);

  return (
    <span className='inline-flex items-center'>
      <span className='gold-text'>{text}</span>
      <span className='ml-1 w-0.5 h-6 md:h-7 bg-gold/70 animate-pulse' />
    </span>
  );
};

const MISSION_LINES = [
  'Holding altitude above the cloud layer - keeping systems reliable.',
  'Engineering calm above the storm - infrastructure, networks, code.',
  'Systems online. Altitude steady. Building what lasts.',
  'Climbing through the clouds, one reliable system at a time.',
];

const Hero = () => {
  const { scrollY } = useScroll();

  // Mission line chosen once per visit
  const [mission] = useState(
    () =>
      MISSION_LINES[Math.floor(Math.random() * MISSION_LINES.length)] ??
      MISSION_LINES[0] ??
      ''
  );

  // Content lifts and fades as you leave the hero (clouds are global — CloudField)
  const contentY = useTransform(scrollY, [0, 600], [0, -60]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0.2]);

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
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden bg-atmo-hero'>
      {/* Aircraft-window vignette */}
      <div
        aria-hidden='true'
        className='hero-vignette pointer-events-none absolute inset-0'
      />

      {/* ── Content ────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className='container mx-auto px-4 relative z-10 py-32'
      >
        <div className='max-w-4xl mx-auto text-center'>
          {/* Aviation status indicator */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className='glass inline-flex items-center gap-2.5 rounded-full px-5 py-2 font-mono text-[11px] tracking-[0.25em] text-mist-soft'
          >
            <span className='relative flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full rounded-full bg-gold/60 motion-safe:animate-ping' />
              <span className='relative inline-flex h-2 w-2 rounded-full bg-gold' />
            </span>
            ERMIAS.LEMESA / SYSTEMS ONLINE
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className='relative mt-8 text-5xl sm:text-6xl md:text-8xl font-bold font-heading tracking-tight leading-[1.05]'
          >
            <span className='name-gradient'>Ermias</span>{' '}
            <span className='name-gradient'>Lemesa</span>
            {/* subtle golden light bleeding across one edge */}
            <span
              aria-hidden='true'
              className='absolute -right-6 top-1/4 h-1/2 w-24 rounded-full opacity-40 blur-2xl'
              style={{ background: 'hsl(42 58% 64% / 0.5)' }}
            />
          </motion.h1>

          {/* Rotating title */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className='mt-6 text-lg md:text-2xl font-mono text-mist-soft h-8 leading-relaxed'
          >
            <Typewriter roles={ROLES} />
          </motion.h2>

          {/* Positioning statement */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className='mt-6 text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed font-heading font-normal'
          >
            Keeping systems reliable, solving complex technical problems, and
            building practical software across infrastructure, networks, web,
            and AI.
          </motion.p>

          {/* Mission line — one per visit */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
            className='mt-6 inline-flex items-center gap-2 font-mono text-[11px] md:text-xs tracking-[0.18em] text-gold/70'
          >
            <Plane className='h-3.5 w-3.5' aria-hidden='true' />
            {mission}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-10'
          >
            <button
              onClick={scrollToProjects}
              className='group inline-flex items-center justify-center gap-2 rounded-lg bg-mist px-8 py-3.5 text-sm font-semibold text-storm-deep transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow-strong'
            >
              Explore My Work
              <ArrowRight className='h-4 w-4 group-hover:translate-x-1 transition-transform duration-300' />
            </button>

            <a
              href='/Ermias.L_cv.pdf'
              download
              className='glass inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3.5 text-sm font-medium text-mist transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/70'
            >
              <Download className='h-4 w-4' />
              Download CV
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.7 }}
            className='flex items-center justify-center gap-5 pt-10'
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target='_blank'
                rel='noopener noreferrer'
                className='glass flex h-11 w-11 items-center justify-center rounded-full text-mist-soft transition-all duration-300 hover:border-gold/60 hover:text-gold hover:shadow-glow'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.95 + index * 0.08, duration: 0.5 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon className='h-5 w-5' />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className='absolute bottom-7 left-1/2 -translate-x-1/2 z-10'
      >
        <motion.div
          animate={prefersReducedMotion() ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className='flex flex-col items-center gap-2.5 text-mist-soft'
        >
          <span className='text-[11px] font-mono tracking-[0.3em] uppercase'>
            descend to explore
          </span>
          {/* Contrailed beam */}
          <div className='relative'>
            <div className='absolute left-1/2 -top-16 h-14 w-10 -translate-x-1/2 bg-gradient-to-t from-mist/15 to-transparent blur-[6px] rounded-full' />
            <div className='h-9 w-px bg-gradient-to-b from-gold/70 to-transparent rounded-full' />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
