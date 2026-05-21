<?php
require_once __DIR__ . '/../app/core/bootstrap.php';

$page = isset($_GET['page']) ? $_GET['page'] : 'home';

if($page === 'home'){
    require_once __DIR__ . '/../app/view/pages/home.php';

} else if($page === 'board'){
    $notes = $noteModel->getAllNotes();
    require_once __DIR__ . '/../app/view/pages/board.php';

} else if($page === 'rules'){
    require_once __DIR__ . '/../app/view/pages/rules.php';

} else {
    require_once __DIR__ . '/../app/view/pages/404.php';

}