const tasks = [];

const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", function () {
  const taskText = input.value;

  if (taskText === "") {
    return;
  }

  tasks.push(taskText);
  input.value = "";

  renderTasks();
});

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No tasks yet";
    li.className = "empty";
    taskList.appendChild(li);
    return;
  }

  for (let i = 0; i < tasks.length; i++) {
    const li = document.createElement("li");
    li.textContent = tasks[i];

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
      tasks.splice(i, 1);
      renderTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }
}
renderTasks();
