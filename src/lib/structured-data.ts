// Structured Data (JSON-LD) utilities for SEO

export interface PersonSchema {
  '@context': 'https://schema.org';
  '@type': 'Person';
  name: string;
  jobTitle: string;
  description?: string;
  url?: string;
  image?: string;
  email?: string;
  telephone?: string;
  address?: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressCountry: string;
  };
  sameAs?: string[];
  knowsAbout?: string[];
  alumniOf?: {
    '@type': 'EducationalOrganization';
    name: string;
    url?: string;
  };
  worksFor?: {
    '@type': 'Organization';
    name: string;
    url?: string;
  };
}

export interface WorkSchema {
  '@context': 'https://schema.org';
  '@type': 'CreativeWork';
  name: string;
  description: string;
  url?: string;
  image?: string;
  dateCreated?: string;
  dateModified?: string;
  creator: {
    '@type': 'Person';
    name: string;
  };
  keywords?: string[];
  genre?: string;
  programmingLanguage?: string[];
  codeRepository?: string;
  runtimePlatform?: string[];
}

export interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  description?: string;
  url?: string;
  logo?: string;
  address?: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressCountry: string;
  };
  foundingDate?: string;
  employee?: {
    '@type': 'Person';
    name: string;
    jobTitle: string;
    startDate: string;
    endDate?: string;
  }[];
}

export interface BreadcrumbListSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: {
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }[];
}

export interface WebSiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  description: string;
  url: string;
  author: {
    '@type': 'Person';
    name: string;
  };
  potentialAction?: {
    '@type': 'SearchAction';
    target: {
      '@type': 'EntryPoint';
      urlTemplate: string;
    };
    'query-input': string;
  };
}

// Default person schema for the portfolio owner
export const createPersonSchema = (
  overrides?: Partial<PersonSchema>
): PersonSchema => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ermias Lemesa',
  jobTitle: 'Computer Engineer | IT Support Specialist | Hardware Engineer',
  description:
    'Computer Engineer and Senior IT Support Specialist with hands-on experience in hardware, networking, helpdesk, and AI/ML.',
  url:
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://portfolio.example.com',
  image: '/portfolio.png',
  email: 'ermias.xii@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Addis Ababa',
    addressCountry: 'Ethiopia',
  },
  sameAs: ['https://github.com/jaHxii', 'https://t.me/cloudx69'],
  knowsAbout: [
    'IT Support',
    'Hardware Engineering',
    'Networking',
    'Python',
    'Machine Learning',
    'Web Development',
    'Database Design',
  ],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'University of Gondar',
    url: 'https://www.uog.edu.et',
  },
  ...overrides,
});

// Create work schema for projects
export const createWorkSchema = (project: {
  name: string;
  description: string;
  url?: string;
  image?: string;
  dateCreated?: string;
  dateModified?: string;
  keywords?: string[];
  programmingLanguage?: string[];
  codeRepository?: string;
  runtimePlatform?: string[];
}): WorkSchema => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: project.name,
  description: project.description,
  url: project.url,
  image: project.image,
  dateCreated: project.dateCreated,
  dateModified: project.dateModified,
  creator: {
    '@type': 'Person',
    name: 'Ermias Lemesa',
  },
  keywords: project.keywords,
  genre: 'Software Application',
  programmingLanguage: project.programmingLanguage,
  codeRepository: project.codeRepository,
  runtimePlatform: project.runtimePlatform,
});

// Create organization schema for work experience
export const createOrganizationSchema = (organization: {
  name: string;
  description?: string;
  url?: string;
  logo?: string;
  foundingDate?: string;
  address?: {
    locality: string;
    country: string;
  };
  employees?: {
    name: string;
    jobTitle: string;
    startDate: string;
    endDate?: string;
  }[];
}): OrganizationSchema => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: organization.name,
  description: organization.description,
  url: organization.url,
  logo: organization.logo,
  foundingDate: organization.foundingDate,
  address: organization.address
    ? {
        '@type': 'PostalAddress',
        addressLocality: organization.address.locality,
        addressCountry: organization.address.country,
      }
    : undefined,
  employee: organization.employees?.map(emp => ({
    '@type': 'Person',
    name: emp.name,
    jobTitle: emp.jobTitle,
    startDate: emp.startDate,
    endDate: emp.endDate,
  })),
});

// Create breadcrumb schema for navigation
export const createBreadcrumbSchema = (
  breadcrumbs: { name: string; url: string }[]
): BreadcrumbListSchema => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url,
  })),
});

// Create website schema
export const createWebSiteSchema = (
  overrides?: Partial<WebSiteSchema>
): WebSiteSchema => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Ermias Lemesa - Portfolio',
  description:
    'Portfolio of Ermias Lemesa - Computer Engineer and Senior IT Support Specialist based in Addis Ababa, Ethiopia.',
  url:
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://portfolio.example.com',
  author: {
    '@type': 'Person',
    name: 'Ermias Lemesa',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${typeof window !== 'undefined' ? window.location.origin : 'https://portfolio.example.com'}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  ...overrides,
});

// Utility function to generate JSON-LD script tag content
export const generateJSONLD = (schema: any): string => {
  return JSON.stringify(schema, null, 2);
};

// Validate JSON-LD schema
export const validateSchema = (schema: any): boolean => {
  try {
    // Basic validation - check required fields
    if (!schema['@context'] || !schema['@type']) {
      console.error('Schema missing required @context or @type');
      return false;
    }

    // Validate context
    if (schema['@context'] !== 'https://schema.org') {
      console.error('Invalid @context, should be https://schema.org');
      return false;
    }

    // Additional type-specific validation
    switch (schema['@type']) {
      case 'Person':
        if (!schema.name) {
          console.error('Person schema missing required name field');
          return false;
        }
        break;
      case 'CreativeWork':
        if (!schema.name || !schema.description) {
          console.error(
            'CreativeWork schema missing required name or description'
          );
          return false;
        }
        break;
      case 'Organization':
        if (!schema.name) {
          console.error('Organization schema missing required name field');
          return false;
        }
        break;
      case 'BreadcrumbList':
        if (!schema.itemListElement || !Array.isArray(schema.itemListElement)) {
          console.error(
            'BreadcrumbList schema missing or invalid itemListElement'
          );
          return false;
        }
        break;
      case 'WebSite':
        if (!schema.name || !schema.url) {
          console.error('WebSite schema missing required name or url');
          return false;
        }
        break;
    }

    return true;
  } catch (error) {
    console.error('Schema validation error:', error);
    return false;
  }
};
