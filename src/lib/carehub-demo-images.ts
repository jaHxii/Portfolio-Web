const CAREHUB_DEMO_FILENAMES = [
  'Screenshot 2026-08-17 234556.png',
  'Screenshot 2026-08-17 234608.png',
  'Screenshot 2026-08-17 234619.png',
  'Screenshot 2026-08-17 234634.png',
  'Screenshot 2026-08-17 234643.png',
  'Screenshot 2026-08-18 005047.png',
  'Screenshot 2026-08-18 005112.png',
  'Screenshot 2026-08-18 005131.png',
];

export const CAREHUB_DEMO_IMAGES: string[] = CAREHUB_DEMO_FILENAMES.map(
  name => `/demo_pics_for_carehub/${encodeURIComponent(name)}`
);

export const CAREHUB_MAIN_IMAGE = CAREHUB_DEMO_IMAGES[0];
