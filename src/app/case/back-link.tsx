'use client';

import { useRouter } from 'next/navigation';

interface BackLinkProps {
  scrollTo?: string;
  label?: string;
}

export function BackLink({ scrollTo = 'projetos', label = 'Voltar aos projetos' }: BackLinkProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Stash target so the home page can pick it up after hydration.
    // This survives heavy pages (like FrotaViva case) where requestAnimationFrame
    // retries are not enough before the `#projetos` element exists in the DOM.
    try {
      sessionStorage.setItem('portfolio-scroll-target', scrollTo);
    } catch {
      // sessionStorage unavailable — fall back to hash navigation
    }
    router.push('/', { scroll: false });
  };

  return (
    <a
      href={`/#${scrollTo}`}
      onClick={handleClick}
      style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--c-accent)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
    >
      <span>&#8592;</span> {label}
    </a>
  );
}
