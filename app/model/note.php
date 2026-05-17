<?php

class Note{
    private $db;

    function __construct(PDO $pdo){
       $this->db = $pdo;
    }

    public function getAllNotes(){
        $stmt = $this->db->prepare('SELECT text, created_at, anonymous_uname, note_color FROM note');
        $stmt->execute();
        return $stmt->fetchAll();
    }

    public function createNote($note){
        try {
            $this->db->beginTransaction();
                $stmt = $this->db->prepare('INSERT INTO note (text, created_at, anonymous_uname, note_color) VALUES (:text, :created_at, :anonymous_uname, :note_color);');
                $stmt->bindParam('text', $note['text']);
                $stmt->bindParam('created_at', $note['created_at']);
                $stmt->bindParam('anonymous_uname', $note['anonymous_uname']);
                $stmt->bindParam('note_color', $note['note_color']);
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
