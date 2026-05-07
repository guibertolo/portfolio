/**
 * Templates de mensagem inicial pra disparar pelo WhatsApp.
 *
 * Sintaxe formatacao WhatsApp:
 *   *texto*    -> negrito
 *   _texto_    -> italico
 *   ~texto~    -> tachado
 *   `texto`    -> mono
 *
 * Edita os templates direto neste arquivo. Proximo refresh do admin
 * pega as mudancas automaticamente.
 */

export interface TemplateContext {
  nome: string;
  tratamento: 'Dr.' | 'Dra.' | 'Doutor(a)';
  sexo: 'M' | 'F' | null;
}

export interface Template {
  id: string;
  nome: string;
  descricao: string;
  gerar: (ctx: TemplateContext) => string;
}

const SAUDACAO_FECHADO = (ctx: TemplateContext) =>
  ctx.nome ? `*${ctx.tratamento} ${ctx.nome}*` : `*${ctx.tratamento}*`;

const VOCATIVO = (ctx: TemplateContext) => SAUDACAO_FECHADO(ctx);

export const TEMPLATES: Template[] = [
  {
    id: 'a',
    nome: 'Conexão leve',
    descricao: 'Primeira aproximação amigável + caso da Gislaine',
    gerar: (ctx) =>
      `Olá, ${VOCATIVO(ctx)}, tudo bem?

Te encontrei pelo grupo do *Vinicius Nunes*. Sou desenvolvedor e tenho atendido advogados do grupo que perceberam o seguinte: investem pesado em tráfego e conteúdo, mas o site institucional não acompanha e segura a conversão na hora H.

Caso recente que entreguei: *Dra. Gislaine Rodrigues*, família-SBC.

https://advogadagislainerodrigues.com.br

Site no padrão da estratégia que o Vinicius prega: _autoridade, captação por WhatsApp, performance, SEO local_.

Posso te mandar uma proposta sob medida pro seu escritório?`,
  },
  {
    id: 'c',
    nome: 'Caso direto',
    descricao: 'Direto ao ponto, mostra o caso e oferece',
    gerar: (ctx) =>
      `Olá, ${VOCATIVO(ctx)}. Te encontrei pelo grupo do *Vinicius Nunes*.

Trabalho com sites de advocacia no padrão que ele ensina: _autoridade, prova social, SEO local, conversão por WhatsApp_.

Caso recente: a *Dra. Gislaine* (família, SBC) tinha um site que não refletia o trabalho dela. Reconstruímos do zero.

Resultado: https://advogadagislainerodrigues.com.br

Se faz sentido pro seu escritório ter algo nesse nível, me chama que te mostro como seria.`,
  },
];

export function getTemplateById(id: string): Template | undefined {
  return TEMPLATES.find((t) => t.id === id);
}
