import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MensagemCliente } from './cliente';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin · Disparar mensagens',
  robots: { index: false, follow: false },
};

export default function AdminMensagemPage() {
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return (
    <div style={{ color: 'var(--c-text)', minHeight: '100vh', position: 'relative' }}>
      <div className="bg-continuity" />
      <div className="bg-noise" />

      <section
        style={{
          maxWidth: '1100px',
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

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            marginBottom: '0.75rem',
          }}
        >
          Disparar <span className="gradient-text">mensagens</span>
        </h1>

        <p
          style={{
            color: 'var(--c-text-secondary)',
            fontSize: '0.95rem',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
          }}
        >
          497 advogados importados do tracking.csv. Busca por número, personaliza com nome do
          contato, escolhe template, copia mensagem e marca como enviado.
        </p>

        <MensagemCliente />
      </section>
    </div>
  );
}
