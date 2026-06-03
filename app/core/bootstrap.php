<?php
require_once __DIR__ . '/errorHandler.php';
require_once __DIR__ . '/envLoader.php';
require_once __DIR__ . '/database.php';
require_once __DIR__ . '/rateLimiter.php';
require_once __DIR__ . '/../model/note.php';

// determine environment
EnvLoader::load(__DIR__ . '/../../.env');

if (($_ENV['APP_ENV'] ?? 'production') === 'development') {
    ini_set('display_errors', '1');
    ini_set('display_startup_errors', '1');
    error_reporting(E_ALL);
} else {
    ini_set('display_errors', '0');
    ini_set('display_startup_errors', '0');
    error_reporting(0);
}

set_error_handler(['errorHandler', 'handleError']);
set_exception_handler(['errorHandler', 'handleException']);
date_default_timezone_set('UTC');

$database = new Database();
$pdo = $database->getConnection();
$rateLimiter = new RateLimiter($pdo);
$rateLimiter->limit();
$noteModel = new Note($pdo);
