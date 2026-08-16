import { describe, it, expect } from 'vitest';
import {
  createPersonSchema,
  createWorkSchema,
  createOrganizationSchema,
  createBreadcrumbSchema,
  createWebSiteSchema,
  generateJSONLD,
  validateSchema,
} from '../structured-data';

// Mock window.location for tests
const mockLocation = {
  origin: 'https://test.example.com',
};

Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
});

describe('Structured Data', () => {
  describe('createPersonSchema', () => {
    it('should create valid person schema with defaults', () => {
      const schema = createPersonSchema();

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Person');
      expect(schema.name).toBe('Ermias Lemesa');
      expect(schema.jobTitle).toBe(
        'Computer Engineer | IT Support Specialist | Hardware Engineer'
      );
      expect(schema.url).toBe('https://test.example.com');
      expect(schema.address?.addressLocality).toBe('Addis Ababa');
      expect(schema.address?.addressCountry).toBe('Ethiopia');
      expect(Array.isArray(schema.sameAs)).toBe(true);
      expect(Array.isArray(schema.knowsAbout)).toBe(true);
    });

    it('should accept overrides', () => {
      const overrides = {
        name: 'John Doe',
        jobTitle: 'Software Engineer',
        email: 'john@example.com',
      };

      const schema = createPersonSchema(overrides);

      expect(schema.name).toBe('John Doe');
      expect(schema.jobTitle).toBe('Software Engineer');
      expect(schema.email).toBe('john@example.com');
      // Should keep defaults for non-overridden fields
      expect(schema.address?.addressLocality).toBe('Addis Ababa');
    });

    it('should include educational and work information', () => {
      const schema = createPersonSchema();

      expect(schema.alumniOf?.name).toBe('University of Gondar');
      expect(schema.alumniOf?.url).toBe('https://www.uog.edu.et');
    });
  });

  describe('createWorkSchema', () => {
    it('should create valid work schema', () => {
      const project = {
        name: 'Test Project',
        description: 'A test project description',
        url: 'https://example.com/project',
        keywords: ['react', 'typescript'],
        programmingLanguage: ['JavaScript', 'TypeScript'],
        codeRepository: 'https://github.com/user/project',
      };

      const schema = createWorkSchema(project);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('CreativeWork');
      expect(schema.name).toBe('Test Project');
      expect(schema.description).toBe('A test project description');
      expect(schema.url).toBe('https://example.com/project');
      expect(schema.creator.name).toBe('Ermias Lemesa');
      expect(schema.genre).toBe('Software Application');
      expect(schema.keywords).toEqual(['react', 'typescript']);
      expect(schema.programmingLanguage).toEqual(['JavaScript', 'TypeScript']);
      expect(schema.codeRepository).toBe('https://github.com/user/project');
    });

    it('should handle optional fields', () => {
      const project = {
        name: 'Minimal Project',
        description: 'Minimal description',
      };

      const schema = createWorkSchema(project);

      expect(schema.name).toBe('Minimal Project');
      expect(schema.description).toBe('Minimal description');
      expect(schema.url).toBeUndefined();
      expect(schema.keywords).toBeUndefined();
    });
  });

  describe('createOrganizationSchema', () => {
    it('should create valid organization schema', () => {
      const organization = {
        name: 'Test Company',
        description: 'A test company',
        url: 'https://testcompany.com',
        foundingDate: '2020-01-01',
        address: {
          locality: 'Test City',
          country: 'Test Country',
        },
        employees: [
          {
            name: 'John Doe',
            jobTitle: 'Developer',
            startDate: '2021-01-01',
            endDate: '2022-01-01',
          },
        ],
      };

      const schema = createOrganizationSchema(organization);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('Organization');
      expect(schema.name).toBe('Test Company');
      expect(schema.description).toBe('A test company');
      expect(schema.url).toBe('https://testcompany.com');
      expect(schema.foundingDate).toBe('2020-01-01');
      expect(schema.address?.addressLocality).toBe('Test City');
      expect(schema.address?.addressCountry).toBe('Test Country');
      expect(schema.employee).toHaveLength(1);
      expect(schema.employee?.[0].name).toBe('John Doe');
      expect(schema.employee?.[0].jobTitle).toBe('Developer');
    });

    it('should handle minimal organization data', () => {
      const organization = {
        name: 'Minimal Company',
      };

      const schema = createOrganizationSchema(organization);

      expect(schema.name).toBe('Minimal Company');
      expect(schema.description).toBeUndefined();
      expect(schema.address).toBeUndefined();
      expect(schema.employee).toBeUndefined();
    });
  });

  describe('createBreadcrumbSchema', () => {
    it('should create valid breadcrumb schema', () => {
      const breadcrumbs = [
        { name: 'Home', url: 'https://example.com' },
        { name: 'Projects', url: 'https://example.com/projects' },
        { name: 'Project Detail', url: 'https://example.com/projects/1' },
      ];

      const schema = createBreadcrumbSchema(breadcrumbs);

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('BreadcrumbList');
      expect(schema.itemListElement).toHaveLength(3);

      schema.itemListElement.forEach((item, index) => {
        expect(item['@type']).toBe('ListItem');
        expect(item.position).toBe(index + 1);
        expect(item.name).toBe(breadcrumbs[index].name);
        expect(item.item).toBe(breadcrumbs[index].url);
      });
    });

    it('should handle empty breadcrumbs', () => {
      const schema = createBreadcrumbSchema([]);

      expect(schema.itemListElement).toHaveLength(0);
    });
  });

  describe('createWebSiteSchema', () => {
    it('should create valid website schema with defaults', () => {
      const schema = createWebSiteSchema();

      expect(schema['@context']).toBe('https://schema.org');
      expect(schema['@type']).toBe('WebSite');
      expect(schema.name).toBe('Ermias Lemesa - Portfolio');
      expect(schema.url).toBe('https://test.example.com');
      expect(schema.author.name).toBe('Ermias Lemesa');
      expect(schema.potentialAction?.['@type']).toBe('SearchAction');
    });

    it('should accept overrides', () => {
      const overrides = {
        name: 'Custom Portfolio',
        description: 'Custom description',
      };

      const schema = createWebSiteSchema(overrides);

      expect(schema.name).toBe('Custom Portfolio');
      expect(schema.description).toBe('Custom description');
      expect(schema.url).toBe('https://test.example.com'); // Should keep default
    });
  });

  describe('generateJSONLD', () => {
    it('should generate valid JSON-LD string', () => {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Test Person',
      };

      const jsonLD = generateJSONLD(schema);

      expect(typeof jsonLD).toBe('string');
      expect(jsonLD).toContain('"@context": "https://schema.org"');
      expect(jsonLD).toContain('"@type": "Person"');
      expect(jsonLD).toContain('"name": "Test Person"');

      // Should be valid JSON
      expect(() => JSON.parse(jsonLD)).not.toThrow();
    });

    it('should format JSON with proper indentation', () => {
      const schema = { '@context': 'https://schema.org', '@type': 'Person' };
      const jsonLD = generateJSONLD(schema);

      // Should contain newlines and spaces for formatting
      expect(jsonLD).toContain('\n');
      expect(jsonLD).toContain('  ');
    });
  });

  describe('validateSchema', () => {
    it('should validate correct Person schema', () => {
      const schema = createPersonSchema();
      expect(validateSchema(schema)).toBe(true);
    });

    it('should validate correct CreativeWork schema', () => {
      const schema = createWorkSchema({
        name: 'Test Work',
        description: 'Test description',
      });
      expect(validateSchema(schema)).toBe(true);
    });

    it('should validate correct Organization schema', () => {
      const schema = createOrganizationSchema({
        name: 'Test Org',
      });
      expect(validateSchema(schema)).toBe(true);
    });

    it('should validate correct BreadcrumbList schema', () => {
      const schema = createBreadcrumbSchema([
        { name: 'Home', url: 'https://example.com' },
      ]);
      expect(validateSchema(schema)).toBe(true);
    });

    it('should validate correct WebSite schema', () => {
      const schema = createWebSiteSchema();
      expect(validateSchema(schema)).toBe(true);
    });

    it('should reject schema without @context', () => {
      const schema = {
        '@type': 'Person',
        name: 'Test',
      };
      expect(validateSchema(schema)).toBe(false);
    });

    it('should reject schema without @type', () => {
      const schema = {
        '@context': 'https://schema.org',
        name: 'Test',
      };
      expect(validateSchema(schema)).toBe(false);
    });

    it('should reject schema with invalid @context', () => {
      const schema = {
        '@context': 'https://invalid.org',
        '@type': 'Person',
        name: 'Test',
      };
      expect(validateSchema(schema)).toBe(false);
    });

    it('should reject Person schema without name', () => {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
      };
      expect(validateSchema(schema)).toBe(false);
    });

    it('should reject CreativeWork schema without required fields', () => {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: 'Test',
        // Missing description
      };
      expect(validateSchema(schema)).toBe(false);
    });

    it('should reject Organization schema without name', () => {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
      };
      expect(validateSchema(schema)).toBe(false);
    });

    it('should reject BreadcrumbList schema without itemListElement', () => {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
      };
      expect(validateSchema(schema)).toBe(false);
    });

    it('should reject WebSite schema without required fields', () => {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        // Missing name and url
      };
      expect(validateSchema(schema)).toBe(false);
    });

    it('should handle validation errors gracefully', () => {
      const invalidSchema = null;
      expect(validateSchema(invalidSchema)).toBe(false);
    });
  });
});
