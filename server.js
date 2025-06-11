const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let callState = { status: 'idle' }; // shared state

app.get('/status', (req, res) => {
  res.json(callState);
});

app.post('/status', (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ error: 'Missing status' });
  }
  callState.status = status;
  res.json({ success: true, status });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
