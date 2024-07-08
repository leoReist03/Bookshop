const express = require('express');
const router = express.Router();
const controller = require('../controllers/booksController')

router.get('/', (req, res) => {
    res.send(controller.getAll());
});

module.exports = router;