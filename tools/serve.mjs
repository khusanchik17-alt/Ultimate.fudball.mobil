#!/usr/bin/env node
/**
 * Zero-dependency static server used to play/preview the game outside Android.
 *
 *   node tools/serve.mjs [port] [--www]
 *
 * Serves the *source* tree by default (so edits show up immediately, the browser
 * loads ES modules directly) or the packaged www folder with --www.
 * Binds 0.0.0.0 so the sandbox live-preview proxy can reach it.
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { extname, join, normalize, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const useWww = args.includes('--www');
const portArg = args.find((a) => /^\d+$/.test(a));
const PORT = Number(portArg || process.env.PORT || 3000);
const BASE = useWww ? join(ROOT, 'android', 'assets', 'www') : join(ROOT, 'web');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.wasm': 'application/wasm',
  '.map': 'application/json; charset=utf-8',
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    let pathPart = decodeURIComponent(url.pathname);
    if (pathPart === '/' || pathPart === '') pathPart = '/index.html';
    const safe = normalize(pathPart).replace(/^(\.\.[/\\])+/, '');
    let filePath = join(BASE, safe);

    let info = null;
    try {
      info = await stat(filePath);
    } catch {
      info = null;
    }
    if (!info || info.isDirectory()) {
      // In --www mode a request for the bundled script should fall back gracefully
      filePath = join(BASE, 'index.html');
      info = await stat(filePath).catch(() => null);
    }
    if (!info) {
      res.writeHead(404, { 'content-type': 'text/plain' });
      res.end('404');
      return;
    }
    res.writeHead(200, {
      'content-type': MIME[extname(filePath).toLowerCase()] || 'application/octet-stream',
      'cache-control': 'no-store',
      'access-control-allow-origin': '*',
    });
    createReadStream(filePath).pipe(res);
  } catch (err) {
    res.writeHead(500, { 'content-type': 'text/plain' });
    res.end('500 ' + String(err && err.message));
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Ultimate Football Mobile dev server: http://0.0.0.0:${PORT}  (root: ${BASE})`);
});
