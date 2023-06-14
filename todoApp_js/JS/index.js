class Task {
    constructor(title, date) {
      this.title = title;
      this.date = date;
      this.isDone = false;
    }
  }
  
  class TaskManager {
    constructor(tasks) {
      this.tasks = tasks;
    }
  
    addNewTaskTable() {
      document.getElementById('Tasks').innerHTML = "";
      let index = 0;
      for (const task of this.tasks) {
        let content =
          `
              <div class="containerTasks" id="Tasks">
                  <!-- Task content-->
                  <div class="taskContent">
                      <!-- task info -->
                      <div class="taskInfo">
                          <h2>${task.title}</h2>
                          <div>
                              <span><i class="fa-sharp fa-solid fa-calendar"></i></span>
                              <span>${task.date}</span>
                          </div>
                      </div>
                      <!-- //task info -->
                      <!-- tasks Actions -->
                      <div class="actions">
                          <button onclick="taskManager.deleteTask(${index})" class="circleBtn Delete">
                              <i class="fa-solid fa-trash colorIcon"></i>
                          </button>
                          <button class="circleBtn Cheeck">
                              <i class="fa-solid fa-check colorIcon"></i>
                          </button>
                          <button onclick="taskManager.editTask(${index})" class="circleBtn Edite">
                              <i class="fa-solid fa-pen-to-square colorIcon"></i>
                          </button>
                      </div>
                      <!-- //tasks Actions// -->
                  </div>
                  <!-- //task content //-->
              </div>
          `;
        document.getElementById('Tasks').innerHTML += content;
        index++;
      }
    }
  
    addTask(title, date) {
      const task = new Task(title, date);
      this.tasks.push(task);
      this.sortTasks();
      this.addNewTaskTable();
    }
  
    deleteTask(index) {
      let task = this.tasks[index];
      let isConfirmed = confirm("هل انت متأكد من انك تريد حذف النص : " + ` !! ( ${task.title} )`);
  
      if (isConfirmed) {
        this.tasks.splice(index, 1);
        this.addNewTaskTable();
      }
    }
  
    editTask(index) {
      let task = this.tasks[index];
      let newTask = prompt("قم بأدخال النص الذي تريد تعديله", task.title);
  
      // Validation
      let taskNameTrimmed = newTask.trim();
      if (taskNameTrimmed === "") {
        alert("من فضلك انت لم تقم بأدخال أي نص، الرجاء التأكد من ادخال النص.");
        return;
      }
      // End Validation
  
      task.title = taskNameTrimmed;
      this.sortTasks();
      this.addNewTaskTable();
    }
  
    sortTasks() {
      this.tasks.sort((a, b) => a.title.localeCompare(b.title));
    }
  }
  
  const tasks = [
    {
      "title": 'الرياضة',
      "date": '15/10/2023',
      "isDone": false
    },
    {
      "title": 'الطعام',
      "date": '15/10/2023',
      "isDone": false
    },
    {
      "title": 'الصلاة',
      "date": '15/10/2023',
      "isDone": false
    }
  ];
  
  const taskManager = new TaskManager(tasks);
  taskManager.addNewTaskTable();
  
  // Add a new task
  document.getElementById('addNewTask').addEventListener('click', function () {
    let taskName = prompt("من فضلك قم بإدخال النص الذي تريده");
    let taskNameTrimmed = taskName.trim();
  
    // Validate the task name
    if (taskNameTrimmed === "") {
      alert("من فضلك انت لم تقم بأدخال أي نص، الرجاء التأكد من ادخالك للنص.");
      return;
    }
  
    // Check for duplicate task
    const isDuplicate = tasks.some((task) => task.title === taskNameTrimmed);
    if (isDuplicate) {
      alert("النص الذي تحاول ادخاله موجود بالفعل " + ` ( ${taskNameTrimmed} ) `);
      return;
    }
  
    const now = new Date();
    const date =
      now.getDate() +
      "/" +
      (now.getMonth() + 1) +
      "/" +
      now.getFullYear() +
      "|" +
      now.getHours() +
      ":" +
      now.getMinutes();
  
    let taskObj = {
      title: taskNameTrimmed,
      date: date,
      isDone: false,
    };
  
    taskManager.addTask(taskObj.title, taskObj.date);
  });
  
  // Task Delete 
  function deleteTask(index) {
    taskManager.deleteTask(index);
  }
  
  // Task Edit
  function Edit(index) {
    taskManager.editTask(index);
  }
  