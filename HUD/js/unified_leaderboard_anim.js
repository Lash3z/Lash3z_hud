// Unified Leaderboard with Live Refresh & Animations
const tableBody = document.querySelector('#unified-table tbody') || null;
let previousScores = {};

async function fetchUnifiedLeaderboard() {
  try {
    const res = await fetch('/api/leaderboard/overall');
    const data = await res.json();
    renderUnifiedLeaderboard(data);
  } catch (err) {
    console.error('Failed to fetch unified leaderboard:', err);
  }
}

function renderUnifiedLeaderboard(players) {
  if (!tableBody) return;
  tableBody.innerHTML = '';

  players.forEach((p, index) => {
    const row = document.createElement('tr');
    const prevScore = previousScores[p.username] || 0;
    const scoreChangeClass = p.total > prevScore ? 'score-up' : p.total < prevScore ? 'score-down' : '';

    row.className = scoreChangeClass + ' ' + getRankClass(index);
    row.innerHTML = `
      <td>${p.username}</td>
      <td>${p.lucky7}</td>
      <td>${p.hunts.total}</td>
      <td>${p.tournaments.total}</td>
      <td><span class="score-value">${prevScore}</span></td>
    `;

    tableBody.appendChild(row);
    animateScore(row.querySelector('.score-value'), prevScore, p.total);
    previousScores[p.username] = p.total;
  });
}

function animateScore(element, start, end) {
  let current = start;
  const step = (end - start) / 30;
  let frame = 0;
  function animate() {
    frame++;
    current += step;
    element.textContent = Math.round(current);
    if (frame < 30) {
      requestAnimationFrame(animate);
    } else {
      element.textContent = end;
    }
  }
  animate();
}

function getRankClass(index) {
  if (index === 0) return 'gold-glow';
  if (index === 1) return 'silver-glow';
  if (index === 2) return 'bronze-glow';
  return '';
}

// Poll every 20 seconds
setInterval(fetchUnifiedLeaderboard, 20000);
fetchUnifiedLeaderboard();
