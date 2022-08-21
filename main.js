// 유저가 값을 입력한다
// + 버튼을 클릭하면 할일이 추가된다
// delete 버튼을 누르면 할일이 삭제된다
// check 버튼을 누르면 할일이 끝나면서 밑줄이 그어진다
// 1. check 버튼을 클릭하는 순간  false -> true
// 2. true 이면 끝난걸로 간주하고 밑줄 그어주기
// 3. false 이면 안끝난걸로 간주하고 그대로
// 진행중 끝남 탭을 누르면 언더바가 이동한다
// 끝남탭은 끝난 아이템만 진행중탭은 진행중인 아이템만
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-btn");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList = [];
let filterList = [];
let mode = "all";

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let taskValue = taskInput.value;
  let task = {
    id: randomIDGenerate(),
    taskContent: taskValue,
    isComplete: false,
  };
  taskList.push(task);
  taskInput.value = "";
  render();
}

function render() {
  let list = [];
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      resultHTML += `<div class="task task-done">
           <span>${list[i].taskContent}</span>
        <div class="btn-box">
          <button onclick="toggleComplete('${list[i].id}')" ><i class="fa-solid fa-rotate-left"></i></button>
          <button onclick="deleteTask('${list[i].id}')" class="btn-delete"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>`;
    } else {
      resultHTML += `<div class="task">   
           <span>${list[i].taskContent}</span>
        <div class="btn-box">
          <button onclick="toggleComplete('${list[i].id}')" ><i class="fa-solid fa-check"></i></button>
          <button onclick="deleteTask('${list[i].id}')" class="btn-delete"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter();
}

function filter(event) {
  if (event) {
    mode = event.target.id;
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.top =
      event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
  }

  filterList = [];

  if (mode == "all") {
    render();
  } else if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }

    render();
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
