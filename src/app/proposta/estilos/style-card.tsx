'use client';

import type { StyleDirection } from './styles-data';
import { DISCLAIMER_CUSTOMIZACAO } from './styles-data';
import { StyleMockup } from './style-mockup';

interface Props {
  style: StyleDirection;
  isExpanded: boolean;
  onToggle: () => void;
  onSelectStyle: () => void;
}

export function StyleCard({ style, isExpanded, onToggle, onSelectStyle }: Props) {
  const cardId = `style-${style.slug}`;
  const detailId = `${cardId}-detail`;

  return (
    <article
      style={{
        background: 'var(--c-bg-card)',
        border: '1px solid var(--c-border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease',
        borderColor: isExpanded ? 'color-mix(in srgb, var(--c-accent) 35%, transparent)' : 'var(--c-border)',
      }}
    >
      {/* Cabeca clicavel — sempre visivel */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={detailId}
        style={{
          background: 'transparent',
          border: 'none',
          padding: '1.5rem',
          width: '100%',
          textAlign: 'left',
          cursor: 'pointer',
          color: 'inherit',
          fontFamily: 'inherit',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        {/* Mockup */}
        <StyleMockup style={style} />

        {/* Nome + tagline */}
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '1rem',
              marginBottom: '0.5rem',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontWeight: 600,
                lineHeight: 1.15,
              }}
            >
              {style.nome}
            </h3>
            <span
              aria-hidden="true"
              style={{
                color: 'var(--c-accent)',
                fontSize: '1.5rem',
                fontWeight: 300,
                flexShrink: 0,
                transition: 'transform 0.3s ease',
                transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
                lineHeight: 1,
              }}
            >
              +
            </span>
          </div>

          <p
            style={{
              color: 'var(--c-text-secondary)',
              fontSize: '0.9rem',
              lineHeight: 1.55,
              marginBottom: '1rem',
            }}
          >
            {style.tagline}
          </p>

          {/* Chips de adjetivos */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {style.adjetivos.map((adj) => (
              <span
                key={adj}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  padding: '0.25rem 0.65rem',
                  background: 'var(--c-bg)',
                  border: '1px solid var(--c-border)',
                  borderRadius: '9999px',
                  color: 'var(--c-text-muted)',
                  letterSpacing: '0.05em',
                }}
              >
                {adj}
              </span>
            ))}
          </div>
        </div>
      </button>

      {/* Detalhe expandido — animacao via grid-template-rows */}
      <div
        id={detailId}
        style={{
          display: 'grid',
          gridTemplateRows: isExpanded ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <div
            style={{
              padding: '0 1.5rem 1.5rem',
              borderTop: '1px solid var(--c-border)',
              marginTop: '0.5rem',
              paddingTop: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            {/* Paleta */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--c-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  marginBottom: '0.75rem',
                }}
              >
                Paleta
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {[
                  { hex: style.paleta.bg, label: 'Bg' },
                  { hex: style.paleta.bgSecondary, label: 'Bg 2' },
                  { hex: style.paleta.text, label: 'Texto' },
                  { hex: style.paleta.textSecondary, label: 'Texto 2' },
                  { hex: style.paleta.accent, label: 'Acento' },
                ].map((c) => (
                  <div key={c.label} style={{ flex: '1 1 80px', minWidth: '80px' }}>
                    <div
                      style={{
                        background: c.hex,
                        height: '40px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--c-border)',
                        marginBottom: '0.4rem',
                      }}
                    />
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--c-text-muted)', textTransform: 'uppercase' }}>
                      {c.label}
                    </p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--c-text-secondary)' }}>
                      {c.hex.toUpperCase()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tipografia */}
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--c-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  marginBottom: '0.75rem',
                }}
              >
                Tipografia
              </p>
              <div
                style={{
                  background: 'var(--c-bg)',
                  border: '1px solid var(--c-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                <div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--c-text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Display · {style.fonts.display}
                  </p>
                  <p style={{ fontFamily: style.fonts.displayFamily, fontSize: '1.5rem', lineHeight: 1.1, color: 'var(--c-text)' }}>
                    Aa Bb Cc 123
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--c-text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Corpo · {style.fonts.corpo}
                  </p>
                  <p style={{ fontFamily: style.fonts.corpoFamily, fontSize: '0.95rem', lineHeight: 1.5, color: 'var(--c-text-secondary)' }}>
                    O texto longo do site usa esta família. Suficiente para parágrafos de áreas de atuação e blog.
                  </p>
                </div>
                {style.fonts.mono && (
                  <div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--c-text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Mono · {style.fonts.mono}
                    </p>
                    <p style={{ fontFamily: style.fonts.monoFamily, fontSize: '0.85rem', color: 'var(--c-text-secondary)' }}>
                      label: 0123 · TAG_EXEMPLO
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Tom de voz */}
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
                Tom de voz
              </p>
              <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                {style.tomDeVoz}
              </p>
            </div>

            {/* Funciona pra / Nao eh pra voce se */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--c-success)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
                  ✓ Funciona pra
                </p>
                <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.85rem', lineHeight: 1.55 }}>
                  {style.funcionaPara}
                </p>
              </div>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--c-accent)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>
                  ⚠ Não é pra você se
                </p>
                <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.85rem', lineHeight: 1.55 }}>
                  {style.naoEhPraVoceSe}
                </p>
              </div>
            </div>

            {/* Disclaimer fixo */}
            <p
              style={{
                fontSize: '0.75rem',
                color: 'var(--c-text-muted)',
                lineHeight: 1.6,
                fontStyle: 'italic',
                background: 'var(--c-bg)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px dashed var(--c-border)',
              }}
            >
              {DISCLAIMER_CUSTOMIZACAO}
            </p>

            {/* CTA — quero esta direcao */}
            <button
              type="button"
              onClick={onSelectStyle}
              className="btn-primary"
              style={{ alignSelf: 'flex-start', cursor: 'pointer', border: '1px solid color-mix(in srgb, var(--c-accent) 60%, transparent)' }}
            >
              Quero esta direção
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
