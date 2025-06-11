async function answer() {
  await fetch('/answer', { method: 'POST' });
  poll();
}

async function end() {
  await fetch('/end', { method: 'POST' });
}

async function poll() {
  const res = await fetch('/status');
  const { status } = await res.json();
  document.getElementById('status').textContent = `Status: ${status}`;
  if (status !== 'idle') setTimeout(poll, 2000);
}

poll();
