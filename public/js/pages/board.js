import renderNote from '../components/note.js';
import generateRandomName from '../helper/helperNameGenerator.js';
import getDateNow from '../helper/helperGetFormmatedDateTime.js'
import getHexColor from '../helper/helperGetNoteColorHex.js'
import { postNoteService, getNotesService } from './../services/api.js';


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
    
    // Remove the 'action' parameter from the URL address bar without reloading
    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete('action');
    window.history.replaceState({}, document.title, cleanUrl);
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

function render(){
    const containerNotes = document.querySelector('.container__notes');
    containerNotes.innerHTML = '';

    state.notes.forEach(note => {
        const noteHtml = renderNote(note);
        containerNotes.insertAdjacentHTML('beforeend', noteHtml);
    });
}

render();

// Auto-refresh functionality
async function refreshBoard() {
    // Prevent disruption: Skip refresh if the user is reading (scrolled down) or typing a note
    const isModalOpen = document.querySelector('.overlay').style.display === 'flex';
    const isScrolled = window.scrollY > 50;
    
    if (isModalOpen || isScrolled) {
        return;
    }

    const spinner = document.getElementById('refresh-spinner');
    spinner.style.display = 'block';

    const newNotes = await getNotesService();
    if (newNotes) {
        // Only re-render the DOM if the notes have actually changed
        const hasChanges = JSON.stringify(newNotes) !== JSON.stringify(state.notes);
        
        if (hasChanges) {
            state.notes = newNotes;
            render();
        }
    }

    // Hide spinner after a tiny delay so it doesn't just flash instantly
    setTimeout(() => { spinner.style.display = 'none'; }, 300);
}
setInterval(refreshBoard, 15000); // Refreshes every 15 seconds

const formContainer = document.querySelector('.container');
const textArea = document.querySelector('.form__text-body');
// color selection
let selectedNoteColor;
formContainer.addEventListener('click', function(event){
    if(event.target.classList.contains('color')){
        selectedNoteColor = getStrSelectedColor(event);
        textArea.style.backgroundColor = getHexColor(selectedNoteColor);
    }
});

// form submission
formContainer.addEventListener('click', async function(event){
    event.preventDefault();

    if(event.target.classList.contains('button__form-submit')){
        if(!textArea.value){
            showToast("Input text", true);
        } else if(!selectedNoteColor){
            showToast("Please select a note color", true);
        } else {
            await postNote(event);
        }
    }
});

async function postNote(event){
    const textarea = document.getElementById('form__text-body');
    const inputText = textarea.value.trim('');

    const name = generateRandomName();

    if(!inputText || !selectedNoteColor) return;

    let data = {
        text: inputText,
        created_at: getDateNow(),
        anonymous_uname: name,
        note_color: selectedNoteColor
    };
    
    const result = await postNoteService(data);
    if(!result.success){
        showToast(`Failed to create note: ${result.message}`, true);
        return;
    }
    showToast("Note posted successfully!");
    state.notes.push(data);
    // clear input values after successful post
    textarea.value = '';
    
    render();
    closeModal();
}

function openModal(){
   const overlay = document.querySelector('.overlay');
   const container = document.querySelector('.container');
   
   overlay.style.display = 'flex';
   container.style.display = 'flex';

   overlay.animate([ { opacity: 0 }, { opacity: 1 } ], { duration: 250, fill: 'forwards' });
   container.animate([
       { opacity: 0, transform: 'scale(0.95)' },
       { opacity: 1, transform: 'scale(1)' }
   ], { duration: 250, easing: 'ease-out', fill: 'forwards' });
}

function closeModal(){
   const overlay = document.querySelector('.overlay');
   const container = document.querySelector('.container');

   const overlayAnim = overlay.animate([ { opacity: 1 }, { opacity: 0 } ], { duration: 200, fill: 'forwards' });
   container.animate([
       { opacity: 1, transform: 'scale(1)' },
       { opacity: 0, transform: 'scale(0.95)' }
   ], { duration: 200, easing: 'ease-in', fill: 'forwards' });

   overlayAnim.onfinish = () => {
       overlay.style.display = 'none';
       container.style.display = 'none';
   };
}

function getStrSelectedColor(event){
    document.querySelectorAll('.color').forEach(color => color.classList.remove('selected'));
    event.target.classList.add('selected');
    const color = document.querySelector('.color.selected').getAttribute('data-color');
    return color;
}

function showToast(message, isError = false) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = isError ? '#D32F2F' : '#4CAF50';
    toast.style.color = 'white';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    toast.style.zIndex = '9999';
    toast.style.transition = 'opacity 0.3s ease-in-out';
    toast.style.opacity = '1';
    
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}