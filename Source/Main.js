function setTodaysDate(){
    const today = '' + new Date() + ''
    var todaysDate = document.getElementById("todo-date").textContent = today;
}
setInterval(setTodaysDate, 1000); //Call function every second

const text = document.getElementById("text");
const addTodoButton = document.getElementById("add-todo-button");
const listBox = document.getElementById("listBox");
const saveIndex = document.getElementById("saveIndex");

let todoArray = [];

addTodoButton.addEventListener("click", (e)=>{
    e.preventDefault(); //If event not explicitly handled, deny default action
    let todo = localStorage.getItem("todo");
    if(todo === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(todo);
    }
    todoArray.push(text.value);
    text.value = "";
    //Store array to localStorage on every change (task added, removed, etc.)
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
})


function displayTodo() {
    let todo = localStorage.getItem("todo");
    if(todo === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(todo);
    }
    let htmlCode = "";
    todoArray.foreach((list, ind) => {
        htmlCode += 
        `<div>
            <span>${list}</span>
        </div>`
    });
}



var myNodelist = document.getElementsByTagName("LI");
var i;
// Append close button to each list item
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");

    span.className = "closeElement";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
    localStorage.setItem("List"+ myNodelist[i], (myNodelist[i].value))
}

// Click on close button
var closeElements = document.getElementsByClassName("closeElement");
var i;
// Cycle through all close elements
for (i = 0; i < closeElements.length; i++) {
    //If close[i] is clicked, hide / set display to none
    closeElements[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    //Get input value
    // trim() whitespace from before/after text
    var inputValue = document.getElementById("inputBar").value.trim();
    var t = document.createTextNode(inputValue);

    //Append value to list item
    li.appendChild(t);
    if (inputValue === '') {
        //Displays alert box to screen
        alert("Can't be empty there are things to be done");
    } else {
        //Add created item to list
        document.getElementById("todoItemList").appendChild(li);
    }
    //Reset input bar
    document.getElementById("inputBar").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "closeElement";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < closeElements.length; i++) {
        closeElements[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
        }
    }
}