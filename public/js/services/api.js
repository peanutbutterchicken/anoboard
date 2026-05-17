export async function postNoteService(data){
    try{
        const response = await fetch('./../public/api/postNote.php', {
            method: "POST",
            header: {'Content-type' : 'application/json'},
            body: JSON.stringify(data)
        });
        if(!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
    } catch(error){
        console.log(`API service error: ${error}`);
        return false;
    }
    return true;
}