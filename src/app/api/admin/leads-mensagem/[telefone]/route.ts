import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';
import { execSync } from 'node:child_process';

const PROSPECCAO_REPO =
  'C:\\Users\\guiro\\OneDrive\\Documentos\\Negocios\\prospeccao-advogados-2026-05';
const LEADS_PATH = path.join(PROSPECCAO_REPO, 'leads-mensagem.json');

interface PatchInput {
  status?: 'pendente' | 'enviado' | 'respondeu' | 'em_conversa' | 'negou' | 'frio' | 'promovido';
  nome?: string | null;
  sexo?: 'M' | 'F' | null;
  tratamento?: 'Dr.' | 'Dra.' | 'Doutor(a)' | null;
  templateUsado?: string | null;
  observacao?: string | null;
  promovidoPara?: string | null;
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ telefone: string }> },
) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available' }, { status: 404 });
  }

  const { telefone } = await params;
  const decoded = decodeURIComponent(telefone);

  let input: PatchInput;
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON invalido' }, { status: 400 });
  }

  // Le leads atual
  let leads;
  try {
    const raw = await fs.readFile(LEADS_PATH, 'utf-8');
    leads = JSON.parse(raw);
  } catch (e) {
    return NextResponse.json(
      { error: 'Falha ao ler leads-mensagem.json', detail: String(e) },
      { status: 500 },
    );
  }

  // Encontra e atualiza
  const idx = leads.findIndex((l: { telefone: string }) => l.telefone === decoded);
  if (idx === -1) {
    return NextResponse.json({ error: `Lead ${decoded} nao encontrado` }, { status: 404 });
  }

  const old = leads[idx];
  const novo = {
    ...old,
    ...input,
  };

  // Se mudou de pendente pra enviado e nao tem dataEnvio, seta agora
  if (input.status === 'enviado' && old.status !== 'enviado' && !novo.dataEnvio) {
    novo.dataEnvio = new Date().toISOString();
  }

  // Se mudou pra respondeu/em_conversa e nao tem dataResposta, seta agora
  if (
    (input.status === 'respondeu' || input.status === 'em_conversa') &&
    !novo.dataResposta
  ) {
    novo.dataResposta = new Date().toISOString();
  }

  leads[idx] = novo;

  // Salva
  try {
    await fs.writeFile(LEADS_PATH, JSON.stringify(leads, null, 2) + '\n', 'utf-8');
  } catch (e) {
    return NextResponse.json(
      { error: 'Falha ao escrever leads-mensagem.json', detail: String(e) },
      { status: 500 },
    );
  }

  // Git: add, commit, push NO REPO DE PROSPECCAO (privado)
  let gitOk = false;
  let gitError: string | null = null;
  try {
    execSync(`git -C "${PROSPECCAO_REPO}" add leads-mensagem.json`, { stdio: 'pipe' });
    execSync(
      `git -C "${PROSPECCAO_REPO}" commit -m "update lead ${decoded}: ${novo.status}"`,
      { stdio: 'pipe' },
    );
    execSync(`git -C "${PROSPECCAO_REPO}" push origin main`, { stdio: 'pipe', timeout: 30000 });
    gitOk = true;
  } catch (e: unknown) {
    const err = e as { stderr?: Buffer; message?: string };
    gitError = err.stderr?.toString() || err.message || 'erro desconhecido';
  }

  return NextResponse.json({ lead: novo, gitOk, gitError });
}
