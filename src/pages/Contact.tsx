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
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import Navigation from '@/components/layout/Navigation';
import SEO from '@/components/seo/SEO';
import StructuredData from '@/components/seo/StructuredData';
import { useSEO } from '@/hooks/use-seo';
import { useStructuredData } from '@/hooks/use-structured-data';

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
    <>
      <SEO {...seoProps} />
      <StructuredData schema={breadcrumbSchema} />
      <Navigation />
      <div className='min-h-screen bg-background pt-20'>
        <div className='container mx-auto px-4 py-12'>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className='max-w-7xl mx-auto'
          >
            {/* Header */}
            <div className='text-center mb-16'>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className='text-4xl md:text-5xl font-bold font-heading tracking-tight mb-4'
              >
                <span className='font-mono text-primary text-sm md:text-base mr-3'>
                  06.
                </span>
                Let's <span className='gradient-text'>Connect</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className='text-xl text-muted-foreground max-w-3xl mx-auto'
              >
                Ready to bring your ideas to life? Let's discuss your next
                project and how I can help you achieve your goals with
                cutting-edge technology solutions.
              </motion.p>
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: 100 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
                className='h-1 bg-gradient-primary mx-auto rounded-full mt-8'
              />
            </div>

            <div className='grid lg:grid-cols-3 gap-8'>
              {/* Contact Information */}
              <div className='lg:col-span-1 space-y-6'>
                {/* Contact Methods */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <Card className='glass'>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-4'>
                      {contactMethods.map((method, index) => (
                        <motion.div
                          key={method.label}
                          initial={{ opacity: 0, y: 20 }}
                          animate={inView ? { opacity: 1, y: 0 } : {}}
                          transition={{
                            delay: 1.0 + index * 0.1,
                            duration: 0.5,
                          }}
                          className='flex items-start gap-3 p-3 rounded-lg hover:bg-surface/50 transition-colors group'
                        >
                          <div className='p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors'>
                            <method.icon className='h-4 w-4 text-primary' />
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
                                  className='h-6 w-6 p-0 hover:bg-primary/10'
                                  onClick={() =>
                                    copyToClipboard(method.value, method.label)
                                  }
                                >
                                  {copied === method.label ? (
                                    <Check className='h-3 w-3 text-green-500' />
                                  ) : (
                                    <Copy className='h-3 w-3' />
                                  )}
                                </Button>
                              )}
                            </div>
                            <p className='text-sm text-muted-foreground mb-1'>
                              {method.value}
                            </p>
                            <p className='text-xs text-muted-foreground'>
                              {method.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.2, duration: 0.6 }}
                >
                  <Card className='glass'>
                    <CardHeader>
                      <CardTitle>Connect Online</CardTitle>
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
                            delay: 1.4 + index * 0.1,
                            duration: 0.5,
                          }}
                          className='flex items-center gap-3 p-3 rounded-lg hover:bg-surface/50 transition-all duration-300 hover-lift group'
                        >
                          <div className='p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors'>
                            <social.icon className='h-4 w-4 text-primary' />
                          </div>
                          <div>
                            <p className='font-medium text-sm group-hover:text-primary transition-colors'>
                              {social.label}
                            </p>
                            <p className='text-xs text-muted-foreground'>
                              {social.description}
                            </p>
                          </div>
                        </motion.a>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Working Hours */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.6, duration: 0.6 }}
                >
                  <Card className='glass'>
                    <CardHeader>
                      <CardTitle className='flex items-center gap-2'>
                        <Clock className='h-5 w-5 text-primary' />
                        Working Hours
                      </CardTitle>
                    </CardHeader>
                    <CardContent className='space-y-2'>
                      {workingHours.map((schedule, index) => (
                        <div
                          key={index}
                          className='flex justify-between items-center text-sm'
                        >
                          <span className='text-muted-foreground'>
                            {schedule.day}
                          </span>
                          <Badge variant='outline' className='text-xs'>
                            {schedule.time}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
                className='lg:col-span-2'
              >
                <Card className='glass'>
                  <CardHeader>
                    <CardTitle>Send me a message</CardTitle>
                    <p className='text-muted-foreground'>
                      Have a project in mind? Let's discuss how we can work
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
                            className='bg-surface border-border focus:border-primary'
                          />
                        </div>
                        <div className='space-y-2'>
                          <label
                            htmlFor='email'
                            className='text-sm font-medium'
                          >
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
                            className='bg-surface border-border focus:border-primary'
                          />
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <label
                          htmlFor='subject'
                          className='text-sm font-medium'
                        >
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
                          className='bg-surface border-border focus:border-primary'
                        />
                      </div>

                      <div className='space-y-2'>
                        <label
                          htmlFor='message'
                          className='text-sm font-medium'
                        >
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
                          className='bg-surface border-border focus:border-primary resize-none'
                        />
                      </div>

                      <Button
                        type='submit'
                        disabled={isSending}
                        className='w-full bg-primary hover:bg-primary/90 text-primary-foreground btn-glow hover-lift disabled:opacity-70'
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
              transition={{ delay: 1.8, duration: 0.6 }}
              className='mt-12 text-center'
            >
              <Card className='glass max-w-2xl mx-auto'>
                <CardContent className='p-6'>
                  <h3 className='font-semibold mb-2'>
                    Quick Response Guarantee
                  </h3>
                  <p className='text-muted-foreground text-sm'>
                    I typically respond to all inquiries within{' '}
                    <span className='text-primary font-medium'>24 hours</span>.
                    For urgent matters, please use Telegram or call directly.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact;
