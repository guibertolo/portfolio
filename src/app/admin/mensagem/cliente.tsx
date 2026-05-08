'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { TEMPLATES, getTemplateById } from '@/data/templates-mensagem';

interface Lead {
  telefone: string;
  ddd: string;
  uf: string;
  regiao: string;
  onda: number | null;
  status: 'pendente' | 'enviado' | 'respondeu' | 'em_conversa' | 'negou' | 'frio' | 'promovido';
  nome: string | null;
  sexo: 'M' | 'F' | null;
  tratamento: 'Dr.' | 'Dra.' | 'Doutor(a)' | null;
  templateUsado: string | null;
  dataEnvio: string | null;
  dataResposta: string | null;
  observacao: string | null;
  promovidoPara: string | null;
}

const STATUS_LABEL: Record<Lead['status'], string> = {
  pendente: 'Pendente',
  enviado: 'Enviado',
  respondeu: 'Respondeu',
  em_conversa: 'Em conversa',
  negou: 'Negou',
  frio: 'Frio',
  promovido: 'Promovido',
};

const STATUS_COR: Record<Lead['status'], string> = {
  pendente: 'var(--c-text-muted)',
  enviado: '#3b82f6',
  respondeu: 'var(--c-success)',
  em_conversa: 'var(--c-accent)',
  negou: '#ef4444',
  frio: '#a78bfa',
  promovido: 'var(--c-success)',
};

export function MensagemCliente() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Record<string, number>>({});
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<Lead['status'] | 'todos'>('pendente');
  const [filtroOnda, setFiltroOnda] = useState<number | 'todas'>('todas');
  const [expandido, setExpandido] = useState<string | null>(null);

  // Carrega leads
  async function recarregar() {
    setCarregando(true);
    try {
      const res = await fetch('/api/admin/leads-mensagem', { cache: 'no-store' });
      const data = await res.json();
      setLeads(data.leads || []);
      setStats(data.stats || {});
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    recarregar();
  }, []);

  // Filtragem
  const filtrados = useMemo(() => {
    return leads.filter((l) => {
      if (filtroStatus !== 'todos' && l.status !== filtroStatus) return false;
      if (filtroOnda !== 'todas' && l.onda !== filtroOnda) return false;
      if (busca.trim()) {
        const b = busca.replace(/\D/g, '');
        if (b && !l.telefone.includes(b)) {
          if (!l.nome?.toLowerCase().includes(busca.toLowerCase())) return false;
        }
      }
      return true;
    });
  }, [leads, busca, filtroStatus, filtroOnda]);

  if (carregando) {
    return (
      <div style={{ color: 'var(--c-text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
        Carregando 497 leads...
      </div>
    );
  }

  return (
    <div>
      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '0.75rem',
          marginBottom: '2rem',
        }}
      >
        <StatCard label="Total" valor={leads.length} cor="var(--c-text-secondary)" />
        <StatCard label="Pendente" valor={stats.pendente || 0} cor={STATUS_COR.pendente} />
        <StatCard label="Enviado" valor={stats.enviado || 0} cor={STATUS_COR.enviado} />
        <StatCard label="Respondeu" valor={stats.respondeu || 0} cor={STATUS_COR.respondeu} />
        <StatCard label="Negou" valor={stats.negou || 0} cor={STATUS_COR.negou} />
      </div>

      {/* Busca + Filtros */}
      <div
        style={{
          background: 'var(--c-bg-card)',
          border: '1px solid var(--c-border)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        <input
          type="text"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Busca por telefone (digite só números) ou nome..."
          style={{
            width: '100%',
            padding: '0.65rem 0.85rem',
            background: 'var(--c-bg)',
            border: '1px solid var(--c-border)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--c-text)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
          }}
        />

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <FiltroChip
            label="Todos"
            ativo={filtroStatus === 'todos'}
            onClick={() => setFiltroStatus('todos')}
          />
          {(['pendente', 'enviado', 'respondeu', 'em_conversa', 'negou', 'frio', 'promovido'] as const).map(
            (s) => (
              <FiltroChip
                key={s}
                label={`${STATUS_LABEL[s]} (${stats[s] || 0})`}
                ativo={filtroStatus === s}
                onClick={() => setFiltroStatus(s)}
                cor={STATUS_COR[s]}
              />
            ),
          )}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--c-text-muted)',
              alignSelf: 'center',
              marginRight: '0.5rem',
            }}
          >
            Onda:
          </span>
          <FiltroChip
            label="Todas"
            ativo={filtroOnda === 'todas'}
            onClick={() => setFiltroOnda('todas')}
          />
          {[1, 2, 3].map((o) => (
            <FiltroChip
              key={o}
              label={`${o}`}
              ativo={filtroOnda === o}
              onClick={() => setFiltroOnda(o)}
            />
          ))}
        </div>
      </div>

      {/* Contagem */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--c-text-muted)',
          marginBottom: '1rem',
        }}
      >
        {filtrados.length} {filtrados.length === 1 ? 'lead' : 'leads'} encontrado(s)
      </p>

      {/* Lista */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {filtrados.slice(0, 50).map((lead) => (
          <LeadItem
            key={lead.telefone}
            lead={lead}
            expandido={expandido === lead.telefone}
            onToggle={() =>
              setExpandido((c) => (c === lead.telefone ? null : lead.telefone))
            }
            onUpdate={recarregar}
          />
        ))}
      </div>

      {filtrados.length > 50 && (
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--c-text-muted)',
            marginTop: '1.5rem',
            textAlign: 'center',
          }}
        >
          Mostrando primeiros 50 de {filtrados.length}. Refina a busca pra ver mais.
        </p>
      )}
    </div>
  );
}

function StatCard({ label, valor, cor }: { label: string; valor: number; cor: string }) {
  return (
    <div
      style={{
        background: 'var(--c-bg-card)',
        border: '1px solid var(--c-border)',
        borderRadius: 'var(--radius-sm)',
        padding: '0.75rem 1rem',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.55rem',
          color: 'var(--c-text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          marginBottom: '0.25rem',
        }}
      >
        {label}
      </p>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: cor }}>
        {valor}
      </p>
    </div>
  );
}

function FiltroChip({
  label,
  ativo,
  onClick,
  cor,
}: {
  label: string;
  ativo: boolean;
  onClick: () => void;
  cor?: string;
}) {
  const corAtiva = cor || 'var(--c-accent)';
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '0.4rem 0.85rem',
        background: ativo ? `color-mix(in srgb, ${corAtiva} 20%, transparent)` : 'transparent',
        border: `1px solid ${ativo ? corAtiva : 'var(--c-border)'}`,
        borderRadius: '9999px',
        color: ativo ? corAtiva : 'var(--c-text-secondary)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        fontWeight: ativo ? 600 : 400,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      {label}
    </button>
  );
}

function LeadItem({
  lead,
  expandido,
  onToggle,
  onUpdate,
}: {
  lead: Lead;
  expandido: boolean;
  onToggle: () => void;
  onUpdate: () => void;
}) {
  return (
    <article
      style={{
        background: 'var(--c-bg-card)',
        border: '1px solid var(--c-border)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease',
        borderColor: expandido
          ? 'color-mix(in srgb, var(--c-accent) 35%, transparent)'
          : 'var(--c-border)',
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        style={{
          width: '100%',
          padding: '0.85rem 1rem',
          background: 'transparent',
          border: 'none',
          textAlign: 'left',
          cursor: 'pointer',
          color: 'inherit',
          fontFamily: 'inherit',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                padding: '0.2rem 0.55rem',
                borderRadius: '9999px',
                background: `color-mix(in srgb, ${STATUS_COR[lead.status]} 18%, transparent)`,
                color: STATUS_COR[lead.status],
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600,
              }}
            >
              {STATUS_LABEL[lead.status]}
            </span>

            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--c-text)' }}>
              {lead.telefone}
            </span>

            {lead.nome && (
              <span style={{ fontSize: '0.85rem', color: 'var(--c-text)', fontWeight: 500 }}>
                {lead.tratamento} {lead.nome}
              </span>
            )}
          </div>

          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--c-text-muted)' }}>
            DDD {lead.ddd} · {lead.uf} · Onda {lead.onda} · {lead.regiao}
          </p>
        </div>

        <span
          style={{
            color: 'var(--c-accent)',
            fontSize: '1.25rem',
            fontWeight: 300,
            flexShrink: 0,
            transition: 'transform 0.3s ease',
            transform: expandido ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          +
        </span>
      </button>

      {expandido && <PainelDetalhe lead={lead} onUpdate={onUpdate} />}
    </article>
  );
}

function PainelDetalhe({ lead, onUpdate }: { lead: Lead; onUpdate: () => void }) {
  const [nome, setNome] = useState(lead.nome ?? '');
  const [sexo, setSexo] = useState<'M' | 'F' | null>(lead.sexo);
  const [tratamento, setTratamento] = useState<'Dr.' | 'Dra.' | 'Doutor(a)'>(
    lead.tratamento ?? (lead.sexo === 'F' ? 'Dra.' : 'Dr.'),
  );
  const [templateId, setTemplateId] = useState<string>(lead.templateUsado || 'a');
  const [salvando, setSalvando] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // Toggle M/F: clicar no ja selecionado deseleciona
  function ajustarSexo(s: 'M' | 'F') {
    if (sexo === s) {
      setSexo(null);
      setTratamento('Doutor(a)');
      return;
    }
    setSexo(s);
    if (tratamento === 'Doutor(a)' || (s === 'F' && tratamento === 'Dr.') || (s === 'M' && tratamento === 'Dra.')) {
      setTratamento(s === 'F' ? 'Dra.' : 'Dr.');
    }
  }

  // Mensagem gerada
  const template = getTemplateById(templateId);
  const mensagem = template
    ? template.gerar({
        nome: nome.trim(),
        tratamento,
        sexo,
      })
    : '';

  async function copiar() {
    if (!mensagem) return;
    await navigator.clipboard.writeText(mensagem);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  async function patch(payload: Partial<Lead>) {
    setSalvando(true);
    setErro(null);
    try {
      const res = await fetch(`/api/admin/leads-mensagem/${encodeURIComponent(lead.telefone)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setErro(data.error || 'Falha ao salvar');
        return;
      }
      if (!data.gitOk) {
        setErro(`Salvou local mas git push falhou: ${data.gitError || 'erro'}`);
      }
      onUpdate();
    } catch (e) {
      setErro(e instanceof Error ? e.message : 'Erro de rede');
    } finally {
      setSalvando(false);
    }
  }

  async function marcarEnviado() {
    const faltando: string[] = [];
    if (!nome.trim()) faltando.push('nome');
    if (!sexo) faltando.push('sexo');
    if (faltando.length > 0) {
      setErro(`Preenche antes: ${faltando.join(' e ')}`);
      return;
    }
    await patch({
      nome: nome.trim(),
      sexo,
      tratamento,
      templateUsado: templateId,
      status: 'enviado',
    });
  }

  // Autosave com debounce de 1s
  const [autosave, setAutosave] = useState<'idle' | 'aguardando' | 'salvando' | 'salvo' | 'erro'>(
    'idle',
  );
  const skipFirst = useRef(true);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (skipFirst.current) {
      skipFirst.current = false;
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    // Detecta se houve mudanca em relacao ao lead persistido
    const mudou =
      (nome.trim() || null) !== (lead.nome || null) ||
      sexo !== lead.sexo ||
      (tratamento !== (lead.tratamento || 'Dr.')) ||
      (templateId !== (lead.templateUsado || 'a'));

    if (!mudou) {
      setAutosave('idle');
      return;
    }

    setAutosave('aguardando');

    debounceRef.current = setTimeout(() => {
      void (async () => {
        setAutosave('salvando');
        try {
          const res = await fetch(
            `/api/admin/leads-mensagem/${encodeURIComponent(lead.telefone)}`,
            {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                nome: nome.trim() || null,
                sexo,
                tratamento,
                templateUsado: templateId,
              }),
            },
          );
          if (res.ok) {
            setAutosave('salvo');
            onUpdate();
            setTimeout(() => setAutosave('idle'), 1500);
          } else {
            setAutosave('erro');
          }
        } catch {
          setAutosave('erro');
        }
      })();
    }, 1000);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nome, sexo, tratamento, templateId]);

  return (
    <div
      style={{
        padding: '1.25rem',
        borderTop: '1px solid var(--c-border)',
        background: 'var(--c-bg)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}
    >
      {/* Form */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
        <div>
          <Label>Nome do contato</Label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: João Silva"
            style={inputStyle}
          />
        </div>

        <div>
          <Label>Sexo</Label>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <ToggleBtn label="M" ativo={sexo === 'M'} onClick={() => ajustarSexo('M')} />
            <ToggleBtn label="F" ativo={sexo === 'F'} onClick={() => ajustarSexo('F')} />
          </div>
        </div>

        <div>
          <Label>Tratamento</Label>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {(['Dr.', 'Dra.', 'Doutor(a)'] as const).map((t) => (
              <ToggleBtn
                key={t}
                label={t}
                ativo={tratamento === t}
                onClick={() => setTratamento(t)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Template */}
      <div>
        <Label>Template</Label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTemplateId(t.id)}
              style={{
                padding: '0.5rem 1rem',
                background:
                  templateId === t.id
                    ? 'color-mix(in srgb, var(--c-accent) 20%, transparent)'
                    : 'transparent',
                border: `1px solid ${templateId === t.id ? 'var(--c-accent)' : 'var(--c-border)'}`,
                borderRadius: '9999px',
                color: templateId === t.id ? 'var(--c-accent)' : 'var(--c-text-secondary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.8rem',
                fontWeight: templateId === t.id ? 600 : 400,
                cursor: 'pointer',
              }}
            >
              {t.nome}
            </button>
          ))}
        </div>
      </div>

      {/* Preview da mensagem */}
      <div>
        <Label>Mensagem (cola no WhatsApp)</Label>
        <pre
          style={{
            background: 'var(--c-bg-card)',
            border: '1px solid var(--c-border)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.85rem',
            color: 'var(--c-text)',
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            margin: 0,
          }}
        >
          {mensagem}
        </pre>
      </div>

      {/* Erro */}
      {erro && (
        <div
          style={{
            padding: '0.7rem 0.9rem',
            background: 'rgba(248, 113, 113, 0.08)',
            border: '1px solid rgba(248, 113, 113, 0.4)',
            borderRadius: 'var(--radius-sm)',
            color: '#f87171',
            fontSize: '0.8rem',
          }}
        >
          {erro}
        </div>
      )}

      {/* Indicador de autosave */}
      {autosave !== 'idle' && (
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color:
              autosave === 'erro'
                ? '#f87171'
                : autosave === 'salvo'
                  ? 'var(--c-success)'
                  : 'var(--c-text-muted)',
            margin: 0,
          }}
        >
          {autosave === 'aguardando' && '⏳ digitando...'}
          {autosave === 'salvando' && '💾 salvando...'}
          {autosave === 'salvo' && '✓ salvo automaticamente'}
          {autosave === 'erro' && '⚠ falha ao salvar — tenta editar de novo'}
        </p>
      )}

      {/* Acoes */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <button
          type="button"
          onClick={copiar}
          className="btn-ghost"
          disabled={!mensagem}
          style={{ cursor: mensagem ? 'pointer' : 'not-allowed', opacity: mensagem ? 1 : 0.5 }}
        >
          {copiado ? '✓ Copiado!' : 'Copiar mensagem'}
        </button>

        <button
          type="button"
          onClick={marcarEnviado}
          className="btn-primary"
          disabled={salvando}
          style={{
            cursor: salvando ? 'not-allowed' : 'pointer',
            opacity: salvando ? 0.5 : 1,
          }}
        >
          {salvando
            ? 'Salvando...'
            : lead.status === 'enviado'
              ? 'Reenviar (atualizar dados)'
              : 'Marcar como enviado'}
        </button>

        {/* Gerar proposta com dados pre-preenchidos */}
        <Link
          href={`/admin/proposta?nome=${encodeURIComponent(nome.trim())}&tratamento=${encodeURIComponent(tratamento)}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.55rem 1.1rem',
            background: 'transparent',
            border: '1px solid var(--c-accent)',
            borderRadius: '9999px',
            color: 'var(--c-accent)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.8rem',
            fontWeight: 600,
            textDecoration: 'none',
            cursor: nome.trim() ? 'pointer' : 'not-allowed',
            opacity: nome.trim() ? 1 : 0.4,
            pointerEvents: nome.trim() ? 'auto' : 'none',
          }}
          title={
            !nome.trim()
              ? 'Preencha o nome antes de gerar proposta'
              : 'Abrir gerador de proposta com nome e tratamento ja preenchidos'
          }
        >
          → Gerar proposta
        </Link>

        {/* Limpar lead (discreto, direita) */}
        {(lead.nome || lead.sexo || lead.tratamento || lead.status !== 'pendente') && (
          <button
            type="button"
            onClick={async () => {
              if (
                !confirm(
                  `Limpar dados deste lead?\n\nVai apagar nome, sexo, tratamento, template e datas.\nO lead volta pra "pendente".\nO telefone (${lead.telefone}) permanece.`,
                )
              )
                return;
              await patch({
                nome: null,
                sexo: null,
                tratamento: null,
                templateUsado: null,
                status: 'pendente',
                dataEnvio: null,
                dataResposta: null,
                observacao: null,
              });
              setNome('');
              setSexo(null);
              setTratamento('Dr.');
              setTemplateId('a');
            }}
            disabled={salvando}
            title="Limpar dados deste lead e voltar pra pendente"
            style={{
              marginLeft: 'auto',
              padding: '0.4rem 0.7rem',
              background: 'transparent',
              border: '1px solid var(--c-border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--c-text-muted)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              cursor: salvando ? 'not-allowed' : 'pointer',
              opacity: salvando ? 0.5 : 1,
              transition: 'color 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#f87171';
              e.currentTarget.style.borderColor = 'rgba(248, 113, 113, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--c-text-muted)';
              e.currentTarget.style.borderColor = 'var(--c-border)';
            }}
          >
            🗑 limpar
          </button>
        )}
      </div>

      {/* Mudar status (so se já enviou) */}
      {lead.status !== 'pendente' && (
        <div style={{ borderTop: '1px solid var(--c-border)', paddingTop: '1rem' }}>
          <Label>Mudar status</Label>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {(['pendente', 'respondeu', 'em_conversa', 'negou', 'frio'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => patch({ status: s })}
                disabled={salvando || lead.status === s}
                style={{
                  padding: '0.4rem 0.85rem',
                  background: lead.status === s ? `color-mix(in srgb, ${STATUS_COR[s]} 18%, transparent)` : 'transparent',
                  border: `1px solid ${STATUS_COR[s]}`,
                  borderRadius: '9999px',
                  color: STATUS_COR[s],
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  cursor: salvando || lead.status === s ? 'not-allowed' : 'pointer',
                  opacity: salvando ? 0.5 : 1,
                  fontWeight: lead.status === s ? 600 : 400,
                }}
              >
                {lead.status === s ? `✓ ${STATUS_LABEL[s]}` : STATUS_LABEL[s]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Datas se aplicavel */}
      {(lead.dataEnvio || lead.dataResposta) && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--c-text-muted)' }}>
          {lead.dataEnvio && `Enviado em ${new Date(lead.dataEnvio).toLocaleString('pt-BR')}`}
          {lead.dataEnvio && lead.dataResposta && ' · '}
          {lead.dataResposta && `Respondeu em ${new Date(lead.dataResposta).toLocaleString('pt-BR')}`}
        </p>
      )}

    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        color: 'var(--c-text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        marginBottom: '0.4rem',
        fontWeight: 600,
      }}
    >
      {children}
    </p>
  );
}

function ToggleBtn({
  label,
  ativo,
  onClick,
}: {
  label: string;
  ativo: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '0.45rem 0.85rem',
        background: ativo ? 'color-mix(in srgb, var(--c-accent) 20%, transparent)' : 'transparent',
        border: `1px solid ${ativo ? 'var(--c-accent)' : 'var(--c-border)'}`,
        borderRadius: '9999px',
        color: ativo ? 'var(--c-accent)' : 'var(--c-text-secondary)',
        fontFamily: 'var(--font-sans)',
        fontSize: '0.8rem',
        fontWeight: ativo ? 600 : 400,
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.6rem 0.8rem',
  background: 'var(--c-bg-card)',
  border: '1px solid var(--c-border)',
  borderRadius: 'var(--radius-sm)',
  color: 'var(--c-text)',
  fontFamily: 'var(--font-sans)',
  fontSize: '0.9rem',
};
