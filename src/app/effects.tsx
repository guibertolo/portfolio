'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// ===== THEME BY TIME OF DAY =====
// Temas inativos (guardados pra reativar depois):
// - Amanhecer (amber/red): accent #f59e0b, gradient-mid #ef4444
// - Emerald (green/teal): accent #10b981, gradient-mid #14b8a6

const THEMES = {
  manha: {
    '--theme-bg': '#080a0d',
    '--theme-accent': '#06b6d4',
    '--theme-accent-hover': '#22d3ee',
    '--theme-gradient-mid': '#10b981',
    '--theme-glow': 'rgba(6, 182, 212, 0.12)',
    '--theme-bg-card': 'rgba(6, 182, 212, 0.04)',
    '--theme-bg-card-hover': 'rgba(6, 182, 212, 0.08)',
    '--theme-bg-card-featured': 'rgba(6, 182, 212, 0.055)',
    '--theme-border': 'rgba(6, 182, 212, 0.08)',
    label: 'manhã',
  },
  tarde: {
    '--theme-bg': '#0a080d',
    '--theme-accent': '#a855f7',
    '--theme-accent-hover': '#c084fc',
    '--theme-gradient-mid': '#ec4899',
    '--theme-glow': 'rgba(168, 85, 247, 0.12)',
    '--theme-bg-card': 'rgba(168, 85, 247, 0.04)',
    '--theme-bg-card-hover': 'rgba(168, 85, 247, 0.08)',
    '--theme-bg-card-featured': 'rgba(168, 85, 247, 0.055)',
    '--theme-border': 'rgba(168, 85, 247, 0.08)',
    label: 'tarde',
  },
  noite: {
    '--theme-bg': '#0a0608',
    '--theme-accent': '#e11d48',
    '--theme-accent-hover': '#fb7185',
    '--theme-gradient-mid': '#be123c',
    '--theme-glow': 'rgba(225, 29, 72, 0.12)',
    '--theme-bg-card': 'rgba(225, 29, 72, 0.04)',
    '--theme-bg-card-hover': 'rgba(225, 29, 72, 0.08)',
    '--theme-bg-card-featured': 'rgba(225, 29, 72, 0.055)',
    '--theme-border': 'rgba(225, 29, 72, 0.08)',
    label: 'noite',
  },
};

function getTimeTheme() {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) return THEMES.manha;
  if (hour >= 12 && hour < 22) return THEMES.tarde;
  return THEMES.noite;
}

// ===== SOUND ENGINE =====
class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled = false;

  private getCtx() {
    if (!this.ctx) this.ctx = new AudioContext();
    return this.ctx;
  }

  playHover() {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.1);
  }

  playClick() {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  }

  playNav() {
    if (!this.enabled) return;
    const ctx = this.getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.025, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  }
}

const sound = new SoundEngine();

// ===== SOUND TOGGLE BUTTON =====
function SoundToggle() {
  const [on, setOn] = useState(false);

  const toggle = () => {
    const next = !on;
    setOn(next);
    sound.enabled = next;
    if (next) sound.playNav();
  };

  return (
    <button
      className="fixed-sound-btn"
      onClick={toggle}
      aria-label={on ? 'Desativar som' : 'Ativar som'}
      style={{
        position: 'fixed',
        top: '1.5rem',
        right: '1.5rem',
        zIndex: 50,
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '1px solid var(--c-border)',
        background: on ? 'var(--c-bg-card-hover)' : 'var(--c-bg-card)',
        color: on ? 'var(--c-accent)' : 'var(--c-text-muted)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1rem',
        transition: 'all 0.3s',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <span aria-hidden="true" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px' }}>
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" fill="currentColor" />
          <circle cx="18" cy="16" r="3" fill="currentColor" />
        </svg>
        {!on && (
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" style={{ position: 'absolute', inset: 0, margin: 'auto' }}>
            <line x1="4" y1="4" x2="20" y2="20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        )}
      </span>
    </button>
  );
}

// ===== TIME BADGE =====
function TimeBadge({ label }: { label: string }) {
  return (
    <div
      className="fixed-time-badge"
      style={{
        position: 'fixed',
        top: '1.5rem',
        right: '4.5rem',
        zIndex: 50,
        padding: '0.375rem 0.75rem',
        borderRadius: '9999px',
        border: '1px solid var(--c-border)',
        background: 'var(--c-bg-card)',
        color: 'var(--c-text-muted)',
        fontSize: '0.6rem',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}
    >
      {label}
    </div>
  );
}

// ===== MAIN EFFECTS COMPONENT =====
export default function Effects() {
  const [timeLabel, setTimeLabel] = useState('');
  const pathname = usePathname();

  // Re-reveal elements when navigating back to home.
  // The main Effects useEffect runs once at layout mount, so on SPA
  // navigation back to "/" the NEW .reveal nodes created by React have
  // no IntersectionObserver attached. Without a fresh observer, anything
  // below the fold stays stuck at CSS opacity:0 forever.
  useEffect(() => {
    if (pathname !== '/') return;

    let observer: IntersectionObserver | null = null;
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay;
            if (delay) el.style.transitionDelay = `${delay}s`;
            el.classList.add('revealed');
            observer?.unobserve(el);
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px 0px 0px' }
      );

      document.querySelectorAll<HTMLElement>('.reveal:not(.revealed)').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 200 && rect.bottom > -200) {
          // Already (nearly) visible: reveal immediately.
          const delay = el.dataset.delay;
          if (delay) el.style.transitionDelay = `${delay}s`;
          el.classList.add('revealed');
        } else {
          // Below the fold: attach observer so it reveals as user scrolls.
          observer?.observe(el);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, [pathname]);

  // Restore scroll target set by back-link from case studies.
  // Uses MutationObserver + retries to handle heavy pages whose hero
  // sections (and #projetos) only appear in the DOM after the router
  // finishes hydrating the home page.
  useEffect(() => {
    if (pathname !== '/') return;
    let target: string | null = null;
    try {
      target = sessionStorage.getItem('portfolio-scroll-target');
    } catch {
      target = null;
    }
    if (!target) return;
    try { sessionStorage.removeItem('portfolio-scroll-target'); } catch {}

    const targetId = target;
    const scrollToTarget = () => {
      const el = document.getElementById(targetId);
      if (!el) return false;
      el.scrollIntoView({ behavior: 'auto', block: 'start' });
      return true;
    };

    // Try immediately in case the element is already in the DOM.
    const found = scrollToTarget();

    // Observe DOM for the element if it is not there yet.
    let observer: MutationObserver | null = null;
    if (!found) {
      observer = new MutationObserver(() => {
        if (scrollToTarget()) observer?.disconnect();
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }

    // Re-scroll a few times after mount to fight late reflows
    // (images loading, fonts swapping, GSAP resetting cards, etc).
    const retryTimers = [60, 180, 360, 600, 1000].map((ms) =>
      setTimeout(scrollToTarget, ms)
    );

    // Safety: stop observing after 5s no matter what.
    const safety = setTimeout(() => observer?.disconnect(), 5000);

    return () => {
      observer?.disconnect();
      retryTimers.forEach(clearTimeout);
      clearTimeout(safety);
    };
  }, [pathname]);

  useEffect(() => {
    // Forward declaration: handleShake is assigned further down (it depends
    // on triggerMatrixRain). We need the reference available earlier because
    // activateMotionSensors registers the listener before reaching its body.
    let handleShake: ((e: DeviceMotionEvent) => void) | undefined;
    const onDeviceMotion = (e: DeviceMotionEvent) => handleShake?.(e);

    // ===== TIME THEME =====
    // Theme transition overlay for smooth color change
    let transitionOverlay: HTMLElement | null = null;
    const applyTheme = (overrideHour?: number, animate = false) => {
      const origGetHours = Date.prototype.getHours;
      if (overrideHour !== undefined) Date.prototype.getHours = () => overrideHour;
      const theme = getTimeTheme();
      if (overrideHour !== undefined) Date.prototype.getHours = origGetHours;
      setTimeLabel(theme.label);
      const root = document.documentElement;

      if (animate) {
        // Fade overlay with new bg color
        if (!transitionOverlay) {
          transitionOverlay = document.createElement('div');
          transitionOverlay.id = 'theme-transition';
          transitionOverlay.style.cssText = 'position:fixed;inset:0;z-index:9997;pointer-events:none;opacity:0;transition:opacity 1.5s ease;';
          document.body.appendChild(transitionOverlay);
        }
        const newBg = theme['--theme-bg'] ?? '#0a0a0a';
        transitionOverlay.style.background = newBg;
        transitionOverlay.style.opacity = '0.6';
        setTimeout(() => {
          Object.entries(theme).forEach(([key, value]) => {
            if (key.startsWith('--')) root.style.setProperty(key, value);
          });
          setTimeout(() => {
            if (transitionOverlay) transitionOverlay.style.opacity = '0';
          }, 200);
        }, 800);
      } else {
        Object.entries(theme).forEach(([key, value]) => {
          if (key.startsWith('--')) root.style.setProperty(key, value);
        });
      }
    };
    applyTheme();

    // Check for theme change every minute
    let currentThemeLabel = getTimeTheme().label;
    const themeCheckInterval = setInterval(() => {
      const newLabel = getTimeTheme().label;
      if (newLabel !== currentThemeLabel) {
        currentThemeLabel = newLabel;
        applyTheme(undefined, true);
      }
    }, 60000); // 1 minuto

    // Listen for theme preview changes
    const handleForceTheme = (e: Event) => {
      const hour = (e as CustomEvent).detail as number;
      applyTheme(hour, true);
    };
    window.addEventListener('force-theme', handleForceTheme);

    // ===== SCROLL REVEAL WITH STAGGER =====
    // Detect if this is a back-navigation (page already visited)
    const isRevisit = sessionStorage.getItem('portfolio-visited') === '1';
    sessionStorage.setItem('portfolio-visited', '1');

    // On revisit (back button): fast animations (2x speed, less stagger)
    if (isRevisit) {
      document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
        el.style.transitionDuration = '0.25s';
        el.style.transitionDelay = '0s';
        el.classList.add('revealed');
      });
    }

    // JS-driven split animation — triggered by scroll handler, no observers
    const animateSplitChars = (titleEl: HTMLElement) => {
      if (titleEl.dataset.splitAnimated === '1') return;
      titleEl.dataset.splitAnimated = '1';
      const chars = titleEl.querySelectorAll<HTMLElement>('.split-char');
      const count = chars.length;
      // Normalize: all titles animate in ~500ms regardless of char count
      const perChar = count > 0 ? Math.max(8, Math.min(35, 500 / count)) : 20;
      chars.forEach((char, i) => {
        setTimeout(() => {
          char.style.opacity = '1';
          char.style.transform = 'translateY(0)';
        }, i * perChar);
      });
    };

    // No observer needed — scroll handler checks visibility directly
    const activateSplitsInReveal = (_revealEl: HTMLElement) => {
      // noop — scroll handler handles everything
    };

    const showObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            if (isRevisit) {
              // Gentle fade on revisit with mini stagger
              const idx = Array.from(document.querySelectorAll('.reveal')).indexOf(el);
              el.style.transitionDelay = `${idx * 0.05}s`;
              el.style.transitionDuration = '0.6s';
              el.classList.add('revealed');
            } else {
              const delay = el.dataset.delay;
              if (delay) el.style.transitionDelay = `${delay}s`;
              el.classList.add('revealed');
            }
            // Directly activate split titles inside this revealed element
            activateSplitsInReveal(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px 0px 0px' }
    );

    // Assign stagger delays to sibling .reveal elements
    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      const reveals = section.querySelectorAll<HTMLElement>(':scope > div > .reveal, :scope > .reveal');
      reveals.forEach((el, i) => {
        if (!el.dataset.delay) {
          el.dataset.delay = String(i * 0.15);
        }
      });
    });

    document.querySelectorAll('.reveal').forEach((el) => {
      showObserver.observe(el);
    });

    // Immediately reveal elements already in viewport (e.g. after back navigation)
    requestAnimationFrame(() => {
      document.querySelectorAll('.reveal:not(.revealed)').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const htmlEl = el as HTMLElement;
          const delay = htmlEl.dataset.delay;
          if (delay) htmlEl.style.transitionDelay = `${delay}s`;
          el.classList.add('revealed');
          activateSplitsInReveal(htmlEl);
        }
      });
    });

    // ===== HAPTIC FEEDBACK =====
    const haptic = {
      light: () => navigator.vibrate?.(10),
      medium: () => navigator.vibrate?.(25),
      success: () => navigator.vibrate?.([10, 50, 10]),
    };

    // ===== MAGNETIC CARDS + GYROSCOPE TILT =====
    const magneticCards = document.querySelectorAll<HTMLElement>('.magnetic-card');
    const magneticHandlers = new Map<HTMLElement, { move: (e: MouseEvent) => void; leave: () => void }>();
    const isTouchDevice = 'ontouchstart' in window;

    if (isTouchDevice) {
      // Mobile: gyroscope tilt for all cards
      let gyroPermissionGranted = false;
      const handleOrientation = (e: DeviceOrientationEvent) => {
        if (!gyroPermissionGranted) return;
        const gamma = Math.min(Math.max((e.gamma ?? 0) / 30, -1), 1);
        const beta = Math.min(Math.max(((e.beta ?? 0) - 45) / 30, -1), 1);
        magneticCards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            card.style.transform = `perspective(800px) rotateY(${gamma * 6}deg) rotateX(${beta * -6}deg)`;
          }
        });
      };

      const activateMotionSensors = () => {
        gyroPermissionGranted = true;
        window.addEventListener('deviceorientation', handleOrientation, { passive: true });
        window.addEventListener('devicemotion', onDeviceMotion, { passive: true });
        localStorage.setItem('motion-granted', '1');
      };

      // Check if iOS needs permission
      const DOE = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
      const needsPermission = typeof DOE.requestPermission === 'function';

      if (needsPermission) {
        // iOS: check if already granted
        if (localStorage.getItem('motion-granted') === '1') {
          // Try to re-request silently (iOS remembers)
          DOE.requestPermission!().then((perm) => {
            if (perm === 'granted') activateMotionSensors();
          }).catch(() => {});
        }

        // Show permission button for iOS
        if (!localStorage.getItem('motion-granted')) {
          const permBtn = document.createElement('button');
          permBtn.id = 'ios-motion-btn';
          permBtn.textContent = 'Ativar efeito 3D';
          permBtn.style.cssText = 'position:fixed;bottom:5.5rem;left:50%;transform:translateX(-50%);z-index:55;padding:0.5rem 1.25rem;border-radius:9999px;border:1px solid var(--c-accent);background:rgba(10,10,10,0.9);backdrop-filter:blur(12px);color:var(--c-accent);font-size:0.65rem;font-family:var(--font-mono);cursor:pointer;letter-spacing:0.05em;box-shadow:0 0 15px rgba(59,130,246,0.3),0 0 30px rgba(59,130,246,0.15);animation:glowPulse 2s ease-in-out infinite;';
          permBtn.addEventListener('click', async () => {
            const perm = await DOE.requestPermission!();
            if (perm === 'granted') {
              activateMotionSensors();
              permBtn.remove();
            }
          });
          document.body.appendChild(permBtn);
        }
      } else {
        // Android: auto-enable
        activateMotionSensors();
      }

      // Haptic on card tap
      magneticCards.forEach((card) => {
        card.addEventListener('touchstart', () => haptic.light(), { passive: true });
      });
    } else {
      // Desktop: mouse tilt with edge smoothing
      magneticCards.forEach((card) => {
        let leaveTimer: ReturnType<typeof setTimeout> | undefined;
        const move = (e: MouseEvent) => {
          clearTimeout(leaveTimer);
          const rect = card.getBoundingClientRect();
          // Clamp to inner 90% to avoid edge jitter
          const rawX = (e.clientX - rect.left) / rect.width;
          const rawY = (e.clientY - rect.top) / rect.height;
          const x = (Math.max(0.05, Math.min(0.95, rawX)) - 0.5) * 2;
          const y = (Math.max(0.05, Math.min(0.95, rawY)) - 0.5) * 2;
          card.style.transition = 'transform 0.1s ease-out, background 0.3s, border-color 0.3s';
          card.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`;
        };
        const leave = () => {
          leaveTimer = setTimeout(() => {
            card.style.transition = 'transform 0.4s ease-out, background 0.3s, border-color 0.3s';
            card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
          }, 50);
        };
        card.addEventListener('mousemove', move);
        card.addEventListener('mouseleave', leave);
        magneticHandlers.set(card, { move, leave });
      });
    }

    // Haptic on buttons/links tap (mobile only)
    if (isTouchDevice) {
      const hapticTargets = document.querySelectorAll('a, button');
      hapticTargets.forEach((el) => {
        el.addEventListener('touchstart', () => haptic.light(), { passive: true });
      });
    }

    // ===== SPLIT TEXT REVEAL ON SECTION TITLES =====
    const splitTitles = document.querySelectorAll<HTMLElement>('.section-title:not(.no-split)');
    splitTitles.forEach((title) => {
      // Skip if already processed
      if (title.dataset.splitDone === '1') return;
      title.dataset.splitDone = '1';

      // Walk child nodes and wrap text characters in spans
      const fragment = document.createDocumentFragment();
      let charIndex = 0;

      const processNode = (node: Node): Node[] => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent ?? '';
          const result: Node[] = [];
          // Split by spaces to group chars by word (prevents mid-word line breaks)
          const words = text.split(/( )/);
          for (const segment of words) {
            if (segment === ' ') {
              const span = document.createElement('span');
              span.className = 'split-char split-char-space';
              span.innerHTML = '&nbsp;';
              span.style.transitionDelay = `${charIndex * 20}ms`;
              charIndex++;
              result.push(span);
            } else if (segment.length > 0) {
              // Wrap word chars in a nowrap container to prevent mid-word breaks
              const wordWrap = document.createElement('span');
              wordWrap.style.whiteSpace = 'nowrap';
              wordWrap.style.display = 'inline';
              for (const char of segment) {
                const span = document.createElement('span');
                span.className = 'split-char';
                span.textContent = char;
                span.style.transitionDelay = `${charIndex * 20}ms`;
                charIndex++;
                wordWrap.appendChild(span);
              }
              result.push(wordWrap);
            }
          }
          return result;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          // Preserve gradient-text spans — wrap their text content too
          const clone = el.cloneNode(false) as HTMLElement;
          if (clone.classList.contains('gradient-text')) {
            clone.classList.add('gradient-text-split');
          }
          const children = Array.from(el.childNodes);
          children.forEach((child) => {
            const processed = processNode(child);
            processed.forEach((n) => clone.appendChild(n));
          });
          return [clone];
        }
        return [node.cloneNode(true)];
      };

      const children = Array.from(title.childNodes);
      children.forEach((child) => {
        const processed = processNode(child);
        processed.forEach((n) => fragment.appendChild(n));
      });

      title.innerHTML = '';
      title.appendChild(fragment);
      title.classList.add('split-reveal');
    });

    // Split activation handled by scroll handler — no observers needed
    // Also trigger for titles already in viewport at load
    requestAnimationFrame(() => {
      sectionTitles.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
          const parentReveal = el.closest('.reveal');
          if (!parentReveal || parentReveal.classList.contains('revealed')) {
            animateSplitChars(el);
          }
        }
      });
    });

    // ===== MULTI-LAYER PARALLAX + CONTINUOUS SCROLL EFFECTS =====
    const parallaxEls = document.querySelectorAll<HTMLElement>('[data-parallax]');
    const multiParallaxEls = document.querySelectorAll<HTMLElement>('[data-parallax-speed]');
    const sectionTitles = document.querySelectorAll<HTMLElement>('.section-title');
    const allCards = document.querySelectorAll<HTMLElement>('.card-glass');

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Legacy parallax (backward compat)
      parallaxEls.forEach((el) => {
        // If element also has data-parallax-speed, skip legacy — handled below
        if (el.dataset.parallaxSpeed) return;
        const speed = parseFloat(el.dataset.parallax ?? '0.5');
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });

      // Multi-layer parallax: different speeds per element create depth
      multiParallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallaxSpeed ?? '0');
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });

      // Section titles subtle horizontal shift + split text activation
      sectionTitles.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const shift = (progress - 0.5) * 10;
        el.style.transform = `translateX(${shift}px)`;

        // Activate split text when title is 70% up from bottom of viewport
        if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
          const parentReveal = el.closest('.reveal');
          if (!parentReveal || parentReveal.classList.contains('revealed')) {
            animateSplitChars(el);
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Custom cursor removed — cleaner UX per round table feedback

    // ===== SOUND ON HOVER/CLICK =====
    const soundHoverTargets = document.querySelectorAll('.card-glass, .tech-tag, .nav-link, .btn-primary, .btn-outline');
    const soundClickTargets = document.querySelectorAll('a, button');

    const onHoverSound = () => sound.playHover();
    const onClickSound = () => sound.playClick();

    soundHoverTargets.forEach((el) => el.addEventListener('mouseenter', onHoverSound));
    soundClickTargets.forEach((el) => el.addEventListener('click', onClickSound));

    // Nav links get special sound
    const navLinks = document.querySelectorAll('.nav-link');
    const onNavSound = () => sound.playNav();
    navLinks.forEach((el) => el.addEventListener('click', onNavSound));

    // ===== TYPING EFFECT =====
    const typeEl = document.querySelector<HTMLElement>('.typing-text');
    let typeInterval: ReturnType<typeof setInterval> | undefined;
    if (typeEl) {
      const text = typeEl.dataset.text ?? '';
      if (isRevisit) {
        // Show full text immediately on revisit
        typeEl.textContent = text;
      } else {
        typeEl.textContent = '';
        let i = 0;
        typeInterval = setInterval(() => {
          if (i < text.length) {
            typeEl.textContent += text[i];
            i++;
          } else {
            clearInterval(typeInterval);
          }
        }, 50);
      }
    }

    // ===== LIVE CLOCK =====
    const clockEl = document.querySelector<HTMLElement>('.live-clock');
    const dateEl = document.querySelector<HTMLElement>('.live-date');
    const updateClock = () => {
      const now = new Date();
      if (clockEl) clockEl.textContent = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      if (dateEl) dateEl.textContent = now.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'short' });
    };
    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    // ===== ANIMATED COUNTERS =====
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          if (el.dataset.counted === '1') return;
          el.dataset.counted = '1';

          const target = el.dataset.target ?? '0';
          const isPlus = target.includes('+');
          const num = parseInt(target.replace('+', ''), 10);
          const duration = 1500;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const current = Math.round(eased * num);
            el.textContent = `${current}${isPlus ? '+' : ''}`;
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('[data-target]').forEach((el) => counterObserver.observe(el));

    // ===== BACK TO TOP =====
    const backToTop = document.createElement('button');
    backToTop.id = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Voltar ao topo');
    backToTop.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';
    backToTop.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);z-index:50;width:44px;height:44px;border-radius:var(--radius-full);border:1px solid var(--c-border);background:rgba(10,10,10,0.85);backdrop-filter:blur(16px);color:var(--c-accent);cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transition:opacity 0.3s ease;';
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      haptic.light();
    });
    document.body.appendChild(backToTop);

    const floatingNav = document.querySelector<HTMLElement>('.floating-nav');
    const footerEl = document.querySelector('footer');
    if (footerEl) {
      const footerObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const isMobile = window.innerWidth <= 768;
            if (entry.isIntersecting) {
              backToTop.style.opacity = '1';
              backToTop.style.pointerEvents = 'auto';
              if (isMobile && floatingNav) {
                floatingNav.style.opacity = '0';
                floatingNav.style.pointerEvents = 'none';
              }
            } else {
              backToTop.style.opacity = '0';
              backToTop.style.pointerEvents = 'none';
              if (isMobile && floatingNav) {
                floatingNav.style.opacity = '1';
                floatingNav.style.pointerEvents = 'auto';
              }
            }
          });
        },
        { threshold: 0.1 }
      );
      footerObserver.observe(footerEl);
    }

    // ===== SMOOTH SCROLL NAV =====
    const scrollNavLinks = document.querySelectorAll('.nav-link');
    const handleNavClick = (e: Event) => {
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    scrollNavLinks.forEach((link) => link.addEventListener('click', handleNavClick));

    // ===== MATRIX RAIN (shared easter egg effect) =====
    const triggerMatrixRain = () => {
      if (document.getElementById('matrix-rain')) return;
      haptic.success();
      const canvas = document.createElement('canvas');
      canvas.id = 'matrix-rain';
      canvas.style.cssText = 'position:fixed;inset:0;z-index:9999;pointer-events:none;opacity:0;transition:opacity 1s;';
      document.body.appendChild(canvas);
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      requestAnimationFrame(() => { canvas.style.opacity = '1'; });

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const chars = 'GUILHERME BERTOLO AI ENGINEER 01アイウエオカキクケコ';
      const fontSize = 14;
      const columns = Math.floor(canvas.width / fontSize);
      const drops: number[] = Array(columns).fill(1);

      const drawMatrix = () => {
        if (!document.getElementById('matrix-rain')) return;
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#22c55e';
        ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

        for (let i = 0; i < drops.length; i++) {
          const char = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(char, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
        requestAnimationFrame(drawMatrix);
      };
      drawMatrix();

      setTimeout(() => {
        canvas.style.opacity = '0';
        setTimeout(() => canvas.remove(), 1000);
      }, 5000);
    };

    // ===== EASTER EGG — 5x click on hero name =====
    const heroH1 = document.getElementById('hero-name');
    let heroClicks = 0;
    let heroClickTimer: ReturnType<typeof setTimeout> | undefined;
    let easterEggUsed = false;
    const handleHeroClick = () => {
      heroClicks++;
      clearTimeout(heroClickTimer);
      if (heroClicks >= 3) {
        heroClicks = 0;
        easterEggUsed = true;
        triggerMatrixRain();
      }
      heroClickTimer = setTimeout(() => { heroClicks = 0; }, 2000);
    };
    heroH1?.addEventListener('click', handleHeroClick);

    // Hint tooltip after hovering hero name for 2s
    let hintTimer: ReturnType<typeof setTimeout> | undefined;
    const showHint = () => {
      if (easterEggUsed) return;
      hintTimer = setTimeout(() => {
        if (easterEggUsed) return;
        document.getElementById('hero-hint')?.remove();
        const hint = document.createElement('div');
        hint.id = 'hero-hint';
        hint.textContent = 'clique 3x';
        hint.style.cssText = 'display:block;margin-top:0.75rem;font-family:var(--font-mono);font-size:0.6rem;color:var(--c-text-muted);opacity:0;transition:opacity 0.6s;pointer-events:none;letter-spacing:0.15em;font-weight:400;';
        heroH1?.appendChild(hint);
        requestAnimationFrame(() => { hint.style.opacity = '0.5'; });
        setTimeout(() => {
          hint.style.opacity = '0';
          setTimeout(() => hint.remove(), 600);
        }, 3000);
      }, 2000);
    };
    const hideHint = () => { clearTimeout(hintTimer); };
    heroH1?.addEventListener('mouseenter', showHint);
    heroH1?.addEventListener('mouseleave', hideHint);

    // Expose triggerMatrixRain for terminal mode
    (window as unknown as Record<string, unknown>).__triggerMatrixRain = triggerMatrixRain;

    // ===== SHAKE TO EASTER EGG (mobile) =====
    let lastShakeX = 0, lastShakeY = 0, lastShakeZ = 0;
    let shakeCount = 0;
    let lastShakeTime = 0;
    handleShake = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc || acc.x == null || acc.y == null || acc.z == null) return;

      const dx = Math.abs(acc.x - lastShakeX);
      const dy = Math.abs(acc.y - lastShakeY);
      const dz = Math.abs(acc.z - lastShakeZ);

      if (dx + dy + dz > 30) {
        const now = Date.now();
        if (now - lastShakeTime > 400) {
          shakeCount++;
          lastShakeTime = now;
          if (shakeCount >= 3) {
            triggerMatrixRain();
            shakeCount = 0;
          }
        }
      }

      // Reset shake count after 2 seconds of no shaking
      if (Date.now() - lastShakeTime > 2000) shakeCount = 0;

      lastShakeX = acc.x;
      lastShakeY = acc.y;
      lastShakeZ = acc.z;
    };
    // Shake listener added via activateMotionSensors (mobile) or here (desktop skip)

    // Pull-to-reveal removed — conflicts with native browser refresh gesture

    // ===== CLEANUP =====
    return () => {
      showObserver.disconnect();
      // split activation via scroll handler — no observer to disconnect
      // hideObserver removed — reveal stays permanent
      magneticHandlers.forEach(({ move, leave }, card) => {
        card.removeEventListener('mousemove', move);
        card.removeEventListener('mouseleave', leave);
      });
      window.removeEventListener('scroll', handleScroll);
      // cursor cleanup removed
      soundHoverTargets.forEach((el) => el.removeEventListener('mouseenter', onHoverSound));
      soundClickTargets.forEach((el) => el.removeEventListener('click', onClickSound));
      navLinks.forEach((el) => el.removeEventListener('click', onNavSound));
      if (typeInterval) clearInterval(typeInterval);
      clearInterval(clockInterval);
      counterObserver.disconnect();
      scrollNavLinks.forEach((link) => link.removeEventListener('click', handleNavClick));
      heroH1?.removeEventListener('click', handleHeroClick);
      heroH1?.removeEventListener('mouseenter', showHint);
      heroH1?.removeEventListener('mouseleave', hideHint);
      document.getElementById('hero-hint')?.remove();
      window.removeEventListener('devicemotion', onDeviceMotion);
      document.getElementById('pull-reveal')?.remove();
      document.getElementById('ios-motion-btn')?.remove();
      document.getElementById('back-to-top')?.remove();
      window.removeEventListener('force-theme', handleForceTheme);
      clearInterval(themeCheckInterval);
      document.getElementById('theme-transition')?.remove();
    };
  }, []);

  return (
    <>
      <SoundToggle />
      {timeLabel && <TimeBadge label={timeLabel} />}
    </>
  );
}
