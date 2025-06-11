const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

let state = {
  status: 'idle',
  sessionLink: null
};

app.get('/status', (req, res) => {
  res.json(state);
});

app.post('/dial', (req, res) => {
  state.status = 'dialing';
  res.json({ ok: true });
});

app.post('/end', (req, res) => {
  state.status = 'idle';
  state.sessionLink = null;
  res.json({ ok: true });
});

app.post('/answer', (req, res) => {
  const { link } = req.body;
  state.status = 'in-call';
  state.sessionLink = link || null;
  res.json({ ok: true });
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admin.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
