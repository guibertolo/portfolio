import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';

const PROSPECCAO_REPO =
  'C:\\Users\\guiro\\OneDrive\\Documentos\\Negocios\\prospeccao-advogados-2026-05';
const LEADS_PATH = path.join(PROSPECCAO_REPO, 'leads-mensagem.json');

export interface LeadMensagem {
  telefone: string;
  ddd: string;
  uf: string;
  regiao: string;
  onda: number | null;
  status: 'pendente' | 'enviado' | 'respondeu' | 'em_conversa' | 'negou' | 'frio' | 'promovido';
  nome: string | null;
  sexo: 'M' | 'F' | null;
  tratamento: 'Dr.' | 'Dra.' | 'Doutor(a)' | null;
  templateUsado: string | null;
  dataEnvio: string | null;
  dataResposta: string | null;
  observacao: string | null;
  promovidoPara: string | null;
}

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available' }, { status: 404 });
  }

  try {
    const raw = await fs.readFile(LEADS_PATH, 'utf-8');
    const leads: LeadMensagem[] = JSON.parse(raw);

    // Calcula stats
    const stats: Record<string, number> = {};
    for (const lead of leads) {
      stats[lead.status] = (stats[lead.status] || 0) + 1;
    }

    return NextResponse.json({ leads, stats, total: leads.length });
  } catch (e: unknown) {
    return NextResponse.json(
      {
        error: 'Falha ao ler leads-mensagem.json',
        detail: String(e),
        path: LEADS_PATH,
      },
      { status: 500 },
    );
  }
}
