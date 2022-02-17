import { lists } from "./task-lists";
import { tasks } from "./todo-tasks";
import { clearTasks } from "./todo-tasks";
import { renderTasks } from "./todo-tasks";

// functions to draw the form to add a new task and to remove the form
document.querySelector('.new-task-btn').addEventListener('click', newTask);
function newTask() {
    document.querySelector('.content').classList.add('blur');
    document.querySelector('.add-task').classList.remove('invisible');
}
document.querySelector('.close-form').addEventListener('click', closeNewTask);
function closeNewTask() {
    document.querySelector('.content').classList.remove('blur');
    document.querySelector('.add-task').classList.add('invisible');
}

export function populateListChoice() {
    const listChoice = document.querySelector('#list');
    listChoice.innerHTML = '';
    lists.forEach(listItem => {
        let option = document.createElement('option');
        option.textContent = listItem.name;
        listChoice.appendChild(option);
    });
};

// adding a new task through the form
document.querySelector('.add-task-form').addEventListener('submit', addNewTask);
function addNewTask(e) {
    e.preventDefault();
    const title = document.querySelector('#task-name');
    const due = document.querySelector('#due-date');
    const priority = document.querySelector('#priority');
    const listId = document.querySelector('#list');
    const taskId = new Date().getTime();
    const description = document.querySelector('#description');

    console.log(title);
    console.log(due);
    console.log(priority);
    console.log(listId);
    console.log(taskId);
    console.log(description);

    tasks.push({
        title: title.value,
        due: due.value,
        priority: priority.value,
        listId: listId.value,
        taskId: taskId,
        description: description.value,
        completed: false,
    })

    title.value = '';
    due.value = '';
    priority.value = 'low-priority';
    listId.value = '';
    description.value = '';

    document.querySelector('.content').classList.remove('blur');
    document.querySelector('.add-task').classList.add('invisible');

    clearTasks();
    renderTasks();
}
