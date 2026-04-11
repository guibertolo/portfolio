# Design Audit — Portfolio guilhermebertolo.com.br

**Data:** 2026-04-11
**Autor:** @ux-design-expert (Uma)
**Escopo:** análise de princípios visuais do portfolio contra biblioteca `docs/library/design-md/`
**Referências consultadas:** vercel, linear, stripe, framer
**Status atual do site:** Live — Lighthouse 97/100/100/100

---

## TL;DR

O portfolio tem identidade forte (dark mode nativo, code-aesthetic via labels `// …`, letter reveal no hero, magnetic cards, shader background) e já aplica várias heurísticas que os grandes usam. **O maior gap não é falta de efeitos — é excesso de movimento contínuo competindo pela atenção do usuário.** Vercel, Linear, Stripe e Framer têm motion muito mais contido; a autoridade visual vem de tipografia comprimida + sistema de elevação por luminância + disciplina de acento único. As recomendações priorizadas são: (1) aplicar compressão tipográfica agressiva nos displays, (2) podar animações infinitas que não servem à narrativa, (3) introduzir escada de luminância em superfícies (hoje flat), (4) adicionar OpenType features em Inter, e (5) consolidar sistema de foco/hover com stepping de opacidade. Nenhuma recomendação propõe trocar paleta ou tipografia — a identidade fica intacta.

---

## 1. Snapshot da identidade atual

| Dimensão | Estado atual |
|----------|--------------|
| Paleta base | `#0a0a0a` bg, `#fafafa` text, acento duplo blue (`#3b82f6`) + violet (`#a855f7`) via gradient |
| Fontes | Inter (sans), JetBrains Mono (code), Instrument Sans (display) |
| Display weight | 700 (hero, section titles) |
| Letter-spacing em display | `-0.02em` (moderado) |
| Text hierarchy | 3 níveis: `--c-text`, `--c-text-secondary`, `--c-text-muted` |
| Card system | `card-glass` com `rgba(255,255,255,0.04)` bg + border 0.08 + radius 16px |
| Elevation | Hover muda border-color e `translateY(-4px)` — sem stepping de luminância |
| Motion contínuo | Border shimmer nos cards (6s), nav glow pulse (4s), gradient text shimmer (4s), grid drift (15s), timeline dot pulse (2s), particles floating, custom cursor, shader water bg |
| Code identity | Labels `// projetos` em mono uppercase, bracket motif decorativo, typing text, letter reveal no hero — bem executado |
| Layout | Masonry grid com featured project (FrotaViva) ocupando 2 colunas — padrão certo |
| Mobile | Bem trabalhado — nav pill flutuante, grid 2×2 impact, timelines colapsadas |

Código vive em `apps/portfolio/src/app/` — `globals.css` (887 linhas de tokens/efeitos) e `page.tsx` (447 linhas de sections). Case studies em `app/case/frotaviva/` e `app/case/site-advogada/`.

---

## 2. Pontos fortes — o que já está bom

Antes de apontar gaps, vale registrar o que o portfolio já faz certo. Cada item abaixo mapeia a um princípio que algum dos grandes aplica.

### 2.1. Dark mode nativo com profundidade ambiente
O shader water bg + noise texture + blobs radiais criam uma camada de atmosfera que não compete com o conteúdo. **Princípio alinhado com Linear:** "darkness as space, content emerges from it". O `#0a0a0a` é um pouquinho mais escuro que o `#08090a` do Linear, mas a filosofia é a mesma.

### 2.2. Code identity explícita
`// projetos`, `// sobre mim`, `< AI Engineer & Full-stack Developer />`, typing cursor, letter-by-letter reveal no hero. Isso posiciona o portfolio como "feito por alguém que vive no terminal", o que é coerente com o público-alvo (recrutadores tech, clientes SaaS). **Princípio alinhado com Vercel/Linear:** mono caption como "developer console voice".

### 2.3. Masonry com featured project
Projetos Masonry com FrotaViva ocupando `grid-column: span 2` no breakpoint desktop é o padrão que Vercel/Linear/Framer usam pra dar peso hierárquico sem precisar de "featured badge" ou cor de acento. **Princípio alinhado com Framer:** asymmetric feature layouts.

### 2.4. Floating nav pill
Nav flutuante na base com backdrop-blur é um pattern que Framer e Raycast usam bem. Posicionar CTA ("Contato") com separator antes é disciplina boa. **Princípio alinhado com Framer:** dark floating nav bar with frosted glass.

### 2.5. Status badges tinted
`Live`, `Em dev`, `Em estudo` com bg semi-transparente + text vivo. **Princípio alinhado com Vercel:** pill badges com tinted background (`#ebf5ff` bg + `#0068d6` text no Vercel — aqui é verde/azul/roxo adaptado).

### 2.6. Timeline com pulsing dot
Timeline experience item com `::after` dot animado pulsando é leve, communicates "ativo/em progresso". **Princípio alinhado com Linear:** status dots para "in progress" states.

### 2.7. Card-glass luminance
`rgba(255,255,255,0.04)` background é exatamente a filosofia Linear (superfícies em 0.02–0.05 de white opacity, nunca sólidas em dark). **Princípio alinhado com Linear:** luminance stacking em vez de shadow elevation.

### 2.8. Gradient text decorativo
`gradient-text` com blue→purple→blue-hover no nome do hero e em palavras de destaque. Usa gradient como decoração pontual, não como fill massivo. **Princípio alinhado com Stripe:** gradients como accent decorativo (ruby→magenta), não estrutural.

### 2.9. Mobile-first com atenção
Hero section mobile com `min-height: auto`, CTAs em wrap, contact cards full-width. Nada de breakpoint-rot. O Lighthouse 100/100/100 não é acidente.

---

## 3. Gaps identificados — princípios extraídos que o portfolio ainda não explora

Cada gap abaixo é um **princípio que um ou mais dos 4 grandes aplica** e que o portfolio hoje não usa ou aplica fracamente. A recomendação é sempre **adaptar** ao código atual, nunca copiar valores literais.

### 3.1. [TIPOGRAFIA] Compressão de display insuficiente

**Princípio (Vercel + Linear + Framer):** Em display text, letter-spacing negativo agressivo é o que transforma "headline bold bonita" em "texto engenheirado". Vercel usa `-2.88px` em 48px. Linear usa `-1.584px` em 72px. Framer chega a `-5.5px` em 110px.

**Estado atual:** Hero do portfolio usa `letter-spacing: -0.02em` (≈ `-1.1px` em 5.5rem ≈ 88px). Section titles em `clamp(1.5rem, 4vw, 2.5rem)` com tracking herdado. É compressão suave, não identitária.

**Gap:** A tipografia está "bonita-padrão", não "engenheirada-assinada". O nome "Guilherme Bertolo" em 700/−0.02em lê como um título de blog, não como uma assinatura de produto.

**Como adaptar mantendo identidade:**
- Aumentar compressão do hero para `-0.04em` a `-0.05em` (Instrument Sans suporta bem)
- Reduzir peso de 700 → 500 ou 600 nos displays. Stripe prova que weight 300 em display é mais confiante que 700. Framer fica no 500. Linear fica no 510. **Weight 700 em display em 2026 lê como convenção velha.**
- Section titles ganham `-0.03em` de tracking pra criar ladder: hero mais comprimido, section menos, body normal
- Não mexer em Inter body text — Inter 400 com tracking normal é o certo

**Risco:** nenhum — é mudança de tokens CSS que você pode testar visualmente antes de commitar.

### 3.2. [TIPOGRAFIA] OpenType features ausentes em Inter

**Princípio (Linear + Framer):** Inter tem 20+ OpenType features (cv01-cv11, ss01-ss07, calt, liga) que modificam glyphs específicos sem trocar a fonte. Linear habilita `cv01, ss03` globalmente. Framer habilita 6 features simultâneas (`cv01, cv05, cv09, cv11, ss03, ss07`). O efeito é sutil mas crítico: Inter "raw" parece genérico; Inter com stylistic sets parece custom.

**Estado atual:** Nenhum `font-feature-settings` declarado no `globals.css`. Inter roda raw.

**Gap:** O portfolio usa Inter (escolha certa) mas desperdiça o que Inter oferece.

**Como adaptar:**
- Adicionar no `body` ou `:root`: `font-feature-settings: 'cv11', 'ss01', 'ss03';`
- Testar a combinação — `cv11` dá zeros com slash (útil pra code/tech), `ss01` dá stylistic alternates mais geométricos
- Para JetBrains Mono, habilitar `'liga'` e `'calt'` — cria ligatures em operadores (`=>`, `!=`, `>=`) o que reforça o code identity
- Para números em métricas (Lighthouse 98, 1 developer, <1s), adicionar `font-feature-settings: 'tnum'` pra tabular numerals — alinham melhor e leem como "data"

**Risco:** zero — é progressive enhancement. Navegadores sem suporte degradam graciosamente.

### 3.3. [MOTION] Excesso de animação contínua competindo pela atenção

**Princípio (Vercel + Linear + Stripe):** Motion é para comunicar estado ou hierarquia, não para "manter o site vivo". Vercel não tem nenhuma animação infinite loop na homepage. Linear tem um único status dot pulsante. Stripe tem gradientes decorativos estáticos. Framer usa scroll-triggered e hover-triggered — não `animation: X 6s infinite`.

**Estado atual:** O portfolio tem **sete animações infinitas simultâneas** (mapeadas em `globals.css`):

| Animação | Duração | Justificativa atual |
|----------|---------|---------------------|
| `borderShimmer` nos cards (`.card-glass::before`) | 6s linear | "cards animados" |
| `navGlow` no floating nav | 4s ease-in-out | "nav viva" |
| `gradientShift` no `.gradient-text` | 4s ease-in-out | "texto vibrante" |
| `gridDrift` no `.hero-grid` | 15s linear | "tech feel" |
| `dotPulse` nos timeline dots | 2s ease-in-out | "status = ativo" |
| `particleFloat` nas 12 particles | 6–9s (varied) | "hero vivo" |
| `scrollWheel` no scroll indicator | 2s infinite | "scroll hint" |
| Plus: shader water bg (contínuo via WebGL) | always | background |

**Gap:** A combinação cria um ambiente visual que **nunca para**. Isso tem três custos:
1. **Distração** — o olho do usuário é puxado pra múltiplos loci simultaneamente
2. **Autoridade reduzida** — sites de grandes players são calmos, movimento é pontuação, não fundo
3. **Performance** — 7 animations infinite + shader WebGL + IntersectionObserver em todos os reveals é CPU/GPU load constante. Você tem Lighthouse 98, mas pode estar no limite

**Como adaptar mantendo identidade:**
- **Manter (efeitos que contam história):** letter reveal no hero, reveal-on-scroll, magnetic cards on hover, custom cursor, timeline dot pulse (status indicator)
- **Slow down ou remover:** `borderShimmer` nos cards — é puramente decorativo e compete com magnetic-card hover. Alternativa: mantê-lo mas acionar APENAS no `:hover`, não infinite
- **Remover:** `navGlow` pulse — a nav já é destacada pelo blur, pulsar distrai
- **Remover:** `gradientShift` infinito no `.gradient-text` — gradient estático é mais elegante. Se quiser motion, ative só no hover do nome
- **Slowdown:** `gridDrift` de 15s → 45s ou mais (o movimento só precisa ser perceptível em quem fica parado)
- **Avaliar:** particles — valem o custo? Framer não usa. Vercel não usa. Linear não usa. Se sair, o hero fica mais premium
- **Sem mexer:** shader water bg fica — é assinatura e contido no `-z-1`

**Filosofia geral:** "motion contínuo = ruído, motion triggered = informação". Adotar essa regra.

**Risco:** médio. É a mudança mais subjetiva porque pode parecer "menos trabalho". Contra-argumento: Framer (o nome literal é "Framer") tem um dos sites mais calmos em motion — porque eles sabem que menos é mais impactante.

### 3.4. [ELEVATION] Escada de luminância de superfícies flat

**Princípio (Linear):** Em dark mode, shadows não funcionam (preto em preto). A solução que Linear inventou: **luminance stacking** — cada nível de elevação é uma bg com opacidade white maior. Level 1 = `rgba(255,255,255,0.02)`, Level 2 = `0.04`, Level 3 = `0.05`. Hover step na bg em vez de só mudar a border.

**Estado atual:** `--c-bg-card` é `0.04` sempre. `--c-bg-card-hover` é `0.08`. Token existe, mas `.card-glass:hover` troca bg + border-color mas não comunica "elevado" — comunica "destacado". E não existe nível "featured" — o project-featured herda o mesmo card-glass.

**Gap:** Não há ladder visual de "card normal → card hover → card featured". O FrotaViva (featured, 2 columns) usa o MESMO tom de superfície dos outros projetos. A diferenciação é só grid-span.

**Como adaptar:**
- Criar um token `--c-bg-card-featured` com opacity ligeiramente maior (~0.06) pra featured cards
- `.card-glass:hover` step real de luminância: bg de 0.04 → 0.07, border 0.08 → 0.15 accent
- Considerar adicionar 1px highlight top-edge em white `rgba(255,255,255,0.04)` via box-shadow (técnica Framer) pra criar sensação de "luz batendo no topo"
- Não adicionar drop-shadow — em dark mode não ajuda

**Risco:** baixo. É ajuste de token + uma linha de hover.

### 3.5. [CONTRAST LOGIC] Text luminance ladder tem só 3 níveis

**Princípio (Linear):** Hierarquia textual em dark mode exige 4 níveis para evitar ambiguidade:
1. Primary (`#f7f8f8`) — títulos, body de destaque
2. Secondary (`#d0d6e0`) — body padrão, descrições
3. Tertiary (`#8a8f98`) — labels, metadata, placeholders
4. Quaternary (`#62666d`) — timestamps, disabled, captions mais subtle

**Estado atual:** Portfolio tem 3 níveis — `--c-text` (`#fafafa`), `--c-text-secondary` (`#a1a1aa`), `--c-text-muted` (`#848490`). O `secondary` e `muted` estão muito próximos em luminance. Timeline period, tech tags, nav links, captions pequenas todos usam `--c-text-muted`.

**Gap:** Falta um tom "quieto-mas-legível" abaixo do muted pra coisas tipo `© 2026`, periods de timeline, mono labels tertiary. Hoje tudo muito sutil vai pro `muted` ou fica no `secondary` e compete com body.

**Como adaptar:**
- Adicionar um 4º nível `--c-text-quaternary` em torno de `#5e6168` (adaptar pro gosto)
- Mover footer copyright, hero trailing text (Sites · Sistemas · Apps · Automação com IA), timestamps de experience pra esse nível
- Manter `--c-text-muted` pra labels funcionais ativos (tech tags, nav inactive)

**Risco:** zero — é adição de token, nada é removido.

### 3.6. [ACCENT DISCIPLINE] Acento duplicado como cor primária

**Princípio (Linear + Framer):** Um único accent color como âncora do sistema. Linear = indigo-violet `#5e6ad2`. Framer = electric blue `#0099ff`. Stripe usa purple como primário + ruby/magenta APENAS como gradient decorativo. Vercel usa workflow colors APENAS dentro do contexto de workflow.

**Estado atual:** Portfolio tem **dois** accents simétricos: `--c-accent: #3b82f6` (blue) e `--c-gradient-mid: #a855f7` (purple). Eles aparecem juntos em:
- Gradient text (hero name, section title highlights)
- Avatar duotone filter
- Theme transitions (há variáveis tematizáveis `--theme-accent` e `--theme-gradient-mid`)
- Ambient blobs do background (blue + purple + pink)
- Status badges (Live=green, Em dev=blue, Em estudo=purple)

**Gap:** Não é tecnicamente errado — o sistema é pensado pra ser thematable — mas dilui a identidade. Quando tudo é "gradient blue-purple", nada é "a cor do Guilherme Bertolo". Linear tem identidade indigo. Framer tem identidade electric blue. Stripe tem identidade purple.

**Como adaptar sem trocar paleta:**
- **Opção A (conservadora):** Manter os dois accents mas disciplinar — blue é o PRIMARY (borders, CTAs, focus, links), purple é DECORATIVE ONLY (gradient text, ambient blobs). Hoje isso é quase o caso mas não 100%
- **Opção B (radical):** Eleger um deles como identidade única. Não recomendo — o duo blue→purple é parte de quem o portfolio é
- **Recomendação:** Opção A + adicionar comentário no `globals.css` explicando a regra pra não regredir. Quality gate visual.

**Risco:** baixo. É documentação + pequeno refactor nos status badges (Em dev / Em estudo podem ambos usar variantes do blue em vez de roxo).

### 3.7. [SHADOWS] Sistema de sombras inexistente em elevated cards

**Princípio (Stripe + Linear):** Mesmo em dark mode, há espaço pra shadow architecture. Stripe usa shadows blue-tinted (`rgba(50,50,93,0.25)`) pra criar atmosfera branded. Linear usa multi-layer shadow stack pra dialogs (`rgba(0,0,0,0.04) 0px 3px 2px, rgba(0,0,0,0.07) 0px 1px 1px, …`). Framer tem o combo "white 0.5px top highlight + black 30px ambient" que cria sensação de volume.

**Estado atual:** Portfolio só usa shadow pra glow (`--c-glow` no avatar, nav pulse), nunca pra elevation. Cards não têm shadow. Featured project não tem shadow.

**Gap:** Cards ficam planos. Magnetic hover 3D tilt resolve parcialmente mas é movimento, não volume estático.

**Como adaptar:**
- Adicionar shadow muito sutil no card-glass (só no estado `:hover` pra não pesar):
  - Near: `0 1px 0 0 rgba(255,255,255,0.06)` (top edge highlight, técnica Framer)
  - Far: `0 20px 40px -20px rgba(59,130,246,0.15)` (blue-tinted ambient, técnica Stripe adaptada pro seu acento)
- Featured card ganha a shadow no estado default (não só hover) pra ficar "mais alto" que os outros

**Risco:** baixo. Progressive — pode commitar só na featured primeiro.

### 3.8. [FOCUS STATES] Sistema de focus ring ausente

**Princípio (Vercel):** Focus ring acessível e consistente é um dos poucos lugares onde convenção deve ser religiosa. Vercel usa `2px solid hsla(212, 100%, 48%, 1)` em TODOS elementos interativos. Linear usa multi-layer shadow focus. A11y exige; design pode tornar identitário.

**Estado atual:** Portfolio tem `*` reset mas nenhum `:focus-visible` explícito definido. Browser default é usado. Teclado navigation funciona mas visualmente é genérico.

**Gap:** Lighthouse 100 acessibilidade é real mas a experiência keyboard é "acceptable", não "assinada". Oportunidade de polimento.

**Como adaptar:**
- Adicionar `:focus-visible` global usando `--c-accent`:
  ```css
  *:focus-visible {
    outline: 2px solid var(--c-accent);
    outline-offset: 3px;
    border-radius: 4px;
  }
  ```
- Para cards e botões pill, override com shadow focus em vez de outline (outline não respeita border-radius pill)

**Risco:** zero. É ganho puro.

### 3.9. [TYPOGRAPHY HIERARCHY] Project card titles têm sistema duplo

**Princípio (Stripe + Linear):** Um único sistema de titular por nível visual. Linear não troca de fonte entre cards — só muda weight/size. Stripe idem.

**Estado atual:** FrotaViva (featured) usa `Instrument Sans 700` em `1.75rem`. AIOX / PurgeKit / Site Advogada usam `JetBrains Mono 600` em `1.1rem`. É mistura de lane: display no featured, mono nos outros.

**Gap:** Cria um "class system" não intencional — o featured vira "título editorial", os outros viram "terminal entries". Pode parecer decisão consciente ("hierarquia por fonte") mas lê como "falta de sistema".

**Como adaptar (escolher UMA das duas):**
- **Opção A — Display em todos:** Featured fica em 1.75rem 600, outros em 1.25rem 600, mesmo font-family. Hierarquia por size + subtle tracking diff.
- **Opção B — Mono em todos (double down no code identity):** Featured em Instrument Sans 600 1.5rem, outros em JetBrains Mono 600 1.1rem. Hero mantém Instrument. Projetos viram "terminal entries" consistentes. **Minha recomendação** — reforça o tema "code-native" que o site todo já explora, e cria diferenciação memorável. Parece algo que nem Linear nem Vercel fazem.

**Risco:** baixo. É estético puro.

### 3.10. [BACKGROUND LAYERS] Muitas camadas ambiente competindo

**Princípio (Vercel + Framer):** Um background deve ser lido em <500ms e nunca mais competir pela atenção. Vercel usa branco puro. Framer usa preto puro. Stripe usa branco com um gradient radial. Linear usa near-black flat.

**Estado atual:** Portfolio empilha — shader water bg + ambient blobs (5 radial gradients no `::before` + 2 no `::after`) + noise texture + hero-grid drift + hero-glow + 12 particles + bracket motif decorative. São **sete camadas** no background do hero.

**Gap:** É impressionante tecnicamente mas é muito. O olho processa ambiguidade e desiste. Depois o conteúdo do hero compete com o próprio fundo.

**Como adaptar mantendo o shader (assinatura única):**
- **Manter:** shader water bg (assinatura) + noise overlay (depth sutil)
- **Simplificar:** reduzir os 7 radial gradients dos ambient blobs pra 2–3 máximo (hero + mid + bottom)
- **Considerar remover:** particles. Framer/Linear/Vercel não usam. São custo sem payoff
- **Manter:** hero-grid (mas com drift 45s em vez de 15s — ver 3.3) — a grade dá tech feel sem ser ruído
- **Remover definitivamente:** bracket motif. Já está display:none abaixo de 1400px e a identidade "code" está melhor servida pelos labels `// …`

**Risco:** médio. É mexer em camada sensível. Fazer incremental: particles primeiro, depois avaliar.

### 3.11. [NUMBER TREATMENT] Métricas não usam tabular numerals

**Princípio (Stripe):** Dados numéricos (Lighthouse 98, 1 developer, <1s) merecem tratamento que comunica "isso é uma medida". Stripe usa `tnum` religiosamente em financial displays. Resultado: números alinhados, lidos como "data" em vez de "text".

**Estado atual:** FrotaViva metric card tem `98 / 1 / <1s` em `var(--font-display)` weight 700. Sem tnum.

**Gap:** Números ficam em largura proporcional. Alinhamento visual entre o "98" e "<1s" não é rigoroso.

**Como adaptar:**
- Adicionar `font-feature-settings: 'tnum'` em qualquer metric display
- Considerar reduzir weight (700 → 500) + aumentar size (1.25rem → 1.5rem) — efeito Stripe de "número light é mais confiante"

**Risco:** zero.

### 3.12. [BUTTON SYSTEM] Botões ad-hoc sem lane claro

**Princípio (Linear):** 3 variants documentadas (ghost / subtle / primary brand) + consistency religiosa. Tudo que é botão cai em uma dessas três. Linear nunca tem "botão custom pra um lugar só".

**Estado atual:** Hero tem 3 botões:
- Contato — outline ghost, padding `0.625rem 1.5rem`
- Ver meu trabalho — primary solid, padding `0.75rem 2rem`
- GitHub — outline ghost, padding `0.625rem 1.5rem`

São **três paddings diferentes** entre ghost e primary. E o CTA do nav usa outro sistema ainda. Isso cria micro-ruído.

**Gap:** Falta um `.btn-primary`, `.btn-ghost`, `.btn-ghost-sm` formalizados em CSS. Hoje a maioria é inline style.

**Como adaptar:**
- Formalizar 3 classes CSS com padding unificado:
  - `.btn-primary`: `0.75rem 2rem`, bg accent, white text, pill radius
  - `.btn-ghost`: `0.75rem 2rem`, bg transparent, border 1px muted, text secondary
  - `.btn-ghost-sm`: `0.5rem 1.25rem`, mesma lógica — pra uso em nav/terciário
- Reusar nos case studies e blog
- Estabelece consistência pra futuro (FrotaViva dashboard, novos projetos)

**Risco:** baixo. Pode ser feito incremental — extrair o padrão do hero primeiro, depois migrar case studies.

---

## 4. Recomendações priorizadas por impacto visual

Tabela de priorização. Impacto = o quanto muda a percepção visual do portfolio. Esforço = linhas de código + tempo de iteração.

| # | Recomendação | Impacto | Esforço | Tier |
|---|--------------|---------|---------|------|
| 3.2 | OpenType features em Inter + tnum em métricas | Alto | Baixo | **P0** |
| 3.1 | Compressão tipográfica + weight 700→500/600 em display | Alto | Baixo | **P0** |
| 3.3 | Podar animações infinitas (border shimmer, nav glow, gradient shimmer) | Alto | Médio | **P0** |
| 3.5 | 4º nível de text luminance (`--c-text-quaternary`) | Médio | Baixo | **P1** |
| 3.4 | Luminance stepping no hover de cards | Médio | Baixo | **P1** |
| 3.8 | Focus ring global com `--c-accent` | Médio | Baixo | **P1** |
| 3.7 | Shadow system 2-layer em featured card | Médio | Baixo | **P1** |
| 3.10 | Reduzir camadas de background (particles, bracket motif) | Alto | Médio | **P1** |
| 3.9 | Consolidar project card titles (uma lane) | Médio | Médio | **P2** |
| 3.11 | Métricas com weight 500 + tnum | Médio | Baixo | **P2** |
| 3.12 | Formalizar button system (3 variants) | Baixo | Médio | **P2** |
| 3.6 | Disciplina de accent (blue primary, purple decorative only) | Baixo | Baixo | **P2** |

**Tiers:**
- **P0 (fazer primeiro):** mudam a percepção imediata sem refactor estrutural. Cabem em 1 sessão de @dev.
- **P1 (next sprint):** mudanças de sistema que colhem bem juntas. Mudar tokens e propagar.
- **P2 (polish contínuo):** refinos que cabem no fluxo normal de manutenção.

---

## 5. Matriz de princípios extraídos por referência

Rastreabilidade — qual DESIGN.md inspirou qual recomendação.

| Princípio extraído | Vercel | Linear | Stripe | Framer | Aplicado em |
|--------------------|--------|--------|--------|--------|-------------|
| Compressão tipográfica agressiva em display | X | X | X | X | 3.1 |
| OpenType features como identidade | X | X | X | X | 3.2 |
| Motion pontual, não contínuo | X | X | X | – | 3.3 |
| Luminance stacking em dark surfaces | – | X | – | X | 3.4, 3.5 |
| Weight leve em display = confiança | – | – | X | – | 3.1, 3.11 |
| Shadow blue-tinted pra atmosfera branded | – | – | X | X | 3.7 |
| Top-edge highlight em cards elevated | – | – | – | X | 3.7 |
| Accent único como âncora | – | X | – | X | 3.6 |
| Focus ring como sistema, não afterthought | X | X | – | – | 3.8 |
| tnum em data/metrics | X | – | X | – | 3.2, 3.11 |
| Background mínimo, void sagrado | X | X | – | X | 3.10 |
| Button system com 3 variants max | – | X | – | – | 3.12 |

Nenhum valor literal (hex, font-family, padding em px) foi propagado. Cada recomendação é adaptação de padrão ao código e identidade existentes do portfolio.

---

## 6. Explicitamente fora de escopo

Pra não deixar margem pra interpretação:

- **NÃO** trocar a paleta base (`#0a0a0a` bg + `#fafafa` text + accent duo blue/purple)
- **NÃO** trocar Inter / JetBrains Mono / Instrument Sans
- **NÃO** remover o shader water background (é assinatura única)
- **NÃO** remover magnetic cards ou custom cursor (são identidade)
- **NÃO** remover letter reveal do hero (é memorável)
- **NÃO** trocar a estrutura de sections (hero / sobre / projetos / stack / processo / experiência / contato)
- **NÃO** adicionar features novas (blog, case studies, chat AI permanecem como estão — este audit é visual/tipográfico)
- **NÃO** mexer nos case studies (`app/case/frotaviva`, `app/case/site-advogada`) — audit focou no home. Próxima iteração pode estender pra lá.

---

## 7. Próximos passos possíveis

Este audit é **análise pura**. Nenhum código foi mudado. Sugestões de caminhos a partir daqui:

1. **Aprovação e priorização** — revisar as 12 recomendações, validar tiers, descartar as que não se alinham com visão pessoal
2. **Story única com P0** — pedir pro `@pm` criar 1 story agregando as 3 recomendações P0 (tipografia + motion + OpenType). Essas três juntas dão uplift perceptível num único deploy.
3. **Stories separadas por tier P1** — P1 tem itens independentes que podem ir individualmente (text-quaternary, focus ring, shadow system, background cleanup). Idealmente cada uma = 1 story pequena.
4. **P2 como backlog contínuo** — entra no fluxo de manutenção, não exige sprint dedicado.
5. **Ou arquivar** — se a conclusão for "o portfolio está bom como está, não quero mexer", este documento fica como referência pra futuras iterações.

Caminho alternativo: pedir pro `@dev` implementar direto as P0 (são low risk, fácil validar localmente). Pedir pro `@pm` apenas se quiser estruturar via story formal.

---

## Apêndice A — Referências de arquivos

**Portfolio:**
- `apps/portfolio/src/app/page.tsx` — 447 linhas, todas as sections inline
- `apps/portfolio/src/app/globals.css` — 887 linhas, tokens + efeitos + animations
- `apps/portfolio/src/app/layout.tsx` — fontes e metadata
- `apps/portfolio/src/app/effects.tsx` — IntersectionObserver reveals + magnetic cards + custom cursor
- `apps/portfolio/src/app/shader-background.tsx` — water shader
- `apps/portfolio/src/app/case/frotaviva/` — case study
- `apps/portfolio/src/app/case/site-advogada/` — case study

**Biblioteca de referência consultada:**
- `docs/library/design-md/vercel/DESIGN.md` (engineered minimalism + shadow-as-border)
- `docs/library/design-md/linear/DESIGN.md` (dark luminance stacking + single accent + weight 510)
- `docs/library/design-md/stripe/DESIGN.md` (light-weight display confidence + blue-tinted shadows)
- `docs/library/design-md/framer/DESIGN.md` (extreme compression + void canvas + ring shadows)

**Regra aplicada:** `.claude/rules/design-md-library.md` — "REFERENCIA, NAO COPIA". Nenhum hex, font-family ou padding literal foi propagado.

---

*Audit produzido por @ux-design-expert (Uma) em modo análise — sem implementação.*
