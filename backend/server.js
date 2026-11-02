const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Pure utility function for unit testing
function formatHealthPayload(status, uptime) {
  return {
    status: status || 'unknown',
    uptime: Number(uptime.toFixed(2)),
    timestamp: new Date().toISOString()
  };
}

// Host static assets
app.use(express.static(path.join(__dirname, '../frontend')));

// Health check integration route
app.get('/api/status', (req, res) => {
  const payload = formatHealthPayload('healthy', process.uptime());
  res.status(200).json(payload);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

module.exports = { app, formatHealthPayload };