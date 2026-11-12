import fs from 'node:fs';
import http from 'node:http';
import { shelfInfo } from './lib/shelfLink.js';
const port = Number(process.env.PORT || 5590);
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Deploy Test LAB</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>body{font-family:system-ui,sans-serif;display:grid;place-items:center;min-height:100vh;margin:0;background:#f5f2ee;color:#1c2b33}
main{text-align:center;padding:2rem}h1{font-size:1.4rem}code{background:#fff;padding:.2rem .5rem;border-radius:6px}</style>
</head>
<body><main><h1>Deploy Test LAB</h1><p>This app exists to exercise the shelf's one-click Deploy: clone, build, run.</p>
<p>Health: <code>GET /api/health</code></p>
<nav class="top-menu" data-testid="top-menu" aria-label="Top menu" style="display:inline-flex;flex-direction:column;align-items:flex-end;gap:.55rem;background:var(--box-dark,#16181f);color:var(--on-box,#fcfcfc);padding:.5rem .75rem;border-radius:10px;--ping-red:#d20e0f;--ping-red-deep:#aa0005;">
  <div class="top-menu__row" style="display:inline-flex;align-items:center;gap:.5rem;">
    <a class="top-menu__shelf top-menu__shelf--accent" id="shelf" href="#" target="_blank" rel="noreferrer" style="display:none;align-items:center;height:32px;padding:0 .7rem;border-radius:8px;background:var(--ping-red);color:#fcfcfc;border:1px solid var(--ping-red-deep);font-weight:700;text-decoration:none;">Shelf</a>
  </div>
</nav>
<script>
(function(){
  var STEP={S:"14px",M:"16px",L:"18px"},order=["S","M","L"];
  function apply(step){document.documentElement.style.fontSize=STEP[step]||"16px";try{localStorage.setItem("dpt.font",step)}catch(e){}var s=document.getElementById("font-select");if(s)s.value=step;}
  var nav=document.querySelector('.top-menu');
  var row2=document.createElement('div');row2.className='top-menu__row';
  row2.style.cssText='display:inline-flex;align-items:center;gap:.5rem;';
  row2.innerHTML='<span style="font-size:.78rem;font-weight:600;opacity:.9">Text size:</span>'+
    '<select id="font-select" aria-label="Font size" style="height:32px;border-radius:8px;background:transparent;color:inherit;border:1px solid rgba(255,255,255,.35);padding:0 .4rem"><option>S</option><option selected>M</option><option>L</option></select>'+
    '<button id="font-minus" aria-label="Smaller text" style="height:32px;border-radius:8px;background:transparent;color:inherit;border:1px solid rgba(255,255,255,.35);padding:0 .6rem;cursor:pointer">A&minus;</button>'+
    '<button id="font-plus" aria-label="Larger text" style="height:32px;border-radius:8px;background:transparent;color:inherit;border:1px solid rgba(255,255,255,.35);padding:0 .6rem;cursor:pointer">A+</button>';
  nav.appendChild(row2);
  apply(localStorage.getItem("dpt.font")||"M");
  var sel=document.getElementById("font-select");
  sel.addEventListener("change",function(){apply(sel.value)});
  document.getElementById("font-minus").addEventListener("click",function(){apply(order[Math.max(0,order.indexOf(sel.value)-1)])});
  document.getElementById("font-plus").addEventListener("click",function(){apply(order[Math.min(2,order.indexOf(sel.value)+1)])});
  fetch('/api/shelf').then(function(r){return r.ok?r.json():null}).then(function(d){if(d&&d.shelfUrl){var a=document.getElementById('shelf');a.href=d.shelfUrl;a.style.display='inline-flex';a.innerHTML='Shelf <span aria-hidden="true"> \\2197</span>';}}).catch(function(){});
})();
</script></main></body></html>`;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ schema: 'demo-health/1', at: new Date().toISOString(), state: 'ready', runtime: 'offline', demo: { id: 'deploy-test-lab', name: 'Deploy Test LAB', version: '0.1.0' } }));
  }
  if (url.pathname === '/api/shelf') {
    if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405, { 'Content-Type': 'application/json', Allow: 'GET, HEAD' }); return res.end(JSON.stringify({ error: 'method-not-allowed' })); }
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    return res.end(JSON.stringify(shelfInfo()));
  }
  if (url.pathname === '/') { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); return res.end(html); }
  res.writeHead(404, { 'Content-Type': 'application/json' }); res.end(JSON.stringify({ error: 'not-found' }));
}).listen(port, '0.0.0.0', () => console.log(`deploy-test-LAB on http://127.0.0.1:${port}`));

export default server;
