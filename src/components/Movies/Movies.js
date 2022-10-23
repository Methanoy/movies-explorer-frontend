import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ handleUserMoviesSearch, movies }) {

  return (
    <main className="movies">
      <SearchForm handleUserMoviesSearch={handleUserMoviesSearch} />
      <MoviesCardList movies={movies} />
    </main>
  );
}

export default Movies;