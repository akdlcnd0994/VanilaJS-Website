const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings"),
  toDo = document.querySelector(".js-toDoForm"),
  rename = document.querySelector(".rename");
const USER_LS = "currentUser",
  SHOWING_CN = "showing";


function saveName(text){
  localStorage.setItem(USER_LS, text);
}

function deleteName(){
  localStorage.removeItem(USER_LS);
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function handleClick(text){
  toDo.classList.remove(SHOWING_CN);
  rename.classList.remove(SHOWING_CN);
  greeting.classList.remove(SHOWING_CN);
  form.classList.add(SHOWING_CN);
  deleteName(USER_LS,text);
}



function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  toDo.classList.add(SHOWING_CN);
  rename.classList.add(SHOWING_CN);
  rename.addEventListener('click', handleClick);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Have a nice day ${text}.`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    // she is not
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();