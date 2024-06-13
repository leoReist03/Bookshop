//instance variables
var books;
var authors;
var gerne;

getBooks();
getAuthors();
getGenres();

//get current list page ready
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

//get create page ready
if (document.title == "Book create") {
    getAuthors();
    var authorSelectOptions = document.getElementById("bookAuthors").options;
    authors.forEach(author => 
        authorSelectOptions.add(new Option(author.name))
    );
}

//fill book array
async function getBooks() {
    var booksJson = '[{"id":"1","cover":"cover","name":"name","description":"description","pages":"300","release":"30.01.2020","authorId":"1","genreId":"1"},{"id":"2","cover":"cover","name":"name","description":"description","pages":"300","release":"30.01.2020","authorId":"2","genreId":"2"}]';

    localStorage.setItem('books', booksJson);

    books = JSON.parse(localStorage.getItem("books"));
}

//fill author array
async function getAuthors() {
    var authorsJson = '[{"id":"1","name":"PierceBrown","dateOfBirth":"28.01.1988"},{"id":"2","name":"BrandonSanderson","dateOfBirt":"19.12.1975"}]';

    localStorage.setItem('authors', authorsJson);

    authors = JSON.parse(localStorage.getItem("authors"));
}

//fill genre array
async function getGenres() {
    var genresJson = '[{"id":"1","name":"ScienceFiction"},{"id":"2","name":"Fantasy"}]';

    localStorage.setItem('genres', genresJson);

    genres = JSON.parse(localStorage.getItem("genres"));
}

function readAllBooks() {
    var booksTable = document.getElementById("books_table");
    elements = '';
    books.forEach(book => { 
        elements += readBook(book);
    });

    booksTable.innerHTML = elements;
}

function readBook(obj){
    var author = getAuthor(obj.authorId);
    var genre = getGenre(obj.genreId)
    var element = '<tr><td>'
    + obj.cover + '</td><td>' 
    + obj.name + '</td><td>' 
    + obj.description + '</td><td>' 
    + obj.pages + '</td><td>' 
    + obj.release + '</td><td>' 
    + author.name + '</td><td>'
    + genre.name + '</td><td>'
    + '<span id="editBtn" onclick="editBook(' + obj.id + ')" class="editBtn fa-solid fa-pen-to-square editBtn"></span>'
    + '<span id="deleteBtn" onclick="deleteBook(' + obj.id + ')" class="deleteBtn fa-solid fa-delete-left"></span>'
    + '</td></tr>';

    return element;
}

function getBookValues() {
    var id = books.length + 1;
    var cover = document.getElementById('bookCover').value;
    var name = document.getElementById('bookName').value;
    var description = document.getElementById('bookDescription').value;
    var pages = document.getElementById('bookPages').value;
    var release = document.getElementById('bookRelease').value;
    var authorId = document.getElementById('bookAuthor').value;

    return obj = {id: id, cover: cover, name: name, description: description, pages: pages, release: release, authorId: authorId};
}

function validateBookValues(obj) {
    var result = "";
    var rgxName = /[^a-z1-9 ]/gmi;

    if (obj.name == "" || rgxName.test(obj.name)) {
        result += "Name must only contain letters and numbers. ";
    }

    return result;
}

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

function createBook() {
    var book = getBookValues();

    var result = validateBookValues(book);
    if (result !== "") {
        document.getElementById("errorSpan").innerText = result;
        return;
    }

    books.push(book);
    window.location.href = "./booklist.html";
}

function deleteBook(id) {
    books = books.filter((obj) => obj.id !== id);
}

//get book values from url
if (document.title.search("edit")) {
    var book = getBook(document.URL.split('?')[1]);
    var author = getAuthor(book.authorId);
    
    document.getElementById('bookName').value = book.name;
    document.getElementById('bookDescription').value = book.description;
    document.getElementById('bookPages').value = book.pages;
    document.getElementById('bookRelease').value = book.release;
    document.getElementById('bookAuthor').value = author.name;
}

function editBook(id) {
    window.location.href = "./editBook.html?" + id;
}

function cancel(){
    window.location.href = "../books/booklist.html";
}