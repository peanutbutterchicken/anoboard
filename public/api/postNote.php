<?php

require_once __DIR__ . '/../../app/core/bootstrap.php';

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $jsonPayload = file_get_contents('php://input'); // get data from http header
    $data = json_decode($jsonPayload, true); // convert json into an associative array
    if(!is_array($data)){
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON Payload']);
        exit;
    }

    if (isset($data['text']) && isset($data['note_color'])) {
        // Sanitize inputs to prevent Cross-Site Scripting (XSS)
        $cleanText = htmlspecialchars(trim($data['text']), ENT_QUOTES, 'UTF-8');
        $cleanColor = htmlspecialchars(trim($data['note_color']), ENT_QUOTES, 'UTF-8');
        
        // Enforce a maximum length and prevent empty notes
        if (!empty($cleanText) && strlen($cleanText) <= 1000) {
            $data['text'] = $cleanText;
            $data['note_color'] = $cleanColor;
            // Override frontend timestamp with the server's exact current time
            $data['created_at'] = date('Y-m-d H:i:s');
            $noteModel->createNote($data);
        }
    }
} 