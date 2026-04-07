import Link from 'next/link';
import type { Metadata } from 'next';
import { BackLink } from '../back-link';

export const metadata: Metadata = {
  title: 'Case Study: Site Advogada | Guilherme Bertolo',
  description: 'Site profissional para advogada de Direito de Família. SEO local, design responsivo, formulário de contato.',
};

const STACK = [
  { name: 'Next.js 16', role: 'Framework' },
  { name: 'TypeScript', role: 'Linguagem' },
  { name: 'Tailwind CSS v4', role: 'Estilização' },
  { name: 'Vercel', role: 'Deploy' },
  { name: 'Supabase', role: 'Backend + Auth' },
  { name: 'SEO Local', role: 'Estratégia' },
  { name: 'JSON-LD', role: 'Dados estruturados' },
];

const FEATURES = [
  {
    title: 'SEO local otimizado',
    description: 'JSON-LD com LocalBusiness + LegalService, meta tags por página, sitemap dinâmico. Posicionamento para buscas como "advogada família São Bernardo".',
  },
  {
    title: 'Áreas de atuação',
    description: 'Páginas dedicadas para cada área: divórcio, guarda, pensão, inventário, união estável. Conteúdo pensado pra quem busca ajuda, não juridiquês.',
  },
  {
    title: 'Formulário de contato',
    description: 'Formulário simples e direto com validação. Integrado com WhatsApp como canal principal de atendimento.',
  },
  {
    title: 'Design responsivo',
    description: 'Layout limpo, profissional, tipografia legível. Funciona bem em celular porque a maioria dos clientes acessa por lá.',
  },
  {
    title: 'Blog integrado',
    description: 'Seção de artigos sobre dúvidas comuns de Direito de Família. Conteúdo como ferramenta de captação orgânica.',
  },
  {
    title: 'Painel administrativo',
    description: 'Área restrita pra advogada gerenciar artigos do blog, depoimentos e conteúdo do site sem depender de desenvolvedor.',
  },
  {
    title: 'Performance',
    description: 'Lighthouse alto em todas as categorias. Carregamento rápido, sem dependências pesadas, imagens otimizadas.',
  },
];

export default function SiteAdvogadaCase() {
  return (
    <div style={{ color: 'var(--c-text)', minHeight: '100vh', position: 'relative' }}>
      <div className="bg-continuity" />
      <div className="bg-noise" />

      {/* Header */}
      <header style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem 0', position: 'relative', zIndex: 1 }}>
        <BackLink />
      </header>

      {/* Hero */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem 4rem', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'rgba(34,197,94,0.15)', color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
            Live
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'rgba(59,130,246,0.15)', color: 'var(--c-accent)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
            Client Work
          </span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display, var(--font-mono))', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
          Site <span className="gradient-text">Advogada</span>
        </h1>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--c-accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          Presença profissional pra quem vive de confiança.
        </p>

        <p style={{ color: 'var(--c-text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '650px' }}>
          Uma advogada de Direito de Família em São Bernardo do Campo precisava sair do boca a boca e aparecer no Google. Sem site, sem presença digital, sem forma de receber contatos fora do horário. Construí o site do zero focando no que traz cliente: SEO local, conteúdo claro e um caminho simples até o WhatsApp.
        </p>

        <div style={{ marginTop: '2rem' }}>
          <a
            href="https://advogadagislainerodrigues.com.br"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'white', textDecoration: 'none', background: 'var(--c-accent)', padding: '0.75rem 2rem', borderRadius: '9999px', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            Visitar site &#8599;
          </a>
        </div>
      </section>

      {/* Desafio */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 4rem', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
          <span style={{ color: 'var(--c-accent)' }}>01.</span> O Desafio
        </h2>
        <div style={{ background: 'var(--c-bg-card)', border: '1px solid var(--c-border)', borderRadius: '16px', padding: '2rem' }}>
          <p style={{ color: 'var(--c-text-secondary)', lineHeight: 1.8 }}>
            Advogados de família dependem de indicação. Mas quando alguém pesquisa &quot;advogada divórcio São Bernardo&quot; no Google, precisa encontrar. A Dra. Gislaine não tinha site, não aparecia em buscas e perdia clientes que procuravam online. O desafio era criar uma presença digital que passasse credibilidade, explicasse as áreas de atuação sem juridiquês e levasse o visitante ao contato com o mínimo de atrito.
          </p>
        </div>
      </section>

      {/* Solucao */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 4rem', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
          <span style={{ color: 'var(--c-accent)' }}>02.</span> O que entreguei
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {FEATURES.map((f) => (
            <div key={f.title} style={{ background: 'var(--c-bg-card)', border: '1px solid var(--c-border)', borderRadius: '12px', padding: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 4rem', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '2rem' }}>
          <span style={{ color: 'var(--c-accent)' }}>03.</span> Stack
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
          {STACK.map((s) => (
            <div key={s.name} style={{ background: 'var(--c-bg-card)', border: '1px solid var(--c-border)', borderRadius: '8px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600 }}>{s.name}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 6rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <p style={{ color: 'var(--c-text-secondary)', marginBottom: '1.5rem' }}>
          Precisa de um site profissional pro seu negócio?
        </p>
        <Link
          href="/#contato"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'white', textDecoration: 'none', background: 'var(--c-accent)', padding: '0.75rem 2rem', borderRadius: '9999px', fontWeight: 500 }}
        >
          Entre em contato
        </Link>
      </section>
    </div>
  );
}
