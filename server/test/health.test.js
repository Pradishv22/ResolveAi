import test from 'node:test';
import assert from 'node:assert';
import app from '../src/app.js';
import http from 'node:http';

test('Health Check Route - GET /api/health', async (t) => {
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;

  try {
    const response = await fetch(`http://localhost:${port}/api/health`);
    assert.strictEqual(response.status, 200);

    const body = await response.json();
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.data.status, 'healthy');
    assert.strictEqual(body.data.service, 'ResolveAI API');
    assert.strictEqual(body.data.version, '1.0.0');
    assert.ok(typeof body.data.uptime === 'number');
    assert.ok(body.data.database);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
