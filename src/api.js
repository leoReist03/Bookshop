var popupOverlay;

window.onload = () => {
    getBookListReady();
    popupOverlay = document.getElementById('popupOverlay');
    popupOverlay.addEventListener('click', function(event) {
        if (event.target.id == 'popupOverlay') {
            closePopup();
        }
    });
}

function getBookListReady() {
    fetchBooksAsync().then(function(books) {
        for (let i = 10; i > 0; i--) {
            addBook(books[i]);
        }
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

function addBook(book) {
    //create div
    var element = document.createElement("div");
    element.classList.add("book");

    //create the image tag for the cover
    var img = document.createElement("img");
    img.classList.add("bookCover");
    img.setAttribute("src", book.bookImage);
    img.addEventListener('click', function(){openPopup(book.bookIsbn)});

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

