import { selectedListId } from "./filters";

const tasks = [
    {
        title: 'task-test-001',
        due: new Date(2022, 2, 17).toLocaleDateString('en-GB'),
        priority: 'medium-priority',
        listId: 'test111',
        taskId: 'id001',
        description: 'Lorem ipsum blah blah blah',
        completed: true,
    },
    {
        title: 'task-test-002',
        due: new Date(2022, 5, 12).toLocaleDateString('en-GB'),
        priority: 'high-priority',
        listId: 'test222',
        taskId: 'id002',
        description: 'Lorem ipsum yadda yadda yadda',
        completed: true,
    }
]


export function renderTasks() {
    clearTasks();
    const todoList = document.querySelector('.todo-list');
    let counter = 0;
    tasks.forEach(task => {
        todoList.insertAdjacentHTML('beforeend', 
        `<div class="list-item ${task.priority} completed">
            <p class="no-display">${task.taskId}</p>
            <div class="checkbox task-completed"></div>
            <h4>${task.title}<p class="due-date"> due: ${task.due}</p></h4>
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
};
renderTasks();

// clear all tasks from the list
export function clearTasks() {
    const todos = document.querySelector('.todo-list');
    todos.innerHTML = '';
};

function editTask(e) {
    console.log(e.target);
    console.log(`selectedList: ${selectedListId}`);
};

function removeTask() {
    // grab taskId to compare it to tasks array
    console.log(this.parentNode.firstElementChild.textContent);
    let index = tasks.findIndex(task => (task.taskId === this.parentNode.firstElementChild.textContent));
    tasks.splice(index, 1);
    console.table(tasks);

    // clear and render
    renderTasks();
};

const checkbox = document.querySelector('.checkbox');

function toggleComplete(e) {
    // find according task and set the 'completed' key in tasks array to true or false
    let index = tasks.findIndex(task => (task.taskId === this.parentNode.firstElementChild.textContent));
    tasks[index].completed ? tasks[index].completed = false : tasks[index].completed = true;
    console.table(tasks);

    renderTasks();
}

function markComplete(e) {
    console.log('from markComplete');
    console.log('from markComplete');
}
function markNotComplete(e) {
    console.log('from markNotComplete');
}

export { tasks };