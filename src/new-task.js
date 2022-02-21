// import { lists } from "./task-lists";
import { clearTasks, renderTasks } from "./todo-tasks";
import { tasks } from "./localStorage";
import { selectList, selectDate } from "./filters";
import { lists } from "./localStorage";
// import { filter } from "./filters";
// import { filterByDate } from "./filters";
// import { filterByList } from "./filters";

// functions to draw the form to add a new task and to remove the form
document.querySelector('.new-task-btn').addEventListener('click', newTask);
function newTask() {
    document.querySelector('.content').classList.add('blur');
    document.querySelector('.add-task').classList.remove('invisible');
}
document.querySelector('#close-add').addEventListener('click', closeNewTask);
function closeNewTask() {
    document.querySelector('.content').classList.remove('blur');
    document.querySelector('.add-task').classList.add('invisible');
}

export function populateListChoice() {
    const listChoice = document.querySelector('#list');
    listChoice.innerHTML = '<option value="">No list</option>';

    lists.forEach(listItem => {
        let option = document.createElement('option');
        option.textContent = listItem.name;
        option.value = listItem.id;
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

    let dueDate = new Date(due.valueAsNumber);

    tasks.push({
        title: title.value,
        due: dueDate,
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
    selectList(e);
    selectDate(e)
}
