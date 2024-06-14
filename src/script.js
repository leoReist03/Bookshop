//instance variables
var books;
var authors;
var genres;

getBooks();
getAuthors();
getGenres();

if (window.sessionStorage.getItem("isNewSession") !== "0") {
    var booksJson = '[{"id":"1","cover":"cover","name":"name","description":"description","pages":"300","release":"2020-01-30","authorId":"1","genreId":"1"},{"id":"2","cover":"cover","name":"name","description":"description","pages":"300","release":"2020-01-30","authorId":"2","genreId":"2"}]';
    localStorage.setItem('books', booksJson);
    
    var authorsJson = '[{"id":"1","name":"PierceBrown","dateOfBirth":"1988-01-28"},{"id":"2","name":"BrandonSanderson","dateOfBirt":"1975-12-19"}]';
    localStorage.setItem('authors', authorsJson);

    var genresJson = '[{"id":"1","name":"ScienceFiction"},{"id":"2","name":"Fantasy"}]';
    localStorage.setItem('genres', genresJson);
    
    window.sessionStorage.setItem("isNewSession", "0");
}

//set onload for list page
if (document.title == "Books overview") {
    window.onload = function () {
        readAllBooks();
    }
} else if (document.title == "Authors overview") {
    window.onload = function () {
        readAllAuthors();
    }
} else if (document.title == "Genre overview") {
    window.onload = function () {
        readAllGenres();
    }
}

//set onload for create page
if (document.title == "Book create") {
    window.onload = () => setupCreateBook();
} else if (document.title == "Author create") {

} else if (document.title == "Genre create") {

}

//set onload for edit page
if (document.title == "Book edit") {
    window.onload = () =>  setupEditBook();
} else if (document.title == "Author edit") {

} else if (document.title == "Genre edit") {

}

//set onload for details
if (document.title == "Book details") {
    window.onload = () => setupDetailsBook();
} else if (document.title == "Author details") {
} else if (document.title == "Genre details") {
}

//setup create page
function setupCreateBook() {
    var authorSelect = document.getElementById("bookAuthor");
    var genreSelect = document.getElementById("bookGenre");
    
    authors.forEach(author => 
        authorSelect.options.add(new Option(author.name, author.id))
    );
    genres.forEach(genre =>
        genreSelect.options.add(new Option(genre.name, genre.id))
    );
}

//setup details page
function setupDetailsBook() {
    var book = getBook(document.URL.split('?')[1]);

    document.getElementById('bookName').value = book.name;
    document.getElementById('bookDescription').value = book.description;
    document.getElementById('bookPages').value = book.pages;
    document.getElementById('bookRelease').value = book.release;
    document.getElementById('bookAuthor').value = book.authorId;
    document.getElementById('bookGenre').value = book.genreId;
}

//setup edit page
function setupEditBook() {
    var book = getBook(document.URL.split('?')[1]);

    console.log(book);
    setupCreateBook();

    document.getElementById('bookName').value = book.name;
    document.getElementById('bookDescription').value = book.description;
    document.getElementById('bookPages').value = book.pages;
    document.getElementById('bookRelease').value = book.release;
    document.getElementById('bookAuthor').value = book.authorId;
    document.getElementById('bookGenre').value = book.genreId;
}

//getAll Methods
async function getBooks() {
    books = await JSON.parse(localStorage.getItem("books"));
}

async function getAuthors() {
    authors = await JSON.parse(localStorage.getItem("authors"));
}

async function getGenres() {
    genres = await JSON.parse(localStorage.getItem("genres"));
}

//getSingle Methods
function getBook(id) {
    var result;
    books.forEach(obj => {
        if (obj.id == id) {
            result =  obj;
        }
    });

    return result;
}

function getAuthor(id) {
    var result;
    authors.forEach(obj => {
        if (obj.id == id) {
            result = obj;
        }
    });

    return result;
}

function getGenre(id) {
    var result;
    genres.forEach(obj => {
        if (obj.id == id) {
            result = obj;
        }
    });

    return result;
}

//readAll Methods
function readAllBooks() {
    var booksTable = document.getElementById("books_table");
    elements = '';
    books.forEach(book => { 
        console.log(book);
        elements += readBook(book);
    });

    booksTable.innerHTML = elements;
}

//readSingle Methods
function readBook(obj){
    var author = getAuthor(obj.authorId);
    var genre = getGenre(obj.genreId);

    var element = '<tr><td>'
    + obj.cover + '</td><td onclick="details(' + obj.id + ",'book'" + ')">'
    + obj.name + '</td><td>' 
    + obj.description + '</td><td>' 
    + obj.pages + '</td><td>' 
    + obj.release + '</td><td>' 
    + author.name + '</td><td>'
    + genre.name + '</td><td>'
    + '<span id="editBtn" onclick="edit(' + obj.id + ",'book'" + ')" class="editBtn fa-solid fa-pen-to-square editBtn"></span>'
    + '<span id="deleteBtn" onclick="deleteObj(' + obj.id + ",'book'" + ')" class="deleteBtn fa-solid fa-delete-left"></span>'
    + '</td></tr>';

    return element;
}

//validate inputs
function validateBookValues(obj) {
    var result = "";
    var rgxName = /[^a-z1-9 ]/gmi;

    if (obj.name == "" || rgxName.test(obj.name)) {
        result += "Name must only contain letters and numbers. ";
    }

    return result;
}

//Create Methods
function createBook() {
    var book = getBookValues();
    onCreateBook(book);
}

function onCreateBook(book) {
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
    window.location.href = "./booklist.html";
}

//get input values
function getBookValues() {
    var id = books.length + 2;
    if (document.URL.search == "/[?]/gm") {
    }
    var cover = document.getElementById('bookCover').value;
    var name = document.getElementById('bookName').value;
    var description = document.getElementById('bookDescription').value;
    var pages = document.getElementById('bookPages').value;
    var release = document.getElementById('bookRelease').value;
    var authorId = document.getElementById('bookAuthor').value;
    var genreId = document.getElementById('bookGenre').value;

    return obj = {id: id, cover: cover, name: name, description: description, pages: pages, release: release, authorId: authorId, genreId: genreId};
}

//Update Methods
function updateBook() {
    var book = getBookValues();
    book.id = document.URL.split('?')[1];
    
    books = books.filter(i => i.id != book.id);

    onCreateBook(book);

    window.location.href = "./booklist.html";
}

//Delete Methods
function deleteObj(id, type) {
    switch (type) {
        case "book":
            var newBooks = books.filter(book => book.id != id);
        
            localStorage.setItem("books", JSON.stringify(newBooks));
            location.reload();
            break;
        case "author":
            break;
        case "genre":
            break;
    }
}

//Edit Methods
function edit(id, type) {
    switch (type) {
        case "book":
            window.location.href = "./editBook.html?" + id;
            break;
        case "author":
            window.location.href = "./editAuthor.html?" + id;
            break;
        case "genre":
            window.location.href = "./editGenre.html?" + id;
            break;
    }
}

//Details Methods
function details(id, type) {
    switch (type) {
        case "book":
            window.location.href = "./detailsBook.html?" + id; 
            break;
        case "author":
            window.location.href = "./detailsAuthor.html?" + id; 
            break;
        case "genre":
            window.location.href = "./detailsGenre.html?" + id; 
            break;
    }
}

//Cancel Methods
function cancel(type) {
    switch (type) {
        case "book":
            window.location.href = "../books/booklist.html";
            break;
        case "author":
            window.location.href = "../authors/authorlist.html";
            break;
        case "genre":
            window.location.href = "../genres/genrelist.html";
            break;
    }
}