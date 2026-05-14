<?php

class Database {
   private  $connection;

    public function __construct(){
        $config = require_once __DIR__ .  '/../../config/database_config.php';
        $dsn = "mysql:host={$config['host']};dbname={$config['dbname']};charset=utf8mb4";

        try {
            $this->connection = new PDO($dsn, $config['username'], $config['password'], [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                // Always return database rows as associative arrays
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                // Disable emulation to ensure true prepared statements (Security!)
                PDO::ATTR_EMULATE_PREPARES => false           
            ]);
        } catch (PDOException $ex) {
           die('Database connection failed'); 
        }
    }

    public function getConnection(){
        return $this->connection;
    }
}
