import * as BookController from '../controllers/BookController.js';
import express from 'express';
import checkToken from '../middleware/authenticationHandler.js';

const bookRoutes = express.Router();

bookRoutes.use(checkToken);
bookRoutes.get('/all', BookController.fetchBooks);
bookRoutes.post('/new', BookController.createBook);
bookRoutes.put('/edit/:bookId', BookController.editBook);
bookRoutes.delete('/delete/:bookId', BookController.deleteBook);

export default bookRoutes;

 