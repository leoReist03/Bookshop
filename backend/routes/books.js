const express = require('express');
const router = express.Router();
const controller = require('../controllers/booksController')

router.get('/', (req, res) => {
    controller.read().then(result => res.send(result));
});

router.get('/create', (req, res) => {
    controller.create().then(result => result == 1 ? res.send('Book successfully created') : res.send('Failed to create new book'));
})

module.exports = router;