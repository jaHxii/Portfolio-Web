import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
  noFollow?: boolean;
  canonicalUrl?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Portfolio - Frontend Developer & AI/ML Engineer',
  description = 'Professional portfolio showcasing expertise in Frontend Development, AI/ML, and IT Infrastructure. Explore projects, skills, and experience.',
  keywords = [
    'frontend developer',
    'react',
    'typescript',
    'ai',
    'machine learning',
    'portfolio',
  ],
  image = '/portfolio.png',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website',
  author = 'Portfolio Owner',
  publishedTime,
  modifiedTime,
  section,
  tags,
  noIndex = false,
  noFollow = false,
  canonicalUrl,
}) => {
  // Construct full URL for image if it's a relative path
  const fullImageUrl = image.startsWith('http')
    ? image
    : `${typeof window !== 'undefined' ? window.location.origin : ''}${image}`;

  // Construct canonical URL
  const canonical = canonicalUrl || url;

  // Create structured keywords string
  const keywordsString = keywords.join(', ');

  // Robots meta content
  const robotsContent = `${noIndex ? 'noindex' : 'index'},${noFollow ? 'nofollow' : 'follow'}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywordsString} />
      <meta name='author' content={author} />
      <meta name='robots' content={robotsContent} />

      {/* Canonical URL */}
      {canonical && <link rel='canonical' href={canonical} />}

      {/* Open Graph Meta Tags */}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={fullImageUrl} />
      <meta property='og:url' content={url} />
      <meta property='og:type' content={type} />
      <meta property='og:site_name' content='Professional Portfolio' />

      {/* Article-specific Open Graph tags */}
      {type === 'article' && publishedTime && (
        <meta property='article:published_time' content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property='article:modified_time' content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property='article:author' content={author} />
      )}
      {type === 'article' && section && (
        <meta property='article:section' content={section} />
      )}
      {type === 'article' &&
        tags &&
        tags.map((tag, index) => (
          <meta key={index} property='article:tag' content={tag} />
        ))}

      {/* Twitter Card Meta Tags */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={fullImageUrl} />

      {/* Additional SEO Meta Tags */}
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
      <meta name='language' content='English' />
      <meta name='revisit-after' content='7 days' />

      {/* Preconnect to external domains for performance */}
      <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link
        rel='preconnect'
        href='https://fonts.gstatic.com'
        crossOrigin='anonymous'
      />
    </Helmet>
  );
};

export default SEO;
