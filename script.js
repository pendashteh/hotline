const statusEl = document.getElementById('status');
const dialBtn = document.getElementById('dialBtn');
const answerBtn = document.getElementById('answerBtn');
const endBtn = document.getElementById('endBtn');

const CALL_STATE_KEY = 'virtual_call_state';

function getState() {
  return JSON.parse(localStorage.getItem(CALL_STATE_KEY)) || { status: 'idle' };
}

function setState(newState) {
  localStorage.setItem(CALL_STATE_KEY, JSON.stringify(newState));
  updateUI();
}

function updateUI() {
  const { status } = getState();

  switch (status) {
    case 'idle':
      statusEl.textContent = 'Waiting...';
      break;
    case 'dialing':
      statusEl.textContent = 'Ringing... waiting for answer.';
      break;
    case 'incoming':
      statusEl.textContent = 'Incoming call! Click "Answer"';
      break;
    case 'connected':
      statusEl.textContent = 'Call Connected';
      break;
    case 'ended':
      statusEl.textContent = 'Call Ended';
      break;
  }
}

// Event listeners
dialBtn.onclick = () => {
  const state = getState();
  if (state.status === 'idle' || state.status === 'ended') {
    setState({ status: 'dialing' });
  }
};

answerBtn.onclick = () => {
  const state = getState();
  if (state.status === 'dialing') {
    setState({ status: 'connected' });
  }
};

endBtn.onclick = () => {
  setState({ status: 'ended' });
};

// Listen for storage events (other tab)
window.addEventListener('storage', (e) => {
  if (e.key === CALL_STATE_KEY) updateUI();
});

// Show correct status on load
updateUI();
