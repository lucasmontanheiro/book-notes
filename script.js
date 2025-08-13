const tsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRctFoXA1UtFJe4z7SYVhhBqsI9Brsb2Uhajfsz8SdMnAtsiY_wrL8elX0GSxB9I7tBtLfjN2vDAvtC/pub?gid=1127734888&single=true&output=tsv';
const notesContainer = document.getElementById('notes-container');

async function fetchAndDisplayNotes() {
    try {
        const response = await fetch(tsvUrl);
        const tsvData = await response.text();
        const notes = parseTsv(tsvData);
        renderNotes(notes);
    } catch (error) {
        console.error('Error fetching or parsing notes:', error);
        notesContainer.innerHTML = '<p>Failed to load notes. Please try again later.</p>';
    }
}

function parseTsv(tsv) {
    const lines = tsv.trim().split('\n');
    const headers = lines[0].split('\t');
    const notes = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split('\t');
        let note = {};
        headers.forEach((header, index) => {
            note[header.trim()] = values[index] ? values[index].trim() : '';
        });
        notes.push(note);
    }
    return notes;
}

function renderNotes(notes) {
    notesContainer.innerHTML = ''; // Clear previous content
    notes.forEach(note => {
        const noteCard = document.createElement('div');
        noteCard.classList.add('note-card');

        const title = document.createElement('h2');
        title.textContent = note['Book Title'] || 'Untitled Book';
        noteCard.appendChild(title);

        const author = document.createElement('p');
        author.textContent = `Author: ${note['Author'] || 'Unknown'}`;
        noteCard.appendChild(author);

        const quote = document.createElement('p');
        quote.innerHTML = `<strong>Quote:</strong> ${note['Quote'] || 'N/A'}`;
        noteCard.appendChild(quote);

        const page = document.createElement('p');
        page.textContent = `Page: ${note['Page Number'] || 'N/A'}`;
        noteCard.appendChild(page);

        const thoughts = document.createElement('p');
        thoughts.innerHTML = `<strong>My Thoughts:</strong> ${note['My Thoughts'] || 'N/A'}`;
        noteCard.appendChild(thoughts);

        notesContainer.appendChild(noteCard);
    });
}

fetchAndDisplayNotes();
