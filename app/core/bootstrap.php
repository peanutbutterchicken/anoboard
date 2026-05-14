<?php
require_once __DIR__ . '/database.php';
require_once __DIR__ . '/../model/note.php';

$database = new Database();
$pdo = $database->getConnection();
$noteModel = new Note($pdo);