<?php
require_once __DIR__ . '/errorHandler.php';
require_once __DIR__ . '/EnvLoader.php';
require_once __DIR__ . '/database.php';
require_once __DIR__ . '/../model/note.php';

set_error_handler(['errorHandler', 'handleError']);
set_exception_handler(['errorHandler', 'handleException']);

// Load environment variables before initializing the rest of the app
EnvLoader::load(__DIR__ . '/../../.env');

$database = new Database();
$pdo = $database->getConnection();
$noteModel = new Note($pdo);