import assert from 'node:assert/strict';
import { test } from 'node:test';
import http from 'node:http';

process.env.PORT = '0';
process.env.SHELF_URL = 'https://shelf.example.invalid';
const { default: server } = await import('../server.js');
await new Promise((resolve) => {
  if (server.listening) return resolve();
  server.once('listening', resolve);
});

function get(path, method = 'GET') {
  return new Promise((resolve, reject) => {
    const { port } = server.address();
    const req = http.request({ host: '127.0.0.1', port, path, method }, (res) => {
      let body = '';
      res.on('data', (c) => { body += c; });
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: JSON.parse(body) }));
    });
    req.on('error', reject);
    req.end();
  });
}

test('GET /api/health returns demo-health/1', async () => {
  const r = await get('/api/health');
  assert.equal(r.status, 200);
  assert.equal(r.headers['content-type'], 'application/json');
  assert.equal(r.body.schema, 'demo-health/1');
  assert.equal(r.body.state, 'ready');
  assert.equal(r.body.runtime, 'offline');
  assert.equal(r.body.demo.id, 'deploy-test-lab');
  assert.ok(r.body.at);
});

test('GET /api/shelf returns { shelfUrl }', async () => {
  const r = await get('/api/shelf');
  assert.equal(r.status, 200);
  assert.deepEqual(Object.keys(r.body).sort(), ['shelfUrl']);
  assert.equal(r.body.shelfUrl, 'https://shelf.example.invalid');
});

test.after(() => new Promise((resolve) => server.close(resolve)));

test('GET /api/shelf trims a trailing slash from SHELF_URL, and a POST to it is not 200', async () => {
  const prev = process.env.SHELF_URL;
  process.env.SHELF_URL = 'https://shelf.example:8443/';
  try {
    const r = await get('/api/shelf');
    assert.equal(r.status, 200);
    assert.deepEqual(r.body, { shelfUrl: 'https://shelf.example:8443' });
    assert.notEqual((await get('/api/shelf', 'POST')).status, 200);
  } finally { process.env.SHELF_URL = prev; }
});
