const addTaskBtn = document.getElementById('addTask');
const taskInput = document.getElementById('taskInput');
const categorySelect = document.getElementById('categorySelect');
const dueDateInput = document.getElementById('dueDateInput');
const taskList = document.getElementById('taskList');
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');
const stadistics = document.getElementById('stadistics');

// Cargar tareas desde localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

// Flatpickr para fecha
flatpickr("#dueDateInput",{dateFormat:"Y-m-d",minDate:"today"});

// Guardar en localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = `list-group-item d-flex justify-content-between align-items-center ${task.status}`;

    const taskInfo = document.createElement('div');
    taskInfo.innerHTML = `
      <strong>${task.name}</strong><br>
      <small>Categoría: ${task.category} | Estado: ${task.status === "active" ? "En proceso" : "Completada"} | Vence: ${task.dueDate}</small>
    `;

    // Botón completar
    const completeBtn = document.createElement('button');
    completeBtn.textContent = "Completar";
    completeBtn.className = 'btn btn-success btn-sm me-2';
    completeBtn.onclick = function() {
      tasks[index].status = "completed";
      saveTasks();
      renderTasks();
    };

    // Botón eliminar
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Eliminar";
    deleteBtn.className = 'btn btn-danger btn-sm';
    deleteBtn.onclick = function() {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    const btnGroup = document.createElement('div');
    btnGroup.appendChild(completeBtn);
    btnGroup.appendChild(deleteBtn);

    li.appendChild(taskInfo);
    li.appendChild(btnGroup);
    taskList.appendChild(li);
  });

  updateStatistics();
  filterTasks();
}

// Agregar tarea
addTaskBtn.addEventListener('click', function() {
  const taskText = taskInput.value.trim();
  const category = categorySelect.value;
  const dueDate = dueDateInput.value.trim();

  if (taskText !== "" && category !== "" && dueDate !== "") {
    const newTask = {
      name: taskText,
      category: category,
      dueDate: dueDate,
      status: "active"
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();

    taskInput.value = "";
    categorySelect.value = "";
    dueDateInput.value = "";
  } else {
    alert("Por favor completa todos los campos antes de agregar la tarea.");
  }
});

// Estadísticas
function updateStatistics() {
  let total = tasks.length;
  let activeCount = tasks.filter(t => t.status === "active").length;
  let completedCount = tasks.filter(t => t.status === "completed").length;

  stadistics.innerHTML = `
    <strong>Estadísticas:</strong><br>
    Total de tareas: ${total} | En proceso: ${activeCount} | Completadas: ${completedCount}
  `;
}

// Filtro y búsqueda
function filterTasks() {
  const searchText = searchInput.value.toLowerCase();
  const filterValue = filterSelect.value;

  const items = taskList.getElementsByTagName('li');
  for (let item of items) {
    const textMatch = item.textContent.toLowerCase().includes(searchText);

    const isActive = item.classList.contains('active');
    const isCompleted = item.classList.contains('completed');

    let categoryMatch = false;
    if (filterValue === "all") categoryMatch = true;
    else if (filterValue === "active" && isActive) categoryMatch = true;
    else if (filterValue === "completed" && isCompleted) categoryMatch = true;

    item.style.display = (textMatch && categoryMatch) ? "" : "none";
  }
}

// Eventos de búsqueda y filtro
searchInput.addEventListener('input', filterTasks);
filterSelect.addEventListener('change', filterTasks);
