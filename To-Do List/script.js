let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
      const list = document.getElementById("taskList");
      list.innerHTML = "";
      tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
          <span>${task.text}</span>
          <div class="actions">
            <button class="complete" onclick="toggleComplete(${index})">✓</button>
            <button class="edit" onclick="editTask(${index})">✎</button>
            <button class="delete" onclick="deleteTask(${index})">✗</button>
          </div>
        `;
        list.appendChild(li);
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function addTask() {
      const input = document.getElementById("taskInput");
      const taskText = input.value.trim();

      if (taskText === "") {
        alert("❌ Please enter a task!");
        return;
      }

      tasks.push({ text: taskText, completed: false });
      input.value = "";
      renderTasks();
    }

    function toggleComplete(index) {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    }

    function editTask(index) {
      const newTask = prompt("Edit your task:", tasks[index].text);
      if (newTask !== null && newTask.trim() !== "") {
        tasks[index].text = newTask.trim();
        renderTasks();
      }
    }

    function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks();
    }

    // Initial render
    renderTasks();