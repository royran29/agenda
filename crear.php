<?php

    //Limpiar valores y q no contengan hmtl
    $nombre = htmlspecialchars($_POST['nombre']);
    $numero = htmlspecialchars($_POST['numero']);
   
   try {
        require_once('funciones/bd_conexion.php');
        $sql = "INSERT INTO `contactos` (`id`, `nombre`, `numero`) ";   
        $sql .= "VALUES (NULL, '{$nombre}', '{$numero}');";
      
        $resultado = $conn->query($sql);
        if (peticion_ajax()) {
            echo json_encode(array('respuesta' => $resultado,
                                    'nombre' => $nombre,
                                    'numero' => $numero,
                                    'id' => $conn->insert_id)//retorna el id insertado
                                    );
        } else {
            exit;
        }
   } catch (Exception $e) {
       $error = $e->getMessage();
   } 
    $conn->close();
?>

