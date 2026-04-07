import Link from 'next/link';
import Image from 'next/image';
import { ScreenshotGallery } from './screenshot-gallery';
import { BackLink } from '../back-link';

const SCREENSHOTS = [
  { src: '/cases/frotaviva/dashboard-1.png', label: 'Dashboard - Resultado da Frota' },
  { src: '/cases/frotaviva/dashboard-2.png', label: 'Dashboard - Indicadores e Ranking' },
  { src: '/cases/frotaviva/viagens.png', label: 'Gestão de Viagens' },
  { src: '/cases/frotaviva/viagem-detalhe.png', label: 'Detalhe da Viagem' },
  { src: '/cases/frotaviva/acerto-contas.png', label: 'Acerto de Contas' },
  { src: '/cases/frotaviva/vinculos.png', label: 'Vínculos da Frota' },
];

const FEATURES = [
  {
    title: 'Dashboard em tempo real',
    description: 'Visão geral da frota com indicadores de performance, motoristas ativos e viagens em andamento.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  },
  {
    title: 'Gestão de motoristas',
    description: 'Cadastro completo, documentação, habilitação, histórico de viagens e avaliação de desempenho.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  },
  {
    title: 'Controle de veículos',
    description: 'Frota de cegonheiros com dados técnicos, manutenção preventiva e status operacional.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="15" height="10" rx="2"/><path d="M16 10h4l3 3v3h-7V10z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  },
  {
    title: 'Viagens e rotas',
    description: 'Registro de viagens com origem, destino, carga, quilometragem e custos operacionais.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 7 8 11.7z"/></svg>,
  },
  {
    title: 'Autenticação e permissões',
    description: 'Sistema de login seguro com Row Level Security (RLS) no Supabase e controle de acesso por papel.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  },
  {
    title: 'Performance otimizada',
    description: 'Lighthouse 98 em todas as categorias. Carregamento rápido, SEO otimizado e acessibilidade.',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
  },
];

const STACK = [
  { name: 'Next.js 16', role: 'Framework' },
  { name: 'TypeScript', role: 'Linguagem' },
  { name: 'Tailwind CSS v4', role: 'Estilização' },
  { name: 'Supabase', role: 'Backend & Auth' },
  { name: 'PostgreSQL', role: 'Banco de dados' },
  { name: 'Vercel', role: 'Deploy & Hosting' },
  { name: 'RLS Policies', role: 'Segurança' },
  { name: 'Resend', role: 'Email transacional' },
];

export default function FrotaVivaCase() {
  return (
    <div style={{ background: 'var(--c-bg)', color: 'var(--c-text)', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem 0' }}>
        <BackLink />
      </header>

      {/* Hero */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem 4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'rgba(34,197,94,0.15)', color: '#22c55e', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
            Live
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', background: 'rgba(59,130,246,0.15)', color: 'var(--c-accent)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
            Lighthouse 98
          </span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1rem' }}>
          Frota<span className="gradient-text">Viva</span>
        </h1>

        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--c-accent)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          De planilhas e WhatsApp para um SaaS completo. Sozinho.
        </p>

        <p style={{ color: 'var(--c-text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: '650px' }}>
          Um setor inteiro operava no improviso. Cegonheiros controlavam frotas, motoristas e viagens em planilhas do Excel, mensagens de WhatsApp e cadernos de papel. Eu identifiquei o problema, desenhei a solução e construí o produto inteiro do zero ao deploy. Sem equipe. Resultado: SaaS em produção com Lighthouse 98.
        </p>
      </section>

      {/* Problema */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 4rem' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
          <span style={{ color: 'var(--c-accent)' }}>01.</span> O Problema
        </h2>
        <div style={{ background: 'var(--c-bg-card)', border: '1px solid var(--c-border)', borderRadius: '16px', padding: '2rem' }}>
          <p style={{ color: 'var(--c-text-secondary)', lineHeight: 1.8 }}>
            Imagina gerenciar 15 caminhões, 20 motoristas e dezenas de viagens por mês usando uma planilha do Excel e um grupo de WhatsApp. O dono da frota acordava, abria o celular e tentava montar o quebra-cabeça do dia com mensagens de áudio e anotações em caderno. Quem está disponível? Qual caminhão precisa de manutenção? Quanto custou a última viagem? Ninguém sabia responder sem ligar pra três pessoas. Informação crítica espalhada em cinco lugares diferentes. Decisões tomadas no achismo.
          </p>
        </div>
      </section>

      {/* Solução */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 4rem' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
          <span style={{ color: 'var(--c-accent)' }}>02.</span> A Solução
        </h2>
        <p style={{ color: 'var(--c-text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
          Coloquei tudo num lugar só. O cegonheiro abre o dashboard e vê o estado da frota inteira em tempo real. Motoristas cadastrados com documentação e histórico. Veículos com status operacional. Viagens registradas com origem, destino, carga e custo. Tudo protegido por empresa, com autenticação e controle de acesso no nível do banco de dados. O que antes levava ligações e buscas em planilha agora leva dois cliques.
        </p>

        {/* Screenshots */}
        <ScreenshotGallery screenshots={SCREENSHOTS} />
      </section>

      {/* Funcionalidades */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 4rem' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '2rem' }}>
          <span style={{ color: 'var(--c-accent)' }}>03.</span> Funcionalidades
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {FEATURES.map((f) => (
            <div key={f.title} style={{ background: 'var(--c-bg-card)', border: '1px solid var(--c-border)', borderRadius: '12px', padding: '1.5rem' }}>
              <div style={{ marginBottom: '0.75rem' }}>{f.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 4rem' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '2rem' }}>
          <span style={{ color: 'var(--c-accent)' }}>04.</span> Stack Técnica
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

      {/* Resultados */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 4rem' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '2rem' }}>
          <span style={{ color: 'var(--c-accent)' }}>05.</span> Resultados
        </h2>
        <div className="results-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {[
            { value: '98', label: 'Lighthouse Score' },
            { value: '< 1s', label: 'Tempo de carregamento' },
            { value: '100%', label: 'Funcional via web' },
          ].map((r) => (
            <div key={r.label} style={{ background: 'var(--c-bg-card)', border: '1px solid var(--c-border)', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2rem', fontWeight: 700, color: 'var(--c-accent)' }}>{r.value}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--c-text-muted)', marginTop: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{r.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Aprendizados */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 4rem' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
          <span style={{ color: 'var(--c-accent)' }}>06.</span> O que aprendi
        </h2>
        <div style={{ background: 'var(--c-bg-card)', border: '1px solid var(--c-border)', borderRadius: '16px', padding: '2rem' }}>
          <ul style={{ color: 'var(--c-text-secondary)', lineHeight: 2, fontSize: '0.9rem', paddingLeft: '1.25rem' }}>
            <li>RLS (Row Level Security) no Supabase é poderoso mas exige planejamento cuidadoso desde o início</li>
            <li>Tailwind v4 trouxe melhorias mas também breaking changes que exigem atenção</li>
            <li>Performance não é otimização final — é decisão de arquitetura desde o primeiro commit</li>
            <li>Entender o domínio do cliente (transporte de cegonheiros) foi tão importante quanto saber programar</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 6rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--c-text-secondary)', marginBottom: '1.5rem' }}>
          Gostou do projeto? Vamos conversar sobre como posso ajudar no seu.
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
