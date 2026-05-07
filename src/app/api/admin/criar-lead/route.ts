import { NextResponse } from 'next/server';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';

interface LeadInput {
  nome: string;
  tratamento: 'Dr.' | 'Dra.' | 'Doutor(a)';
  areaAtuacao: string;
  cidade: string;
  temSite: 'sim' | 'nao' | 'desconhecido';
}

interface LeadStored {
  slug: string;
  tratamento: string;
  nome: string | null;
  areaAtuacao: string | null;
  cidade: string | null;
  temSite: 'sim' | 'nao' | null;
}

function slugifyNome(nome: string): string {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function gerarHash(): string {
  return crypto.randomBytes(4).toString('hex').slice(0, 6);
}

export async function POST(req: Request) {
  // Guard: so funciona em dev local
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
  }

  let input: LeadInput;
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ error: 'JSON invalido' }, { status: 400 });
  }

  // Validacoes basicas
  if (!input.nome?.trim()) {
    return NextResponse.json({ error: 'Nome obrigatorio' }, { status: 400 });
  }
  if (!['Dr.', 'Dra.', 'Doutor(a)'].includes(input.tratamento)) {
    return NextResponse.json({ error: 'Tratamento invalido' }, { status: 400 });
  }
  if (!['sim', 'nao', 'desconhecido'].includes(input.temSite)) {
    return NextResponse.json({ error: 'temSite invalido' }, { status: 400 });
  }

  // Gera slug com hash
  const slugBase = slugifyNome(input.nome);
  const hash = gerarHash();
  const slug = `${slugBase}-${hash}`;

  // Mapeia desconhecido para null no JSON (interface da proposta)
  const temSiteStored: 'sim' | 'nao' | null =
    input.temSite === 'desconhecido' ? null : input.temSite;

  const novoLead: LeadStored = {
    slug,
    tratamento: input.tratamento,
    nome: input.nome.trim(),
    areaAtuacao: input.areaAtuacao?.trim() || null,
    cidade: input.cidade?.trim() || null,
    temSite: temSiteStored,
  };

  // Le, adiciona, escreve
  const repoRoot = process.cwd();
  const leadsPath = path.join(repoRoot, 'src', 'data', 'leads.json');

  let leads: LeadStored[];
  try {
    const raw = await fs.readFile(leadsPath, 'utf-8');
    leads = JSON.parse(raw);
  } catch (e: unknown) {
    return NextResponse.json(
      { error: 'Falha ao ler leads.json', detail: String(e) },
      { status: 500 },
    );
  }

  // Conflito de slug (improvavel mas possivel)
  if (leads.some((l) => l.slug === slug)) {
    return NextResponse.json(
      { error: 'Slug duplicado, tente novamente' },
      { status: 409 },
    );
  }

  leads.push(novoLead);

  try {
    await fs.writeFile(leadsPath, JSON.stringify(leads, null, 2) + '\n', 'utf-8');
  } catch (e: unknown) {
    return NextResponse.json(
      { error: 'Falha ao escrever leads.json', detail: String(e) },
      { status: 500 },
    );
  }

  // Git: add, commit, push
  let gitOk = false;
  let gitError: string | null = null;
  try {
    execSync(`git add src/data/leads.json`, { cwd: repoRoot, stdio: 'pipe' });
    execSync(
      `git commit -m "feat(proposta): novo lead ${slug}"`,
      { cwd: repoRoot, stdio: 'pipe' },
    );
    execSync(`git push origin main`, { cwd: repoRoot, stdio: 'pipe', timeout: 30000 });
    gitOk = true;
  } catch (e: unknown) {
    const err = e as { stderr?: Buffer; message?: string };
    gitError = err.stderr?.toString() || err.message || 'erro desconhecido';
  }

  return NextResponse.json({
    slug,
    url: `https://guilhermebertolo.com.br/proposta/${slug}`,
    urlLocal: `http://localhost:3002/proposta/${slug}`,
    gitOk,
    gitError,
    nomeCompleto: `${input.tratamento} ${input.nome}`.trim(),
    temSite: temSiteStored,
  });
}
