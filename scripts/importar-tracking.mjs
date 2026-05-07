#!/usr/bin/env node
/**
 * Importa o tracking.csv da campanha de prospeccao pro leads-mensagem.json.
 *
 * Source: prospeccao-advogados-2026-05/tracking.csv
 * Destino: prospeccao-advogados-2026-05/leads-mensagem.json (mesmo repo privado)
 *
 * Reexecutar e seguro: preserva dados ja preenchidos (nome, sexo, status, etc.)
 * pra cada telefone existente. So adiciona telefones novos.
 *
 * Uso:
 *   node scripts/importar-tracking.mjs
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const PROSPECCAO_REPO =
  'C:\\Users\\guiro\\OneDrive\\Documentos\\Negocios\\prospeccao-advogados-2026-05';
const TRACKING_CSV = path.join(PROSPECCAO_REPO, 'tracking.csv');
const LEADS_PATH = path.join(PROSPECCAO_REPO, 'leads-mensagem.json');

function parseCsv(text) {
  const linhas = text.split(/\r?\n/).filter((l) => l.trim());
  const header = linhas[0].split(',');
  return linhas.slice(1).map((linha) => {
    const valores = linha.split(',');
    const obj = {};
    header.forEach((h, i) => {
      obj[h.trim()] = valores[i]?.trim() || null;
    });
    return obj;
  });
}

async function main() {
  // Le CSV existente
  const csvText = await fs.readFile(TRACKING_CSV, 'utf-8');
  const linhas = parseCsv(csvText);
  console.log(`[csv] ${linhas.length} linhas lidas do tracking.csv`);

  // Le existente (pra preservar dados)
  let existente = [];
  try {
    const raw = await fs.readFile(LEADS_PATH, 'utf-8');
    existente = JSON.parse(raw);
    console.log(`[json] ${existente.length} leads ja existem em leads-mensagem.json`);
  } catch {
    console.log('[json] arquivo nao existe, criando do zero');
  }

  // Map por telefone pra merge rapido
  const mapaExistente = new Map(existente.map((l) => [l.telefone, l]));

  let novos = 0;
  let preservados = 0;

  const merged = linhas.map((csv) => {
    const telefone = csv.numero;

    if (mapaExistente.has(telefone)) {
      preservados++;
      const old = mapaExistente.get(telefone);
      return {
        ...old,
        telefone,
        ddd: csv.ddd,
        uf: csv.uf,
        regiao: csv.regiao,
        onda: parseInt(csv.onda, 10) || null,
      };
    }

    novos++;
    return {
      telefone,
      ddd: csv.ddd,
      uf: csv.uf,
      regiao: csv.regiao,
      onda: parseInt(csv.onda, 10) || null,
      status: 'pendente',
      nome: null,
      sexo: null,
      tratamento: null,
      templateUsado: null,
      dataEnvio: null,
      dataResposta: null,
      observacao: null,
      promovidoPara: null,
    };
  });

  await fs.writeFile(LEADS_PATH, JSON.stringify(merged, null, 2) + '\n', 'utf-8');

  console.log(`\n[ok] ${merged.length} leads gravados em:`);
  console.log(`     ${LEADS_PATH}`);
  console.log(`[stats] ${novos} novos · ${preservados} preservados (dados mantidos)`);
}

main().catch((e) => {
  console.error('[erro]', e);
  process.exit(1);
});
