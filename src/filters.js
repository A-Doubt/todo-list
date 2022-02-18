
// let selectedListId = null;
let selectedListFilter = 'none';
let selectedDueFilter = 'none';

// listener to task lists
document.querySelector('.task-list-ul').addEventListener('click', selectList);
document.querySelector('.due-filter-ul').addEventListener('click', selectDate);

export function selectList(e) {
    const listLiElement = document.querySelectorAll('.task-list-ul>li');
    // if function called from a pointerEvent
    console.log('1');
    if (!(e instanceof PointerEvent)) {
        console.log('2');
        listLiElement.forEach(li => {
            li.classList.remove('selected');

            if (selectedListFilter == li.firstChild.textContent) {li.classList.add('selected')}
        })
        return;
    }
    console.log('3');
    if (e instanceof PointerEvent) {
        console.log('4');
        // if function called by removing a list
        if (e.target.classList.contains('remove-btn')) {
            console.log('5');
            // if deleting a selected list, set it to none and return
            if (e.target.parentNode.firstChild.textContent === selectedListFilter) {
                console.log('6');
                document.querySelector('.no-filter').parentNode.classList.add('selected');
                selectedListFilter = 'none';
                return;
            }
        }
    }
    console.log('7');
    // check if the function is triggered when click on a list
    if (e.target.classList.contains('list-name')) {
        console.log('8');
        // remove 'selected' class from all elements
        console.log(listLiElement);
        listLiElement.forEach(li => {
            li.classList.remove('selected');
        })
        // add a new selection
        e.target.parentNode.classList.add('selected');
        selectedListFilter = e.target.previousSibling.textContent;
    }
    else if (e.target.classList.contains('no-filter')) {
        console.log('9');
        listLiElement.forEach(li => {
            e.target.parentNode.classList.add('selected');
            li.classList.remove('selected');
            selectedListFilter = 'none';
        })
    }
    // if this function is triggered from a different function, we want to preserve selection
    else {
        console.log('10');
        listLiElement.forEach(li => {
            li.classList.remove('selected');
            if (selectedListFilter === li.firstChild.textContent) {
                li.classList.add('selected');
            }
        })
    }
    console.log('11');
    // if no list selected
    if (!selectedListFilter) document.querySelector('.no-filter').parentNode.classList.add('selected');

    console.log('12');
    filter();
}

// not finished
export function selectDate(e) {
    // check if the function is triggered when click on a date
    const DateLiElement = document.querySelectorAll('.due-filter-ul>li');
    if (e.target.classList.contains('date-name')) {
        // remove 'selected' class from all elements
        DateLiElement.forEach(li => {
            li.classList.remove('selected');
        })
        // add a new selection
        e.target.parentNode.classList.add('selected');
        selectedDueFilter = document.querySelector('.due-filter-ul>.selected').firstChild.textContent;
    }
    // if function is triggered by clicking on 'No filter'
    else if (e.target.classList.contains('no-filter')) {
        DateLiElement.forEach(li => {
            e.target.parentNode.classList.add('selected');
            li.classList.remove('selected');
            selectedDueFilter = 'none';
        })
    }
    // if this function is triggered from a different function, we want to preserve selection
    else {
        DateLiElement.forEach(li => {
            li.classList.remove('selected');
            if (selectedDueFilter === li.firstChild.textContent) {
                li.classList.add('selected');
            }
        })
    }

    filter();
}

export function filter() {
    const todoTasks = document.querySelectorAll('.list-item');
    // for each element on the to-do list add 'no-display' class
    todoTasks.forEach(task => {
        task.classList.remove('no-display');
    });
    
    filterByDate();
    filterByList();
}


export function filterByDate(){
    selectedDueFilter = document.querySelector('.due-filter-ul>.selected').firstChild.textContent;
    console.log(`date filter: ${selectedDueFilter}`);
    let day = 1 * 24 * 60 * 60 * 1000;
    let week = 7 * 24 * 60 * 60 * 1000;
    let month = 30 * 24 * 60 * 60 * 1000; // there's a 30-day filter in the app, but 'month' as a name is cleaner
    
    const todoTasks = document.querySelectorAll('.list-item');
    
    // for each element on the to-do list
    todoTasks.forEach(task => {
        // get this tasks's due date
        const dueDate = Date.parse(task.childNodes[5].textContent); // date hidden in the DOM
        
        switch (selectedDueFilter) {
            case 'none':
                break;
            
            case 'day':
                if (
                    new Date().getTime() + day < dueDate ||
                    new Date().getDate() !== new Date(Number(dueDate)).getDate()
                ){
                    task.classList.add('no-display');
                }
                break;
                
            case 'week':
                if (
                    new Date().getTime() + week < dueDate ||
                    (new Date().getTime() > dueDate && new Date(dueDate).getDate() !== new Date().getDate())
                ){
                    task.classList.add('no-display');
                }
                break;
                
            case 'month':
                if (
                new Date().getTime() + month < dueDate ||
                (new Date().getTime() > dueDate && new Date(dueDate).getDate() !== new Date().getDate())
                ){
                    task.classList.add('no-display');
                }
                break;
        }
    });        
};
            
export function filterByList() {
    selectedListFilter = document.querySelector('.task-list-ul>.selected').firstChild.textContent;
    console.log(`list filter: ${selectedListFilter}`);

    const todoTasks = document.querySelectorAll('.list-item');

    todoTasks.forEach(task => {
        const listId = task.childNodes[3].textContent;
        if (selectedListFilter != listId && selectedListFilter != 'none') {
            task.classList.add('no-display')
        };
    });
};

export { selectedListFilter };
export { selectedDueFilter };
