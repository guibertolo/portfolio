'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    // Parallax desativado — efeito imperceptivel no layout atual
    // const parallaxEls = document.querySelectorAll<HTMLElement>('[data-parallax-speed]');

    // Labels das secoes deslizam da esquerda
    const labels = document.querySelectorAll<HTMLElement>('.section-label');
    labels.forEach((label) => {
      gsap.fromTo(
        label,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: label,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Titulos das secoes sobem suavemente
    const sectionTitles = document.querySelectorAll<HTMLElement>('.section-title');
    sectionTitles.forEach((title) => {
      gsap.fromTo(
        title,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Cards aparecem em sequencia
    // Remove a classe 'reveal' dos cards pra evitar conflito com o observer CSS
    const cardGroups = document.querySelectorAll<HTMLElement>('.projects-masonry, #stack > div:last-child, #processo > div:last-child, #sobre > div:last-child');
    cardGroups.forEach((group) => {
      const cards = group.querySelectorAll<HTMLElement>('.card-glass');
      cards.forEach((card) => {
        card.classList.remove('reveal');
        card.classList.remove('revealed');
      });
      gsap.set(cards, { opacity: 0, y: 50 });
      const isProjects = group.classList.contains('projects-masonry');
      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: isProjects ? 0.9 : 0.7,
        stagger: isProjects ? 0.3 : 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: group,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
