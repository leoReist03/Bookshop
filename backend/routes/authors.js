const express = require('express');
const router = express.Router();
const constants = require('../constants');
const { body } = require('express-validator');
var controller;
if (constants.DATABASE_SYSTEM == 'mysql') {
  controller = require('../controllers/mysql/authorsController');
} else {
  controller = require('../controllers/mongodb/authorsController');
}

const validateAuthor = [
  body('id').optional().isString(),
  body('name').notEmpty().withMessage('Name is required'),
  body('about').notEmpty().withMessage('About is required'),
  body('dateOfBirth').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Date must be in YYYY-MM-DD format'),
  body('picture').optional().isString(),
];

//Root route
router.get('/', (req, res) => {
    controller.read(req.query.query)
              .then(result => {
                res.send(result);
              });
});

//Find one route
router.get('/find/:id', (req, res) => {
    controller.find(req.params.id)
              .then(result => {
                res.send(result);
              });
});

router.post('/create', validateAuthor, (req, res) => {
  controller.create(req)
    .then(result => {
      sendResponse(res, result);
    });
});

//Update route
router.post('/update', validateAuthor, (req, res) => {
  controller.update(req)
    .then(result => {
      sendResponse(res, result);
  });
});

//Delete route
router.post('/delete', (req, res) => {
  controller.deleteObj(req)
    .then(result => {
      sendResponse(res, result);
  });
});

router.get('/pages', (req, res) => {
  controller.pages()
            .then(result => {
              res.send(result);
            });
});

function sendResponse(res, result) {
  if(result.status == 201) {
    res.status(result.status).json({
      message: result.message,
      authorId: result.authorId,
      affectedRows: result.affectedRows
    });
  } else {
    res.status(result.status).json({
      message: result.message,
      error: result.error
    });
  }
}

module.exports = router;