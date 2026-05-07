export interface StyleDirection {
  slug: string;
  nome: string;
  tagline: string;
  adjetivos: [string, string, string];
  paleta: {
    bg: string;
    bgSecondary: string;
    text: string;
    textSecondary: string;
    accent: string;
  };
  fonts: {
    display: string;
    displayFamily: string;
    corpo: string;
    corpoFamily: string;
    mono?: string;
    monoFamily?: string;
  };
  tomDeVoz: string;
  tratamentoImagens: string;
  hierarquiaTipografica: string;
  layoutSignature: string;
  funcionaPara: string;
  naoEhPraVoceSe: string;
  antiPattern: string;
}

// Disclaimer fixo (todas as direções)
export const DISCLAIMER_CUSTOMIZACAO =
  'Esta direção é ponto de partida. Paleta, fontes e proporções são ajustadas pro seu escritório no briefing.';

export const STYLES: StyleDirection[] = [
  {
    slug: 'toga-granito',
    nome: 'Toga & Granito',
    tagline: 'Décadas defendendo causas, sem precisar gritar.',
    adjetivos: ['institucional', 'denso', 'cerimonioso'],
    paleta: {
      bg: '#F5F1E8',
      bgSecondary: '#E8E1D0',
      text: '#0D1117',
      textSecondary: '#5C5448',
      accent: '#7A1B26',
    },
    fonts: {
      display: 'Cormorant Garamond',
      displayFamily: '"Cormorant Garamond", Georgia, serif',
      corpo: 'Source Serif 4',
      corpoFamily: '"Source Serif 4", "Source Serif Pro", Georgia, serif',
    },
    tomDeVoz:
      'Formal, tratamento por senhor/senhora, terceira pessoa. Frases longas, latinismos contidos. Postura de jurista veterano.',
    tratamentoImagens:
      'Fotografia em preto e branco com grão sutil. Estantes, mãos sobre processo físico, fachada histórica. Zero stock corporativo.',
    hierarquiaTipografica:
      'Headlines em serif com itálico ocasional, tamanho moderado, peso regular. Corpo serif transitional 17px com leading generoso. Smallcaps em áreas.',
    layoutSignature:
      'Coluna central estreita estilo livro, margens largas, regra fina horizontal de 1px sépia separando seções. Brasão ou monograma no topo.',
    funcionaPara:
      'Banca tradicional 30+ anos, sociedade de nome composto, cível complexo, sucessões e empresarial consultivo. Ticket cinco a seis dígitos por causa.',
    naoEhPraVoceSe:
      'Você quer transmitir frescor, modernidade ou abordagem disruptiva.',
    antiPattern: 'Gradientes vibrantes ou ilustrações flat',
  },
  {
    slug: 'linha-clara',
    nome: 'Linha Clara',
    tagline: 'Direito direto, sem cortina nem firula.',
    adjetivos: ['limpo', 'confiante', 'desarmado'],
    paleta: {
      bg: '#FFFFFF',
      bgSecondary: '#F4F4F2',
      text: '#111111',
      textSecondary: '#5A5A5A',
      accent: '#2E5BFF',
    },
    fonts: {
      display: 'Inter',
      displayFamily: 'Inter, system-ui, sans-serif',
      corpo: 'Inter',
      corpoFamily: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono',
      monoFamily: '"JetBrains Mono", monospace',
    },
    tomDeVoz:
      'Direto e claro, tratamento por você, primeira pessoa do plural. Frases curtas. Honesto sobre prazos e custos.',
    tratamentoImagens:
      'Fotografia editorial colorida, luz natural, retratos de perto, sem terno engomado. Mostra o advogado como pessoa.',
    hierarquiaTipografica:
      'Headlines sans-serif grandes 56-72px, peso 700, tracking levemente fechado. Corpo 17px peso 400. Labels em mono uppercase 12px com tracking aberto.',
    layoutSignature:
      'Grid de 12 colunas rígido, muito ar entre blocos, divisores invisíveis. Botões retangulares com canto de 2px. Foto + texto lado a lado em 50/50.',
    funcionaPara:
      'Advogado solo ou dupla, 30 a 42 anos, atuação em consumidor, trabalhista pessoa física ou previdenciário urbano. Ticket R$ 1.500 a R$ 8.000.',
    naoEhPraVoceSe:
      'Você quer transmitir tradição, peso institucional ou exclusividade boutique.',
    antiPattern: 'Texturas, ornamentos, dourado',
  },
  {
    slug: 'manuscrito-privado',
    nome: 'Manuscrito Privado',
    tagline: 'Discrição é a primeira cláusula do contrato.',
    adjetivos: ['sigiloso', 'refinado', 'editorial'],
    paleta: {
      bg: '#0E0E0C',
      bgSecondary: '#181815',
      text: '#EDE6D3',
      textSecondary: '#8B8470',
      accent: '#C9A55C',
    },
    fonts: {
      display: 'Playfair Display',
      displayFamily: '"Playfair Display", Georgia, serif',
      corpo: 'Lora',
      corpoFamily: 'Lora, Georgia, serif',
    },
    tomDeVoz:
      'Sofisticado, contido, terceira pessoa. Sugere mais do que afirma. Casos não são detalhados, são aludidos. Linguagem editorial.',
    tratamentoImagens:
      'Pouquíssimas imagens. Naturezas mortas em luz baixa: caneta-tinteiro, copo de uísque, vinil, livro aberto. Cor desaturada com grão de filme.',
    hierarquiaTipografica:
      'Headlines serif italic gigantes 80-120px, tipo capa de revista. Corpo serif 18px com leading 1.7. Drop cap na primeira letra de seções.',
    layoutSignature:
      'Página única longa com scroll cinematográfico. Texto justificado em coluna estreita centralizada estilo The New Yorker. Linhas finas em ouro separando capítulos.',
    funcionaPara:
      'Boutique de criminalista de defesa branca, M&A premium ou family office. Sócio fundador 45+, clientela por indicação restrita. Ticket seis dígitos por mandato.',
    naoEhPraVoceSe:
      'Você precisa de funil agressivo de captação ou alto volume de leads.',
    antiPattern: 'Formulário de captura agressivo, popup de WhatsApp, contador de processos',
  },
  {
    slug: 'casa-aberta',
    nome: 'Casa Aberta',
    tagline: 'Você chega com um problema, sai com um plano.',
    adjetivos: ['caloroso', 'claro', 'próximo'],
    paleta: {
      bg: '#FBF8F3',
      bgSecondary: '#F0E8DB',
      text: '#2A2118',
      textSecondary: '#6B5D4F',
      accent: '#C25A3C',
    },
    fonts: {
      display: 'Fraunces',
      displayFamily: 'Fraunces, Georgia, serif',
      corpo: 'Nunito',
      corpoFamily: 'Nunito, system-ui, sans-serif',
    },
    tomDeVoz:
      'Acolhedor, tratamento por você direto, primeira pessoa singular. Empático sem ser piegas. Explica como conversa de cozinha.',
    tratamentoImagens:
      'Fotografia colorida com luz dourada de fim de tarde. Famílias reais, mãos entrelaçadas, mesa de café. Ilustrações vetoriais leves opcionais.',
    hierarquiaTipografica:
      'Headlines serif arredondado tamanho moderado 44-56px, peso 500. Corpo sans humanista 18px com leading 1.65. Aspas decorativas grandes em depoimentos.',
    layoutSignature:
      'Cantos arredondados 16px em cards e botões. Seções com background alternado em creme e areia. Depoimentos com foto circular grande. Linha de tempo passo a passo.',
    funcionaPara:
      'Direito de família, sucessões pessoa física, previdenciário rural, advocacia popular. Profissional 30 a 50 anos. Ticket R$ 2.000 a R$ 15.000 por caso.',
    naoEhPraVoceSe:
      'Você atende clientela corporativa exigente que espera frieza profissional.',
    antiPattern: 'Preto puro como fundo, jargão técnico, foto de martelo de juiz',
  },
  {
    slug: 'sala-de-servidores',
    nome: 'Sala de Servidores',
    tagline: 'Direito tributário com a precisão de uma planilha auditada.',
    adjetivos: ['técnico', 'calibrado', 'contemporâneo'],
    paleta: {
      bg: '#0A0E14',
      bgSecondary: '#141A22',
      text: '#E8ECF1',
      textSecondary: '#7B8794',
      accent: '#3DDC97',
    },
    fonts: {
      display: 'Space Grotesk',
      displayFamily: '"Space Grotesk", system-ui, sans-serif',
      corpo: 'Inter',
      corpoFamily: 'Inter, system-ui, sans-serif',
      mono: 'IBM Plex Mono',
      monoFamily: '"IBM Plex Mono", "Courier New", monospace',
    },
    tomDeVoz:
      'Analítico, terceira pessoa profissional, precisão acima de calor. Cita números, percentuais, tempo médio. Postura de consultor sênior.',
    tratamentoImagens:
      'Pouquíssimas fotos humanas. Renders 3D abstratos, gráficos de dados, dashboards anonimizados. Fotos de pessoa em fundo escuro com iluminação dramática.',
    hierarquiaTipografica:
      'Headlines sans geométrico 48-64px com tracking apertado. Corpo 16px com leading 1.6. Números e valores em mono tabular grandes, destacados.',
    layoutSignature:
      'Grid denso com cards de borda fina 1px em cinza-aço. Dashboards com gráficos. Tabelas de comparação tributária. Tags de tecnologias e legislação em mono.',
    funcionaPara:
      'Tributário corporativo, M&A, compliance, regulatório, LGPD. Banca 5 a 20 advogados, sócios 35 a 50 anos, clientes PJ médio e grande porte. Retainer mensal R$ 15.000+.',
    naoEhPraVoceSe:
      'Você atende pessoa física em causas sensíveis e quer transmitir calor humano.',
    antiPattern: 'Imagens de balança da justiça, citações em latim, paleta sépia',
  },
  {
    slug: 'sala-lilas',
    nome: 'Sala Lilás',
    tagline: 'Postura, técnica e a coragem que esse caso exige.',
    adjetivos: ['refinada', 'firme', 'contemporânea'],
    paleta: {
      bg: '#F8F4F2',
      bgSecondary: '#EDE3DE',
      text: '#1F1419',
      textSecondary: '#6E5862',
      accent: '#5B2A4E',
    },
    fonts: {
      display: 'DM Serif Display',
      displayFamily: '"DM Serif Display", Georgia, serif',
      corpo: 'DM Sans',
      corpoFamily: '"DM Sans", system-ui, sans-serif',
    },
    tomDeVoz:
      'Firme e elegante, primeira pessoa singular, tratamento por você. Não pede licença pra ocupar espaço. Autoridade técnica sem masculinizar.',
    tratamentoImagens:
      'Fotografia editorial colorida com paleta uva e nude. Retrato de corpo inteiro estilo revista de moda séria, posicionamento confiante.',
    hierarquiaTipografica:
      'Headlines serif com contraste alto entre traços grossos e finos, 64-88px, peso 400. Corpo sans 17px com leading 1.6. Subtítulos em itálico serif menor.',
    layoutSignature:
      'Assimetria intencional, foto grande sangrando da margem direita, texto à esquerda em coluna estreita. Detalhes finos em uva sublinhando palavras-chave.',
    funcionaPara:
      'Advogada solo ou banca pequena liderada por mulher, 32 a 48 anos. Família alto patrimônio, criminal feminino, societário boutique, direito médico. Ticket cinco dígitos.',
    naoEhPraVoceSe:
      'Você quer estética masculina tradicional ou conservadora institucional.',
    antiPattern: 'Rosa Barbie chiclete, ícones de coração ou flor, fonte script de casamento',
  },
];
