import renderNote from '../components/note.js';
import generateRandomName from '../helper/helperNameGenerator.js';
import getDateNow from '../helper/HelperGetFormmatedDateTime.js'
import { postNoteService } from './../services/api.js';


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

const formContainer = document.querySelector('.container');

// color selection
let selectedNoteColor;
formContainer.addEventListener('click', function(event){
    if(event.target.classList.contains('color')){
        selectedNoteColor = getSelectedColor(event);
    }
});

function getSelectedColor(event){
    document.querySelectorAll('.color').forEach(color => color.classList.remove('selected'));
    event.target.classList.add('selected');
    const color = document.querySelector('.color.selected').getAttribute('data-color');
    return color;
}

// form submission
formContainer.addEventListener('click', async function(event){
    event.preventDefault();

    if(event.target.classList.contains('button__form-submit')){
        await postNote(event);
    }

});

async function postNote(event){
    const textarea = document.getElementById('form__text-body');
    const inputText = textarea.value.trim(' ');
    const name = generateRandomName();

    if(!inputText || !selectedNoteColor) return;

    let data = {
        text: inputText,
        created_at: getDateNow(),
        anonymous_uname: name,
        note_color: selectedNoteColor
    };
    console.log(data.created_at);
    
    const success = await postNoteService(data);
    if(!success){
        alert('Failed to create note');
        return;
    }
    state.notes.push(data);
    render();
    closeModal();
}