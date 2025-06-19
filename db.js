// db.js (vanilla IndexedDB version)
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('habit-db', 1);

    request.onupgradeneeded = function (e) {
      const db = e.target.result;
      if (!db.objectStoreNames.contains('habits')) {
        db.createObjectStore('habits', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = function (e) {
      resolve(e.target.result);
    };

    request.onerror = function (e) {
      reject(e.target.error);
    };
  });
}

async function getHabits() {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('habits', 'readonly');
    const store = tx.objectStore('habits');
    const request = store.getAll();

    request.onsuccess = function () {
      resolve(request.result);
    };

    request.onerror = function () {
      reject(request.error);
    };
  });
}

async function addHabitToDB(name) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('habits', 'readwrite');
    const store = tx.objectStore('habits');
    const request = store.add({ name, dates: [] });

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

async function updateHabit(id, dates) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('habits', 'readwrite');
    const store = tx.objectStore('habits');
    const getRequest = store.get(id);

    getRequest.onsuccess = function () {
      const habit = getRequest.result;
      habit.dates = dates;
      const putRequest = store.put(habit);

      putRequest.onsuccess = () => resolve();
      putRequest.onerror = () => reject(putRequest.error);
    };

    getRequest.onerror = () => reject(getRequest.error);
  });
}
