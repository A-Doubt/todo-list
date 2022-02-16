import "./style.css";
import { renderLists } from "./task-lists";
import lists from "./task-lists";
import { renderTasks } from "./todo-tasks";

// remove onload animations
setTimeout(function(){
    document.body.className="";
},500);

renderLists();

