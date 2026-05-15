let state = {
    notes: window.INITIAL_STATE || []
};

const containerNotes = document.querySelector('.container__notes');
containerNotes.addEventListener('click', function(event){
    console.log('clicked');

});
