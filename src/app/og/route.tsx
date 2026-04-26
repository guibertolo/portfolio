import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          fontFamily: 'monospace',
          position: 'relative',
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            backgroundImage:
              'linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            display: 'flex',
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(59,130,246,0.18) 0%, transparent 60%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            position: 'relative',
            padding: '0 64px',
          }}
        >
          {/* Mono tagline (typing effect from hero) */}
          <div
            style={{
              fontSize: '20px',
              color: '#3b82f6',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }}
          >
            building products, not templates
          </div>

          {/* Name (mirrors hero: white "Guilherme" + gradient "Bertolo") */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              lineHeight: 1.05,
            }}
          >
            <div
              style={{
                fontSize: '108px',
                fontWeight: 700,
                color: '#fafafa',
                letterSpacing: '-0.03em',
              }}
            >
              Guilherme
            </div>
            <div
              style={{
                fontSize: '108px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #3b82f6, #a855f7, #ec4899)',
                backgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '-0.03em',
              }}
            >
              Bertolo
            </div>
          </div>

          {/* PT subtitle (hero phrase) */}
          <div
            style={{
              fontSize: '26px',
              color: '#d4d4d8',
              marginTop: '32px',
              textAlign: 'center',
              lineHeight: 1.4,
              maxWidth: '900px',
              display: 'flex',
            }}
          >
            Eu projeto, codifico e coloco no ar.&nbsp;
            <span style={{ color: '#fafafa', fontWeight: 600 }}>Sozinho, se precisar.</span>
          </div>

          {/* PT mono sub-sub (hero) */}
          <div
            style={{
              fontSize: '18px',
              color: '#71717a',
              marginTop: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            Sites · Sistemas · Apps · Automação com IA
          </div>
        </div>

        {/* Footer URL */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            fontSize: '16px',
            color: '#52525b',
            letterSpacing: '0.1em',
            display: 'flex',
          }}
        >
          guilhermebertolo.com.br
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
