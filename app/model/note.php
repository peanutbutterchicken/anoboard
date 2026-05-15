<?php

class Note{
    private $db;

    function __construct(PDO $pdo){
       $this->db = $pdo;
    }

    public function getAllNotes(){
        $stmt = $this->db->prepare('SELECT id, text, created_at FROM note');
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function createNote($note){
        try {
            $this->db->beginTransaction();
                $stmt = $this->db->prepare('INSERT INTO note (text, anonymousName) VALUES (:text, :anonymousName);');
                $stmt->bindParam('text', $note['text']);
                $stmt->bindParam('anonymousName', $note['anonymousName']);
                $stmt->execute();
            $this->db->commit();
        } catch (PDOException $e){
            $this->db->rollBack();
        }
    }

    public function deleteNote($noteId){
        try {
            $this->db->beginTransaction();
                $stmt = $this->db->prepare('DELETE 1 WHERE id = :noteId FROM note');
                $stmt->bindParam('noteId', $noteId);
                $stmt->execute();
            $this->db->commit();    
        } catch(PDOException $e){
            $this->db->rollBack();
            echo "Delete Note Failed";
        }
    }
} 
