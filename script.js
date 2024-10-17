// Array to hold book objects
let myLibrary = [];

// Book constructor
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

// Prototype method to toggle the read status
Book.prototype.toggleReadStatus = function() {
    this.isRead = !this.isRead;
};

// Function to add a book to the library
function addBookToLibrary(book) {
    myLibrary.push(book);
    updateLocalStorage();
    displayBooks();
}

// Function to remove a book from the library
function removeBook(index) {
    myLibrary.splice(index, 1);
    updateLocalStorage();
    displayBooks();
}

// Function to display books in the library
function displayBooks() {
    const libraryDisplay = document.getElementById('libraryDisplay');
    libraryDisplay.innerHTML = ''; // Clear the display

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('card');
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>by ${book.author}</p>
            <p>${book.pages} pages</p>
            <p>${book.isRead ? 'Read' : 'Not read yet'}</p>
            <button onclick="removeBook(${index})">Remove</button>
            <button onclick="toggleReadStatus(${index})">Toggle Read Status</button>
        `;
        libraryDisplay.appendChild(bookCard);
    });
}

// Function to toggle the read status
function toggleReadStatus(index) {
    myLibrary[index].toggleReadStatus();
    updateLocalStorage();
    displayBooks();
}

// Function to update local storage
function updateLocalStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

// Function to load books from local storage
function loadLibraryFromLocalStorage() {
    const storedLibrary = localStorage.getItem('myLibrary');
    if (storedLibrary) {
        myLibrary = JSON.parse(storedLibrary).map(bookData => new Book(bookData.title, bookData.author, bookData.pages, bookData.isRead));
    }
    displayBooks();
}

// Load library from local storage on page load
window.onload = loadLibraryFromLocalStorage;

// Event listener for the "New Book" button
document.getElementById('newBookBtn').addEventListener('click', () => {
    document.getElementById('formContainer').classList.toggle('hidden');
});

// Event listener for the book form submission
document.getElementById('bookForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked;

    const newBook = new Book(title, author, pages, isRead);
    addBookToLibrary(newBook);

    // Clear the form and hide it
    document.getElementById('bookForm').reset();
    document.getElementById('formContainer').classList.add('hidden');
});
const bookModal = document.getElementById('bookModal');
const closeModalBtn = document.getElementById('closeModal');

// Event listener for "New Book" button to open modal
document.getElementById('newBookBtn').addEventListener('click', () => {
    bookModal.showModal();
});

// Event listener for closing the modal
closeModalBtn.addEventListener('click', () => {
    bookModal.close();
});

// Update form submission to close the modal after adding a book
document.getElementById('bookForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked;

    const newBook = new Book(title, author, pages, isRead);
    addBookToLibrary(newBook);

    // Clear the form and close the modal
    document.getElementById('bookForm').reset();
    bookModal.close();
});
