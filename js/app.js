
var agregarContacto = document.getElementById('agregar');
var formulario = document.getElementById('formulario_crear_usuario');
var action = formulario.getAttribute('action');
var divCrear = document.getElementById('crear_contacto');
var tablaRegistrados = document.getElementById('registrados');
var checkboxes = document.getElementsByClassName('borrar_contacto');
var btn_borrar = document.getElementById('btn_borrar');
var tableBody = document.getElementsByTagName('tbody');
var divExistentes = document.getElementsByClassName('existentes');
var inputBuscador = document.getElementById('buscador');
var totalResgistros = document.getElementById('total');
var checkTodos = document.getElementById('borrar_todos');

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
    var parrafoNombre = document.createElement('p');
    parrafoNombre.appendChild(textNombre);
    tdNombre.appendChild(parrafoNombre);

    //crear telefono de contacto
    var tdTelefono = document.createElement('td');
    var textTelefono = document.createTextNode(numero);
    var parrafoTelefono = document.createElement('p');
    parrafoTelefono.appendChild(textTelefono);
    tdTelefono.appendChild(parrafoTelefono);

    //crear enlace para editar
    var nodoBtn = document.createElement('a');
    var textEnlace = document.createTextNode('Editar');
    nodoBtn.appendChild(textEnlace);
    nodoBtn.href = '#';
    nodoBtn.classList.add('editarBtn');

    //Crear boton para guardar
    var btnGuardar = document.createElement('a');
    var textGuardar = document.createTextNode('Guardar');
    btnGuardar.appendChild(textGuardar);
    btnGuardar.href = '#';
    btnGuardar.classList.add('guardarBtn');

    //agregar boton editar y guardar al td
    var nodoEditar = document.createElement('td');
    nodoEditar.appendChild(nodoBtn);
    nodoEditar.appendChild(btnGuardar);

    //crear checkbox para borrar
    var checkBorrar = document.createElement('input');
    checkBorrar.type = 'checkbox';
    checkBorrar.name = registro_id;
    checkBorrar.classList.add('borrar_contacto');

    //agregar td a checkbox
    var tdCheckbox = document.createElement('td');
    tdCheckbox.classList.add('borrar');
    tdCheckbox.appendChild(checkBorrar);

    //Crear input con nombre y agregarlo al td
    var inputNombre = document.createElement('input');
    inputNombre.type = 'text';
    inputNombre.name = 'contacto_' + registro_id;
    inputNombre.value = nombre;
    inputNombre.classList.add('nombre_contacto');
    tdNombre.appendChild(inputNombre);

    //Crear input con numero y agregarlo al td
    var inputNumero = document.createElement('input');
    inputNumero.type = 'text';
    inputNumero.name = 'numero_' + registro_id;
    inputNumero.value = numero;
    inputNumero.classList.add('numero_contacto');
    tdTelefono.appendChild(inputNumero);


    //agregar tr y los hijos
    var trContacto = document.createElement('tr');
    trContacto.setAttribute('id', registro_id);
    trContacto.appendChild(tdNombre);
    trContacto.appendChild(tdTelefono);
    trContacto.appendChild(nodoEditar);
    trContacto.appendChild(tdCheckbox);

    //agregar row a la tabla
    tablaRegistrados.childNodes[3].appendChild(trContacto);


    actualizarNumero();
    recorrerBotonesEditar();
    recorrerBotonesGuardar(registro_id);
    
}

function crearUsuario(){
    var form_datos = new FormData(formulario);
    //recorre datos del form con FormData
    /*for([key, value] of form_datos.entries()){
        console.log(key, value);
    }*/
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
                var totalActualizado = parseInt(totalResgistros.textContent) + 1;
                totalResgistros.innerHTML = totalActualizado;
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
                var totalActualizado = parseInt(totalResgistros.textContent) - json.borrados;
                totalResgistros.innerHTML = totalActualizado;
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
});

function actualizarNumero(){
    var registros = tableBody[0].getElementsByTagName('tr');

    var cantidad = 0;
    var ocultos = 0;

    for(i = 0; i < registros.length; i++){
        var elemento = registros[i];
        if(elemento.style.display == 'table-row'){
            cantidad++;
            totalResgistros.innerHTML = cantidad;
        }else{
            if(elemento.style.display == 'none'){
                ocultos++;
                if(ocultos == registros.length){
                    ocultos -= registros.length;
                    totalResgistros.innerHTML = ocultos;
                }
            }
        }
    }
}

function ocultarRegistros(nombre_buscar){
    var registros = tableBody[0].getElementsByTagName('tr');

    //expresion regular para busqueda
    //la i es para q sea insensitivo
    var expresion = new RegExp(nombre_buscar, 'i');

    for(var i = 0; i < registros.length; i++){
        registros[i].classList.add('ocultar');
        registros[i].style.display = 'none';

        //Busca en el primer texto de los tr(el nombre en este caso) alguno que
        //calze con el criterio de busqueda..
        //con replace(/\s/g, '') quita los espacios en blanco para hacer la busqueda
        if(registros[i].childNodes[1].textContent.replace(/\s/g, '').search(expresion) != -1 || nombre_buscar == ''){
            registros[i].classList.add('mostrar');
            registros[i].classList.remove('ocultar');

            //mostramos el registro q si cumple con la busqueda
            //usamos table-row xq es una tabla, dependiendo de que se esté 
            //se deberia usar block, inline, etc, segun sea el caso
            registros[i].style.display = 'table-row';

        }
    }

    actualizarNumero();
}

inputBuscador.addEventListener('input', function(){
    ocultarRegistros(this.value);
});

//seleccionar todos
checkTodos.addEventListener('click', function(){
    var todosRegistros = tableBody[0].getElementsByTagName('tr');
    if(this.checked){
        for(var i = 0; i < checkboxes.length; i++){
            checkboxes[i].checked = true;
            todosRegistros[i].classList.add('activo');
        }
    }else{
        for(var i = 0; i < checkboxes.length; i++){
            checkboxes[i].checked = false;
            todosRegistros[i].classList.remove('activo');
        }
    }
});

//recorrer botones de guardar
function recorrerBotonesGuardar(id){
    var btn_guardar = tableBody[0].querySelectorAll('.guardarBtn');

    for(var i = 0; i < btn_guardar.length; i++){
        btn_guardar[i].addEventListener('click', function(event){
            actualizarRegistro(id);
        });
    }
}

/* Editar Registros */
function recorrerBotonesEditar(){
    var btn_editar = tableBody[0].querySelectorAll('.editarBtn');

    for(var i = 0; i < btn_editar.length; i++){
        btn_editar[i].addEventListener('click', function(event){
            event.preventDefault();
            deshabilitarEdicion();
            var registroActivo = this.parentNode.parentNode;
            registroActivo.classList.add('modo-edicion');
            registroActivo.classList.remove('desactivado');

             //Actualizamos el registro especifico
             actualizarRegistro(registroActivo.id);
        });
    }
}

function deshabilitarEdicion(){
    var registrosTr = document.querySelectorAll('#registrados tbody tr');
    for(var i = 0; i < registrosTr.length; i++){
        registrosTr[i].classList.add('desactivado');
    }
}

function habilitarEdicion(){
    var registrosTr = document.querySelectorAll('#registrados tbody tr');
    for(var i = 0; i < registrosTr.length; i++){
        registrosTr[i].classList.remove('desactivado');
    }
}

function actualizarRegistro(idRegistro){
    //seleccionar boton de guardar, se saca el id
    var btnGuardar = document.getElementById(idRegistro).getElementsByClassName('guardarBtn');
    btnGuardar[0].addEventListener('click', function(e){
        e.preventDefault();

        //obtiene el valor del nombre
        var inputNombreNuevo = document.getElementById(idRegistro).getElementsByClassName('nombre_contacto');
        var nombreNuevo = inputNombreNuevo[0].value;

        //obtiene el valor del telefono
        var inputNumeroNuevo = document.getElementById(idRegistro).getElementsByClassName('numero_contacto');
        var numeroNuevo = inputNumeroNuevo[0].value;

        //creacion de un objeto para actualizar
        var contacto = {
            nombre: nombreNuevo,
            numero: numeroNuevo,
            id: idRegistro
        };
        actualizarAjax(contacto);
    });
}

//hace la actualizacion recibe un objeto como parametro
function actualizarAjax(datosContactos ){

    //convierte un objeto de JS a JSON
    var jsonContacto = JSON.stringify(datosContactos)

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'actualizar.php?datos=' + jsonContacto, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    
    //esta funcion se ejecuta cada vez q ready state cambia
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200) {
            var resultado = xhr.responseText;
            var resultadoJson = JSON.parse(resultado);
            if(resultadoJson.respuesta){
                //tomamos el td activo y actualizamos campos internos
                var registroActivo = document.getElementById(datosContactos.id);
                registroActivo.getElementsByTagName('td')[0].getElementsByTagName('p')[0].innerHTML = resultadoJson.nombre;
                registroActivo.getElementsByTagName('td')[1].getElementsByTagName('p')[0].innerHTML = resultadoJson.numero;
               
                //quitar modo edicion
                registroActivo.classList.remove('modo-edicion');
                habilitarEdicion();
            }
            else{

            }
        }
    }; 
    xhr.send();
}

//Ejecuta la funcion cuando el contenido está cargado
document.addEventListener('DOMContentLoaded', function(event){
    recorrerBotonesEditar();
});