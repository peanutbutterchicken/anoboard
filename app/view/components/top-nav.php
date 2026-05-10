<?php $currentPage = isset($_GET['page']) ? $_GET['page'] : 'home'; ?>

<nav class="top-nav">
    <p class="logo__title">AnoBoard</p>
    <ul class="top-nav__list">
        <li><a href="index.php?page=home" class="<?php $currentPage === 'home' ? active : ?>Home</a></li>
        <li><a href="index.php?page=board">Board</a></li>
        <li><a href="index.php?page=rules">Rules</a></li>
    </ul>
    <button>Post note</button>
</nav>

/* TODO: put active class on current page load, my head wont work properly */