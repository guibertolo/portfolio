import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Guilherme Bertolo — AI Engineer',
    short_name: 'GB Portfolio',
    description: 'Portfolio de Guilherme Bertolo — AI Engineer & Full-stack Developer',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#3b82f6',
  };
}
