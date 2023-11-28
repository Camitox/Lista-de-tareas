const Input = document.querySelector('.input-content');
const AddBtn = document.querySelector('.Btn-add');
const Form = document.querySelector('#form');
const total = document.querySelector('.total');
const uncompleted = document.querySelector('.uncompleted');
const completed = document.querySelector('.completed');
const list =  document.querySelector('#List');

// guardar en local storage
const getTasks = () => {
  list.innerHTML = localStorage.getItem('TaskList');
}

getTasks();

const totalCount = () => {
	const howMany = document.querySelector('#List').children.length; 
	total.innerHTML = howMany;
};

const completeCount = () => {
	const howMany = document.querySelectorAll('.tasks-finish').length;
	completed.innerHTML = howMany;
};

const incompletedCount = () => {
	const howMany = document.querySelectorAll('#List li:not(.tasks-finish)').length; 
	uncompleted.textContent = howMany;
};

const todoCount = () => {
	totalCount();
	completeCount();
	incompletedCount();
};

/*
list.innerHTML = localStorage.getItem('TaskList');

const completeCount = () => {
const howMany = document.querySelectorAll('.line-through').length;
completedCount.innerHTML = howMany;
};

const incompletedCount = () => {
const howMany = document.querySelectorAll('li p:not(.line-through)').length; 
deletedCount.textContent = howMany;
};

*/
// Para agregar la tarea del input a la lista.
Form.addEventListener('submit', e => {
  e.preventDefault();
    const listItem = document.createElement('li');
    listItem.innerHTML = `
    <div class="tasks"> 
    <button class="delete-btn">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
    </button>
  
    <p class="text-task">${Input.value}</p>
  
  <button class="check-btn">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

  </button>
  </div>
  `;
  list.append(listItem);
// Guardar en el local Host
  localStorage.setItem('TaskList', list.innerHTML);
// vaciar input
Input.value = ''
todoCount();
});
// Cuando precionas Eliminar
list.addEventListener('click', e => {
  if (e.target.closest('.delete-btn')) {
    const li = e.target.closest('li');
    li.remove();
    todoCount();
      localStorage.setItem('TaskList', list.innerHTML);
  }
});

    // cuando Precionas Chequear
list.addEventListener('click', e => {
  const li = e.target.closest('li');

  if(!li.classList.contains('tasks-finish')) {
    li.classList.add('tasks-finish');
    li.classList.remove('task');
  }else{
    li.classList.remove('tasks-finish');
    li.classList.add('task');
  }
  todoCount();
  localStorage.setItem('TaskList', list.innerHTML);
});


// funcion de invocar a si misma un funcion, sirve para obtener los datos que se guardan en el local storage
(() => {
	if (localStorage.getItem('TaskList')) {
		list.innerHTML = localStorage.getItem('TaskList');
    todoCount();
	} else {
		todoCount();
}
})();
