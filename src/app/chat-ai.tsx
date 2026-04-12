'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const KNOWLEDGE: Record<string, string> = {
  // Pessoal
  'nome': 'Me chamo Guilherme Rodrigues Bertolo, moro em São Bernardo do Campo, SP. Sou apaixonado por tecnologia desde sempre.',
  'idade': 'Tenho mais de 10 anos de experiência na área de tecnologia, desde suporte técnico até AI Engineering.',
  'personalidade|jeito|tipo': 'Sou extrovertido e comunicativo. Gosto de ir direto ao ponto, sem enrolação. Quando decido fazer algo, é pra ontem. Prefiro testar rápido e iterar do que ficar planejando demais.',
  'valor|princípio|acredita': 'Valorizo honestidade acima de tudo. Prefiro admitir o que não sei do que fingir. Acredito que a melhor forma de aprender é fazendo, errando e corrigindo rápido.',
  'defeito|fraqueza|dificuldade': 'Sou perfeccionista com detalhes visuais, percebo quando algo está 1 pixel fora do lugar. Também sou impaciente: quando algo me empolga, quero começar na hora. Mas isso me faz mover rápido.',
  'motivação|motiva|anima': 'O que me motiva é explorar fronteiras novas. Já passei por NFTs, Web3 e agora inteligência artificial. O que me anima hoje é construir coisas que antes pareciam impossíveis usando IA.',
  'hobby|gosto|fora': 'Fora do código, curto games e gosto de explorar novas tecnologias por diversão. Uso Opera GX como navegador, então sim, sou nerd mesmo.',
  'família|vida': 'Moro em São Bernardo do Campo, SP. Sou solteiro e focado em construir minha carreira em tech e IA.',
  'estilo|como trabalha': 'Sou prático e objetivo. Prefiro começar logo e ajustar no caminho. Trabalho bem sozinho ou em equipe, mas gosto de autonomia. Sou mais produtivo à noite.',

  // Formação
  'formação|faculdade|estudo': 'Cursei Engenharia da Computação na UNIP. Não concluí, mas isso nunca me impediu. Sou autodidata e aprendo mais rápido na prática do que em sala de aula.',

  // Carreira
  'experiência|trabalho|carreira': 'Comecei com Help Desk na Accesstage (2013), passei por Engenharia Industrial na Toledo do Brasil, Análise de TI no Cultural Norte Americano, Processos no Grupo H.Olhos, e desde 2020 sou dev independente. Cada fase me deu uma visão diferente de como tech resolve problemas reais.',
  'holhos|hospital|processos': 'Trabalhei no Grupo H.Olhos (segmento hospitalar) como Analista de Processos de 2018 a 2019. Implantava ferramentas, suporte a sistemas internos e projetos de melhoria.',
  'nft|web3|cripto|aposta': 'Depois do H.Olhos em 2019, explorei NFTs, Web3 e apostas esportivas. Cada experiência me ensinou algo. Agora estou 100% focado em IA e desenvolvimento de software.',

  // Projetos
  'projeto|frotaviva|frota': 'O FrotaViva é meu orgulho. SaaS completo para gestão de frotas de cegonheiros, construído do zero com Next.js, Supabase e Vercel. Lighthouse 98! Dashboard em tempo real, controle de motoristas, veículos e viagens.',
  'aiox|agente|orquestração|framework': 'O AIOX é um framework de orquestração de agentes de IA. Tem 30+ agentes especializados (Dev, QA, Architect, PM, DevOps), cada um com persona, comandos e escopo definidos. É o projeto que mais me desafia.',
  'gislaine|advogada|cliente': 'Desenvolvi o site profissional da advogada Gislaine, especializada em Direito de Família. Feito com Next.js, Tailwind e Vercel. Clean e profissional.',

  // Tech
  'tecnologia|stack|linguagem|ferramenta': 'Minha stack: TypeScript, Next.js, React e Tailwind no frontend. Supabase e Node.js no backend. Tauri e Rust pra desktop. Em IA, uso Claude Code diariamente e construo sistemas multi-agente. Deploy na Vercel.',
  'ia|inteligência artificial|claude|gpt': 'IA é minha paixão atual. Uso Claude Code como ferramenta principal de desenvolvimento. Contribuo no AIOX, um framework que orquestra 30+ agentes de IA trabalhando juntos.',

  // Contato
  'contato|email|contratar|freelance': 'Pode me contatar pelo email guilhermerbertolo@gmail.com ou pelo GitHub github.com/guibertolo. Estou sempre aberto a projetos desafiadores!',
  'telefone|whatsapp|whats|zap|celular|ligar|numero': 'Meu WhatsApp é (11) 99162-5772. Pode chamar por lá que respondo rápido! Link direto: wa.me/5511991625772',
  'inglês|idioma|língua': 'Tenho inglês avançado, o que me permite consumir documentação técnica, participar de comunidades internacionais e trabalhar com clientes de fora.',

  // Diferenciais
  'diferencial|destaque|diferente': 'O Guilherme constrói produtos completos sozinho, do design ao deploy. Além disso, orquestra 30+ agentes de IA no AIOX pra acelerar entregas. Autodidata com resultados reais: SaaS em produção, sites entregues, Lighthouse 97+.',
  'salario|pretensão|pretensao|quanto cobra|valor hora|preco|preço': 'O Guilherme prefere entender o escopo antes de falar de valores. Trabalha por projeto, sprint ou consultoria. Melhor conversar direto pra alinhar: guilhermerbertolo@gmail.com ou WhatsApp (11) 99162-5772.',
  'equipe|time|sozinho|solo': 'Sim, ele constrói solo, mas não no sentido tradicional. Ele orquestra 30+ agentes de IA no AIOX, cada um especializado (Dev, QA, Architect, DevOps). É como ter um time inteiro, só que automatizado.',
  'disponivel|disponibilidade|quando comecar|quando começar': 'O Guilherme está disponível para novos projetos. Prefere começar com uma conversa de escopo pra entender a demanda. Chama no WhatsApp (11) 99162-5772 ou email guilhermerbertolo@gmail.com.',
  'portfolio|esse site': 'Este site foi construído com Next.js 16, Tailwind CSS v4 e deploy na Vercel. Lighthouse 97. Todo o desenvolvimento foi feito com Claude Code como ferramenta de IA.',
  'resultado|entrega|prazo': 'FrotaViva: SaaS completo em produção com Lighthouse 98. Site da advogada Gislaine: entregue e live. O foco é sempre entregar rápido com qualidade, sem enrolação.',
  'remoto|presencial|hibrido|híbrido|modelo trabalho': 'Trabalha 100% remoto, baseado em São Bernardo do Campo, SP. Já atende clientes de diferentes regiões sem problema nenhum.',
  'supabase|banco|database|backend': 'Usa Supabase com PostgreSQL como backend principal. Implementa RLS (Row Level Security) pra segurança dos dados. No FrotaViva, toda a parte de auth, storage e banco roda no Supabase.',
  'next|react|frontend': 'Expert em Next.js 16 com App Router, React, TypeScript e Tailwind CSS v4. Todos os projetos web usam essa stack. Performance é prioridade, sempre buscando Lighthouse 95+.',
  'rust|tauri|desktop|purgekit': 'O PurgeKit é um app desktop feito com Tauri e Rust para otimização de Windows. Uma ferramenta séria de limpeza, não aqueles programas genéricos. Ainda em desenvolvimento.',
};

function findAnswer(question: string): string {
  const q = question.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Saudações
  if (/^(oi|ola|eai|hey|fala|salve|bom dia|boa tarde|boa noite|hello|hi)\b/.test(q)) {
    const hora = new Date().getHours();
    const saudacao = hora >= 18 || hora < 6 ? 'Boa noite' : hora >= 12 ? 'Boa tarde' : 'Bom dia';
    return `${saudacao}! Sou o assistente do Guilherme. Pode perguntar sobre projetos, experiência, tecnologias ou como entrar em contato. O que quer saber?`;
  }

  // Sobre ele / fale sobre / quem é / me conta
  if (q.includes('sobre ele') || q.includes('sobre o guilherme') || q.includes('quem e ele') || q.includes('quem e o guilherme') || q.includes('me fale') || q.includes('me conta') || q.includes('fale sobre') || q.includes('conta sobre') || (q.includes('quem') && q.includes('voce'))) {
    return 'O Guilherme é um AI Engineer e desenvolvedor full-stack de São Bernardo do Campo, SP. Extrovertido e direto ao ponto, quando decide fazer algo, é pra ontem. Tem mais de 10 anos em tech, passou por help desk, engenharia industrial, análise de TI e processos. Hoje constrói SaaS (FrotaViva), contribui no AIOX (framework de orquestração de IA) e faz apps desktop (PurgeKit). É autodidata, apaixonado por IA e adora explorar novas fronteiras tecnológicas.';
  }

  // Busca por keywords no knowledge base
  for (const [keys, answer] of Object.entries(KNOWLEDGE)) {
    const patterns = keys.split('|');
    if (patterns.some((p) => q.includes(p))) return answer;
  }

  // O que faz / trabalha com
  if (q.includes('o que faz') || q.includes('o que ele faz') || q.includes('trabalha com')) {
    return 'O Guilherme é AI Engineer e desenvolvedor full-stack. Constrói aplicações web com Next.js e TypeScript, apps desktop com Rust e Tauri, e contribui em frameworks de orquestração de IA. Atualmente focado em multi-agent systems com o AIOX.';
  }

  // Pode / consegue / sabe
  if (q.includes('consegue') || q.includes('sabe fazer') || q.includes('pode fazer')) {
    return 'O Guilherme trabalha com desenvolvimento web full-stack (Next.js, React, TypeScript), backend (Node.js, Supabase), desktop (Tauri, Rust), e inteligência artificial (orquestração de agentes, Claude Code). Já entregou SaaS completo com Lighthouse 98!';
  }

  // Genérico
  return 'Hmm, não achei nada específico sobre isso. Mas posso te ajudar com vários assuntos:\n\n• Projetos: FrotaViva, AIOX, PurgeKit, site advogada\n• Experiência: +10 anos em tech, carreira completa\n• Stack: Next.js, React, TypeScript, Supabase, Rust\n• Diferenciais: o que faz ele se destacar\n• Disponibilidade: modelo de trabalho e valores\n• Contato: WhatsApp, email, GitHub\n\nTenta perguntar de outro jeito ou escolhe um tema acima!';
}

export default function ChatAI({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Olá! Sou o assistente do Guilherme. Pergunte qualquer coisa sobre a experiência dele, projetos ou habilidades!' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const container = containerRef.current;
    if (!container) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = container.querySelectorAll<HTMLElement>('button, input, a[href]');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const answer = findAnswer(userMsg);
      setMessages((prev) => [...prev, { role: 'assistant', text: answer }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  return (
    <div ref={containerRef} style={{
      position: 'fixed',
      bottom: '5rem',
      right: '1.5rem',
      left: 'auto',
      width: '380px',
      maxWidth: 'calc(100vw - 1.5rem)',
      height: '500px',
      maxHeight: 'calc(100vh - 8rem)',
      background: 'var(--c-bg)',
      border: '1px solid var(--c-border)',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      zIndex: 60,
      boxShadow: '0 20px 60px color-mix(in srgb, var(--c-accent) 15%, rgba(0,0,0,0.4))',
    }} className="chat-container" role="dialog" aria-label="Chat com assistente">
      {/* Header */}
      <div style={{ padding: '1rem', borderBottom: '1px solid var(--c-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--c-text)' }}>
            Pergunte sobre mim
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--c-text-muted)', marginTop: '0.125rem' }}>
            AI Assistant • Online
          </div>
        </div>
        <button onClick={onClose} aria-label="Fechar chat" style={{ background: 'none', border: '1px solid var(--c-border)', color: 'var(--c-text-muted)', width: '28px', height: '28px', borderRadius: 'var(--radius-xs)', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          ✕
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, overflow: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '85%',
              padding: '0.625rem 0.875rem',
              borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
              background: msg.role === 'user' ? 'var(--c-accent)' : 'var(--c-bg-card)',
              color: msg.role === 'user' ? 'white' : 'var(--c-text-secondary)',
              fontSize: '0.8rem',
              lineHeight: 1.5,
              fontFamily: 'var(--font-sans)',
            }}>
              {msg.text.split(/(https?:\/\/[^\s]+)/g).map((part, j) =>
                part.match(/^https?:\/\//) ? (
                  <a key={j} href={part} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--c-accent)', textDecoration: 'underline' }}>{part}</a>
                ) : part
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ padding: '0.625rem 0.875rem', borderRadius: '12px 12px 12px 2px', background: 'var(--c-bg-card)', color: 'var(--c-text-muted)', fontSize: '0.8rem' }}>
              <span style={{ animation: 'pulse 1s ease-in-out infinite' }}>●</span>
              <span style={{ animation: 'pulse 1s ease-in-out infinite 0.2s' }}> ●</span>
              <span style={{ animation: 'pulse 1s ease-in-out infinite 0.4s' }}> ●</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={send} style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--c-border)', display: 'flex', gap: '0.5rem' }}>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pergunte algo..."
          style={{
            flex: 1,
            background: 'var(--c-bg-card)',
            border: '1px solid var(--c-border)',
            borderRadius: 'var(--radius-xs)',
            padding: '0.5rem 0.75rem',
            color: 'var(--c-text)',
            fontSize: '16px',
            fontFamily: 'var(--font-sans)',
          }}
        />
        <button type="submit" style={{
          background: 'var(--c-accent)',
          border: 'none',
          borderRadius: 'var(--radius-xs)',
          padding: '0.5rem 0.875rem',
          color: 'white',
          cursor: 'pointer',
          fontSize: '0.8rem',
          fontWeight: 600,
        }}>
          ↑
        </button>
      </form>
    </div>
  );
}
