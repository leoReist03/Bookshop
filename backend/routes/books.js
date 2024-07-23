const express = require('express');
const router = express.Router();
const controller = require('../controllers/booksController');

//Root route
router.get('/', (req, res) => {
    controller.read()
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

//Create route
router.get('/create', (req, res) => {
  controller.create()
            .then(result => {
              res.send(result);
            });
});

//OnCreate route
router.get('/onCreate/:cover/:name/:description/:pages/:release/:authorId/:genreId', (req, res) => {
    controller.onCreate(req.params.cover, req.params.name, req.params.description, req.params.pages, req.params.release, req.params.authorId, req.params.genreId)
              .then(result => {
                res.send(result);
              });
});

//Delete route
router.get('/delete/:id/', (req, res) => {
    controller.deleteObj(req.params.id)
              .then(result => {
                res.send(result);
              });
});

//Edit route
router.get('/edit/:id', (req, res) => {
  controller.edit(req.params.id)
            .then(result => {
              res.send(result);
            });
});

//Update route
router.get('/update/:id/:cover/:name/:description/:pages/:release/:authorId/:genreId', (req, res) => {
    controller.update(req.params.id, req.params.cover, req.params.name, req.params.description, req.params.pages, req.params.release, req.params.authorId, req.params.genreId)
              .then(result => {
                res.send(result);
              });
});

module.exports = router;