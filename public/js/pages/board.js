import renderNote from '../components/note.js';

let state = {
    notes: window.INITIAL_STATE || []
};

// upon page load, get url parameters
const urlParams = new URLSearchParams(window.location.search);
const showModal = urlParams.get('action') === 'showModal';
const isPageBoard = urlParams.get('page') === 'board';

 // show modal normally with page load. since it came from an anchor element.
if(showModal){
    openModal();
}

const btnPostNote = document.querySelector('.button__post-note');
const btnPostNote2 = document.querySelector('.floating-button');
 // used event listener to prevent default page load.
btnPostNote.addEventListener('click', function(event){
    // if page is already a 'board' then don't reload the page, only show the modal.
    if(isPageBoard){
        event.preventDefault();
        openModal();
    }
});

btnPostNote2.addEventListener('click', function(event){
    // if page is already a 'board' then don't reload the page, only show the modal.
    if(isPageBoard){
        event.preventDefault();
        openModal();
    }
});

// close button:
if(isPageBoard){
// note: combined a form overlay and wrapper to do one job, so naming is interchangeable.
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
    const containerNotes = document.querySelector('.container__notes');
    containerNotes.innerHTML = '';

    state.notes.forEach(note => {
        const noteHtml = renderNote(note);
        containerNotes.insertAdjacentHTML('beforeend', noteHtml);
    });
}

render();