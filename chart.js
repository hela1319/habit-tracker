// chart.js
let chart;
function renderChart(data) {
  const ctx = document.getElementById('habitChart').getContext('2d');
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(h => h.name),
      datasets: [{
        label: 'Days Completed',
        data: data.map(h => h.dates.length),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
}
