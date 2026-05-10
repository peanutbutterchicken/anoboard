<?php

$page = isset($_GET['page']) ? $_GET['page'] : 'home';

if($page === 'home'){
    require_once __DIR__ . '/../app/view/home.php';
} else {
    require_once __DIR__ . '/../app/view/404.php';
}
