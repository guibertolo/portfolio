import type { StyleDirection } from './styles-data';

interface Props {
  style: StyleDirection;
  /** Nome ficticio do escritorio mostrado no mockup */
  escritorio?: string;
}

/**
 * Mini-mockup de hero por direcao. Renderiza CSS puro com tokens locais
 * via inline style. Server-friendly, stateless. Sem imagem, so tipografia
 * + paleta + um CTA falso.
 */
export function StyleMockup({ style, escritorio = 'Ramos & Associados' }: Props) {
  const { paleta, fonts } = style;

  return (
    <div
      style={{
        background: paleta.bg,
        color: paleta.text,
        fontFamily: fonts.corpoFamily,
        borderRadius: '8px',
        padding: '1.5rem 1.25rem',
        minHeight: '180px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '1rem',
        position: 'relative',
        overflow: 'hidden',
        border: `1px solid ${paleta.bgSecondary}`,
      }}
    >
      {/* Mini header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.55rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: paleta.textSecondary,
          fontFamily: fonts.monoFamily || fonts.corpoFamily,
          paddingBottom: '0.5rem',
          borderBottom: `1px solid ${paleta.bgSecondary}`,
        }}
      >
        <span>{escritorio}</span>
        <span>{'·'}</span>
      </div>

      {/* Headline */}
      <div>
        <h3
          style={{
            fontFamily: fonts.displayFamily,
            fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            color: paleta.text,
            margin: 0,
          }}
        >
          {style.tagline}
        </h3>
        <p
          style={{
            fontSize: '0.7rem',
            color: paleta.textSecondary,
            marginTop: '0.5rem',
            lineHeight: 1.4,
          }}
        >
          Defesa, consultoria e estratégia para o seu caso.
        </p>
      </div>

      {/* CTA fake */}
      <div
        style={{
          display: 'inline-flex',
          alignSelf: 'flex-start',
          fontSize: '0.65rem',
          fontWeight: 600,
          padding: '0.45rem 0.9rem',
          background: paleta.accent,
          color: paleta.bg,
          borderRadius: '999px',
          fontFamily: fonts.corpoFamily,
          letterSpacing: '0.02em',
        }}
      >
        Falar com escritório
      </div>
    </div>
  );
}
