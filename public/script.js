const baseUrl = ''; // same-origin

const statusEl = document.getElementById('status');
const dialBtn = document.getElementById('dialBtn');
const answerBtn = document.getElementById('answerBtn');
const endBtn = document.getElementById('endBtn');

async function updateStatus() {
  try {
    const res = await fetch(`${baseUrl}/status`);
    const data = await res.json();
    statusEl.textContent = `Status: ${data.status}`;
  } catch (err) {
    statusEl.textContent = 'Error contacting server';
  }
}

async function setStatus(newStatus) {
  try {
    await fetch(`${baseUrl}/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    await updateStatus();
  } catch (err) {
    statusEl.textContent = 'Error updating status';
  }
}

dialBtn.onclick = () => setStatus('dialing');
answerBtn.onclick = () => setStatus('connected');
endBtn.onclick = () => setStatus('ended');

setInterval(updateStatus, 3000);
updateStatus();
