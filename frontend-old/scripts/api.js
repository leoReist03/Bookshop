var popupOverlay;
var books;
var paginationAmount = getPaginationAmount();
var pagination = 0;
var paginationMax;

window.onload = () => {
    fetchBooksAsync().then(result => {
        books = result;
        paginationMax = Math.ceil(books.length / paginationAmount);
        checkIfPaginationDisabled();
        setPaginationPage();
        readAll();
    });
    popupOverlay = document.getElementById('popupOverlay');
    popupOverlay.addEventListener('click', event => {
        if (event.target.id == 'popupOverlay') {
            closePopup();
        }
    });
}

window.addEventListener("resize", () => {
    paginationAmount = getPaginationAmount();
    checkIfPaginationDisabled();
    setPaginationPage();
    readAll();
});

function readAll() {
    document.getElementById('books').innerHTML = '';
    var currentBooks = books.slice(pagination * paginationAmount, pagination * paginationAmount + paginationAmount);
    currentBooks.forEach(book => {
        addBook(book);
    });
}

async function fetchBooksAsync() {
    const url = 'https://all-books-api.p.rapidapi.com/getBooks';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '8fecabb3eamsh0284d870ab04acbp181749jsn58c76e1594cb',
            'x-rapidapi-host': 'all-books-api.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        return JSON.parse(result);
    } catch (error) {
        console.error(error);
    }
}

async function fetchBookByIsbnAsync(isbn) {
    const url = 'https://all-books-api.p.rapidapi.com/isbn/' + isbn;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '8fecabb3eamsh0284d870ab04acbp181749jsn58c76e1594cb',
            'x-rapidapi-host': 'all-books-api.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        return JSON.parse(result);
    } catch (error) {
        console.error(error);
    }
}

//function to add a book to the page
function addBook(book) {
    //create div
    var element = document.createElement("div");
    element.classList.add("book");

    //create the image tag for the cover
    var img = document.createElement("img");
    img.classList.add("bookCover");
    img.setAttribute("src", book.bookImage);
    img.addEventListener('click', function(){openPopup(book.bookIsbn)});


    book.bookTitle
    book.bookImage

    //create the text field for the name
    var span = document.createElement("span");
    span.classList.add("bookName");
    var title;
    if (book.bookTitle.length > 20) {
        title = book.bookTitle.slice(0, 20);
        title += '...';
    } else {
        title = book.bookTitle;
    }
    span.appendChild(document.createTextNode(title));

    //add the image, br and the text field to the div
    element.appendChild(img);
    element.appendChild(document.createElement("br"));
    element.appendChild(span);

    //add the entire div to the page
    document.getElementById('books').appendChild(element);
}

function openPopup(isbn) {
    fetchBookByIsbnAsync(isbn).then(function(book) {
        document.getElementById('bookImage').src = book.bookImage;
        document.getElementById('bookTitle').innerHTML = book.bookTitle;
        document.getElementById('bookDescription').innerHTML = book.bookDescription;
        document.getElementById('bookAuthor').innerHTML = book.bookAuthor;
        document.getElementById('bookPublisher').innerHTML = book.bookPublisher;
        document.getElementById('amazonBookUrl').text = book.amazonBookUrl;
        document.getElementById('amazonBookUrl').href = book.amazonBookUrl;
    
        popupOverlay.style.display = 'block';
    });
}

function closePopup() {
    popupOverlay.style.display = 'none';
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
            pagination = paginationMax - 1;
            break;
    }
    checkIfPaginationDisabled();
    setPaginationPage();
    readAll();
}

function checkIfPaginationDisabled() {
    if (paginationMax -1 < 0) {
        document.getElementById('paginationLeft').disabled = true;
        document.getElementById('paginationFirst').disabled = true;
        document.getElementById('paginationRight').disabled = true;
        document.getElementById('paginationLast').disabled = true;
    } else {
        if (pagination > 0) {
            document.getElementById('paginationLeft').disabled = false;
            document.getElementById('paginationFirst').disabled = false;
        } else {
            document.getElementById('paginationLeft').disabled = true;
            document.getElementById('paginationFirst').disabled = true;
        }
        if (pagination != paginationMax - 1) {
            document.getElementById('paginationRight').disabled = false;
            document.getElementById('paginationLast').disabled = false;
        } else {
            document.getElementById('paginationRight').disabled = true;
            document.getElementById('paginationLast').disabled = true;
        }
    }
}

function getPaginationAmount() {
    if (window.innerWidth > 1500) {
        return 14;
    } else {
        return 10;
    }
}

function setPaginationPage() {
    document.getElementById('paginationPage').innerHTML = (pagination + 1) + ' / ' + paginationMax;
}