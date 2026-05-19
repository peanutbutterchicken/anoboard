<?php

require_once __DIR__ . '/../../app/core/bootstrap.php';

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $jsonPayload = file_get_contents('php://input'); // get data from http header
    $data = json_decode($jsonPayload, true); // convert json into an associative array
    if(!is_array($data)){
        http_response_code(400);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Invalid JSON Payload']);
        exit;
    }

    // 1. Verify Cloudflare Turnstile CAPTCHA
    if (empty($data['cf_turnstile_response'])) {
        http_response_code(403);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'CAPTCHA verification missing. Please try again.']);
        exit;
    }

    $turnstileSecret = $_ENV['TURNSTILE_SECRET_KEY'] ?? '';
    if (empty($turnstileSecret)) {
        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'Server configuration error. CAPTCHA secret is missing.']);
        exit;
    }

    // Use cURL for external requests, as allow_url_fopen might be disabled in production
    $ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, [
        'secret' => $turnstileSecret,
        'response' => $data['cf_turnstile_response']
    ]);

    $verifyResponse = curl_exec($ch);
    curl_close($ch);

    $captchaResult = json_decode($verifyResponse);
    // Check for cURL errors or failed validation
    if ($verifyResponse === false || !$captchaResult || empty($captchaResult->success)) {
        http_response_code(403);
        header('Content-Type: application/json');
        echo json_encode(['error' => 'CAPTCHA verification failed. Are you a bot?']);
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