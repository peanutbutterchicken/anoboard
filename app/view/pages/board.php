<?php require_once __DIR__ . '/../components/header.php'; ?>
<a href="index.php?page=board&action=showModal" class="floating-button">
    <span class="material-symbols-outlined icon-add">add</span>
</a>
<div class="overlay" style="display: none;">
    <form method=""  class="container" style="display: none;">
        <div class="form__header">
            <h1>Post Note</h1>
            <span class="form__button-close">X</span>
        </div>
        <textarea class="form__text-body" placeholder="What's on your mind?"></textarea>
        <p class="form__color-header">SELECT NOTE COLOR</p>
        <div class="form__color-selection">
            <div class="color yellow"></div>
            <div class="color blue"></div>
            <div class="color green"></div>
            <div class="color red"></div>
            <div class="color purple"></div>
        </div>
        <div class="form__footer">
            <button>Post Anonymously</button>
            <p>Notes stay on the wall for 7 days unless pinned.</p>
        </div>
    </form>
</div>
<div class="container__notes">

</div>
<?php require_once __DIR__ . '/../components/footer.php'; ?> 
