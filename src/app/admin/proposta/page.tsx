import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PropostaForm } from './form';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin · Gerar proposta',
  robots: { index: false, follow: false },
};

export default function AdminPropostaPage() {
  // Disponivel APENAS em dev local
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return (
    <div style={{ color: 'var(--c-text)', minHeight: '100vh', position: 'relative' }}>
      <div className="bg-continuity" />
      <div className="bg-noise" />

      <section
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '3rem 1.5rem 4rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Link
          href="/admin"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--c-text-muted)',
            textDecoration: 'none',
            display: 'inline-block',
            marginBottom: '1.5rem',
          }}
        >
          ← Hub
        </Link>

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
          Gerar proposta para <span className="gradient-text">novo lead</span>
        </h1>

        <p
          style={{
            color: 'var(--c-text-secondary)',
            fontSize: '1rem',
            lineHeight: 1.7,
            marginBottom: '2.5rem',
          }}
        >
          Preenche os dados, o sistema cria o slug com hash, adiciona no leads.json, faz commit e
          push, e em ~90s a proposta tá no ar com URL pública pra você mandar pro advogado.
        </p>

        <Suspense fallback={<div style={{ color: 'var(--c-text-muted)' }}>Carregando form...</div>}>
          <PropostaForm />
        </Suspense>

        <details style={{ marginTop: '3rem', fontSize: '0.85rem', color: 'var(--c-text-muted)' }}>
          <summary style={{ cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Como funciona
          </summary>
          <div style={{ marginTop: '1rem', lineHeight: 1.7 }}>
            <p style={{ marginBottom: '0.75rem' }}>
              <strong>1.</strong> Form valida e gera slug tipo <code>nome-XXXXXX</code> (hash de 6 chars random).
            </p>
            <p style={{ marginBottom: '0.75rem' }}>
              <strong>2.</strong> API local escreve o lead em <code>src/data/leads.json</code> e roda
              <code> git add + commit + push</code>.
            </p>
            <p style={{ marginBottom: '0.75rem' }}>
              <strong>3.</strong> GitHub recebe o push, Vercel detecta e faz deploy automático em
              produção (~90s).
            </p>
            <p>
              <strong>4.</strong> Você recebe URL pública e botão de copiar. Status do deploy é
              monitorado em tempo real.
            </p>
          </div>
        </details>
      </section>
    </div>
  );
}
