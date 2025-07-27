// Filter Tabs for Unified Leaderboard
const tabButtons = document.querySelectorAll('.tab-btn');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.tab-btn.active').classList.remove('active');
    btn.classList.add('active');
    fetchUnifiedLeaderboard(btn.dataset.filter);
  });
});

async function fetchUnifiedLeaderboard(filter = 'overall') {
  try {
    const res = await fetch(`/api/leaderboard/overall`);
    let data = await res.json();

    if (filter === 'hunts') {
      data = data.map(p => ({
        username: p.username,
        total: p.hunts.total,
        lucky7: 0,
        hunts: p.hunts,
        tournaments: { total: 0 }
      }));
    } else if (filter === 'tournaments') {
      data = data.map(p => ({
        username: p.username,
        total: p.tournaments.total,
        lucky7: 0,
        hunts: { total: 0 },
        tournaments: p.tournaments
      }));
    } else if (filter === 'lucky7') {
      data = data.map(p => ({
        username: p.username,
        total: p.lucky7,
        lucky7: p.lucky7,
        hunts: { total: 0 },
        tournaments: { total: 0 }
      }));
    }

    renderUnifiedLeaderboard(data);
  } catch (err) {
    console.error('Failed to fetch unified leaderboard:', err);
  }
}
