import { movieList, deleteMovieFromList } from '../data/movieList.js';
import { v4 as uuidv4 } from 'uuid';

//  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓  Get movie page  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
function getPage(req, res) {
  res.status(200).send({
    msg: `Welcome Movie Page`,
    movieList
  });
}

//  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓  Search movie  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
function searchMovie(req, res) {
  const { id } = req.params;
  const foundMovie = findMovie('id', id);
  if (foundMovie) {
    res
      .status(200)
      .send({ msg: `Movie EXIST successfully`, movie: foundMovie });
  } else {
    res.status(404).send({
      msg: `Nothing to FIND`,
      Searched_Id: `${id}`,
    });
  }
}

//  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓  Create movie  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
async function createMovie(req, res) {
  const { title, director, release_date } = req.body;
  //Check if 3 required value entered
  if (title && director && release_date) {
    // Check if Movie is already on database
    if (findMovie('title', title)) {
      res.status(400).send({
        msg: `This movie already exist`,
        movie: `${title}`,
      });
    } else {
      const newMovie = {
        title: title,
        director: director,
        release_date: release_date,
        id: uuidv4(),
      };
      movieList.push(newMovie); //...movie (not used because: it is problematic)

      res.status(200).send({
        msg: `Movie CREATED successfully`,
        movie: `${newMovie.title}`,
        Id: `${newMovie.id}`,
      });
    }
  } else {
    res.status(400).send({
      msg: `To add movie you must fill: Title, Director, Release Date`,
    });
  }
}

//  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓  Change movie  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
function changeMovie(req, res) {
  const { id } = req.params;
  const { title, director, release_date } = req.body;
  const movieToBeUpdated = findMovie('id', id);
  const changes = [];

  //If movie exist
  if (movieToBeUpdated) {
    // ↓ ↓ Check Title ↓ ↓
    if (title && title != movieToBeUpdated.title) {
      if (findMovie('title', title)) {
        res.status(400).send({
          msg: `This movie is already exist (You can't change name to already existing one, delete other one first.)`,
          movie: `${title}`,
        });
      } else {
        changes.push(
          `Title changed from -${movieToBeUpdated.title}- to -${title}-`,
        );
        movieToBeUpdated.title = title;
      }
    }

    // ↓ ↓ Check Director ↓ ↓
    if (director && director != movieToBeUpdated.director) {
      changes.push(
        `Director changed from -${movieToBeUpdated.director}- to -${director}-`,
      );
      movieToBeUpdated.director = director;
    }

    // ↓ ↓ Check Release Date ↓ ↓
    if (release_date && release_date != movieToBeUpdated.release_date) {
      changes.push(
        `Release Date changed from -${movieToBeUpdated.release_date}- to -${release_date}-`,
      );
      movieToBeUpdated.release_date = release_date;
    }

    // Check for change
    if (changes != 0) {
      res.status(200).send({
        msg: `Movie CHANGED successfully`,
        id: movieToBeUpdated.id,
        changes: changes,
      });
    } else {
      res.status(404).send({
        msg: `You didn't send any change`,
      });
    }
  }
  //If it can't find Id
  else {
    res.status(404).send({
      msg: `Nothing to CHANGE`,
      Searched_Id: `${id}`,
    });
  }
}

//  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓  Delete movie  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
function deleteMovie(req, res) {
  const { id } = req.params;
  const foundMovie = findMovie('id', id);
  console.log();
  if (foundMovie) {
    deleteMovieFromList(id);
    res.status(200).send({
      msg: `Movie DELETED successfully`,
      movie: `${foundMovie.title}`,
      Id: `${foundMovie.id}`,
    });
  } else {
    res.status(404).send({
      msg: `Nothing to DELETE`,
      Searched_Id: `${id}`,
    });
  }
}

function findMovie(property, value) {
  return movieList.find((movie) => movie[property] === value);
}

export { createMovie, getPage, searchMovie, deleteMovie, changeMovie };
