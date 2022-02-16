import lists from "./task-lists";

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
