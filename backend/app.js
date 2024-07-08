const express = require('express');
const fs = require('fs');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

//Include route files
const booksRoute = require('./routes/books');

//Use routes
app.use('/books', booksRoute);

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});