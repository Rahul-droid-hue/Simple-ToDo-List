// Select Dom Elements
const input = document.getElementById('input')
const addBtn = document.getElementById('add-btn')
const list = document.getElementById('todo-list')

//Try to load saced todos from localStorage (If any)
const saved = localStorage.getItem('todos');
const todos = saved? JSON.parse(saved) : [];
function saveTodos(){
    //Save current todos to localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}

//Create a dom node for a todo object and append it to the list
function createTodoNode(todo, index){
    const li = document.createElement('li');

    //checkbox to toggle completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", ()=>{
        todo.completed = checkbox.checked;

        //TODO: visual feedback: Strike through completed todos
        textSpan.style.textDecoration =todo.completed? "line-through":"";
        saveTodos();
    })

    //Text of the Todo
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin ="0 8px";
    if(todo.completed){
        textSpan.style.textDecoration = "line-through";
    }
        //add double-click event listener to edit todo text
        textSpan.addEventListener("dblclick", ()=>{
            const newText = prompt("Edit todo", todo.text);
            if(newText != null){
                todo.text = newText.trim()
                textSpan.textContent = todo.text;
                saveTodos();
            }
        }) 
        
        //Delete todo Button
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", ()=>{
            todos.splice(index,1);
            render();
            saveTodos();
        })

        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(delBtn);

        return li;
    
}

//Render the whole todo list from todos array
function render(){
    list.innerHTML ='';

    //Recreate each todo item
    todos.forEach((todo,index)=>{
        const node = createTodoNode(todo,index);
        list.appendChild(node)
    });
}

//Add button click event
function addTodo(){
    const text = input.value.trim();
    if(!text){
        return
    }

    //push new todo object
    todos.push({text:text, completed: false});
    input.value = '';
    render()
    saveTodos()
}

addBtn.addEventListener('click', addTodo);
input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        addTodo();
    }
});
render();

const toggleBtn = document.getElementById("theme-toggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️ Light Mode";
}

// Toggle theme
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        toggleBtn.textContent = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");
    } else {
        toggleBtn.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    }
});