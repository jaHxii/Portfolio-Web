const PYTHON_SNMP_DEMO_FILENAMES = [
  '01-search-printer.png',
  '02-network-scan.png',
  '03-oid-data.png',
  '04-dashboard.png',
  '05-admin-setup.png',
];

export const PYTHON_SNMP_DEMO_IMAGES: string[] = PYTHON_SNMP_DEMO_FILENAMES.map(
  name => `/demo_pics_for_pythonSNMP/${encodeURIComponent(name)}`
);

export const PYTHON_SNMP_MAIN_IMAGE = PYTHON_SNMP_DEMO_IMAGES[0];
