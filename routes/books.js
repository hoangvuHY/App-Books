var express = require('express');
var router = express.Router();
const {
  checkTokenMiddleware
} = require('../middleware/auth');
const {
  createBookController,
  updateBookController,
  deleteBookController,
  findAllBooksController,
  findOneBooksController,
  findBookByNameController
} = require('../controllers/books');

router.use(checkTokenMiddleware);

router.get('/', findAllBooksController);
router.get('/:id', findOneBooksController);

router.post('/create', createBookController);
router.put('/update/:id', updateBookController);
router.delete('/delete/:id', deleteBookController);

router.post('/search-book-name', findBookByNameController);

module.exports = router;
