import { populateListChoice } from "./new-task";
import { selectList } from "./filters";
// testing list
const lists = [
    {
        name: 'test-list-01',
        id: 'list-id-test-01'
    },
    {
        name: 'test-list-02',
        id: 'list-id-test-02',
    },
    {
        name: 'a',
        id: 111111111111111
    },
    {
        name: 'a',
        id: 222222222222222
    },
    {
        name: 'a',
        id: 333333333333333
    },
    {
        name: 'a',
        id: 444444444444444
    }
]

// function which renders all task lists
export function renderLists(e) {
    lists.forEach(listItem => {
        // appending new list
        const newListItem = document.createElement('li');
        const newListItemName = document.createElement('p');
        newListItemName.classList.add('list-name');
        newListItemName.textContent = listItem.name;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'remove';

        // add an insivible list id to the DOM
        const listId = document.createElement('p');
        newListItem.appendChild(listId);
        listId.textContent = listItem.id;
        listId.classList.add('no-display');

        removeButton.addEventListener('click', removeList);
        removeButton.classList.add('remove-btn');
        newListItem.append(newListItemName, removeButton);
        
        const taskUl = document.querySelector('.task-lists>ul')
        taskUl.appendChild(newListItem);

        // populate select element in UI used to add a new task
        populateListChoice();
    });

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

    selectList(e);
}

function removeList(e) {
    let index = lists.findIndex(x => x.id == this.parentNode.firstChild.textContent);
    lists.splice(index, 1);

    // clear and render
    clearLists();
    renderLists();

    // and select an active list
    selectList(e);
}

function clearLists() {
    const taskListUl = document.querySelector('.task-list-ul');
    taskListUl.innerHTML = '';
}

export { lists };
