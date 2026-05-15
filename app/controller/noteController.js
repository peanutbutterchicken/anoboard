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
    const noteHTML =
    `<div class="note">
        <p class="text">"${note.text}"
        <div class="footer">
            <p class="time-elapsed">${timeElapsed}</p>
            <p class="anon-name">a/${name}</p>
        </div>
    </div>`;
    return noteHTML;
}

function renderNoteForm(){
    const formHTML =
    `<div class="container__form-note">
        
    </div>`;
}

// TODO: create form for note creation. check figma design

function render(){
    const containerNotes = document.querySelector('.container__notes');
    containerNotes.innerHTML = '';

    state.notes.forEach(note => {
        const noteHtml = renderNote(note);
        containerNotes.insertAdjacentHTML('beforeend', noteHtml);
    });
}

render();
