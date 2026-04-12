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
  title: 'Guilherme Bertolo | AI Engineer & Full-stack Developer',
  description:
    'Portfolio de Guilherme Bertolo - Engenheiro de Software, Analista de Processos e entusiasta de Inteligência Artificial. Projetos com Next.js, TypeScript, Rust e AI Orchestration.',
  keywords: [
    'Guilherme Bertolo',
    'Software Engineer',
    'AI',
    'Next.js',
    'TypeScript',
    'React',
    'Portfolio',
  ],
  authors: [{ name: 'Guilherme Bertolo' }],
  openGraph: {
    title: 'Guilherme Bertolo | AI Engineer & Full-stack Developer',
    description:
      'Portfolio de Guilherme Bertolo - Engenheiro de Software e AI Engineer. Projetos com Next.js, TypeScript, Rust e AI Orchestration.',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://guilhermebertolo.com.br',
    images: [{ url: '/og', width: 1200, height: 630, alt: 'Guilherme Bertolo - AI Engineer & Full-stack Developer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guilherme Bertolo | AI Engineer & Full-stack Developer',
    description: 'Portfolio de Guilherme Bertolo - Engenheiro de Software e AI Engineer.',
    images: ['/og'],
  },
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
