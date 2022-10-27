import './SavedMovies.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';


function SavedMovies({
  isLoggedIn,
  savedMovies,
  setSavedMovies,
  handleLikeMovieCard,
  handleUnlikeMovieCard,
  filterShortSavedMovies,
  handleSearchSavedMovie,
}) {
  const isSavedMoviesLocation = useLocation().pathname === '/saved-movies';
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      const localSavedMoviesCard = JSON.parse(
        localStorage.getItem('savedMoviesList')
      );
      if (localSavedMoviesCard) {
        setSavedMovies(localSavedMoviesCard);
      }
    }
  }, [isLoggedIn, currentUser, setSavedMovies]);

  return (
    <section className="saved-movies">
      <SearchForm
        search={handleSearchSavedMovie}
        isSavedMoviesLocation={isSavedMoviesLocation}
        handleShortMoviesFilter={filterShortSavedMovies}
      />
      <MoviesCardList
        movies={savedMovies}
        savedMovies={savedMovies}
        handleLikeMovieCard={handleLikeMovieCard}
        isSavedMoviesLocation={isSavedMoviesLocation}
        handleUnlikeMovieCard={handleUnlikeMovieCard}
        filterShortSavedMovies={filterShortSavedMovies}
      />
    </section>
  );
}

export default SavedMovies;