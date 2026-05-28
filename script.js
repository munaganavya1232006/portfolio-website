const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if (filter === "active") return !task.completed;

        if (filter === "completed") return task.completed;

        return true;
    });

    filteredTasks.forEach((task, index) => {

        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="task-buttons">

                <button onclick="toggleTask(${index})">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button onclick="editTask(${index})">
                    Edit
                </button>

                <button onclick="deleteTask(${index})">
                    Delete
                </button>

            </div>
        `;

        taskList.appendChild(li);
    });
}

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
}

function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    renderTasks();
}

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();
    renderTasks();
}

function editTask(index) {

    const updatedText = prompt("Edit task:", tasks[index].text);

    if (updatedText !== null) {

        tasks[index].text = updatedText;

        saveTasks();
        renderTasks();
    }
}

addBtn.addEventListener("click", addTask);

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter = button.getAttribute("data-filter");

        renderTasks(filter);
    });
});

renderTasks();
