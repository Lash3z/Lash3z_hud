// Historical Data Tracking for Multi-Day Progression
let historicalData = {};

function recordHistoricalData(players) {
  const today = new Date().toISOString().split('T')[0];
  players.forEach(p => {
    if (!historicalData[p.username]) {
      historicalData[p.username] = {};
    }
    historicalData[p.username][today] = p.total;
  });
}

function getHistoricalChartData() {
  const labels = [...new Set(Object.values(historicalData).flatMap(userData => Object.keys(userData)))].sort();
  const datasets = Object.keys(historicalData).map((username, idx) => {
    return {
      label: username,
      data: labels.map(date => historicalData[username][date] || 0),
      borderColor: getColor(idx),
      fill: false,
      tension: 0.3
    };
  });
  return { labels, datasets };
}

function getColor(index) {
  const colors = ['#0ff', '#0f0', '#ff0', '#f0f', '#0fa', '#fa0'];
  return colors[index % colors.length];
}

function renderHistoricalChart() {
  const ctx = document.getElementById('historicalChart').getContext('2d');
  const chartData = getHistoricalChartData();
  new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        title: { display: true, text: 'Historical Point Progression', color: '#0ff' },
        legend: { labels: { color: '#0ff' } }
      },
      scales: {
        x: { ticks: { color: '#0ff' }, grid: { color: '#333' } },
        y: { ticks: { color: '#0ff' }, grid: { color: '#333' } }
      }
    }
  });
}

// Extend renderUnifiedLeaderboard to record history
const originalRender = renderUnifiedLeaderboard;
renderUnifiedLeaderboard = function(players) {
  originalRender(players);
  recordHistoricalData(players);
};
