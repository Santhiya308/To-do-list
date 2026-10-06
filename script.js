const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearBtn = document.getElementById("clearBtn");
const emptyMessage = document.getElementById("emptyMessage");

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Display tasks
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task) => {

        const li = document.createElement("li");
        li.classList.add("task");

        if (task.completed) {
            li.classList.add("completed");
        }

        // Checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;

            saveTasks();
            displayTasks();
        });


        // Task text
        const span = document.createElement("span");
        span.classList.add("task-text");
        span.textContent = task.text;


        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {

            tasks = tasks.filter(item => item.id !== task.id);

            saveTasks();
            displayTasks();
        });


        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    updateTaskCount();

    // Show/hide empty message
    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}


// Add new task
function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskInput.value = "";
    taskInput.focus();
}


// Update task count
function updateTaskCount() {

    const remainingTasks = tasks.filter(
        task => !task.completed
    ).length;

    if (remainingTasks === 1) {
        taskCount.textContent = "1 task remaining";
    } else {
        taskCount.textContent = `${remainingTasks} tasks remaining`;
    }
}


// Save tasks to local storage
function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}


// Clear completed tasks
clearBtn.addEventListener("click", () => {

    tasks = tasks.filter(
        task => !task.completed
    );

    saveTasks();
    displayTasks();
});


// Add task button
addBtn.addEventListener("click", addTask);


// Add task using Enter key
taskInput.addEventListener("keypress", (event) => {

    if (event.key === "Enter") {
        addTask();
    }
});


// Display tasks when page loads
displayTasks();