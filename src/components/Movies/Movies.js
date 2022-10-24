import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import { useContext, useEffect, useState } from 'react';
// import CurrentUserContext from '../../contexts/CurrentUserContext';

function Movies({ handleDeleteMovieCard, handleAddNewMovieCard, handleUserMoviesSearch, isLoggedIn, searchedMovies, savedMovies }) {
  // const currentUser = useContext(CurrentUserContext);
  // const [searchededMovies, setSearchedMovies] = useState([]);

  // useEffect(() => {
  //   if (isLoggedIn && currentUser) {
  //     if (localStorage.getItem('requestedMoviesList')) {
  //       setSearchedMovies(JSON.parse(localStorage.getItem('requestedMoviesList')));
  //     }
  //   }
  // }, [isLoggedIn, currentUser]);

  return (
    <main className="movies">
      <SearchForm
        isLoggedIn={isLoggedIn}
        handleUserMoviesSearch={handleUserMoviesSearch}
      />
      <MoviesCardList
        movies={searchedMovies}
        savedMovies={savedMovies}
        handleAddNewMovieCard={handleAddNewMovieCard}
        handleDeleteMovieCard={handleDeleteMovieCard}
      />
    </main>
  );
}

export default Movies;