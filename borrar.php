<?php

    $id = htmlspecialchars($_GET['id']);

    try {
        require_once('funciones/bd_conexion.php');
        $sql = "DELETE FROM `contactos` WHERE `id` IN ({$id});";

        $resultado = $conn->query($sql);

        if(peticion_ajax()){
            echo json_encode(array(
                    'respuesta' => $resultado,
                    'borrados' => $conn->affected_rows)//retorna cantidad de registros afectados por la operacion
                    );
        }else{
            exit;
        }
    } catch (Exception $e) {
        $error = $e->getMessage();
    } 
    $conn->close();
?>


