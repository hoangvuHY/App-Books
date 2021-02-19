var express = require('express');
var router = express.Router();
const {
  checkTokenMiddleware
} = require('../middleware/auth');
const multerMiddleware = require('../middleware/multerMiddleware');
const {
  createBookController,
  updateBookController,
  deleteBookController,
  findAllBooksController,
  findOneBooksController,
  findBookByNameController,
  uploadImageCtrl
} = require('../controllers/books');

router.use(checkTokenMiddleware);

router.get('/', findAllBooksController);
router.get('/:id', findOneBooksController);

router.post('/create', multerMiddleware.array('many-images', 15), createBookController);
router.put('/update/:id',multerMiddleware.array('updateImages',15), updateBookController);
router.delete('/delete/:id', deleteBookController);

router.post('/search-book-name', findBookByNameController);

router.post('/upload-images', multerMiddleware.array('many-images', 15), uploadImageCtrl)

module.exports = router;
