'use client';

import { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Força topo imediatamente e trava scroll durante loading
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    const steps = [
      { target: 30, delay: 100 },
      { target: 60, delay: 300 },
      { target: 85, delay: 500 },
      { target: 100, delay: 800 },
    ];

    let timeout: ReturnType<typeof setTimeout>;

    steps.forEach(({ target, delay }) => {
      timeout = setTimeout(() => setProgress(target), delay);
    });

    // Start fade out
    timeout = setTimeout(() => setFading(true), 1200);

    // Remove from DOM and libera scroll
    timeout = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = '';
    }, 1800);

    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'var(--c-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.6s ease-out',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      {/* Name */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--c-text)', letterSpacing: '-0.02em' }}>
        <span style={{ color: 'var(--c-accent)' }}>{'{'}</span>
        {' GB '}
        <span style={{ color: 'var(--c-accent)' }}>{'}'}</span>
      </div>

      {/* Progress bar */}
      <div style={{ width: '200px', height: '2px', background: 'var(--c-border)', borderRadius: '1px', overflow: 'hidden' }}>
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: 'var(--c-accent)',
            borderRadius: '1px',
            transition: 'width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
      </div>

      {/* Status text */}
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--c-text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        {progress < 30 ? 'inicializando...' : progress < 60 ? 'carregando assets...' : progress < 100 ? 'renderizando...' : 'pronto'}
      </div>
    </div>
  );
}
