<?php $isBoardPage = (isset($_GET['page']) && $_GET['page'] === 'board') ? true : false; ?>
<!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AnoBoard - Home</title>
        <link rel="stylesheet" href="./css/top-nav.css">
        <link rel="stylesheet" href="./css/footer.css">
        <link rel="stylesheet" href="./css/home.css">
        <link rel="stylesheet" href="./css/note.css">

        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <?php
            echo $isBoardPage ?
            "<script src='./../app/controller/noteController.js' defer></script>"
            : ''; 
        ?>
        <script>
            window.INITIAL_STATE = <?php echo ($isBoardPage) ? json_encode($notes) : '{}' ?>
        </script>
    <body>
        <?php require_once './../app/view/components/top-nav.php';?>
