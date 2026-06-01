<?php
require_once __DIR__ . '/errorHandler.php';
require_once __DIR__ . '/envLoader.php';
require_once __DIR__ . '/database.php';
require_once __DIR__ . '/rateLimiter.php';
require_once __DIR__ . '/../model/note.php';

set_error_handler(['errorHandler', 'handleError']);
set_exception_handler(['errorHandler', 'handleException']);
date_default_timezone_set('UTC');

// load environment variables before initializing the rest of the app
EnvLoader::load(__DIR__ . '/../../.env');

$database = new Database();
$pdo = $database->getConnection();
$rateLimiter = new RateLimiter($pdo);
$rateLimiter->limit();
$noteModel = new Note($pdo);
