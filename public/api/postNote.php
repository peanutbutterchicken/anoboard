<?php

require_once __DIR__ . '/../../app/core/bootstrap.php';

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $jsonPayload = file_get_contents('php://input'); // get data from http header
    $data = json_decode($jsonPayload, true); // convert json into an associative array
    $noteModel->createNote($data);
}