import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin · Hub',
  robots: { index: false, follow: false },
};

export default function AdminHub() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  const cards = [
    {
      titulo: 'Mensagens',
      descricao:
        'Disparar primeiro contato pros 497 advogados. Personalize templates A/C, marque status, controle quem respondeu.',
      href: '/admin/mensagem',
      label: 'Disparar mensagens',
      contexto: 'Ato 1 — primeiro contato',
    },
    {
      titulo: 'Propostas',
      descricao:
        'Gerar landing personalizada pra leads que responderam positivo. Cada proposta tem URL única e fica em produção.',
      href: '/admin/proposta',
      label: 'Criar proposta',
      contexto: 'Ato 2 — quando esquentar',
    },
  ];

  return (
    <div style={{ color: 'var(--c-text)', minHeight: '100vh', position: 'relative' }}>
      <div className="bg-continuity" />
      <div className="bg-noise" />

      <section
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '4rem 1.5rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--c-accent)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontWeight: 600,
            marginBottom: '1rem',
          }}
        >
          Admin · Local only
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            marginBottom: '1rem',
          }}
        >
          Gerador de <span className="gradient-text">campanha</span>
        </h1>

        <p
          style={{
            color: 'var(--c-text-secondary)',
            fontSize: '1rem',
            lineHeight: 1.7,
            marginBottom: '3rem',
          }}
        >
          Operação completa em 2 atos: dispara mensagem inicial, e quando o lead esquentar, manda a
          proposta personalizada.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              style={{
                display: 'block',
                background: 'var(--c-bg-card)',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'border-color 0.3s ease, transform 0.3s ease',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  color: 'var(--c-accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                }}
              >
                {card.contexto}
              </p>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  marginBottom: '0.75rem',
                }}
              >
                {card.titulo}
              </h2>

              <p
                style={{
                  color: 'var(--c-text-secondary)',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  marginBottom: '1.25rem',
                }}
              >
                {card.descricao}
              </p>

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--c-accent)',
                  fontWeight: 600,
                }}
              >
                {card.label} →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
