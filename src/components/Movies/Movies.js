import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({
  handleSubmittedMoviesSearch,
  handleFilterToggle,
  isFilterOn,
  isMovieListEmpty,

  handleUnlikeMovieCard,
  handleLikeMovieCard,
  searchedMovies,
  savedMovies,
  isLoggedIn,
}) {

  return (
    <main className="movies">
      <SearchForm
        isLoggedIn={isLoggedIn}
        search={handleSubmittedMoviesSearch}
        handleFilterToggle={handleFilterToggle}
        isFilterOn={isFilterOn}
      />
      <MoviesCardList
        movies={searchedMovies}
        savedMovies={savedMovies}
        handleLikeMovieCard={handleLikeMovieCard}
        handleUnlikeMovieCard={handleUnlikeMovieCard}
        isMovieListEmpty={isMovieListEmpty}
      />
    </main>
  );
}

export default Movies;