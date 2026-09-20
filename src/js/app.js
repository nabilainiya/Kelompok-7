// ============================================================
// To Do List 
// ============================================================

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

const taskCounter = document.getElementById("task-counter");
const clearCompletedBtn =
  document.getElementById("clear-completed-btn") ||
  document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter-btn");

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
        ? "No tasks yet. Add one above!"
        : "No tasks for this filter.";
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
    // FITUR #2 - Edit Task (tombol Edit -> Save)
    // ------------------------------------------------------
    const editBtn = document.createElement("button");

    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.className = "edit-input";
      input.value = task.text;

      const saveBtn = document.createElement("button");
      saveBtn.className = "save-btn";
      saveBtn.textContent = "Save";

      span.replaceWith(input);
      editBtn.replaceWith(saveBtn);
      input.focus();
      input.select();

      function saveEdit() {
        editTask(task.id, input.value);
      }

      saveBtn.addEventListener("click", saveEdit);
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          saveEdit();
        }
      });
    });

    const deleteBtn = document.createElement("button");

     deleteBtn.className = "delete-btn";
    deleteBtn.setAttribute("aria-label", "Delete task");

    deleteBtn.innerHTML = `
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M3 6h18"></path>
        <path d="M8 6V4h8v2"></path>
        <path d="M19 6l-1 14H6L5 6"></path>
        <path d="M10 11v5"></path>
        <path d="M14 11v5"></path>
      </svg>
    `;

    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
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
  
  taskCounter.textContent = `${remaining} tasks left`;
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

    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

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