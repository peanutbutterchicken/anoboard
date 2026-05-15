let state = {
    notes: window.INITIAL_STATE || []
};

function renderNote(note){
    noteHtml =
    `<div class="note">
        <p class="text">"${note.text}"
        <div class="stats">
            <p class="time-elapsed">2 hours ago</p>
            <span class="material-symbols-outlined icon-heart-like">favorite</span>
        </div>
    </div>`;
    return noteHtml;
}

function render(){
    const containerNotes = document.querySelector('.container__notes');
    containerNotes.innerHTML = '';

    state.notes.forEach(note => {
        const noteHtml = renderNote(note);
        containerNotes.insertAdjacentHTML('beforeend', noteHtml);
    });
}

render();
