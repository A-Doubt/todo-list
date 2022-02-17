export function a (e) {}

let selectedListId = null;


// listener to task lists
document.querySelector('.task-list-ul').addEventListener('click', selectList);

export function selectList(e) {
    // if function called from a pointerEvent
    if (e instanceof PointerEvent) {
        // if function called by removing a list
        if (e.target.classList.contains('remove-btn')) {
            // if deleting a selected list, set it to null and return
            if (e.target.parentNode.firstChild.textContent === selectedListId) {
                document.querySelector('.no-filter').parentNode.classList.add('selected');
                selectedListId = null;
                return;
            }
        }
    }
    // check if the function is triggered when click on a list
    if (e.target.classList.contains('list-name')) {
        console.log('if1');
        // remove 'selected' class from all elements
        const listLiElement = document.querySelectorAll('.task-list-ul>li');
        listLiElement.forEach(li => {
            li.classList.remove('selected');
        })

        // add a new selection
        e.target.parentNode.classList.add('selected');
        selectedListId = e.target.previousSibling.textContent;
    }
    else if (e.target.classList.contains('no-filter')) {
        console.log('if2')
        const listLiElement = document.querySelectorAll('.task-list-ul>li');
        listLiElement.forEach(li => {
            e.target.parentNode.classList.add('selected');
            li.classList.remove('selected');
            selectedListId = null;
        })
    }
    // if this function is triggered from a different function, we want to preserve selection
    else {
        console.log('else')
        const listLiElement = document.querySelectorAll('.task-list-ul>li');
        listLiElement.forEach(li => {
            li.classList.remove('selected');
            if (selectedListId === li.firstChild.textContent) {
                li.classList.add('selected');
            }
        })
    }

    // if no list selected
    if (!selectedListId) document.querySelector('.no-filter').parentNode.classList.add('selected');
    console.log(selectedListId);
    filterTasks();
}

export function filterTasks() {
    const todoTasks = document.querySelectorAll('.list-item');
    // for each element on the to-do list
    todoTasks.forEach(task => {
        // get this tasks's list ID
        const listId = task.childNodes[3].textContent;
        task.classList.add('no-display');
        if (selectedListId == listId || selectedListId == null) task.classList.remove('no-display');
    });
}
export { selectedListId };
