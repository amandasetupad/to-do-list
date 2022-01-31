//Selectors
const todoInput = document.querySelector('.form-control');
const todoButton = document.querySelector('.btn.btn-outline-secondary');
const todoList = document.querySelector('.to-do-list');
const filterOption = document.querySelector('.form-select');

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("change", filterTodo);

//Functions

function addTodo(event) {
    // Prevent form from submitting
    event.preventDefault();

    //to create new to-do divs
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("to-do");

    //to create new li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value; //adds your written text as to-do task
    newTodo.classList.add('to-do-item');
    todoDiv.appendChild(newTodo);

    //add to do to localstorage
    saveLocalTodos(todoInput.value);

    //completed button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="far fa-check-square"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="far fa-minus-square"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //append to list
    todoList.appendChild(todoDiv);

    //clear to do input value
    todoInput.value = "";


}

function deleteTodo(e) {
    const item = e.target;

    //delete to-do item
    if (item.classList.contains("delete-btn")) {
        const todo = item.parentElement;
        todo.classList.add("fall"); // animation
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove(); //removes to-do item after animation
        });

    }

    //complete to-do item
    if (item.classList.contains("complete-btn")) {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}


//filter
function filterTodo(e) {
    const todos = Array.from(document.querySelectorAll(".to-do-list .to-do"));
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                } break;
            case "unfinished":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                } break;
        }
    });
}


function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    // console.log("hello");
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        //to create new to-do divs
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("to-do");

        //to create new li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('to-do-item');
        todoDiv.appendChild(newTodo);

        //completed button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="far fa-check-square"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="far fa-minus-square"></i>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);

        //append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex=todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}


