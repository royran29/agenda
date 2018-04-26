
var agregarContacto = document.getElementById('agregar');
var formulario = document.getElementById('formulario_crear_usuario');
var action = formulario.getAttribute('action');

function crearUsuario(){
    var form_datos = new FormData(formulario);
    //recorre datos del form con FormData
    for([key, value] of form_datos.entries()){
        console.log(key, value);
    }
    xhr.open('POST', action, true);
    //Esto se necesita xq estamos usando FormData
    xhr.setRequestHeader('X-Requested-Width', 'XMLHttpRequest');
}

agregarContacto.addEventListener('click', function(e){
    e.preventDefault();
    crearUsuario();
});