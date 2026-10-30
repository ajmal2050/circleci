const { test, describe } = require('node:test');
const assert = require('node:assert');
const app = require('../backend/server');

describe('Backend API Tests', () => {
  test('GET /api/status returns healthy status', async () => {
    const server = app.listen(0);
    const { port } = server.address();

    try {
      const response = await fetch(`http://localhost:${port}/api/status`);
      const data = await response.json();

      assert.strictEqual(response.status, 200);
      assert.strictEqual(data.status, 'healthy');
      assert.strictEqual(typeof data.uptime, 'number');
    } finally {
      server.close();
    }
  });
});