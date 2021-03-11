//modo nocturno
document.getElementById('id-sun').onclick = function(){
  console.log('dia');
  document.getElementById('main-principal').classList.remove('dark-mode')
  document.querySelector("#list_task").classList.remove('dark-mode')
  document.querySelector("#container").classList.remove('dark-mode')
  document.getElementById('id-moon').classList.remove('active')
  this.classList.add('active')
}


document.getElementById('id-moon').onclick = function(){
  console.log('noche');
  document.getElementById('main-principal').classList.add('dark-mode')
  document.querySelector("#list_task").classList.add('dark-mode')
  document.querySelector("#container").classList.add('dark-mode')
  document.getElementById('id-sun').classList.remove('active')
  this.classList.add('active')
}






//tareas
const $title = document.querySelector("#name");
const $task = document.querySelector("#input");
const $btn_add = document.querySelector("#btn_add");
const $list = document.querySelector("#list_task");
let contador = 0;

Swal.fire({
  title: "write your name",
  input: "text",
  inputAttributes: {
    autocapitalize: "off",
  },
  showCancelButton: false,
  confirmButtonText: "Accept",
  showLoaderOnConfirm: true,
  preConfirm: (login) => {
    $title.innerHTML = `<h1 class="name_title">${login}</h1>`;
  },
  allowOutsideClick: () => !Swal.isLoading(),
});

function render() {
  if (!$task.value) {
    return Swal.fire("write a task");
  }
  contador++;
  $list.innerHTML += `<li id="task__list_${contador}" class="" >
    <p>${$task.value}</p>
    <button id="task_complete" class="" data-task="${contador}">complete</button>
    <button id="task_deleted" class="">delete</button>
</li>`;
const $btn_complete = document.querySelectorAll(`#task_complete`);
$btn_complete.forEach(element => element.addEventListener("click", complete))
}

function complete(event){
//  event.target.classList.add("complete")
const $cur_task = document.querySelector(`#task__list_${event.target.dataset.task}`)
$cur_task.classList.add('complete')
Swal.fire("Well done")
// .then(() => $list.removeChild($cur_task))
}

(()=>{
  $btn_add.addEventListener("click", render);

})()
