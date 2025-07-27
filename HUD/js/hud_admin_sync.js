// HUD Dynamic Module Visibility with WebSocket + Lucky 7
function toggleElement(elementId, visible) {
  const el = document.getElementById(elementId);
  if (el) {
    el.style.display = visible ? 'block' : 'none';
  }
}

function applySettings(settings) {
  toggleElement('bonus-hunt-section', settings.bonusHunt);
  toggleElement('tournament-section', settings.tournament);
  toggleElement('lucky7-section', settings.lucky7);
  if (settings.lucky7Score !== undefined) {
    document.getElementById('lucky7-score').innerText = settings.lucky7Score;
  }
}

const ws = new WebSocket('ws://localhost:4000');
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'init' || data.type === 'update') {
    applySettings(data.settings);
  } else if (data.type === 'lucky7_update') {
    document.getElementById('lucky7-score').innerText = data.score;
  }
};

ws.onopen = () => console.log('Connected to WebSocket for HUD updates');
