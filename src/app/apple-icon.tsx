import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a0a0a',
          fontFamily: 'monospace',
          fontSize: 88,
          fontWeight: 700,
          letterSpacing: '-0.04em',
          color: 'transparent',
          backgroundImage:
            'radial-gradient(ellipse at 30% 30%, rgba(59,130,246,0.25) 0%, transparent 60%), linear-gradient(#0a0a0a, #0a0a0a)',
        }}
      >
        <span
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #a855f7, #ec4899)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          GB
        </span>
      </div>
    ),
    { ...size }
  );
}
