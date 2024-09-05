const express = require('express');
const router = express.Router();
const constants = require('../constants');
const { body } = require('express-validator');
const controller = require(`../controllers/${constants.DATABASE_SYSTEM}/genresController`);

const validateGenre = [
  body('id').optional().isString(),
  body('name').notEmpty().withMessage(1, "Name is required"),
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

//Pages route
router.get('/pages', (req, res) => {
  controller.pages()
    .then(result => {
      res.send(result);
    });
});

//Create route
router.post('/create', validateGenre, (req, res) => {
  controller.create(req)
    .then(result => {
      sendResponse(res, result);
    });
});

//Update route
router.get('/update', validateGenre, (req, res) => {
  controller.update(req)
    .then(result => {
      sendResponse(res, result)
  });
});

//Delete route
router.get('/delete', (req, res) => {
  controller.deleteObj(req)
    .then(result => {
      sendResponse(res, result);
  });
});

//Send response to the frontend
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