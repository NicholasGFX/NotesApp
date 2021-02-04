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
let noteCounter = 0;
let deletedNote;
const submit = document.getElementById('submit');
const noteList = document.getElementById('noteList');

notes.forEach(note =>
    //Renders each note on page load.

    makeNoteCard(note.title, note.body)
);

submit.addEventListener('click', () => {
    //Adds new notes to the notes array and html file

    const newTitle = document.getElementById('newTitle').value;
    const newBody = document.getElementById('newBody').value;
    if (newTitle || newBody !== '') { //if note has any content, add it to the array, render it, and clear the input fields.
        notes.push({
            title: newTitle,
            body: newBody
        })
        renderNotes();
        document.getElementById('newTitle').value = '';
        document.getElementById('newBody').value = '';
    }
})

function renderNotes() {
    //Clears all rendered notes, and re-renders them when a new note is added.

    noteList.innerHTML = '';
    noteCounter = 0;
    notes.forEach(note => makeNoteCard(note.title, note.body));
}

function makeNoteCard(title, body) {
    //Makes new note cards and adds them to the rendered list.

    const noteCard = document.createElement('div');
    noteCard.className = `noteCard`;
    noteCard.id = `${noteCounter}`
    noteList.appendChild(noteCard);
    noteCounter++;

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
        //deletes the note, stores the previous content in the deletedNote variable for "undo" functionality.

        deletedNote = notes.splice(deleteButton.parentElement.id, 1);
        noteCounter--;
        deleteButton.parentElement.remove();
    })
}