'use client';

import { useState, useRef, useEffect } from 'react';

const COMMANDS: Record<string, string> = {
  help: `Comandos disponíveis:
  about      -Sobre mim
  skills     -Minhas tecnologias
  projects   -Meus projetos
  experience -Experiência profissional
  contact    -Informações de contato
  matrix     -???
  clear      -Limpar terminal
  exit       -Sair do terminal`,

  about: `> Guilherme Rodrigues Bertolo
> Autodidata com produtos em produção
> Engenharia da Computação (incompleto) - UNIP
> +10 anos na área de tecnologia
> Focado em AI Orchestration, Full-stack Dev
> Localização: São Bernardo do Campo, SP`,

  skills: `> Frontend:  React, Next.js, TypeScript, Tailwind CSS
> Backend:   Node.js, Supabase, PostgreSQL, REST APIs
> Desktop:   Tauri, Rust, Electron
> AI:        Claude Code, AI Orchestration, Multi-agent Systems
> DevOps:    Vercel, Git, GitHub Actions, CI/CD
> Design:    Figma, UI/UX, Responsive Design`,

  projects: `> FrotaViva    [LIVE]       -SaaS gestão de frotas | Next.js + Supabase
> AIOX         [EM ESTUDO]  -Framework orquestração IA | TypeScript
> PurgeKit     [EM DEV]     -Otimizador Windows | Tauri + Rust
> Site Gislaine[LIVE]       -Site advogada | Next.js + Tailwind`,

  experience: `> 2020-Presente  Desenvolvedor Independente & AI Engineer
> 2018-2019      Analista de Processos -Grupo H.Olhos
> 2016-2018      Analista de TI -Cultural Norte Americano
> 2014-2016      Estagiário Eng. Industrial -Toledo do Brasil
> 2013-2014      Estagiário Help Desk -Accesstage Tecnologia`,

  contact: `> Email:   guilhermerbertolo@gmail.com
> GitHub:  github.com/guibertolo
> Status:  Disponível para projetos`,
};

interface Line {
  type: 'input' | 'output';
  text: string;
}

export default function TerminalMode({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<Line[]>([
    { type: 'output', text: '╔══════════════════════════════════════════════╗' },
    { type: 'output', text: '║  Guilherme Bertolo -Terminal v1.0           ║' },
    { type: 'output', text: '║  Digite "help" para ver os comandos          ║' },
    { type: 'output', text: '╚══════════════════════════════════════════════╝' },
    { type: 'output', text: '' },
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newLines: Line[] = [...lines, { type: 'input', text: `guest@bertolo:~$ ${cmd}` }];

    if (cmd === 'clear') {
      setLines([]);
      setInput('');
      return;
    }

    if (cmd === 'exit') {
      onClose();
      return;
    }

    if (cmd === 'matrix') {
      newLines.push({ type: 'output', text: '> Iniciando Matrix Rain...' });
      newLines.push({ type: 'output', text: '' });
      setLines(newLines);
      setInput('');
      const trigger = (window as unknown as Record<string, unknown>).__triggerMatrixRain;
      if (typeof trigger === 'function') (trigger as () => void)();
      return;
    }

    const response = COMMANDS[cmd];
    if (response) {
      response.split('\n').forEach((line) => {
        newLines.push({ type: 'output', text: line });
      });
    } else {
      newLines.push({ type: 'output', text: `bash: ${cmd}: comando não encontrado. Digite "help".` });
    }

    newLines.push({ type: 'output', text: '' });
    setLines(newLines);
    setInput('');
  };

  return (
    <div
      role="application"
      aria-label="Terminal interativo"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'var(--c-bg)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        color: 'var(--c-accent)',
      }}
    >
      {/* Title bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'var(--c-bg-card)', borderBottom: '1px solid var(--c-border)' }}>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f85149', cursor: 'pointer', border: 'none', padding: 0 }} onClick={onClose} aria-label="Fechar terminal" />
          <span aria-hidden="true" style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#d29922' }} />
          <span aria-hidden="true" style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#3fb950' }} />
        </div>
        <span style={{ fontSize: '0.7rem', color: 'var(--c-text-muted)' }}>guest@bertolo -bash</span>
        <button onClick={onClose} style={{ background: 'none', border: '1px solid var(--c-border)', color: 'var(--c-text-muted)', padding: '0.25rem 0.75rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.65rem', fontFamily: 'inherit' }}>
          ESC para sair
        </button>
      </div>

      {/* Scanlines overlay */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)', zIndex: 1 }} />

      {/* Terminal body */}
      <div ref={scrollRef} style={{ flex: 1, overflow: 'auto', padding: '1rem', position: 'relative', zIndex: 2 }}>
        {lines.map((line, i) => (
          <div key={i} style={{ color: line.type === 'input' ? 'var(--c-text-secondary)' : 'var(--c-accent)', marginBottom: '2px', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
            {line.text}
          </div>
        ))}

        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'var(--c-text-secondary)' }}>guest@bertolo:~$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--c-accent)',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              caretColor: 'var(--c-accent)',
            }}
            autoComplete="off"
            spellCheck={false}
            aria-label="Comando do terminal"
          />
        </form>
      </div>
    </div>
  );
}
