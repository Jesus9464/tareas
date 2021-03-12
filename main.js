const $sun = document.getElementById("id-sun");
const $moon = document.getElementById("id-moon");
//modo nocturno
function dia (e) {
  document.getElementById("main-principal").classList.remove("dark-mode");
  document.querySelector("#list_task").classList.remove("dark-mode");
  document.querySelector("#container").classList.remove("dark-mode");
  document.getElementById("id-moon").classList.remove("active");
  this.classList.add("active");
};

function noche (e) {
  document.getElementById("main-principal").classList.add("dark-mode");
  document.querySelector("#list_task").classList.add("dark-mode");
  document.querySelector("#container").classList.add("dark-mode");
  document.getElementById("id-sun").classList.remove("active");
  this.classList.add("active");
  localStorage.setItem('clase', 'dark-mode')
  localStorage.setItem('activado', 'active')
};


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
    <button id="task_deleted" class="" data-delet="${contador}">delete</button>
</li>`;
    const $btn_complete = document.querySelectorAll(`#task_complete`);
    $btn_complete.forEach((element) => element.addEventListener("click", complete));
    const $btn_delete = document.querySelectorAll(`#task_deleted`);
    $btn_delete.forEach((element) => element.addEventListener('click', eliminar));
  }

  function complete(event) {
    console.log(event);
    const $cur_task = document.querySelector(`#task__list_${event.target.dataset.task}`);
    console.log($cur_task);
    $cur_task.classList.add("complete");
    Swal.fire({
      icon: 'success',
      title: 'well done',
      showConfirmButton: false,
      timer: 1500
    });
  }

  function eliminar(event) {
    event.preventDefault()
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const $cur_delet = document.querySelector(`#task__list_${event.target.dataset.delet}`);
        console.log($cur_delet);
        $list.removeChild($cur_delet)
      }
    })
  };
  (() => {
    $moon.addEventListener('click', noche)
    $sun.addEventListener('click', dia)
    $btn_add.addEventListener("click", render);
  })();