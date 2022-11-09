import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';
import { shortMovieList, filterMoviesByUserRequest } from '../../utils/utils';
import { React, useState, useEffect } from 'react';

function Movies({
  savedMovies,
  setIsPopupParams,
  setIsDataLoading,
  handleUnlikeMovieCard,
  handleLikeMovieCard,
}) {

  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [allFoundMovies, setAllFoundMovies] = useState([]);
  const [shortMovies, setShortMovies] = useState([]);
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [isCardListEmpty, setIsCardListEmpty] = useState(false);

  function handleFilterToggle() {
    setIsFilterOn(!isFilterOn);
    localStorage.setItem('isMoviesFilterOn', JSON.stringify(!isFilterOn));
  }

  function setFilteredMovieLists(movies, request) {
    // фильтрует массив фильмов API по ключевым символам из запроса пользователя
    const filteredMovieList = filterMoviesByUserRequest(movies, request);
    
    // если после фильтрации массив пуст, показывает попап неудачи и скрывает список фильмов
    if(!filteredMovieList.length) {
      setIsPopupParams({
        isOpen: true,
        status: false,
        text: 'Ничего не найдено.',
      });
      setIsCardListEmpty(true);
    } else {
      // если массив НЕ пуст, сохраняет запрос, фильтр и
      // результат в двух вариантах: короткометражки и полный метр
      setIsCardListEmpty(false);

      setAllFoundMovies(filteredMovieList);
      localStorage.setItem('allMovies', JSON.stringify(filteredMovieList));

      setShortMovies(shortMovieList(filteredMovieList));
      localStorage.setItem('shortMovies', JSON.stringify(shortMovieList(filteredMovieList)));

      localStorage.setItem('requestMovies', JSON.stringify(request));
    }
  }

  function handleSubmittedMoviesSearch(request) {
    // если список фильмов ранее запрашивался у API, достает его из localstorage и фильтрует
    const movieListFromAPI = JSON.parse(localStorage.getItem('allMoviesAPI'));
    if (movieListFromAPI !== null) {
      setFilteredMovieLists(movieListFromAPI, request);
    } else {
      setIsDataLoading(true);
      moviesApi
        .getMoviesApiData()
        .then((moviesData) => {
          localStorage.setItem('allMoviesAPI', JSON.stringify(moviesData));
          setFilteredMovieLists(moviesData, request);
        })
        .catch((err) =>
          setIsPopupParams({
            isOpen: true,
            status: false,
            text: `Во время запроса произошла ошибка: ${err}. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.`,
          })
        )
        .finally(() => setIsDataLoading(false));
    }
  }

  // устанавливает карточки короткометражек либо полного метра
  useEffect(() => {
    if (isFilterOn) {
      setDisplayedMovies(shortMovies);
    } else {
      setDisplayedMovies(allFoundMovies);
    }
  }, [isFilterOn, shortMovies, allFoundMovies, setDisplayedMovies]);
  
  // монтирует сохраненные в localstorage результаты после перезагрузки страницы
  useEffect(() => {
    const allMovieList = JSON.parse(localStorage.getItem('allMovies'));
    if (allMovieList) {
      setAllFoundMovies(allMovieList);
    }
    const shortMovieList = JSON.parse(localStorage.getItem('shortMovies'));
    if (shortMovieList) {
      setShortMovies(shortMovieList);
    }
  }, []);

  // монтирует сохраненное в localstorage состояния чекбокса
  useEffect(() => {
    const moviesFilterStatus = JSON.parse(localStorage.getItem('isMoviesFilterOn'));
      if (moviesFilterStatus) {
        setIsFilterOn(moviesFilterStatus);
      }
  }, [isFilterOn]);

  return (
    <main className="movies">
      <SearchForm
        isFilterOn={isFilterOn}
        search={handleSubmittedMoviesSearch}
        handleFilterToggle={handleFilterToggle}
      />
      <MoviesCardList
        movies={displayedMovies}
        savedMovies={savedMovies}
        isCardListEmpty={isCardListEmpty}
        handleLikeMovieCard={handleLikeMovieCard}
        handleUnlikeMovieCard={handleUnlikeMovieCard}
      />
    </main>
  );
}

export default Movies;