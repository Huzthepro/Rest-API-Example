import express from 'express';
import {
  createMovie,
  getPage,
  searchMovie,
  deleteMovie,
  changeMovie,
} from '../controllers/moviePage.js';

const router = express.Router();

//Get request
router.get('/', getPage);

//Add movie to the list
router.post('/', createMovie);

//Search for a movie in the list
router.get('/:id', searchMovie);

//Delete movie from list
router.delete('/:id', deleteMovie);

//Change movie from list
router.patch('/:id', changeMovie);

export default router;
