async function dial() {
  await fetch('/dial', { method: 'POST' });
  poll();
}

async function end() {
  await fetch('/end', { method: 'POST' });
  document.getElementById('status').textContent = 'Call ended.';
}

async function poll() {
  const res = await fetch('/status');
  const { status, sessionLink } = await res.json();

  if (status === 'in-call' && sessionLink) {
    document.getElementById('status').innerHTML = `You're next! <a href="${sessionLink}" target="_blank">Join Session</a>`;
  } else {
    document.getElementById('status').textContent = `Status: ${status}`;
    setTimeout(poll, 2000);
  }
}
