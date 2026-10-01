// Builds the game web bundle into the Android assets folder.
// Usage: node scripts/build.mjs [--watch]
import * as esbuild from 'esbuild';
import { cpSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const webRoot = resolve(here, '..');
const repoRoot = resolve(webRoot, '..');
const outDir = join(repoRoot, 'android', 'app', 'src', 'main', 'assets', 'www');

mkdirSync(outDir, { recursive: true });

/** @type {import('esbuild').BuildOptions} */
const options = {
  entryPoints: [join(webRoot, 'src', 'main.js')],
  bundle: true,
  minify: true,
  sourcemap: false,
  format: 'iife',
  target: ['chrome80'],
  outfile: join(outDir, 'app.js'),
  define: { 'process.env.NODE_ENV': '"production"', global: 'window' },
  legalComments: 'none',
  logLevel: 'info'
};

// Static files next to the bundle
const staticFiles = ['index.html', 'style.css'];
function copyStatic() {
  for (const f of staticFiles) {
    const src = join(webRoot, f);
    if (existsSync(src)) cpSync(src, join(outDir, f));
  }
}

if (process.argv.includes('--watch')) {
  const ctx = await esbuild.context(options);
  copyStatic();
  await ctx.watch();
  console.log('[build] watching…');
} else {
  await esbuild.build(options);
  copyStatic();
  console.log('[build] bundle written to', outDir);
}
