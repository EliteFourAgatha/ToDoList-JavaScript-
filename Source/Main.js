function setTodaysDate(){
    const today = '' + new Date() + ''
    var todaysDate = document.getElementById("todo-date").textContent = today;
}
setInterval(setTodaysDate, 1000); //Call function every second

const textInput = document.getElementById("inputBar");
const addTodoButton = document.getElementById("add-todo-button");
const clearTodosButton = document.getElementById("clear-todos-button");
const listBox = document.getElementById("listBox");
const finishedTodosBox = document.getElementById("finishedTodosBox");
const saveIndex = document.getElementById("saveIndex");

let todoArray = [];
let finishedTodos = [];

addTodoButton.addEventListener("click", (e)=>{
    e.preventDefault(); //If event not explicitly handled, deny default action
    let todo = localStorage.getItem("todo");
    if(todo === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(todo);
    }
    let input = textInput.value.trim();
    if (input === '') {
        //Displays alert box to screen
        alert("Can't be empty there are things to be done");
    } else {
        //Add created item to list
        todoArray.push(input);
    }

    //Reset input bar
    textInput.value = "";
    //Store array to localStorage on every change (task added, removed, etc.)
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
    displayFinishedTodos();
})

textInput.addEventListener("keyup", function(event){
    if(event.key === "Enter"){
        event.preventDefault();
        addTodoButton.click();
    }

})

function displayTodo() {
    let todo = localStorage.getItem("todo");
    if(todo === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(todo);
    }
    let htmlCode = "";
    todoArray.forEach((list, index) => {
        htmlCode += 
        `<div>
            <h2 class="todo-item-span" style="display:inline-block">${list}</h2>
            <button class="delete-button" onclick='deleteTodo(${index})' style="display:inline-block">Delete</button>
        </div>`;
    });
    listBox.innerHTML = htmlCode;
}

function deleteTodo(index){
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    //Delete (N) array elements at (index)
    let testIndex = todoArray.splice(index, 1);
    console.log(testIndex);
    finishedTodos.push(testIndex);
    //Store array to localStorage on every change (task added, removed, etc.)
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
    displayFinishedTodos();
}

clearTodosButton.addEventListener("click", (e)=>{
    e.preventDefault(); //If event not explicitly handled, deny default action
    finishedTodos.length = 0;
    displayFinishedTodos();
})

function displayFinishedTodos(){
    let htmlCode = "";
    finishedTodos.forEach((list) => {
        htmlCode += 
        `<div>
            <span>                       </span>
            <h2 class="finished-todo-span">${list}</h2>
        </div>`;
    });
    finishedTodosBox.innerHTML = htmlCode;
}