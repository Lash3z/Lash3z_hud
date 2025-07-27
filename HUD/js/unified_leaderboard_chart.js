// Chart for visualizing points across categories
let pointsChart = null;

async function renderPointsChart(players) {
  const ctx = document.getElementById('pointsChart').getContext('2d');
  const labels = players.map(p => p.username);
  const lucky7Data = players.map(p => p.lucky7);
  const huntsData = players.map(p => p.hunts.total);
  const tournamentsData = players.map(p => p.tournaments.total);

  if (pointsChart) {
    pointsChart.destroy();
  }

  pointsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Lucky 7',
          data: lucky7Data,
          backgroundColor: 'rgba(0, 255, 255, 0.5)',
        },
        {
          label: 'Hunts',
          data: huntsData,
          backgroundColor: 'rgba(0, 200, 100, 0.5)',
        },
        {
          label: 'Tournaments',
          data: tournamentsData,
          backgroundColor: 'rgba(255, 165, 0, 0.5)',
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top', labels: { color: '#0ff' } },
        title: { display: true, text: 'Points Breakdown by Category', color: '#0ff' }
      },
      scales: {
        x: { ticks: { color: '#0ff' }, grid: { color: '#333' } },
        y: { ticks: { color: '#0ff' }, grid: { color: '#333' } }
      }
    }
  });
}

// Override renderUnifiedLeaderboard to also update chart
const oldRenderUnified = renderUnifiedLeaderboard;
renderUnifiedLeaderboard = function(players) {
  oldRenderUnified(players);
  renderPointsChart(players);
}

// Add Line Chart Overlay
let totalPointsLine = null;

async function renderLineChart(players) {
  const ctx = document.getElementById('totalPointsChart').getContext('2d');
  const labels = players.map(p => p.username);
  const totalPoints = players.map(p => p.total);

  if (totalPointsLine) {
    totalPointsLine.destroy();
  }

  totalPointsLine = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Total Points Progression',
          data: totalPoints,
          borderColor: '#0ff',
          backgroundColor: 'rgba(0,255,255,0.2)',
          tension: 0.3,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: '#0ff'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: '#0ff' } }
      },
      scales: {
        x: { ticks: { color: '#0ff' }, grid: { color: '#333' } },
        y: { ticks: { color: '#0ff' }, grid: { color: '#333' } }
      }
    }
  });
}

// Override renderUnifiedLeaderboard to also update line chart
const prevRender = renderUnifiedLeaderboard;
renderUnifiedLeaderboard = function(players) {
  prevRender(players);
  renderPointsChart(players);
  renderLineChart(players);
}
// Enhanced Chart.js with Animated Dataset Updates
function updateChartWithAnimation(chart, newData) {
  const totalFrames = 30;
  let frame = 0;
  const currentData = chart.data.datasets.map(ds => [...ds.data]);

  function animate() {
    frame++;
    chart.data.datasets.forEach((dataset, i) => {
      dataset.data = dataset.data.map((val, j) => {
        const start = currentData[i][j];
        const end = newData[i][j];
        return start + (end - start) * (frame / totalFrames);
      });
    });
    chart.update('none'); // avoid default animation
    if (frame < totalFrames) {
      requestAnimationFrame(animate);
    }
  }
  animate();
}

// Override renderPointsChart to include animated updates
async function renderPointsChart(players) {
  const ctx = document.getElementById('pointsChart').getContext('2d');
  const labels = players.map(p => p.username);
  const lucky7Data = players.map(p => p.lucky7);
  const huntsData = players.map(p => p.hunts.total);
  const tournamentsData = players.map(p => p.tournaments.total);

  if (!pointsChart) {
    pointsChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          { label: 'Lucky 7', data: lucky7Data, backgroundColor: 'rgba(0, 255, 255, 0.5)' },
          { label: 'Hunts', data: huntsData, backgroundColor: 'rgba(0, 200, 100, 0.5)' },
          { label: 'Tournaments', data: tournamentsData, backgroundColor: 'rgba(255, 165, 0, 0.5)' }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: '#0ff' } }, title: { display: true, text: 'Points Breakdown by Category', color: '#0ff' } },
        scales: { x: { ticks: { color: '#0ff' }, grid: { color: '#333' } }, y: { ticks: { color: '#0ff' }, grid: { color: '#333' } } }
      }
    });
  } else {
    pointsChart.data.labels = labels;
    updateChartWithAnimation(pointsChart, [lucky7Data, huntsData, tournamentsData]);
  }
}

// Override renderLineChart for animations
async function renderLineChart(players) {
  const ctx = document.getElementById('totalPointsChart').getContext('2d');
  const labels = players.map(p => p.username);
  const totalPoints = players.map(p => p.total);

  if (!totalPointsLine) {
    totalPointsLine = new Chart(ctx, {
      type: 'line',
      data: { labels: labels, datasets: [{ label: 'Total Points Progression', data: totalPoints, borderColor: '#0ff', backgroundColor: 'rgba(0,255,255,0.2)', tension: 0.3, fill: true }] },
      options: { responsive: true, plugins: { legend: { labels: { color: '#0ff' } } }, scales: { x: { ticks: { color: '#0ff' }, grid: { color: '#333' } }, y: { ticks: { color: '#0ff' }, grid: { color: '#333' } } } }
    });
  } else {
    totalPointsLine.data.labels = labels;
    updateChartWithAnimation(totalPointsLine, [totalPoints]);
  }
}
