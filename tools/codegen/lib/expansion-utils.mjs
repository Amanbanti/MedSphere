import fs from 'node:fs/promises';
import path from 'node:path';

export function pascal(str) {
  return str
    .split(/[-_]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

export function camel(str) {
  const p = pascal(str);
  return p.charAt(0).toLowerCase() + p.slice(1);
}

export function kebab(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase();
}

export function countLines(content) {
  return content.split('\n').length;
}

export class Stats {
  constructor() {
    this.files = 0;
    this.lines = 0;
    this.paths = [];
    this.errors = [];
  }

  record(relativePath, content) {
    this.files += 1;
    this.lines += countLines(content);
    this.paths.push(relativePath);
  }
}

export async function writeFile(root, relativePath, content, stats) {
  const fullPath = path.join(root, relativePath);
  await fs.mkdir(path.dirname(fullPath), { recursive: true });
  await fs.writeFile(fullPath, content, 'utf8');
  stats.record(relativePath, content);
}

export async function appendOrWrite(root, relativePath, content, stats) {
  const fullPath = path.join(root, relativePath);
  await fs.mkdir(path.dirname(fullPath), { recursive: true });
  let existing = '';
  try {
    existing = await fs.readFile(fullPath, 'utf8');
  } catch {
    /* new file */
  }
  const merged = existing ? `${existing.trimEnd()}\n\n${content}` : content;
  await fs.writeFile(fullPath, merged, 'utf8');
  if (!existing) {
    stats.record(relativePath, content);
  } else {
    stats.lines += countLines(content);
  }
}

export function enumBlock(name, values) {
  return `export enum ${name} {\n${values.map((v) => `  ${v} = '${v}',`).join('\n')}\n}`;
}

export function interfaceBlock(name, fields) {
  const body = fields.map((f) => `  ${f.name}${f.optional ? '?' : ''}: ${f.type};`).join('\n');
  return `export interface ${name} {\n${body}\n}`;
}

export function repeatVariants(base, count, mapper) {
  return Array.from({ length: count }, (_, i) => mapper(base, i));
}
