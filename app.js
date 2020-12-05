const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
let tasks;

fillTasks();
loadEventListeners();


function loadEventListeners(){
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask)
}

function fillTasks(){
    getLocalStorage();
    tasks.forEach(function(task){
        taskList.appendChild(createLi(task));
    })
}

function getLocalStorage(){
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
}

function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    } else {
        addToLocalStorage(taskInput.value);
        taskList.appendChild(createLi(taskInput.value));
        taskInput.value = '';
        e.preventDefault();
    }
}

function createLi(taskValue){
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskValue));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    return li
}


function addToLocalStorage(task){
    getLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e){
    const removeTaskParent = e.target.parentElement;
    if(removeTaskParent.classList.contains('delete-item')){
        taskList.removeChild(removeTaskParent.parentElement);
        removeFromLocalStorage(removeTaskParent.previousSibling.data)
    }
    e.preventDefault();
}

function removeFromLocalStorage(value) {
    getLocalStorage();
    tasks = tasks.filter(function(x){
        return x != value;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}