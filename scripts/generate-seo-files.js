import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const HOSTNAME = process.env.VITE_SITE_URL || 'https://__SITE_URL__';
const OUTPUT_DIR = join(__dirname, '../dist');

// Define routes directly in the script
const routes = [
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

const generateSitemap = async hostname => {
  // Create a stream to write to
  const stream = new SitemapStream({ hostname });

  // Return a promise that resolves with the XML string
  return streamToPromise(Readable.from(routes).pipe(stream)).then(data =>
    data.toString()
  );
};

const generateRobotsTxt = hostname => {
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

async function generateSEOFiles() {
  try {
    console.log('🚀 Generating SEO files...');

    // Ensure output directory exists
    mkdirSync(OUTPUT_DIR, { recursive: true });

    // Generate sitemap.xml
    console.log('📄 Generating sitemap.xml...');
    const sitemapXML = await generateSitemap(HOSTNAME);
    const sitemapPath = join(OUTPUT_DIR, 'sitemap.xml');
    writeFileSync(sitemapPath, sitemapXML);
    console.log(`✅ Sitemap generated: ${sitemapPath}`);

    // Generate robots.txt
    console.log('🤖 Generating robots.txt...');
    const robotsTxt = generateRobotsTxt(HOSTNAME);
    const robotsPath = join(OUTPUT_DIR, 'robots.txt');
    writeFileSync(robotsPath, robotsTxt);
    console.log(`✅ Robots.txt generated: ${robotsPath}`);

    // Log summary
    console.log('\n📊 SEO Files Summary:');
    console.log(`   Hostname: ${HOSTNAME}`);
    console.log(`   Routes: ${routes.length}`);
    console.log(`   Sitemap: ${sitemapPath}`);
    console.log(`   Robots: ${robotsPath}`);
    console.log('\n🎉 SEO files generated successfully!');
  } catch (error) {
    console.error('❌ Error generating SEO files:', error);
    process.exit(1);
  }
}

// Run the generator
generateSEOFiles();
