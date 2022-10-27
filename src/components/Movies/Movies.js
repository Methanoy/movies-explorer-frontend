import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Movies({
  filterShortSearchMovies,
  handleUnlikeMovieCard,
  handleLikeMovieCard,
  handleSearchMovie,
  setSearchedMovies,
  searchedMovies,
  savedMovies,
  isLoggedIn,
}) {

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      const localFilterStatus = JSON.parse(localStorage.getItem('isFilterOn'));
      const shortMoviesList = JSON.parse(localStorage.getItem('shortSearchedMoviesList'));
      const searchedMoviesList = JSON.parse(localStorage.getItem('searchedMoviesList'));
      if (localFilterStatus) {
        setSearchedMovies(shortMoviesList);
      } else if (searchedMoviesList) {
        setSearchedMovies(searchedMoviesList);
      } else {
        setSearchedMovies([]);
      }
    }
  }, [isLoggedIn, currentUser, setSearchedMovies]);

  return (
    <main className="movies">
      <SearchForm
        isLoggedIn={isLoggedIn}
        search={handleSearchMovie}
        handleShortMoviesFilter={filterShortSearchMovies}
      />
      <MoviesCardList
        movies={searchedMovies}
        savedMovies={savedMovies}
        handleLikeMovieCard={handleLikeMovieCard}
        handleUnlikeMovieCard={handleUnlikeMovieCard}
      />
    </main>
  );
}

export default Movies;