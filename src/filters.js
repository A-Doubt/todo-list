export function a (e) {}

let selectedListId = null;


// listener to task lists
document.querySelector('.task-list-ul').addEventListener('click', selectList);
export function selectList(e) {
    // check if clicked on the button and return if so
    if (e.target.classList.contains('remove-btn')) return;

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
}

export { selectedListId };