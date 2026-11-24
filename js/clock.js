const clock = document.querySelector("#clock");
const dateViewer = document.querySelector("#dateDiv p");

function getClock(){
    const date = new Date();
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");
    clock.innerText = `${hour}:${minute}:${second}`;
}

function setClock(){
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth()+1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    dateViewer.innerText = `${year} / ${month} / ${day}`;
}

setClock();
getClock();
setInterval(getClock, 1000);