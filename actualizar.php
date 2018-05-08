<?php
    require_once('funciones/bd_conexion.php');

    $datos = $_GET['datos'];

    //convierte un string json en un array
    //el segundo parametro es para establecer si el array es asociativo, por defecto es false 
    $datos = json_decode($datos, true);

    $nombre = $datos['nombre'];
    $numero = $datos['numero'];
    $id = $datos['id'];

    if(peticion_ajax()){
        try {
            $sql = "UPDATE `contactos` SET ";   
            $sql .= "`nombre`= '{$nombre}', "; 
            $sql .= "`numero` = '{$numero}' ";
            $sql .= "WHERE `id` = {$id}";
            
            $resultado = $conn->query($sql);

            echo json_encode(array(
                'respuesta' => $resultado,
                'nombre' => $nombre,
                'id' => $id,
                'numero' => $numero
            ));

        } catch (Exception $e) {
            $error = $e->getMessage();
        } 
                    
        $conn->close();
    }
    else{
       exit;
    }
?>
