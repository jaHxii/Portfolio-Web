import React from 'react';
import { Github, Mail, Send } from 'lucide-react';
import PreloadLink from '@/components/ui/preload-link';

const TELEMETRY = [
  'HEADING 045',
  'G/S 320 KTS',
  'FL380',
  'WIND 12 KT',
  'FUEL 45%',
  'PAX 0 · RELIABLE',
  'TICKETS RESOLVED 1000+',
  'SYSTEMS KEPT RUNNING 500+',
  'EST ARRIVAL · CLOUD-9',
];

const Footer = () => {
  const links = [
    { icon: Github, href: 'https://github.com/jaHxii', label: 'GitHub' },
    { icon: Send, href: 'https://t.me/cloudx69', label: 'LinkedIn/Telegram' },
    { icon: Mail, href: 'mailto:ermias.xii@gmail.com', label: 'Email' },
  ];

  return (
    <footer className='relative border-t border-white/5 bg-background overflow-hidden'>
      <div
        aria-hidden='true'
        className='absolute inset-x-0 top-0 h-40 opacity-40 pointer-events-none'
        style={{
          background:
            'linear-gradient(180deg, transparent, hsl(42 58% 64% / 0.06))',
        }}
      />

      {/* Telemetry ticker */}
      <div
        aria-hidden='true'
        className='group relative z-10 overflow-hidden border-b border-white/5 bg-white/[0.02]'
      >
        <div className='absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10' />
        <div className='absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10' />
        <div className='flex whitespace-nowrap motion-safe:animate-marquee-reverse [animation-duration:80s] group-hover:[animation-play-state:paused]'>
          {[0, 1].map(duplicate => (
            <div
              key={duplicate}
              className='flex shrink-0 items-center py-3 font-mono text-[11px] tracking-[0.25em] text-mist-soft/70'
            >
              {TELEMETRY.map(item => (
                <span key={item} className='inline-flex items-center px-8'>
                  <span className='mr-3 h-1.5 w-1.5 rounded-full bg-gold/70' />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className='relative z-10 container mx-auto px-4 py-14'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-8'>
          <div>
            <p className='font-heading font-semibold text-lg tracking-tight'>
              Ermias Lemesa
            </p>
            <p className='text-sm text-mist-soft mt-1'>Computer Engineer</p>
          </div>

          <div className='flex items-center gap-5'>
            {links.map(link => (
              <a
                key={link.label}
                href={link.href}
                target='_blank'
                rel='noopener noreferrer'
                aria-label={link.label}
                className='glass flex h-10 w-10 items-center justify-center rounded-full text-mist-soft transition-all duration-300 hover:text-gold hover:border-gold/60'
              >
                <link.icon className='h-4 w-4' />
              </a>
            ))}
            <PreloadLink
              to='/resume'
              className='text-sm text-mist-soft hover:text-gold transition-colors'
            >
              CV
            </PreloadLink>
          </div>
        </div>

        <div className='mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3'>
          <span className='font-mono text-[11px] tracking-[0.3em] text-mist-soft/60'>
            SYSTEMS ONLINE
          </span>
          <span className='font-mono text-[11px] tracking-[0.2em] text-mist-soft/60'>
            © 2026 ERMIAS LEMESA
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
