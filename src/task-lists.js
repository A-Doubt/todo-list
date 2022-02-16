import { populateListChoice } from "./new-task";
// testing list
const lists = [
    {
        name: 'name-test-01',
        id: 'id-test-01'
    },
    {
        name: 'name-test-02',
        id: 'id-test-02',
    }
]

export function renderLists(e) {
    lists.forEach(listItem => {
        // appending new list
        const newListItem = document.createElement('li');
        newListItem.textContent = listItem.name;
        const removeButton = document.createElement('button');
        removeButton.addEventListener('click', removeList);
        removeButton.classList.add('remove-btn');
        removeButton.textContent = 'remove';
        newListItem.appendChild(removeButton);
        
        const taskUl = document.querySelector('.task-lists>ul')
        taskUl.appendChild(newListItem);

        // populate select element in UI used to add a new task
        populateListChoice();
        console.table(lists);
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
}

function removeList(e) {
    e.preventDefault();
    console.log(this.parentNode.firstChild.textContent);
    let index = lists.findIndex(x => (x.name === this.parentNode.firstChild.textContent));
    lists.splice(index, 1);

    // clear and render
    clearLists();
    renderLists();
}

function clearLists() {
    const taskListUl = document.querySelector('.task-list-ul');
    taskListUl.innerHTML = '';
}

export default lists;
