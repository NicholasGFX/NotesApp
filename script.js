const notes = [{
    title: 'HTML',
    body: 'HTML, short for Hyper-Text Markup Language, defines the structure of a web page.',
}, {
    title: 'CSS',
    body: 'CSS, short for Cascading Style Sheets, defines how a web page looks. This project was built with Bulma, a CSS framework.',
}, {
    title: 'JavaScript',
    body: 'JavaScript defines how a web page behaves.',
}];
let noteCounter = 0;
let deletedNote;
let deletedNoteIndex;
const submit = document.getElementById('submit');
const noteList = document.getElementById('noteList');
const undo = document.getElementById('undo');


notes.forEach(note =>
    //Renders each note on page load.

    makeNoteCard(note.title, note.body)
);

submit.addEventListener('click', () => {
    //Adds new notes to the notes array and html file

    const newTitle = document.getElementById('newTitle').value;
    const newBody = document.getElementById('newBody').value;
    deletedNote = null
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
    noteCard.className = `noteCard card column is-one-quarter`;
    noteCard.id = `${noteCounter}`
    noteList.appendChild(noteCard);
    noteCounter++;

    const noteTitle = document.createElement('h3');
    noteTitle.className = 'noteTitle card-header-title';
    noteTitle.textContent = title;
    noteCard.appendChild(noteTitle);

    const noteBody = document.createElement('p');
    noteBody.className = 'noteBody card-content';
    noteBody.textContent = body
    noteCard.appendChild(noteBody);

    const noteFooter = document.createElement('div');
    noteFooter.className = `noteFooter card-footer`;
    noteCard.appendChild(noteFooter);

    const deleteButton = document.createElement('a');
    deleteButton.className = `deleteButton card-footer-item`;
    deleteButton.textContent = 'Delete';
    noteFooter.appendChild(deleteButton);

    const editButton = document.createElement('a');
    editButton.className = `editButton card-footer-item`;
    editButton.textContent = 'Edit';
    noteFooter.appendChild(editButton);


    deleteButton.addEventListener('click', () => {
        //deletes the note, stores the previous content in the deletedNote variable for "undo" functionality.

        deletedNoteIndex = deleteButton.parentElement.parentElement.id
        deletedNote = notes.splice(deletedNoteIndex, 1).shift();
        noteCounter--;
        deleteButton.parentElement.parentElement.remove();

    })

    editButton.addEventListener('click', () => {
        //edit clicked
        //item removed from the array.
        //item added to the note title/note text input fields.

        deletedNoteIndex = editButton.parentElement.parentElement.id
        deletedNote = notes.splice(deletedNoteIndex, 1).shift();
        if (deletedNote.title) document.getElementById('newTitle').value = deletedNote.title;
        if (deletedNote.body) document.getElementById('newBody').value = deletedNote.body;
        noteCounter--;
        editButton.parentElement.parentElement.remove();

    })
}

undo.addEventListener('click', () => {
    //Adds new notes to the notes array and html file if deleted note exists

    if (deletedNote) {
        notes.splice(deletedNoteIndex, 0, deletedNote) //Places the deleted note back at its original index within the array
        noteCounter++;
        deletedNote = null;
        renderNotes();
    }
})