async function updateStatus(fetchFn = fetch, domElement) {
  try {
    const res = await fetchFn('/api/status');
    const data = await res.json();
    domElement.textContent = `Server: ${data.status}`;
    return data;
  } catch (err) {
    domElement.textContent = 'Server: Offline';
    throw err;
  }
}

if (typeof window !== 'undefined') {
  const btn = document.getElementById('check-btn');
  const display = document.getElementById('status-display');
  btn.addEventListener('click', () => updateStatus(window.fetch, display));
}

if (typeof module !== 'undefined') {
  module.exports = { updateStatus };
}