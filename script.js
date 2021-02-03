const notes = [{
    title: 'HTML',
    body: 'HTML defines the structure of a web page.',
}, {
    title: 'CSS',
    body: 'CSS defines how a web page looks.',
}, {
    title: 'JavaScript',
    body: 'JavaScript defines how a web page behaves.',
}];
let noteCount = 0;
let deletedNote
const submit = document.getElementById('submit');
const noteList = document.getElementById('noteList');


function makeNoteCard(title, body) {
    //Makes new note cards and adds them to the rendered list.
    
    const noteCard = document.createElement('div');
    noteCard.className = `noteCard`;
    noteCard.id = `${noteCount}`
    noteList.appendChild(noteCard);
    noteCount++;

    const noteTitle = document.createElement('h3');
    noteTitle.className = 'noteTitle';
    noteTitle.textContent = title;
    noteCard.appendChild(noteTitle);

    const noteBody = document.createElement('p');
    noteBody.className = 'noteBody';
    noteBody.textContent = body
    noteCard.appendChild(noteBody);

    const deleteButton = document.createElement('button');
    deleteButton.className = `deleteButton`;
    deleteButton.textContent = 'Delete';
    noteCard.appendChild(deleteButton);

    deleteButton.addEventListener('click', () => {
        //notes.pop(deleteButton.parentElement.id)
        deletedNote = notes.splice(deleteButton.parentElement.id, 1);
        noteCount--;
        deleteButton.parentElement.remove();
        console.log(notes)
        // notes.pop(noteCount)

        // document.getElementById(`${noteCount}`).remove();
        // noteCount--;
        //add an index to the noteCard which can be referenced to delete it from the DOM and notes array

    })
}

notes.forEach(note =>
    //Renders each note on page load.

    makeNoteCard(note.title, note.body)
);

submit.addEventListener('click', () => {
    //Adds new notes to the notes array and html file

    const newTitle = document.getElementById('newTitle').value;
    const newBody = document.getElementById('newBody').value;
    if (newTitle || newBody !== '') {
        makeNoteCard(newTitle, newBody);
        document.getElementById('newTitle').value = '';
        document.getElementById('newBody').value = '';
        notes.push({
            title: newTitle,
            body: newBody
        })
    }
})



/*
Basic Remove Note Logic
notes.find('note name') //return the index and splice it out while
store it in a variable to enable the user to undo the action.


FUNCTIONALITY
MODIFY NOTES ADD LATER. Same logic as new note mostly.
*/