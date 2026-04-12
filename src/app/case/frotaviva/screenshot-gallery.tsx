'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Screenshot {
  src: string;
  label: string;
}

interface ScreenshotGalleryProps {
  screenshots: Screenshot[];
}

export function ScreenshotGallery({ screenshots }: ScreenshotGalleryProps) {
  const [active, setActive] = useState<number | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (active === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') setActive((prev) => (prev !== null && prev < screenshots.length - 1 ? prev + 1 : prev));
      if (e.key === 'ArrowLeft') setActive((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
      if (e.key === 'Tab') {
        const container = lightboxRef.current;
        if (!container) return;
        const focusable = container.querySelectorAll<HTMLElement>('button');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    // Focus the close button on open
    requestAnimationFrame(() => {
      lightboxRef.current?.querySelector<HTMLElement>('button')?.focus();
    });
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [active, close, screenshots.length]);

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {screenshots.map((s, i) => (
          <button
            key={s.label}
            type="button"
            onClick={() => setActive(i)}
            style={{
              background: 'var(--c-bg-card)',
              border: '1px solid var(--c-border)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              cursor: 'zoom-in',
              padding: 0,
              textAlign: 'left',
              transition: 'border-color 0.2s',
            }}
          >
            <Image
              src={s.src}
              alt={s.label}
              width={600}
              height={340}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--c-border)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--c-text-secondary)' }}>
                {s.label}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label="Visualizar screenshot"
          onClick={close}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out',
            padding: '2rem',
          }}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={close}
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '1.5rem',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              cursor: 'pointer',
              lineHeight: 1,
              padding: '0.5rem',
            }}
            aria-label="Fechar"
          >
            &times;
          </button>

          {/* Nav arrows */}
          {active > 0 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setActive(active - 1); }}
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Anterior"
            >
              &#8592;
            </button>
          )}
          {active < screenshots.length - 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setActive(active + 1); }}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer',
                borderRadius: '50%',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Próximo"
            >
              &#8594;
            </button>
          )}

          {/* Image */}
          <div onClick={(e) => e.stopPropagation()} style={{ cursor: 'default', maxWidth: '90vw', maxHeight: '85vh' }}>
            <Image
              src={screenshots[active].src}
              alt={screenshots[active].label}
              width={1400}
              height={800}
              style={{ maxWidth: '90vw', maxHeight: '80vh', width: 'auto', height: 'auto', borderRadius: 'var(--radius-xs)', objectFit: 'contain' }}
            />
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginTop: '1rem' }}>
              {screenshots[active].label} — {active + 1}/{screenshots.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
