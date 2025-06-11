const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

let state = { status: 'idle' };

app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.get('/status', (req, res) => {
  res.json(state);
});

app.post('/dial', (req, res) => {
  state.status = 'dialing';
  res.json({ ok: true });
});

app.post('/end', (req, res) => {
  state.status = 'idle';
  res.json({ ok: true });
});

app.post('/answer', (req, res) => {
  state.status = 'in-call';
  res.json({ ok: true });
});

// Route-specific HTML
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admin.html'));
});

// Optional catch-all to visitor interface
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  console.log(`Virtual Phone Queue running on http://localhost:${port}`);
});
