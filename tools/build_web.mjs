#!/usr/bin/env node
/**
 * Bundles the ES-module game sources (web/src) into a single classic script that
 * runs inside the Android WebView / any desktop browser.
 *
 *   node tools/build_web.mjs            # production bundle
 *   node tools/build_web.mjs --watch    # rebuild on change (dev)
 *   node tools/build_web.mjs --dev      # unminified bundle with sourcemap
 *
 * Output: android/assets/www/game.bundle.js  (+ index.html / styles copied by --copy)
 */
import { build, context } from 'esbuild';
import { cpSync, mkdirSync, existsSync, readdirSync, statSync, copyFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const WEB = join(ROOT, 'web');
const OUT_DIR = join(ROOT, 'android', 'assets', 'www');

const watch = process.argv.includes('--watch');
const dev = process.argv.includes('--dev');

function copyStatic() {
  mkdirSync(OUT_DIR, { recursive: true });
  cpSync(join(WEB, 'index.html'), join(OUT_DIR, 'index.html'));
  cpSync(join(WEB, 'styles'), join(OUT_DIR, 'styles'), { recursive: true });
  for (const entry of readdirSync(WEB)) {
    const p = join(WEB, entry);
    if (statSync(p).isDirectory() || entry === 'index.html') continue;
    if (entry.endsWith('.json') || entry.endsWith('.png') || entry.endsWith('.jpg')) {
      cpSync(p, join(OUT_DIR, entry));
    }
  }
}

const options = {
  entryPoints: [join(WEB, 'src', 'main.js')],
  outfile: join(OUT_DIR, 'game.bundle.js'),
  bundle: true,
  format: 'iife',
  target: ['es2019'],           // Android WebView 60+/Chrome 60+ safe
  platform: 'browser',
  legalComments: 'none',
  charset: 'utf8',
  minify: !dev,
  sourcemap: dev ? 'inline' : false,
  logLevel: 'info',
  banner: {
    js: '/* Ultimate Football Mobile - (c) UFM Studio. Original work, built with three.js (MIT). */',
  },
};

copyStatic();

/** Also drop the bundle next to the sources so `node tools/serve.mjs` can preview it. */
function mirrorBundleToWeb() {
  const from = join(OUT_DIR, 'game.bundle.js');
  if (!existsSync(from)) return;
  copyFileSync(from, join(WEB, 'game.bundle.js'));
}

if (watch) {
  const ctx = await context(options);
  await ctx.watch();
  console.log('watching web/src for changes...');
} else {
  await build(options);
  mirrorBundleToWeb();
  const rel = relative(ROOT, join(OUT_DIR, 'game.bundle.js'));
  const kb = (statSync(join(OUT_DIR, 'game.bundle.js')).size / 1024).toFixed(0);
  console.log(`bundle ok -> ${rel} (${kb} KB)${existsSync(join(OUT_DIR, 'index.html')) ? '' : ' [index.html missing!]'}`);
}
