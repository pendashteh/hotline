const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

let callState = { status: 'idle' };

// API Routes
app.get('/status', (req, res) => {
  res.json(callState);
});

app.post('/status', (req, res) => {
  const { status } = req.body;
  if (!status) return res.status(400).json({ error: 'Missing status' });
  callState.status = status;
  res.json({ success: true, status });
});

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html (for SPA support if needed)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running at http://localhost:${PORT}`);
});
