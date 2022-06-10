var express = require('express');
var router = express.Router();

const bookController=require('../controllers/bookController');

router.get('/book',bookController.showBooks);
router.post('/book',bookController.addBook);
router.patch('/book/:id',bookController.updateBook);
router.delete('/book/:id',bookController.deleteBook);
router.get('/library',bookController.availableBooks);
router.get('/library/book/:id',bookController.getBook);

module.exports = router;