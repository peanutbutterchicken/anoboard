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
    const noteHTML =
    `<div class="note">
        <p class="text">"${note.text}"
        <div class="footer">
            <p class="time-elapsed">${timeElapsed}</p>
            <p class="anon-name">a/${note.anonymous_uname}</p>
        </div>
    </div>`;
    return noteHTML;
}

const params = new URLSearchParams(window.location.search);
if(params.get('showModal') === '1'){
    openModal();
}

if(params.get('page') === 'board'){
const formWrapper = document.querySelector('.overlay');
    formWrapper.addEventListener('click', function(event) {
        if(event.target.classList.contains('form__button-close')){
            closeModal();
        }
    });
}

function openModal(){
   document.querySelector('.overlay').style.display = 'flex'
   document.querySelector('.container').style.display = 'flex';
}

function closeModal(){
   document.querySelector('.overlay').style.display = 'none'
   document.querySelector('.container').style.display = 'none'
}


function render(){
    if(params.get('page') !== 'board'){
        return;
    }
    const containerNotes = document.querySelector('.container__notes');
    containerNotes.innerHTML = '';

    state.notes.forEach(note => {
        const noteHtml = renderNote(note);
        containerNotes.insertAdjacentHTML('beforeend', noteHtml);
    });
}

render();
