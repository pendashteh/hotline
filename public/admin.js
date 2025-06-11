async function answer() {
  const link = document.getElementById('linkInput').value;
  const res = await fetch('/answer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ link })
  });

  const data = await res.json();
  document.getElementById('status').innerHTML = `Answered. Session link sent: <a href="${link}" target="_blank">${link}</a>`;
  poll();
}

async function end() {
  await fetch('/end', { method: 'POST' });
  document.getElementById('status').textContent = 'Call ended.';
}

async function poll() {
  const res = await fetch('/status');
  const { status, sessionLink } = await res.json();
  document.getElementById('status').innerHTML = `Status: ${status}<br>Session link: ${sessionLink || 'N/A'}`;
}
