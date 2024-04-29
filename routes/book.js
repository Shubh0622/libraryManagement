const express = require('express');

const bookController = require('../controllers/book');

const router = express.Router();

router.post('/add-book',bookController.postAddBook);

router.get('/get-books',bookController.getBooks);

router.delete('/delete-book/:id',bookController.deleteBook);

module.exports = router;