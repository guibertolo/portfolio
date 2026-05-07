'use client';

import { useState } from 'react';
import type { StyleDirection } from './styles-data';

const WHATSAPP_NUMBER = '5511999999999';

interface Props {
  style: StyleDirection;
  onClose: () => void;
}

export function CtaPersonalizar({ style, onClose }: Props) {
  const [observacao, setObservacao] = useState('');

  const message = encodeURIComponent(
    `Olá Guilherme, vi a galeria de direções e a "${style.nome}" casa com meu escritório.${observacao ? ` Observação: ${observacao}` : ''}`,
  );
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}&utm_source=galeria-estilos&utm_direcao=${style.slug}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cta-titulo"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: 'var(--c-bg)',
          border: '1px solid var(--c-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '2rem 1.75rem',
          maxWidth: '480px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
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
          Direção escolhida
        </p>
        <h2
          id="cta-titulo"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 600,
            marginBottom: '0.5rem',
          }}
        >
          {style.nome}
        </h2>
        <p
          style={{
            color: 'var(--c-text-secondary)',
            fontSize: '0.85rem',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
          }}
        >
          Vou levar essa direção como ponto de partida. Tem algo que você ajustaria? Cor, fonte, sentimento? (opcional)
        </p>

        <textarea
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          placeholder="Ex: gostei mas queria menos sério, mais aproximado..."
          rows={3}
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'var(--c-bg-card)',
            border: '1px solid var(--c-border)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--c-text)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            lineHeight: 1.5,
            resize: 'vertical',
            marginBottom: '1.5rem',
          }}
        />

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ flex: '1 1 200px' }}
          >
            Enviar pro Guilherme no WhatsApp
          </a>
          <button
            type="button"
            onClick={onClose}
            className="btn-ghost"
            style={{ background: 'transparent', cursor: 'pointer' }}
          >
            Voltar pra galeria
          </button>
        </div>
      </div>
    </div>
  );
}
