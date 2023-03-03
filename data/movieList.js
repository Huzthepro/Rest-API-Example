//OUR BACKEND
let movieList = [
  {
    title: 'Inception',
    director: 'Christopher Nolan',
    release_date: '2010-07-16',
    id: '1',
  },
  {
    title: 'The Irishman',
    director: 'Martin Scorsese',
    release_date: '2019-09-27',
    id: '2',
  },
];

// This function needed, because imported array became -CONST- variable.
function deleteMovieFromList(id) {
  movieList = movieList.filter((movie) => movie.id !== id);
}

export { movieList, deleteMovieFromList };
