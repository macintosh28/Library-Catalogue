const bookList = document.querySelector(".book-list");
const addBookForm = document.getElementById("add-book-form");
const addBookBTN = document.querySelector(".content-addBTN");
const bookPopup = document.querySelector(".book-popup");
const searchBTN = document.getElementById("searchBTN");
const searchInput = document.getElementById("searchInput");

addBookForm.addEventListener("submit", addBookToLibrary);
addBookBTN.addEventListener("click", () => {
    bookPopup.style.display = "block";
});
bookPopup.addEventListener("click", (event) => {
    if (event.target === bookPopup) {
        bookPopup.style.display = "none";
    }
});
searchBTN.addEventListener("click", searchBooks);

let myLibrary = [];
document.addEventListener("DOMContentLoaded", loadBooksFromLocalStorage);

function Book(code, title, author, location, category) {
    this.code = code;
    this.title = title;
    this.author = author;
    this.location = location;
    this.category = category;
}

function addBookToLibrary(event) {
    event.preventDefault();

    const codeInput = document.getElementById("codeInput"); // Ensure this is correct
    const titleInput = document.getElementById("titleInput");
    const authorInput = document.getElementById("authorInput");
    const locationInput = document.getElementById("locationInput");
    const categoryInput = document.getElementById("categoryInput");

    const newBook = new Book(
        codeInput.value, // Assign book code here
        titleInput.value,
        authorInput.value,
        locationInput.value,
        categoryInput.value
    );

    myLibrary.push(newBook);
    saveBooksToLocalStorage();

    // Clear inputs
    codeInput.value = "";
    titleInput.value = "";
    authorInput.value = "";
    locationInput.value = "";
    categoryInput.value = "";

    bookPopup.style.display = "none";
    displayBooks();
}


function displayBooks(books = myLibrary) {
    bookList.innerHTML = "";

    const categorizedBooks = books.reduce((acc, book) => {
        if (!acc[book.category]) acc[book.category] = [];
        acc[book.category].push(book);
        return acc;
    }, {});

    for (const category in categorizedBooks) {
        const categoryHeader = document.createElement("h2");
        categoryHeader.textContent = category;
        bookList.appendChild(categoryHeader);

        categorizedBooks[category].forEach((book) => {
            const bookInfo = document.createElement("div");
            bookInfo.classList.add("book-info");

            // Create and add the book code element
            const bookCode = document.createElement("p");
            bookCode.classList.add("book-code");
            bookCode.textContent = `Code: ${book.code}`;

            // Title, Author, and Location elements
            const bookTitle = document.createElement("p");
            bookTitle.classList.add("book-title");
            bookTitle.textContent = `Title: ${book.title}`;

            const bookAuthor = document.createElement("p");
            bookAuthor.classList.add("book-author");
            bookAuthor.textContent = `Author: ${book.author}`;

            const bookLocation = document.createElement("p");
            bookLocation.classList.add("book-location");
            bookLocation.textContent = `Location: ${book.location}`;

            // Buttons for edit and remove
            const editBTN = document.createElement("button");
            editBTN.textContent = "Edit";
            editBTN.classList.add("edit-bookBTN");
            editBTN.addEventListener("click", () => editBook(myLibrary.indexOf(book)));

            const removeBTN = document.createElement("button");
            removeBTN.textContent = "Remove";
            removeBTN.classList.add("remove-bookBTN");
            removeBTN.addEventListener("click", () => removeBook(myLibrary.indexOf(book)));

            // Append all elements to the book card
            bookInfo.append(bookCode, bookTitle, bookAuthor, bookLocation, editBTN, removeBTN);
            bookList.appendChild(bookInfo);
        });
    }
}





function searchBooks() {
    const query = searchInput.value.toLowerCase();
    const filteredBooks = myLibrary.filter(
        (book) =>
            book.title.toLowerCase().includes(query) ||
            book.category.toLowerCase().includes(query)
    );
    displayBooks(filteredBooks);
}

function editBook(index) {
    const book = myLibrary[index];

    document.getElementById("codeInput").value = book.code;
    document.getElementById("titleInput").value = book.title;
    document.getElementById("authorInput").value = book.author;
    document.getElementById("locationInput").value = book.location;
    document.getElementById("categoryInput").value = book.category;

    removeBook(index);
    bookPopup.style.display = "block";
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    saveBooksToLocalStorage();
    displayBooks();
}

window.onload = function() {
    myLibrary = loadFromLocalStorage();
    displayBooks(); // Display the books loaded from local storage
};


function saveToLocalStorage(books) {
    localStorage.setItem("myLibrary", JSON.stringify(books));
}

function loadFromLocalStorage() {
    const books = localStorage.getItem("myLibrary");
    return books ? JSON.parse(books) : [];
}



    displayBooks();
}







