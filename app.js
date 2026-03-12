let books = [
    {
        title: "Harry Potter 1",
        author: "J. K. Rowling",
        genre: "Fiction",
        pages: 599,
        srNo: 1,
        available: true
    },
    {
        title: "Harry Potter 2",
        author: "J. K. Rowling",
        genre: "Fiction",
        pages: 750,
        srNo: 2,
        available: true
    }, 
    {
        title: "Harry Potter 3",
        author: "J. K. Rowling",
        genre: "Fiction",
        pages: 800,
        srNo: 3,
        available: true
    }, 
    {
        title: "Marvel Avengers",
        author: "Stan Lee",
        genre: "Sci-fi",
        pages: 250,
        srNo: 4,
        available: true
    },
    {
        title: "Machine Learning",
        author: "Chadwin Bowman",
        genre: "Ai Learning",
        pages: 1250,
        srNo: 5,
        available: true
    },
    {
        title: "Python for beginners",
        author: "Jon Doe",
        genre: "Education",
        pages: 3000,
        srNo: 6,
        available: true
    },
    {
        title: "Java",
        author: "Robert Atkinson",
        genre: "Education",
        pages: 4500,
        srNo: 7,
        available: true
    },
];

function saveBooks() {
    localStorage.setItem('libraryBooks', JSON.stringify(books));
}

function loadBooks() {
    const saved = localStorage.getItem('libraryBooks');
    if (saved) {
        books = JSON.parse(saved);
    }
}

function showMessage(msg, isError = false) {
    const msgDiv = document.getElementById('message');
    msgDiv.textContent = msg;
    msgDiv.className = isError ? 'error' : 'success';
    setTimeout(() => { msgDiv.textContent = ''; }, 3000);
}

function renderBooks(filteredBooks = books) {
    const tbody = document.getElementById('bookTableBody');
    const table = document.getElementById('bookTable');
    const noBooksMsg = document.getElementById('noBooksMsg');

    tbody.innerHTML = '';

    if (filteredBooks.length === 0) {
        table.style.display = 'none';
        noBooksMsg.style.display = 'block';
        return;
    }

    noBooksMsg.style.display = 'none';
    table.style.display = 'table';

    filteredBooks.forEach(book => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.srNo}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.pages}</td>
            <td class="${book.available ? 'available' : 'borrowed'}">${book.available ? 'Available' : 'Borrowed'}</td>
            <td><button class="borrow-btn" data-id="${book.srNo}">${book.available ? 'Borrow' : 'Return' }</button></td>
        `;
        tbody.appendChild(row);
    });

    // Add event listeners for borrow buttons (event delegation)
    document.querySelectorAll('.borrow-btn').forEach(btn => {
        btn.onclick = function() {
            toggleBorrow(this.dataset.id);
        };
    });
}

function toggleBorrow(srNo) {
    const book = books.find(b => b.srNo === parseInt(srNo));
    if (!book) return;

    book.available = !book.available;
    saveBooks();
    renderBooks();
    const status = book.available ? 'returned' : 'borrowed';
    showMessage(`Book "${book.title}" has been ${status}.`);
}

function filterBooks(query) {
    if (!query.trim()) return renderBooks();
    const lowerQuery = query.toLowerCase();
    const filtered = books.filter(book => 
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery)
    );
    renderBooks(filtered);
}

// Init
document.addEventListener('DOMContentLoaded', function() {
    loadBooks();
    document.getElementById('listBtn').onclick = () => renderBooks();
    document.getElementById('searchInput').oninput = function() {
        filterBooks(this.value);
    };
    document.getElementById('clearSearch').onclick = () => {
        document.getElementById('searchInput').value = '';
        renderBooks();
    };
});

