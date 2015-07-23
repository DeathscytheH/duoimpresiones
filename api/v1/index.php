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

// Pulseras de eventos
$app->get('/pulseras_eventos', function() {
    global $db;
    $rows = $db->select("pulseras_eventos","id, piezas, precio",array());
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
// Pulseras de eventos

// Tarjetas de presentacion
$app->get('/tarjetas_presentacion', function() {
    global $db;
    $rows = $db->select("tarjetas_presentacion","id, piezas, frente, frente_vuelta, plastico_frente, plastico_frente_vuelta, suaje",array());
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
// Tarjetas de presentacion.

function echoResponse($status_code, $response) {
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response,JSON_NUMERIC_CHECK);
}

$app->run();
?>
