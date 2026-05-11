<?php $currentPage = $_GET['page'] ?? ''; ?>

<nav class="top-nav">
    <p class="logo__title">AnoBoard</p>
    <ul class="top-nav__list">
        <li>
            <a href="index.php?page=home" class="<?php echo ($currentPage === 'home') ? 'active' : ''?>">Home</a>
        </li>
        <li>
            <a href="index.php?page=board" class="<?php echo ($currentPage === 'board') ? 'active' : ''?>">Board</a>
        </li>
        <li>
            <a href="index.php?page=rules" class="<?php echo ($currentPage === 'rules') ? 'active' : ''?>">Rules</a>
        </li>
    </ul>
    <button>Post note</button>
</nav>