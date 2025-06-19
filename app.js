// app.js
async function loadHabits() {
  const habits = await getHabits();
  const list = document.getElementById('habitList');
  list.innerHTML = '';
  habits.forEach(habit => {
    const li = document.createElement('li');
    li.className = "flex justify-between items-center border p-2 rounded";

    const today = new Date().toDateString();
    const checked = habit.dates.includes(today);

    li.innerHTML = `
      <span>${habit.name}</span>
      <button onclick="markDone(${habit.id})" class="text-sm ${checked ? 'bg-green-500' : 'bg-gray-300'} text-white px-2 py-1 rounded">
        ${checked ? 'Done' : 'Mark'}
      </button>
    `;
    list.appendChild(li);
  });

  renderChart(habits);
}

async function addHabit() {
  const input = document.getElementById('habitInput');
  if (input.value.trim()) {
    await addHabitToDB(input.value.trim());
    input.value = '';
    loadHabits();
  }
}

async function markDone(id) {
  const habits = await getHabits();
  const habit = habits.find(h => h.id === id);
  const today = new Date().toDateString();
  if (!habit.dates.includes(today)) {
    habit.dates.push(today);
    await updateHabit(id, habit.dates);
    loadHabits();
  }
}

window.onload = () => {
  loadHabits();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
};
