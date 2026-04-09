'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect, useCallback } from 'react';

const ShaderGradientCanvas = dynamic(
  () => import('shadergradient').then((m) => ({ default: m.ShaderGradientCanvas })),
  { ssr: false }
);

const ShaderGradient = dynamic(
  () => import('shadergradient').then((m) => ({ default: m.ShaderGradient })),
  { ssr: false }
);

// Cores do shader por periodo do dia (acompanha o tema do site)
const THEME_COLORS: Record<string, { color1: string; color2: string; color3: string }> = {
  amanhecer: { color1: '#1a0a00', color2: '#5c3a1e', color3: '#0d0a08' },
  'manhã':   { color1: '#001a1f', color2: '#0e4a5c', color3: '#080a0d' },
  tarde:     { color1: '#0f172a', color2: '#1e3a5f', color3: '#0a0a0a' },
  entardecer:{ color1: '#1a0a20', color2: '#4a1e5c', color3: '#0a080d' },
  noite:     { color1: '#0a0c1a', color2: '#1e2050', color3: '#060810' },
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
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const [colors, setColors] = useState(THEME_COLORS[getThemeLabel()]);

  const updateColors = useCallback(() => {
    setColors(THEME_COLORS[getThemeLabel()]);
  }, []);

  useEffect(() => {
    const container = document.querySelector('[data-shader-bg]') as HTMLElement | null;
    // Espera o letter reveal terminar antes de montar o WebGL
    const mountTimer = setTimeout(() => setMounted(true), 800);
    const timer = setTimeout(() => setReady(true), 1500);

    // Esconde o shader quando a aba sai de foco e mostra suave ao voltar
    const hideShader = () => {
      if (!container) return;
      container.style.opacity = '0';
      container.style.transition = 'none';
    };
    const showShader = () => {
      if (!container) return;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          container.style.transition = 'opacity 1s ease';
          container.style.opacity = '0.6';
        });
      });
    };
    const handleVisibility = () => { document.hidden ? hideShader() : showShader(); };
    const handleBlur = () => hideShader();
    const handleFocus = () => showShader();
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    // Atualiza cores quando o tema muda
    updateColors();
    const interval = setInterval(updateColors, 300000); // a cada 5 min

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
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('force-theme', handleForceTheme);
    };
  }, [updateColors]);

  return (
    <div
      data-shader-bg
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -2,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        opacity: ready ? 0.6 : 0,
        transition: 'opacity 2s ease',
      }}
    >
      {mounted && <Suspense fallback={null}>
        <ShaderGradientCanvas
          style={{ width: '100%', height: '100%' }}
          pixelDensity={0.5}
          fov={45}
        >
          <ShaderGradient
            type="waterPlane"
            animate="on"
            uTime={0.2}
            uSpeed={0.03}
            uStrength={2.5}
            uDensity={1.5}
            uFrequency={3}
            cAzimuthAngle={180}
            cPolarAngle={80}
            cDistance={2.5}
            color1={colors.color1}
            color2={colors.color2}
            color3={colors.color3}
            grain="off"
          />
        </ShaderGradientCanvas>
      </Suspense>}
    </div>
  );
}
