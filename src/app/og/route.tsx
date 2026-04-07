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
              'radial-gradient(ellipse at 50% 30%, rgba(59,130,246,0.15) 0%, transparent 60%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            position: 'relative',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: '#3b82f6',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            {'< Software Engineer & AI Engineer />'}
          </div>
          <div
            style={{
              fontSize: '72px',
              fontWeight: 700,
              color: '#fafafa',
              letterSpacing: '-0.02em',
            }}
          >
            Guilherme
          </div>
          <div
            style={{
              fontSize: '72px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #3b82f6, #a855f7, #ec4899)',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            Bertolo
          </div>
          <div
            style={{
              fontSize: '18px',
              color: '#a1a1aa',
              marginTop: '8px',
            }}
          >
            Next.js • TypeScript • AI Orchestration • Rust
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
