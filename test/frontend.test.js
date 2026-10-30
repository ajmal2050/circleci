const { test, describe } = require('node:test');
const assert = require('node:assert');
const { JSDOM } = require('jsdom');
const { updateStatus } = require('../frontend/app');

describe('Frontend UI Tests', () => {
  test('updateStatus sets text content correctly on API success', async () => {
    const dom = new JSDOM('<div id="status-display">Unknown</div>');
    const displayElement = dom.window.document.getElementById('status-display');

    const mockFetch = async () => ({
      json: async () => ({ status: 'healthy', uptime: 10 })
    });

    await updateStatus(mockFetch, displayElement);

    assert.strictEqual(displayElement.textContent, 'Server: healthy');
  });

  test('updateStatus handles network failure cleanly', async () => {
    const dom = new JSDOM('<div id="status-display">Unknown</div>');
    const displayElement = dom.window.document.getElementById('status-display');

    const failingFetch = async () => {
      throw new Error('Network error');
    };

    await assert.rejects(
      async () => await updateStatus(failingFetch, displayElement),
      { message: 'Network error' }
    );

    assert.strictEqual(displayElement.textContent, 'Server: Offline');
  });
});