const { describe, test } = require('node:test');
const assert = require('node:assert');
const { JSDOM } = require('jsdom');
const { updateStatus } = require('../frontend/app');

describe('Frontend Component Tests - DOM Elements', () => {
  test('updateStatus updates element text on valid response', async () => {
    const dom = new JSDOM('<div id="status-display">Init</div>');
    const el = dom.window.document.getElementById('status-display');

    const fakeFetch = async () => ({
      json: async () => ({ status: 'healthy' })
    });

    await updateStatus(fakeFetch, el);
    assert.strictEqual(el.textContent, 'Server: healthy');
  });
});