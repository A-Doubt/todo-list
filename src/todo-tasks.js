import { filter, filterByList, filterByDate, selectedListFilter, selectedDueFilter } from "./filters";
import { saveToStorage } from "./localStorage";
import { tasks } from "./localStorage";

// let tasks = [
//     {
//         title: 'nolister',
//         due: new Date(2022, 1, 20),
//         priority: 'medium-priority',
//         listId: '',
//         taskId: 'id001',
//         description: 'Within week',
//         completed: false,
//     },
//     {
//         title: '333.1',
//         due: new Date(2022, 1, 22),
//         priority: 'high-priority',
//         listId: 333333333333333,
//         taskId: 'id003',
//         description: 'Within week',
//         completed: true,
//     },
//     {
//         title: '333.2',
//         due: new Date(2022, 2, 2),
//         priority: 'high-priority',
//         listId: 333333333333333,
//         taskId: 'id004',
//         description: 'Within month',
//         completed: false,
//     },
//     {
//         title: '333.3',
//         due: new Date(2022, 1, 18),
//         priority: 'high-priority',
//         listId: 333333333333333,
//         taskId: 'id005',
//         description: 'today',
//         completed: true,
//     },
//     {
//         title: '111.2',
//         due: new Date(2022, 2, 22),
//         priority: 'high-priority',
//         listId: 111111111111111,
//         taskId: 'id006',
//         description: 'Over a month',
//         completed: true,
//     },
//     {
//         title: '222.1',
//         due: new Date(2022, 1, 12),
//         priority: 'low-priority',
//         listId: 222222222222222,
//         taskId: 'id007',
//         description: 'Past',
//         completed: false,
//     },
//     {
//         title: '444.1',
//         due: new Date(2022, 1, 18),
//         priority: 'medium-priority',
//         listId: 444444444444444,
//         taskId: 'id008',
//         description: 'today',
//         completed: false,
//     },
//     {
//         title: 'no-lister',
//         due: new Date(2022, 1, 19),
//         priority: 'high-priority',
//         listId: '',
//         taskId: 'id009',
//         description: 'tomorrow',
//         completed: false,
//     }
// ]




export function renderTasks() {
    clearTasks();
    const todoList = document.querySelector('.todo-list');
    let counter = 0;
    tasks.forEach(task => {
        todoList.insertAdjacentHTML('beforeend', 
        `<div class="list-item ${task.priority} completed">
            <p class="no-display">${task.taskId}</p>
            <p class="no-display">${task.listId}</p>
            <p class="no-display">${task.due}</p>
            <div class="checkbox task-completed"></div>
            <h4>${task.title}<p class="due-date"> due: ${task.due.toLocaleDateString('en-GB')}</p></h4>
            <p>${task.description}</p>
            <button class="edit-task">Edit task</button>
            <button class="remove-task">Remove task</button>
        </div>`);
        const checkbox = document.querySelectorAll('.checkbox');
        const editTaskButton = document.querySelectorAll('.edit-task');
        const removeTaskButton = document.querySelectorAll('.remove-task');
        checkbox[counter].addEventListener('click', toggleComplete);
        editTaskButton[counter].addEventListener('click', editTask);
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

    
    saveToStorage();
};
// renderTasks();

// clear all tasks from the list
export function clearTasks() {
    const todos = document.querySelector('.todo-list');
    todos.innerHTML = '';
};

function editTask(e) {
    console.log(e.target);
    console.log(`selectedListFilter: ${selectedListFilter}`);
};

function removeTask() {
    // grab taskId to compare it to tasks array
    let index = tasks.findIndex(task => (task.taskId === this.parentNode.firstElementChild.textContent));
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

// export { tasks };