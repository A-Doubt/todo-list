import { filter, filterByList, filterByDate, selectedListFilter, selectedDueFilter } from "./filters";
import { saveToStorage } from "./localStorage";
import { tasks } from "./localStorage";


export function renderTasks() {
    clearTasks();
    const todoList = document.querySelector('.todo-list');
    let counter = 0;

    // render tasks if they actually are there
    if (tasks[0]) {
        tasks.forEach(task => {
            let taskDue = task.due.toLocaleDateString('en-GB');

            // if 'due: invalid date' we don't want to display it.
            if (taskDue == 'Invalid Date') taskDue = '';

            todoList.insertAdjacentHTML('beforeend', 
            `<div class="list-item ${task.priority} completed">
                <p class="no-display">${task.taskId}</p>
                <p class="no-display">${task.listId}</p>
                <p class="no-display">${task.due}</p>
                <div class="checkbox task-completed"></div>
                <h4>${task.title}<p class="due-date"> due: ${taskDue}</p></h4>
                <p>${task.description}</p>

                <button class="remove-task-btn"></button>
            </div>`);
            const checkbox = document.querySelectorAll('.checkbox');
            const removeTaskButton = document.querySelectorAll('.remove-task-btn');
            checkbox[counter].addEventListener('click', toggleComplete);
            removeTaskButton[counter].addEventListener('click', removeTask);

            // add or remove 'completed' class from each todo-item
            const listItem = document.querySelectorAll('.list-item');
            if (task.completed) {
                listItem[counter].classList.add('completed');
            }
            else {
                listItem[counter].classList.remove('completed');
            }
            counter++;
        });
    }

    saveToStorage();
};

// clear all tasks from the list
export function clearTasks() {
    const todos = document.querySelector('.todo-list');
    todos.innerHTML = '';
};

function removeTask() {
    // grab taskId to compare it to tasks array
    let index = tasks.findIndex(task => (task.taskId == this.parentNode.firstElementChild.textContent));
    tasks.splice(index, 1);

    // clear and render
    renderTasks();
    filter();
    
};

function toggleComplete(e) {
    // find according task and set the 'completed' key in tasks array to false or true
    let index = tasks.findIndex(task => task.taskId == this.parentNode.firstElementChild.textContent);
    tasks[index].completed ? tasks[index].completed = false : tasks[index].completed = true;
    renderTasks();
    filter();
}
