import { renderLists } from "./task-lists";
import { renderTasks } from "./todo-tasks";
import { populateListChoice } from "./new-task"

let listsFromStorage = null;
let tasksFromStorage = null;

let tasks = []
let lists = []

export function saveToStorage() {
    tasks.forEach(task => {
        task.due = task.due.toString();
    })
    localStorage.setItem('lists', JSON.stringify(lists));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    tasks.forEach(task => {
        task.due = new Date(task.due);
    })
    
}

// some dummy content if there are no tasks and lists in LocalStorage
window.onload = function() {
    
    // check if there is something in LocalStorage
    if (localStorage.getItem("lists") === null || localStorage.getItem("tasks") === null) {
        localStorage.setItem('lists', JSON.stringify(lists));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    listsFromStorage = JSON.parse(localStorage.getItem('lists', lists));
    tasksFromStorage = JSON.parse(localStorage.getItem('tasks', tasks));
    
    if (tasksFromStorage[0] || listsFromStorage[0]) {
        tasksFromStorage.forEach(task => {
            task.due = new Date(task.due);
        })
        tasks = tasksFromStorage;
        lists = listsFromStorage;
        
    } else {
        lists = [
            {
                name: 'shopping',
                id: 1111,
            },
            {
                name: 'bricolage',
                id: '2222'
            }
        ];
        tasks = [
            {
                title: 'buy groceries',
                due: new Date(1646457562047),
                priority: 'high-priority',
                listId: '1111',
                taskId: '0001',
                description: 'milk, cheese, chocolate, bananas, beer',
                completed: false,
            },
            {
                title: 'buy presents',
                due: new Date(1648457562047),
                priority: 'medium-priority',
                listId: '1111',
                taskId: '0002',
                description: 'Not too expensive',
                completed: true,
            },
            {
                title: 'fix shelves',
                due: new Date(1649957562047),
                priority: 'medium-priority',
                listId: '2222',
                taskId: '0003',
                description: 'Both in the garage and in the living room...',
                completed: false,
            },
            {
                title: 'buy a new car',
                due: new Date(1683957562047),
                priority: 'low-priority',
                listId: '1111',
                taskId: '0004',
                description: 'Definitely, not a priority, but I\'d use a new one',
                completed: false,
            },
            {
                title: 'Fix the leaks',
                due: '',
                priority: 'medium-priority',
                listId: '2222',
                taskId: '0005',
                description: 'They\'re in the kitchen, just do it ASAP!',
                completed: false,
            }
        ];
    }
        
    renderLists();
    renderTasks();
    populateListChoice()  
}   
    
export { lists };
export { tasks };
