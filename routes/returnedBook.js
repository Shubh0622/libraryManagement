const express = require('express');

const returnedBookController = require('../controllers/returnedBook')

const router = express.Router();

router.post('/add-returnedBook',returnedBookController.postAddReturnedBook);

router.get('/get-returnedBooks',returnedBookController.getReturnedBooks)

module.exports = router;