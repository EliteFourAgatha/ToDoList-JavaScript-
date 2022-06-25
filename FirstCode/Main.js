//Array to hold to-do list items
let todoItems = [];

function renderToDo(todo){
    localStorage.setItem('todoItemsRef', JSON.stringify(todoItems));

    //Select first element with class 'js-todo-list'
    const list = document.querySelector('.js-todo-list');

    //Select current toDo item in the DOM
    const item = document.querySelector(`[data-key="${todo.id}"]`);

    //If toDo is checked, assign 'done' to isChecked. Else, empty string
    const isChecked = todo.checked ? 'done' : '';
    //Create "li" element (represents item in list) & assign to node
    const node = document.createElement("li");
    //Set class attribute
    node.setAttribute('class', `todo-item ${isChecked}`);
    //Set data key attribute to id
    node.setAttribute('data-key', todo.id);

    //Set contents of "li" element created above
    node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
    `;

    //If item already exists in DOM...
    if(item){
        //Replace item
        list.replaceChild(node, item);
    } else{
        //Otherwise, append element to the DOM as last child of element referenced
        // by the "list" variable above
        list.append(node);
    }

    if(todo.deleted){
        item.remove();

        //Clear whitespace from list container when toDoItems is empty
        if(todoItems.length === 0) list.innerHTML = '';

        return;
    }

}

function addToDoItem(text) {
    const todoItem = {
        text,
        checked: false, //Initialize to false, if true it gets deleted
        id: Date.now()
    };

    todoItems.push(todoItem); //Push newly created object into array
    renderToDo(todoItem);
}

function toggleDone(key) {
    // findIndex returns the position of an element in the array
    const index = todoItems.findIndex(item => item.id === Number(key));

    // Locate the todo item in the array and set its checked
    // property to the opposite. True becomes false & vice versa
    todoItems[index].checked = !todoItems[index].checked;
    renderToDo(todoItems[index]);
}

function deleteToDo(key) {
    const index = todoItems.findIndex(item => item.id === Number(key));
    const todo = {
        deleted: true,
        ...todoItems[index]
    };
    todoItems = todoItems.filter(item => item.id !== Number(key));
    renderToDo(todo);
    }

//Select form element
const form = document.querySelector('.js-form');

//Add 'submit' event listener
form.addEventListener('submit', event => {
    //Prevent page refresh on form submission
    event.preventDefault();

    //Select text input
    const input = document.querySelector('.js-todo-input');

    //Get value of input and remove white space
    const text = input.value.trim();
    if(text !== ''){
        addToDoItem(text);
        input.value = '';
        //Send program focus back to input bar
        input.focus();
    }
})

//Select entire list
const list = document.querySelector('.js-todo-list');

//Add click event listener to list and all its children
// -Listen for clicks on entire list container
// -On click, ensure the element that was clicked was a checkbox
// --If yes, extract data-key value and pass it to toggleDone
list.addEventListener('click', event => {
    if(event.target.classList.contains('js-tick')){
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }

    if (event.target.classList.contains('js-delete-todo')) {
        const itemKey = event.target.parentElement.dataset.key;
        deleteToDo(itemKey);
    }
});