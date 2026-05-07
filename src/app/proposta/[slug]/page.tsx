import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import leads from '../../../data/leads.json';

interface Lead {
  slug: string;
  tratamento: string;
  nome: string | null;
  areaAtuacao: string | null;
  cidade: string | null;
}

const LEADS = leads as Lead[];

// Numero do WhatsApp pra contato (substituir pelo definitivo da campanha)
const WHATSAPP_NUMBER = '5511999999999';

export async function generateStaticParams() {
  return LEADS.map((lead) => ({ slug: lead.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lead = LEADS.find((l) => l.slug === slug);
  if (!lead) return { title: 'Proposta' };

  const titleName = lead.nome || lead.tratamento;

  return {
    title: `Proposta de site para ${titleName} | Guilherme Bertolo`,
    description: `Proposta personalizada de site institucional para ${titleName}. Padrao Lighthouse 95+, SEO local, captacao por WhatsApp.`,
    robots: { index: false, follow: false },
  };
}

export default async function PropostaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lead = LEADS.find((l) => l.slug === slug);
  if (!lead) notFound();

  const saudacao = lead.nome
    ? `${lead.tratamento} ${lead.nome}`
    : lead.tratamento;

  const headlineNome = lead.nome
    ? `${lead.tratamento} ${lead.nome},`
    : `${lead.tratamento},`;

  const whatsappMsg = encodeURIComponent(
    `Olá Guilherme, vi a proposta de site${lead.nome ? ` para ${lead.tratamento} ${lead.nome}` : ''} e quero seguir.`,
  );
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}&utm_source=proposta&utm_lead=${lead.slug}`;

  return (
    <div style={{ color: 'var(--c-text)', minHeight: '100vh', position: 'relative' }}>
      <div className="bg-continuity" />
      <div className="bg-noise" />

      {/* ============== HERO ============== */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 1.5rem 3rem', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', padding: '0.3rem 0.75rem', borderRadius: '9999px', background: 'color-mix(in srgb, var(--c-accent) 15%, transparent)', color: 'var(--c-accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
            Proposta
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--c-text-muted)', letterSpacing: '0.1em' }}>
            valida por 7 dias
          </span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.25rem, 6vw, 3.75rem)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
          {headlineNome}
          <br />
          seu site hoje custa <span className="gradient-text">clientes</span>.
          <br />
          Vamos consertar em 30 dias.
        </h1>

        <p style={{ color: 'var(--c-text-secondary)', fontSize: '1.15rem', lineHeight: 1.7, maxWidth: '640px', marginBottom: '2.5rem' }}>
          Site institucional sob medida no padrao que o Vinicius Nunes prega: autoridade, captacao por WhatsApp, SEO local, performance que nao espanta cliente no celular.
          {lead.cidade ? ` Pensado pra advocacia em ${lead.cidade}.` : ''}
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Aceitar proposta no WhatsApp
          </a>
          <a href="#pacotes" className="btn-ghost">
            Ver pacotes e preço
          </a>
        </div>
      </section>

      {/* ============== PROVA SOCIAL ============== */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem 3rem', position: 'relative', zIndex: 1 }}>
        <div className="card-glass" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--c-success)', boxShadow: '0 0 12px var(--c-success)' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--c-success)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
              Live em produção
            </span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 600, marginBottom: '0.5rem' }}>
            Dra. Gislaine Rodrigues
          </h2>
          <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Direito de Família · São Bernardo do Campo, SP
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
            {[
              { score: 96, label: 'Performance' },
              { score: 100, label: 'Acessibilidade' },
              { score: 100, label: 'Boas práticas' },
              { score: 100, label: 'SEO' },
            ].map((m) => (
              <div key={m.label} style={{ background: 'rgba(34, 197, 94, 0.05)', border: '1px solid color-mix(in srgb, var(--c-success) 25%, transparent)', borderRadius: 'var(--radius-md)', padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--c-success)', lineHeight: 1 }}>
                  {m.score}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '0.5rem' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <a href="https://advogadagislainerodrigues.com.br" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--c-accent)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            Ver site da Dra. Gislaine →
          </a>

          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--c-border)', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--c-accent)', flexShrink: 0, marginTop: '0.1rem' }}>
              ⚠
            </div>
            <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--c-text)' }}>O site dela é referência de qualidade técnica, não template do seu.</strong> Cada cliente recebe identidade visual única (paleta, tipografia, layout próprio). O que se reaproveita é só o invisível: código base, infra, padrões de SEO. Está garantido em contrato.
            </p>
          </div>
        </div>
      </section>

      {/* ============== DIAGNOSTICO ============== */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem', position: 'relative', zIndex: 1 }}>
        <p className="section-label">01. Diagnóstico</p>
        <h2 className="section-title" style={{ marginBottom: '2rem' }}>
          O que segura sua captação <span className="gradient-text">não é o anúncio</span>. É o site que recebe o lead.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {[
            {
              titulo: 'Site lento espanta',
              texto: 'Cliente abre no celular no semáforo. Se demora 4 segundos, ele já fechou. O Lighthouse mede isso. A maioria dos sites de escritório fica abaixo de 60.',
            },
            {
              titulo: 'Genérico não converte',
              texto: 'Template de massa transmite "qualquer um pode fazer isso". Lead investiga o site antes de marcar a primeira reunião e desiste sem você saber.',
            },
            {
              titulo: 'Sem SEO local, ninguém acha',
              texto: 'Quem busca "advogado [sua área] [sua cidade]" no Google só vê quem otimizou pra isso. Sem schema markup e dados estruturados, você fica invisível.',
            },
          ].map((d) => (
            <div key={d.titulo} className="card-glass">
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--c-accent)' }}>
                {d.titulo}
              </h3>
              <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {d.texto}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============== O QUE VOCE RECEBE ============== */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem', position: 'relative', zIndex: 1 }}>
        <p className="section-label">02. O que você recebe</p>
        <h2 className="section-title" style={{ marginBottom: '2rem' }}>
          Site institucional <span className="gradient-text">no padrão técnico</span> que advogado de sucesso precisa.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {[
            { t: 'Stack moderna', d: 'Next.js + Tailwind + Vercel. Mesma tecnologia que Netflix, Notion e TikTok usam.' },
            { t: 'Lighthouse 95+', d: 'Performance, acessibilidade, SEO, boas práticas. Mensurável e auditável.' },
            { t: 'SEO local', d: 'Schema markup completo (LocalBusiness, LegalService, Attorney). Aparece em buscas locais.' },
            { t: 'Mobile-first', d: 'Cliente abre no celular. Site é desenhado pro celular primeiro, desktop depois.' },
            { t: 'LGPD completo', d: 'Banner de cookies, política de privacidade, opt-in. Sem multa.' },
            { t: 'Painel admin', d: 'Você edita depoimentos, blog e textos sem precisar me chamar.' },
            { t: 'Email integrado', d: 'Formulário do site cai no seu email + WhatsApp. Sem perder lead.' },
            { t: 'Identidade única', d: 'Paleta, tipografia e layout próprios. Não é template repetido.' },
          ].map((f) => (
            <div key={f.t} className="card-glass">
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                {f.t}
              </h3>
              <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.8rem', lineHeight: 1.55 }}>
                {f.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============== PROMO GALERIA DE ESTILOS ============== */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem', position: 'relative', zIndex: 1 }}>
        <Link
          href="/proposta/estilos"
          style={{
            display: 'block',
            background: 'var(--c-bg-card)',
            border: '1px solid color-mix(in srgb, var(--c-accent) 30%, transparent)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'border-color 0.3s ease, transform 0.3s ease, background 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', padding: '0.3rem 0.75rem', borderRadius: '9999px', background: 'color-mix(in srgb, var(--c-accent) 15%, transparent)', color: 'var(--c-accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
              Antes de ver pacotes
            </span>
          </div>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3.5vw, 2rem)', fontWeight: 600, lineHeight: 1.2, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Quer ver as <span className="gradient-text">6 direções estéticas</span> possíveis?
          </h3>

          <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '640px' }}>
            São seis caminhos autorais pra advocacia: do sóbrio clássico ao boutique premium, do acolhedor ao tecnológico. Cada um com paleta, fontes e atmosfera próprias. Você reconhece o seu, customizamos a partir dele. Não são templates, são pontos de partida.
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--c-accent)', fontWeight: 600, letterSpacing: '0.05em' }}>
            Ver as 6 direções estéticas
            <span style={{ fontSize: '1rem' }}>→</span>
          </div>
        </Link>
      </section>

      {/* ============== PACOTES E PRECO ============== */}
      <section id="pacotes" style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem', position: 'relative', zIndex: 1 }}>
        <p className="section-label">03. Pacotes</p>
        <h2 className="section-title" style={{ marginBottom: '2rem' }}>
          Dois pacotes. <span className="gradient-text">Sem letra miúda.</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {/* Pacote Site */}
          <div className="card-glass" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                Site
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                Você fornece logo e fotos
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700 }}>
                  R$ 2.200
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--c-text-muted)' }}>
                  à vista (PIX)
                </span>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--c-text-secondary)' }}>
                ou R$ 2.500 parcelado em 50/50
              </p>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem', flexGrow: 1 }}>
              {['Site completo (até 25 páginas)', 'SEO local + schema markup', 'Painel admin', 'Formulário com email', 'LGPD completo', 'Lighthouse 95+', 'Mobile-first', 'Identidade visual única'].map((item) => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', padding: '0.4rem 0', fontSize: '0.85rem', color: 'var(--c-text-secondary)' }}>
                  <span style={{ color: 'var(--c-success)', flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Pacote Site Completo */}
          <div className="card-glass project-featured" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <span style={{ position: 'absolute', top: '-10px', right: '1.5rem', background: 'var(--c-accent)', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', padding: '0.3rem 0.75rem', borderRadius: '9999px', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
              Recomendado
            </span>

            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                Site Completo
              </h3>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                Inclui logo (designer parceiro) + fotos IA
              </p>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span className="gradient-text" style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700 }}>
                  R$ 2.500
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--c-text-muted)' }}>
                  à vista (PIX)
                </span>
              </div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--c-text-secondary)' }}>
                ou R$ 2.700 parcelado em 50/50
              </p>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem', flexGrow: 1 }}>
              {['Tudo do pacote Site, mais:', 'Logo via designer parceiro (autoral, sob medida)', 'Pacote 8-12 fotos profissionais (IA)', 'Direção visual completa', 'Variações pra Instagram/LinkedIn'].map((item, i) => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', padding: '0.4rem 0', fontSize: '0.85rem', color: i === 0 ? 'var(--c-text)' : 'var(--c-text-secondary)', fontWeight: i === 0 ? 600 : 400 }}>
                  <span style={{ color: 'var(--c-accent)', flexShrink: 0 }}>{i === 0 ? '★' : '✓'}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mensalidade */}
        <div style={{ marginTop: '1rem', padding: '1.25rem', background: 'var(--c-bg-card)', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-md)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--c-text-muted)', marginBottom: '0.25rem' }}>
              Mensalidade
            </h4>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 600 }}>
              R$ 150/mês
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--c-text-secondary)', marginTop: '0.25rem' }}>
              Hospedagem premium (Vercel) + manutenção + admin + 2 alterações pequenas/mês
            </p>
          </div>
        </div>

        {/* Avulsos */}
        <div style={{ marginTop: '1rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
            Serviços avulsos (se quiser depois)
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.5rem' }}>
            {[
              { t: 'Logo via designer parceiro', v: 'R$ 200' },
              { t: '8-12 fotos via IA', v: 'R$ 300' },
              { t: 'Combo logo + fotos', v: 'R$ 400' },
            ].map((a) => (
              <div key={a.t} style={{ padding: '0.75rem 1rem', background: 'var(--c-bg-card)', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--c-text-secondary)' }}>{a.t}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600 }}>{a.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== COMO FUNCIONA ============== */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem', position: 'relative', zIndex: 1 }}>
        <p className="section-label">04. Como funciona</p>
        <h2 className="section-title" style={{ marginBottom: '2.5rem' }}>
          30 dias do <span className="gradient-text">briefing ao site no ar</span>.
        </h2>

        <div>
          {[
            { sem: 'Semana 1', titulo: 'Briefing + wireframe', desc: 'Você responde um formulário detalhado. Eu monto o mapa de telas. Você aprova.' },
            { sem: 'Semana 2', titulo: 'Design visual', desc: 'Identidade visual única: paleta, tipografia, layout sob medida. Você revisa, ajusta.' },
            { sem: 'Semana 3', titulo: 'Desenvolvimento', desc: 'Eu codo. Você fornece o conteúdo final (textos, fotos, depoimentos).' },
            { sem: 'Semana 4', titulo: 'Ajustes + deploy', desc: 'Última rodada de ajustes, deploy na Vercel, configuração de domínio. Site no ar.' },
          ].map((p, i) => (
            <div key={p.sem} className="timeline-item" style={{ paddingBottom: i === 3 ? 0 : '2rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--c-accent)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.4rem' }}>
                {p.sem}
              </p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                {p.titulo}
              </h3>
              <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============== FAQ ============== */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem', position: 'relative', zIndex: 1 }}>
        <p className="section-label">05. FAQ</p>
        <h2 className="section-title" style={{ marginBottom: '2rem' }}>
          Perguntas comuns.
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {([
            {
              q: 'Como vai ficar o visual?',
              a: (
                <>
                  Cada projeto começa com uma direção estética escolhida no briefing. Tenho seis direções autorais base pra advocacia (sóbria clássica, moderna minimalista, boutique premium, acolhedora, técnica, refinada feminina), e a partir da que você escolher, customizamos paleta, tipografia e layout pra ficar único pro seu escritório.{' '}
                  <Link href="/proposta/estilos" style={{ color: 'var(--c-accent)', textDecoration: 'underline', fontWeight: 500 }}>
                    Ver as 6 direções estéticas →
                  </Link>
                </>
              ),
            },
            {
              q: 'Eu já tenho site, preciso trocar?',
              a: 'Depende. Se ele converte o tráfego que você paga, não. Se não, sim. Posso fazer um diagnóstico gratuito (Lighthouse + SEO local + análise mobile) em 5 minutos. Me chama no WhatsApp, manda o link, eu te devolvo o report.',
            },
            {
              q: 'Vou ficar igual à Dra. Gislaine ou a outros clientes seus?',
              a: 'Não. Cada cliente recebe identidade única: paleta, tipografia, layout, copy próprios. O que se reaproveita entre meus clientes é só o invisível (código base, infra, padrões técnicos de SEO). Está garantido em contrato (Cláusula 1, parágrafo único + Cláusula 9, item B).',
            },
            {
              q: 'Posso pagar depois?',
              a: 'Funciono com 50/50: 50% no aceite (entrada) e 50% na entrega (depois do site no ar e aprovado). PIX MercadoPago, sem taxa. Se preferir parcelar mais, dá pra cartão de crédito do MP em até 12x (com juros do MP, ~2.5% ao mês).',
            },
            {
              q: 'E se eu não gostar?',
              a: 'Trabalho com 2 rodadas de ajuste de wireframe + 2 de design + 1 final, todas inclusas. Se mesmo assim não casar (raro), devolvo 50% do valor pago. Risco controlado.',
            },
            {
              q: 'Quanto tempo eu gasto pessoalmente nisso?',
              a: 'Briefing inicial 30-45 min. Aprovações de wireframe e design 15-20 min cada. Total ao longo de 30 dias: 2-3 horas distribuídas. Eu cuido de tudo o resto.',
            },
            {
              q: 'Não sou advogado de família, faz sentido pra mim?',
              a: 'Sim. O padrão de site (autoridade, captação, SEO local, conversão por WhatsApp) funciona pra qualquer área da advocacia. A Dra. Gislaine é família, mas o método se adapta.',
            },
          ] as { q: string; a: React.ReactNode }[]).map((item) => (
            <details
              key={item.q}
              style={{ background: 'var(--c-bg-card)', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem' }}
            >
              <summary style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 500, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <span>{item.q}</span>
                <span style={{ color: 'var(--c-accent)', fontSize: '1.25rem', fontWeight: 300, flexShrink: 0 }}>+</span>
              </summary>
              <div style={{ color: 'var(--c-text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--c-border)' }}>
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ============== SOBRE O GUILHERME ============== */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem', position: 'relative', zIndex: 1 }}>
        <p className="section-label">06. Quem vai fazer</p>
        <div className="card-glass" style={{ padding: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>
            Guilherme Bertolo, dev solo.
          </h2>
          <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>
            Sem agência, sem 5 níveis de aprovação, sem gerente de projeto pra repassar suas mensagens. Você fala diretamente comigo, em qualquer hora útil.
          </p>
          <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.95rem', lineHeight: 1.7 }}>
            Já entreguei o site da Dra. Gislaine (live, em produção). Construo com Next.js + Tailwind + Vercel, mesmo padrão de empresas como Notion e TikTok. Foco em performance e captação real, não em efeito visual sem propósito.
          </p>
        </div>
      </section>

      {/* ============== CTA FINAL ============== */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <h2 className="section-title" style={{ marginBottom: '1rem' }}>
          Topa começar?
        </h2>
        <p style={{ color: 'var(--c-text-secondary)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto 2rem' }}>
          Em 30 dias seu site está no ar. Em 60, captando lead via Google.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Aceitar e começar no WhatsApp
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá Guilherme, queria conversar 15min sobre a proposta${lead.nome ? ` (${lead.tratamento} ${lead.nome})` : ''}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            Conversar 15 min antes
          </a>
        </div>
      </section>

      {/* ============== FOOTER ============== */}
      <footer style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem 4rem', position: 'relative', zIndex: 1, borderTop: '1px solid var(--c-border)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', marginTop: '2rem' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.25rem' }}>
              Proposta para
            </p>
            <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>
              {saudacao}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--c-text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.25rem' }}>
              Validade
            </p>
            <p style={{ fontSize: '0.95rem' }}>
              7 dias do envio
            </p>
          </div>
        </div>
        <p style={{ fontSize: '0.75rem', color: 'var(--c-text-muted)', marginTop: '2rem', textAlign: 'center', lineHeight: 1.6 }}>
          Guilherme Bertolo · Desenvolvimento de sites · guilhermebertolo.com.br
          <br />
          <Link href="/" style={{ color: 'var(--c-text-muted)', textDecoration: 'underline' }}>
            ← Voltar pro portfólio
          </Link>
        </p>
      </footer>
    </div>
  );
}
