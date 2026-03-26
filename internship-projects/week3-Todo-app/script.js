let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <div class="task-left">
        <input type="checkbox" ${task.completed ? "checked" : ""} 
          onchange="toggleTask(${index})">
        <span class="${task.completed ? "completed" : ""}">
          ${task.text}
        </span>
      </div>
      <button class="delete-btn" onclick="deleteTask(${index})">x</button>
    `;

    list.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  let input = document.getElementById("taskInput");

  if (input.value.trim() === "") return;

  tasks.push({ text: input.value, completed: false });
  input.value = "";
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

renderTasks();