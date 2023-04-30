// Select Elements
 const form= document.querySelector("#todoAddForm");
 const input= document.querySelector("#todoName");
 const todoList= document.querySelector(".list-group");
const cardBody1= document.querySelectorAll(".card-body")[0];
const cardBody2= document.querySelectorAll(".card-body")[1];
const clearButton= document.querySelector("#clearButton");
const filterInput=  document.querySelector("#todoSearch");
let todos=[];

runEvents();
function runEvents(){
    form.addEventListener("submit",addTodo)
    document.addEventListener("DOMContentLoaded", pageloaded)
    cardBody2.addEventListener("click", removeTodoToUI);
    clearButton.addEventListener("click", removeAllTodos);
    filterInput.addEventListener("keyup", filter);
}
function filter(e){
    const filterValue=e.target.value.toLowerCase().trim();
    const todoListesi= document.querySelectorAll(".list-group-item");
    if (todoListesi.length>0) {
       todoListesi.forEach(function(todo){
        if(todo.textContent.toLowerCase().trim().includes(filterValue)){
        todo.setAttribute("style","display:block");
        }else
        {
            todo.setAttribute("style","display:none !important");
        }
    })    
    }
    else
    {
        showAlert("warning", "Filtrelemek için todo giriniz");

    }
   
}
function removeAllTodos(){
    checkTodosFromStorage();
    // Remove to screen
   const todoListe= document.querySelectorAll(".list-group");
   if (todoListe.length>0) {
    todoListe.forEach(function (todo){
        todo.remove();
        
       }) 
       
    //Remove to Storage
    todos=[];
    localStorage.setItem("todos",JSON.stringify(todos)) 
    showAlert("success","Todolar başarıyla silindi");
   }
   else{
    showAlert("warning","Silmek için Todo giriniz");
   }
  
}
function removeTodoToUI(e){
    if (e.target.className==="fa fa-remove") {
        // Remove to screen
       const todo=e.target.parentElement.parentElement;
       todo.remove();
       showAlert("success","Todo başarıyla silindi");
       // Remove to storage
       removeTodoToStorage(todo.textContent);
    }
}
function removeTodoToStorage(removeTodo){
        checkTodosFromStorage();
        todos.forEach(function (todo,index){
            if (removeTodo===todo) {
                todos.splice(index,1);
            }
            
        })
        localStorage.setItem("todos",JSON.stringify(todos));
}
function pageloaded(){
    checkTodosFromStorage();
    todos.forEach(function (todo){
        addTodoToUI(todo);
    });
}
function addTodo(e){
    const inputText= input.value.trim();
    if(inputText=="" || inputText==null) {
    showAlert("warning","Boş geçmeyiniz");
  } 
  else{
    // Add To UI
    addTodoToUI(inputText);
    addTodoToStorage(inputText);
    showAlert("success","Todo eklendi");
    
  } 
e.preventDefault();
}

function addTodoToUI(newtodo){
    /*
    <li class="list-group-item d-flex justify-content-between">Todo 1
        <a href="#" class="delete-item">
            <i class="fa fa-remove"></i>
        </a>
    </li>
    */
   const li= document.createElement("li");
   li.className="list-group-item d-flex justify-content-between";
   li.textContent=newtodo;
   const a= document.createElement("a");
   a.href="#";
   a.className="delete-item";
   const i= document.createElement("i");
   i.className="fa fa-remove";

   a.appendChild(i);
   li.appendChild(a);
   todoList.appendChild(li);
   input.value="";
}

function addTodoToStorage(newtodo){
    checkTodosFromStorage();
    todos.push(newtodo);
    localStorage.setItem("todos", JSON.stringify(todos));

}


function checkTodosFromStorage(){
    if(localStorage.getItem("todos")==null){
        todos=[];

    }else{
        todos= JSON.parse(localStorage.getItem("todos"));
    }
}
function showAlert(type,message){
    /*
    <div class="alert alert-warning" role="alert">
  This is a warning alert—check it out!
</div>
    */
   const div= document.createElement("div");
   div.className="alert alert-"+type;
// div.className=`alert alert-${type}`;
   div.role="alert";
   div.textContent=message;
   cardBody1.appendChild(div);

    setTimeout(function(){
        div.remove();
    }, 2500);
}