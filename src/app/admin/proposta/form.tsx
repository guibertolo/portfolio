'use client';

import { useState } from 'react';

interface Resultado {
  slug: string;
  url: string;
  urlLocal: string;
  gitOk: boolean;
  gitError: string | null;
  nomeCompleto: string;
  temSite: 'sim' | 'nao' | null;
}

const AREAS_SUGERIDAS = [
  'Direito de Família',
  'Direito Criminal',
  'Direito Trabalhista',
  'Direito Civil',
  'Direito Empresarial',
  'Direito Tributário',
  'Direito Previdenciário',
  'Direito do Consumidor',
  'Direito Imobiliário',
  'Direito Médico',
  'Direito Digital',
  'Sucessões',
  'M&A',
  'Compliance',
];

export function PropostaForm() {
  const [nome, setNome] = useState('');
  const [tratamento, setTratamento] = useState<'Dr.' | 'Dra.' | 'Doutor(a)'>('Dr.');
  const [areaAtuacao, setAreaAtuacao] = useState('');
  const [cidade, setCidade] = useState('');
  const [temSite, setTemSite] = useState<'sim' | 'nao' | 'desconhecido'>('desconhecido');

  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [statusDeploy, setStatusDeploy] = useState<'pendente' | 'aguardando' | 'pronto' | 'falha'>(
    'pendente',
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setErro(null);
    setResultado(null);
    setStatusDeploy('pendente');

    try {
      const res = await fetch('/api/admin/criar-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, tratamento, areaAtuacao, cidade, temSite }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErro(data.error || 'Erro desconhecido');
        return;
      }
      setResultado(data);
      if (data.gitOk) {
        setStatusDeploy('aguardando');
        // Polling do deploy: ping a URL de produção até retornar 200
        verificarDeploy(data.url);
      }
    } catch (e: unknown) {
      setErro(e instanceof Error ? e.message : 'Falha de rede');
    } finally {
      setEnviando(false);
    }
  }

  async function verificarDeploy(url: string) {
    // Aguarda inicial 60s antes de comecar polling
    await new Promise((r) => setTimeout(r, 60_000));
    for (let i = 0; i < 24; i++) {
      try {
        const r = await fetch(url, { method: 'HEAD', cache: 'no-store' });
        if (r.ok) {
          setStatusDeploy('pronto');
          return;
        }
      } catch {
        // ignora
      }
      await new Promise((r) => setTimeout(r, 5_000));
    }
    setStatusDeploy('falha');
  }

  function copiar(texto: string) {
    navigator.clipboard.writeText(texto);
  }

  function reset() {
    setNome('');
    setAreaAtuacao('');
    setCidade('');
    setTemSite('desconhecido');
    setResultado(null);
    setErro(null);
    setStatusDeploy('pendente');
  }

  if (resultado) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div
          style={{
            background: 'color-mix(in srgb, var(--c-success) 8%, var(--c-bg-card))',
            border: '1px solid color-mix(in srgb, var(--c-success) 40%, transparent)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.75rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--c-success)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontWeight: 600,
              marginBottom: '0.75rem',
            }}
          >
            ✓ Proposta criada
          </p>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.75rem',
              fontWeight: 600,
              marginBottom: '0.5rem',
            }}
          >
            {resultado.nomeCompleto}
          </h2>

          <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            slug: <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--c-accent)' }}>{resultado.slug}</code>
            {' · '}
            temSite: <strong>{resultado.temSite ?? 'desconhecido'}</strong>
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--c-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '0.5rem',
              }}
            >
              URL pública (mande pro lead)
            </p>
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
                background: 'var(--c-bg)',
                border: '1px solid var(--c-border)',
                borderRadius: 'var(--radius-md)',
                padding: '0.75rem 1rem',
              }}
            >
              <code
                style={{
                  flex: 1,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  color: 'var(--c-text)',
                  wordBreak: 'break-all',
                }}
              >
                {resultado.url}
              </code>
              <button
                type="button"
                onClick={() => copiar(resultado.url)}
                className="btn-ghost-sm"
                style={{ flexShrink: 0, cursor: 'pointer' }}
              >
                Copiar
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--c-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '0.5rem',
              }}
            >
              Status do deploy
            </p>
            {statusDeploy === 'aguardando' && (
              <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.9rem' }}>
                ⏳ Aguardando Vercel finalizar build (até ~90s). Você pode mandar a URL agora — quando
                o deploy concluir, abrirá automático.
              </p>
            )}
            {statusDeploy === 'pronto' && (
              <p style={{ color: 'var(--c-success)', fontSize: '0.9rem', fontWeight: 500 }}>
                ✓ No ar! URL respondendo 200. Pode mandar pro lead.
              </p>
            )}
            {statusDeploy === 'falha' && (
              <p style={{ color: '#f87171', fontSize: '0.9rem' }}>
                ⚠ Não consegui confirmar deploy em 2min. Pode estar OK mesmo assim — abre a URL no
                navegador pra checar.
              </p>
            )}
          </div>

          {!resultado.gitOk && (
            <div
              style={{
                background: 'rgba(248, 113, 113, 0.08)',
                border: '1px solid rgba(248, 113, 113, 0.4)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                marginBottom: '1rem',
              }}
            >
              <p style={{ color: '#f87171', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                ⚠ Git push falhou
              </p>
              <p style={{ color: 'var(--c-text-secondary)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                O lead foi salvo no leads.json mas não subiu pro GitHub. Rode no terminal:
              </p>
              <code
                style={{
                  display: 'block',
                  background: 'var(--c-bg)',
                  padding: '0.6rem 0.85rem',
                  borderRadius: 'var(--radius-sm)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'var(--c-text)',
                }}
              >
                git push origin main
              </code>
              {resultado.gitError && (
                <details style={{ marginTop: '0.75rem' }}>
                  <summary style={{ fontSize: '0.75rem', color: 'var(--c-text-muted)', cursor: 'pointer' }}>
                    Ver erro
                  </summary>
                  <pre
                    style={{
                      marginTop: '0.5rem',
                      padding: '0.5rem',
                      background: 'var(--c-bg)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.7rem',
                      color: 'var(--c-text-muted)',
                      overflow: 'auto',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {resultado.gitError}
                  </pre>
                </details>
              )}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href={resultado.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Abrir proposta
            </a>
            <button type="button" onClick={reset} className="btn-ghost" style={{ cursor: 'pointer' }}>
              Criar outra
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        background: 'var(--c-bg-card)',
        border: '1px solid var(--c-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
      }}
    >
      {/* Nome */}
      <Field label="Nome completo *">
        <input
          type="text"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: João da Silva"
          style={inputStyle}
        />
      </Field>

      {/* Tratamento */}
      <Field label="Tratamento *">
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {(['Dr.', 'Dra.', 'Doutor(a)'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTratamento(t)}
              style={{
                padding: '0.55rem 1.25rem',
                background: tratamento === t ? 'color-mix(in srgb, var(--c-accent) 20%, transparent)' : 'transparent',
                border: `1px solid ${tratamento === t ? 'var(--c-accent)' : 'var(--c-border)'}`,
                borderRadius: '9999px',
                color: tratamento === t ? 'var(--c-accent)' : 'var(--c-text-secondary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: tratamento === t ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </Field>

      {/* Area */}
      <Field label="Área de atuação" hint="opcional, mas ajuda a personalizar">
        <input
          type="text"
          value={areaAtuacao}
          onChange={(e) => setAreaAtuacao(e.target.value)}
          placeholder="Ex: Direito de Família"
          list="areas"
          style={inputStyle}
        />
        <datalist id="areas">
          {AREAS_SUGERIDAS.map((a) => (
            <option key={a} value={a} />
          ))}
        </datalist>
      </Field>

      {/* Cidade */}
      <Field label="Cidade" hint="opcional, ex: São Paulo, SP">
        <input
          type="text"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          placeholder="Ex: São Paulo, SP"
          style={inputStyle}
        />
      </Field>

      {/* Tem site */}
      <Field label="Já tem site? *" hint="muda o pitch da proposta">
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {(
            [
              { v: 'sim', label: 'Sim, tem site' },
              { v: 'nao', label: 'Não tem site' },
              { v: 'desconhecido', label: 'Não sei' },
            ] as const
          ).map((opt) => (
            <button
              key={opt.v}
              type="button"
              onClick={() => setTemSite(opt.v)}
              style={{
                padding: '0.55rem 1.25rem',
                background: temSite === opt.v ? 'color-mix(in srgb, var(--c-accent) 20%, transparent)' : 'transparent',
                border: `1px solid ${temSite === opt.v ? 'var(--c-accent)' : 'var(--c-border)'}`,
                borderRadius: '9999px',
                color: temSite === opt.v ? 'var(--c-accent)' : 'var(--c-text-secondary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.85rem',
                fontWeight: temSite === opt.v ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </Field>

      {erro && (
        <div
          style={{
            padding: '0.85rem 1rem',
            background: 'rgba(248, 113, 113, 0.08)',
            border: '1px solid rgba(248, 113, 113, 0.4)',
            borderRadius: 'var(--radius-md)',
            color: '#f87171',
            fontSize: '0.85rem',
          }}
        >
          {erro}
        </div>
      )}

      <button type="submit" disabled={enviando || !nome.trim()} className="btn-primary" style={{ cursor: enviando || !nome.trim() ? 'not-allowed' : 'pointer', opacity: enviando || !nome.trim() ? 0.6 : 1 }}>
        {enviando ? 'Gerando e publicando...' : 'Gerar e publicar proposta'}
      </button>

      <p style={{ fontSize: '0.75rem', color: 'var(--c-text-muted)', lineHeight: 1.6 }}>
        Ao clicar, vai criar slug com hash, adicionar no leads.json, fazer commit + push pro GitHub, e
        Vercel deploya em ~90s. Você recebe a URL pra mandar pro lead.
      </p>
    </form>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--c-text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          marginBottom: '0.5rem',
          fontWeight: 600,
        }}
      >
        {label}
      </label>
      {children}
      {hint && (
        <p style={{ fontSize: '0.75rem', color: 'var(--c-text-muted)', marginTop: '0.4rem' }}>
          {hint}
        </p>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem 1rem',
  background: 'var(--c-bg)',
  border: '1px solid var(--c-border)',
  borderRadius: 'var(--radius-md)',
  color: 'var(--c-text)',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.95rem',
};
