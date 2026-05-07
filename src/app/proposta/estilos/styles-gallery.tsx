'use client';

import { useState } from 'react';
import type { StyleDirection } from './styles-data';
import { StyleCard } from './style-card';
import { CtaPersonalizar } from './cta-personalizar';

interface Props {
  styles: StyleDirection[];
}

export function StylesGallery({ styles }: Props) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StyleDirection | null>(null);

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem',
          width: '100%',
          alignItems: 'start',
        }}
      >
        {styles.map((style) => (
          <StyleCard
            key={style.slug}
            style={style}
            isExpanded={expandedSlug === style.slug}
            onToggle={() =>
              setExpandedSlug((current) => (current === style.slug ? null : style.slug))
            }
            onSelectStyle={() => setSelectedStyle(style)}
          />
        ))}
      </div>

      {selectedStyle && (
        <CtaPersonalizar style={selectedStyle} onClose={() => setSelectedStyle(null)} />
      )}
    </>
  );
}
