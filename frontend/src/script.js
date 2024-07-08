//instance variables
var books;
var authors;
var genres;

const paginationAmount = 2;
var pagination = 0;

getBooksAsync();
getAuthorsAsync();
getGenresAsync();

//Fills the instance variables if its a new Session
if (window.sessionStorage.getItem("isNewSession") !== "0") {
    var booksJson = '[{"id":"1","cover":"cover","name":"name","description":"description","pages":"300","release":"2020-01-30","authorId":"1","genreId":"1"},{"id":"2","cover":"cover","name":"name","description":"description","pages":"300","release":"2020-01-30","authorId":"2","genreId":"2"}]';
    localStorage.setItem('books', booksJson);
    
    var authorsJson = '[{"id":"1","name":"PierceBrown","dateOfBirth":"1988-01-28"},{"id":"2","name":"BrandonSanderson","dateOfBirth":"1975-12-19"}]';
    localStorage.setItem('authors', authorsJson);

    var genresJson = '[{"id":"1","name":"ScienceFiction"},{"id":"2","name":"Fantasy"}]';
    localStorage.setItem('genres', genresJson);
    
    localStorage.setItem('pagination', 0);
    
    window.sessionStorage.setItem("isNewSession", "0");
}

//Sets the page type
if (document.title.includes("Book")) {
    localStorage.setItem('pageType', 'book');
} else if (document.title.includes("Author")) {
    localStorage.setItem('pageType', 'author')
} else if (document.title.includes("Genre")) {
    localStorage.setItem('pageType', 'genre');
}

//set onload for list page
if (document.title.includes("overview")) {
    window.onload = () => {
        setPaginationPage();
        checkIfPaginationDisabled();
        readAll();
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
    window.onload = () => setupDetailsAuthor();

} else if (document.title == "Genre edit") {
    window.onload = () => setupDetailsGenre();
}

//set onload for details
if (document.title == "Book details") {
    window.onload = () => setupDetailsBook();
} else if (document.title == "Author details") {
    window.onload = () => setupDetailsAuthor();
} else if (document.title == "Genre details") {
    window.onload = () => setupDetailsGenre();
}

//setup create page
function setupCreateBook() {
    var authorSelect = document.getElementById("bookAuthor");
    var genreSelect = document.getElementById("bookGenre");
    
    authors.forEach(author => authorSelect.options.add(new Option(author.name, author.id)));
    genres.forEach(genre => genreSelect.options.add(new Option(genre.name, genre.id)));
}

//setup details
function setupDetailsBook() {
    var book = getBook(document.URL.split('?')[1]);

    document.getElementById('bookName').value = book.name;
    document.getElementById('bookDescription').value = book.description;
    document.getElementById('bookPages').value = book.pages;
    document.getElementById('bookRelease').value = book.release;
    document.getElementById('bookAuthor').value = book.authorId;
    document.getElementById('bookGenre').value = book.genreId;
}

function setupDetailsAuthor() {
    console.log(localStorage.getItem('pageType'));
    var author = getAuthor(document.URL.split('?')[1]);

    document.getElementById('authorName').value = author.name;
    document.getElementById('authorDateOfBirth').value = author.dateOfBirth;
}

function setupDetailsGenre() {
    var genre = getGenre(document.URL.split('?')[1]);

    document.getElementById('genreName').value = genre.name;
}

//setup edit page
function setupEditBook() {
    var book = getBook(document.URL.split('?')[1]);

    setupCreateBook();

    document.getElementById('bookName').value = book.name;
    document.getElementById('bookDescription').value = book.description;
    document.getElementById('bookPages').value = book.pages;
    document.getElementById('bookRelease').value = book.release;
    document.getElementById('bookAuthor').value = book.authorId;
    document.getElementById('bookGenre').value = book.genreId;
}

//getAll functions
async function getBooksAsync() {
    books = await JSON.parse(localStorage.getItem("books"));
}

async function getAuthorsAsync() {
    authors = await JSON.parse(localStorage.getItem("authors"));
}

async function getGenresAsync() {
    genres = await JSON.parse(localStorage.getItem("genres"));
}

//getSingle functions
function getBook(id) {
    return books.find((obj) => obj.id == id);
}

function getAuthor(id) {
    return authors.find((obj) => obj.id == id);
}

function getGenre(id) {
    return genres.find((obj) => obj.id == id);
}

//readAll function
function readAll() {
    var currentElements;
    var currentTable;
    switch (localStorage.getItem('pageType')) {
        case "book":
            books = books.sort((a, b) => a.id - b.id);
            currentElements = books.slice(pagination * paginationAmount, pagination * paginationAmount + paginationAmount);
            currentTable = document.getElementById("books_table");
            break;
        case "author":
            authors.sort((a,b) => a.id - b.id);
            currentElements = authors.slice(pagination * paginationAmount, pagination * paginationAmount + paginationAmount);
            currentTable = document.getElementById("authors_table");
            break;
        case "genre":
            genres.sort((a,b) => a.id - b.id);
            currentElements = genres.slice(pagination * paginationAmount, pagination * paginationAmount + paginationAmount);
            currentTable = document.getElementById("genres_table");
            break;
    }
    elements = '';
    currentElements.forEach(obj => {elements += read(obj);});
    currentTable.innerHTML = elements;
}

//readSingle function
function read(obj) {
    var element;
    switch (localStorage.getItem('pageType')) {
        case "book":
            var author = getAuthor(obj.authorId);
            var genre = getGenre(obj.genreId);
            var element = '<tr><td>'
            + obj.cover + '</td><td onclick="details(' + obj.id + ')">'
            + obj.name + '</td><td>'
            + obj.description + '</td><td>'
            + obj.pages + '</td><td>'
            + obj.release + '</td><td>'
            + author.name + '</td><td>'
            + genre.name + '</td><td>'
            + '<span id="editBtn" onclick="edit(' + obj.id + ')" class="editBtn fa-solid fa-pen-to-square editBtn"></span>'
            + '<span id="deleteBtn" onclick="deleteObj(' + obj.id + ')" class="deleteBtn fa-solid fa-delete-left"></span>'
            + '</td></tr>';
            break;
        case "author":
            element = '<tr><td onclick="details(' + obj.id + ')">'
            + obj.name + '</td><td>' 
            + obj.dateOfBirth + '</td><td>'
            + '<span id="editBtn" onclick="edit(' + obj.id + ')" class="editBtn fa-solid fa-pen-to-square editBtn"></span>'
            + '<span id="deleteBtn" onclick="deleteObj(' + obj.id + ')" class="deleteBtn fa-solid fa-delete-left"></span>'
            + '</td></tr>';
            break;
        case "genre":
            element = '<tr><td onclick="details(' + obj.id + ')">'
            + obj.name + '</td><td>' 
            + '<span id="editBtn" onclick="edit(' + obj.id + ')" class="editBtn fa-solid fa-pen-to-square editBtn"></span>'
            + '<span id="deleteBtn" onclick="deleteObj(' + obj.id + ')" class="deleteBtn fa-solid fa-delete-left"></span>'
            + '</td></tr>';
            break;
    }

    return element;
}

//Create functions
function create() {
    switch (localStorage.getItem('pageType')) {
        case "book":
            onCreateBook(getBookValues());
            break;
        case "author":
            onCreateAuthor(getAuthorValues());
            break;
        case "genre":
            onCreateGenre(getGenreValues());
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

function onCreateGenre(obj) {
    genres.push(obj);
    localStorage.setItem("genres", JSON.stringify(genres));
    window.location.href = "./genrelist.html";
}

//get input values
function getBookValues() {
    var id = books.length + 2;
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
    var name = document.getElementById('authorName').value;
    var dateOfBirth = document.getElementById('authorDateOfBirth').value;

    return obj = {id: id, name: name, dateOfBirth: dateOfBirth};
}

function getGenreValues() {
    id = genres.length +2;
    var name = document.getElementById('genreName').value;

    return obj = {id: id, name: name};
}

//Update function
function update() {
    switch (localStorage.getItem('pageType')) {
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
            var genre = getGenreValues();
            genre.id = document.URL.split('?')[1];

            genres = genres.filter(i => i.id != genre.id);

            onCreateGenre(genre);

            window.location.href = "./genrelist.html";
            break;
    }
}

//Delete function
function deleteObj(id) {
    switch (localStorage.getItem('pageType')) {
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
            var newGenres = genres.filter(genre => genre.id != id);

            localStorage.setItem("genres", JSON.stringify(newGenres));
            location.reload();
            break;
    }
}

//Edit function
function edit(id) {
    switch (localStorage.getItem('pageType')) {
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

//Details function
function details(id) {
    switch (localStorage.getItem('pageType')) {
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

//Cancel function
function cancel() {
    switch (localStorage.getItem('pageType')) {
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

function paginate(type) {
    switch (type) {
        case 'first':
            pagination = 0;
            break;
        case 'left':
            pagination -= 1;
            break;
        case 'right':
            pagination += 1;
            break;
        case 'last':
            pagination = Math.ceil((localStorage.getItem('pageType') == 'book' ? books.length : localStorage.getItem('pageType') == 'author' ? authors.length : genres.length) / paginationAmount - 1);
            break;
    }
    setPaginationPage();
    checkIfPaginationDisabled();
    readAll();
}

function checkIfPaginationDisabled() {
    if ((Math.ceil((localStorage.getItem('pageType') == 'book' ? books.length : (localStorage.getItem('pageType') == 'author' ? authors.length : genres.length)) / paginationAmount) - 1) < 0) {
        document.getElementById('paginationLeft').disabled = true;
        document.getElementById('paginationFirst').disabled = true;
        document.getElementById('paginationRight').disabled = true;
        document.getElementById('paginationLast').disabled = true;
    } else {
        //check if paginationLeft is disabled
        if (pagination > 0) {
            document.getElementById('paginationLeft').disabled = false;
            document.getElementById('paginationFirst').disabled = false;
        } else {
            document.getElementById('paginationLeft').disabled = true;
            document.getElementById('paginationFirst').disabled = true;
        }
        //check if paginationRight is disabled using ternary operator
        if (pagination != Math.ceil((localStorage.getItem('pageType') == 'book' ? books.length : (localStorage.getItem('pageType') == 'author' ? authors.length : genres.length)) / paginationAmount - 1)) {
            document.getElementById('paginationRight').disabled = false;
            document.getElementById('paginationLast').disabled = false;
        } else {
            document.getElementById('paginationRight').disabled = true;
            document.getElementById('paginationLast').disabled = true;
        }
    }
}

function setPaginationPage() {
    document.getElementById('paginationPage').innerHTML = (pagination + 1) + ' / ' + Math.ceil((localStorage.getItem('pageType') == 'book' ? books.length : (localStorage.getItem('pageType') == 'author' ? authors.length : genres.length)) / paginationAmount);
}