const STORAGE_KEY = "habits";

function getHabits() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveHabits(habits) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}
