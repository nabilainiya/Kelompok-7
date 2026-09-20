// ============================================================
// To Do List - Revisi Lengkap
// ============================================================

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Elemen tambahan (opsional — kalau belum ada di HTML, kode tetap aman jalan)
const taskCounter = document.getElementById("task-counter");
const clearCompletedBtn = document.getElementById("clear-completed-btn");
const filterButtons = document.querySelectorAll(".filter-btn");

// Struktur satu task: { id, text, completed }
let tasks = [];
let nextId = 1;
let currentFilter = "all"; // "all" | "active" | "completed"

// ============================================================
// FITUR #4 - LOAD DATA DARI LOCAL STORAGE
// ============================================================

const savedTasks = localStorage.getItem("tasks");

if (savedTasks !== null) {
  tasks = JSON.parse(savedTasks);
}

// FIX: nextId harus dihitung ulang berdasarkan id terbesar yang sudah ada,
// supaya tidak bentrok (duplikat id) dengan task lama setelah refresh.
if (tasks.length > 0) {
  nextId = Math.max(...tasks.map((task) => task.id)) + 1;
}

function getFilteredTasks() {
  if (currentFilter === "active") {
    return tasks.filter((task) => !task.completed);
  }
  if (currentFilter === "completed") {
    return tasks.filter((task) => task.completed);
  }
  return tasks;
}

function renderTasks() {
  taskList.innerHTML = "";

  const filteredTasks = getFilteredTasks();

  if (filteredTasks.length === 0) {
    const emptyState = document.createElement("li");
    emptyState.className = "empty-state";
    emptyState.textContent =
      tasks.length === 0
        ? "Belum ada task. Tambahkan satu di atas!"
        : "Tidak ada task untuk filter ini.";
    taskList.appendChild(emptyState);
    updateCounter();
    saveTasks();
    return;
  }

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item";
    if (task.completed) {
      li.classList.add("completed");
    }
    li.dataset.id = task.id;

    // ------------------------------------------------------
    // FITUR #1 - Tandai Selesai
    // ------------------------------------------------------
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "complete-checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleComplete(task.id));

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text;

    // ------------------------------------------------------
    // FITUR #2 - Edit Task (double click teks untuk edit)
    // ------------------------------------------------------
    span.addEventListener("dblclick", () => {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.className = "edit-input";
      editInput.value = task.text;

      const finishEdit = () => {
        editTask(task.id, editInput.value);
      };

      editInput.addEventListener("blur", finishEdit);
      editInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          editInput.blur();
        } else if (e.key === "Escape") {
          editInput.removeEventListener("blur", finishEdit);
          renderTasks();
        }
      });

      li.replaceChild(editInput, span);
      editInput.focus();
      editInput.select();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "✕";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  // ------------------------------------------------------
  // FITUR #5 - Counter
  // ------------------------------------------------------
  updateCounter();

  // ============================================================
  // FITUR #4 - SIMPAN DATA KE LOCAL STORAGE
  // ============================================================
  saveTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCounter() {
  if (!taskCounter) return;
  const remaining = tasks.filter((task) => !task.completed).length;
  taskCounter.textContent = `${remaining} task tersisa`;
}

function addTask(text) {
  const trimmed = text.trim();
  if (trimmed === "") return;

  tasks.push({
    id: nextId++,
    text: trimmed,
    completed: false,
  });

  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

// ------------------------------------------------------
// FITUR #1 - Tandai Selesai
// ------------------------------------------------------
function toggleComplete(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

// ------------------------------------------------------
// FITUR #2 - Edit Task
// ------------------------------------------------------
function editTask(id, newText) {
  const trimmed = newText.trim();

  if (trimmed === "") {
    // Kalau dikosongkan, anggap task dihapus
    deleteTask(id);
    return;
  }

  tasks = tasks.map((task) =>
    task.id === id ? { ...task, text: trimmed } : task
  );
  renderTasks();
}

// ------------------------------------------------------
// FITUR #6 - Clear Completed
// ------------------------------------------------------
function clearCompleted() {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
}

if (clearCompletedBtn) {
  clearCompletedBtn.addEventListener("click", clearCompleted);
}

// ------------------------------------------------------
// FITUR #3 - Filter Task
// ------------------------------------------------------
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;

    filterButtons.forEach((b) => b.classList.remove("active-filter"));
    btn.classList.add("active-filter");

    renderTasks();
  });
});

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  addTask(taskInput.value);

  taskInput.value = "";
  taskInput.focus();
});

renderTasks();