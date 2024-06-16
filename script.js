const taskValue = document.getElementById("inputTask");
const taskAlert = document.getElementById("alert");
const listItems = document.getElementById("listItems");
const addUpdate = document.getElementById("taskAddElement");

let todo = JSON.parse(localStorage.getItem("todo-list"));
if (!todo) {
  todo = [];
}

function createTask() {
  if (taskValue.value === "") {
    setAlertMessage("Escreva uma tarefa no campo acima", "alertBlank");
    taskValue.focus();
  } else {
    let IsPresent = false;
    todo.forEach((element) => {
      if (element.item == taskValue.value) {
        IsPresent = true;
      }
    });

    if (IsPresent) {
      taskAlert.classList.remove("alertBlank");
      setAlertMessage("Essa tarefa já está adicionada na lista");
      return;
    }
    let li = document.createElement("li");
    const todoItems = `<div title="clique duas vezes para completar" ondbclick="CompletedTask(this)">${taskValue.value}</div>
<div>
                    <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="https://raw.githubusercontent.com/GleytonSantos/Todo-list/main/img/pencil.png" />
                    <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="https://raw.githubusercontent.com/GleytonSantos/Todo-list/main/img/trashcan.png" /></div></div>
    
    `;
    console.log(li);
    li.innerHTML = todoItems;
    listItems.appendChild(li);
    if (!todo) {
      todo = [];
    }
    let itemList = { item: taskValue.value, status: false };
    todo.push(itemList);
    setLocalStorage();
    taskValue.value = "";
    setAlertMessage("Tarefa criada com sucesso!");
  }
}

function setAlertMessage(message, classe) {
  taskAlert.innerText = message;
  if (!classe) {
    return;
  } else {
    taskAlert.classList.add(classe);
  }
}
function setLocalStorage() {
  localStorage.setItem("todo-list", JSON.stringify(todo));
}

function ReadToDoItems() {
  todo.forEach((element) => {
    let li = document.createElement("li");
    let style = "";
    if (element.status) {
      style = "style='text-decoration: line-through'";
    }
    const todoItems = `<div ${style} title="clique duas vezes para completar" ondblclick="CompletedToDoItems(this)">${
      element.item
    }
    ${
      style === ""
        ? ""
        : '<img class="todo-controls" src="https://raw.githubusercontent.com/GleytonSantos/Todo-list/main/img/check-mark.png" />'
    }</div><div>
    ${
      style === ""
        ? '<img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="https://raw.githubusercontent.com/GleytonSantos/Todo-list/main/img/pencil.png" />'
        : ""
    }
    <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="https://raw.githubusercontent.com/GleytonSantos/Todo-list/main/img/trashcan.png" /></div></div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);
  });
}
ReadToDoItems();

function UpdateToDoItems(e) {
  if (
    e.parentElement.parentElement.querySelector("div").style.textDecoration ===
    ""
  ) {
    taskValue.value =
      e.parentElement.parentElement.querySelector("div").innerText;
    updateText = e.parentElement.parentElement.querySelector("div");
    addUpdate.setAttribute("onclick", "UpdateOnSelectionItems()");
    addUpdate.setAttribute(
      "src",
      "https://raw.githubusercontent.com/GleytonSantos/Todo-list/main/img/refresh.png"
    );
    taskValue.focus();
  }
}

function UpdateOnSelectionItems() {
  let IsPresent = false;
  todo.forEach((element) => {
    if (element.item == taskValue.value) {
      IsPresent = true;
    }
  });

  if (IsPresent) {
    setAlertMessage("A tarefa não está na lista!");
    return;
  }

  todo.forEach((element) => {
    if (element.item == updateText.innerText.trim()) {
      element.item = taskValue.value;
    }
  });
  setLocalStorage();

  updateText.innerText = taskValue.value;
  addUpdate.setAttribute("onclick", "CreateToDoItems()");
  addUpdate.setAttribute(
    "src",
    "https://raw.githubusercontent.com/GleytonSantos/Todo-list/main/img/plus.png"
  );
  taskValue.value = "";
  setAlertMessage("Task Atualizada com sucesso");
}
function DeleteToDoItems(e) {
  let deleteValue =
    e.parentElement.parentElement.querySelector("div").innerText;

  if (confirm(`Você quer mesmo deletar a tarefa: ${deleteValue}!`)) {
    e.parentElement.parentElement.setAttribute("class", "deleted-item");
    taskValue.focus();

    todo.forEach((element) => {
      if (element.item == deleteValue.trim()) {
        todo.splice(element, 1);
      }
    });

    setTimeout(() => {
      e.parentElement.parentElement.remove();
    }, 1000);

    setLocalStorage();
  }
}
