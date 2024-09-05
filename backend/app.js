const express = require('express');
const app = express();
const cors = require('cors');
const bp = require('body-parser')

//Root route
app.get('/', (req, res) => {
    res.send('<h1>This is index</h1>');
});

//Include route files
const booksRoute = require('./routes/books');
const genresRoute = require('./routes/genres');
const authorsRoute = require('./routes/authors');

//Use routes
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use('/books', booksRoute);
app.use('/genres', genresRoute);
app.use('/authors', authorsRoute);

//Set the port
const port = 8000;

//Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});