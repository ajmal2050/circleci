const { describe, test } = require('node:test');
const assert = require('node:assert');
const { formatHealthPayload } = require('../backend/server');

describe('Backend Unit Tests - Payload Formatter', () => {
  test('formatHealthPayload properly formats input values', () => {
    const output = formatHealthPayload('healthy', 12.3456);
    assert.strictEqual(output.status, 'healthy');
    assert.strictEqual(output.uptime, 12.35);
    assert.ok(typeof output.timestamp === 'string');
  });

  test('formatHealthPayload falls back to unknown on empty status', () => {
    const output = formatHealthPayload('', 0);
    assert.strictEqual(output.status, 'unknown');
    assert.strictEqual(output.uptime, 0);
  });
});