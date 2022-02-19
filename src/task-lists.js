import { populateListChoice } from "./new-task";
import { selectList  } from "./filters";
import { selectDate } from "./filters";
import { clearTasks, renderTasks } from "./todo-tasks";
import { tasks } from "./localStorage";
import { lists } from "./localStorage";
import { saveToStorage } from "./localStorage";

// let lists = [
//     {
//         name: '111',
//         id: 111111111111111
//     },
//     {
//         name: '222',
//         id: 222222222222222
//     },
//     {
//         name: '333',
//         id: 333333333333333
//     },
//     {
//         name: '444',
//         id: 444444444444444
//     }
// ]

// function which renders all task lists
export function renderLists(e) {
    const taskUl = document.querySelector('.task-lists>ul')

    // this below goes crazy if split between lines...
    taskUl.innerHTML =
    `<li class="selected"><p class="no-display">none</p><p class="no-filter">ALL TASKS</p></li>`

    lists.forEach(listItem => {
        const newListItem = document.createElement('li');

        // add an insivible list id to the DOM
        const listId = document.createElement('p');
        listId.classList.add('no-display');
        listId.textContent = listItem.id;

        const newListItemName = document.createElement('p');
        newListItemName.classList.add('list-name');
        newListItemName.textContent = listItem.name;

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-btn');
        removeButton.addEventListener('click', removeList);
        removeButton.textContent = 'remove';

        newListItem.append(listId, newListItemName, removeButton);
        
        taskUl.appendChild(newListItem);

        // populate select element in UI used to add a new task
        populateListChoice();
    });
    saveToStorage();

};

// adding a listener to lists form and function to add a new list
document.querySelector('.add-list-form').addEventListener('submit', addList);

function addList(e) {
    e.preventDefault();

    // grabbing the input, its value and adding to lists array
    const listInput = document.querySelector('.add-list-input');
    if (!listInput.value) return;
    lists.push(
        {
        name: listInput.value,
        id: new Date().getTime(),
        }
        );

    listInput.value = '';

    // clear and render
    clearLists();
    renderLists();
    selectList();
}


let index = null;
let removedListId = null;
let actuallyDeleted = false;

function removeList(e) {

    if (!confirm('Are you sure you want to remove the list and all tasks belonging to this list?')) return;
    actuallyDeleted = true;

    index = lists.findIndex(x => x.id == this.parentNode.firstChild.textContent);
    lists.splice(index, 1);
    // clear and render
    clearLists();
    renderLists();
    // and select an active list
    selectList(e);

    // and remove all tasks that were a part of this list
    removeMatchingTasks(e);

    // and update list choces in the form to add a new task
    populateListChoice();
    actuallyDeleted = false;
}

function clearLists() {
    const taskListUl = document.querySelector('.task-list-ul');
    taskListUl.innerHTML = 
    `<li class="selected">
    <p class="no-display"></p>
    <p class="no-filter">ALL TASKS</p>
    </li>`;
}


// removes all tasks that were a part of a list that's being deleted and renders tasks again
function removeMatchingTasks(e) {

    console.log(`index: ${index}`);
    for(let i = tasks.length - 1; i >= 0; i--) {

        if(tasks[i].listId == removedListId) {
           tasks.splice(i, 1);
        }
    }
    clearTasks();
    renderTasks();
}

// export { lists };
export { actuallyDeleted };