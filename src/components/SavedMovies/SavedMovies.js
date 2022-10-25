import './SavedMovies.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';


function SavedMovies({ handleSearchSavedMovie, handleLikeMovieCard, handleUnlikeMovieCard, savedMovies, setSavedMovies, isLoggedIn }) {
  const isSavedMoviesLocation = useLocation().pathname === "/saved-movies";
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      const localSavesMoviesCard = JSON.parse(
        localStorage.getItem('searchedMoviesList')
      );
      if (localSavesMoviesCard) {
        setSavedMovies(JSON.parse(localStorage.getItem('savedMoviesList')));
      }
    }
  }, [isLoggedIn, currentUser, setSavedMovies]);

  return (
    <section className="saved-movies">
      <SearchForm search={handleSearchSavedMovie} isSavedMoviesLocation={isSavedMoviesLocation} />
      <MoviesCardList
        movies={savedMovies}
        savedMovies={savedMovies}
        isSavedMoviesLocation={isSavedMoviesLocation}
        handleLikeMovieCard={handleLikeMovieCard}
        handleUnlikeMovieCard={handleUnlikeMovieCard}
      />
    </section>
  );
}

export default SavedMovies;