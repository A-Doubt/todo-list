export function a (e) {}

let selectedListId = null;


// listener to task lists
document.querySelector('.task-list-ul').addEventListener('click', selectList);

export function selectList(e) {
    console.log(e.target);

    // if function called from a pointerEvent
    if (e instanceof PointerEvent) {
        // if function called by removing a list
        if (e.target.classList.contains('remove-btn')) {
            // if deleting a selected list, set it to null and return
            if (e.target.parentNode.firstChild.textContent === selectedListId) {
                selectedListId = null;
                return;
            }
        }
    }
    // check if the function is triggered when click on a list
    if (e.target.classList.contains('list-name')) {
        // remove 'selected' class from all elements
        const listLiElement = document.querySelectorAll('.task-list-ul>li');
        listLiElement.forEach(li => {
            li.classList.remove('selected');
        })

        // add a new selection
        e.target.parentNode.classList.add('selected');
        selectedListId = e.target.previousSibling.textContent;
    }
    // if this function is triggered from a different function, we want to preserve selection
    else {
        const listLiElement = document.querySelectorAll('.task-list-ul>li');
        listLiElement.forEach(li => {
            li.classList.remove('selected');
            if (selectedListId === li.firstChild.textContent) {
                li.classList.add('selected');
            }
        })
    }
    console.log(selectedListId);
}
export { selectedListId };