import http from 'node:http';
const port = Number(process.env.PORT || 5590);
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Deploy Test LAB</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>body{font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;background:#f5f2ee;color:#1c2b33}
main{text-align:center;padding:2rem}h1{font-size:1.4rem}code{background:#fff;padding:.2rem .5rem;border-radius:6px}</style></head>
<body><main><h1>Deploy Test LAB</h1><p>This app exists to exercise the shelf's one-click Deploy: clone, build, run.</p>
<p>Health: <code>GET /api/health</code></p></main></body></html>\n`;
http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ schema: 'demo-health/1', at: new Date().toISOString(), state: 'ready', runtime: 'offline', demo: { id: 'deploy-test-lab', name: 'Deploy Test LAB', version: '0.1.0' } }));
  }
  if (url.pathname === '/') { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); return res.end(html); }
  res.writeHead(404, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ error: 'not-found' }));
}).listen(port, '127.0.0.1', () => console.log(`deploy-test-LAB on http://127.0.0.1:${port}`));
