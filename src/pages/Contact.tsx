import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  MessageSquare,
  Send,
  Copy,
  Check,
  Clock,
  Loader2,
  Plane,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Atmosphere from '@/components/atmosphere/Atmosphere';
import FlightLog from '@/components/ui/flight-log';
import SEO from '@/components/seo/SEO';
import StructuredData from '@/components/seo/StructuredData';
import { useSEO } from '@/hooks/use-seo';
import { useStructuredData } from '@/hooks/use-structured-data';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
  const seoProps = useSEO();
  const { breadcrumbSchema } = useStructuredData();
  const formRef = useRef<HTMLFormElement>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'ermias.xii@gmail.com',
      href: 'mailto:ermias.xii@gmail.com',
      description: 'Best for detailed inquiries',
      copyable: true,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+251921615244',
      href: 'tel:+251921615244',
      description: 'Available Mon-Fri, 9AM-6PM EAT',
      copyable: true,
    },
    {
      icon: MessageSquare,
      label: 'Telegram',
      value: '@cloudx69',
      href: 'https://t.me/cloudx69',
      description: 'Quick responses & file sharing',
      copyable: false,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Addis Ababa, Ethiopia',
      href: '#',
      description: 'Available for remote work globally',
      copyable: false,
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/jaHxii',
      description: 'View my code & contributions',
    },
    {
      icon: MessageSquare,
      label: 'Telegram',
      href: 'https://t.me/cloudx69',
      description: 'Quick responses & file sharing',
    },
  ];

  const workingHours = [
    { day: 'Monday - Friday', time: '9:00 AM - 6:00 PM EAT' },
    { day: 'Saturday', time: '10:00 AM - 2:00 PM EAT' },
    { day: 'Sunday', time: 'Emergency only' },
  ];

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      toast({
        title: 'Copied!',
        description: `${label} copied to clipboard`,
      });
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast({
        title: 'Error',
        description: 'Failed to copy to clipboard',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast({
        title: 'Form not configured',
        description:
          'EmailJS is not set up yet. Please email me directly at ermias.xii@gmail.com',
        variant: 'destructive',
      });
      return;
    }

    setIsSending(true);
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'ermias.xii@gmail.com',
        },
        publicKey
      );
      toast({
        title: '✅ Message sent!',
        description: "Thanks! I'll get back to you within 24 hours.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      toast({
        title: '❌ Send failed',
        description:
          'Please try again or email me directly at ermias.xii@gmail.com',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className='min-h-screen bg-background'>
      <SEO {...seoProps} />
      <StructuredData schema={breadcrumbSchema} />
      <Navigation />

      {/* Hero — sunlit horizon */}
      <section className='relative pt-36 pb-24 overflow-hidden'>
        <Atmosphere variant='horizon' />
        <div className='relative z-10 container mx-auto px-4'>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className='max-w-3xl mx-auto text-center'
          >
            <FlightLog
              entries={[
                'HORIZON / CONTACT',
                'CLEARED FOR LANDING',
                'APPROACH · FINAL',
                'ON THE GROUND · CHAT',
              ]}
            />
            <h1 className='text-4xl md:text-6xl font-bold font-heading tracking-tight leading-tight'>
              Let&apos;s Build Something{' '}
              <span className='gold-text'>Reliable.</span>
            </h1>
            <p className='mt-6 text-lg text-mist-soft leading-relaxed font-light max-w-2xl mx-auto'>
              Whether you need technical support, infrastructure work, software
              development, or an engineering-minded problem solver - let&apos;s
              talk.
            </p>
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: 120 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className='h-px bg-gradient-gold mx-auto rounded-full mt-8'
            />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className='relative pb-16 overflow-hidden'>
        <div className='container mx-auto px-4 max-w-6xl'>
          <div className='grid lg:grid-cols-3 gap-8'>
            {/* Contact Information */}
            <div className='lg:col-span-1 space-y-6'>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Card className='glass-cloud'>
                  <CardHeader>
                    <CardTitle className='font-heading'>
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    {contactMethods.map((method, index) => (
                      <motion.div
                        key={method.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                          delay: 1.0 + index * 0.08,
                          duration: 0.5,
                        }}
                        className='flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group'
                      >
                        <div className='p-2 bg-gold/10 rounded-lg shrink-0'>
                          <method.icon className='h-4 w-4 gold-text' />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center gap-2'>
                            <p className='font-medium text-sm'>
                              {method.label}
                            </p>
                            {method.copyable && (
                              <Button
                                size='sm'
                                variant='ghost'
                                className='h-6 w-6 p-0 hover:bg-gold/10'
                                onClick={() =>
                                  copyToClipboard(method.value, method.label)
                                }
                                aria-label={`Copy ${method.label}`}
                              >
                                {copied === method.label ? (
                                  <Check className='h-3 w-3 text-gold' />
                                ) : (
                                  <Copy className='h-3 w-3' />
                                )}
                              </Button>
                            )}
                          </div>
                          <p className='text-sm text-mist-soft mb-1'>
                            {method.value}
                          </p>
                          <p className='text-xs text-mist-soft/70'>
                            {method.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.1, duration: 0.6 }}
              >
                <Card className='glass-cloud'>
                  <CardHeader>
                    <CardTitle className='font-heading'>
                      Connect Online
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-3'>
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                          delay: 1.3 + index * 0.08,
                          duration: 0.5,
                        }}
                        className='flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300 group'
                      >
                        <div className='p-2 bg-gold/10 rounded-lg shrink-0'>
                          <social.icon className='h-4 w-4 gold-text' />
                        </div>
                        <div>
                          <p className='font-medium text-sm group-hover:text-gold transition-colors'>
                            {social.label}
                          </p>
                          <p className='text-xs text-mist-soft'>
                            {social.description}
                          </p>
                        </div>
                      </motion.a>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                <Card className='glass-cloud'>
                  <CardHeader>
                    <CardTitle className='font-heading flex items-center gap-2'>
                      <Clock className='h-5 w-5 gold-text' />
                      Working Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='space-y-2'>
                    {workingHours.map((schedule, index) => (
                      <div
                        key={index}
                        className='flex justify-between items-center text-sm'
                      >
                        <span className='text-mist-soft'>{schedule.day}</span>
                        <span className='glass px-2.5 py-0.5 rounded-md text-xs text-mist-soft'>
                          {schedule.time}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.5, duration: 0.6 }}
                aria-label='Boarding pass'
              >
                <div className='glass-cloud rounded-2xl overflow-hidden'>
                  <div className='flex items-center justify-between px-5 py-3 border-b border-dashed border-border/60'>
                    <span className='font-mono text-[10px] tracking-[0.25em] text-mist-soft'>
                      BOARDING PASS
                    </span>
                    <Plane className='h-4 w-4 gold-text' aria-hidden='true' />
                  </div>
                  <div className='px-5 py-4 space-y-2.5'>
                    <div className='flex justify-between'>
                      <span className='font-mono text-[10px] tracking-[0.2em] text-mist-soft/70'>
                        PASSENGER
                      </span>
                      <span className='text-sm font-medium'>ERMIAS LEMESA</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-mono text-[10px] tracking-[0.2em] text-mist-soft/70'>
                        FROM
                      </span>
                      <span className='text-sm'>ADDIS ABABA</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-mono text-[10px] tracking-[0.2em] text-mist-soft/70'>
                        TO
                      </span>
                      <span className='text-sm'>REMOTE · WORLDWIDE</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='font-mono text-[10px] tracking-[0.2em] text-mist-soft/70'>
                        CLASS
                      </span>
                      <span className='text-sm'>SENIOR IT</span>
                    </div>
                    <div className='flex justify-between items-center border-t border-dashed border-border/60 pt-2.5'>
                      <span className='font-mono text-[10px] tracking-[0.2em] text-mist-soft/70'>
                        SEAT
                      </span>
                      <span className='font-mono text-xs gold-text'>01A</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className='lg:col-span-2'
            >
              <Card className='glass-cloud'>
                <CardHeader>
                  <CardTitle className='font-heading'>
                    Send me a message
                  </CardTitle>
                  <p className='text-mist-soft'>
                    Have a project in mind? Let&apos;s discuss how we can work
                    together.
                  </p>
                </CardHeader>
                <CardContent>
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className='space-y-6'
                  >
                    <div className='grid md:grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <label htmlFor='name' className='text-sm font-medium'>
                          Full Name *
                        </label>
                        <Input
                          id='name'
                          name='name'
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder='John Doe'
                          required
                          disabled={isSending}
                          className='bg-white/[0.02] border-border focus:border-gold/50'
                        />
                      </div>
                      <div className='space-y-2'>
                        <label htmlFor='email' className='text-sm font-medium'>
                          Email Address *
                        </label>
                        <Input
                          id='email'
                          name='email'
                          type='email'
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder='john@example.com'
                          required
                          disabled={isSending}
                          className='bg-white/[0.02] border-border focus:border-gold/50'
                        />
                      </div>
                    </div>

                    <div className='space-y-2'>
                      <label htmlFor='subject' className='text-sm font-medium'>
                        Subject *
                      </label>
                      <Input
                        id='subject'
                        name='subject'
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder='Project inquiry, collaboration, etc.'
                        required
                        disabled={isSending}
                        className='bg-white/[0.02] border-border focus:border-gold/50'
                      />
                    </div>

                    <div className='space-y-2'>
                      <label htmlFor='message' className='text-sm font-medium'>
                        Message *
                      </label>
                      <Textarea
                        id='message'
                        name='message'
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder='Tell me about your project, timeline, budget, and any specific requirements...'
                        rows={6}
                        required
                        disabled={isSending}
                        className='bg-white/[0.03] border-white/10 focus:border-gold/50 resize-none'
                      />
                    </div>

                    <Button
                      type='submit'
                      disabled={isSending}
                      className='w-full bg-mist text-storm-deep hover:bg-mist/90 hover:shadow-glow-strong transition-all duration-300 disabled:opacity-70'
                    >
                      {isSending ? (
                        <>
                          <Loader2 className='mr-2 h-4 w-4 animate-spin' />{' '}
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className='mr-2 h-4 w-4' /> Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Response Time Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.6, duration: 0.6 }}
            className='mt-12 text-center'
          >
            <Card className='glass-cloud max-w-2xl mx-auto'>
              <CardContent className='p-6'>
                <h3 className='font-heading font-semibold mb-2'>
                  Quick Response Guarantee
                </h3>
                <p className='text-mist-soft text-sm'>
                  I typically respond to all inquiries within{' '}
                  <span className='gold-text font-medium'>24 hours</span>. For
                  urgent matters, please use Telegram or call directly.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
