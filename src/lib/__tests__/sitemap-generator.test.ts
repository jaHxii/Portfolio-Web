import { describe, it, expect } from 'vitest';
import {
  generateSitemap,
  generateRobotsTxt,
  validateSitemapRoutes,
  addDynamicRoutes,
  updateRouteLastMod,
  routes,
} from '../sitemap-generator';

describe('Sitemap Generator', () => {
  describe('generateSitemap', () => {
    it('should generate valid XML sitemap', async () => {
      const hostname = 'https://test.example.com';
      const sitemap = await generateSitemap(hostname);

      expect(sitemap).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(sitemap).toContain(
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'
      );
      expect(sitemap).toContain(`<loc>${hostname}/</loc>`);
      expect(sitemap).toContain(`<loc>${hostname}/projects</loc>`);
      expect(sitemap).toContain('<changefreq>weekly</changefreq>');
      expect(sitemap).toContain('<priority>1.0</priority>');
    });

    it('should include all defined routes', async () => {
      const sitemap = await generateSitemap();

      routes.forEach(route => {
        expect(sitemap).toContain(
          `<loc>https://portfolio.example.com${route.url}</loc>`
        );
      });
    });

    it('should include lastmod dates', async () => {
      const sitemap = await generateSitemap();
      expect(sitemap).toContain('<lastmod>');
    });
  });

  describe('generateRobotsTxt', () => {
    it('should generate valid robots.txt content', () => {
      const hostname = 'https://test.example.com';
      const robotsTxt = generateRobotsTxt(hostname);

      expect(robotsTxt).toContain('User-agent: *');
      expect(robotsTxt).toContain('Allow: /');
      expect(robotsTxt).toContain(`Sitemap: ${hostname}/sitemap.xml`);
      expect(robotsTxt).toContain('Crawl-delay: 1');
    });

    it('should include major search engine user agents', () => {
      const robotsTxt = generateRobotsTxt();

      expect(robotsTxt).toContain('User-agent: Googlebot');
      expect(robotsTxt).toContain('User-agent: Bingbot');
      expect(robotsTxt).toContain('User-agent: Slurp');
      expect(robotsTxt).toContain('User-agent: DuckDuckBot');
      expect(robotsTxt).toContain('User-agent: Baiduspider');
      expect(robotsTxt).toContain('User-agent: YandexBot');
    });

    it('should include social media crawlers', () => {
      const robotsTxt = generateRobotsTxt();

      expect(robotsTxt).toContain('User-agent: facebookexternalhit');
      expect(robotsTxt).toContain('User-agent: Twitterbot');
      expect(robotsTxt).toContain('User-agent: LinkedInBot');
    });

    it('should use default hostname when none provided', () => {
      const robotsTxt = generateRobotsTxt();
      expect(robotsTxt).toContain(
        'Sitemap: https://portfolio.example.com/sitemap.xml'
      );
    });
  });

  describe('validateSitemapRoutes', () => {
    it('should validate correct routes', () => {
      const validRoutes = [
        { url: '/', changefreq: 'weekly' as const, priority: 1.0 },
        { url: '/about', changefreq: 'monthly' as const, priority: 0.8 },
      ];

      expect(validateSitemapRoutes(validRoutes)).toBe(true);
    });

    it('should reject routes with invalid URLs', () => {
      const invalidRoutes = [
        { url: '', changefreq: 'weekly' as const, priority: 1.0 },
        { url: null as any, changefreq: 'monthly' as const, priority: 0.8 },
      ];

      expect(validateSitemapRoutes(invalidRoutes)).toBe(false);
    });

    it('should reject routes with invalid priority', () => {
      const invalidRoutes = [
        { url: '/', changefreq: 'weekly' as const, priority: 1.5 },
        { url: '/about', changefreq: 'monthly' as const, priority: -0.1 },
      ];

      expect(validateSitemapRoutes(invalidRoutes)).toBe(false);
    });

    it('should reject routes with invalid changefreq', () => {
      const invalidRoutes = [
        { url: '/', changefreq: 'invalid' as any, priority: 1.0 },
      ];

      expect(validateSitemapRoutes(invalidRoutes)).toBe(false);
    });

    it('should accept routes without optional fields', () => {
      const validRoutes = [
        { url: '/' },
        { url: '/about', priority: 0.8 },
        { url: '/contact', changefreq: 'monthly' as const },
      ];

      expect(validateSitemapRoutes(validRoutes)).toBe(true);
    });
  });

  describe('addDynamicRoutes', () => {
    it('should add new routes to existing ones', () => {
      const dynamicRoutes = [
        { url: '/blog/post-1', changefreq: 'weekly' as const, priority: 0.7 },
        { url: '/blog/post-2', changefreq: 'weekly' as const, priority: 0.7 },
      ];

      const allRoutes = addDynamicRoutes(dynamicRoutes);

      expect(allRoutes.length).toBeGreaterThan(routes.length);
      expect(allRoutes.some(route => route.url === '/blog/post-1')).toBe(true);
      expect(allRoutes.some(route => route.url === '/blog/post-2')).toBe(true);
    });

    it('should remove duplicate routes', () => {
      const duplicateRoutes = [
        { url: '/', changefreq: 'daily' as const, priority: 0.9 }, // Duplicate of existing route
        { url: '/new-page', changefreq: 'weekly' as const, priority: 0.7 },
      ];

      const allRoutes = addDynamicRoutes(duplicateRoutes);

      // Should not have duplicates
      const homeRoutes = allRoutes.filter(route => route.url === '/');
      expect(homeRoutes.length).toBe(1);

      // Should include the new page
      expect(allRoutes.some(route => route.url === '/new-page')).toBe(true);
    });
  });

  describe('updateRouteLastMod', () => {
    it('should update lastmod for existing route', () => {
      const testDate = '2023-12-01T00:00:00Z';
      const originalRoute = routes.find(r => r.url === '/');
      const originalLastMod = originalRoute?.lastmod;

      updateRouteLastMod('/', testDate);

      const updatedRoute = routes.find(r => r.url === '/');
      expect(updatedRoute?.lastmod).toBe(testDate);

      // Restore original value
      if (originalRoute && originalLastMod) {
        originalRoute.lastmod = originalLastMod;
      }
    });

    it('should not throw error for non-existent route', () => {
      expect(() => {
        updateRouteLastMod('/non-existent', '2023-12-01T00:00:00Z');
      }).not.toThrow();
    });
  });

  describe('routes configuration', () => {
    it('should have all required routes', () => {
      const expectedRoutes = [
        '/',
        '/projects',
        '/skills',
        '/experience',
        '/contact',
      ];

      expectedRoutes.forEach(expectedRoute => {
        expect(routes.some(route => route.url === expectedRoute)).toBe(true);
      });
    });

    it('should have valid priorities', () => {
      routes.forEach(route => {
        if (route.priority !== undefined) {
          expect(route.priority).toBeGreaterThanOrEqual(0);
          expect(route.priority).toBeLessThanOrEqual(1);
        }
      });
    });

    it('should have valid changefreq values', () => {
      const validChangefreqs = [
        'always',
        'hourly',
        'daily',
        'weekly',
        'monthly',
        'yearly',
        'never',
      ];

      routes.forEach(route => {
        if (route.changefreq) {
          expect(validChangefreqs).toContain(route.changefreq);
        }
      });
    });

    it('should have homepage with highest priority', () => {
      const homePage = routes.find(route => route.url === '/');
      expect(homePage?.priority).toBe(1.0);
    });
  });
});
