
var agregarContacto = document.getElementById('agregar');
var formulario = document.getElementById('formulario_crear_usuario');
var action = formulario.getAttribute('action');
var divCrear = document.getElementById('crear_contacto');
var tablaRegistrados = document.getElementById('registrados');
var checkboxes = document.getElementsByClassName('borrar_contacto');
var btn_borrar = document.getElementById('btn_borrar');
var tableBody = document.getElementsByTagName('tbody');
var divExistentes = document.getElementsByClassName('existentes');

function registroExitoso(nombre){
    //crear div y agregar id
    var divMensaje = document.createElement('div');
    divMensaje.setAttribute('id', 'mensaje');

    //agregar texto
    var texto = document.createTextNode('Creado: ' + nombre);
    divMensaje.appendChild(texto);

    //insertBefore insert en un elemento HTML
    //parametros: elemento a insertar, en donde y en q posicion
    divCrear.insertBefore(divMensaje, divCrear.childNodes[4]);

    //mostar mensaje
    divMensaje.classList.add('mostrar');
    //ocultar mensaje
    setTimeout(function(){
        divMensaje.classList.add('ocultar');
        setTimeout(function(){
            var divPadreMensaje =  divMensaje.parentNode;
            divPadreMensaje.removeChild(divMensaje);
        }, 500);
    }, 3000);
}

//Construir template para insertar datos dinamicamente
function construirTemplate(nombre, numero, registro_id){
    
    //crear nombre contacto
    var tdNombre  = document.createElement('td');
    var textNombre = document.createTextNode(nombre);
    tdNombre.appendChild(textNombre);

    //crear telefono de contacto
    var tdTelefono = document.createElement('td');
    var textTelefono = document.createTextNode(numero);
    tdTelefono.appendChild(textTelefono);

    //crear enlace para editar
    var nodoBtn = document.createElement('a');
    var textEnlace = document.createTextNode('Editar');
    nodoBtn.appendChild(textEnlace);
    nodoBtn.href = 'editar.php?id=' + registro_id;

    //agregar boton editar al td
    var nodoEditar = document.createElement('td');
    nodoEditar.appendChild(nodoBtn);

    //crear checkbox para borrar
    var checkBorrar = document.createElement('input');
    checkBorrar.type = 'checkbox';
    checkBorrar.name = registro_id;
    checkBorrar.classList.add('borrar_contacto');

    //agregar td a checkbox
    var tdCheckbox = document.createElement('td');
    tdCheckbox.classList.add('borrar');
    tdCheckbox.appendChild(checkBorrar);
    
    //agregar tr y los hijos
    var trContacto = document.createElement('tr');
    trContacto.appendChild(tdNombre);
    trContacto.appendChild(tdTelefono);
    trContacto.appendChild(nodoEditar);
    trContacto.appendChild(tdCheckbox);

    //agregar row a la tabla
    tablaRegistrados.childNodes[3].appendChild(trContacto);
}

function crearUsuario(){
    var form_datos = new FormData(formulario);
    //recorre datos del form con FormData
    for([key, value] of form_datos.entries()){
        console.log(key, value);
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', action, true);
    //Esto se necesita xq estamos usando FormData
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    
    //esta funcion se ejecuta cada vez q ready state cambia
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200) {
            var resultado = xhr.responseText;

            //convierte a un objeto una cadena JSON
            var json = JSON.parse(resultado);
           
            if (json.respuesta == true) {
                registroExitoso(json.nombre);
                construirTemplate(json.nombre, json.numero, json.id);
            }
        }
    }; 
    xhr.send(form_datos); 
}

for(var i = 0; i < checkboxes.length; i++){
    checkboxes[i].addEventListener('change', function(){
        if(this.checked){
            this.parentNode.parentNode.classList.add('activo');
        }else{
            this.parentNode.parentNode.classList.remove('activo');
        }
    });
}

agregarContacto.addEventListener('click', function(e){
    e.preventDefault();
    crearUsuario();
});

function mostrarEliminado(){
    //crear div y agregar id
    var divEliminado = document.createElement('div');
    divEliminado.setAttribute('id', 'borrado');

    //agregar texto
    var texto = document.createTextNode('Eliminado de contactos');
    divEliminado.appendChild(texto);

    //insert elemento
     divExistentes[0].insertBefore(divEliminado, divExistentes[0].childNodes[0]);

    //agregar clase de css
    divEliminado.classList.add('mostrar');
    //ocultar mensaje
    setTimeout(function(){
        divEliminado.classList.add('ocultar');
        setTimeout(function(){
            var divPadreMensaje =  divEliminado.parentNode;
            divPadreMensaje.removeChild(divEliminado);
        }, 500);
    }, 3000);
}

function eliminarHtml(ids_borrados){
    for(i = 0; i < ids_borrados.length; i++){
        var elementoBorrar = document.getElementById(ids_borrados[i]);

        //para acceder directamente al elemento
        //solo tableBody accede al arreglo de elementos por tag name
        tableBody[0].removeChild(elementoBorrar);
    }
}

function contactosEliminar(contactos){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'borrar.php?id=' + contactos, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    
    //esta funcion se ejecuta cada vez q ready state cambia
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200) {
            var resultadoBorrar = xhr.responseText;
            var json = JSON.parse(resultadoBorrar);
            if(!json.respuesta){
                alert("Selecciona un elemento");
            }
            else{
                eliminarHtml(contactos);
                mostrarEliminado();
            }
        }
    }; 
    xhr.send();
}

function checkboxSeleccionado(){
    var contactos = [];
    for(var i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked){
            contactos.push(checkboxes[i].name);
        }
    }
    
    contactosEliminar(contactos);
}

btn_borrar.addEventListener('click', function(){
    checkboxSeleccionado();
})