<?php

class Note{
    private $db;

    function __construct(PDO $pdo){
       $this->db = $pdo;
    }

    public function getAllNotes(){
        $stmt = $this->db->prepare('SELECT id, text, created_at, likes FROM note');
        return $stmt->fetchAll();
    }

} 
