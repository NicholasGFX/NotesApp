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

const submit = document.getElementById('submit');
const noteList = document.getElementById('noteList');

notes.forEach(note =>
    //Render each note on page load.
    makeNoteCard(note.title, note.body)
);

submit.addEventListener('click', () => {
    //Add new notes to the notes object
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

function makeNoteCard(title, body) {
    //Make new note cards and add them to the rendered list.

    const noteCard = document.createElement('div');
    noteCard.className = 'noteCard';
    noteList.appendChild(noteCard);

    const noteTitle = document.createElement('h3');
    noteTitle.className = 'noteTitle';
    noteTitle.textContent = title;
    noteCard.appendChild(noteTitle);

    const noteBody = document.createElement('p');
    noteBody.className = 'noteBody';
    noteBody.textContent = body
    noteCard.appendChild(noteBody);
}

/*
Basic Remove Note Logic
notes.find('note name') //return the index and splice it out while
store it in a variable to enable the user to undo the action.


FUNCTIONALITY
MODIFY NOTES ADD LATER. Same logic as new note mostly.
*/