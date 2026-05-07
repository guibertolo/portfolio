import type { Metadata } from 'next';
import Link from 'next/link';
import { STYLES } from './styles-data';
import { StylesGallery } from './styles-gallery';

export const metadata: Metadata = {
  title: 'Direções estéticas para advocacia | Guilherme Bertolo',
  description: 'Seis direções estéticas autorais como ponto de partida pro seu site. Não são templates, são caminhos pra customizar.',
  robots: { index: false, follow: false },
};

export default async function EstilosPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const backHref = from ? `/proposta/${from}` : '/';
  const backLabel = from ? '← Voltar pra sua proposta' : '← guilhermebertolo.com.br';

  return (
    <div style={{ color: 'var(--c-text)', minHeight: '100vh', position: 'relative' }}>
      <div className="bg-continuity" />
      <div className="bg-noise" />

      {/* HERO */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 1.5rem 3rem', position: 'relative', zIndex: 1 }}>
        <Link
          href={backHref}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: from ? 'var(--c-accent)' : 'var(--c-text-muted)',
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: '2rem',
            letterSpacing: '0.1em',
            fontWeight: from ? 600 : 400,
          }}
        >
          {backLabel}
        </Link>

        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--c-accent)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            marginBottom: '1rem',
            fontWeight: 600,
          }}
        >
          Galeria de direções estéticas
        </p>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.25rem, 5.5vw, 3.5rem)',
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            marginBottom: '1.5rem',
          }}
        >
          Estas não são opções de template.
          <br />
          São <span className="gradient-text">pontos de partida</span> pro seu site único.
        </h1>

        <p
          style={{
            color: 'var(--c-text-secondary)',
            fontSize: '1.05rem',
            lineHeight: 1.7,
            maxWidth: '640px',
            marginBottom: '1rem',
          }}
        >
          Advocacia não é um tom só. Um escritório de família que recebe vovó em luto fala diferente do tributarista que defende holding bilionária. Aqui estão seis direções autorais bem distintas pra você reconhecer seu escritório no espelho antes do briefing começar.
        </p>

        <p
          style={{
            color: 'var(--c-text-muted)',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            maxWidth: '640px',
          }}
        >
          A direção que você escolher vira matéria-prima do design final, não produto final. Paleta, fontes e proporções são ajustadas pra você no briefing.
        </p>
      </section>

      {/* GALERIA */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem 4rem', position: 'relative', zIndex: 1 }}>
        <StylesGallery styles={STYLES} />
      </section>

      {/* RODAPE COM PROVA */}
      <footer style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem 4rem', position: 'relative', zIndex: 1, borderTop: '1px solid var(--c-border)' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
          Identidade única, garantida em contrato
        </p>
        <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, maxWidth: '640px', marginBottom: from ? '2rem' : 0 }}>
          A Dra. Gislaine Rodrigues escolheu uma direção e o resultado é único dela. Você pode ver{' '}
          <a
            href="https://advogadagislainerodrigues.com.br"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}
          >
            o site dela ao vivo
          </a>
          . O seu vai ter outra paleta, outra tipografia, outra atmosfera. O processo é o mesmo, a entrega é diferente.
        </p>

        {from && (
          <Link
            href={backHref}
            className="btn-ghost"
            style={{ marginTop: '1rem' }}
          >
            ← Voltar pra sua proposta
          </Link>
        )}
      </footer>
    </div>
  );
}
