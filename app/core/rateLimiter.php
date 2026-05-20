<?php

class RateLimiter{
    private $db;
    private $limit;
    private $window;
    private $action;
    
    function __construct(PDO $pdo) {
        $this->db = $pdo;
    }

    public function limit(int $limit = 60, int $window = 60, string $action = 'general'){
        try {
            $this->limit = $limit;
            $this->window = $window; 
            $this->action = $action;

            $ip = $_SERVER['HTTP_CF_CONNECTING_IP'] ?? $_SERVER['REMOTE_ADDR'];
            $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
            $hashedIP = hash('sha256', $ip . $userAgent . $action . $_ENV['RATE_LIMIT_SALT']);             
            $now = time();

            // clear old entries
            $stmt = $this->db->prepare('DELETE FROM rate_limit WHERE time_expiry < :now');
            $stmt->execute([':now' => $now]);

            // check current status
            $stmt = $this->db->prepare('SELECT hits, time_expiry FROM rate_limit WHERE hashed_ip = :hashed_ip');
            $stmt->execute([':hashed_ip' => $hashedIP]);
            $row = $stmt->fetch();

            if($row){
                if($row['hits'] >= $this->limit){
                    http_response_code(429);
                    header('Content-Type: application/json');
                    echo json_encode(['error' => 'Too many request']);
                    exit;
                }
                $stmt = $this->db->prepare('UPDATE rate_limit SET hits = hits + 1 WHERE hashed_ip = :hashed_ip');
                $stmt->execute([':hashed_ip' => $hashedIP]);
            } else {
                $stmt = $this->db->prepare('INSERT INTO rate_limit (hashed_ip, time_expiry, hits) VALUES(:hashed_ip, :time_expiry, 1)');
                $stmt->execute([':hashed_ip' => $hashedIP, ':time_expiry' => $now + $this->window]);
            };

            
        }catch (PDOException $e){
            throw new Exception('Error with rate limiter', 0, $e);
        }
    }
}
