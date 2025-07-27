// Chart Toggle with Transitions
const chartButtons = document.querySelectorAll('.chart-btn');
const barContainer = document.getElementById('pointsChart').parentElement;
const lineContainer = document.getElementById('totalPointsChart').parentElement;

// Wrap containers in chart-container class for transitions
barContainer.classList.add('chart-container');
lineContainer.classList.add('chart-container');

chartButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.chart-btn.active').classList.remove('active');
    btn.classList.add('active');
    const chartType = btn.dataset.chart;

    if (chartType === 'bar') {
      lineContainer.classList.add('hidden');
      barContainer.classList.remove('hidden');
    } else if (chartType === 'line') {
      barContainer.classList.add('hidden');
      lineContainer.classList.remove('hidden');
    } else {
      barContainer.classList.remove('hidden');
      lineContainer.classList.remove('hidden');
    }
  });
});
