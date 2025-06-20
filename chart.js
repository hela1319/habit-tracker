let chart;

function updateChart() {
  const ctx = document.getElementById("habitChart").getContext("2d");
  const habits = getHabits();

  const labels = habits.map(h => h.name);
  const data = habits.map(h => h.streak);

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Streak",
        data,
        backgroundColor: "#4F46E5"
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
