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
    
    var authorsJson = '[{"id":"1","name":"PierceBrown","dateOfBirth":"1988-01-28"},{"id":"2","name":"BrandonSanderson","dateOfBirth":"1975-12-19"}]';
    localStorage.setItem('authors', authorsJson);

    var genresJson = '[{"id":"1","name":"ScienceFiction"},{"id":"2","name":"Fantasy"}]';
    localStorage.setItem('genres', genresJson);
    
    window.sessionStorage.setItem("isNewSession", "0");
}

//set onload for list page
if (document.title == "Books overview") {
    window.onload = function () {
        readAll("book");
    }
} else if (document.title == "Authors overview") {
    window.onload = function () {
        readAll("author");
    }
} else if (document.title == "Genre overview") {
    window.onload = function () {
        readAll("genre");
    }
}

//set onload for create page
if (document.title == "Book create") {
    window.onload = () => setupCreateBook();
}

//set onload for edit page
if (document.title == "Book edit") {
    window.onload = () => setupEditBook();
} else if (document.title == "Author edit") {
    window.onload = () => setupEditAuthor();

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

function setupEditAuthor() {
    var author = getAuthor(document.URL.split('?')[1]);

    document.getElementById('authorName').value = author.name;
    document.getElementById('authorDateOfBirth').value = author.dateOfBirth;
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

//readAll method
function readAll(type) {
    switch (type) {
        case "book":
            var booksTable = document.getElementById("books_table");
            elements = '';
            books.forEach(obj => {
                elements += readBook(obj);
            });
        
            booksTable.innerHTML = elements;
            break;
        case "author":
            var authorsTable = document.getElementById("authors_table");
            elements = '';
            authors.forEach(obj => {
                elements += readAuthor(obj);
            });
        
            authorsTable.innerHTML = elements;
            break;
        case "genre":
            var genresTable = document.getElementById("genres_table");
            elements = '';
            authors.forEach(obj => {
                elements += readGenre(obj);
            });
        
            genresTable.innerHTML = elements;
            break;
    }
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

function readAuthor(obj){
    var element = '<tr><td>'
    + obj.name + '</td><td>' 
    + obj.dateOfBirth + '</td><td>'
    + '<span id="editBtn" onclick="edit(' + obj.id + ",'author'" + ')" class="editBtn fa-solid fa-pen-to-square editBtn"></span>'
    + '<span id="deleteBtn" onclick="deleteObj(' + obj.id + ",'author'" + ')" class="deleteBtn fa-solid fa-delete-left"></span>'
    + '</td></tr>';

    return element;
}

//Create Methods
function create(type) {
    switch (type) {
        case "book":
            var book = getBookValues();
            onCreateBook(book);
            break;
        case "author":
            var author = getAuthorValues();
            onCreateAuthor(author);
            break;
        case "genre":
            break;
    }
}

function onCreateBook(obj) {
    books.push(obj);
    localStorage.setItem("books", JSON.stringify(books));
    window.location.href = "./booklist.html";
}

function onCreateAuthor(obj) {
    authors.push(obj);
    localStorage.setItem("authors", JSON.stringify(authors));
    window.location.href = "./authorlist.html";
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

function getAuthorValues() {
    var id = authors.length + 2;
    if (document.URL.search == "/[?]/gm") {
    }
    var name = document.getElementById('authorName').value;
    var dateOfBirth = document.getElementById('authorDateOfBirth').value;

    return obj = {id: id, name: name, dateOfBirth: dateOfBirth}
}

//Update Methods
function update(type) {
    switch (type) {
        case "book":
            var book = getBookValues();
            book.id = document.URL.split('?')[1];
            
            books = books.filter(i => i.id != book.id);
        
            onCreateBook(book);
        
            window.location.href = "./booklist.html";
            break;
        case "author":
            var author = getAuthorValues();
            author.id = document.URL.split('?')[1];
            
            authors = authors.filter(i => i.id != author.id);
        
            onCreateAuthor(author);
        
            window.location.href = "./authorlist.html";
            break;
        case "genre":
            break;
    }
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
            var newAuthors = authors.filter(author => author.id != id);
        
            localStorage.setItem("authors", JSON.stringify(newAuthors));
            location.reload();
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