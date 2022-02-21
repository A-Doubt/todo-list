import "./style.css";
import { renderTasks } from "./todo-tasks";
import { tasks, lists} from "./localStorage"
import { renderLists, removedListId } from "./task-lists";


// remove onload animations
setTimeout(function(){
    document.body.className="";
},500);

