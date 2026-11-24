const todoForm = document.querySelector("#todo-form");
const todoInput = todoForm.querySelector("#todo-form input");
const todoList = document.querySelector("#todo-list");

const today = new Date();
const TODOS_KEY = `${today.getFullYear()}${String(today.getMonth()+1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}ingTodos`;
const FINISH_KEY = `${today.getFullYear()}${String(today.getMonth()+1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}finishTodos`;
const FLAGDATE_KEY="flagdate"

let toDos=[];
let finishToDos=[];
//save된것들이 버튼에 눌리면 finishtoDos로 이동해서 별도 저장해주기 (완료)
//그 다음에 finishTodos 로딩때 스타일 설정해주기(완료)

function resetDate(){
    localStorage.setItem(FLAGDATE_KEY, `${today.getFullYear()}${String(today.getMonth()+1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`);
}

function saveTodos(){
    const viewDate = localStorage.getItem(FLAGDATE_KEY);
    localStorage.setItem(`${viewDate}ingTodos`, JSON.stringify(toDos));
    localStorage.setItem(`${viewDate}finishTodos`, JSON.stringify(finishToDos));
}

function finishCheckTodo(event){
    const li = event.target.closest("li");
    const targetSpan = li.querySelector("span");
    targetSpan.classList.add("clearTodo");
    [toDos, finishToDos] = toDos.reduce(
        ([pass, fail], toDo) => {
            (toDo.id !== parseInt(li.id) ? pass : fail).push(toDo);
            return [pass, fail];
        },
        [[], [...finishToDos]]
    );
    saveTodos();
}

function deleteTodo(event){
    const li = event.target.closest("li");
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    finishToDos = finishToDos.filter(toDo => toDo.id !== parseInt(li.id));
    saveTodos();
    li.remove();
}

function paintTodo(newTodo, flag=false){
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    if(flag===true){
        span.classList.add("clearTodo");
    }

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("todo-actions");

    const firstButton = document.createElement("button");
    const secondButton = document.createElement("button");
    
    firstButton.innerText = "✅"; //clear -> 완료처리용 버튼
    secondButton.innerText = "❌"; //delete -> 삭제처리용 버튼
    firstButton.addEventListener("click", finishCheckTodo);
    secondButton.addEventListener("click", deleteTodo);
    li.appendChild(span);
    buttonDiv.appendChild(firstButton);
    buttonDiv.appendChild(secondButton);
    li.appendChild(buttonDiv);
    todoList.appendChild(li);
}

function handleTodoSubmit(event){
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = "";
    const newTodoObj = {
        text:newTodo,
        id:Date.now(),
    }
    paintTodo(newTodoObj);
    toDos.push(newTodoObj);
    saveTodos();
}

todoForm.addEventListener("submit", handleTodoSubmit);

function loadingToDos(){
    const savedToDos = localStorage.getItem(TODOS_KEY);
    const finishedToDos = localStorage.getItem(FINISH_KEY);


    if(savedToDos){
        const parsedToDos = JSON.parse(savedToDos);
        toDos = parsedToDos;
        parsedToDos.forEach(paintTodo);
    }
    if(finishedToDos){
        const parsedToDos = JSON.parse(finishedToDos);
        finishToDos = parsedToDos;
        parsedToDos.forEach((item) => paintTodo(item, true));
    }
}

resetDate();
loadingToDos();