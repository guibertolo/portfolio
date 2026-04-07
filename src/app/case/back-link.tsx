'use client';

import { useRouter } from 'next/navigation';

interface BackLinkProps {
  scrollTo?: string;
  label?: string;
}

export function BackLink({ scrollTo = 'projetos', label = 'Voltar aos projetos' }: BackLinkProps) {
  const router = useRouter();

  return (
    <a
      href={`/#${scrollTo}`}
      onClick={(e) => {
        e.preventDefault();
        // Navigate with scroll:false, then scroll manually after render
        router.push('/', { scroll: false });
        // Wait for page to render then scroll
        const poll = setInterval(() => {
          const el = document.getElementById(scrollTo);
          if (el) {
            clearInterval(poll);
            el.scrollIntoView({ behavior: 'auto', block: 'start' });
          }
        }, 50);
        // Safety: stop polling after 3s
        setTimeout(() => clearInterval(poll), 3000);
      }}
      style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--c-accent)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
    >
      <span>&#8592;</span> {label}
    </a>
  );
}
