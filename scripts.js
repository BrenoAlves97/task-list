//seleção de elementos
const input = document.querySelector("#taskInput");
const btnAdd = document.querySelector("#addTaskBtn");
const errorMessage = document.querySelector("#message span");

//container de tarefas
const tasksContainer = document.querySelector("#tasks-container");

// Evento no botão de adicionar
btnAdd.addEventListener("click", isInputEmpty);

//funções
function isInputEmpty() {
  const inputValue = input.value;

  if (inputValue.length <= 0) {
    errorMessage.textContent = "Preencha o campo antes de confirmar";
    setTimeout(() => {
      errorMessage.textContent = "";
    }, 2000);
    return;
  } else {
    addTask();
  }
}

function addTask() {
  const taskName = input.value;

  const divTasks = document.createElement("div");
  divTasks.classList.add("task");

  // nome da tarefa
  const taskContent = document.createElement("p");
  taskContent.textContent = taskName;
  divTasks.appendChild(taskContent);

  // container dos botões
  const containerBtns = document.createElement("div");
  containerBtns.classList.add("buttons-controls");
  divTasks.appendChild(containerBtns);

  // botão de marcar como concluido
  const doneBtn = document.createElement("i");
  doneBtn.classList.add("fa-solid");
  doneBtn.classList.add("fa-check");

  doneBtn.addEventListener("click", () => handleTaskDone(taskContent));
  containerBtns.appendChild(doneBtn);

  const editBtn = document.createElement("i");
  editBtn.classList.add("fa-solid");
  editBtn.classList.add("fa-pen");

  editBtn.addEventListener("click", () => {
    if (input.value === "") {
      input.value = taskContent.textContent;
      divTasks.remove();
      return;
    } else {
      return;
    }
  });
  containerBtns.appendChild(editBtn);

  const removeBtn = document.createElement("i");
  removeBtn.classList.add("fa-solid");
  removeBtn.classList.add("fa-trash");

  removeBtn.addEventListener("click", () => removeTask(taskContent));
  containerBtns.appendChild(removeBtn);

  tasksContainer.appendChild(divTasks);

  clearInput();
  updateLocalStorage();
}

//limpando o campo
function clearInput() {
  setTimeout(() => {
    input.value = "";
  }, 200);
}

function handleTaskDone(taskContent) {
  const tasks = tasksContainer.children;

  for (let task of tasks) {
    if (task.firstChild.isSameNode(taskContent)) {
      task.firstChild.classList.toggle("completed");
    }
  }
  updateLocalStorage();
}

function removeTask(taskContent) {
  const tasks = tasksContainer.children;
  for (const task of tasks) {
    if (task.firstChild.isSameNode(taskContent)) {
      task.remove();
    }
  }
  updateLocalStorage();
}

function updateLocalStorage() {
  const tasks = tasksContainer.children;

  let localStorageTasks = [...tasks].map((task) => {
    const content = task.firstChild;
    const isCompleted = content.classList.contains("completed");

    return { description: content.textContent, isCompleted: isCompleted };
  });

  localStorage.setItem("tasks", JSON.stringify(localStorageTasks));
}

function refreshTaskFromLS() {
  const tasksFromLS = JSON.parse(localStorage.getItem("tasks"));

  for (const task of tasksFromLS) {
    console.log(task);
    const divTasks = document.createElement("div");
    divTasks.classList.add("task");

    const taskContent = document.createElement("p");
    taskContent.textContent = task.description;
    divTasks.appendChild(taskContent);

    if (task.isCompleted) {
      taskContent.classList.add("completed");
    }

    const containerBtns = document.createElement("div");
    containerBtns.classList.add("buttons-controls");
    divTasks.appendChild(containerBtns);

    const doneBtn = document.createElement("i");
    doneBtn.classList.add("fa-solid");
    doneBtn.classList.add("fa-check");

    doneBtn.addEventListener("click", () => handleTaskDone(taskContent));
    containerBtns.appendChild(doneBtn);

    const editBtn = document.createElement("i");
    editBtn.classList.add("fa-solid");
    editBtn.classList.add("fa-pen");

    editBtn.addEventListener("click", () => {
      if (input.value === "") {
        input.value = taskContent.textContent;
        divTasks.remove();
        return;
      } else {
        return;
      }
    });

    containerBtns.appendChild(editBtn);

    const removeBtn = document.createElement("i");
    removeBtn.classList.add("fa-solid");
    removeBtn.classList.add("fa-trash");

    removeBtn.addEventListener("click", () => removeTask(taskContent));
    containerBtns.appendChild(removeBtn);

    tasksContainer.appendChild(divTasks);
  }
}

refreshTaskFromLS();
