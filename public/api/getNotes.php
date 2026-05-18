<?php

require_once __DIR__ . '/../../app/core/bootstrap.php';

if($_SERVER['REQUEST_METHOD'] === 'GET'){
    $notes = $noteModel->getAllNotes();
    header('Content-Type: application/json');
    echo json_encode($notes);
}