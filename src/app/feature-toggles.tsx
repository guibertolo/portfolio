'use client';

import { useState } from 'react';
import TerminalMode from './terminal-mode';
import ChatAI from './chat-ai';

export default function FeatureToggles() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      {/* Terminal toggle button */}
      <button
        onClick={() => setShowTerminal(true)}
        aria-label="Abrir terminal"
        className="fixed-terminal-btn"
        style={{
          position: 'fixed',
          top: '1.5rem',
          left: '1.5rem',
          zIndex: 50,
          padding: '0.5rem 0.875rem',
          borderRadius: '9999px',
          border: '1px solid var(--c-border)',
          background: 'var(--c-bg-card)',
          color: 'var(--c-text-muted)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.7rem',
          transition: 'all 0.3s',
          fontFamily: 'var(--font-mono)',
        }}
        title="Modo Terminal"
      >
        <span style={{ color: 'var(--c-accent)' }}>{'>'}_</span>
        <span>terminal</span>
      </button>

      {/* Chat toggle button */}
      <button
        className="fixed-chat-btn"
        onClick={() => setShowChat(!showChat)}
        aria-label={showChat ? 'Fechar chat' : 'Abrir chat'}
        style={{
          position: 'fixed',
          bottom: '5rem',
          right: '1.5rem',
          zIndex: 55,
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: 'none',
          background: 'var(--c-accent)',
          color: 'white',
          cursor: 'pointer',
          display: showChat ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.25rem',
          boxShadow: '0 4px 20px rgba(59,130,246,0.4)',
          transition: 'transform 0.3s',
        }}
        title="Pergunte sobre mim"
      >
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="white" stroke="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
      </button>

      {/* Terminal overlay */}
      {showTerminal && <TerminalMode onClose={() => setShowTerminal(false)} />}

      {/* Chat panel */}
      {showChat && <ChatAI onClose={() => setShowChat(false)} />}
    </>
  );
}
