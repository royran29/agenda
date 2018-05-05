<?php 
    $conn = new mysqli('localhost', 'root','','agenda');
    
    if($conn->connect_error) {
      echo $error = $conn->connect_error;
    }

     //comprueba si la peticion entrante es ajax
    function peticion_ajax(){
        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';
    }
?>