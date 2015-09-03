<?php
require '.././libs/Slim/Slim.php';
require_once 'dbHelper.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();

/**
 * Database Helper Function templates
 */
/*
select(table name, where clause as associative array)
insert(table name, data as associative array, mandatory column names as array)
update(table name, column names as associative array, where clause as associative array, required columns as array)
delete(table name, where clause as array)
*/


// Products
$app->get('/usuarios', function() {
    global $db;
    $rows = $db->select("usuarios","id, nombre, apellido_paterno, apellido_materno, user, pass, email, tid",array());
    echoResponse(200, $rows);
});

$app->post('/usuarios', function() use ($app) {
    $data = json_decode($app->request->getBody());
    $mandatory = array('nombre');
    global $db;
    $rows = $db->insert("usuarios", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Usuario agregado con exito.";
    echoResponse(200, $rows);
});

$app->put('/usuarios/:id', function($id) use ($app) {
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("usuarios", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Informacion de usuario actualizada con exito.";
    echoResponse(200, $rows);
});

$app->delete('/usuarios/:id', function($id) {
    global $db;
    $rows = $db->delete("usuarios", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Usuario removido con exito.";
    echoResponse(200, $rows);
});

// Inicio - Pulseras de eventos
$app->get('/pulseras_eventos', function() {
    global $db;
    $rows = $db->select("pulseras_eventos","id, descripcion, piezas, precio, precioMaq",array());
    echoResponse(200, $rows);
});

$app->post('/pulseras_eventos', function() use ($app) {
    $data = json_decode($app->request->getBody());
    $mandatory = array('piezas');
    global $db;
    $rows = $db->insert("pulseras_eventos", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Producto agregado con exito.";
    echoResponse(200, $rows);
});

$app->put('/pulseras_eventos/:id', function($id) use ($app) {
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("pulseras_eventos", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Informacion de producto actualizada con exito.";
    echoResponse(200, $rows);
});

$app->delete('/pulseras_eventos/:id', function($id) {
    global $db;
    $rows = $db->delete("pulseras_eventos", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Producto removido con exito.";
    echoResponse(200, $rows);
});
// Fin - Pulseras de eventos

// Inicio - Tarjetas de presentacion
$app->get('/tarjetas_presentacion', function() {
    global $db;
    $rows = $db->select("tarjetas_presentacion",
                        "id, descripcion, piezas,
                        frente, frente_vuelta, plastico_frente, plastico_frente_vuelta, suaje,
                        frenteMaq, frente_vueltaMaq, plastico_frenteMaq, plastico_frente_vueltaMaq, suajeMaq",
                        array());
    echoResponse(200, $rows);
});

$app->post('/tarjetas_presentacion', function() use ($app) {
    $data = json_decode($app->request->getBody());
    $mandatory = array('piezas');
    global $db;
    $rows = $db->insert("tarjetas_presentacion", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Producto agregado con exito.";
    echoResponse(200, $rows);
});

$app->put('/tarjetas_presentacion/:id', function($id) use ($app) {
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("tarjetas_presentacion", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Informacion de producto actualizada con exito.";
    echoResponse(200, $rows);
});

$app->delete('/tarjetas_presentacion/:id', function($id) {
    global $db;
    $rows = $db->delete("tarjetas_presentacion", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Producto removido con exito.";
    echoResponse(200, $rows);
});
// Fin - Tarjetas de presentacion.

// Inicio - Tabloide
$app->get('/tabloide_color', function() {
    global $db;
    $rows = $db->select("tabloide_color","id, descripcion, tipo, piezas, precio, precioMaq",array());
    echoResponse(200, $rows);
});

$app->post('/tabloide_color', function() use ($app) {
    $data = json_decode($app->request->getBody());
    $mandatory = array('tipo');
    global $db;
    $rows = $db->insert("tabloide_color", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Producto agregado con exito.";
    echoResponse(200, $rows);
});

$app->put('/tabloide_color/:id', function($id) use ($app) {
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("tabloide_color", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Informacion de producto actualizada con exito.";
    echoResponse(200, $rows);
});

$app->delete('/tabloide_color/:id', function($id) {
    global $db;
    $rows = $db->delete("tabloide_color", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Producto removido con exito.";
    echoResponse(200, $rows);
});
// Fin - Tabloide

// Inicio - Fotoboton
$app->get('/fotobotones', function() {
    global $db;
    $rows = $db->select("fotobotones","id, descripcion, tamano, piezas, precio, precioMaq",array());
    echoResponse(200, $rows);
});

$app->post('/fotobotones', function() use ($app) {
    $data = json_decode($app->request->getBody());
    $mandatory = array('tamano');
    global $db;
    $rows = $db->insert("fotobotones", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Producto agregado con exito.";
    echoResponse(200, $rows);
});

$app->put('/fotobotones/:id', function($id) use ($app) {
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("fotobotones", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Informacion de producto actualizada con exito.";
    echoResponse(200, $rows);
});

$app->delete('/fotobotones/:id', function($id) {
    global $db;
    $rows = $db->delete("fotobotones", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Producto removido con exito.";
    echoResponse(200, $rows);
});
// Fin - Fotoboton

// Inicio - Vinil corte
$app->get('/vinil_corte', function() {
    global $db;
    $rows = $db->select("vinil_corte","id, descripcion, tamano, precio, precioMaq",array());
    echoResponse(200, $rows);
});

$app->post('/vinil_corte', function() use ($app) {
    $data = json_decode($app->request->getBody());
    $mandatory = array('tamano');
    global $db;
    $rows = $db->insert("vinil_corte", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Producto agregado con exito.";
    echoResponse(200, $rows);
});

$app->put('/vinil_corte/:id', function($id) use ($app) {
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("vinil_corte", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Informacion de producto actualizada con exito.";
    echoResponse(200, $rows);
});

$app->delete('/vinil_corte/:id', function($id) {
    global $db;
    $rows = $db->delete("vinil_corte", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Producto removido con exito.";
    echoResponse(200, $rows);
});
// Fin - Vinil corte

// Inicio - Volante blanco y negro
$app->get('/volantebn', function() {
    global $db;
    $rows = $db->select("volante_blanco_negro","id, descripcion, tipo, precio, precioMaq",array());
    echoResponse(200, $rows);
});

$app->post('/volantebn', function() use ($app) {
    $data = json_decode($app->request->getBody());
    $mandatory = array('tipo');
    global $db;
    $rows = $db->insert("volante_blanco_negro", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Producto agregado con exito.";
    echoResponse(200, $rows);
});

$app->put('/volantebn/:id', function($id) use ($app) {
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("volante_blanco_negro", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Informacion de producto actualizada con exito.";
    echoResponse(200, $rows);
});

$app->delete('/volantebn/:id', function($id) {
    global $db;
    $rows = $db->delete("volante_blanco_negro", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Producto removido con exito.";
    echoResponse(200, $rows);
});
// Fin - Volante blanco y negro

// Inicio - Volante color
$app->get('/volantecolor', function() {
    global $db;
    $rows = $db->select("volante_color","id, descripcion, tipo, precio, precioMaq",array());
    echoResponse(200, $rows);
});

$app->post('/volantecolor', function() use ($app) {
    $data = json_decode($app->request->getBody());
    $mandatory = array('tipo');
    global $db;
    $rows = $db->insert("volante_color", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Producto agregado con exito.";
    echoResponse(200, $rows);
});

$app->put('/volantecolor/:id', function($id) use ($app) {
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("volante_color", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Informacion de producto actualizada con exito.";
    echoResponse(200, $rows);
});

$app->delete('/volantecolor/:id', function($id) {
    global $db;
    $rows = $db->delete("volante_color", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Producto removido con exito.";
    echoResponse(200, $rows);
});
// Fin - Volante color

// Inicio - Lona/vinil
$app->get('/gformato', function() {
    global $db;
    $rows = $db->select("gran_formato","id, descripcion, precio, valorExedente, precioMayoreo, precioMaq, precioMayoreoMaq",array());
    echoResponse(200, $rows);
});
    //Funcion get con id
$app->get('/gformato/:id', function($id) use ($app){
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->select("gran_formato", "id, descripcion, precio, valorExedente, precioMayoreo, precioMaq, precioMayoreoMaq",$condition, $mandatory);
    echoResponse(200, $rows);
});

$app->post('/gformato', function() use ($app) {
    $data = json_decode($app->request->getBody());
    $mandatory = array('descripcion');
    global $db;
    $rows = $db->insert("gran_formato", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Producto agregado con exito.";
    echoResponse(200, $rows);
});

$app->put('/gformato/:id', function($id) use ($app) {
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("gran_formato", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Informacion de producto actualizada con exito.";
    echoResponse(200, $rows);
});

$app->delete('/gformato/:id', function($id) {
    global $db;
    $rows = $db->delete("gran_formato", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Producto removido con exito.";
    echoResponse(200, $rows);
});
// Fin - Lona/vinil

// Inicio - Ventas admin
$app->get('/registroventas', function() {
    global $db;
    $rows = $db->select("registroventas","id, nombreCliente, detalleCliente, detallePedido, fechaRegistro, precioTotal, archivo, fechaEntrega",array());
    echoResponse(200, $rows);
});

$app->post('/registroventas', function() use ($app) {
    $data = json_decode($app->request->getBody());
    $mandatory = array('detallePedido');
    global $db;
    $rows = $db->insert("registroventas", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Producto agregado con exito.";
    echoResponse(200, $rows);
});

$app->put('/registroventas/:id', function($id) use ($app) {
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("registroventas", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Informacion de venta actualizada con exito.";
    echoResponse(200, $rows);
});

$app->delete('/registroventas/:id', function($id) {
    global $db;
    $rows = $db->delete("registroventas", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Venta removida con exito.";
    echoResponse(200, $rows);
});
// Fin - Ventas admin

// Inicio - Tiempos gran formato
$app->get('/tiemposGranFormato', function() {
    global $db;
    $rows = $db->select("tiemposGranFormato","id, nombreVariable, tiempo",array());
    echoResponse(200, $rows);
});

$app->post('/tiemposGranFormato', function() use ($app) {
    $data = json_decode($app->request->getBody());
    $mandatory = array('nombreVariable');
    global $db;
    $rows = $db->insert("tiemposGranFormato", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Variable agregada con exito.";
    echoResponse(200, $rows);
});

$app->put('/tiemposGranFormato/:id', function($id) use ($app) {
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("tiemposGranFormato", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Informacion de variable actualizada con exito.";
    echoResponse(200, $rows);
});

$app->delete('/tiemposGranFormato/:id', function($id) {
    global $db;
    $rows = $db->delete("tiemposGranFormato", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Variable removida con exito.";
    echoResponse(200, $rows);
});
// Fin - Tiempos gran formato

// Inicio - Tiempos gran formato
$app->get('/tiemposAcabados', function() {
    global $db;
    $rows = $db->select("tiemposAcabados","id, nombreVariable, tiempo",array());
    echoResponse(200, $rows);
});

$app->post('/tiemposAcabados', function() use ($app) {
    $data = json_decode($app->request->getBody());
    $mandatory = array('nombreVariable');
    global $db;
    $rows = $db->insert("tiemposAcabados", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Variable agregada con exito.";
    echoResponse(200, $rows);
});

$app->put('/tiemposAcabados/:id', function($id) use ($app) {
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("tiemposAcabados", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Informacion de variable actualizada con exito.";
    echoResponse(200, $rows);
});

$app->delete('/tiemposAcabados/:id', function($id) {
    global $db;
    $rows = $db->delete("tiemposAcabados", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Variable removida con exito.";
    echoResponse(200, $rows);
});
// Fin - Tiempos gran formato

// Inicio - Procesos prioridades
$app->get('/procesosPrioridades', function() {
    global $db;
    $rows = $db->select("procesosPrioridades","id, nombre_proceso, prioridad_proceso",array());
    echoResponse(200, $rows);
});

$app->post('/procesosPrioridades', function() use ($app) {
    $data = json_decode($app->request->getBody());
    $mandatory = array('nombre_proceso');
    global $db;
    $rows = $db->insert("procesosPrioridades", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Proceso agregado con exito.";
    echoResponse(200, $rows);
});

$app->put('/procesosPrioridades/:id', function($id) use ($app) {
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("procesosPrioridades", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Informacion de proceso actualizada con exito.";
    echoResponse(200, $rows);
});

$app->delete('/procesosPrioridades/:id', function($id) {
    global $db;
    $rows = $db->delete("procesosPrioridades", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Variable removida con exito.";
    echoResponse(200, $rows);
});
// Fin - Procesos prioridades

// Inicio - Procesos productos
$app->get('/procesosProductos', function() {
    global $db;
    $rows = $db->select("procesosProductos","id, nombre_producto, ventas, diseno, produccion, gran_formato, acabado, offset_corte, foliado, entrega, domicilio_instalacion",array());
    echoResponse(200, $rows);
});

$app->post('/procesosProductos', function() use ($app) {
    $data = json_decode($app->request->getBody());
    $mandatory = array('nombre_producto');
    global $db;
    $rows = $db->insert("procesosProductos", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Prodcuto agregado con exito.";
    echoResponse(200, $rows);
});

$app->put('/procesosProductos/:id', function($id) use ($app) {
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("procesosProductos", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Informacion de producto actualizada con exito.";
    echoResponse(200, $rows);
});

$app->delete('/procesosProductos/:id', function($id) {
    global $db;
    $rows = $db->delete("procesosProductos", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Producto removido con exito.";
    echoResponse(200, $rows);
});
// Fin - Procesos productos

//Inicio - Ventas mostrador Lonas
    //Funcion get con id
$app->get('/gformato/:id', function($id) use ($app){
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->select("gran_formato", "id, descripcion, precio, valorExedente, precioMayoreo, precioMaq, precioMayoreoMaq",$condition, $mandatory);
    echoResponse(200, $rows);
});
//Fin - Ventas mostrador Lonas

// Inicio - Clientes de ventanilla
$app->get('/clientes', function() {
    global $db;
    $rows = $db->select("clientes","id, nombre_completo, email, telefono, clienteMaquila, fechaRegistro",array());
    echoResponse(200, $rows);
});

    //Funcion get con id
$app->get('/clientes/:id', function($id) use ($app){
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->select("clientes", "id, nombre_completo, email, telefono, clienteMaquila",$condition, $mandatory);
    echoResponse(200, $rows);
});

$app->post('/clientes', function() use ($app) {
    $data = json_decode($app->request->getBody());
    $mandatory = array('nombre_completo');
    global $db;
    $rows = $db->insert("clientes", $data, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Cliente agregado con exito.";
    echoResponse(200, $rows);
});

$app->put('/clientes/:id', function($id) use ($app) {
    $data = json_decode($app->request->getBody());
    $condition = array('id'=>$id);
    $mandatory = array();
    global $db;
    $rows = $db->update("clientes", $data, $condition, $mandatory);
    if($rows["status"]=="success")
        $rows["message"] = "Informacion de cliente actualizada con exito.";
    echoResponse(200, $rows);
});

$app->delete('/clientes/:id', function($id) {
    global $db;
    $rows = $db->delete("clientes", array('id'=>$id));
    if($rows["status"]=="success")
        $rows["message"] = "Cliente removido con exito.";
    echoResponse(200, $rows);
});
// Fin - Clientes de ventanilla


function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}

$app->run();
?>
