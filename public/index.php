<?php

$page = isset($_GET['page']) ? $_GET['page'] : 'home';

if($page === 'home'){
    require_once __DIR__ . '/../app/view/pages/index.php';
} else {
    require_once __DIR__ . '/../app/view/pages/404.php';
}
