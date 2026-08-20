import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

export interface SitemapRoute {
  url: string;
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority?: number;
  lastmod?: string;
}

export const routes: SitemapRoute[] = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: 1.0,
    lastmod: new Date().toISOString(),
  },
  {
    url: '/projects',
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: new Date().toISOString(),
  },
  {
    url: '/skills',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString(),
  },
  {
    url: '/experience',
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: new Date().toISOString(),
  },
  {
    url: '/contact',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: new Date().toISOString(),
  },
  {
    url: '/resume',
    changefreq: 'monthly',
    priority: 0.6,
    lastmod: new Date().toISOString(),
  },
];

export const generateSitemap = async (
  hostname: string = 'https://portfolio.example.com'
): Promise<string> => {
  // Create a stream to write to
  const stream = new SitemapStream({ hostname });

  // Return a promise that resolves with the XML string
  return streamToPromise(Readable.from(routes).pipe(stream)).then(data =>
    data.toString()
  );
};

export const generateRobotsTxt = (
  hostname: string = 'https://portfolio.example.com'
): string => {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${hostname}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin or private areas (if any)
# Disallow: /admin/
# Disallow: /private/

# Allow all major search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /
`;
};

// Utility function to validate sitemap URLs
export const validateSitemapRoutes = (routes: SitemapRoute[]): boolean => {
  return routes.every(route => {
    // Check if URL is valid
    if (!route.url || typeof route.url !== 'string') {
      console.error(`Invalid URL: ${route.url}`);
      return false;
    }

    // Check if priority is valid (0.0 to 1.0)
    if (
      route.priority !== undefined &&
      (route.priority < 0 || route.priority > 1)
    ) {
      console.error(`Invalid priority for ${route.url}: ${route.priority}`);
      return false;
    }

    // Check if changefreq is valid
    const validChangefreqs = [
      'always',
      'hourly',
      'daily',
      'weekly',
      'monthly',
      'yearly',
      'never',
    ];
    if (route.changefreq && !validChangefreqs.includes(route.changefreq)) {
      console.error(`Invalid changefreq for ${route.url}: ${route.changefreq}`);
      return false;
    }

    return true;
  });
};

// Function to add dynamic routes (for future use with projects, blog posts, etc.)
export const addDynamicRoutes = (
  dynamicRoutes: SitemapRoute[]
): SitemapRoute[] => {
  const allRoutes = [...routes, ...dynamicRoutes];

  // Remove duplicates based on URL
  const uniqueRoutes = allRoutes.filter(
    (route, index, self) => index === self.findIndex(r => r.url === route.url)
  );

  return uniqueRoutes;
};

// Function to update lastmod for specific routes
export const updateRouteLastMod = (url: string, lastmod: string): void => {
  const route = routes.find(r => r.url === url);
  if (route) {
    route.lastmod = lastmod;
  }
};
