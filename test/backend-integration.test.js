const { describe, test } = require('node:test');
const assert = require('node:assert');
const { app } = require('../backend/server');

describe('Backend Integration Tests - API Endpoints', () => {
  test('GET /api/status returns HTTP 200 with valid structure', async () => {
    const server = app.listen(0);
    const { port } = server.address();

    try {
      const response = await fetch(`http://localhost:${port}/api/status`);
      const body = await response.json();

      assert.strictEqual(response.status, 200);
      assert.strictEqual(body.status, 'healthy');
      assert.strictEqual(typeof body.uptime, 'number');
    } finally {
      server.close();
    }
  });
});