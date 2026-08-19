import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'awd.dev | I Putu Agus Wahyu Dupayana',
    short_name: 'awd.dev',
    description:
      'Portofolio resmi I Putu Agus Wahyu Dupayana — Software Engineer & Systems Architect. Spesialisasi Next.js, Laravel, Proxmox VE, Docker, dan GCP Cloud.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0f17',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
