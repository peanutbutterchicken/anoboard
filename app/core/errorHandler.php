<?php

class ErrorHandler {
    public static function handleException(Throwable $exception): void {
        // Log the full error securely on the server
        error_log("Uncaught Exception: " . $exception->getMessage() . " in " . $exception->getFile() . " on line " . $exception->getLine());
        
        // Return a generic 500 Internal Server Error response to the client
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode([
            'error' => 'An internal server error occurred. Please try again later.'
        ]);
        exit;
    }

    public static function handleError(int $errno, string $errstr, string $errfile, int $errline): bool {
        // Convert standard PHP errors/warnings into Exceptions so our exception handler catches them
        throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
    }
}