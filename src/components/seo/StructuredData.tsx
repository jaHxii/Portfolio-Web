import React from 'react';
import { Helmet } from 'react-helmet-async';
import { generateJSONLD, validateSchema } from '@/lib/structured-data';

interface StructuredDataProps {
  schema: Record<string, any>;
  validate?: boolean;
}

const StructuredData: React.FC<StructuredDataProps> = ({
  schema,
  validate = true,
}) => {
  // Validate schema in development
  if (validate && process.env.NODE_ENV === 'development') {
    if (!validateSchema(schema)) {
      console.warn('Invalid structured data schema:', schema);
    }
  }

  const jsonLdString = generateJSONLD(schema);

  return (
    <Helmet>
      <script type='application/ld+json'>{jsonLdString}</script>
    </Helmet>
  );
};

export default StructuredData;
