const express = require('express');
const app = express();

//Root route
app.get('/', (req, res) => {
    res.send('<h1>This is index</h1>');
});

//Include route files
const booksRoute = require('./routes/books');

//Use routes
app.use('/books', booksRoute);

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});