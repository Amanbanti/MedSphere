import type { Config } from 'tailwindcss';
import { medsphereTailwindTheme } from '../../../packages/config/src/tailwind/preset';

const config: Config = {
  ...medsphereTailwindTheme,
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
};

export default config;
