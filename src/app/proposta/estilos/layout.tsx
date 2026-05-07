import type { ReactNode } from 'react';

export default function EstilosLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Source+Serif+4:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Lora:wght@400;500&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Nunito:wght@400;600;700&family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&family=DM+Serif+Display:ital@0;1&display=swap"
      />
      {children}
    </>
  );
}
