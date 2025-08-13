const tsvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRctFoXA1UtFJe4z7SYVhhBqsI9Brsb2Uhajfsz8SdMnAtsiY_wrL8elX0GSxB9I7tBtLfjN2vDAvtC/pub?gid=1127734888&single=true&output=tsv';
const notesContainer = document.getElementById('notes-container');

let allNotes = [];
let filteredNotes = [];
let currentPage = 1;
const notesPerPage = 9; // Display 9 notes per page

async function fetchAndDisplayNotes() {
    try {
        const response = await fetch(tsvUrl);
        const tsvData = await response.text();
        allNotes = parseTsv(tsvData);
        applyFiltersAndPagination();
    } catch (error) {
        console.error('Error fetching or parsing notes:', error);
        notesContainer.innerHTML = '<p class="text-danger">Failed to load notes. Please try again later.</p>';
    }
}

function parseTsv(tsv) {
    const lines = tsv.trim().split('\n');
    const headers = lines[0].split('\t').map(header => header.trim());
    const notes = [];

    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split('\t').map(value => value.trim());
        let note = {};
        headers.forEach((header, index) => {
            note[header] = values[index] || '';
        });
        notes.push(note);
    }
    return notes;
}

function applyFiltersAndPagination() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const authorFilter = document.getElementById('author-filter').value.toLowerCase();

    filteredNotes = allNotes.filter(note => {
        const matchesSearch = (
            note.book_title.toLowerCase().includes(searchTerm) ||
            note.author.toLowerCase().includes(searchTerm) ||
            note.quote.toLowerCase().includes(searchTerm) ||
            note.notes.toLowerCase().includes(searchTerm)
        );
        const matchesAuthor = authorFilter === '' || note.author.toLowerCase().includes(authorFilter);
        return matchesSearch && matchesAuthor;
    });

    currentPage = 1; // Reset to first page on filter change
    renderNotes();
    renderPagination();
}

function renderNotes() {
    notesContainer.innerHTML = ''; // Clear previous content

    const startIndex = (currentPage - 1) * notesPerPage;
    const endIndex = startIndex + notesPerPage;
    const notesToDisplay = filteredNotes.slice(startIndex, endIndex);

    if (notesToDisplay.length === 0) {
        notesContainer.innerHTML = '<p class="text-muted">No notes found matching your criteria.</p>';
        return;
    }

    notesToDisplay.forEach(note => {
        const noteCardCol = document.createElement('div');
        noteCardCol.classList.add('col-md-4', 'mb-4'); // Bootstrap grid for 3 columns

        const noteCard = document.createElement('div');
        noteCard.classList.add('note-card', 'h-100'); // h-100 for equal height cards

        const title = document.createElement('h2');
        title.textContent = note.book_title || 'Untitled Book';
        noteCard.appendChild(title);

        const author = document.createElement('p');
        author.textContent = `Author: ${note.author || 'Unknown'}`;
        noteCard.appendChild(author);

        const quote = document.createElement('p');
        quote.innerHTML = `<strong>Quote:</strong> ${note.quote || 'N/A'}`;
        noteCard.appendChild(quote);

        const page = document.createElement('p');
        page.textContent = `Page: ${note.page_number || 'N/A'}`;
        noteCard.appendChild(page);

        const thoughts = document.createElement('p');
        thoughts.innerHTML = `<strong>My Thoughts:</strong> ${note.notes || 'N/A'}`;
        noteCard.appendChild(thoughts);

        noteCardCol.appendChild(noteCard);
        notesContainer.appendChild(noteCardCol);
    });
}

function renderPagination() {
    const paginationContainer = document.getElementById('pagination-container');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';

    const totalPages = Math.ceil(filteredNotes.length / notesPerPage);

    if (totalPages <= 1) {
        return; // No pagination needed for 1 or fewer pages
    }

    const ul = document.createElement('ul');
    ul.classList.add('pagination', 'justify-content-center');

    // Previous button
    const prevLi = document.createElement('li');
    prevLi.classList.add('page-item');
    if (currentPage === 1) prevLi.classList.add('disabled');
    const prevLink = document.createElement('a');
    prevLink.classList.add('page-link');
    prevLink.href = '#';
    prevLink.textContent = 'Previous';
    prevLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderNotes();
            renderPagination();
        }
    });
    prevLi.appendChild(prevLink);
    ul.appendChild(prevLi);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        if (i === currentPage) li.classList.add('active');
        const link = document.createElement('a');
        link.classList.add('page-page-link');
        link.href = '#';
        link.textContent = i;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            renderNotes();
            renderPagination();
        });
        li.appendChild(link);
        ul.appendChild(li);
    }

    // Next button
    const nextLi = document.createElement('li');
    nextLi.classList.add('page-item');
    if (currentPage === totalPages) nextLi.classList.add('disabled');
    const nextLink = document.createElement('a');
    nextLink.classList.add('page-link');
    nextLink.href = '#';
    nextLink.textContent = 'Next';
    nextLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            renderNotes();
            renderPagination();
        }
    });
    nextLi.appendChild(nextLink);
    ul.appendChild(nextLi);

    paginationContainer.appendChild(ul);
}

// Initial fetch and display
fetchAndDisplayNotes();

// Add event listeners for filters
document.getElementById('search-input').addEventListener('input', applyFiltersAndPagination);
document.getElementById('author-filter').addEventListener('input', applyFiltersAndPagination);