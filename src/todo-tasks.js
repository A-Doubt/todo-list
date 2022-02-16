{/* <div class="todo-list">
    <div class="list-item low-priority">
        <h4>Test task 01,<p class="due-date"> due: 12.12.1222</p></h4>
        <p>test description 01 Lorem ipsum dolor sit amet consectetur, adipisicing elit. At necessitatibus doloribus explicabo unde reiciendis sequi consectetur. Dolores, illum ab? Odio.</p>
        <button class="edit-task">Edit task</button>
        <button class="remove-task">Remove task</button>
    </div>
    <div class="list-item high-priority">
        <h4>Test task 02,<p class="due-date"> due: 12.12.1222</p></h4>
        <p>Short description.</p>
        <button class="edit-task">Edit task</button>
        <button class="remove-task">Remove task</button>
    </div>
</div> */}

console.log('from tasks');
const tasks = [
    {
        title: 'task-test-001',
        due: new Date(2022, 2, 17, 22, 0),
        priority: 2,
        listId: 'test',
        description: 'Lorem ipsum blah blah blah',
        completed: false,
    },
    {
        title: 'task-test-002',
        due: new Date(2022, 5, 12),
        priority: 1,
        listId: 'test',
        description: 'Lorem ipsum yadda yadda yadda',
        completed: true,
    }
]

export function renderTasks() {

};