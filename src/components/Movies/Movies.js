import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';

function Movies({
  handleUnlikeMovieCard,
  handleLikeMovieCard,
  handleSearchMovie,
  isLoggedIn,
  setSearchedMovies,
  searchedMovies,
  savedMovies,
}) {

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      const localSearchMoviesCard = JSON.parse(localStorage.getItem('searchedMoviesList'));
      if (localSearchMoviesCard) {
        setSearchedMovies(localSearchMoviesCard);
      }
    }
  }, [isLoggedIn, currentUser, setSearchedMovies]);

  return (
    <main className="movies">
      <SearchForm isLoggedIn={isLoggedIn} search={handleSearchMovie} />
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