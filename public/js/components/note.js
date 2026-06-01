import getHexColor from '../helper/helperGetNoteColorHex.js';

function getTimeElapsed(timestamp){
    const now = Temporal.Now.instant();    
    // format sql datetime string 'YYYY-MM-DD HH:MM:SS' to ISO 8601 'YYYY-MM-DDTHH:MM:SSZ'
    // 'Z' or zulu time tells temporal this is a utc timestamp
    const isoString = timestamp.replace(' ', 'T') + 'Z';
    // parse the timestamp as an absolute point in time
    const noteTime = Temporal.Instant.from(isoString);
    const timeDiff = now.epochMilliseconds - noteTime.epochMilliseconds;
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

export default function renderNote(note){
    const noteHTML =
    `<div class="note" style="background-color: ${getHexColor(note.note_color)};">
        <p class="text">"${note.text}"
        <div class="footer">
            <p class="time-elapsed">${getTimeElapsed(note.created_at)}</p>
            <p class="anon-name">a/${note.anonymous_uname}</p>
        </div>
    </div>`;
    return noteHTML;
}