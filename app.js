let habits = getHabits();

function renderHabits() {
  const habitList = document.getElementById("habitList");
  habitList.innerHTML = "";

  habits.forEach((habit, index) => {
    const li = document.createElement("li");
    li.className = "flex items-center justify-between border p-2 rounded";

    li.innerHTML = `
      <span>${habit.name}</span>
      <div class="space-x-2">
        <button onclick="incrementStreak(${index})" class="bg-green-500 text-white px-2 py-1 rounded">+1</button>
        <button onclick="deleteHabit(${index})" class="bg-red-500 text-white px-2 py-1 rounded">X</button>
      </div>
    `;
    habitList.appendChild(li);
  });

  updateChart();
}

function addHabit() {
  const input = document.getElementById("habitInput");
  const name = input.value.trim();
  if (name === "") return;

  habits.push({ name, streak: 0 });
  saveHabits(habits);
  input.value = "";
  renderHabits();
}

function incrementStreak(index) {
  habits[index].streak += 1;
  saveHabits(habits);
  renderHabits();
}

function deleteHabit(index) {
  habits.splice(index, 1);
  saveHabits(habits);
  renderHabits();
}

renderHabits();
