

//declaramos "element" para llamar al evento submit y se active la funcion "addTask"
//tambien declaro las variables "tareas" que es el array donde guardaremos las tareas 
//"listaTareas " es el <ul></ul> donde guardare el .innerHTML

let element=document.querySelector("#tarea").addEventListener("submit",addTask)

let tareas=[]

let listaTareas=document.querySelector("#listaTareas")

let completedd = 0 

const borrarTodo=document.querySelector("#borrarTodo")

// Función para añadir una nueva tarea esta funcion SOLO crea los objetos "task y los guarda en el array "tareas"

function addTask(event) {

    event.preventDefault();
    
    let textoTarea= document.querySelector("#textTask").value;

    const task={
        textoTarea,
        completado: false,
        id: new Date().getTime()
    }

    tareas.push(task)

    

    document.getElementById('tarea').reset();

    

    
}




//esta funcion se encarga de que por cada iteracion del array "tareas" me cree un elemento en el .innerHTML usando la funcion "createItem" aca le doy la variable "task" para ese fin 
function generateLista(tareas){

    
    listaTareas.innerHTML= "";
    tareas.forEach(task => listaTareas.innerHTML += createItem(task));

}

// aca estoy creando el elemnto html <li></li> y el contenido que tendra cuando se ejecute la funcion "generateLista"

function createItem(task){

    
    return `
    <li id="puntoLista" class="list-group-item eList  ${task.completado ? 'marked': '' } "> <input id="chulito" class="form-check-input checkMark" type="checkbox" onChange="completeTask(${task.id}) " ${task.completado ? 'checked': '' }  >${task.textoTarea} 
    ${completedd == 1 ? `<button id=("canecab") class="caneca" onClick="deleteTask(${task.id})"> <i class="fa-regular fa-trash-can"></i></button>` : ''}</li>
    
    `

    
}

/*
ahora llamo a los eventos click de los botones para poder hacer los filtros los Id de los botones son: 
"menu1" para el boton "All", 
"menu2" para el boton "Active", 
"menu3" para el boton "Completed" 
"basura" para el boton de eliminar 

*/
const menu1= document.querySelector("#All");
const menu2= document.querySelector("#Active");
const menu3= document.querySelector("#Completed");



//esta funcion escucha el click en "All" y me pone en pantalla lso componentes del array de tareas usando la funcion "generateLista"
menu1.addEventListener("click", ()=>{
    completedd=2;
    generateLista(tareas);
    borrarTodo.classList.add("desaparece");

    menu1.classList.add ("active");
    menu2.classList.remove ("active");
    menu3.classList.remove ("active");
    

    
})

// Función para marcar una tarea como completada o imcompleta (Puede ser la misma función)
function completeTask(id) {


    
    const taskIndex = tareas.findIndex(tarea => id===tarea.id )
    
    tareas[taskIndex].completado = !tareas[taskIndex].completado
    
    generateLista(tareas)
    


}

/*aca estoy filtrando y creando un array "tareasAvtiivas" basado en que el estado completado sea false sino los descarta */
menu2.addEventListener("click",()=>{
    completedd=2
    filterActivas()
    borrarTodo.classList.add("desaparece")
    menu1.classList.remove ("active");
    menu2.classList.add  ("active");
    menu3.classList.remove ("active");

    
})

// Función para filtrar tareas incompletas
function filterActivas() {

    
    
    let tareasActivas= tareas.filter(tareaf=>{
        if (tareaf.completado === false) {
            return true;
        }else{return false}
    });
    
    generateLista(tareasActivas)

    
    
}


menu3.addEventListener("click",()=>{

    filterCompletadas()
    borrarTodo.classList.remove("desaparece")
    menu1.classList.remove ("active");
    menu2.classList.remove ("active");
    menu3.classList.add ("active");

   
})


let tareasCompletas=[]

// Función para filtrar tareas completadas
function filterCompletadas() {

    
    completedd = 1 

    tareasCompletas= tareas.filter(tareaC=>{
        if(tareaC.completado){
            return true
        }else { return false}
    })
    console.log(tareasCompletas)
    generateLista(tareasCompletas)


}



// Función para borrar una tarea

/* let element=document.querySelector("#tarea").addEventListener("submit",addTask)
*/

/*const canecab=document.querySelector("#canecab").addEventListener("click", deleteTask())*/


function deleteTask(id) {
   
   console.log(id);

   for (let i=0; i<tareasCompletas.length; i++ ){

        if(tareasCompletas[i].id == id){
            tareasCompletas.splice(i,1)
        }

        console.log(tareas)

   } 

   for(let a=0; a<tareas.length;a++){

        if(tareas[a].id==id){
            tareas.splice(a,1)
        }
   }


   generateLista(tareasCompletas)
   
}




// Funcion para borrar todas las tareas

let deleteTodo=document.querySelector("#borrarTodo").addEventListener("click", deleteAll)

function deleteAll() {

        //esta funcion crea un nuevo array basado en las coincidencias de tareas completas y tareas con la funcion.map, luego elimino los componentes de tareasCompletas.
        const paraEliminar= tareasCompletas.map(tarea=>tarea.id);
        

        tareasCompletas.splice(0,tareasCompletas.length)

        console.log(tareasCompletas)        

        generateLista(tareasCompletas)

        //esta parete de la funcion ayuda a filtrar las tareas que coincidieron entre los dos arrays y solo si no aparecen en el array filtrado se dejan en el array original  



        tareas=tareas.filter(tarea=> !paraEliminar.includes (tarea.id))

        console.log(tareas)

        
}






/*function generateLista(tareas){
    listaTareas.innerHTML= "";
    tareas.forEach(task => listaTareas.innerHTML += createItem(task));

}*/











