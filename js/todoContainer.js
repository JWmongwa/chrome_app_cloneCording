//날짜별로 정리해서 preDate, Next Date의 기록을 불러오는 역할의 JS
//저장 네임 양식을 날짜(년 월 일 + ingTodo와 finishTodo로 나누어 작업) (완료)
//버튼을 누르면 todoform 안을 초기화시키고 다시 paintTodo하는 것이 핵심
//그리고 그 날짜로 돌려보내는게 필수

const prevDateButton = document.querySelector("#previousDate");
const nextDateButton = document.querySelector("#nextDate");

function setDate(value){
    const dateStr = localStorage.getItem(FLAGDATE_KEY);
    if(dateStr.length !== 8) return null;

    const year = Number(dateStr.slice(0, 4));
    const month = Number(dateStr.slice(4, 6))-1;
    const day = Number(dateStr.slice(6, 8));

    const date = new Date(year, month, day);
    date.setDate(date.getDate() + value);
    dateViewer.innerText = `${date.getFullYear()} / ${String(date.getMonth()+1).padStart(2, "0")} / ${String(date.getDate()).padStart(2, "0")}`
    
    localStorage.setItem(FLAGDATE_KEY, `${date.getFullYear()}${String(date.getMonth()+1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`);
}

function loadDate(value){
    setDate(value);
    todoList.innerHTML = "";
    toDos = [];     
    finishToDos = [];

    const targetDate = localStorage.getItem(FLAGDATE_KEY);
    const savedToDos = localStorage.getItem(`${targetDate}ingTodos`);
    const finishedToDos = localStorage.getItem(`${targetDate}finishTodos`);

    if(savedToDos){
        toDos = JSON.parse(savedToDos);
        toDos.forEach((item) => paintTodo(item));
    }
    if(finishedToDos){
        finishToDos = JSON.parse(finishedToDos);
        finishToDos.forEach((item) => paintTodo(item, true));
    }
}

prevDateButton.addEventListener("click", () => loadDate(-1));
nextDateButton.addEventListener("click", () => loadDate(1));