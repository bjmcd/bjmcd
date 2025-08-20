// scripts/assemble-docs.mjs
import { cp, mkdir, rm, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

const outRoot = resolve('dist');
const jhuSrc  = resolve('apps/jhu/dist');
const sweSrc  = resolve('apps/swe/dist');
const jhuDst  = resolve(outRoot, 'docs/jhu');
const sweDst  = resolve(outRoot, 'docs/swe');

async function exists(p) {
  try { await stat(p); return true; } catch { return false; }
}

async function copySpace(src, dst, label) {
  if (!(await exists(src))) {
    console.warn(`⚠️  ${label}: ${src} not found (did the build step succeed?)`);
    return;
  }
  await rm(dst, { recursive: true, force: true });
  await mkdir(dst, { recursive: true });
  await cp(src, dst, { recursive: true });
  console.log(`✅ Copied ${label} -> ${dst}`);
}

await mkdir(resolve(outRoot, 'docs'), { recursive: true });
await copySpace(jhuSrc, jhuDst, 'JHU');
await copySpace(sweSrc, sweDst, 'SWE');
console.log('🎉 Assembly complete.');
