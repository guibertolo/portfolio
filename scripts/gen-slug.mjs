#!/usr/bin/env node
/**
 * Gera slug seguro para lead da campanha de prospeccao.
 * Formato: nome-normalizado-HASH6
 * Hash impede enumeracao (advogado A nao consegue adivinhar URL do advogado B).
 *
 * Uso:
 *   node scripts/gen-slug.mjs "João Silva"
 *   → joao-silva-q3xkp7
 *
 *   node scripts/gen-slug.mjs "Dra. Maria Santos"
 *   → dra-maria-santos-8dhf2m
 *
 * Se chamado sem argumento, gera slug genérico tipo lead-q3xkp7.
 */

import crypto from 'node:crypto';

function slugifyNome(nome) {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function gerarHash() {
  return crypto.randomBytes(4).toString('hex').slice(0, 6);
}

const nomeArg = process.argv.slice(2).join(' ').trim();
const slugBase = nomeArg ? slugifyNome(nomeArg) : 'lead';
const hash = gerarHash();
const slug = `${slugBase}-${hash}`;

console.log(slug);
