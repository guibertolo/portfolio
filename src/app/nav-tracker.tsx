'use client';

import { useEffect } from 'react';

const SECTION_IDS = ['sobre', 'projetos', 'processo', 'experiencia', 'contato'];

export default function NavTracker() {
  useEffect(() => {
    const nav = document.querySelector('.floating-nav');
    if (!nav) return;

    const links = nav.querySelectorAll<HTMLAnchorElement>('.nav-link, .nav-cta');
    const linkMap = new Map<string, HTMLAnchorElement>();
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (href?.startsWith('#')) linkMap.set(href.slice(1), link);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = linkMap.get(entry.target.id);
          if (!link) return;
          if (entry.isIntersecting) {
            links.forEach((l) => l.classList.remove('active'));
            link.classList.add('active');
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
