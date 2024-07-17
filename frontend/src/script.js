//instance variables
var authors;
var genres;

const paginationAmount = 5;
var paginationMax;
var pagination = 0;

const SERVER_URL = "http://localhost:3000/";
const SERVER_URL_BOOKS = SERVER_URL + "books/";
const SERVER_URL_GENRES = SERVER_URL + "genres/";
const SERVER_URL_AUTHORS = SERVER_URL + "authors/";

async function getBooks() {
    var result;
    await sendRequest(SERVER_URL_BOOKS).then(res => {
        result = JSON.parse(res);
    });
    
    return result;
}

async function getBook(id) {
    var result;
    await sendRequest(SERVER_URL_BOOKS + id).then(res => {
        result = JSON.parse(res);
    });
    return result;
}

async function onCreateBook(obj) {
    var url = SERVER_URL_BOOKS + `create/${obj.cover == "" ? "cover" : obj.cover}/${obj.name}/${obj.description}/${obj.pages}/${obj.release}/${obj.authorId}/${obj.genreId}`;
    await sendRequest(url).then( window.location.href = "./booklist.html" );
}

async function updateBook(obj) {
    var url = SERVER_URL_BOOKS + `update/${localStorage.getItem('editId')}/${obj.cover == "" ? "cover" : obj.cover}/${obj.name}/${obj.description}/${obj.pages}/${obj.release}/${obj.authorId}/${obj.genreId}`;
    await sendRequest(url).then( window.location.href = "./booklist.html" );
}

async function deleteBook(id) {
    var url = SERVER_URL_BOOKS + `delete/${id}`;
    await sendRequest(url).then( window.location.reload());
}

async function getAuthors() {
    var result;
    await sendRequest(SERVER_URL_AUTHORS).then(res => {
        result = JSON.parse(res);
    });
    return result;
}

async function getAuthor(id) {
    var result;
    await sendRequest(SERVER_URL_AUTHORS + id).then(res => {
        result = JSON.parse(res);
    });
    return result;
}

async function onCreateAuthor(obj) {
    var url = SERVER_URL_AUTHORS + `create/${obj.name}/${obj.dateOfBirth}`;
    await sendRequest(url).then( window.location.href = './genrelist.html');
}

async function updateAuthor(obj) {
    var url = SERVER_URL_AUTHORS + `update/${obj.name}/${obj.dateOfBirth}`;
    await sendRequest(url).then( window.location.href = './genrelist.html');
}

async function deleteAuthor(id) {
    var url = SERVER_URL_AUTHORS + `delete/${id}`;
    await sendRequest(url).then( window.location.reload());
}

async function getGenres() {
    var result;
    await sendRequest(SERVER_URL_GENRES).then(res => {
        result = JSON.parse(res);
    });
    return result;
}

async function getGenre(id) {
    var result;
    await sendRequest(SERVER_URL_GENRES + id).then(res => {
        result = JSON.parse(res);
    });
    return result;
}

async function onCreateGenre(obj) {
    var url = SERVER_URL_GENRES + `create/${obj.name}`;
    await sendRequest(url).then( window.location.href = './genrelist.html');
}

async function updateGenre(obj) {
    var url = SERVER_URL_GENRES + `update/${localStorage.getItem('editId')}/${obj.name}`;
    await sendRequest(url).then( window.location.href('./genrelist.html'));
}

async function deleteGenre(id) {
    var url = SERVER_URL_GENRES + `delete/${id}`;
    await sendRequest(url).then( window.location.reload());
}

//Send a http get request
async function sendRequest(url) {
    var res;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        } else {
            res = await response.text();
        }
    } catch (error) {
        console.log(error.message);
    }
    return res;
}

//ReadAll function
function readAll() {
    //Set list and currentElements
    var list = JSON.parse(localStorage.getItem('list'));
    var currentElements = list.slice(Math.ceil(pagination * paginationAmount), Math.ceil(pagination * paginationAmount + paginationAmount));
    
    //Add elements to table
    var elements = '';
    var currentTable = document.getElementById("list_table");
    var count = 1;
    currentElements.forEach(obj => {
        elements += read(obj, count);
        count++;
    });
    currentTable.innerHTML = elements;
}

//Fills the instance variables if its a new Session
if (window.sessionStorage.getItem("isNewSession") !== "0") {
    
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
        switch(localStorage.getItem('pageType')) {
            case 'book':
                getBooks().then(result => {
                    localStorage.setItem('list', JSON.stringify(result));
                    paginationMax = JSON.parse(result.length);
                    setPaginationPage();
                    checkIfPaginationDisabled();
                    readAll();
                });
                break;
            case 'author':
                getAuthors().then(result => {
                    localStorage.setItem('list', JSON.stringify(result));
                    paginationMax = JSON.parse(result.length);
                    setPaginationPage();
                    checkIfPaginationDisabled();
                    readAll();
                });
            case 'genre':
                getGenres().then(result => { 
                    localStorage.setItem('list', JSON.stringify(result));
                    console.log(JSON.parse(result.length));
                    paginationMax = JSON.parse(result.length);
                    setPaginationPage();
                    checkIfPaginationDisabled();
                    readAll();
                });
        }
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
    getBook(localStorage.getItem('editBookId')).then(result => {
        var book = result[0];
        setupCreateBook();
    
        document.getElementById('bookName').value = book.name;
        document.getElementById('bookDescription').value = book.description;
        document.getElementById('bookPages').value = book.pages;
        document.getElementById('bookRelease').value = book.release;
        document.getElementById('bookAuthor').value = book.authorId;
        document.getElementById('bookGenre').value = book.genreId;
    });
}

//getAll functions
async function getAuthorsAsync() {
    authors = await JSON.parse(localStorage.getItem("authors"));
}

//getSingle functions
function getAuthor(id) {
    return authors.find((obj) => obj.id == id);
}

//readSingle function
function read(obj, count) {
    var element;
    switch (localStorage.getItem('pageType')) {
        case "book":
            var author = getAuthor(obj.authorId);
            var genre = getGenre(obj.genreId);
            element = `<tr>
                <td scope="row">${count}</td>
                <td>${obj.cover}</td>
                <td onclick="details('${obj._id}')">${obj.name}</td>
                <td>${author.name}</td>
                <td>${genre.name}</td>
                <td>
                    <span id="editBtn" onclick="edit('${obj._id}')" class="editBtn fa-solid fa-pen-to-square"></span>
                    <span id="deleteBtn" onclick="deleteObj('${obj._id}')" class="deleteBtn fa-solid fa-delete-left"></span>
                </td>
            </tr>`
            break;
        case "author":
            element = `<tr>
                <td scope="row">${count}</td>
                <td onclick="details('${obj._id}')">${obj.name}</td>
                <td>${obj.dateOfBirth}</td>
                <td>
                    <span id="editBtn" onclick="edit('${obj._id})" class="editBtn fa-solid fa-pen-to-square"></span>
                    <span id="deleteBtn" onclick="deleteObj('${obj._id}')" class="deleteBtn fa-solid fa-delete-left"></span>
                </td>
            </tr>`
            break;
        case "genre":
            element = `<tr>
                <td scope="row">${count}</td>
                <td onclick="details('${obj._id}')">${obj.name}</td>
                <td>
                    <span id="editBtn" onclick="edit('${obj._id}')" class="editBtn fa-solid fa-pen-to-square"></span>
                    <span id="deleteBtn" onclick="deleteObj('${obj._id}') class="deleteBtn fa-solid fa-delete-left"></span>
                </td>
            </tr>`
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

//get input values
function getBookValues() {
    var cover = document.getElementById('bookCover').value;
    var name = document.getElementById('bookName').value;
    var description = document.getElementById('bookDescription').value;
    var pages = document.getElementById('bookPages').value;
    var release = document.getElementById('bookRelease').value;
    var authorId = document.getElementById('bookAuthor').value;
    var genreId = document.getElementById('bookGenre').value;

    return obj = {cover: cover, name: name, description: description, pages: pages, release: release, authorId: authorId, genreId: genreId};
}

function getAuthorValues() {
    var name = document.getElementById('authorName').value;
    var dateOfBirth = document.getElementById('authorDateOfBirth').value;

    return obj = {name: name, dateOfBirth: dateOfBirth};
}

function getGenreValues() {
    var name = document.getElementById('genreName').value;

    return obj = {name: name};
}

//Update function
function update() {
    switch (localStorage.getItem('pageType')) {
        case "book":
            updateBook(getBookValues());
            break;
        case "author":
            updateAuthor(getAuthorValues());
            break;
        case "genre":
            updateGenre(getGenreValues());
            break;
    }
}

//Delete function
function deleteObj(id) {
    switch (localStorage.getItem('pageType')) {
        case "book":
            deleteBook(id);
        case "author":
            deleteAuthor(id);
            break;
        case "genre":
            deleteGenre(id);
            break;
    }
}

//Edit function
function edit(id) {
    switch (localStorage.getItem('pageType')) {
        case "book":
            localStorage.setItem('editId', id);
            window.location.href = "./editBook.html";

            break;
        case "author":
            window.location.href = "./editAuthor.html";
            break;
        case "genre":
            localStorage.setItem('editIt', id);
            window.location.href = "./editGenre.html";
            break;
    }
}

//Details function
function details(id) {
    switch (localStorage.getItem('pageType')) {
        case "book":
            window.location.href = "./detailsBook.html";
            break;
        case "author":
            window.location.href = "./detailsAuthor.html";
            break;
        case "genre":
            window.location.href = "./detailsGenre.html";
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
            pagination = Math.ceil(paginationMax / paginationAmount);
            break;
    }
    setPaginationPage();
    checkIfPaginationDisabled();
    readAll();
}

function checkIfPaginationDisabled() {
    if ((Math.ceil(paginationMax / paginationAmount) - 1) < 0) {
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
        if (pagination != Math.ceil(paginationMax / paginationAmount) -1) {
            document.getElementById('paginationRight').disabled = false;
            document.getElementById('paginationLast').disabled = false;
        } else {
            document.getElementById('paginationRight').disabled = true;
            document.getElementById('paginationLast').disabled = true;
        }
    }
}

function setPaginationPage() {
    document.getElementById('paginationPage').innerHTML = (pagination + 1) + ' / ' + Math.ceil(paginationMax / paginationAmount);
}