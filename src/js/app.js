// ============================================================
// To Do List - Starter
// Baca README.md untuk daftar lengkap fitur yang harus dibuat
// dan hint pengerjaannya sebelum mulai coding.
// ============================================================

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Struktur satu task: { id, text, completed }
let tasks = [];
let nextId = 1;

// ============================================================
// FITUR #4 - LOAD DATA DARI LOCAL STORAGE
// ============================================================

const savedTasks = localStorage.getItem("tasks");

if (savedTasks !== null) {
  tasks = JSON.parse(savedTasks);
}

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    const emptyState = document.createElement("li");
    emptyState.className = "empty-state";
    emptyState.textContent = "Belum ada task. Tambahkan satu di atas!";
    taskList.appendChild(emptyState);
    return;
  }

  // TODO (Fitur #3 - Filter Task)
  let filteredTasks = tasks;
  if (currentFilter === "active") {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else if (currentFilter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  }

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-item";
    li.dataset.id = task.id;

    // TODO (Fitur #1 - Tandai Selesai) - done

    if (task.completed) {
      li.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleComplete(task.id));

    const span = document.createElement("span");
    span.textContent = task.text;

    // TODO (Fitur #2 - Edit Task)
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      const input = document.createElement("input");
      input.type = "text";
      input.value = task.text;

      const saveBtn = document.createElement("button");
      saveBtn.className = "save-btn";
      saveBtn.textContent = "Save";

      span.replaceWith(input);
      input.focus();
      editBtn.replaceWith(saveBtn);

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
    deleteBtn.textContent = "✕";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(checkbox); //ftr 1
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  // TODO (Fitur #5 - Counter)

  // ============================================================
  // FITUR #4 - SIMPAN DATA KE LOCAL STORAGE
  // ============================================================

  localStorage.setItem("tasks", JSON.stringify(tasks));
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

// TODO (Fitur #1 - Tandai Selesai)
// Buat function toggleComplete(id) - done

function toggleComplete(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

// TODO (Fitur #2 - Edit Task)
// Buat function editTask(id, newText)
function editTask(id, newText) {
    const trimmed = newText.trim();
    if (trimmed === "") return;

    const task = tasks.find((task) => task.id === id);

    if (task) {
      task.text = trimmed;
      renderTasks();
    }
}

// TODO (Fitur #6 - Clear Completed)
// Buat function clearCompleted(id)

// TODO (Fitur #3 - Filter Task)
// Buat currentFilter dan event listener filter
let currentFilter = "all";
const filterButtons = document.querySelectorAll(".filter-btn");

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