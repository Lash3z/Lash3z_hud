// HUD Leaderboard with Combined Rank Change Effects
let previousScores = {};
let previousOrder = [];

const leaderboardContainer = document.getElementById('lucky7-scoreboard') || null;

async function fetchLeaderboard() {
  try {
    const res = await fetch('/api/lucky7/leaderboard');
    const data = await res.json();
    renderLeaderboard(data);
  } catch (err) {
    console.error('Failed to fetch leaderboard:', err);
  }
}

function renderLeaderboard(players) {
  if (!leaderboardContainer) return;

  // Sort players by score (descending)
  players.sort((a, b) => b.score - a.score);

  // Detect order changes and mark moved players
  const currentOrder = players.map(p => p.username);
  const movedPlayers = getMovedPlayers(currentOrder);
  previousOrder = currentOrder;

  let newContent = '<h3>Lucky 7 Leaderboard</h3><ul>';
  players.forEach((p, index) => {
    const scoreChangeClass = getScoreChangeClass(p.username, p.score);
    const rankClass = getRankClass(index);
    const moveClass = movedPlayers.includes(p.username) ? 'rank-moved' : '';
    const previousScore = previousScores[p.username] || 0;
    newContent += `<li class="${scoreChangeClass} ${rankClass} ${moveClass}" data-username="${p.username}" data-score="${p.score}" data-prev="${previousScore}">${p.username}: <span class="score-value">${previousScore}</span></li>`;
    previousScores[p.username] = p.score;
  });
  newContent += '</ul>';

  leaderboardContainer.classList.add('fade-out');
  setTimeout(() => {
    leaderboardContainer.innerHTML = newContent;
    leaderboardContainer.classList.remove('fade-out');
    leaderboardContainer.classList.add('fade-in');
    animateScoreCounters();
    setTimeout(() => leaderboardContainer.classList.remove('fade-in'), 500);
  }, 500);
}

function animateScoreCounters() {
  const items = leaderboardContainer.querySelectorAll('li');
  items.forEach(item => {
    const targetScore = parseInt(item.getAttribute('data-score'));
    const currentScoreElement = item.querySelector('.score-value');
    let startScore = parseInt(item.getAttribute('data-prev')) || 0;
    let step = (targetScore - startScore) / 30; // 30 frames
    let frame = 0;

    function stepAnim() {
      frame++;
      startScore += step;
      currentScoreElement.textContent = Math.round(startScore);
      if (frame < 30) {
        requestAnimationFrame(stepAnim);
      } else {
        currentScoreElement.textContent = targetScore;
      }
    }
    stepAnim();
  });
}

function getScoreChangeClass(username, newScore) {
  if (!(username in previousScores)) return '';
  if (newScore > previousScores[username]) return 'score-up';
  if (newScore < previousScores[username]) return 'score-down';
  return '';
}

function getRankClass(index) {
  if (index === 0) return 'gold-glow';
  if (index === 1) return 'silver-glow';
  if (index === 2) return 'bronze-glow';
  return '';
}

function getMovedPlayers(currentOrder) {
  if (previousOrder.length === 0) return [];
  return currentOrder.filter((player, index) => previousOrder[index] !== player);
}

// Poll every 15 seconds
setInterval(fetchLeaderboard, 15000);
fetchLeaderboard();
