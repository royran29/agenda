
var agregarContacto = document.getElementById('agregar');
var formulario = document.getElementById('formulario_crear_usuario');
var action = formulario.getAttribute('action');
var divCrear = document.getElementById('crear_contacto');

function registroExitoso(nombre){
    //crear div y agregar id
    var divMensaje = document.createElement('div');
    divMensaje.setAttribute('id', 'mensaje');

    //agregar texto
    var texto = document.createTextNode('Creado: ' + nombre);
    divMensaje.appendChild(texto);

    //insertBefore insert en un elemento HTML
    //parametros: elemento a insertar, en donde y en q posicion
    divCrear.insertBefore(divMensaje, divCrear.childNodes(4));
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
    xhr.setRequestHeader('X-Requested-Width', 'XMLHttpRequest');
    
    //esta funcion se ejecuta cada vez q ready state cambia
    xhr.onreadystatechange = function(){
        
        if (xhr.readystate == 4 && xhr.status == 200) {
            var resultado = xhr.responseText;
            //convierte a un objeto una cadena JSON
            var json = JSON.parse(resultado);
           
            if (json.respuesta == true) {
                
                registroExitoso(json.nombre);
            }
        }
    }; 
    xhr.send(form_datos); 
}

agregarContacto.addEventListener('click', function(e){
    e.preventDefault();
    crearUsuario();
});