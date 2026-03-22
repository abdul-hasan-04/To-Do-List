let todoListContainer = document.querySelector(".list-container");
let buttonsContainer = document.querySelector(".btns");
let inputField = document.querySelector("#inputField");
let addBtn = document.querySelector("#addBtn");
let countEditBtnClicks = 0;
// render tasks from localstorage to dom//
document.addEventListener("DOMContentLoaded", () => {
  let myExistingTasks = readTaskFromLocalStorage();
  myExistingTasks.forEach(element => {
    addTaskTodom(element)
  });
})
// A. Features 

// 1. write Task Text on the input
// 2. add Task [DOM PAGE, LOCAL STORAGE]
// 3. Edit Task [DOM PAGE, LOCAL STORAGE]
// 4. Delete Task [DOM PAGE, LOCAL STORAGE]
// 5. complete Task [DOM PAGE, LOCAL STORAGE]

// B. User Flow
// 1. User enters something in the input field
// 2. User clicks addTask button
// 3. Task appears on the top of one another.
// 4. User can edit, delete, complete task on the page.

// C. Functions

// 1. Create Task() => Done ✅
// 2. Add task to dom()
// 3. Add task to LocalStorage()
// 4. Render Task and display it on the dom page()
// 5. Edit Task()
// 6. Delete Task()
// 7. Read Excisting data from local Storage()
// 6. Handle Events() => events of the user must do actions on the page

// ========> Program Starts Here <=========
const readTaskFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("tasks")) || [];
};

const addTaskToLocalStorage = (taskObject) => {
  let myoldTasks = readTaskFromLocalStorage();
  myoldTasks.push(taskObject);
  localStorage.setItem("tasks", JSON.stringify(myoldTasks));
}
// render task function to dom//
const renderTask = (li) => {
  todoListContainer.append(li);
}
// add Task to dom function 

// Edit Task work//


const handleEditTask = (li,taskId) => {
  // first create Save Task Btn//
  let newButton = document.createElement("button");
  newButton.textContent = "Save Task";
  buttonsContainer.append(newButton);
  let editBtn = li.querySelector(".edit-btn");
  let userTaskText = li.querySelector("span").textContent;
  inputField.value = userTaskText;
  
  // addevent to save task and edit task from both localstorage and dom//
  newButton.addEventListener("click", () => {
    // edit task text from local storage;
    let editBtn = li.querySelector(".edit-btn");
    editBtn.disabled = false;
    
    let myTasks = readTaskFromLocalStorage();
    let editedTask = myTasks.find(task => task.id === taskId);
    editedTask.text = inputField.value;
    localStorage.setItem("tasks", JSON.stringify(myTasks));
    // edit task to dom//
    let span = li.querySelector("span");
    span.textContent = inputField.value;

    // clear inputfield and remove saveTaskBtn//
    inputField.value = null;
    newButton.remove();
  })
}
// deleteTask///
const handleDeleteTask = (taskId) => {

  // delete From locolstorage//

  let myoldTasks = readTaskFromLocalStorage();
  myoldTasks = myoldTasks.filter(task => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(myoldTasks));
  // delet from dom//
  todoListContainer.innerHTML = "";

  myoldTasks.forEach(task => {
    addTaskTodom(task);
  })
  alert("Task Deleted.✅");
}

// complete task both local storage and dom//
const completeTask = (li,taskId,checked) => {
  let spanText = li.querySelector("span");
  let myTasks = readTaskFromLocalStorage();
  let checkedTask = myTasks.find(task => task.id === taskId);
  if(checkedTask){
    checkedTask.completed = checked;
    spanText.classList.toggle("completed", checked);
    localStorage.setItem("tasks", JSON.stringify(myTasks)); 
  }
  if(checked){
    alert("Task completed");
  }
 
//  
 
}
// handle Events//
const handleEvents = (list,task) => {
  let editBtn = list.querySelector(".edit-btn");
  let deletBtn = list.querySelector(".delete-btn");
  let checkInput = list.querySelector(".check");
  
  // addEventLister to them//
  editBtn.addEventListener("click", function trackEditfunction () {
    countEditBtnClicks++;
    if(countEditBtnClicks >= 1){
       editBtn.disabled = true;
    }
    handleEditTask(list,task.id);
  });
  
  deletBtn.addEventListener("click", () => {
    handleDeleteTask(task.id);
  });

  checkInput.addEventListener("change", () => {
    completeTask(list,task.id,checkInput.checked);
  })
}
const addTaskTodom = (taskObject) => {
  let li = document.createElement("li");
  li.innerHTML = `
    <span class="task-text ${taskObject.completed ? "completed" : "" }">${taskObject.text}</span>
    <div class="mydiv"> 
       <input type="checkbox" id="check" class="check"  ${taskObject.completed ? "checked" : ""}>
      <button class="edit-btn edit">Edit</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;
  // render and display task to dom realtime//
  renderTask (li);
  handleEvents(li,taskObject);
}
// delete Task function//

addBtn.addEventListener("click", () => {
  // Create Task with uniqe => [text, id, status] everytime user clicks Add Button.
  let userTaskText = inputField.value.trim(); // Get user info evertime user click 
  // check wheter usser enters value or not//
  if(!userTaskText) return alert("Please Enter your Task first.");
  let taskObject = {
    text : userTaskText,
    id : Date.now(),
    completed : false,
  } // this creates only properties of each li task that you can use it later on adding to dom
  
  // create li and add task dom = Function ();
  addTaskTodom (taskObject);
  addTaskToLocalStorage (taskObject);
  // clear inputField 
  inputField.value = "";
})

// handle events like edit, delete task//


  