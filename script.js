/* =========================
   App State
========================= */
let tasks = [];
let currentFilter = "all";

/* =========================
   Load tasks from localStorage
========================= */
const savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
  tasks = JSON.parse(savedTasks);
}

/* =========================
   DOM Elements
========================= */
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");
const clearCompletedBtn = document.getElementById("clearCompleted");
const filterButtons = document.querySelectorAll(".filters button");

/* =========================
   Save tasks to localStorage
========================= */
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* =========================
   Add Task
========================= */
addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") return;

  tasks.push({
    text: taskText,
    completed: false
  });

  saveTasks();
  input.value = "";
  renderTasks();
}

/* =========================
   Clear Completed Tasks
========================= */
clearCompletedBtn.addEventListener("click", function () {
  tasks = tasks.filter(task => !task.completed);
  saveTasks();
  renderTasks();
});

/* =========================
   Filter Handling
========================= */
filterButtons.forEach(button => {
  button.addEventListener("click", function () {
    currentFilter = button.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    renderTasks();
  });
});

/* =========================
   Render Tasks
========================= */
function renderTasks() {
  taskList.innerHTML = "";

  // Counter (remaining tasks)
  const remaining = tasks.filter(task => !task.completed).length;
  counter.textContent = `${remaining} task${remaining !== 1 ? "s" : ""} remaining`;

  // Disable clear button if nothing completed
  clearCompletedBtn.disabled = tasks.every(task => !task.completed);

  // Apply filter
  let filteredTasks = tasks;
  if (currentFilter === "active") {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (currentFilter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  }

  // Empty state
  if (filteredTasks.length === 0) {
    const li = document.createElement("li");
    li.textContent =
      tasks.length === 0
        ? "No tasks yet"
        : "No tasks for this filter";
    li.className = "empty";
    taskList.appendChild(li);
    return;
  }

  // Render tasks
  for (let i = 0; i < filteredTasks.length; i++) {
    const task = filteredTasks[i];
    const index = tasks.indexOf(task);

    const li = document.createElement("li");

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    // Task text
    const span = document.createElement("span");
    span.textContent = task.text;

    if (task.completed) {
      span.classList.add("completed");
    }

    checkbox.addEventListener("change", function () {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }
}

/* =========================
   Initial Render
========================= */
renderTasks();
