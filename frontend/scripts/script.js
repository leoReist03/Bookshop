//Pagination vaiables
const paginationAmount = 5;
var paginationMax;
var pagination = 0;

//Url variables
const SERVER_URL = "http://localhost:3000/";
const SERVER_URL_BOOKS = SERVER_URL + "books/";
const SERVER_URL_GENRES = SERVER_URL + "genres/";
const SERVER_URL_AUTHORS = SERVER_URL + "authors/";

//Book api functions
async function getBooks() {
    var result;
    await sendRequest(SERVER_URL_BOOKS).then(res => {
        result = JSON.parse(res);
    });

    return result;
}

async function getBook(id) {
    var result;
    await sendRequest(SERVER_URL_BOOKS + `find/${id}`).then(res => {
        result = JSON.parse(res);
    });

    return result[0];
}

async function createBook() {
    var result;
    await sendRequest(SERVER_URL_BOOKS + `create`).then(res => {
        result = JSON.parse(res);
    });

    return result;
}

async function onCreateBook(obj) {
    var url = SERVER_URL_BOOKS + `onCreate/${obj.cover == "" ? "cover" : obj.cover}/${obj.name}/${obj.description}/${obj.pages}/${obj.release}/${obj.authorId}/${obj.genreId}`;
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

//Author api functions
async function getAuthors() {
    var result;
    await sendRequest(SERVER_URL_AUTHORS).then(res => {
        result = JSON.parse(res);
    });

    return result;
}

async function getAuthor(id) {
    var result;
    await sendRequest(SERVER_URL_AUTHORS + `find/${id}`).then(res => {
        result = JSON.parse(res);
    });

    return result[0];
}

async function onCreateAuthor(obj) {
    var url = SERVER_URL_AUTHORS + `onCreate/${obj.name}/${obj.dateOfBirth}`;
    await sendRequest(url).then( window.location.href = './authorlist.html');
}

async function updateAuthor(obj) {
    var url = SERVER_URL_AUTHORS + `update//${localStorage.getItem('editId')}/${obj.name}/${obj.dateOfBirth}`;
    await sendRequest(url).then( window.location.href = './authorlist.html');
}

async function deleteAuthor(id) {
    var url = SERVER_URL_AUTHORS + `delete/${id}`;
    await sendRequest(url).then( window.location.reload());
}

//Genre api functions
async function getGenres() {
    var result;
    await sendRequest(SERVER_URL_GENRES).then(res => {
        result = JSON.parse(res);
    });

    return result;
}

async function getGenre(id) {
    var result;
    await sendRequest(SERVER_URL_GENRES + `find/${id}`).then(res => {
        result = JSON.parse(res);
    });
    
    return result[0];
}

async function onCreateGenre(obj) {
    var url = SERVER_URL_GENRES + `onCreate/${obj.name}`;
    await sendRequest(url).then( window.location.href = './genrelist.html' );
}

async function updateGenre(obj) {
    var url = SERVER_URL_GENRES + `update/${localStorage.getItem('editId')}/${obj.name}`;
    await sendRequest(url).then( window.location.href = './genrelist.html' );
}

async function deleteGenre(id) {
    var url = SERVER_URL_GENRES + `delete/${id}`;
    await sendRequest(url).then( window.location.reload());
}

//Send a http get request
async function sendRequest(url) {
    var res;
    try {
        //Send the request
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        //Handle the response
            res = await response.text();

    //Handle error
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

    //Add table to view
    currentTable.innerHTML = elements;
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
                    checkPagination();
                    readAll();
                });
                break;
            case 'author':
                getAuthors().then(result => {
                    localStorage.setItem('list', JSON.stringify(result));
                    paginationMax = JSON.parse(result.length);
                    setPaginationPage();
                    checkPagination();
                    readAll();
                });
                break;
            case 'genre':
                getGenres().then(result => { 
                    localStorage.setItem('list', JSON.stringify(result));
                    paginationMax = JSON.parse(result.length);
                    setPaginationPage();
                    checkPagination();
                    readAll();
                });
                break;
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
    createBook().then(result => {
        //Fill author select
        var authorSelect = document.getElementById("bookAuthor");
        result.authors.forEach(author => authorSelect.options.add(new Option(author.name, author._id)));

        //Fill genre select
        var genreSelect = document.getElementById("bookGenre");
        result.genres.forEach(genre => genreSelect.options.add(new Option(genre.name, genre._id)));
    });
}

//setup details
function setupDetailsBook() {
    getBook(localStorage.getItem('editId')).then(book => {
        document.getElementById('bookName').value = book.name;
        document.getElementById('bookDescription').value = book.description;
        document.getElementById('bookPages').value = book.pages;
        document.getElementById('bookRelease').value = book.release;
        document.getElementById('bookAuthor').value = book.authorId;
        document.getElementById('bookGenre').value = book.genreId;
    });
}

function setupDetailsAuthor() {
    getAuthor(localStorage.getItem('editId')).then(author => {
        document.getElementById('authorName').value = author.name;
        document.getElementById('authorDateOfBirth').value = author.dateOfBirth;
    });
}

function setupDetailsGenre() {
    getGenre(localStorage.getItem('editId')).then(genre => {
        document.getElementById('genreName').value = genre.name;
    });
}

//setup edit page
function setupEditBook() {
    getBook(localStorage.getItem('editId')).then(book => {
        setupCreateBook();
    
        document.getElementById('bookName').value = book.name;
        document.getElementById('bookDescription').value = book.description;
        document.getElementById('bookPages').value = book.pages;
        document.getElementById('bookRelease').value = book.release;
        document.getElementById('bookAuthor').value = book.authorId;
        document.getElementById('bookGenre').value = book.genreId;
    });
}

//readSingle function
function read(obj, count) {
    var element;
    switch (localStorage.getItem('pageType')) {
        case "book":
            element = `<tr>
                <td scope="row">${count}</td>
                <td>${obj.cover}</td>
                <td onclick="details('${obj._id}')">${obj.name}</td>
                <td>${obj.author}</td>
                <td>${obj.genre}</td>
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
                    <span id="editBtn" onclick="edit('${obj._id}')" class="editBtn fa-solid fa-pen-to-square"></span>
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
                    <span id="deleteBtn" onclick="deleteObj('${obj._id}')" class="deleteBtn fa-solid fa-delete-left"></span>
                </td>
            </tr>`
            break;
    }

    return element;
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

//button functions
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

function edit(id) {
    switch (localStorage.getItem('pageType')) {
        case "book":
            localStorage.setItem('editId', id);
            window.location.href = "./editBook.html";

            break;
        case "author":
            localStorage.setItem('editId', id);
            window.location.href = "./editAuthor.html";
            break;
        case "genre":
            localStorage.setItem('editId', id);
            window.location.href = "./editGenre.html";
            break;
    }
}

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

//Pagination functions
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
    checkPagination();
    readAll();
}

function checkPagination() {
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