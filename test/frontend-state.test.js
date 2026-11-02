const { describe, test } = require('node:test');
const assert = require('node:assert');
const { JSDOM } = require('jsdom');
const { updateStatus } = require('../frontend/app');

describe('Frontend State Tests - Network Failure States', () => {
  test('updateStatus handles server crash cleanly', async () => {
    const dom = new JSDOM('<div id="status-display">Init</div>');
    const el = dom.window.document.getElementById('status-display');

    const errorFetch = async () => {
      throw new Error('Connection refused');
    };

    await assert.rejects(async () => await updateStatus(errorFetch, el));
    assert.strictEqual(el.textContent, 'Server: Offline');
  });
});