import Image from 'next/image';
// Effects, ShaderBackground, FeatureToggles and SmoothScroll moved to app/layout.tsx
// so blog and case study routes inherit the time-of-day theme and shader bg.

const PROJECTS = [
  {
    title: 'FrotaViva',
    description: 'Cegonheiros gerenciavam frotas inteiras no Excel e WhatsApp. Construí sozinho o SaaS que substituiu tudo isso: dashboard em tempo real, controle total da operação, Lighthouse 98. Em produção.',
    tags: ['Next.js', 'Supabase', 'Vercel', 'TypeScript'],
    status: 'Live',
    highlight: 'Lighthouse 98',
    url: '/case/frotaviva',
    linkLabel: 'Ver case study',
  },
  {
    title: 'AIOX',
    description: 'Framework de orquestração de agentes de IA. Sistema multi-agente com 30+ agentes especializados, workflows automatizados e quality gates.',
    tags: ['TypeScript', 'AI Orchestration', 'Multi-agent', 'Claude'],
    status: 'Em estudo',
    highlight: 'AI-Powered',
    url: 'https://github.com/guibertolo',
    linkLabel: 'GitHub',
  },
  {
    title: 'PurgeKit',
    description: 'Aplicação desktop para otimização de Windows. Limpeza inteligente, gerenciamento de serviços e monitoramento de performance.',
    tags: ['Tauri', 'Rust', 'TypeScript', 'Windows'],
    status: 'Em dev',
    highlight: 'Desktop App',
    url: 'https://github.com/guibertolo/purgekit',
    linkLabel: 'GitHub',
  },
  {
    title: 'CausaJusta',
    description: 'RAG jurídico em construção. Assistente que lê petições, acórdãos e jurisprudência usando embeddings e recuperação semântica para acelerar a pesquisa processual.',
    tags: ['Next.js', 'Drizzle', 'Supabase', 'Gemini', 'RAG'],
    status: 'Em dev',
    highlight: 'LegalTech',
    url: 'https://github.com/guibertolo',
    linkLabel: 'GitHub',
  },
  {
    title: 'Site Advogada',
    description: 'Site profissional para advogada especializada em Direito de Família. Design responsivo, SEO otimizado, formulário de contato.',
    tags: ['Next.js', 'Tailwind', 'Vercel', 'SEO'],
    status: 'Live',
    highlight: 'Client Work',
    url: '/case/site-advogada',
    linkLabel: 'Ver case study',
  },
];

const TECH_STACK = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { category: 'Backend', items: ['Node.js', 'Supabase', 'PostgreSQL', 'REST APIs'] },
  { category: 'Desktop', items: ['Tauri', 'Rust', 'Electron'] },
  { category: 'AI & Tools', items: ['Claude Code', 'AI Orchestration', 'Multi-agent Systems', 'Prompt Engineering'] },
  { category: 'DevOps', items: ['Vercel', 'Git', 'GitHub Actions', 'CI/CD'] },
  { category: 'Design', items: ['Figma', 'UI/UX', 'Responsive Design', 'Accessibility'] },
];

const EXPERIENCE = [
  { period: '2020 - Presente', role: 'Desenvolvedor Independente & AI Engineer', company: 'Autônomo', url: '', description: 'Transição para desenvolvimento full-stack e engenharia de IA. Construção de SaaS em produção (FrotaViva), contribuição no AIOX (framework de orquestração de agentes) e aplicações desktop com Rust e Tauri.' },
  { period: '2018 - 2019', role: 'Analista de Processos', company: 'Grupo H.Olhos', url: 'https://hospitalholhos.com.br', description: 'Implantação e manutenção de ferramentas e softwares. Integração de novos colaboradores, gestão de rede, suporte de sistemas internos e desenvolvimento de projetos.' },
  { period: '2016 - 2018', role: 'Analista de TI', company: 'Cultural Norte Americano', url: 'https://cna.com.br', description: 'Planejamento e configuração de toda rede interna. Gestão de infraestrutura de TI e suporte técnico.' },
  { period: '2014 - 2016', role: 'Estagiário de Engenharia Industrial', company: 'Toledo do Brasil', url: 'https://www.toledobrasil.com.br', description: 'Configuração e montagem de sistemas de pesagem. Migração de banco de dados, montagem de ambientes de teste.' },
  { period: '2013 - 2014', role: 'Estagiário de Help Desk', company: 'Accesstage Tecnologia', url: 'https://site.accesstage.com.br', description: 'Tratamento de arquivos em transferência eletrônica de dados (EDI). Suporte ao sistema de cobrança da Caixa Econômica Federal.' },
];

function LetterReveal({ text, baseDelay }: { text: string; baseDelay: number }) {
  return (
    <span className="hero-name">
      {text.split('').map((char, i) => (
        <span key={i} style={{ animationDelay: `${baseDelay + i * 0.1}s` }}>
          {char}
        </span>
      ))}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, { bg: string; text: string }> = {
    Live: { bg: 'rgba(34,197,94,0.15)', text: '#22c55e' },
    'Em dev': {
      bg: 'color-mix(in srgb, var(--c-accent) 15%, transparent)',
      text: 'var(--c-accent-hover)',
    },
    'Em estudo': { bg: 'rgba(148,163,184,0.15)', text: '#94a3b8' },
  };
  const c = colors[status] ?? colors['Em dev'];
  return (
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', background: c.bg, color: c.text, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
      {status}
    </span>
  );
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Guilherme Bertolo',
  jobTitle: 'AI Engineer & Full-stack Developer',
  url: 'https://guilhermebertolo.com.br',
  sameAs: ['https://github.com/guibertolo'],
  email: 'guilhermerbertolo@gmail.com',
  address: { '@type': 'PostalAddress', addressLocality: 'São Bernardo do Campo', addressRegion: 'SP', addressCountry: 'BR' },
  knowsAbout: ['TypeScript', 'Next.js', 'React', 'AI Orchestration', 'Supabase', 'Rust', 'Tauri'],
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-noise" />

      {/* ===== HERO ===== */}
      <section className="hero-section-mobile" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', maxWidth: '100%', padding: '0 1.25rem', position: 'relative' }}>
        <div className="hero-glow" data-parallax="0.3" data-parallax-speed="0.3" />
        <div className="hero-grid" data-parallax="0.1" data-parallax-speed="0.15" />
        {/* particles removed — hero cleaner */}

        <div style={{ textAlign: 'center', position: 'relative', zIndex: 10, padding: '0 1rem' }}>
          {/* Bracket motif removed — code identity carried by // labels and terminal mode */}
          <p className="hero-fade hero-fade-1 typing-text" data-text="<AI Engineer & Full-stack Developer />" suppressHydrationWarning style={{ fontFamily: 'var(--font-mono)', color: 'var(--c-accent)', fontSize: '0.8rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '2rem', minHeight: '1.5em' }}>
            {''}
          </p>

          <h1 id="hero-name" aria-label="Guilherme Bertolo" data-parallax-speed="-0.05" style={{ fontFamily: 'var(--font-instrument)', fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.05, userSelect: 'none', WebkitUserSelect: 'none' }}>
            <span aria-hidden="true" style={{ display: 'block', marginBottom: '0.25rem' }}>
              <LetterReveal text="Guilherme" baseDelay={0.8} />
            </span>
            <span aria-hidden="true" className="gradient-text-hero" style={{ display: 'block' }}>
              <LetterReveal text="Bertolo" baseDelay={2.2} />
            </span>
          </h1>

          <p className="hero-fade hero-fade-3" style={{ color: 'var(--c-text-secondary)', fontSize: '1.1rem', maxWidth: '520px', margin: '2rem auto 0', lineHeight: 1.8, letterSpacing: '0.01em' }}>
            Eu projeto, codifico e coloco no ar.{' '}
            <span style={{ color: 'var(--c-text)', fontWeight: 500 }}>Sozinho, se precisar.</span>
          </p>

          <p className="hero-fade hero-fade-3" style={{ color: 'var(--c-text-quaternary)', fontSize: '0.8rem', marginTop: '0.75rem', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
            Sites &middot; Sistemas &middot; Apps &middot; Automa&ccedil;&atilde;o com IA
          </p>

          <div className="hero-fade hero-fade-4 hero-cta-group" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="#contato" className="btn-ghost">
              Contato
            </a>
            <a href="#projetos" className="btn-primary">
              Ver meu trabalho
            </a>
            <a href="https://github.com/guibertolo" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              GitHub
            </a>
          </div>

          <div className="hero-fade hero-fade-5" style={{ position: 'absolute', bottom: '-8rem', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            {/* Desktop: mouse icon */}
            <div className="scroll-mouse scroll-desktop"><div className="scroll-wheel" /></div>
            {/* Mobile: swipe gesture */}
            <div className="scroll-mobile">
              <svg width="24" height="32" viewBox="0 0 24 32" fill="none" stroke="var(--c-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="2" width="16" height="24" rx="8" />
                <line x1="12" y1="10" x2="12" y2="16" className="swipe-line" />
                <path d="M9 14 L12 18 L15 14" className="swipe-arrow" />
              </svg>
            </div>
            <svg className="scroll-chevron" width="20" height="10" viewBox="0 0 20 10" fill="none" stroke="var(--c-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 2 L10 8 L18 2" /></svg>
            <svg className="scroll-chevron scroll-chevron-2" width="20" height="10" viewBox="0 0 20 10" fill="none" stroke="var(--c-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: '-6px' }}><path d="M2 2 L10 8 L18 2" /></svg>
          </div>
        </div>
      </section>

      {/* ===== SOBRE ===== */}
      <section id="sobre">
        <div className="reveal" style={{ display: 'flex', gap: '3rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Avatar */}
          <div className="avatar-container" style={{ width: '180px', height: '180px', minWidth: '180px' }}>
            <Image src="/avatar.jpg" alt="Guilherme Bertolo" width={180} height={180} priority style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }} />
          </div>

          <div style={{ flex: 1, minWidth: '280px' }}>
          <p className="section-label">{'// sobre mim'}</p>
          <h2 className="section-title" style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}>
            +10 anos resolvendo problemas.{' '}
            <span className="gradient-text">Os últimos, com código e IA.</span>
          </h2>
          {/* Claim específico */}
          <div style={{ background: 'var(--c-bg-card)', border: '1px solid var(--c-border)', borderLeft: '3px solid var(--c-accent)', borderRadius: '0 12px 12px 0', padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--c-text)', lineHeight: 1.6 }}>
              Construí o FrotaViva sozinho: SaaS em produção com nota 98/100 em performance. Contribuo no AIOX, framework que coordena 30+ agentes de IA em um pipeline de 29 etapas.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--c-text)', lineHeight: 1.8, fontSize: '1rem', fontFamily: 'var(--font-sans)' }}>
            <p>Comecei no suporte técnico, passei por engenharia industrial e gestão de processos hospitalares. Cada fase me ensinou a enxergar tecnologia pelo lado de quem usa, não de quem vende. Hoje projeto e desenvolvo produtos inteiros, do banco de dados à interface.</p>
            <p>No FrotaViva, fiz tudo: modelagem do banco, backend, frontend, deploy. Sem equipe, sem dependência. No AIOX, contribuo com o framework que orquestra agentes de IA que pesquisam, codificam, testam e fazem deploy seguindo 29 etapas com 7 portões de qualidade.</p>
          </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '3rem' }}>
          {[
            { phrase: 'Do código à produção em horas, não semanas', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> },
            { phrase: 'IA que executa com critério, não que gera lixo bonito', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h.01M15 9h.01M9 15c.83.83 2.17 1.5 3 1.5s2.17-.67 3-1.5"/></svg> },
            { phrase: 'Produto inteiro, um desenvolvedor', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg> },
          ].map((item, i) => (
            <div key={item.phrase} className="reveal card-glass magnetic-card" data-delay={`${(i + 1) * 0.15}`} style={{ textAlign: 'center', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>{item.icon}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--c-text-secondary)', fontFamily: 'var(--font-mono)', lineHeight: 1.5 }}>{item.phrase}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PROJETOS ===== */}
      <section id="projetos">
        <div className="reveal">
          <p className="section-label">{'// projetos'}</p>
          <h2 className="section-title">O que estou <span className="gradient-text">construindo</span></h2>
        </div>

        {/* Masonry grid — featured project spans 2 rows on tablet+, 2col+2row on desktop */}
        <div className="projects-masonry">
          {/* Hero project — FrotaViva (featured, spans 2 rows) */}
          <div className="reveal card-glass magnetic-card project-featured" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', overflow: 'hidden', padding: '2rem' }}>
            <div className="project-status-bar" style={{ background: '#22c55e' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em' }}>{PROJECTS[0].title}</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <StatusBadge status={PROJECTS[0].status} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', background: 'color-mix(in srgb, var(--c-accent) 15%, transparent)', color: 'var(--c-accent)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                  {PROJECTS[0].highlight}
                </span>
              </div>
            </div>
            <p style={{ color: 'var(--c-text)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '600px', fontFamily: 'var(--font-sans)' }}>{PROJECTS[0].description}</p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {[
                { value: '98', label: 'Lighthouse' },
                { value: '1', label: 'Developer' },
                { value: '<1s', label: 'Load time' },
              ].map((m) => (
                <div key={m.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--c-accent)', fontFeatureSettings: "'tnum'", fontVariantNumeric: 'tabular-nums' }}>{m.value}</div>
                  <div className="label-mono" style={{ marginTop: '0.125rem', fontSize: '0.5rem' }}>{m.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {PROJECTS[0].tags.map((tag) => (
                <span key={tag} className="tech-tag" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', padding: '0.3rem 0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--c-border)', background: 'transparent', color: 'var(--c-text-muted)', letterSpacing: '0.05em' }}>{tag}</span>
              ))}
            </div>
            <a
              href={PROJECTS[0].url}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'var(--c-accent)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.05em', fontWeight: 600, marginTop: 'auto' }}
            >
              {PROJECTS[0].linkLabel} <span style={{ fontSize: '1rem' }}>&#8599;</span>
            </a>
          </div>

          {/* Other projects */}
          {PROJECTS.slice(1).map((project, i) => (
            <div key={project.title} className="reveal card-glass magnetic-card" data-delay={`${(i + 1) * 0.25}`} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', overflow: 'hidden' }}>
              <div className="project-status-bar" style={{ background: project.status === 'Live' ? '#22c55e' : project.status === 'Em dev' ? 'var(--c-accent-hover)' : '#94a3b8' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', fontWeight: 600, letterSpacing: '-0.015em' }}>{project.title}</h3>
                <StatusBadge status={project.status} />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--c-accent)', fontWeight: 500, letterSpacing: '0.05em' }}>{project.highlight}</span>
              <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.8rem', lineHeight: 1.6, flex: 1, fontFamily: 'var(--font-sans)' }}>{project.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {project.tags.map((tag) => (
                  <span key={tag} className="tech-tag" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', padding: '0.3rem 0.6rem', borderRadius: '6px', border: '1px solid var(--c-border)', background: 'transparent', color: 'var(--c-text-muted)', letterSpacing: '0.05em' }}>{tag}</span>
                ))}
              </div>
              <a
                href={project.url}
                target={project.url.startsWith('http') ? '_blank' : undefined}
                rel={project.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.375rem', textDecoration: 'none', color: 'var(--c-accent)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.05em' }}
              >
                {project.linkLabel} <span style={{ fontSize: '0.85rem' }}>&#8599;</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TECH STACK ===== */}
      <section id="stack">
        <div className="reveal">
          <p className="section-label">{'// tech stack'}</p>
          <h2 className="section-title">Ferramentas que <span className="gradient-text">domino</span></h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          {TECH_STACK.map((group, i) => (
            <div key={group.category} className="reveal card-glass magnetic-card" data-delay={`${(i + 1) * 0.2}`}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--c-accent)', marginBottom: '1rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{group.category}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {group.items.map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: 'var(--c-text-secondary)', fontSize: '0.875rem' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--c-accent)', flexShrink: 0 }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== COMO EU TRABALHO ===== */}
      <section id="processo">
        <div className="reveal">
          <p className="section-label">{'// processo'}</p>
          <h2 className="section-title">Como eu <span className="gradient-text">trabalho</span></h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {[
            {
              title: 'Conversa e escopo',
              description: 'Começa com uma conversa pra entender o que você precisa. Defino escopo, prazo e entregáveis antes de escrever uma linha de código. Sem surpresas.',
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
              number: '01',
            },
            {
              title: 'Protótipo rápido',
              description: 'Em dias você já vê uma versão funcionando no ar. Valida antes de avançar. Ajustes no caminho, não no final.',
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
              number: '02',
            },
            {
              title: 'Entrega + suporte',
              description: 'Entrego o produto funcionando com deploy, SEO e performance otimizada. Suporte incluído por 30 dias após a entrega.',
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
              number: '03',
            },
          ].map((step, i) => (
            <div key={step.title} className="reveal card-glass magnetic-card" data-delay={`${(i + 1) * 0.25}`} style={{ padding: '2rem', position: 'relative' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '3rem', fontWeight: 300, color: 'var(--c-accent)', opacity: 0.12, position: 'absolute', top: '1rem', right: '1.5rem', fontFeatureSettings: "'tnum'", fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' }}>{step.number}</div>
              <div style={{ marginBottom: '1rem' }}>{step.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>{step.title}</h3>
              <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.85rem', lineHeight: 1.7, fontFamily: 'var(--font-sans)' }}>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== EXPERIENCIA ===== */}
      <section id="experiencia">
        <div className="reveal">
          <p className="section-label">{'// experiência'}</p>
          <h2 className="section-title">Minha <span className="gradient-text">trajetória</span></h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {EXPERIENCE.map((exp) => (
            <div key={exp.period} className="reveal timeline-item" style={{ padding: '1.5rem 0 1.5rem 2rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--c-accent)', letterSpacing: '0.1em' }}>{exp.period}</span>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: 600, marginTop: '0.375rem' }}>{exp.role}</h3>
              {exp.url ? (
                <a href={exp.url} target="_blank" rel="noopener noreferrer" className="company-link" style={{ fontSize: '0.8rem', color: 'var(--c-text-muted)', fontWeight: 500, textDecoration: 'none', borderBottom: '1px dashed var(--c-text-muted)' }}>{exp.company} ↗</a>
              ) : (
                <span style={{ fontSize: '0.8rem', color: 'var(--c-text-muted)', fontWeight: 500 }}>{exp.company}</span>
              )}
              <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.85rem', lineHeight: 1.7, marginTop: '0.5rem', fontFamily: 'var(--font-sans)' }}>{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CONTATO ===== */}
      <section id="contato" style={{ textAlign: 'center', paddingBottom: '6rem' }}>
        <div className="reveal">
          <p className="section-label">{'// contato'}</p>
          <h2 className="section-title no-split" style={{ textAlign: 'center' }}>Vamos <span className="gradient-text">conversar</span>?</h2>
          <p style={{ color: 'var(--c-text-secondary)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: 1.7 }}>Aberto a oportunidades como AI Engineer, projetos freelance e colaborações técnicas.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {[
              { label: 'Por projeto', desc: 'Escopo fechado com prazo definido' },
              { label: 'Por sprint', desc: 'Sprints de 2 semanas' },
              { label: 'Consultoria', desc: 'Arquitetura e code review' },
            ].map((m) => (
              <div key={m.label} style={{ background: 'var(--c-bg-card)', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1.25rem', textAlign: 'center', minWidth: '140px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--c-text)', marginBottom: '0.25rem' }}>{m.label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--c-text-muted)' }}>{m.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal contact-cards-group" data-delay="0.5" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://wa.me/5511991625772" target="_blank" rel="noopener noreferrer" className="card-glass contact-card" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.5rem', textDecoration: 'none', color: 'var(--c-text)' }}>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="#22c55e"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--c-text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>WHATSAPP</div>
              <div style={{ fontSize: '0.85rem' }}>(11) 99162-5772</div>
            </div>
          </a>
          <a href="https://mail.google.com/mail/?view=cm&to=guilhermerbertolo@gmail.com" target="_blank" rel="noopener noreferrer" className="card-glass contact-card" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.5rem', textDecoration: 'none', color: 'var(--c-text)' }}>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--c-text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>EMAIL</div>
              <div style={{ fontSize: '0.85rem' }}>guilhermerbertolo@gmail.com</div>
            </div>
          </a>
          <a href="https://github.com/guibertolo" target="_blank" rel="noopener noreferrer" className="card-glass contact-card" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.5rem', textDecoration: 'none', color: 'var(--c-text)' }}>
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--c-text-muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>GITHUB</div>
              <div style={{ fontSize: '0.85rem' }}>@guibertolo</div>
            </div>
          </a>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ textAlign: 'center', padding: '2rem 1.5rem 5rem', borderTop: '1px solid var(--c-border)' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--c-text-quaternary)', letterSpacing: '0.05em' }}>
          &copy; 2026 Guilherme Bertolo | Built with Next.js, Tailwind &amp; AI
        </p>
      </footer>

      {/* ===== NAV ===== */}
      <nav className="floating-nav">
        {[
          { label: 'Sobre', href: '#sobre' },
          { label: 'Projetos', href: '#projetos' },
          { label: 'Processo', href: '#processo' },
          { label: 'XP', href: '#experiencia' },
          { label: 'Blog', href: '/blog' },
        ].map((link) => (
          <a key={link.href} href={link.href} className="nav-link" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--c-text-secondary)', textDecoration: 'none' }}>
            {link.label}
          </a>
        ))}
        <span style={{ width: '1px', height: '16px', background: 'var(--c-border)', flexShrink: 0, alignSelf: 'center' }} />
        <a href="#contato" className="nav-cta" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--c-accent)', textDecoration: 'none', fontWeight: 600, letterSpacing: '0.05em' }}>
          Contato
        </a>
      </nav>
    </main>
  );
}
