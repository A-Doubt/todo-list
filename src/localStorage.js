import { renderLists } from "./task-lists";
import { renderTasks } from "./todo-tasks";
import { populateListChoice } from "./new-task"
// import { tasks } from "./todo-tasks";
// import { lists } from "./task-lists";

let listsFromStorage = null;
let tasksFromStorage = null;

let tasks = [
    // {
    //     title: 'nolister',
    //     due: new Date(2022, 1, 20),
    //     priority: 'medium-priority',
    //     listId: '',
    //     taskId: 'id001',
    //     description: 'Within week',
    //     completed: false,
    // },
    // {
    //     title: '333.1',
    //     due: new Date(2022, 1, 22),
    //     priority: 'high-priority',
    //     listId: 333333333333333,
    //     taskId: 'id003',
    //     description: 'Within week',
    //     completed: true,
    // },
    // {
    //     title: '333.2',
    //     due: new Date(2022, 2, 2),
    //     priority: 'high-priority',
    //     listId: 333333333333333,
    //     taskId: 'id004',
    //     description: 'Within month',
    //     completed: false,
    // },
    // {
    //     title: '333.3',
    //     due: new Date(2022, 1, 18),
    //     priority: 'high-priority',
    //     listId: 333333333333333,
    //     taskId: 'id005',
    //     description: 'today',
    //     completed: true,
    // },
    // {
    //     title: '111.2',
    //     due: new Date(2022, 2, 22),
    //     priority: 'high-priority',
    //     listId: 111111111111111,
    //     taskId: 'id006',
    //     description: 'Over a month',
    //     completed: true,
    // },
    // {
    //     title: '222.1',
    //     due: new Date(2022, 1, 12),
    //     priority: 'low-priority',
    //     listId: 222222222222222,
    //     taskId: 'id007',
    //     description: 'Past',
    //     completed: false,
    // },
    // {
    //     title: '444.1',
    //     due: new Date(2022, 1, 18),
    //     priority: 'medium-priority',
    //     listId: 444444444444444,
    //     taskId: 'id008',
    //     description: 'today',
    //     completed: false,
    // },
    // {
    //     title: 'no-lister',
    //     due: new Date(2022, 1, 19),
    //     priority: 'high-priority',
    //     listId: '',
    //     taskId: 'id009',
    //     description: 'tomorrow',
    //     completed: false,
    // }
]

let lists = [
    // {
    //     name: '111',
    //     id: 111111111111111
    // },
    // {
    //     name: '222',
    //     id: 222222222222222
    // },
    // {
    //     name: '333',
    //     id: 333333333333333
    // },
    // {
    //     name: '444',
    //     id: 444444444444444
    // }
]


export function saveToStorage() {
    console.log(`tasks: ${tasks}`);
    tasks.forEach(task => {
        task.due = task.due.toString();
    })
    localStorage.setItem('lists', JSON.stringify(lists));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    tasks.forEach(task => {
        task.due = new Date(task.due);
    })

}


window.onload = function() {
    listsFromStorage = JSON.parse(localStorage.getItem('lists', lists));
    tasksFromStorage = JSON.parse(localStorage.getItem('tasks', tasks));

    console.log(tasksFromStorage);
    if (tasksFromStorage[0]) {
        console.log('here');
        tasksFromStorage.forEach(task => {
            task.due = new Date(task.due);
        })

        tasks = tasksFromStorage;
    } else tasks = [];

    if (listsFromStorage[0]) {
        lists = listsFromStorage;
    }
    else lists = [];

    renderLists();
    renderTasks();
    populateListChoice()
}


export { lists };
export { tasks };