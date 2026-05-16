<?php
    $currentPage = (isset($_GET['page'])) ? $_GET['page'] :  'home';
?>
<!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AnoBoard - Home</title>
        <link rel="stylesheet" href="./css/general.css">
        <link rel="stylesheet" href="./css/top-nav.css">
        <link rel="stylesheet" href="./css/footer.css">
        <link rel="stylesheet" href="./css/home.css">
        <link rel="stylesheet" href="./css/note.css">

        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <?php
        if($currentPage === 'board'){
                echo "<script type='module' src='./js/pages/board.js'></script>";
            } else {
                echo "";
            }
        ?>
        <script>
            window.INITIAL_STATE = <?php echo ($currentPage === 'board') ? json_encode($notes) : '{}' ?>
        </script>
    <body>
        <?php require_once './../app/view/components/top-nav.php';?>