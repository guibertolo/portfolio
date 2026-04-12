import Link from 'next/link';

const POSTS = [
  {
    slug: 'claude-code-como-ferramenta',
    title: 'Claude Code como ferramenta de desenvolvimento',
    subtitle: 'Depois de meses usando como IDE principal, o que realmente acelera e o que atrapalha.',
    date: '2026-04-07',
    readTime: '8 min',
    tags: ['AI', 'Claude Code', 'Produtividade'],
  },
  {
    slug: 'saas-solo-frotaviva',
    title: 'Como construí um SaaS inteiro sozinho',
    subtitle: 'O caminho real de um dev solo: da ideia ao usuário pagando, sem equipe.',
    date: 'Em breve',
    readTime: '10 min',
    tags: ['SaaS', 'Next.js', 'Supabase'],
    soon: true,
  },
  {
    slug: '30-agentes-ia-aiox',
    title: '30 agentes de IA trabalhando juntos',
    subtitle: 'Orquestrar agentes não é dar prompt bonito. É definir quem decide o que.',
    date: 'Em breve',
    readTime: '12 min',
    tags: ['AI', 'Multi-agent', 'AIOX'],
    soon: true,
  },
  {
    slug: 'help-desk-a-ai-engineer',
    title: 'Autodidata, Full-Stack, AI Engineer',
    subtitle: 'O que dez anos de prática ensinam que a faculdade não ensina.',
    date: 'Em breve',
    readTime: '7 min',
    tags: ['Carreira', 'Autodidata'],
    soon: true,
  },
];

export default function BlogPage() {
  return (
    <div style={{ color: 'var(--c-text)', minHeight: '100vh', position: 'relative' }}>
      <div className="bg-continuity" />
      <div className="bg-noise" />
      <header style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 1.5rem 0', position: 'relative', zIndex: 1 }}>
        <Link
          href="/"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--c-accent)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <span>&#8592;</span> Voltar ao portfólio
        </Link>
      </header>

      <section style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1, padding: '3rem 1.5rem 2rem' }}>
        <p className="section-label">
          {'· blog'}
        </p>
        <h1 style={{ fontFamily: 'var(--font-display, var(--font-mono))', fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem' }}>
          Artigos e <span className="gradient-text">aprendizados</span>
        </h1>
        <p style={{ color: 'var(--c-text-secondary)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '550px' }}>
          O que aprendo construindo produtos, orquestrando agentes de IA e navegando uma carreira autodidata em tech.
        </p>
      </section>

      <section style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1, padding: '0 1.5rem 6rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {POSTS.map((post) => (
            <article key={post.slug} style={{ position: 'relative' }}>
              {post.soon ? (
                <div aria-disabled="true" style={{
                  background: 'var(--c-bg-card)',
                  border: '1px solid var(--c-border)',
                  borderRadius: '16px',
                  padding: '2rem',
                  opacity: 0.5,
                  pointerEvents: 'none',
                }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    {post.tags.map((tag) => (
                      <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', padding: '0.2rem 0.5rem', borderRadius: '6px', border: '1px solid var(--c-border)', color: 'var(--c-text-muted)', letterSpacing: '0.05em' }}>{tag}</span>
                    ))}
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-display, var(--font-mono))', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{post.title}</h2>
                  <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{post.subtitle}</p>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--c-text-muted)', marginTop: '1rem' }}>
                    Em breve
                  </div>
                </div>
              ) : (
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div style={{
                    background: 'var(--c-bg-card)',
                    border: '1px solid var(--c-border)',
                    borderRadius: '16px',
                    padding: '2rem',
                    transition: 'background 0.3s, border-color 0.3s, transform 0.2s',
                  }} className="card-glass">
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      {post.tags.map((tag) => (
                        <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', padding: '0.2rem 0.5rem', borderRadius: '6px', border: '1px solid var(--c-border)', color: 'var(--c-text-muted)', letterSpacing: '0.05em' }}>{tag}</span>
                      ))}
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-display, var(--font-mono))', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{post.title}</h2>
                    <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{post.subtitle}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--c-text-muted)' }}>
                        {new Date(post.date).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' })} · {post.readTime}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--c-accent)' }}>
                        Ler artigo &#8599;
                      </span>
                    </div>
                  </div>
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
