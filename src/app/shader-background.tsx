'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect, useCallback, useRef } from 'react';

const WaterShader = dynamic(() => import('./water-shader'), { ssr: false });

// Cores do shader por periodo do dia (acompanha o tema do site)
const THEME_COLORS: Record<string, { color1: string; color2: string; color3: string }> = {
  amanhecer: { color1: '#1a0a00', color2: '#5c3a1e', color3: '#0d0a08' },
  'manhã':   { color1: '#001a1f', color2: '#0e4a5c', color3: '#080a0d' },
  tarde:     { color1: '#0f172a', color2: '#1e3a5f', color3: '#0a0a0a' },
  entardecer:{ color1: '#1a0a20', color2: '#4a1e5c', color3: '#0a080d' },
  noite:     { color1: '#0a0820', color2: '#2a1a6a', color3: '#080412' },
};

function getThemeLabel(): string {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 8) return 'amanhecer';
  if (hour >= 8 && hour < 12) return 'manhã';
  if (hour >= 12 && hour < 17) return 'tarde';
  if (hour >= 17 && hour < 20) return 'entardecer';
  return 'noite';
}

export default function ShaderBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [colors, setColors] = useState(THEME_COLORS[getThemeLabel()]);

  const updateColors = useCallback(() => {
    setColors(THEME_COLORS[getThemeLabel()]);
  }, []);

  useEffect(() => {
    // Espera o letter reveal terminar antes de montar o WebGL
    const mountTimer = setTimeout(() => setMounted(true), 100);
    const timer = setTimeout(() => setReady(true), 300);

    // Esconde o shader quando a aba sai de foco e mostra suave ao voltar
    const hideShader = () => {
      const el = containerRef.current;
      if (!el) return;
      el.style.opacity = '0';
      el.style.transition = 'none';
    };
    const showShader = () => {
      const el = containerRef.current;
      if (!el) return;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = 'opacity 1s ease';
          el.style.opacity = '0.6';
        });
      });
    };
    const handleVisibility = () => { document.hidden ? hideShader() : showShader(); };
    document.addEventListener('visibilitychange', handleVisibility);

    // Dispatch scroll to shader — mesh moves internally to show different terrain
    const handleScroll = () => {
      window.dispatchEvent(new CustomEvent('shader-scroll', { detail: window.scrollY }));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Atualiza cores quando o tema muda
    updateColors();
    const interval = setInterval(updateColors, 60000);

    // Escuta mudanca forcada de tema (preview no feature toggles)
    const handleForceTheme = (e: Event) => {
      const hour = (e as CustomEvent).detail as number;
      let label = 'noite';
      if (hour >= 6 && hour < 8) label = 'amanhecer';
      else if (hour >= 8 && hour < 12) label = 'manhã';
      else if (hour >= 12 && hour < 17) label = 'tarde';
      else if (hour >= 17 && hour < 20) label = 'entardecer';
      setColors(THEME_COLORS[label]);
    };
    window.addEventListener('force-theme', handleForceTheme);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(timer);
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('force-theme', handleForceTheme);
    };
  }, [updateColors]);

  return (
    <div
      ref={containerRef}
      data-shader-bg
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        opacity: ready ? 0.6 : 0,
        transition: 'opacity 2s ease',
      }}
    >
      {mounted && <Suspense fallback={null}>
        <WaterShader
          color1={colors.color1}
          color2={colors.color2}
          color3={colors.color3}
        />
      </Suspense>}
    </div>
  );
}
