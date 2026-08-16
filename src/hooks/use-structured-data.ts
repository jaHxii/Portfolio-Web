import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import {
  createPersonSchema,
  createWebSiteSchema,
  createBreadcrumbSchema,
  createWorkSchema,
  PersonSchema,
  WebSiteSchema,
  BreadcrumbListSchema,
  WorkSchema,
} from '@/lib/structured-data';

interface UseStructuredDataReturn {
  personSchema: PersonSchema;
  websiteSchema: WebSiteSchema;
  breadcrumbSchema: BreadcrumbListSchema;
  projectSchemas?: WorkSchema[];
}

export const useStructuredData = (customData?: {
  projects?: Array<{
    name: string;
    description: string;
    url?: string;
    image?: string;
    dateCreated?: string;
    keywords?: string[];
    programmingLanguage?: string[];
    codeRepository?: string;
  }>;
}): UseStructuredDataReturn => {
  const location = useLocation();

  return useMemo(() => {
    // Create person schema
    const personSchema = createPersonSchema({
      url: window.location.origin,
    });

    // Create website schema
    const websiteSchema = createWebSiteSchema({
      url: window.location.origin,
    });

    // Create breadcrumb schema based on current path
    const breadcrumbSchema = createBreadcrumbSchema(
      getBreadcrumbsFromPath(location.pathname, window.location.origin)
    );

    // Create project schemas if provided
    const projectSchemas = customData?.projects?.map(project =>
      createWorkSchema(project)
    );

    return {
      personSchema,
      websiteSchema,
      breadcrumbSchema,
      projectSchemas,
    };
  }, [location.pathname, customData]);
};

// Helper function to generate breadcrumbs from path
const getBreadcrumbsFromPath = (
  pathname: string,
  origin: string
): Array<{ name: string; url: string }> => {
  const breadcrumbs = [{ name: 'Home', url: origin }];

  const pathSegments = pathname.split('/').filter(segment => segment);

  pathSegments.forEach((segment, index) => {
    const url = `${origin}/${pathSegments.slice(0, index + 1).join('/')}`;
    const name = getPageNameFromSegment(segment);
    breadcrumbs.push({ name, url });
  });

  return breadcrumbs;
};

// Helper function to get readable page names from URL segments
const getPageNameFromSegment = (segment: string): string => {
  const pageNames: Record<string, string> = {
    projects: 'Projects',
    skills: 'Skills & Technologies',
    experience: 'Professional Experience',
    contact: 'Contact',
    about: 'About',
  };

  return (
    pageNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
  );
};

export default useStructuredData;
