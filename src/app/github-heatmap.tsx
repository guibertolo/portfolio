'use client';

import { useEffect, useState } from 'react';

interface ContributionDay {
  date: string;
  level: number;
}

const LEVEL_COLORS = [
  'rgba(255,255,255,0.04)',
  'color-mix(in srgb, var(--c-accent) 20%, transparent)',
  'color-mix(in srgb, var(--c-accent) 40%, transparent)',
  'color-mix(in srgb, var(--c-accent) 60%, transparent)',
  'color-mix(in srgb, var(--c-accent) 90%, transparent)',
];

export default function GitHubHeatmap() {
  const [data, setData] = useState<ContributionDay[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/github-contributions')
      .then((res) => res.json())
      .then((d: { contributions: ContributionDay[]; total: number }) => {
        setData(d.contributions);
        setTotal(d.total);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--c-text-muted)', padding: '2rem 0', textAlign: 'center' }}>
        Carregando contribuições...
      </div>
    );
  }

  if (error || data.length === 0) {
    return (
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--c-text-muted)', padding: '1.5rem 0', textAlign: 'center' }}>
        Contribuições indisponíveis no momento
      </div>
    );
  }

  // Group by weeks (columns) — last 52 weeks
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  // Pad start to align with Sunday
  const firstDate = new Date(data[0]?.date ?? '');
  const startDay = firstDate.getDay();
  for (let i = 0; i < startDay; i++) {
    currentWeek.push({ date: '', level: -1 });
  }

  for (const day of data) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) weeks.push(currentWeek);

  // Only show last 30 weeks on mobile-ish
  const displayWeeks = weeks.slice(-52);

  return (
    <div role="img" aria-label={`Mapa de contribuições GitHub: ${total} contribuições no último ano`}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--c-text-muted)' }}>
          {total} contribuições no último ano
        </span>
        <a
          href="https://github.com/guibertolo"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--c-accent)', textDecoration: 'none' }}
        >
          @guibertolo ↗
        </a>
      </div>

      <div style={{ display: 'flex', gap: '2px', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {displayWeeks.map((week, wi) => (
          <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {week.map((day, di) => (
              <div
                key={di}
                title={day.date ? `${day.date}: nível ${day.level}` : ''}
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '2px',
                  background: day.level < 0 ? 'transparent' : LEVEL_COLORS[day.level] ?? LEVEL_COLORS[0],
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.5)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              />
            ))}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', justifyContent: 'flex-end' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--c-text-muted)' }}>Menos</span>
        {LEVEL_COLORS.map((color, i) => (
          <div key={i} aria-hidden="true" style={{ width: '10px', height: '10px', borderRadius: '2px', background: color }} />
        ))}
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--c-text-muted)' }}>Mais</span>
      </div>
    </div>
  );
}
