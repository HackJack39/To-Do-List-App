// Llamamos a los elementos creados en HTML a través de su ID
let encabezadoTareas = document.getElementById("encabezado");
let sumarTarea = document.getElementById("nueva-tarea");
let botonTarea = document.getElementById("boton-tarea");
let listaTareas = document.getElementById("lista-tareas");

// Función para guardar las tareas en localStorage
function guardarTareas() {
  // 1. Crear un array vacío para guardar la información
  const tareas = [];

  // 2. Seleccionar todos los elementos <li> de la lista
  const listaItems = listaTareas.querySelectorAll("li");

  // 3. Recorrer cada elemento <li>
  listaItems.forEach((li) => {
    // En la estructura, el texto está en el <label>
    const texto = li.querySelector("label").textContent;

    // Verifica si el <li> contiene la clase 'completada'
    const completada = li.classList.contains("completada");

    // Añadir los datos (texto y estado) al array
    tareas.push({
      texto: texto,
      completada: completada,
    });
  });

  // 4. Guardar el array en localStorage
  localStorage.setItem("listaDeTareas", JSON.stringify(tareas));
}

// Función para cargar las tareas desde localStorage al iniciar la app.
function cargarTareas() {
  // 1. Obtener los datos del localStorage. Si no hay nada, devuelve null.
  const datosGuardados = localStorage.getItem("listaDeTareas");

  if (!datosGuardados) {
    // Si no hay datos guardados, detenemos la función.
    return;
  }

  // 2. JSON.parse convierte la cadena de texto de vuelta a un array de JavaScript.
  const tareas = JSON.parse(datosGuardados);

  // 3. Recorrer el array guardado y recrear el HTML por cada tarea.
  tareas.forEach((tarea) => {
    // --- CREACIÓN DE ELEMENTOS ---

    let cadaTarea = document.createElement("li");

    // Si la tarea estaba marcada como completada, añadimos la clase
    if (tarea.completada) {
      cadaTarea.classList.add("completada");
    }

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    // Si la tarea estaba completada, marcamos el checkbox
    checkbox.checked = tarea.completada;

    let label = document.createElement("label");
    label.textContent = tarea.texto;
    label.contentEditable = false; // Aseguramos que no sea editable al inicio
    label.classList.add("estado-lectura"); // Estado por defecto

    // Botón de editar
    let botonEditar = document.createElement("button");
    botonEditar.textContent = "✏️";
    botonEditar.classList.add("boton-editar");

    // Botón para eliminar
    let botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Quitar";
    botonEliminar.classList.add("boton-eliminar");

    // --- AÑADIR LOS EVENT LISTENERS ---

    // Listener 1: Checkbox (Marcar/Desmarcar)
    checkbox.addEventListener("change", function () {
      cadaTarea.classList.toggle("completada");
      guardarTareas();
    });

    // Listener 2: Botón Eliminar
    botonEliminar.addEventListener("click", function (eliminar) {
      eliminar.target.parentElement.remove();
      eliminar.stopPropagation();
      guardarTareas();
    });

    // Listener 3: Botón Editar (Lógica de edición y guardado)
    botonEditar.addEventListener("click", function () {
      // Verificamos si la clase de lectura (no editable) está activa
      const enModoLectura = label.classList.contains("estado-lectura");

      if (enModoLectura) {
        // --- MODO EDITAR ---
        label.contentEditable = true;
        label.classList.remove("estado-lectura");
        botonEditar.textContent = "✔️"; // Muestra el check
        label.focus();
        label.classList.add("editando"); // Clase visual
      } else {
        // --- MODO GUARDAR ---
        label.contentEditable = false;
        label.classList.add("estado-lectura");
        botonEditar.textContent = "✏️"; // Vuelve al lápiz
        label.classList.remove("editando");
        guardarTareas();
      }
    });

    // Opcional: Permitir guardar al presionar Enter durante la edición
    label.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        botonEditar.click(); // Simula el clic en el botón de Guardar
      }
    });

    // --- ENSAMBLAR Y AÑADIR ---
    cadaTarea.appendChild(checkbox);
    cadaTarea.appendChild(label);
    cadaTarea.appendChild(botonEditar);
    cadaTarea.appendChild(botonEliminar);
    listaTareas.appendChild(cadaTarea);
  });
}

// Añadimos el evento al botón de añadir tarea cuando hacemos clic
botonTarea.addEventListener("click", function () {
  let textoTarea = sumarTarea.value.trim(); // Eliminar espacios en blanco
  if (textoTarea !== "") {
    // Verificar que el campo no esté vacío
    let cadaTarea = document.createElement("li"); // Crea una fila por cada tarea

    let checkbox = document.createElement("input"); // Crea el checkbox
    checkbox.type = "checkbox";

    let label = document.createElement("label");
    label.textContent = textoTarea;
    label.contentEditable = false; // 
    label.classList.add("estado-lectura"); // 

    // Botón para editar tarea
    let botonEditar = document.createElement("button");
    botonEditar.textContent = "✏️";
    botonEditar.classList.add("boton-editar");

    // Botón para eliminar tarea
    let botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Quitar";
    botonEliminar.classList.add("boton-eliminar");

    // Listener 1: Checkbox (Marcar/Desmarcar)
    checkbox.addEventListener("change", function () {
      cadaTarea.classList.toggle("completada");
      guardarTareas(); // guardamos la tarea cambiada en localStorage
    });

    // Listener 2: Botón Eliminar
    botonEliminar.addEventListener("click", function (eliminar) {
      eliminar.target.parentElement.remove();
      eliminar.stopPropagation();
      guardarTareas(); // guardamos en localStorage que se ha eliminado una tarea
    });

    // Listener 3: Botón Editar (Lógica de edición y guardado)
    botonEditar.addEventListener("click", function () {
      // Verificamos si la clase de lectura (no editable) está activa
      const enModoLectura = label.classList.contains("estado-lectura");

      if (enModoLectura) {
        // --- MODO EDITAR ---
        label.contentEditable = true;
        label.classList.remove("estado-lectura");
        botonEditar.textContent = "✔️";  
        label.focus();
        label.classList.add("editando"); 
      } else {
        // --- MODO GUARDAR ---
        label.contentEditable = false;
        label.classList.add("estado-lectura");
        botonEditar.textContent = "✏️"; 
        label.classList.remove("editando");
        guardarTareas();
      }
    });

    // Permite guardar al presionar Enter durante la edición
    label.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        botonEditar.click(); // Simula el clic en el botón de Guardar
      }
    });

    // Ensamblaje final
    cadaTarea.appendChild(checkbox);
    cadaTarea.appendChild(label);
    cadaTarea.appendChild(botonEditar);
    cadaTarea.appendChild(botonEliminar);

    listaTareas.appendChild(cadaTarea);
    sumarTarea.value = ""; // Limpia para el próximo elemento

    guardarTareas(); // guardamos la tarea en localStorage
  }
});

// LLAMADA FINAL DE INICIO
cargarTareas();


