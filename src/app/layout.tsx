import type { Metadata } from 'next';
import Script from 'next/script';
import { DM_Sans, JetBrains_Mono, Instrument_Sans } from 'next/font/google';
import './globals.css';
import Effects from './effects';
import FeatureToggles from './feature-toggles';
import SmoothScroll from './smooth-scroll';
import ShaderBackground from './shader-background';

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  display: 'swap',
});

const instrumentSans = Instrument_Sans({
  variable: '--font-instrument',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover' as const,
  themeColor: '#0a0a0a',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://guilhermebertolo.com.br'),
  title: 'Guilherme Bertolo · building products, not templates',
  description:
    'Building products, not templates. Eu projeto, codifico e coloco no ar. Sozinho, se precisar. Sites, sistemas, apps e automação com IA.',
  applicationName: 'Guilherme Bertolo',
  authors: [{ name: 'Guilherme Bertolo', url: 'https://guilhermebertolo.com.br' }],
  creator: 'Guilherme Bertolo',
  publisher: 'Guilherme Bertolo',
  keywords: [
    'Guilherme Bertolo',
    'desenvolvedor full-stack',
    'engenheiro de IA',
    'Next.js',
    'TypeScript',
    'React',
    'Supabase',
    'Rust',
    'Tauri',
    'AI Orchestration',
    'SaaS',
    'FrotaViva',
    'São Bernardo do Campo',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Guilherme Bertolo · building products, not templates',
    description:
      'Eu projeto, codifico e coloco no ar. Sozinho, se precisar. Sites, sistemas, apps e automação com IA.',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://guilhermebertolo.com.br',
    siteName: 'Guilherme Bertolo',
    images: [
      {
        url: '/og?v=2',
        width: 1200,
        height: 630,
        alt: 'Guilherme Bertolo · building products, not templates',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guilherme Bertolo · building products, not templates',
    description:
      'Eu projeto, codifico e coloco no ar. Sozinho, se precisar. Sites, sistemas, apps e automação com IA.',
    images: ['/og?v=2'],
    creator: '@guibertolo',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${dmSans.variable} ${jetbrainsMono.variable} ${instrumentSans.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Script id="scroll-restore" strategy="beforeInteractive">{`if("scrollRestoration" in history)history.scrollRestoration="manual";window.scrollTo(0,0);document.addEventListener("DOMContentLoaded",function(){window.scrollTo(0,0)});`}</Script>
        <ShaderBackground />
        <Effects />
        <FeatureToggles />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
