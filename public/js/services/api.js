export async function postNoteService(data){
    try{
        const response = await fetch('./../public/api/postNote.php', {
            method: "POST",
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.error || `Response status: ${response.status}`;
            throw new Error(errorMessage);
        }
        return { success: true };
    } catch(error) {
        console.error(`API service error: ${error.message}`);
        return { success: false, message: error.message };
    }
}

export async function getNotesService(){
    try {
        const response = await fetch('./../public/api/getNotes.php');
        if (!response.ok) throw new Error(`Response status: ${response.status}`);
        return await response.json();
    } catch(error) {
        console.error(`API service error: ${error.message}`);
        return null;
    }
}