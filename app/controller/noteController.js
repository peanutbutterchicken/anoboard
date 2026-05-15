import nameGenerate from './../helper/helperNameGenerator.js';

let state = {
    notes: window.INITIAL_STATE || []
};

function getTimeElapsed(createdAt){
    const timeDiff = Date.now() - new Date(createdAt).getTime();
    const seconds = timeDiff / 1000;
    const minutes = seconds / 60;
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if(days >= 1){
        if(days === 1) return "1 day ago";
        return `${days} days ago`;
    } else if(hours >= 1){
        if(hours === 1 ) return "1 hour ago";
        return `${hours} hours ago`;
    } else if(minutes > 1){
        return `${Math.round(minutes)} minutes ago`; 
    } else {
        return `${Math.round(seconds)} seconds ago`;
    }
};

function renderNote(note){
    const timeElapsed = getTimeElapsed(note.created_at); 
    const name = nameGenerate();
    const noteHtml =
    `<div class="note">
        <p class="text">"${note.text}"
        <div class="stats">
            <p class="time-elapsed">a/${name}</p>
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
